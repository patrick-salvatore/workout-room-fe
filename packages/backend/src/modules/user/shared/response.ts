import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class BasicResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

@ObjectType()
export class LoginResponse extends BasicResponse {
  @Field()
  success: boolean;

  @Field()
  accessToken: string;

  @Field()
  message: string;
}
