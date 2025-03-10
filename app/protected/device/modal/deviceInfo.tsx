import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export const useGetHardwareByID = (id: string) => {
  return useQuery({
    queryKey: ["GetHardwareById", id],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("hardware")
        .select("*, maps(*)")
        .eq("id", id)
        .single();
      return data;
    },
  });
};

export default function DeviceInfoModal({
  hardwareId,
  setHardwareId,
}: {
  hardwareId: string | undefined;
  setHardwareId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { data } = useGetHardwareByID(hardwareId || "");

  return (
    <Dialog open={!!hardwareId} onOpenChange={() => setHardwareId(undefined)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {data?.location_nickname || "ข้อมูลอุปกรณ์"}
          </DialogTitle>
          <DialogDescription>
            Service ID: {data?.service_id || "ไม่พบข้อมูล"}
          </DialogDescription>
        </DialogHeader>

        {data?.maps?.path && (
          <div className="mt-4 flex justify-center items-center">
            <div className="relative border rounded-lg overflow-hidden shadow">
              <Image
                src={data.maps.path}
                alt="Hardware Location"
                width={350}
                height={350}
                className="object-cover"
              />
              {data.x_axis && data.y_axis && (
                <div
                  className="absolute bg-red-500 rounded-full w-10 h-10 flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    top: `${data.y_axis - 20}px`,
                    left: `${data.x_axis - 20}px`,
                  }}
                >
                  Here
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}