import type { User } from '@/models';
import {  sleep } from '@/utils';

// const request = genAxiosRequest();

// export async function getUserInfo(): Promise<User> {
//   return request.get('/user/info');
// }

export async function getUserInfoMock(): Promise<User> {
  await sleep(2);
  return { name: '管理员' };
}
