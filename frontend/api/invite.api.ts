import axios from "axios";
import { apiUrl } from "./apiUrl";

export const sentInvitationAPI = async (guestId: string, token: string) => {
  return await axios.post(
    `${apiUrl}/invite/${guestId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const fetchAllInvitesAPI = async (
  status: "sent" | "receive",
  token: string,
) => {
  return await axios.get(`${apiUrl}/invite/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      status,
    },
  });
};
