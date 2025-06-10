import type { ResponseData } from '../types/auth/auth';

const BASE_URL = 'http://localhost:5000/api/';

export const $api = async (
  path: string,
  requestOptions: RequestInit = {},
  isFirst = true
): Promise<Response> => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...requestOptions,
    headers: {
      ...(requestOptions.headers || {}),
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (response.status === 401 && isFirst) {
    const res = await fetch(`${BASE_URL}refresh`, {
      credentials: 'include',
    });
    if (!res.ok) {
      localStorage.removeItem('token');
      throw new Error('Failed to refresh token');
    }
    const data: ResponseData = await res.json();
    localStorage.setItem('token', data.accessToken);
    $api(path, requestOptions, false);
  }
  return response;
};
