export type User = {
  email: string;
  id: string;
  isActivated: boolean;
};

export type ResponseData = {
  accessToken: string;
  user: User;
};
