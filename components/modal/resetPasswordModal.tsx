"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";

interface ResetPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReset: (newPassword: string) => void;
  userEmail: string;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  open,
  onOpenChange,
  onReset,
  userEmail,
}) => {
  const [newPassword, setNewPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReset(newPassword);
    setNewPassword("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle>รีเซ็ตรหัสผ่าน</DialogTitle>
          <DialogDescription>
            กรอกรหัสผ่านใหม่สำหรับ {userEmail}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="newPassword">รหัสผ่านใหม่</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="กรอกรหัสผ่านใหม่"
                className="pl-10 w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              ยกเลิก
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              รีเซ็ตรหัสผ่าน
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 