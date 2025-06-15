import { Prisma } from "./generated/prisma";

export type CategoryWithEntries = Prisma.DiaryEntryCategoryGetPayload<{
  include: {
    diaryEntries: object
  };
}>;
