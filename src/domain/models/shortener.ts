import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("url_shorteners")
export class UrlShortenerModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 2048 })
  originalUrl: string;

  @Column({ length: 6, unique: true })
  shortUrl: string;

  //   @ManyToOne(() => UserModel, (user) => user.urls, { nullable: true })
  //   user: UserModel | null;

  @Column({ default: 0 })
  clickCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
