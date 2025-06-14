import type { ColumnSort, Row } from "@tanstack/react-table";
import { DataTableConfig } from "./config";

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  type: "update" | "delete";
}

export type StringKeyOf<TData> = Extract<keyof TData, string>;

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  id: StringKeyOf<TData>;
}

export type ExtendedSortingState<TData> = ExtendedColumnSort<TData>[];

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export type ColumnType = DataTableConfig["columnTypes"][number];
