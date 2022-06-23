import { GraphQLError } from "graphql";

export const DisallowNoOperationName = (context) => {
  return {
    OperationDefinition: (node) => {
      const operationName = node.name;
      if (!operationName) {
        context.reportError(
          new GraphQLError(`Validation: Operation name is missing!`)
        );
      }
    },
  };
};
