"use client"
import { HeartProgressChart } from './heart-shaped-chart';

interface DataPoint {
  value: number,
  max: number
}

interface DailySummaryProps {
  protein: DataPoint,
  fat: DataPoint,
  carbs: DataPoint,
  calories: DataPoint
}
export function DailySummary(props: DailySummaryProps) {
  const data = [
    {
      name: "Protein",
      value: props.protein.value,
      max: props.protein.max,
      colorStart: "#fb7185",
      colorEnd: "#be123c"
    },
    {
      name: "Carbs",
      value: props.carbs.value,
      max: props.carbs.max,
      colorStart: "#ea580c",
      colorEnd: "#fdba74"
    },
    {
      name: "Fat",
      value: props.fat.value,
      max: props.fat.max,
      colorStart: "#facc15",
      colorEnd: "#fef08a"
    },
    {
      name: "Calories",
      value: props.calories.value,
      max: props.calories.max,
      colorStart: "#22c55e",
      colorEnd: "#86efac"
    },
  ];
  return (
    <HeartProgressChart data={data} mode="animate" />
  );
}
