import CheckoutForm from "@/components/cart/CheckoutForm";

export default function CheckoutPage() {
  return (
    <section className="px-4 py-10 md:px-8">
      <h1 className="mx-auto mb-6 max-w-3xl text-3xl font-bold">Checkout</h1>
      <CheckoutForm />
    </section>
  );
}
