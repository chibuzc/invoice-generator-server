import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from '../dto/item';

@ObjectType()
@Entity('invoice')
export class InvoiceModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  customerName: string;

  @Field()
  @Column()
  shippingAddress: string;

  @Field()
  @Column()
  billingAddress: string;

  @Field()
  @Column({ unique: true })
  phoneNumber: string;

  @Field()
  @Column()
  transactionDate: Date;

  @Column('jsonb', )
  items: Item[];

  @Field()
  @Column()
  total: number;

  @Field()
  @Column()
  dueDate: Date;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}