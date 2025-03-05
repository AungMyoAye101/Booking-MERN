import { CreateUserType } from "./types";

const BASE_API_URL = "https://localhost:5000";

export const register = async (formData: CreateUserType) => {
  const res = await fetch(`https://localhost:5000/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    throw new Error("Failed to create user!");
  }
  return res.json();
};
