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
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-2xl font-bold">สร้างผู้ใช้ใหม่</h2>
        <form className="flex flex-col gap-4 w-full max-w-md">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">อีเมล</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="user@example.com"
                className="pl-10 w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">รหัสผ่าน</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="กรอกรหัสผ่าน"
                className="pl-10 w-full"
                required
              />
            </div>
          </div>
          <SubmitButton
            formAction={inviteUserAction}
            pendingText="กำลังสร้างผู้ใช้..."
          >
            สร้างผู้ใช้
          </SubmitButton>
          <FormMessage message={message} />
        </form>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-2xl font-bold">ผู้ใช้</h2>
        <div className="grid gap-4 w-full">
          {users?.map((user) => (
            <div
              key={user.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border bg-card w-full"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{user.email}</h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  {user.last_sign_in_at
                    ? `เข้าสู่ระบบล่าสุด: ${new Date(
                        user.last_sign_in_at
                      ).toLocaleDateString()}`
                    : "ยังไม่เคยเข้าสู่ระบบ"}
                  {!user.email_confirmed_at && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      <Mail className="h-3 w-3" />
                      ยังไม่ยืนยัน
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {!user.email_confirmed_at && (
                  <ConfirmAction
                    action={() => handleResendConfirmation(user)}
                    title="ส่งการยืนยันอีกครั้ง"
                    message={`คุณแน่ใจหรือไม่ที่จะส่งอีเมลยืนยันไปยัง ${user.email}?`}
                    confirmText="ส่ง"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 w-full sm:w-auto"
                      disabled={isResending}
                    >
                      <Mail className="h-4 w-4" />
                      {isResending ? "กำลังส่ง..." : "ส่งการยืนยันอีกครั้ง"}
                    </Button>
                  </ConfirmAction>
                )}
                <ConfirmAction
                  action={() => handleResetPassword(user)}
                  title="รีเซ็ตรหัสผ่าน"
                  message={`คุณแน่ใจหรือไม่ที่จะรีเซ็ตรหัสผ่านสำหรับ ${user.email}?`}
                  confirmText="รีเซ็ต"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 w-full sm:w-auto"
                    disabled={isResetting}
                  >
                    <KeyRound className="h-4 w-4" />
                    {isResetting ? "กำลังรีเซ็ต..." : "รีเซ็ตรหัสผ่าน"}
                  </Button>
                </ConfirmAction>
                <ConfirmAction
                  action={() => handleDelete(user)}
                  title="ลบผู้ใช้"
                  message={`คุณแน่ใจหรือไม่ที่จะลบ ${user.email}? การกระทำนี้ไม่สามารถยกเลิกได้`}
                  confirmText="ลบ"
                >
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-2 w-full sm:w-auto"
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4" />
                    {isDeleting ? "กำลังลบ..." : "ลบ"}
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
