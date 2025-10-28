"use server";

import { auth } from "@/lib/auth";

export const signInUser = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true,
    });
    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Faild to sign in",
    };
  }
};

export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      asResponse: true,
    });
    const data = await response.json();
    return {
      success: true,
      message:
        data.message || "Please check your email for a verification link",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Faild to sign up",
    };
  }
};
