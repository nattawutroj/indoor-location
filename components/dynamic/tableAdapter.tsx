"use client";

import { JSX } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, key: string): any {
  return key.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}

type TableDynamicAdapterProps<
  T extends Record<string, unknown>,
  TT extends Record<string, string>
> = {
  query: T[] | null | undefined;
  header: TT;
  onClickRow?: {
    target: string;
    handleFn: (value: string | null) => void;
  };
  actionRow?: (data: T) => JSX.Element; // คืนค่า JSX.Element
  classNameAction?: string;
};

export const TableDynamicAdapter = <
  T extends Record<string, unknown>,
  TT extends Record<string, string>
>({
  query,
  header,
  onClickRow,
  actionRow,
  classNameAction,
}: TableDynamicAdapterProps<T, TT>) => {
  if (!query || query.length === 0)
    return (
      <div className="flex flex-col gap-2 pt-2">
        <Skeleton className="h-[30px] bg-slate-200 w-full rounded-full" />
        <Skeleton className="h-[30px] bg-slate-200 w-full rounded-full" />
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.entries(header).map(([key, headerTitle]) => (
            <TableHead key={key}>{headerTitle}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {query.map((item, rowIndex) => (
          <TableRow
            key={rowIndex}
            onClick={() => {
              if (onClickRow) {
                // ดึงค่าออกมาจาก item โดยใช้ฟังก์ชัน getNestedValue เพื่อรองรับ path หลายชั้น
                const value = getNestedValue(item, onClickRow.target as string);
                // ตรวจสอบว่า value ที่ได้เป็น string หรือ null หากไม่ใช่ ให้แปลงเป็น string
                if (typeof value === "string" || value === null) {
                  onClickRow.handleFn(value);
                } else {
                  onClickRow.handleFn(String(value));
                }
              }
            }}
          >
            {Object.keys(header).map((key) => (
              <TableCell key={key}>
                {getNestedValue(item, key) != null
                  ? String(getNestedValue(item, key))
                  : ""}
              </TableCell>
            ))}
            {actionRow && (
              <TableCell className={classNameAction}>
                {actionRow(item)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const handleOnClickRow = {
  target: "id" as const,
  handleFn: (value: string | null) => {
    console.log(value);
  },
};
