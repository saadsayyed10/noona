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

export const acceptInviteAPI = async (inviteId: string, token: string) => {
  return await axios.put(
    `${apiUrl}/invite/accept/${inviteId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const rejectInviteAPI = async (inviteId: string, token: string) => {
  return await axios.delete(`${apiUrl}/invite/reject/${inviteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
