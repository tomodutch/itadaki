import { fetchWithTimeout } from "@/lib/fetch";
import { NextRequest } from "next/server";
import logger from "@/lib/logger";
import { mapResponseToFoodTemplates } from "@/lib/usda";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  if (!query) {
    return new Response(JSON.stringify({ error: "Missing query" }), { status: 400 });
  }

  try {
    const apiKey = process.env.USDA_API_KEY || "DEMO_KEY";
    if (process.env.NODE_ENV === "production" && apiKey === "DEMO_KEY") {
      logger.error("Using DEMO_KEY as api key in production. Please check the .env and set the USDA_API_KEY to the production key");
    }

    const queryParams = new URLSearchParams({
      query,
      dataType: "Foundation",
      pageSize: "10",
      sortBy: "dataType.keyword",
      sortOrder: "asc",
      api_key: apiKey,
    });

    const uri = `https://api.nal.usda.gov/fdc/v1/foods/search?${queryParams.toString()}`;
    logger.info(`searching: ${uri}`);

    const res = await fetchWithTimeout(
      uri,
      {
        signal: req.signal,
      }
    );

    const data = await res.json();
    const foodTemplates = mapResponseToFoodTemplates(data);

    logger.debug("Search finished. See data for more details", { data });

    return new Response(JSON.stringify(foodTemplates), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    if (e && typeof e == "object" && "name" in e && e.name === "AbortError") {
      return new Response(JSON.stringify({ error: "Request timed out" }), { status: 504 });
    }
    logger.error("Search failed", { error: e });
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
  }
}