import { validateUserCredentials } from '../helpers';
import User from '../../../entity/User';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { hash } from 'bcrypt';
import { BasicResponse } from '../shared/response';

@Resolver()
export class RegisterResolver {
  // Register User Mutation - takes email & password as arguments & returns message
  @Mutation(() => BasicResponse)
  async register(
    @Arg('userName') userName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    try {
      if (validateUserCredentials({ userName, email, password })) {
        const hashedPassword = await hash(password, 14);
        await User.insert({
          userName,
          email,
          password: hashedPassword,
        });
      }
      return {
        success: true,
        message: `User: ${userName} has sucessfully registered`,
      };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
}
