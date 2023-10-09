import { Repository } from "typeorm";
import { Paslon } from "../entities/Paslon";
import { AppDataSource } from "../data-source";
import { createPaslonScema } from "../utils/Paslon";
import { Request, Response } from "express";
import { uploader } from "../config/configCloudinary";
import fs from "fs";
import { dataUri } from "../middleware/file-upload";

export default new (class PaslonService {
  private readonly PaslonRepository: Repository<Paslon> =
    AppDataSource.getRepository(Paslon);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const allData = await this.PaslonRepository.find({
        relations: {
          vote: true,
          party: true,
        },
      });
      if (allData.length === 0)
        return res.status(200).json({ data: "empty data" });
      return res.status(200).json({ allData });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "something when wrong to findAll data", error });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, visi } = req.body;

      // disini saya menemukan ada dua cara untuk meng upload image ke cloudinary

      // cara pertama menggunakan fs yang berasal dari node js untuk membuat file buffer agar bisa di kirim ke cloudinary
      // yang kedua kita bisa menggunakan datauri yang berfungsi untuk  untuk mengonversi data berkas (dalam hal ini, req.file.buffer)  menjadi URI data (data URI) yang dapat digunakan untuk merepresentasikan berkas sebagai URL.

      // ini adalah cara pertama
      // const tempFilePath = "./src/tmp";
      // fs.writeFileSync(tempFilePath, req.file.buffer);

      // const result = await uploader.upload(tempFilePath, {
      //   use_filename: true,
      //   folder: "file-upload",
      // });

      // fs.unlinkSync(tempFilePath);

      // const image = result.secure_url;

      //

      const file = dataUri(req).content;

      const result = await uploader.upload(file, {
        use_filename: true,
        folder: "file-upload",
      });

      const image: string = result.secure_url;

      const { error } = createPaslonScema.validate({ name, visi, image });
      if (error) return res.status(400).json({ error: error });

      const findData = await this.PaslonRepository.find();

      const nameAlredy = findData.map((data) => data.name);
      if (nameAlredy.includes(name)) {
        return res.status(404).json({ message: "name alredy exits" });
      }

      const newData = this.PaslonRepository.create({ name, visi, image });

      await this.PaslonRepository.save(newData);
      return res.status(200).json({ data: newData });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "something when wrong in create paslon", error });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const data = req.body;
      const findData = await this.PaslonRepository.findOneBy({ id });

      if (!findData) {
        return res.status(404).json({ message: "ID doesn't exist" });
      }

      const name = data.name;

      findData.name = name.toUpperCase();
      findData.visi = data.visi;

      this.PaslonRepository.update(findData, data);
      const updateData = await this.PaslonRepository.save(findData);
      return res.status(200).json({ data: updateData });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "something when wrong to update Paslon" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);

      const findDataToDelete = await this.PaslonRepository.findOneBy({ id });
      if (!findDataToDelete) {
        return res.status(404).json({ message: "ID doesn't exist" });
      }

      this.PaslonRepository.remove(findDataToDelete);

      return res.status(200).json({ message: "success to delete data" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "something when wrong to delete Paslon" });
    }
  }

  async uploadImage(req: Request, res: Response): Promise<Response> {
    try {
      const tempFilePath = "./src/tmp";
      fs.writeFileSync(tempFilePath, req.file.buffer);

      const result = await uploader.upload(tempFilePath, {
        use_filename: true,
        folder: "file-upload",
      });

      fs.unlinkSync(tempFilePath);
      return res.status(200).json({ result: result.secure_url });

      // return res.status(404).json({ message: "cannot to upload image" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "something when wrong to upload image" });
    }
  }
})();
