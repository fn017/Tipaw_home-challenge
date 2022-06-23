import { GraphQLBoolean, GraphQLFieldConfig, GraphQLString } from "graphql";
import { AuthType } from "../types";
import { authController } from "../../controllers";
type IField = Record<string, GraphQLFieldConfig<any, any>>;

const authMutations: IField = {
  createUser: {
    type: AuthType.RegisterType,
    args: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      acceptedTerms: { type: GraphQLBoolean },
    },
    resolve: (...rest) => authController.register(...rest),
  },
};

export default authMutations;
