import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "http://localhost:5000/api";

export async function getAxios(url: string) {
  try {
    const response = await axios.get(`${baseURL}/${url}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function useFetch(url: string) {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const req = async () => {
      try {
        const response = await getAxios(url);
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    req();
  }, []);
  return { data, loading, error };
}

export const register = async (obj: any) => {
  // axios
  //   .post(`${baseURL}/user/register`, obj)
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  try {
    const response = await axios.post(`${baseURL}/user/register`, obj);
    const data = await response.data;
    return { data };
  } catch (err) {
    console.log(err);
  }
};

export const login = async (obj: any) => {
  try {
    const response = await axios.post(`${baseURL}/user/login`, obj);
    // console.log(response.data);
    const data = await response.data;
    return { data };
  } catch (err) {
    console.log(err);
  }
};

// export default { login, register };
