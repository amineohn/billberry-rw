-- CreateTable
CREATE TABLE "Customer"
(
  "id"   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT    NOT NULL
);

-- CreateTable
CREATE TABLE "Site"
(
  "id"   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT    NOT NULL
);

-- CreateTable
CREATE TABLE "Container"
(
  "id"   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT    NOT NULL
);

-- CreateTable
CREATE TABLE "Material"
(
  "id"   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT    NOT NULL
);

-- CreateTable
CREATE TABLE "Service"
(
  "id"   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT    NOT NULL
);

-- CreateTable
CREATE TABLE "Worker"
(
  "id"   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT    NOT NULL
);

-- CreateTable
CREATE TABLE "Equipment"
(
  "id"   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT    NOT NULL
);

-- CreateTable
CREATE TABLE "Task"
(
  "id"          INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
  "plannedAt"   DATETIME NOT NULL,
  "workerId"    INTEGER  NOT NULL,
  "customerId"  INTEGER  NOT NULL,
  "siteId"      INTEGER  NOT NULL,
  "containerId" INTEGER  NOT NULL,
  "materialId"  INTEGER  NOT NULL,
  "serviceId"   INTEGER  NOT NULL,
  CONSTRAINT "Task_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Task_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Task_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "Container" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Task_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Task_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Task_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
