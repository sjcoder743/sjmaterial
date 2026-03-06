export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const orderId = params.orderId;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-4xl font-bold">Order Confirmed</h1>
      <p className="mt-4 text-slate-400">Thank you for shopping at SJMaterial.</p>
      <p className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4 text-xl font-semibold">
        Order ID: {orderId}
      </p>
    </section>
  );
}
