import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";

import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHORIZE);
  
  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        username, password
      }
    });

    await authStorage.setAccessToken(response.data.authorize.accessToken);
    apolloClient.resetStore();
    return response;
  };

  return [signIn, result];
};

export default useSignIn;