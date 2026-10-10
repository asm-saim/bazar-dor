<div>

# 🛒 বাজার দর | BazarDor

>Daily essential-commodity prices for Bangladesh, in Bangla, all in one place.

## About

**BazarDor (বাজার দর)** is a Bangla-first web app that shows today's market prices of everyday items such as rice, lentils, oil, vegetables, fish, meat, eggs, milk and spices.

Visitors can see which prices went up or down today, browse items by category, and open any product to compare its minimum, maximum and average price across different bazaars. Prices, dates and percentages are shown with Bengali numerals, and the layout works on mobile, tablet and desktop.


## Live Demo

🔗 **[View Live Site](https://bazar-dor-v1.vercel.app/)**


![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-Auth-15803d?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)

</div>

---

## Key Features

- **Live price ticker and daily movement.** A scrolling ticker shows each product's emoji, name, price and daily change. The home page lists the **top 6 risers** and **top 6 fallers**, and every product has a colour-coded change badge.
- **Category browsing with sorting.** A category bar highlights the active category. Each category page can be sorted by default order, price low to high, or price high to low, comparing real numeric values and not text.
- **Detailed, market-wise product pages.** Every product has its own page with the price summary (minimum, maximum, average) and a table of prices for each bazaar by division. These pages are **protected** and open only after login.
- **Secure authentication with Better Auth.** Sign in or sign up with **email and password**, **Google** or **GitHub**. Toast messages confirm login, sign-up, logout and validation errors, and protected pages redirect visitors to the sign-in page.
- **Profile management.** Logged-in users get a header menu with their photo (when available) and name. They can open **My Profile** and update their name on a separate **Update Information** page.

**Also included**

- Fully responsive layout (mobile, tablet, desktop)
- Skeleton loaders while data is fetching
- Friendly custom **404 page** for invalid routes, categories and products
- Hero banner with an anchor-link CTA that scrolls to the **সব পণ্য** section
- Bangla date, Bengali numerals and the Hind Siliguri font throughout

## Technologies Used

| Category               | Technology                          |
| ---------------------- | ----------------------------------- |
| **Language**           | TypeScript                          |
| **Framework**          | Next.js 16                          |
| **UI Library**         | React, HeroUI                       |
| **Styling**            | Tailwind CSS, DaisyUI               |
| **Authentication**     | Better Auth (Email, Google, GitHub) |
| **Database**           | MongoDB Atlas                       |
| **Routing**            | Next.js App Router                  |
| **Notifications**      | Sonner                              |
| **Price Ticker**       | react-marquee-text                  |
| **Data**               | REST API                            |
| **Image Optimization** | Next.js Image                       |
| **Fonts**              | Google Fonts (Hind Siliguri)        |
| **Deployment**         | Vercel                              |

## Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Hero, risers, fallers and all products | Public |
| `/category/[slug]` | Products of one category, with sorting | Public |
| `/product/[id]` | Product details and market-wise prices | 🔒 Login required |
| `/signin` | Sign in (email, Google, GitHub) | Public |
| `/signup` | Create an account | Public |
| `/profile` | My Profile | 🔒 Login required |
| `/profile/update` | Update name | 🔒 Login required |


## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home
│   ├── category/[slug]/         # Category page
│   ├── product/[id]/            # Product details (protected)
│   ├── signin/  signup/         # Authentication pages
│   ├── profile/                 # My Profile + update page
│   ├── api/auth/[...all]/       # Better Auth route handler
│   ├── not-found.tsx            # Custom 404
│   └── layout.tsx
├── components/                  # Header, Hero, Marquee, ProductCard, Footer, skeletons...
├── lib/                         # auth, auth-client, data fetching, helpers
└── proxy.ts                     # Route protection
```

---

