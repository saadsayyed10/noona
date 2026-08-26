import { env } from "../config/env.config";

export const generatePfp = (name: string) => {
  if (name.includes(" ")) {
    name.replace(" ", "_");
  }

  const profilePicture = `${env.PFP_API!}+${name}`;

  return profilePicture;
};
