// Extending next-auth Session and User types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the `id` field here
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; // You can also add the `id` field to the User type if needed
  }

  interface Profile {
    picture?: string | null; // Add the 'picture' property to the Profile interface
  }
}
