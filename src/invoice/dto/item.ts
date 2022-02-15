import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  quantity: number;

  @Field()
  amount: number;

  @Field({ nullable: true })
  discount?: number;
}

@InputType()
export class ItemInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  quantity: number;

  @Field()
  amount: number;

  @Field({ nullable: true })
  discount?: number;
}
