import { MutationFunction, useMutation, useQueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";
import { IGetDessertsResponse } from "../constants/interfaces";
import { serverUrl } from "../constants/constantsVariables";

export const useGQLMutation = (key: string, mutation: RequestDocument, variables?: any, config = {}) => {
  const queryClient = useQueryClient();
  const graphQLClient = new GraphQLClient(serverUrl);

  const fetchData: MutationFunction<IGetDessertsResponse> = (variables) => graphQLClient.request(mutation, variables);
  return useMutation(fetchData, {
    mutationKey: key,
    onSuccess: () => { queryClient.refetchQueries("desserts") },
  });
}
