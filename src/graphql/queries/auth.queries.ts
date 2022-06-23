import { authController } from "../../controllers";
import { GraphQLString, GraphQLFieldConfig } from "graphql";
import { AuthType } from "../types";

type IField = Record<string, GraphQLFieldConfig<any, any>>;

const authQueries: IField = {
  login: {
    type: AuthType.LoginType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: (...rest) => authController.login(...rest),
  },
};

export default authQueries;
