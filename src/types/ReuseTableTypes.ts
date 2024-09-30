export type Column<T> = {
  header: string;
  accessorKey: keyof T;
};
