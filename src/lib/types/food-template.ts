import { FoodTemplate } from "@/db/generated/prisma";
import { OFFFoodTemplate } from "../open-food-facts";
import { USDAFoodTemplate } from "../usda";

export type ApiFoodTemplate = OFFFoodTemplate & USDAFoodTemplate & FoodTemplate;