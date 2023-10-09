import { Repository } from "typeorm";
import Users from "../entities/Users";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { UsersSchema } from "../utils/UsersSchema";
import TokenConfig from "../utils/token";

export default new (class UsersService {
  private readonly UserRepository: Repository<Users> =
    AppDataSource.getRepository(Users);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const findAll = await this.UserRepository.find();
      // console.log(findAll);

      let user_name: string;
      let email: string;
      let createdAt: Date;
      let updatedAt: Date;

      for (let i = 0; i < findAll.length; i++) {
        const result = findAll[i];
        (user_name = result.user_name), (email = result.email);
        (createdAt = result.createdAt), (updatedAt = result.updatedAt);
      }

      const data: object = {
        user_name,
        email,
        createdAt,
        updatedAt,
      };

      return res.status(200).json({ status: 200, message: "success", data });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong on find data users",
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { user_name, email, password } = req.body;

      const { value, error } = UsersSchema.validate({
        user_name,
        email,
        password,
      });

      if (error) {
        return res.status(400).json({ status: 400, message: error });
      }

      const user_nameValid = value.user_name;
      const emailValid = value.email;
      const passwordValid = value.password;

      const salt = genSaltSync(10);

      const hasPassword = hashSync(passwordValid, salt);

      const maxAge = 2 * 60 * 60;

      const token = TokenConfig.getToken(user_nameValid, maxAge);

      const createData = this.UserRepository.create({
        user_name: user_nameValid,
        email: emailValid,
        password: hasPassword,
      });

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });

      await this.UserRepository.save(createData);
      return res
        .status(200)
        .json({ status: 200, message: "success", data: { createData, token } });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "error in create user", error });
    }
  }
})();
