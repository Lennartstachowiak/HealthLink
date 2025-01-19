"use server";

import { Result } from "@/types/results";

export async function getResults() {
  const BACKEND_URL = process.env.BACKEND_URL;
  const response = await fetch(`${BACKEND_URL}/get_results`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }

  const json = (await response.json()) as { data: Result[] };
  return json.data;
}
