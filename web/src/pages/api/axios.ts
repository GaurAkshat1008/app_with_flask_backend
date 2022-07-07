import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "http://localhost:5000/api";

const transport = axios.create({
  withCredentials: true,
});

export async function getAxios(url: string) {
  try {
    const response = await transport.get(`${baseURL}/${url}`);
    const val = await response.data;
    return { val };
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
        const { val } = await getAxios(url);
        setData(val);
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
  try {
    const response = await transport.post(`${baseURL}/user/register`, obj);
    const data = await response.data;
    console.log(data);
    return { data };
  } catch (err) {
    console.log(err);
  }
};

export const login = async (obj: any) => {
  try {
    const response = await transport.post(`${baseURL}/user/login`, obj);
    // console.log(response.data);
    const data = await response.data;
    return { data };
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  let fetching = true;
  try {
    const response = await transport.get(`${baseURL}/user/me`);
    const data = await response.data;
    // console.log(data);
    fetching = false;
    return { data, fetching };
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    let fetching = true;
    const response = await transport.get(`${baseURL}/user/logout`);
    const data = await response.data;
    fetching = false;
    console.log(data);
    return { data, fetching };
  } catch (err) {
    console.log(err);
  }
};

export const postBlog = async (obj: any) => {
  try {
    const response = await transport.post(`${baseURL}/post/create`, obj);
    const data = await response.data;
    console.log(data);
    return { data };
  } catch (err) {
    console.log(err);
  }
};

export const getBlogs = async () => {
  let fetching = true;
  try {
    const response = await transport.get(`${baseURL}/post/get`);
    const data = await response.data;
    console.log(data);
    fetching = false;
    return { data, fetching };
  } catch (err) {
    console.log(err);
  }
};

export const getBlogsById = async (id: number) => {
  let fetching = true;
  try {
    const response = await transport.get(`${baseURL}/post/get/${id}`);
    const data = await response.data;
    console.log(data);
    fetching = false;
    return { data, fetching };
  } catch (err) {
    console.log(err);
  }
};

export const getMyBlogs = async () => {
  let fetching = true;
  try {
    const response = await transport.get(`${baseURL}/post/get/me`);
    const data = await response.data;
    console.log(data);
    fetching = false;
    return { data, fetching };
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = async (id: number, obj: any) => {
  try {
    const response = await transport.post(`${baseURL}/post/update/${id}`, obj);
    const data = await response.data;
    console.log(data);
    return { data };
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (id: number) => {
  try {
    const response = await transport.get(`${baseURL}/post/delete/${id}`);
    const data = await response.data;
    console.log(data);
    return { data };
  } catch (err) {
    console.log(err);
  }
};
