# 🏠 Flatmates

Flatmates is a platform that lets users search and list flatmates/roommates across multiple cities. Users can add, delete, bookmark and track listings, search by city or location, and apply filters for better discovery. The app supports paid featured listings for higher visibility, secure user authentication and stripe checkout to add featured listing (which ranks on top of search results), fast search with pagination, and a smooth, mobile-friendly experience designed for real-world use.

---

## ✨ Features

- 🔐 **Authentication & Authorization**
  - Email/password signup & login
  - JWT + HTTP‑only cookies for secure sessions

- 🏘️ **Listings & Discovery**
  - Create, update, and delete room/flat listings
  - Fields like location, city, rent, accommodation type, gender preference, facilities, contact info
  - Dedicated listing details page with contact CTAs (call / email)
  - Popular cities quick‑select section to jump into search

- ⭐ **Featured Listings & Payments**
  - Upgrade a listing to “Featured” via Stripe Checkout
  - Stripe webhook marks listing as `isFeatured: true` after successful payment
  - Transaction documents stored in MongoDB and linked to the user (`myTransactions`)

- 📑 **Bookmarks & User Dashboard**
  - Bookmark/unbookmark listings and persist them in the user document
  - My Listings: manage all listings created by the logged‑in user
  - My Bookmarks: view saved listings
  - Transaction History: list of successful payments with a modern skeleton/empty state

- 🎨 **Modern UI / UX**
  - Next.js App Router with client components for interactive flows
  - Tailwind CSS for a clean, responsive UI
  - Toast feedback (success/error) with react‑hot‑toast
  - Loading shimmers, empty states, and minimalist success/cancel pages for payments

---

## 🛠 Tech Stack

| Layer     | Technologies                                                                 |
|----------|-------------------------------------------------------------------------------|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS, Axios, Redux Toolkit  |
| Backend  | Node.js, Express.js, TypeScript/JavaScript, Stripe SDK, Mongoose             |
| Database | MongoDB (Atlas in production )                                               |
| Other    | JWT, bcrypt, react‑hot‑toast, Cloudinary (for images)   |

---

## 📁 Project Structure
 ```
FLATMATES
├── backend
│   ├── dist
│   ├── node_modules
│   ├── src
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── frontend
│   ├── .next
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── redux
│   │   ├── utils
│   │   └── middleware.ts
│   ├── .env.local
│   ├── .gitignore
│   ├── globals.d.ts
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   └── pnpm-lock.yaml
│
└── readme.md
```

---

## ⚙️ Environment Setup

### Prerequisites

- Node.js (22+ recommended)
- npm or pnpm
- MongoDB instance (local or MongoDB Atlas)
- Stripe account + API keys
- Cloudinary account for image hosting + API keys

### 1. Clone the Repository
```
git clone https://github.com/sushilkrg/flatmates.git
cd flatmates

```
### 2. Backend Setup

```
Inside your backend directory (e.g. `backend/`):
cd backend
npm install

```

Create a `.env` file:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLIENT_URL=http://localhost:3000

for image hosting
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Run the backend in dev mode:
```
npm run build
npm run start

```

### 3. Frontend Setup

Inside your Next.js client directory (e.g. `frontend/`):
```

cd frontend
pnpm install

```

Create `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Run the dev server:

```
pnpm dev
```


---

## 🔐 Core Backend Models (Conceptual)

### User

- `fullName`, `email`, `password`
- Arrays:
  - `myListings: ObjectId[]` → Listings created by the user
  - `myBookmarkedListings: ObjectId[]` → Saved listings
  - `myTransactions: ObjectId[]` → Related Stripe transactions
- `role: "user" | "admin"`

### Listing

- `location`, `cityName`, `rent`, `accommodationType`, `lookingForGender`
- `facilities: string[]`
- `contactNumber`, `contactEmail`, `postedByName`, `userId`
- `isFeatured: boolean`
- `createdAt`, `updatedAt`

### Transaction

- `userId`, `listingId`
- `amount`, `status` (e.g. `success`, `failed`, `pending`)
- `stripeSessionId`, `paymentIntentId`
- Timestamps for history views

---

## 💳 Stripe Flow (High Level)

1. User clicks “Feature this listing”.
2. Frontend calls backend to create a Stripe Checkout Session.
3. User pays on Stripe’s hosted page.
4. Stripe sends a webhook to `/api/v1/transaction/webhook`.
5. Backend:
   - Verifies the event with `stripe.webhooks.constructEvent`.
   - On `checkout.session.completed`:
     - Sets `Listing.isFeatured = true`.
     - Creates a `Transaction` document.
     - Pushes the transaction `_id` into `User.myTransactions`.

---

## 🔍 API Overview (Typical)

> Adjust paths/verbs to match your actual Express routes.

### Auth

- `POST /api/v1/auth/register` – Register
- `POST /api/v1/auth/login` – Login
- `POST /api/v1/auth/logout` – Logout / clear cookies

### Listings

- `GET /api/v1/listing/search` – Search/filter listings
- `GET /api/v1/listing/details/:id` – Get a single listing
- `POST /api/v1/listing` – Create listing
- `PATCH /api/v1/listing/:id` – Update listing
- `DELETE /api/v1/listing/:id` – Delete listing
- `PATCH /api/v1/listing/bookmark/:id` – Toggle bookmark
- `GET /api/v1/listing/my-listings` – Listings owned by current user
- `GET /api/v1/listing/my-bookmarked-listings` – Listings bookmarked by current user

### Transactions

- `POST /api/v1/transaction/create-checkout-session` – Stripe Checkout Session
- `POST /api/v1/transaction/webhook` – Stripe webhook
- `GET /api/v1/transaction/my-transactions` – Auth user’s transaction history

---

## 🧪 Development Notes

- Use Postman to test backend routes.
- Protect webhook route from body‑parsing conflicts (Stripe expects raw body).
- Keep `.env` files out of version control.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details (or add one if not present yet).

---

## 👤 Author

**Sushil Kumar**  
GitHub: [@sushilkrg](https://github.com/sushilkrg)

If this project helps you, consider ⭐ starring the repo!
