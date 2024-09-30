import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Column } from "@/types";

interface ReuseTableProps<T extends { id: string }> {
  columns: Column<T>[];
  tableCaption: string;
  data: T[];
  tableName: string;
  total: number;
  renderActions?: (item: T) => React.ReactNode;
}
function ReuseTable<T extends { id: string }>({
  columns,
  tableCaption,
  data,
  tableName,
  total,
  renderActions,
}: ReuseTableProps<T>) {
  return (
    <Table>
      <TableCaption className="caption-top text-2xl font-bold text-gray-700">
        {tableCaption}
      </TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.header} className="text-left">
              {col.header}
            </TableHead>
          ))}
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {columns.map((col) => (
              <TableCell key={col.header} className="text-left">
                {String(item[col.accessorKey]) === "1" ? (
                  <span className="flex items-center gap-2">
                    Đang hoạt động
                    <span
                      className={`inline-block w-3 h-3 rounded-full bg-green-500`}
                    />
                  </span>
                ) : String(item[col.accessorKey]) === "2" ? (
                  <span className="flex items-center gap-2">
                    Không hoạt động
                    <span
                      className={`inline-block w-3 h-3 rounded-full bg-red-500`}
                    />
                  </span>
                ) : (
                  String(item[col.accessorKey])
                )}
              </TableCell>
            ))}

            {renderActions && <TableCell>{renderActions(item)}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={columns.length}>Tổng cộng</TableCell>
          <TableCell>
            {total} {tableName}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default ReuseTable;
