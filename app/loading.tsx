import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="w-full min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Hero skeleton */}
      <div className="w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-end">
        <Skeleton className="h-12 w-3/4 md:w-1/2 mb-4" />
        <Skeleton className="h-6 w-full md:w-2/3 mb-8" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-32 rounded-xl" />
          <Skeleton className="h-12 w-32 rounded-xl" />
        </div>
      </div>
      
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-card rounded-2xl p-4 h-[350px] flex flex-col">
            <Skeleton className="w-full h-[200px] rounded-xl mb-4" />
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mt-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
