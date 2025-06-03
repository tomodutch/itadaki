"use client";

import {LoginForm} from "./login-form";
import {SessionProvider} from "next-auth/react";

export default function ClientLoginForm() {
    return (
        <SessionProvider>
            <LoginForm />
        </SessionProvider>
    );
}