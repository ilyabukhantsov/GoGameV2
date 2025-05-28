export type User = {
  email: string;
  id: string;
  isActivated: boolean;
};

export type ResponseData = {
  refreshToken: string;
  accessToken: string;
  user: User;
};
