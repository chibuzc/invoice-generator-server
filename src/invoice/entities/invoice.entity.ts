import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Invoice {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
