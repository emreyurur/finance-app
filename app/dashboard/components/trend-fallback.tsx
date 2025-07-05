import Skeleton from "@/components/skeleton";

export default function TrendFallback() {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md shadow space-y-4">
      {/* Icon + Title */}
      <div className="flex items-center space-x-2">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Amount */}
      <Skeleton className="h-8 w-2/3" />

      {/* Previous amount / change info */}
      <div className="flex space-x-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}
