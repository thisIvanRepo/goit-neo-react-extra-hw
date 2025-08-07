
# React Extra Homework Project. Contacts app

Live: [https://goit-neo-react-extra-hw-peach.vercel.app/](https://goit-neo-react-extra-hw-peach.vercel.app/)

This is a single-page application (SPA) homework project. It includes user authentication, form handling, routing, and a modern UI powered by Tailwind CSS and Radix UI.

---

## 🚀 Tech Stack

- **React** (with TypeScript)
- **Redux Toolkit**
- **React Router**
- **Formik + Yup** (form validation)
- **Axios** (HTTP requests)
- **Tailwind CSS**
- **Radix UI + Lucide React** (UI components & icons)
- **Sonner** (toast notifications)
- **Vite** (build tool)
- **Vercel** (deployment)

---

## 🛠️ Installation

> Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) installed.

### 1. Clone the repository

```bash
git clone https://github.com/thisIvanRepo/your-repo.git
cd goit-neo-react-extra-hw
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Run the development server

```bash
npm run dev
```

---

## 📦 Available Scripts

| Command            | Description                     |
|--------------------|---------------------------------|
| `npm run dev`      | Start the development server    |
| `npm run build`    | Build for production            |
| `npm run preview`  | Preview the production build    |

---

## ⚙️ SPA Routing on Vercel

The `vercel.json` file includes a rewrite rule to support client-side routing for SPA:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This prevents 404 errors when refreshing or directly accessing routes like `/login`.

---

## 📁 Project Structure

- `src/` – Components, pages, Redux logic
- `public/` – Static assets
- `vercel.json` – SPA routing rules for deployment
- `vite.config.ts` – Build configuration

---

## 👤 Author

**Ivan Popovych** – Frontend developer in training, building his first production-ready applications with confidence 💪
