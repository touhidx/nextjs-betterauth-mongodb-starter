import { betterAuth, tuple } from "better-auth";
import { Resend } from "resend";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL!);

const resend = new Resend(process.env.RESEND_API_KEY);

const db = client.db("better-auth-db");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        text: `Click here to reset your password: ${url}`,
        html: `Click <a href="${url}">here</a> to reset your password.`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },

  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECTET,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
