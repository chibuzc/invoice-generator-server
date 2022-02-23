import { InputType, Field, PartialType } from '@nestjs/graphql';
import { ItemInput } from './item';
import { InvoiceModel } from '../model/invoice.model';

@InputType()
export class UpdateInvoiceInput extends PartialType(InvoiceModel) {
  @Field()
  id: string;

  @Field({ nullable: true })
  customerName?: string;

  @Field({ nullable: true })
  shippingAddress?: string;

  @Field({ nullable: true })
  billingAddress?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  transactionDate?: Date;

  @Field(() => [ItemInput], { nullable: true })
  items?: ItemInput[];

  @Field({ nullable: true })
  dueDate?: Date;
}
