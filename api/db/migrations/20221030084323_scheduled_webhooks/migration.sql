-- CreateTable
CREATE TABLE "ScheduledInvocation" (
    "id" TEXT NOT NULL,
    "webhookId" TEXT NOT NULL,
    "invokeEndpointAt" TIMESTAMP(3) NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "successfulResponse" BOOLEAN NOT NULL,
    "endpointUri" TEXT NOT NULL,

    CONSTRAINT "ScheduledInvocation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScheduledInvocation" ADD CONSTRAINT "ScheduledInvocation_webhookId_fkey" FOREIGN KEY ("webhookId") REFERENCES "Webhook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
