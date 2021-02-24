# Migration `20210216235440-migration`

This migration has been generated by John Postlewaite at 2/16/2021, 3:54:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "imageURL" TEXT NOT NULL,
    "thumbnailImageURL" TEXT NOT NULL DEFAULT 'https://f002.backblazeb2.com/file/redwood-photo/021b311d99c34cdb88fa7daab0b6540amini',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "galleryId" INTEGER NOT NULL,

    FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("id", "order", "imageURL", "createdAt", "galleryId") SELECT "id", "order", "imageURL", "createdAt", "galleryId" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON

PRAGMA foreign_keys=off;
DROP TABLE "AuthorizationRequest";
PRAGMA foreign_keys=on
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201202214007-migration..20210216235440-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,40 +1,30 @@
-datasource DS {
-  // optionally set multiple providers
-  // example: provider = ["sqlite", "postgresql"]
-  provider = "sqlite"
-  url = "***"
-}
-
-generator client {
-  provider      = "prisma-client-js"
-  binaryTargets = ["native", "rhel-openssl-1.0.x"]
-}
-
-model Gallery {
-  id           Int      @id @default(autoincrement())
-  name         String   @unique
-  tripDate     DateTime
-  latitude     Float
-  longitude    Float
-  createdAt    DateTime @default(now())
-  iconImageURL String
-  photos       Photo[]
-}
-
-model Photo {
-  id        Int      @id @default(autoincrement())
-  order     Int
-  imageURL  String
-  createdAt DateTime @default(now())
-  gallery   Gallery  @relation(fields: [galleryId], references: [id])
-  galleryId Int
-}
-
-model AuthorizationRequest {
-  id                       Int    @id @default(autoincrement())
-  authorizationToken       String
-  backblazeApiUrl          String
-  backblazeDownloadUrl     String
-  backblazeUploadUrl       String
-  backblazeUploadAuthToken String
-}
+datasource DS {
+  provider = ["sqlite", "postgresql"]
+  url = "***"
+}
+
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = ["native", "rhel-openssl-1.0.x"]
+}
+
+model Gallery {
+  id           Int      @id @default(autoincrement())
+  name         String   @unique
+  tripDate     DateTime
+  latitude     Float
+  longitude    Float
+  createdAt    DateTime @default(now())
+  iconImageURL String
+  photos       Photo[]
+}
+
+model Photo {
+  id                Int      @id @default(autoincrement())
+  order             Int
+  imageURL          String
+  thumbnailImageURL String   @default("https://f002.backblazeb2.com/file/redwood-photo/021b311d99c34cdb88fa7daab0b6540amini")
+  createdAt         DateTime @default(now())
+  gallery           Gallery  @relation(fields: [galleryId], references: [id])
+  galleryId         Int
+}
```

