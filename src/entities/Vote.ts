import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";

import { Paslon } from "./Paslon";
import Users from "./Users";

@Entity({ name: "vote" })
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;
  @ManyToOne(() => Paslon, (paslon) => paslon.vote, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "paslonId" })
  selected: Paslon;

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
