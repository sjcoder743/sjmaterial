import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { mockProducts } from "@/lib/mockProducts";
import { buildProductQuery } from "@/lib/products";
import Product from "@/models/Product";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const pageSize = Number(url.searchParams.get("pageSize") || 12);
  const sort = url.searchParams.get("sort") || "newest";

  try {
    await connectDB();

    const query = buildProductQuery(url.searchParams);
    const sortOption: Record<string, 1 | -1> =
      sort === "price-asc" ? { price: 1 } : sort === "price-desc" ? { price: -1 } : { createdAt: -1 };

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOption as never)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      products,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      source: "database",
    });
  } catch (error) {
    const total = mockProducts.length;
    return NextResponse.json(
      {
        products: mockProducts.slice((page - 1) * pageSize, page * pageSize),
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
        source: "fallback",
        warning:
          error instanceof Error
            ? error.message
            : "Database unavailable. Showing sample data.",
      },
      { status: 200 }
    );
  }
}
