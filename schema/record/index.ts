import { z } from "zod";

export const MapSchema = z.object({
  path: z.string().min(1, "โปรดเลือกรูปภาพ"),
  name: z.string().min(1, "กรุณากรอก"),
});

export type MapType = z.infer<typeof MapSchema>;

export const MapDefaultValues: MapType = {
  path: "",
  name: "",
};
