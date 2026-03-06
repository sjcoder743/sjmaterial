import Product from "@/models/Product";

export function buildProductQuery(searchParams: URLSearchParams) {
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const query: Record<string, unknown> = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (category) query.category = category;

  return query;
}

export async function getProductCategories() {
  const categories = await Product.distinct("category");
  return categories.filter(Boolean);
}
