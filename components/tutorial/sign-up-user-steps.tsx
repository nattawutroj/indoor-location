import Link from "next/link";
import { TutorialStep } from "./tutorial-step";
import { ArrowUpRight } from "lucide-react";

export default function SignUpUserSteps() {
  return (
    <ol className="flex flex-col gap-6">
      {process.env.VERCEL_ENV === "preview" ||
      process.env.VERCEL_ENV === "production" ? (
        <TutorialStep title="ตั้งค่า URL สำหรับการเปลี่ยนเส้นทาง">
          <p>ดูเหมือนว่าแอปนี้ถูกโฮสต์บน Vercel</p>
          <p className="mt-4">
            การติดตั้งนี้เป็น
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
              "{process.env.VERCEL_ENV}"
            </span>{" "}
            บน
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
              https://{process.env.VERCEL_URL}
            </span>
          </p>
          <p className="mt-4">
            คุณจะต้อง{" "}
            <Link
              className="text-primary hover:text-foreground"
              href={
                "https://supabase.com/dashboard/project/_/auth/url-configuration"
              }
            >
              อัปเดตโปรเจค Supabase ของคุณ
            </Link>{" "}
            ด้วย URL สำหรับการเปลี่ยนเส้นทางตาม URL การติดตั้ง Vercel ของคุณ
          </p>
          <ul className="mt-4">
            <li>
              -{" "}
              <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                http://localhost:3000/**
              </span>
            </li>
            <li>
              -{" "}
              <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/**`}
              </span>
            </li>
            <li>
              -{" "}
              <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(".vercel.app", "")}-*-[vercel-team-url].vercel.app/**`}
              </span>{" "}
              (URL ทีม Vercel สามารถพบได้ใน{" "}
              <Link
                className="text-primary hover:text-foreground"
                href="https://vercel.com/docs/accounts/create-a-team#find-your-team-id"
                target="_blank"
              >
                การตั้งค่าทีม Vercel
              </Link>
              )
            </li>
          </ul>
          <Link
            href="https://supabase.com/docs/guides/auth/redirect-urls#vercel-preview-urls"
            target="_blank"
            className="text-primary/50 hover:text-primary flex items-center text-sm gap-1 mt-4"
          >
            เอกสาร URL สำหรับการเปลี่ยนเส้นทาง <ArrowUpRight size={14} />
          </Link>
        </TutorialStep>
      ) : null}
      <TutorialStep title="สมัครสมาชิกผู้ใช้คนแรก">
        <p>
          ไปที่หน้า{" "}
          <Link
            href="/sign-up"
            className="font-bold hover:underline text-foreground/80"
          >
            สมัครสมาชิก
          </Link>{" "}
          และสมัครสมาชิกผู้ใช้คนแรก ไม่เป็นไรถ้าเป็นแค่คุณตอนนี้ ไอเดียที่ยอดเยี่ยมของคุณจะมีผู้ใช้มากมายในภายหลัง!
        </p>
      </TutorialStep>
    </ol>
  );
}
