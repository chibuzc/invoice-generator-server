import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('user')
export class UserModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column({ nullable: false })
  businessName: string;

  @Field()
  @Column({ nullable: false })
  email: string;

  @Field()
  @Column({ nullable: false })
  password: string;

  @Field()
  @Column({ nullable: false })
  address: string;

  @Field()
  @Column({ nullable: false })
  logo: string;

  @Field()
  @Column({ nullable: false })
  phoneNumber: string;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
