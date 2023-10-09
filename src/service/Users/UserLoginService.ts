import { Request, Response } from "express";
import { Repository } from "typeorm";
import Users from "../../entities/Users";
import { AppDataSource } from "../../data-source";
import { UserLoginSchema } from "../../utils/UserLoginSchema";
import { compare } from "bcrypt-ts";
import TokenConfig from "../../utils/token";

export default new (class UserLoginService {
  private readonly UsersRespository: Repository<Users> =
    AppDataSource.getRepository(Users);

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      //   console.log(data);

      const { value, error } = UserLoginSchema.validate(data);

      if (error) {
        return res
          .status(400)
          .json({ status: 400, error: error.details[0].message });
      }

      const findUser = await this.UsersRespository.findOneBy({
        email: value.email,
      });
      //   console.log(findUser);

      if (!findUser) {
        return res
          .status(400)
          .json({ status: 400, message: "email does not exist " });
      }

      const validPassword = await compare(value.password, findUser.password);

      if (!validPassword) {
        return res.status(400).json({ status: 400, message: "password wrong" });
      }
      // console.log(validPassword);

      const maxAge = 2 * 60 * 60;
      const token = TokenConfig.getToken(findUser.user_name, maxAge);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      return res.status(200).json({
        status: 200,
        message: "success to login",
        user: { email: findUser.email, user_name: findUser.user_name },
        token: token,
      });
      //   console.log(data);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong in logn user",
        error,
      });
    }
  }
})();
