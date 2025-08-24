# Blog Project

این پروژه یک وبلاگ شخصی است که با Next.js 15، React 19، TypeScript و Tailwind
CSS ساخته شده است.

## ویژگی‌ها

- ✨ Next.js 15 با App Router
- 🚀 React 19
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 📱 Responsive Design
- 🌙 Dark/Light Theme
- 📝 MDX Support (حذف شده)
- 🔍 ESLint + Prettier

## نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 18+
- pnpm

### نصب dependencies

```bash
pnpm install
```

### اجرای پروژه در حالت توسعه

```bash
pnpm dev
```

### ساخت پروژه

```bash
pnpm build
```

### اجرای پروژه

```bash
pnpm start
```

## کد و کیفیت

### ESLint

این پروژه از ESLint v9 با کانفیگ flat config استفاده می‌کند. برای اجرای lint:

```bash
pnpm lint
```

### Prettier

برای فرمت کردن کد:

```bash
pnpm format
```

برای بررسی فرمت کد:

```bash
pnpm format:check
```

### Scripts موجود

- `pnpm dev` - اجرای پروژه در حالت توسعه
- `pnpm build` - ساخت پروژه
- `pnpm start` - اجرای پروژه
- `pnpm lint` - اجرای ESLint
- `pnpm format` - فرمت کردن کد با Prettier
- `pnpm format:check` - بررسی فرمت کد
- `pnpm test-db` - تست اتصال به دیتابیس

## ساختار پروژه

```
blog/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard routes
│   ├── (root)/           # Public routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
├── containers/            # Page-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── models/                # Database models
├── services/              # API services
├── types/                 # TypeScript types
├── uis/                   # UI components
├── utils/                 # Utility functions
├── eslint.config.mjs      # ESLint configuration
├── .prettierrc           # Prettier configuration
└── .prettierignore       # Prettier ignore patterns
```

## تکنولوژی‌های استفاده شده

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: Custom
- **State Management**: React Hooks
- **Code Quality**: ESLint + Prettier
- **Package Manager**: pnpm

## نکات مهم

- پروژه از ESLint flat config استفاده می‌کند
- Prettier برای فرمت کردن کد استفاده می‌شود
- MDX support حذف شده است
- از Tailwind CSS v4 استفاده می‌شود
- پروژه از React 19 features استفاده می‌کند

## مشارکت

برای مشارکت در پروژه:

1. Fork کنید
2. Branch جدید بسازید
3. تغییرات را commit کنید
4. Pull Request ارسال کنید

## لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.
