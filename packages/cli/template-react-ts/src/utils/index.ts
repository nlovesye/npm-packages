// import { REQUEST_BASE_URL } from '@/config';

// export function genAxiosRequest() {
//   request.defaults.baseURL = REQUEST_BASE_URL;
//   return request;
// }

export const sleep = async (second: number) =>
  await new Promise((resolve) => setTimeout(resolve, 1000 * second));
