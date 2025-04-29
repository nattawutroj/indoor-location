import { TutorialStep } from "./tutorial-step";

export default function ConnectSupabaseSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="สร้างโปรเจค Supabase">
        <p>
          ไปที่{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
          >
            database.new
          </a>{" "}
          และสร้างโปรเจค Supabase ใหม่
        </p>
      </TutorialStep>

      <TutorialStep title="กำหนดตัวแปรสภาพแวดล้อม">
        <p>
          เปลี่ยนชื่อไฟล์{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            .env.example
          </span>{" "}
          ในแอป Next.js ของคุณเป็น{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            .env.local
          </span>{" "}
          และกรอกค่าจาก{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
          >
            การตั้งค่า API ของโปรเจค Supabase ของคุณ
          </a>
        </p>
      </TutorialStep>

      <TutorialStep title="รีสตาร์ทเซิร์ฟเวอร์ Next.js สำหรับการพัฒนา">
        <p>
          คุณอาจต้องปิดเซิร์ฟเวอร์ Next.js สำหรับการพัฒนาและรัน{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            npm run dev
          </span>{" "}
          อีกครั้งเพื่อโหลดตัวแปรสภาพแวดล้อมใหม่
        </p>
      </TutorialStep>

      <TutorialStep title="รีเฟรชหน้าเว็บ">
        <p>
          คุณอาจต้องรีเฟรชหน้าเว็บเพื่อให้ Next.js โหลดตัวแปรสภาพแวดล้อมใหม่
        </p>
      </TutorialStep>
    </ol>
  );
}
