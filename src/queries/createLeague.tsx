import { apiUrl } from "@/constants/auth";
import { CreateLeagueInput } from "@/types/types";

export const createLeague = async (
  data: CreateLeagueInput,
  token: string | null,
) => {
  const res = await fetch(`${apiUrl}/create-league`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();

  if (!res.ok) {
    throw new Error("Failed to create league");
  }

  return response;
};
