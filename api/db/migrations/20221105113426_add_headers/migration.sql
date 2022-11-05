/*
  Warnings:

  - Added the required column `headers` to the `ScheduledInvocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScheduledInvocation" ADD COLUMN     "headers" TEXT NOT NULL;
