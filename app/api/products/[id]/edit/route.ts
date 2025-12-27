import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { Product } from "../../../../../models/Product";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, context: RouteContext) {
  await connectDB();

  const { id } = await context.params;

  const form = await req.formData();
  const name = form.get("name") as string;
  const price = Number(form.get("price"));
  const stock = Number(form.get("stock"));

  try {
    await Product.findByIdAndUpdate(id, {
      name,
      price,
      stock,
    });

    return NextResponse.redirect(new URL("/dashboard/products", req.url), 303);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}