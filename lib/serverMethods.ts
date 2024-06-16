"use server";
import Env from "../app/config/env";
import { headers } from "next/headers";

export async function getPost() {
  const res = await fetch(`${Env.APP_URL}api/post`, {
    cache: "no-cache",
    headers: headers(),
  });
  console.log("ashish");
  console.log("response is: ", res);
  if (!res.ok) {
    throw new Error("Failed to fecth posts"); 
  }
  const response = await res.json();
  return response?.data;
}
