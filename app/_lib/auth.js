// 471. Setting Up NextAuth
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // 474. Protecting Routes With NextAuth Middleware
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; //Returns boolean, true is user exists else false, TRICK
    },
    // 477. Creating a New Guest on First Sign In
    async signIn({ user, account, profile }) {
      // This callback here actually runs before the actual signup process happens And so that means that we can perfor all kinds of operations her that are associated with the signing in process So, it's a bit like middleware, if you think about it It happens after the user has put in their credentials but before they're actuall like really, really locked into the application So in our case, what we're gonna do her is to create a new gues when the user signs in for the first time So when there isn't a guest with that email here yet and while if there is one, then we don't do anything here.
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true;
      } catch {
        return false;
      }
    },
    // 477. Creating a New Guest on First Sign In
    async session({ session, user }) {
      // So, that callback is gonna be called the session callback, and it runs after the sign in callback and also each time that the session is checked out So, for example, when we call that off function And so, here, we actually get access to the session and so this is the perfect plac to add the guest ID to that session.
      const guest = await getGuest(session.user.email);
      // adding guestId on session object
      session.user.guestId = guest.id;
      return session;
    },
  },
  // 475. Building a Custom Sign In Page
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  // 475. Building a Custom Sign In Page
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
