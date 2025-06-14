"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/actions/users/users.types";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { DataTableRowAction } from "@/lib/data-table/types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

interface GetStudentColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<
      Omit<User, "hashedPassword">
    > | null>
  >;
}

export function getStudentsColumns({
  setRowAction,
}: GetStudentColumnsProps): ColumnDef<Omit<User, "hashedPassword">>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0"
        />
      ),
      size: 40,
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Student ID" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Student Name" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Student Email" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue("email")}</div>,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition();
        const router = useRouter();
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <Ellipsis className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "update" })}
                onClick={() =>
                  router.push(`/a/students/update/${row.original.id}`)
                }
              >
                Edit
              </DropdownMenuItem>
              {/* <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "update" })}
                onClick={() =>
                  router.push(`/a/customers/view/${row.original.id.toString()}`)
                }
              >
                View
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "delete" })}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
}
