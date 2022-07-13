/*
  Warnings:

  - Added the required column `active` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingAddress` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commercial` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mail` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siret` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeofPass` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Site" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "commercial" TEXT NOT NULL,
    "active" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "billingAddress" TEXT NOT NULL,
    "typeofPass" TEXT NOT NULL
);
INSERT INTO "new_Site" ("id", "name") SELECT "id", "name" FROM "Site";
DROP TABLE "Site";
ALTER TABLE "new_Site" RENAME TO "Site";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
