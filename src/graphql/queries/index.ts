import { GraphQLObjectType } from "graphql";
import authQueries from "./auth.queries";
import userQueries from "./user.queries";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...userQueries,
    ...authQueries,
  },
});

export default RootQuery;
