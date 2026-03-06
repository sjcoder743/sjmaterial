import SkeletonCard from "@/components/ui/SkeletonCard";

export default function ProductsLoading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="mb-8 h-16 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/50" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </section>
  );
}
