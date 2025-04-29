"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const newPassword = formData.get("newPassword")?.toString();
  const userId = formData.get("userId")?.toString();
  const supabase = createAdminClient();

  if (!userId) {
    return encodedRedirect(
      "error",
      "/protected/manager",
      "User ID is required"
    );
  }

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    password: newPassword,
  });

  if (error) {
    return encodedRedirect("error", "/protected/manager", error.message);
  }

  return encodedRedirect(
    "success",
    "/protected/manager",
    "Password reset successfully"
  );
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const deleteUserAction = async (formData: FormData) => {
  const userId = formData.get("userId")?.toString();
  const supabase = createAdminClient();

  if (!userId) {
    return encodedRedirect(
      "error",
      "/protected/manager",
      "User ID is required"
    );
  }

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return encodedRedirect("error", "/protected/manager", error.message);
  }

  return encodedRedirect(
    "success",
    "/protected/manager",
    "User deleted successfully"
  );
};

export const inviteUserAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/protected/manager",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return encodedRedirect("error", "/protected/manager", error.message);
  }

  return encodedRedirect(
    "success",
    "/protected/manager",
    "User invitation link generated successfully"
  );
};

export async function resendConfirmationAction(formData: FormData) {

  const userId = formData.get("userId") as string;
  const email = formData.get("email") as string;
  const origin = (await headers()).get("origin");
  if (!userId) {
    return { error: "User ID is required" };
  }

  const supabase = await createClient();
  
  
  const { error: resendError } = await supabase.auth.resend({
    type: "signup",
    email: email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });


  if (resendError) {
    return encodedRedirect(
      "error",
      "/protected/manager",
      "Could not resend confirmation email"
    );
  }

  return encodedRedirect(
    "success",
    "/protected/manager",
    "User invitation link generated successfully"
  );
}
