import "next-auth";
declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      email: string;
      name?: string;
    };
  }
  interface User {
    accessToken: string;
    id: string;
    accessToken?: string;
  }
  interface JWT {
    accessToken: string;
    id: string;
    accessToken?: string;
  }
}
