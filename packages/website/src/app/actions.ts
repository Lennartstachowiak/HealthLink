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
  console.log(message, result);
  const response = await fetch(`${BACKEND_URL}/send_message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }
  const json = await response.json();
  return json.data;
}

export async function getPdfUrl(filename: string) {
  const pdfUrl = `${BACKEND_URL}/pdf/${filename}`;
  return pdfUrl;
}
