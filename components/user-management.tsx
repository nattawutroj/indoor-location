"use client";

import {
  deleteUserAction,
  inviteUserAction,
  resetPasswordAction,
  resendConfirmationAction,
} from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Trash2, KeyRound, User } from "lucide-react";
import { useState } from "react";
import { ConfirmAction } from "@/components/modal/confirmAction";
import { ResetPasswordModal } from "@/components/modal/resetPasswordModal";

interface User {
  id: string;
  email?: string;
  last_sign_in_at?: string;
  email_confirmed_at?: string | null;
}

interface UserManagementProps {
  users?: User[];
  message: Message;
}

export default function UserManagement({
  users,
  message,
}: UserManagementProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDelete = async (user: User) => {
    setIsDeleting(true);
    const formData = new FormData();
    formData.append("userId", user.id);
    setIsDeleting(false);
    await deleteUserAction(formData);
  };

  const handleResendConfirmation = async (user: User) => {
    setIsResending(true);
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("email", user.email || "");
    setIsResending(false);
    await resendConfirmationAction(formData);
  };

  const handleResetPassword = async (user: User) => {
    setSelectedUser(user);
    setResetPasswordModalOpen(true);
  };

  const handleResetPasswordSubmit = async (newPassword: string) => {
    if (!selectedUser) return;
    
    setIsResetting(true);
    const formData = new FormData();
    formData.append("userId", selectedUser.id);
    formData.append("newPassword", newPassword);
    setIsResetting(false);
    await resetPasswordAction(formData);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Create New User</h2>
        <form className="flex flex-col gap-4 max-w-md">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="user@example.com"
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                className="pl-10"
                required
              />
            </div>
          </div>
          <SubmitButton
            formAction={inviteUserAction}
            pendingText="Creating user..."
          >
            Create User
          </SubmitButton>
          <FormMessage message={message} />
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <div className="grid gap-4">
          {users?.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{user.email}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {user.last_sign_in_at
                    ? `Last signed in: ${new Date(
                        user.last_sign_in_at
                      ).toLocaleDateString()}`
                    : "Never signed in"}
                  {!user.email_confirmed_at && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      <Mail className="h-3 w-3" />
                      Unconfirmed
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {!user.email_confirmed_at && (
                  <ConfirmAction
                    action={() => handleResendConfirmation(user)}
                    title="Resend Confirmation"
                    message={`Are you sure you want to resend confirmation email to ${user.email}?`}
                    confirmText="Resend"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      disabled={isResending}
                    >
                      <Mail className="h-4 w-4" />
                      {isResending ? "Sending..." : "Resend Confirmation"}
                    </Button>
                  </ConfirmAction>
                )}
                <ConfirmAction
                  action={() => handleResetPassword(user)}
                  title="Reset Password"
                  message={`Are you sure you want to reset password for ${user.email}?`}
                  confirmText="Reset"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    disabled={isResetting}
                  >
                    <KeyRound className="h-4 w-4" />
                    {isResetting ? "Resetting..." : "Reset Password"}
                  </Button>
                </ConfirmAction>
                <ConfirmAction
                  action={() => handleDelete(user)}
                  title="Delete User"
                  message={`Are you sure you want to delete ${user.email}? This action cannot be undone.`}
                  confirmText="Delete"
                >
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-2"
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4" />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </ConfirmAction>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedUser && (
        <ResetPasswordModal
          open={resetPasswordModalOpen}
          onOpenChange={setResetPasswordModalOpen}
          onReset={handleResetPasswordSubmit}
          userEmail={selectedUser.email || ""}
        />
      )}
    </div>
  );
}
