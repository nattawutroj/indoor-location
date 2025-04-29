import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">รีเซ็ตรหัสผ่าน</h1>
      <p className="text-sm text-foreground/60">
        กรุณากรอกรหัสผ่านใหม่ด้านล่าง
      </p>
      <Label htmlFor="password">รหัสผ่านใหม่</Label>
      <Input
        type="password"
        name="password"
        placeholder="รหัสผ่านใหม่"
        required
      />
      <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="ยืนยันรหัสผ่าน"
        required
      />
      <SubmitButton formAction={resetPasswordAction}>
        รีเซ็ตรหัสผ่าน
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
