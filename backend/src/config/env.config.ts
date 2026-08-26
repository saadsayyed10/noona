import "dotenv/config";

export const env = {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || "sameoldtreva1234",
  PFP_API:
    process.env.PFP_API || "https://api.dicebear.com/10.x/blobs/svg?seed=",
};
