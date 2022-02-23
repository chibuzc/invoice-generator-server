import { InputType, Field, ObjectType } from '@nestjs/graphql';

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

@ObjectType()
export class CreateUserOutput {
  @Field()
  id: string;

  @Field()
  accessToken: string;

  @Field()
  businessName: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field()
  logo: string;

  @Field()
  phoneNumber: string;
}

@ObjectType()
export class LoginUserOutput {
  @Field()
  accessToken: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
