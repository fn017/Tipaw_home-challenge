import { GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from ".";

const TokenType = new GraphQLObjectType({
  name: "Token",
  fields: () => ({
    expires: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

const TokensType = new GraphQLObjectType({
  name: "Tokens",
  fields: () => ({
    access: { type: TokenType },
    refresh: { type: TokenType },
  }),
});

const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    user: { type: UserType.UserType },
    tokens: { type: TokensType },
  }),
});

const RegisterType = new GraphQLObjectType({
  name: "Register",
  fields: () => ({
    user: { type: UserType.UserType },
    tokens: { type: TokensType },
  }),
});

export default {
  TokenType,
  TokensType,
  LoginType,
  RegisterType,
};
