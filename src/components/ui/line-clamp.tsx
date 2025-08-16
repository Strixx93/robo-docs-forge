import { cn } from "@/lib/utils";

interface LineClampProps {
  children: React.ReactNode;
  lines?: number;
  className?: string;
}

export function LineClamp({ children, lines = 3, className }: LineClampProps) {
  return (
    <div 
      className={cn(
        "overflow-hidden text-ellipsis",
        `line-clamp-${lines}`,
        className
      )}
      style={{
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
      }}
    >
      {children}
    </div>
  );
}