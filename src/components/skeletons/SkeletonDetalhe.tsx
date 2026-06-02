import { Skeleton } from "../../../@/components/ui/skeleton";

export function SkeletonDetalhe() {
  return (
    <div className="max-w-2xl mx-auto p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Card principal */}
      <div className="bg-[#2B2A28] border border-[#3D3B38] rounded-xl p-8 mb-6">
        <Skeleton className="h-3 w-20 mb-3" />
        <Skeleton className="h-7 w-64 mb-2" />
        <Skeleton className="h-4 w-32 mb-6" />

        <div className="border-t border-[#3D3B38] pt-6 flex flex-col gap-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Card insight */}
      <div className="bg-[#2B2A28] border border-[#3D3B38] rounded-xl p-8">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}
