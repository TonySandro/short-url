import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;
}
