<div align="center">
  
  
  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" />
  </div>

  <h3 align="center">A Programming Community Forum Application</h3>

  
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)


## <a name="introduction">🤖 Introduction</a>

Built with Next.js, Codemate is a Stack Overflow-inspired web community forum specifically designed for programming students.  The platform integrates cutting-edge Artificial Intelligence (AI) through the ChatGPT API to provide intelligent responses to user queries and enhance the accuracy of tag descriptions. Additionally, it leverages Component-Based Software Engineering (CBSE) principles to seamlessly integrate various third-party services, creating a cohesive and user-friendly experience for student programmers.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Tailwind CSS
- ShadCN
- React Hook Form
- Zod
- Clerk
- ChatGPT API
- EmailJS
- TinyMCE
- MongoDB
- Vercel
- Sentry

## <a name="features">🔋 Features</a>

👉 **Authentication**: An ultra-secure Clerk service authentication.

👉 **Home Page**: Shows all of the questions posted along with search, filter, and pagination functionality.

👉 **Ask a Question**: Allows user to post questions using the React Hook Form and TinyMCE editor for code snippet.

👉 **Question Details**: Shows the details for each question along with AI-generated answer functionality.

👉 **Tags**: Shows all of the questions for each tag along with AI-generated tag description functionality.

👉 **Collections**: Shows all of the saved questions.

👉 **Community**: Shows all of the users that are using the platform along with their top tags.

👉 **Profile**: Shows the details for each user along with their achievements.

👉 **Support**: Allows user to message the Codemate team via EmailJS service.


and many more, including code architecture and reusability. 

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/shahirulprojects/Codemate.git
cd Codemate
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env.local

#CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_CLERK_WEBHOOK_SECRET=

#TINYMCE
NEXT_PUBLIC_TINY_EDITOR_API_KEY=

#MONGODB
MONGODB_URL=

#OPENAI
OPENAI_API_KEY=

#EMAILJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=

#SENTRY
SENTRY_AUTH_TOKEN=
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=


NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NODE_ENV=production

```

Replace the placeholder values with your actual respective account credentials. You can obtain these credentials by signing up on the [Clerk](https://clerk.com/), [TinyMCE](https://www.tiny.cloud/) , [MongoDB](https://www.mongodb.com/), [OpenAI](https://platform.openai.com/playground), [EmailJS](https://www.emailjs.com/) , and [Sentry](https://sentry.io/welcome/?utm_source=google&utm_medium=cpc&utm_id=%7B20403208976%7D&utm_campaign=Google_Search_Brand_SentryKW_ROW_Alpha&utm_content=g&utm_term=sentry&gad_source=1&gclid=CjwKCAjwyJqzBhBaEiwAWDRJVILOnBSw_ArmnKuwI38GZj0MvCQMSO-gRCFMYwEF-UE2zXXU1PEyIBoC458QAvD_BwE)

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.


