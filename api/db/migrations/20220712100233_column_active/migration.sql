/*
  Warnings:

  - You are about to alter the column `active` on the `Site` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Site" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "commercial" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "contact" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "billingAddress" TEXT NOT NULL,
    "typeofPass" TEXT NOT NULL
);
INSERT INTO "new_Site" ("active", "billingAddress", "commercial", "contact", "id", "mail", "name", "phone", "siret", "type", "typeofPass") SELECT "active", "billingAddress", "commercial", "contact", "id", "mail", "name", "phone", "siret", "type", "typeofPass" FROM "Site";
DROP TABLE "Site";
ALTER TABLE "new_Site" RENAME TO "Site";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
