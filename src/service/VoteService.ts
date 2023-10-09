import { Repository } from "typeorm";
import { Vote } from "../entities/Vote";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { voteCreateShema } from "../utils/VoteUntils";

// import { User } from "../middleware/auth-users";

export default new (class VoteService {
  private readonly voteRepository: Repository<Vote> =
    AppDataSource.getRepository(Vote);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.user);

      const allVote = await this.voteRepository.find({
        relations: {
          selected: true,
        },
      });
      return res
        .status(200)
        .json({ status: 200, message: "success", data: { allVote } });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong to get all data vote",
        error,
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { paslonId } = req.body;
      const user_name = req.user.user_name;
      const userName: string = String(user_name.toUpperCase());
      // console.log(req.user.user_name);

      const { error } = voteCreateShema.validate({ paslonId, user_name });

      if (error) {
        return res.status(400).json({ status: 400, message: error });
      }
      const findData = await this.voteRepository.find();
      // const userIdAlredy = findData.map((data) => data.userID);

      const userNameAlredy = findData.map((data) =>
        data.user_name.toUpperCase()
      );
      if (userNameAlredy.includes(userName)) {
        return res.status(400).json({
          status: 400,
          message: "User has already voted for a candidate",
        });
      }

      const createData = this.voteRepository.create({
        selected: paslonId,
        user_name: userName,
      });

      await this.voteRepository.save(createData);
      return res
        .status(200)
        .json({ status: 200, message: "success", data: { createData } });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "something when wrong to create vote",
        error,
      });
    }
  }
})();
