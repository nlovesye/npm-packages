import { User } from "@/models";

// 项目根路径
export const BASE_URL = "development" !== process.env.NODE_ENV ? "" : "";

export const API_PREFIX = `${BASE_URL}/api`;

export const ADMIN_USER: User = {
  userName: "admin",
  passWord: "9900.admin.10000",
};
