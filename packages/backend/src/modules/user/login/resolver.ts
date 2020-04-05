import { createToken } from '../helpers';
import User from 'entity/User';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { compare } from 'bcrypt';
import { LoginResponse } from '../shared/response';
import { IAGContext } from 'interfaces/AGContext';

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('userName') userName: string,
    @Arg('password') password: string,
    @Ctx() { res }: IAGContext
  ): Promise<LoginResponse> {
    try {
      const user = await User.findOne({ where: { userName } });
      if (!user) {
        throw new Error(`A user with the name of ${userName} does not exist`);
      }

      const validPassword = await compare(password, user.password);
      if (!validPassword) {
        throw new Error(`Invalid password - Please try again`);
      }

      res.cookie(
        'jid',
        createToken({
          tokenType: 'refresh',
          payload: { userId: user.id, tokenState: user.tokenState },
          expiresIn: '7d',
        }),
        { httpOnly: true }
      );

      return {
        success: true,
        accessToken: createToken({
          tokenType: 'access',
          payload: { userId: user.id },
          expiresIn: '15m',
        }),
        message: `Welcome back ${userName}!`,
      };
    } catch (err) {
      return {
        success: false,
        accessToken: '',
        message: `${err.message}`,
      };
    }
  }
}
