-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "image" TEXT,
    "role" TEXT DEFAULT 'Club Member',
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
