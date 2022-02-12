import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  businessName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  address: string;

  @Field()
  logo: string;

  @Field()
  phoneNumber: string;
}
