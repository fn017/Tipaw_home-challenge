import { GraphQLSchema } from "graphql";
import RootMutations from "./mutations";
import RootQuery from "./queries";

const schema = new GraphQLSchema({ query: RootQuery, mutation: RootMutations });

export default schema;
