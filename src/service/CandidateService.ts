import { Repository } from "typeorm";
import { Candidate } from "../entities/Candidate";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createCandidateScema } from "../utils/CandidateUtils";
import { uploader } from "../config/configCloudinary";
import { dataUri } from "../middleware/file-upload";

export default new (class CandidateService {
  private readonly CandidateRepository: Repository<Candidate> =
    AppDataSource.getRepository(Candidate);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const allCandidate = await this.CandidateRepository.find({
        relations: {
          vote: true,
        },
      });
      return res
        .status(200)
        .json({ status: 200, message: "success", data: { allCandidate } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "something when wrong to get all data candidate" });
    }
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, visi } = req.body;

      const file = dataUri(req).content;

      const result = await uploader.upload(file, {
        use_filename: true,
        folder: "file-upload",
      });

      const image: string = result.secure_url;

      const { error } = createCandidateScema.validate({ name, visi, image });
      if (error) {
        return res.status(404).json({ status: 404, message: error });
      }

      const findData = await this.CandidateRepository.find();

      const nameAlredy = findData.map((data) => data.name);
      if (nameAlredy.includes(name)) {
        return res.status(404).json({ message: "name alredy exits" });
      }

      const createData = this.CandidateRepository.create({ name, visi, image });

      await this.CandidateRepository.save(createData);

      return res
        .status(200)
        .json({ status: 200, message: "success", data: { createData } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "something when wrong to create new data candidate" });
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      console.log("id params : ", id);

      const findDataToDelete = await this.CandidateRepository.findOneBy({ id });
      if (!findDataToDelete) {
        return res.status(404).json({ message: "ID doesn't exist" });
      }

      console.log(findDataToDelete);

      // await this.CandidateRepository.delete(findDataToDelete);

      await this.CandidateRepository.createQueryBuilder("candidate")
        .delete()
        .from(Candidate)
        .where("id=:id", { id: id })
        .execute();

      return res
        .status(200)
        .json({ status: 200, message: "success to delete" });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong in candidate delete method ",
        error,
      });
    }
  }
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const data = req.body;

      const findDataToUpdate = await this.CandidateRepository.findOneBy({ id });
      if (!findDataToUpdate) {
        return res
          .status(404)
          .json({ status: 404, message: "id doesn't exist yet" });
      }

      findDataToUpdate.name = data.name;
      findDataToUpdate.visi = data.visi;

      this.CandidateRepository.update(findDataToUpdate, data);

      const candidateUpdate = await this.CandidateRepository.save(
        findDataToUpdate
      );

      return res
        .status(200)
        .json({ status: 200, message: "success", data: { candidateUpdate } });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong in update candidate",
        error,
      });
    }
  }
})();
