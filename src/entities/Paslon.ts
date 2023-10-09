import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Vote } from "./Vote";
import Parties from "./Parties";

@Entity({ name: "paslon" })
export class Paslon {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  visi: string;
  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Parties, (party) => party.paslon)
  @JoinColumn()
  party: Parties[];

  @OneToMany(() => Vote, (vote) => vote.selected)
  @JoinColumn()
  vote: Vote[];

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
