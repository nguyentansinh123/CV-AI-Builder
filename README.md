# CV AI Builder Pro

CV AI Builder Pro is a powerful and intuitive web application that helps users create professional CVs with the assistance of AI. Featuring real-time updates, automatic saving, subscription-based AI capabilities, and a beautiful UI, this tool is perfect for anyone looking to build, manage, and customize multiple CVs effortlessly.

![CV AI Builder Pro Preview](./screenshots/hero.png)

## 🚀 Features

- 🔐 **Authentication** – Secure login using Clerk
- 🧠 **AI Assistance** – OpenAI integration to auto-generate text and suggestions
- 📄 **Multiple CVs** – Create, preview, edit, and delete multiple CV forms
- 📦 **Auto-save** – Automatically saves inputs to PostgreSQL every 1.5 seconds of inactivity
- 📸 **Image Upload** – Upload profile pictures using Vercel Blob
- 💳 **Subscription Management** – Stripe integration with webhooks to handle upgrades and access control
- 🖼️ **Real-time Preview** – Live CV preview as you type
- 📅 **Form Metadata** – View CV creation date and number of work experience entries
- 🌐 **Deployed on Vercel** – Fast and optimized deployment
- 🎨 **Customizable Templates** – Change CV color themes, image borders, and layout styles
- 🌐 **PDF Export** – Export the Cv to PDF form

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [ShadCN/UI](https://ui.shadcn.com/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Storage**: [Vercel Blob](https://vercel.com/docs/storage/blob)
- **Payments**: [Stripe](https://stripe.com/)
- **AI Integration**: [OpenAI API](https://openai.com/)
- **Hosting**: [Vercel](https://vercel.com/)

## 📷 Screenshots

| Home Page | CV Preview | Add Experience |
|-----------|------------|----------------|
| ![Home](./screenshots/1-home.png) | ![Preview](./screenshots/2-preview.png) | ![Experience](./screenshots/3-experience.png) |

| Add Education | Upload Image | AI Assistance |
|---------------|--------------|---------------|
| ![Education](./screenshots/4-education.png) | ![Image](./screenshots/5-upload.png) | ![AI](./screenshots/6-ai.png) |

| Subscription Status | Stripe Payment | Mobile View |
|---------------------|----------------|-------------|
| ![Subscription](./screenshots/7-status.png) | ![Stripe](./screenshots/8-stripe.png) | ![Mobile](./screenshots/9-mobile.png) |

| Success Page |
|--------------|
| ![Success](./screenshots/10-success.png) |

## 📄 How It Works

1. **Sign In** with Clerk
2. **View existing CVs** or create a new one
3. **Add/edit work experience, education, and images**
4. **Watch live preview** update in real time
5. **Auto-save** triggers after 1.5s of inactivity
6. **Upgrade via Stripe** to unlock premium features like:
   - Creating multiple CVs
   - Using AI text suggestions

## 💡 Coming Soon

- PDF Export
- More customizable templates
- Dark mode
- Enhanced AI personalization
