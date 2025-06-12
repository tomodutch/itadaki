import { expect, test } from "vitest";
import response from "./fixtures/usda_resp.json";
import cabbageResponse from "./fixtures/usda_cabbage.json";
import baconResponse from "./fixtures/usda_bacon.json";

import { FoodSearchResponse, mapResponseToFoodTemplates } from "@/lib/usda";

test("mapping response", () => {
    const foodTemplates = mapResponseToFoodTemplates(response as FoodSearchResponse);
    expect(foodTemplates).toMatchSnapshot();
});

test("map cabbage response", () => {
    const foodTemplates = mapResponseToFoodTemplates(cabbageResponse as FoodSearchResponse);
    expect(foodTemplates).toMatchSnapshot();
});

test("map bacon response", () => {
    const foodTemplates = mapResponseToFoodTemplates(baconResponse as FoodSearchResponse);
    expect(foodTemplates).toMatchSnapshot();
});