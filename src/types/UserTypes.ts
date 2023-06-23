export type UserTypes = {
  id: string;
  username: string;
  password: string;
};

export type UserLoginTypes = Omit<UserTypes, 'id'>;
