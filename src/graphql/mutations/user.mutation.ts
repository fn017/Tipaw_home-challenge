import { GraphQLFieldConfig, GraphQLString } from "graphql";
import { UserType } from "../types";
import { userController } from "../../controllers";
type IField = Record<string, GraphQLFieldConfig<any, any>>;

const userMutations: IField = {
  updateUser: {
    type: UserType.UserType,
    args: {
      userId: { type: GraphQLString },
      updateBody: { type: UserType.UserUpdateBodyInput },
    },
    resolve: (...rest) => userController.updateUser(...rest),
  },
};

export default userMutations;
