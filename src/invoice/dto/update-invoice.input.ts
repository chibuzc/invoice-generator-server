import { CreateInvoiceInput } from './create-invoice.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Item } from './item';

@InputType()
export class UpdateInvoiceInput extends PartialType(CreateInvoiceInput) {
  @Field()
  id: string;

  @Field({nullable: true})
  customerName?: string;

  @Field({nullable: true})
  shippingAddress?: string;

  @Field({nullable: true})
  billingAddress?: string;

  @Field({nullable: true})
  phoneNumber?: string;

  @Field({nullable: true})
  transactionDate?: Date;

  @Field(() => [Item], {nullable: true})
  items?: Item[];

  @Field({nullable: true})
  dueDate?: Date;
}
