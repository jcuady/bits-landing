import Link from "next/link";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  className?: string;
  cell: (row: T) => React.ReactNode;
};

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  href,
  className,
}: {
  columns: Column<T>[];
  rows: T[];
  href?: (row: T) => string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-linelight/60 bg-cloud/70 backdrop-blur-3xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]", className)}>
      <table className="w-full min-w-[640px] border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-linelight/40 bg-cloud/50 dark:border-white/10 dark:bg-white/5">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-[0.68rem] font-bold tracking-wider text-muted-foreground uppercase",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/20 dark:divide-white/10">
          {rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-cloud/60 dark:hover:bg-white/5 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className={cn("px-4 py-3 text-foreground", col.className)}>
                  {href ? (
                    <Link href={href(row)} className="block text-foreground hover:text-[#1975f2] transition-colors">
                      {col.cell(row)}
                    </Link>
                  ) : (
                    <div>{col.cell(row)}</div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
