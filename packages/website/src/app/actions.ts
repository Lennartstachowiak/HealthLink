"use server";

import { Result } from "@/types/results";

const BACKEND_URL = process.env.BACKEND_URL;

export async function getResults() {
  const response = await fetch(`${BACKEND_URL}/get_results`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }

  const json = (await response.json()) as { data: Result[] };
  return json.data;
}

export async function sendMessage(message: string, result: Result) {
  const response = await fetch(`${BACKEND_URL}/send_message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      result,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }
  const json = await response.json();
  console.log(json);
  return json.data;
}
