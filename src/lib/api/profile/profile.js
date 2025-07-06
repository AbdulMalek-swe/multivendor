import { privateRequest } from "@/lib/axios";

export const getProfile = async () => {
  return privateRequest.get("/user/profile");
};
