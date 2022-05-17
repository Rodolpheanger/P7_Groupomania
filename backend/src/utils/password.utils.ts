import bcrypt from "bcrypt";

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const checkPassword = (
  password: string,
  u_password: string
): Promise<boolean> => {
  return bcrypt.compare(password, u_password);
};
