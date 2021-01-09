import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255 })
  firstName: string;

  @Column("varchar", { length: 255 })
  lastName: string;

  @Column('int')
  age: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.MALE
  })
  gender: Gender;

  @Column("varchar", { length: 255 })
  interests: string;

  @Column("varchar", { length: 255 })
  city: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("varchar", { length: 255 })
  password: string;
}