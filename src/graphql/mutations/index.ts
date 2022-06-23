import { GraphQLObjectType } from "graphql";
import authMutations from "./auth.mutation";

import userMutations from "./user.mutation";

const RootMutations = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    ...userMutations,
    ...authMutations,
  },
});

export default RootMutations;
