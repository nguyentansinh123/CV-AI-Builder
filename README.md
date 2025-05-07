# CV AI Builder Pro

CV AI Builder Pro is a powerful and intuitive web application that helps users create professional CVs with the assistance of AI. Featuring real-time updates, automatic saving, subscription-based AI capabilities, and a beautiful UI, this tool is perfect for anyone looking to build, manage, and customize multiple CVs effortlessly.

![CV AI Builder Pro Preview](https://github.com/nguyentansinh123/CV-AI-Builder/blob/94a75bf23fcb054e5b3b8e6942fa1d4bc8a44db2/imagesforgit/resume1.png)

## 🚀 Features

- 🔐 **Authentication** – Secure login using Clerk
- 🧠 **AI Assistance** – OpenAI integration to auto-generate text and suggestions
- 📄 **Multiple CVs** – Create, preview, edit, and delete multiple CV forms
- 📦 **Auto-save** – Automatically saves inputs to PostgreSQL every 1.5 seconds of inactivity
- 📸 **Image Upload** – Upload profile pictures using Vercel Blob
- 💳 **Subscription Management** – Stripe integration with webhooks to handle upgrades and access control
- 🖼️ **Real-time Preview** – Live CV preview as you type
- 📅 **Form Metadata** – View CV creation date and number of work experience entries
- 🌙 **Dark Mode** – Toggle light/dark themes for better UX
- 🎨 **Customizable Templates** – Adjust CV colors, image borders, and layouts
- 📄 **PDF Export** – Download your CV in PDF format
- 🌐 **Deployed on Vercel** – Fast and optimized deployment

## 🛠️ Tech Stack

- **Frontend & Backend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [ShadCN/UI](https://ui.shadcn.com/), [Prisma](https://www.prisma.io/), [Webhooks](https://www.redhat.com/en/topics/automation/what-is-a-webhook)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Storage**: [Vercel Blob](https://vercel.com/docs/storage/blob)
- **Payments**: [Stripe](https://stripe.com/)
- **AI Integration**: [OpenAI API](https://openai.com/)
- **Hosting**: [Vercel](https://vercel.com/)

## 📷 Screenshots

| Home & CV Overview | CV Preview | Add Experience |
|--------------------|------------|----------------|
| ![](https://github.com/nguyentansinh123/CV-AI-Builder/blob/94a75bf23fcb054e5b3b8e6942fa1d4bc8a44db2/imagesforgit/Resume2.png) | ![](https://github.com/nguyentansinh123/CV-AI-Builder/blob/6a3b3c04569a0209aeb48d02107a34bb2963f92b/imagesforgit/resume3.png) | ![](https://github.com/nguyentansinh123/CV-AI-Builder/blob/6a3b3c04569a0209aeb48d02107a34bb2963f92b/imagesforgit/resume4.png) |

| Add Education | Upload Image | AI Assistance |
|---------------|--------------|---------------|
| ![](https://github.com/nguyentansinh123/CV-AI-Builder/blob/94a75bf23fcb054e5b3b8e6942fa1d4bc8a44db2/imagesforgit/resume5.png) | ![](https://github.com/nguyentansinh123/CV-AI-Builder/blob/94a75bf23fcb054e5b3b8e6942fa1d4bc8a44db2/imagesforgit/resume6.png) | ![](https://github.com/nguyentansinh123/CV-AI-Builder/blob/94a75bf23fcb054e5b3b8e6942fa1d4bc8a44db2/imagesforgit/resume7.png) |

| Term of Service | Delete CV | Subscription & Payment |
|------------------|-----------|--------------------------|
| ![](https://github.com/nguyentansinh123/CV-AI-Builder/blob/6a3b3c04569a0209aeb48d02107a34bb2963f92b/imagesforgit/resume10.png) | ![](https://github.com/nguyentansinh123/CV-AI-Builder/blob/6a3b3c04569a0209aeb48d02107a34bb2963f92b/imagesforgit/resume11.png) | ![](https://github.com/nguyentansinh123/CV-AI-Builder/blob/6a3b3c04569a0209aeb48d02107a34bb2963f92b/imagesforgit/resume13.png) |

## 📄 How It Works

1. **Sign In** with Clerk
2. **View existing CVs** or create a new one
3. **Add/edit work experience, education, and profile image**
4. **Customize template colors and styles**
5. **Watch real-time preview update** as you type
6. **Auto-save** triggers after 1.5 seconds of inactivity
7. **Export to PDF** anytime
8. **Upgrade via Stripe** to unlock premium features like:
   - Creating unlimited CVs
   - Using AI text suggestions

## 💡 Coming Soon

- 🔍 Enhanced AI personalization

## 🧪 Local Development

```bash
git clone https://github.com/nguyentansinh123/CV-AI-Builder.git
cd CV-AI-Builder
pnpm install
pnpm dev
