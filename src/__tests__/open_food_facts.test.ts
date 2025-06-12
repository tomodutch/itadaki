import { expect, test } from "vitest";
import response from "./fixtures/open_food_facts.json";
import beans from "./fixtures/open_food_facts_beans.json";

import {mapOFFToFoodTemplate} from "@/lib/open-food-facts";
import { OpenFoodFactsApiResponse } from "@/lib/types/open-food-facts";

test("mapping response", () => {
    const foodTemplates = mapOFFToFoodTemplate(response as OpenFoodFactsApiResponse);
    expect(foodTemplates).toMatchSnapshot();
});

test("mapping beans response", () => {
    const foodTemplates = mapOFFToFoodTemplate(beans as OpenFoodFactsApiResponse);
    expect(foodTemplates).toMatchSnapshot();
});

