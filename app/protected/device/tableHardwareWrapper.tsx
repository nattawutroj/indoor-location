"use client";

import { TableDynamicAdapter } from "@/components/dynamic/tableAdapter";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InfoIcon, Trash } from "lucide-react";
import React from "react";
import DeviceAddModal from "./modal/deviceAdd";
import DeviceInfoModal from "./modal/deviceInfo";
import { Enums } from "@/utils/supabase/database.types";
import DeviceEditModal from "./modal/deviceEdit";
import { ConfirmAction } from "@/components/modal/confirmAction";

export const useGetHardware = () => {
  return useQuery({
    queryKey: ["GetHardware"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("hardware").select("*");
      return data;
    },
  });
};

export const TableHardwareWrapper = () => {
  const [openAdd, setOpenAdd] = React.useState<boolean>(false);
  const [hardwareId, setHardwareId] = React.useState<string | undefined>(
    undefined
  );
  const [hardwareIdEdit, setHardwareIdEdit] = React.useState<
    string | undefined
  >(undefined);
  const queryClient = useQueryClient();

  const { data } = useGetHardware();

  const mutationStatus = useMutation({
    mutationFn: async ({
      value,
      id,
    }: {
      value: Enums<"status_enum">;
      id: string;
    }) => {
      const supabase = createClient();

      const { data } = await supabase
        .from("hardware")
        .update({ status: value })
        .eq("id", id)
        .single();

      if (!data) return { errors: "พบปัญหาขณะบันทึกข้อมูล" };

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetHardware"] });
    },
  });

  const mutationRemove = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const supabase = createClient();

      const { data } = await supabase
        .from("hardware")
        .delete()
        .eq("id", id)
        .single();

      if (!data) return { errors: "พบปัญหาขณะบันทึกข้อมูล" };

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetHardware"] });
    },
  });

  const header = {
    service_id: "รหัสเซอร์วิสประจำอุปกรณ์",
    location_nickname: "สถานที่ตั้ง",
    status: "สถานะ",
  };

  return (
    <>
      <DeviceInfoModal hardwareId={hardwareId} setHardwareId={setHardwareId} />
      <DeviceEditModal hardwareIdEdit={hardwareIdEdit} setHardwareIdEdit={setHardwareIdEdit} />
      <DeviceAddModal openAdd={openAdd} setOpenAdd={setOpenAdd} />
      <div className="flex justify-between gap-2 items-center">
        <h2 className="font-bold text-2xl mb-4">Device</h2>
        <Button onClick={() => setOpenAdd(true)}>เพิ่มรายการ</Button>
      </div>
      <div>
        <TableDynamicAdapter
          query={data ?? []}
          header={header}
          actionRow={(data) => {
            return (
              <div className="flex gap-2">
                {data.status !== "inactive" && (
                  <ConfirmAction
                    action={() => {
                      mutationStatus.mutate({ value: "inactive", id: data.id });
                    }}
                    message="คุณต้องการระงับอุปกรณ์นี้หรือไม่?"
                    title="ยืนยันการระงับอุปกรณ์"
                  >
                    <Button
                      variant={"outline"}
                      className="w-28 bg-pink-500 hover:bg-pink-400 text-white"
                    >
                      ระงับอุปกรณ์
                    </Button>
                  </ConfirmAction>
                )}
                {data.status !== "active" && (
                  <ConfirmAction
                    action={() => {
                      mutationStatus.mutate({ value: "active", id: data.id });
                    }}
                    message="คุณต้องการเปิดใช้งานอุปกรณ์นี้หรือไม่?"
                    title="ยืนยันการเปิดใช้งาน"
                  >
                    <Button
                      variant={"outline"}
                      className="w-28 bg-green-500 hover:bg-green-400 text-white"
                    >
                      เปิดใช้งาน
                    </Button>
                  </ConfirmAction>
                )}
                <Button
                  variant={"outline"}
                  className="bg-orange-500 hover:bg-orange-400 text-white"
                  onClick={() => {
                    setHardwareIdEdit(data.id);
                  }}
                >
                  แก้ไข
                </Button>
                <Button
                  variant={"outline"}
                  className="bg-blue-400 text-white"
                  onClick={() => {
                    setHardwareId(data.id);
                  }}
                >
                  <InfoIcon size={20} />
                </Button>
                <ConfirmAction
                  action={() => {
                    mutationRemove.mutate({ id: data.id });
                  }}
                  message="คุณต้องการลบอุปกรณ์นี้หรือไม่?"
                  title="ยืนยันการลบอุปกรณ์"
                >
                  <Button variant="outline" className="text-red-500">
                    <Trash className="w-4 h-4" />
                  </Button>
                </ConfirmAction>
              </div>
            );
          }}
        />
      </div>
    </>
  );
};
