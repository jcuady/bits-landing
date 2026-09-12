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
    <div className={cn("overflow-x-auto rounded-xl border border-linelight bg-white", className)}>
      <table className="w-full min-w-[640px] border-collapse text-left text-[0.85rem]">
        <thead>
          <tr className="border-b border-linelight bg-cloud/70">
            {columns.map((col) => (
              <th key={col.key} className={cn("px-3.5 py-2.5 text-[0.7rem] font-semibold tracking-[0.06em] text-slateblue uppercase", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="transition-colors hover:bg-navy-700/[0.03]">
              {columns.map((col) => (
                <td key={col.key} className={cn("border-t border-linelight p-0", col.className)}>
                  {href ? (
                    <Link href={href(row)} className="block px-3.5 py-2.5 text-ink">
                      {col.cell(row)}
                    </Link>
                  ) : (
                    <div className="px-3.5 py-2.5 text-ink">{col.cell(row)}</div>
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
