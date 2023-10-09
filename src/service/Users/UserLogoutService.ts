import { Repository } from "typeorm";
import Users from "../../entities/Users";
import { AppDataSource } from "../../data-source";
import { Request, Response } from "express";
import { blacklistToken } from "../../config/tokenManager";

export default new (class UserLogOutService {
  private readonly UserRepository: Repository<Users> =
    AppDataSource.getRepository(Users);

  async logOut(req: Request, res: Response): Promise<Response> {
    try {
      res.cookie("jwt", "logout", {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 1000),
      });

      return res.status(200).json({ status: 200, message: "succes log out" });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong on log out user",
        error,
      });
    }
  }
})();
