import { CreateInvoiceInput } from './create-invoice.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { ItemInput } from './item';

@InputType()
export class UpdateInvoiceInput extends PartialType(CreateInvoiceInput) {
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
