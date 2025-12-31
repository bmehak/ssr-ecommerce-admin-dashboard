import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { connectDB } from "@/lib/db";
import { productSchema } from "@/lib/zod-schemas";
import { auth } from "@/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  req: Request,
  context:  RouteContext
) {
  await connectDB();

  const { id } = await context.params;

  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

export async function PUT(
  req: Request,
  context: RouteContext
) {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await connectDB();

  const { id } = await context.params;
  const body = await req.json();

  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const updated = await Product.findByIdAndUpdate(id, parsed.data, {
    new: true,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, ctx: RouteContext) {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await ctx.params;

  await Product.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
