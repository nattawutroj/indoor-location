import { z } from "zod";

export const DeviceSchema = z.object({
  location_nickname: z.string().min(1, "กรุณากรอก"),
  service_id: z.string().min(1, "กรุณากรอก"),
  x_axis: z.number().min(0, "กรุณาคลิกบนแผนที่"),
  y_axis: z.number().min(0, "กรุณาคลิกบนแผนที่"),
});

export type DeviceType = z.infer<typeof DeviceSchema>;

export const DeviceDefaultValues: DeviceType = {
  location_nickname: "",
  service_id: "",
  x_axis: -1,
  y_axis: -1,
};
