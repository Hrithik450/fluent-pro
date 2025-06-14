"use client";
import React from "react";
import { UsersService } from "@/actions/users/users.service";
import { User } from "@/actions/users/users.types";
import { DataTableRowAction } from "@/lib/data-table/types";
import { getStudentsColumns } from "./students-table-columns";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

interface StudentsTableProps {
  promises: Promise<[Awaited<ReturnType<typeof UsersService.getUsers>>]>;
}

export function StudentsTable({ promises }: StudentsTableProps) {
  const [{ data, pageCount }] = React.use(promises);
  const [rowAction, setRowAction] = React.useState<DataTableRowAction<
    Omit<User, "hashedPassword">
  > | null>(null);

  const columns = React.useMemo(() => getStudentsColumns({ setRowAction }), []);

  const { table } = useDataTable<Omit<User, "hashedPassword">>({
    data: data || [],
    columns,
    pageCount,
    initialState: {
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  });

  return <DataTable table={table}></DataTable>;
}
