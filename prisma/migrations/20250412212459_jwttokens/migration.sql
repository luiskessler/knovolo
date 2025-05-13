-- CreateEnum
CREATE TYPE "JWTTokenStatus" AS ENUM ('active', 'used', 'revoked');

-- CreateEnum
CREATE TYPE "JWTTokenPurpose" AS ENUM ('userPasswordReset', 'orgVerifyOrganization');

-- CreateEnum
CREATE TYPE "OrgEmailTypes" AS ENUM ('orgVerifyOrg', 'orgVerifyConfirmWelcome', 'orgUserAdded', 'orgReminderActivationSevenDays', 'orgReminderActivationMarkedForDeletion', 'orgTrialPeriodEndingSoon', 'orgTrialPeriodEnded', 'orgPaymentInformationSet', 'orgPaymentInformationUpdated');

-- CreateEnum
CREATE TYPE "UserEmailTypes" AS ENUM ('userInvite', 'userPasswordResetLink', 'userPasswordResetConfirm', 'userWelcomeAfterSignup');

-- CreateTable
CREATE TABLE "JwtTokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "state" "JWTTokenStatus" NOT NULL DEFAULT 'active',
    "purpose" "JWTTokenPurpose" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "organizationId" TEXT,

    CONSTRAINT "JwtTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationEmails" (
    "id" TEXT NOT NULL,
    "type" "OrgEmailTypes" NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganizationEmails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEmails" (
    "id" TEXT NOT NULL,
    "type" "UserEmailTypes" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserEmails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JwtTokens_token_key" ON "JwtTokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "JwtTokens_userId_organizationId_key" ON "JwtTokens"("userId", "organizationId");

-- AddForeignKey
ALTER TABLE "JwtTokens" ADD CONSTRAINT "JwtTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JwtTokens" ADD CONSTRAINT "JwtTokens_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationEmails" ADD CONSTRAINT "OrganizationEmails_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEmails" ADD CONSTRAINT "UserEmails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
