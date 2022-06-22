/*
  Warnings:

  - The values [REFRESH,VERIFY_EMAIL,RESET_PASSWORD] on the enum `TOKEN_TYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TOKEN_TYPE_new" AS ENUM ('access', 'refresh', 'resetPassword', 'verifyEmail');
ALTER TABLE "Token" ALTER COLUMN "type" TYPE "TOKEN_TYPE_new" USING ("type"::text::"TOKEN_TYPE_new");
ALTER TYPE "TOKEN_TYPE" RENAME TO "TOKEN_TYPE_old";
ALTER TYPE "TOKEN_TYPE_new" RENAME TO "TOKEN_TYPE";
DROP TYPE "TOKEN_TYPE_old";
COMMIT;
