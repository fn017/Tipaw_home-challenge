import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from "graphql";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    isEmailVerified: { type: GraphQLBoolean },
  }),
});

const UserUpdateBodyInput = new GraphQLInputObjectType({
  name: "UserUpdateBody",
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  }),
});

export default { UserType, UserUpdateBodyInput };
