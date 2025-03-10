import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetMaps } from "../../maps/tableMapsWrapper";
import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { DeviceDefaultValues, DeviceSchema, DeviceType } from "@/schema/device";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { useGetHardwareByID } from "./deviceInfo";

export default function DeviceEditModal({
  hardwareIdEdit,
  setHardwareIdEdit,
}: {
  hardwareIdEdit: string | undefined;
  setHardwareIdEdit: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { data } = useGetHardwareByID(hardwareIdEdit || "");
  const [mapId, setMapId] = React.useState<string | undefined>(undefined);
  const [mapPath, setMapPath] = React.useState<string | undefined>(undefined);
  const { data: mapsList } = useGetMaps();
  const [axis, setAxis] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (value: DeviceType) => {
      const supabase = createClient();

      const { data } = await supabase
        .from("hardware")
        .update({
          location_nickname: value.location_nickname,
          location_fullname: value.location_nickname,
          x_axis: value.x_axis,
          y_axis: value.y_axis,
          service_id: value.service_id,
          map_id: mapId,
        })
        .eq("id", hardwareIdEdit || "")
        .single();

      if (!data) return { errors: "พบปัญหาขณะบันทึกข้อมูล" };

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetHardware"] });
      queryClient.invalidateQueries({
        queryKey: ["GetHardwareById", hardwareIdEdit],
      });
      form.reset();
      setHardwareIdEdit(undefined);
    },
  });

  const form = useForm({
    defaultValues: DeviceDefaultValues,
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
    validators: {
      onSubmit: DeviceSchema,
    },
  });

  React.useEffect(() => {
    if (data) {
      setMapId(data.maps?.id);
      setMapPath(data.maps?.path);
      setAxis({
        x: data.x_axis || 0,
        y: data.y_axis || 0,
      });

      form.setFieldValue("service_id", data.service_id || "");
      form.setFieldValue("location_nickname", data.location_nickname);
      form.setFieldValue("x_axis", data.x_axis || -1);
      form.setFieldValue("y_axis", data.y_axis || -1);
    }
  }, [data, form]);
  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setAxis({ x, y });
    form.setFieldValue("x_axis", x);
    form.setFieldValue("y_axis", y);
  };

  return (
    <Dialog
      open={!!hardwareIdEdit}
      onOpenChange={() => setHardwareIdEdit(undefined)}
    >
      <DialogContent>
        <DialogTitle>เพิ่มแผนที่</DialogTitle>
        <DialogHeader>
          <DialogDescription />
          <Select
            value={mapId}
            onValueChange={(value) => {
              const selectedMap = mapsList?.find((map) => map.id === value);
              setMapPath(selectedMap?.path);
              setMapId(value);
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
            {mapPath && (
              <div className="mt-4 relative inline-block">
                <Image
                  src={mapPath}
                  alt="Map Image"
                  width={350}
                  height={350}
                  className="object-cover cursor-pointer border"
                  onClick={handleImageClick}
                />

                {/* X-axis line */}
                <div
                  className="absolute bg-red-500 w-full h-[1px]"
                  style={{ top: axis.y, left: 0 }}
                />
                {/* Y-axis line */}
                <div
                  className="absolute bg-red-500 h-full w-[1px]"
                  style={{ left: axis.x, top: 0 }}
                />
              </div>
            )}
          </div>
          <div className="mt-2 text-sm">
            คลิกที่ตำแหน่ง: (x: {axis.x}, y: {axis.y})
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.Field name="service_id">
              {(field) => (
                <div className="mt-4">
                  <Label htmlFor={field.name}>รหัสเซอร์วิสประจำอุปกรณ์</Label>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="กรุณากรอกรหัสเซอร์วิสประจำอุปกรณ์"
                  />
                  {field.state.meta.errors.length !== 0 && (
                    <p className="mt-1 text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="location_nickname">
              {(field) => (
                <div className="mt-4">
                  <Label htmlFor={field.name}>สถานที่ตั้ง</Label>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="กรุณากรอกสถานที่ตั้ง"
                  />
                  {field.state.meta.errors.length !== 0 && (
                    <p className="mt-1 text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field name="x_axis">
              {(field) => (
                <div className="mt-4">
                  <Label htmlFor={field.name}>ตำแหน่ง X บนแผนที่</Label>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    disabled
                    placeholder="กรุณากรอกรหัสเซอร์วิสประจำอุปกรณ์"
                  />
                  {field.state.meta.errors.length !== 0 && (
                    <p className="mt-1 text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field name="y_axis">
              {(field) => (
                <div className="mt-4">
                  <Label htmlFor={field.name}>ตำแหน่ง Y บนแผนที่</Label>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    disabled
                    placeholder="กรุณากรอกรหัสเซอร์วิสประจำอุปกรณ์"
                  />
                  {field.state.meta.errors.length !== 0 && (
                    <p className="mt-1 text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
            <Button className="mt-4 w-full">ส่งบันทึก</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
