import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class Item {
  @Field()
  name: string;

  @Field({nullable: true})
  description?: string;

  @Field()
  quantity: number;

  @Field()
  amount: number;

  @Field({nullable: true})
  discount?: number;

}