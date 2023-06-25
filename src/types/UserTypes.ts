export type UserTypes = {
  userId: string;
  username: string;
  password: string;
};

export type UserLoginTypes = Omit<UserTypes, 'userId'>;
