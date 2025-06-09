-- CreateTable
CREATE TABLE "FoodTemplate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "servingSize" DOUBLE PRECISION NOT NULL,
    "servingUnit" TEXT NOT NULL,
    "barCode" TEXT,
    "calories" INTEGER NOT NULL,
    "protein" DOUBLE PRECISION,
    "carbs" DOUBLE PRECISION,
    "sugar" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "saturatedFat" DOUBLE PRECISION,
    "transFat" DOUBLE PRECISION,
    "cholesterol" DOUBLE PRECISION,
    "sodium" DOUBLE PRECISION,
    "potassium" DOUBLE PRECISION,
    "vitaminA" DOUBLE PRECISION,
    "vitaminC" DOUBLE PRECISION,
    "vitaminD" DOUBLE PRECISION,
    "vitaminE" DOUBLE PRECISION,
    "vitaminK" DOUBLE PRECISION,
    "vitaminB1" DOUBLE PRECISION,
    "vitaminB2" DOUBLE PRECISION,
    "vitaminB3" DOUBLE PRECISION,
    "vitaminB5" DOUBLE PRECISION,
    "vitaminB6" DOUBLE PRECISION,
    "vitaminB7" DOUBLE PRECISION,
    "vitaminB9" DOUBLE PRECISION,
    "vitaminB12" DOUBLE PRECISION,
    "calcium" DOUBLE PRECISION,
    "iron" DOUBLE PRECISION,
    "magnesium" DOUBLE PRECISION,
    "phosphorus" DOUBLE PRECISION,
    "zinc" DOUBLE PRECISION,
    "copper" DOUBLE PRECISION,
    "manganese" DOUBLE PRECISION,
    "selenium" DOUBLE PRECISION,
    "alcohol" DOUBLE PRECISION,
    "caffeine" DOUBLE PRECISION,
    "origin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FoodTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaryEntryCategory" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DiaryEntryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaryEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodTemplateId" TEXT NOT NULL,
    "servingSize" DOUBLE PRECISION NOT NULL,
    "servingUnit" TEXT NOT NULL,
    "servings" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "date" DATE NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" DOUBLE PRECISION,
    "carbs" DOUBLE PRECISION,
    "sugar" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "saturatedFat" DOUBLE PRECISION,
    "transFat" DOUBLE PRECISION,
    "cholesterol" DOUBLE PRECISION,
    "sodium" DOUBLE PRECISION,
    "potassium" DOUBLE PRECISION,
    "vitaminA" DOUBLE PRECISION,
    "vitaminC" DOUBLE PRECISION,
    "vitaminD" DOUBLE PRECISION,
    "vitaminE" DOUBLE PRECISION,
    "vitaminK" DOUBLE PRECISION,
    "vitaminB1" DOUBLE PRECISION,
    "vitaminB2" DOUBLE PRECISION,
    "vitaminB3" DOUBLE PRECISION,
    "vitaminB5" DOUBLE PRECISION,
    "vitaminB6" DOUBLE PRECISION,
    "vitaminB7" DOUBLE PRECISION,
    "vitaminB9" DOUBLE PRECISION,
    "vitaminB12" DOUBLE PRECISION,
    "calcium" DOUBLE PRECISION,
    "iron" DOUBLE PRECISION,
    "magnesium" DOUBLE PRECISION,
    "phosphorus" DOUBLE PRECISION,
    "zinc" DOUBLE PRECISION,
    "copper" DOUBLE PRECISION,
    "manganese" DOUBLE PRECISION,
    "selenium" DOUBLE PRECISION,
    "alcohol" DOUBLE PRECISION,
    "caffeine" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "DiaryEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FoodTemplate_userId_deletedAt_idx" ON "FoodTemplate"("userId", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "DiaryEntryCategory_key_key" ON "DiaryEntryCategory"("key");

-- CreateIndex
CREATE INDEX "DiaryEntry_userId_date_idx" ON "DiaryEntry"("userId", "date");

-- AddForeignKey
ALTER TABLE "FoodTemplate" ADD CONSTRAINT "FoodTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryEntry" ADD CONSTRAINT "DiaryEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryEntry" ADD CONSTRAINT "DiaryEntry_foodTemplateId_fkey" FOREIGN KEY ("foodTemplateId") REFERENCES "FoodTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryEntry" ADD CONSTRAINT "DiaryEntry_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DiaryEntryCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
