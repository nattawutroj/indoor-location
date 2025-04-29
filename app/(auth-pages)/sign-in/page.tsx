import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">เข้าสู่ระบบ</h1>
      <p className="text-sm text-foreground">
        ยังไม่มีบัญชี?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          สมัครสมาชิก
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">อีเมล</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">รหัสผ่าน</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            ลืมรหัสผ่าน?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="รหัสผ่านของคุณ"
          required
        />
        <SubmitButton pendingText="กำลังเข้าสู่ระบบ..." formAction={signInAction}>
          เข้าสู่ระบบ
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
