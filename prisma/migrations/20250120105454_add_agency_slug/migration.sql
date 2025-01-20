/*
  Warnings:

  - You are about to drop the `Agency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgencyAward` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgencyImpact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgencyIndustry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgencyLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgencyService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgencySocialLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscriptions_plans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."AgencyAward" DROP CONSTRAINT "AgencyAward_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AgencyImpact" DROP CONSTRAINT "AgencyImpact_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AgencyIndustry" DROP CONSTRAINT "AgencyIndustry_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AgencyLocation" DROP CONSTRAINT "AgencyLocation_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AgencyService" DROP CONSTRAINT "AgencyService_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AgencySocialLink" DROP CONSTRAINT "AgencySocialLink_agencyId_fkey";

-- DropTable
DROP TABLE "public"."Agency";

-- DropTable
DROP TABLE "public"."AgencyAward";

-- DropTable
DROP TABLE "public"."AgencyImpact";

-- DropTable
DROP TABLE "public"."AgencyIndustry";

-- DropTable
DROP TABLE "public"."AgencyLocation";

-- DropTable
DROP TABLE "public"."AgencyService";

-- DropTable
DROP TABLE "public"."AgencySocialLink";

-- DropTable
DROP TABLE "public"."invoices";

-- DropTable
DROP TABLE "public"."payments";

-- DropTable
DROP TABLE "public"."subscriptions";

-- DropTable
DROP TABLE "public"."subscriptions_plans";

-- DropTable
DROP TABLE "public"."user";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "gender" TEXT,
    "profile_image_url" TEXT,
    "user_id" TEXT NOT NULL,
    "subscription" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripe_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "payment_time" TEXT NOT NULL,
    "payment_date" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "customer_details" TEXT NOT NULL,
    "payment_intent" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscription_id" TEXT NOT NULL,
    "stripe_user_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT,
    "plan_id" TEXT NOT NULL,
    "default_payment_method_id" TEXT,
    "email" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions_plans" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plan_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "interval" TEXT NOT NULL,

    CONSTRAINT "subscriptions_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invoice_id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "amount_paid" TEXT NOT NULL,
    "amount_due" TEXT,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agency" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "reviews" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "budgetRange" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "employees" TEXT NOT NULL,
    "founded" INTEGER NOT NULL,
    "expertise" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "trackRecord" TEXT NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "AgencyService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyIndustry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "AgencyIndustry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "AgencyLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencySocialLink" (
    "id" SERIAL NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "AgencySocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyAward" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "AgencyAward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyImpact" (
    "id" SERIAL NOT NULL,
    "experience" TEXT NOT NULL,
    "revenue" TEXT NOT NULL,
    "businesses" TEXT NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "AgencyImpact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_user_id_key" ON "user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Agency_slug_key" ON "Agency"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyImpact_agencyId_key" ON "AgencyImpact"("agencyId");

-- AddForeignKey
ALTER TABLE "AgencyService" ADD CONSTRAINT "AgencyService_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyIndustry" ADD CONSTRAINT "AgencyIndustry_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyLocation" ADD CONSTRAINT "AgencyLocation_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencySocialLink" ADD CONSTRAINT "AgencySocialLink_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyAward" ADD CONSTRAINT "AgencyAward_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyImpact" ADD CONSTRAINT "AgencyImpact_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
