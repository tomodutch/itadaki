import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import {redirect} from "next/navigation";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GitHub({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
    })],
});

export async function ensureUserId() {
    const session = await auth();
    if (!session?.user?.id) {
        return redirect("/");
    }

    return session.user.id;
}