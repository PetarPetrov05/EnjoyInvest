import axios from "axios";
import type { RegisterData } from "../types/auth"; // adjust path

const API_BASE_URL = (typeof window !== "undefined")
  ? `${window.location.protocol}//${window.location.hostname}:8080/api/auth`
  : "http://localhost:8080/api/auth";

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      email: data.email,
      password: data.password,
      name: data.name,
      username: data.username,
    //   // optional fields if backend supports them:
    //   companyName: data.companyName,
    //   businessLicense: data.businessLicense,
    });

    return response.data; // should contain { token, roles }
  } catch (err: any) {
    if (err.response) {
      throw err.response; // you can catch status in the component
    }
    throw err;
  }
};
