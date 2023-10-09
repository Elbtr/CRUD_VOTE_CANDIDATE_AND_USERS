import { Repository } from "typeorm";
import Parties from "../entities/Parties";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { PartiesSchema } from "../utils/PartiesSchema";

export default new (class PartiesService {
  private readonly PartiesRepository: Repository<Parties> =
    AppDataSource.getRepository(Parties);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const findData = await this.PartiesRepository.find({
        relations: {
          paslon: true,
        },
      });

      return res
        .status(200)
        .json({ status: 200, message: "success", data: { data: findData } });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "someting when wrong on find Parties" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { party_name, paslon } = req.body;

      const partyName: string = party_name.toUpperCase();
      const findData = await this.PartiesRepository.find();

      const { error } = PartiesSchema.validate({ party_name, paslon });
      if (error) {
        return res.status(400).json({ status: 200, error });
      }

      const nameAlredy = findData.map((data) => data.party_name.toUpperCase());
      if (nameAlredy.includes(partyName)) {
        return res.status(404).json({ message: "name alredy exits" });
      }

      const createData = this.PartiesRepository.create({
        party_name: partyName,
        paslon,
      });
      await this.PartiesRepository.save(createData);

      return res.status(200).json({
        status: 200,
        message: "success",
        data: { newData: createData },
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        status: 500,
        message: "something when wrong on create parties",
        error,
      });
    }
  }
})();
