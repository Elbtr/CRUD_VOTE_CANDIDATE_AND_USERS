import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Vote } from "./Vote";

@Entity({ name: "candidate" })
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  visi: string;
  @Column()
  image: string;
  @OneToMany(() => Vote, (vote) => vote.selected, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  vote: Vote[];
}
