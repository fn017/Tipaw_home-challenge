import { GraphQLError } from "graphql";

// type responseStatus = 200 | 201 | 204 | 400 | 404 | 500;

// const messages = {
//   200: "OK",
//   201: "Accepted",
//   204: "No Content",
//   400: "Bad request",
//   404: "Not found",
//   500: "Internal server error",
// };

const ApiResponse = (err: any) => {
  return new GraphQLError(err?.message || err || "Something went wrong");
};

export default ApiResponse;
