"use client";

import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type RoutePoint = {
  id: string;
  x: number;
  y: number;
};

type MapWithHardware = {
  id: string;
  name: string;
  path: string;
  route?: RoutePoint[] | null;
  hardware: {
    id: string;
    x_axis: number;
    y_axis: number;
  }[];
};

export const useGetMapsWithHardware = () => {
  return useQuery<MapWithHardware[]>({
    queryKey: ["MapsWithHardware"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("maps").select("*, hardware(*)");
      return (data || []) as MapWithHardware[];
    },
  });
};

export default function MapsPanel() {
  const queryClient = useQueryClient();
  const { data: mapsList } = useGetMapsWithHardware();

  const [mapId, setMapId] = React.useState<string | undefined>(undefined);
  const [clickedPoints, setClickedPoints] = React.useState<RoutePoint[]>([]);

  const selectedMap = mapsList?.find((map) => map.id === mapId);

  const handlePointClick = (id: string, x: number, y: number) => {
    setClickedPoints((prev) => {
      const lastPoint = prev[prev.length - 1];

      if (lastPoint && lastPoint.id === id) {
        return prev.slice(0, -1);
      }

      if (!prev.some((point) => point.id === id)) {
        return [...prev, { id, x, y }];
      }

      return prev;
    });
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();

      const { data } = await supabase
        .from("maps")
        .update({
          route: clickedPoints,
        })
        .eq("id", mapId || "")
        .single();

      if (!data) return { errors: "พบปัญหาขณะบันทึกข้อมูล" };

      return data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["MapsWithHardware"] });
        setClickedPoints([])
    },
  });

  return (
    <div>
      <Select
        value={mapId}
        onValueChange={(value) => {
          setMapId(value);
          setClickedPoints([]);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="เลือกแผ่นที่" />
        </SelectTrigger>
        <SelectContent>
          {mapsList?.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex justify-center">
        {selectedMap?.path && (
          <div className="mt-4 flex justify-center relative">
            <Image
              src={selectedMap.path}
              alt="Map Image"
              width={350}
              height={350}
              className="object-cover border"
            />

            {selectedMap.hardware.map((item) => (
              <div
                key={item.id}
                className="absolute bg-blue-500 rounded-full w-6 h-6 cursor-pointer hover:bg-blue-600 flex items-center justify-center"
                style={{
                  top: `${(item.y_axis || 0) - 12}px`,
                  left: `${(item.x_axis || 0) - 12}px`,
                }}
                onClick={() =>
                  handlePointClick(item.id, item.x_axis || 0, item.y_axis || 0)
                }
              >
                {clickedPoints.some((point) => point.id === item.id) && (
                  <Check className="text-white w-4 h-4" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-evenly">
        <div className="mt-4">
          <strong>ลำดับบันทึกก่อนหน้า:</strong>
          <ul className="list-disc pl-5">
            {selectedMap?.route?.map((point, index) =>
              point ? (
                <li key={point.id}>
                  จุดที่ {index + 1}: (x: {point.x}, y: {point.y})
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div className="mt-4">
          <strong>ลำดับจุดที่กด:</strong>
          <ul className="list-disc pl-5">
            {clickedPoints.map((point, index) => (
              <li key={point.id}>
                จุดที่ {index + 1}: (x: {point.x}, y: {point.y})
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Button onClick={() => mutation.mutate()} className="w-full mt-12">
        อัพเดทเส้นทางใหม่
      </Button>
    </div>
  );
}
