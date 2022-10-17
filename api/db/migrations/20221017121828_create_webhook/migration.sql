-- CreateTable
CREATE TABLE "Webhook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "alias" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "destinationEndpoints" TEXT NOT NULL,
    "invocationUri" TEXT NOT NULL,
    "maxDelaySeconds" INTEGER,
    "startAt" DATETIME,
    "invocations" INTEGER NOT NULL,
    "isEnabled" BOOLEAN NOT NULL,
    "isArchived" BOOLEAN NOT NULL,
    "isDeleted" BOOLEAN NOT NULL
);
