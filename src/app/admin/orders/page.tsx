export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { toPlainObject } from "@/lib/serialize";

export default async function AdminOrdersPage() {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") redirect("/login");

  await connectDB();
  const orders = toPlainObject(await Order.find().sort({ createdAt: -1 }).lean()) as Array<{
    _id: string;
    orderId: string;
    email: string;
    totalAmount: number;
    status: string;
  }>;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h1 className="mb-6 text-3xl font-bold">Orders</h1>
      <div className="space-y-2">
        {orders.map((order) => (
          <div key={order._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm">
            <span>{order.orderId}</span>
            <span>{order.email}</span>
            <span>₹{order.totalAmount}</span>
            <form action={`/api/admin/orders/${order._id}`} method="post" className="flex gap-2">
              <select name="status" defaultValue={order.status} className="rounded border border-slate-700 bg-slate-900 px-2 py-1">
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className="rounded bg-[#2563EB] px-3 py-1">Update</button>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
