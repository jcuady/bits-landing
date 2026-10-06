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
    <div className={cn("overflow-x-auto rounded-2xl border border-blue-100/80 bg-white/80 backdrop-blur-xl shadow-xs dark:border-white/10 dark:bg-[#0b1324]/85", className)}>
      <table className="w-full min-w-[640px] border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-blue-100/70 bg-blue-50/60 dark:border-white/10 dark:bg-white/5">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-[0.68rem] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/10">
          {rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-blue-50/40 dark:hover:bg-white/5 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className={cn("px-4 py-3 text-slate-800 dark:text-slate-200", col.className)}>
                  {href ? (
                    <Link href={href(row)} className="block text-slate-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
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
