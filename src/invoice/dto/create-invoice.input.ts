import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { Item, ItemInput } from './item';

@InputType()
export class CreateInvoiceInput {
  @Field()
  customerName: string;

  @Field()
  shippingAddress: string;

  @Field()
  billingAddress: string;

  @Field()
  phoneNumber: string;

  @Field()
  transactionDate: Date;

  @Field(() => [ItemInput])
  items: ItemInput[];

  @Field()
  dueDate: Date;
}

@ObjectType()
export class CreateInvoiceOutput {
  @Field()
  id: string;

  @Field()
  customerName: string;

  @Field()
  shippingAddress: string;

  @Field()
  billingAddress: string;

  @Field()
  phoneNumber: string;

  @Field()
  transactionDate: Date;

  @Field(() => [Item])
  items: Item[];

  @Field()
  total: number;

  @Field()
  dueDate: Date;
}
