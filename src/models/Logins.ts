export type Logins = {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}