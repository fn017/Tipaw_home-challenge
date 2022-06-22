import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { config } from "./";
import { token } from "./";
import { userService } from "../services";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== token.tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }

    const user = await userService.getUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default {
  jwtStrategy,
};
