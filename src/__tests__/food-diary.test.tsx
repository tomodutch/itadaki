import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {FoodDiary} from "@/components/dashboard/food-diary";
 
test("Food diary", () => {
  render(<FoodDiary foodTemplates={[]} categorizedDiaryEntries={[]}  />)
  expect(screen.getByText("Total")).toBeDefined()
})
