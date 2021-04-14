import { QueryFunction, QueryKey, useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";
import { IGetDessertsResponse } from "../constants/interfaces";
import { serverUrl } from "../constants/constantsVariables";

export const useGQLQuery = (key: QueryKey, query: RequestDocument, variables?: any, config = {}) => {

  const graphQLClient = new GraphQLClient(serverUrl);

  const fetchData: QueryFunction<IGetDessertsResponse> = async () => await graphQLClient.request(query, variables);

  return useQuery(key, fetchData, config);
}