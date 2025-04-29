"use client";

import { TableDynamicAdapter } from "@/components/dynamic/tableAdapter";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import MapAddModal from "./modal/mapAdd";
import { MapViewModal } from "./modal/mapViewModal";
import Image from "next/image";
import { Trash } from "lucide-react";
import { ConfirmAction } from "@/components/modal/confirmAction";

export const useGetMaps = () => {
  return useQuery({
    queryKey: ["GetMaps"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("maps").select("*");
      return data;
    },
  });
};

export const TableMapsWrapper = () => {
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [selectedMap, setSelectedMap] = useState<{ path: string; name: string } | null>(null);
  const { data } = useGetMaps();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (value: string) => {
      const supabase = createClient();

      const { data } = await supabase.from("maps").delete().eq("id", value);

      if (!data) return { errors: "พบปัญหาขณะลบข้อมูล" };

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetMaps"] });
    },
  });

  const header = {
    name: "ชื่อแผนที่",
  };

  return (
    <>
      <MapAddModal openAdd={openAdd} setOpenAdd={setOpenAdd} />
      <MapViewModal
        open={!!selectedMap}
        setOpen={(open) => !open && setSelectedMap(null)}
        imagePath={selectedMap?.path || ""}
        imageName={selectedMap?.name || ""}
      />
      <div className="flex justify-between gap-2 items-center">
        <h2 className="font-bold text-2xl mb-4">Maps</h2>
        <Button onClick={() => setOpenAdd(true)}>เพิ่มรายการ</Button>
      </div>
      <div>
        <TableDynamicAdapter
          query={data ?? []}
          header={header}
          classNameAction="w-3/4"
          actionRow={(data) => {
            return (
              <div className="flex justify-between items-center">
                <div 
                  className="cursor-pointer"
                  onClick={() => setSelectedMap({ path: data.path, name: data.name || "" })}
                >
                  <Image
                    src={data.path}
                    alt={data?.name || "maps image"}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex gap-2">
                  <ConfirmAction
                    action={() => {
                      mutation.mutate(data.id);
                    }}
                    message="คุณต้องการลบแผนที่นี้หรือไม่?"
                    title="ยืนยันการลบแผนที่"
                  >
                    <Button variant="outline" className="text-red-500">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </ConfirmAction>
                </div>
              </div>
            );
          }}
        />
      </div>
    </>
  );
};
