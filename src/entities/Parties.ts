import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Paslon } from "./Paslon";

@Entity({ name: "parties" })
export default class Parties {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  party_name: string;
  @ManyToOne(() => Paslon, (p) => p.party)
  @JoinColumn()
  paslon: Paslon;
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
