<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js และ Supabase Starter Kit - วิธีที่เร็วที่สุดในการสร้างแอปด้วย Next.js และ Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js และ Supabase Starter Kit</h1>
</a>

<p align="center">
 วิธีที่เร็วที่สุดในการสร้างแอปด้วย Next.js และ Supabase
</p>

<p align="center">
  <a href="#features"><strong>คุณสมบัติ</strong></a> ·
  <a href="#demo"><strong>ตัวอย่าง</strong></a> ·
  <a href="#deploy-to-vercel"><strong>ติดตั้งบน Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>โคลนและรันในเครื่อง</strong></a> ·
  <a href="#feedback-and-issues"><strong>ข้อเสนอแนะและปัญหา</strong></a>
  <a href="#more-supabase-examples"><strong>ตัวอย่างเพิ่มเติม</strong></a>
</p>
<br/>

## คุณสมบัติ

- ทำงานได้กับ [Next.js](https://nextjs.org) ทั้งหมด
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - ใช้งานได้ทันที!
- supabase-ssr. แพ็คเกจสำหรับกำหนดค่า Supabase Auth ให้ใช้คุกกี้
- การจัดรูปแบบด้วย [Tailwind CSS](https://tailwindcss.com)
- คอมโพเนนต์ด้วย [shadcn/ui](https://ui.shadcn.com/)
- สามารถติดตั้งได้ด้วย [Supabase Vercel Integration และ Vercel deploy](#deploy-your-own)
  - ตัวแปรสภาพแวดล้อมจะถูกกำหนดให้กับโปรเจค Vercel โดยอัตโนมัติ

## ตัวอย่าง

คุณสามารถดูตัวอย่างการทำงานได้ที่ [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## ติดตั้งบน Vercel

การติดตั้งบน Vercel จะแนะนำคุณในการสร้างบัญชีและโปรเจค Supabase

หลังจากติดตั้ง Supabase integration แล้ว ตัวแปรสภาพแวดล้อมที่เกี่ยวข้องทั้งหมดจะถูกกำหนดให้กับโปรเจคเพื่อให้การติดตั้งทำงานได้อย่างสมบูรณ์

[![ติดตั้งด้วย Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

ด้านบนจะโคลน Starter kit ไปยัง GitHub ของคุณด้วย คุณสามารถโคลนมาพัฒนาในเครื่องของคุณได้

หากคุณต้องการเพียงแค่พัฒนาภายในเครื่องและไม่ต้องการติดตั้งบน Vercel [ทำตามขั้นตอนด้านล่าง](#clone-and-run-locally)

## โคลนและรันในเครื่อง

1. คุณจะต้องมีโปรเจค Supabase ซึ่งสามารถสร้างได้ [ผ่าน Supabase dashboard](https://database.new)

2. สร้างแอป Next.js โดยใช้เทมเพลต Supabase Starter ด้วยคำสั่ง npx

   ```bash
   npx create-next-app --example with-supabase with-supabase-app
   ```

   ```bash
   yarn create next-app --example with-supabase with-supabase-app
   ```

   ```bash
   pnpm create next-app --example with-supabase with-supabase-app
   ```

3. ใช้คำสั่ง `cd` เพื่อเปลี่ยนไปยังไดเรกทอรีของแอป

   ```bash
   cd with-supabase-app
   ```

4. เปลี่ยนชื่อ `.env.example` เป็น `.env.local` และอัปเดตค่าต่อไปนี้:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[ใส่ URL ของโปรเจค Supabase]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[ใส่ API ANON KEY ของโปรเจค Supabase]
   ```

   ทั้ง `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_ANON_KEY` สามารถพบได้ใน [การตั้งค่า API ของโปรเจค Supabase](https://app.supabase.com/project/_/settings/api)

5. ตอนนี้คุณสามารถรันเซิร์ฟเวอร์ Next.js สำหรับการพัฒนาภายในเครื่องได้:

   ```bash
   npm run dev
   ```

   Starter kit ควรจะทำงานบน [localhost:3000](http://localhost:3000/)

6. เทมเพลตนี้มาพร้อมกับสไตล์ shadcn/ui เริ่มต้น หากคุณต้องการสไตล์ ui.shadcn อื่นๆ ให้ลบ `components.json` และ [ติดตั้ง shadcn/ui ใหม่](https://ui.shadcn.com/docs/installation/next)

> ดู [เอกสารสำหรับการพัฒนาภายในเครื่อง](https://supabase.com/docs/guides/getting-started/local-development) เพื่อรัน Supabase ในเครื่องด้วย

## ข้อเสนอแนะและปัญหา

กรุณาส่งข้อเสนอแนะและรายงานปัญหาที่ [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose)

## ตัวอย่าง Supabase เพิ่มเติม

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth และ Next.js 13 App Router (คอร์สฟรี)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth และ Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
