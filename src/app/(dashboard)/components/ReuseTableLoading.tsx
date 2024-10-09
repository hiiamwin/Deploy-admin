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
import { Skeleton } from "@/components/ui/skeleton";

type TableHead = {
  header: string;
};
type ReuseTableLoadingProps = {
  tableCaption: string;
  tableName: string;
  columns: TableHead[];
};
function ReuseTableLoading({
  columns,
  tableCaption,
  tableName,
}: ReuseTableLoadingProps) {
  return (
    <Table>
      <TableCaption className="caption-top text-2xl font-bold text-gray-700">
        {tableCaption}
      </TableCaption>
      <TableHeader>
        <TableRow>
          {columns?.map((column) => (
            <TableHead key={column.header}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[200px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[300px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[60px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Tổng cộng</TableCell>
          <TableCell>{tableName}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default ReuseTableLoading;
