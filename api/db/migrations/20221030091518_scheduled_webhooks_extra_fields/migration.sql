/*
  Warnings:

  - Added the required column `httpMethod` to the `ScheduledInvocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payload` to the `ScheduledInvocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `queryParams` to the `ScheduledInvocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScheduledInvocation" ADD COLUMN     "httpMethod" TEXT NOT NULL,
ADD COLUMN     "payload" TEXT NOT NULL,
ADD COLUMN     "queryParams" TEXT NOT NULL;
