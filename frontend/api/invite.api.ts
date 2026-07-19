import axios from "axios";
import { apiUrl } from "./apiUrl";

export const sentInvitationAPI = async (guestId: string, token: string) => {
  return await axios.post(`${apiUrl}/invite/${guestId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
