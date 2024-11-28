import { useAppState } from "./store";
import { useCallback } from "react";
const USERS_ENDPOINT = 'http://localhost:8081'
const TESTS_ENDPOINT = 'http://localhost:8080'
function myFetch(url, method, body){
    return fetch(url, {
        method: method,
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

function useAuthFetch() {
  const setUserInfo = useAppState().setUserInfo
  const token = useAppState((state)=>state.authToken)

  const fetchWithToken = useCallback(async (url, options ) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'  
        },
      });

      if (response.status === 401) {
        setUserInfo({
            roleName:'',
            authorized: false,
            authToken: ''
        })
      }

      return response;

    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }, [setUserInfo, token]);

  return fetchWithToken;
}

export {USERS_ENDPOINT, TESTS_ENDPOINT, myFetch, useAuthFetch}
