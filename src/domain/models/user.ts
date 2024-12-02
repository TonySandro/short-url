import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
