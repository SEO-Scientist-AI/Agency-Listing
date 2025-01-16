# Getting Started

## Prerequisites
- Node.js and yarn/bun installed
- Accounts and API keys for:
  - Supabase
  - Stripe (if using payments)
  - Clerk (if using authentication)

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   yarn
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   SUPABASE_URL=<your-supabase-project-url>
   SUPABASE_SERVICE_KEY=<your-supabase-service-key>

   # If using Stripe
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   NEXT_PUBLIC_STRIPE_PRICE_ID=<your-stripe-price-id>

   # If using Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
   CLERK_SECRET_KEY=<your-clerk-secret-key>
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

4. Configure features:
   In `config.ts`, set the desired features:
   ```typescript
   const config = {
     auth: {
       enabled: true, // set it true
     },
     payments: {
       enabled: false, // Set to false for now 
     }
   };
   ```

5. Set up the database:  // skip this step
   Run Prisma migrations:
   ```
   npx prisma migrate dev
   ```

6. Start the development server:
   ```
   yarn dev
   ```

7. Open your browser and navigate to `http://localhost:3000` to see your application running.

