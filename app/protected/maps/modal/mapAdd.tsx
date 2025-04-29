import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { MapDefaultValues, MapSchema, MapType } from "@/schema/record";
import { createClient } from "@/utils/supabase/client";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { default as ImageNext } from "next/image";
import React from "react";
import { ConfirmAction } from "@/components/modal/confirmAction";

export default function MapAddModal({
  openAdd,
  setOpenAdd,
}: {
  openAdd: boolean;
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const [path, setPath] = React.useState<string>("");
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);

  const mutation = useMutation({
    mutationFn: async (value: MapType) => {
      const supabase = await createClient();

      const { data } = await supabase
        .from("maps")
        .insert({
          path: value.path,
          name: value.name,
        })
        .select("*")
        .single();

      if (!data) return { errors: "พบปัญหาขณะบันทึกข้อมูล" };

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetMaps"] });
      form.reset();
      setOpenAdd(false);
    },
  });

  const form = useForm({
    defaultValues: MapDefaultValues,
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
    validators: {
      onSubmit: MapSchema,
    },
  });

  const resizeImageToSquare = (file: File): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 350;
        canvas.height = 350;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, file.type);
      };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const resizedBlob = await resizeImageToSquare(file);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const supabase = createClient();
    const { data: uploadFile, error } = await supabase.storage
      .from("maps")
      .upload(fileName, resizedBlob);

    if (error) {
      toast({ title: "Error uploading file" });
      return;
    }

    const { data } = supabase.storage
      .from("maps")
      .getPublicUrl(uploadFile.path);
    setPath(data.publicUrl);
    form.setFieldValue("path", data.publicUrl);
    toast({ title: "File uploaded successfully" });
    form.validateAllFields("change");
  };

  const handleRemoveImage = () => {
    setPath("");
    form.setFieldValue("path", "");
  };

  return (
    <Dialog open={openAdd} onOpenChange={setOpenAdd}>
      <DialogContent>
        <DialogTitle>เพิ่มแผนที่</DialogTitle>
        <DialogHeader>
          <DialogDescription />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.Field name="path">
              {(field) => (
                <>
                  <Input
                    ref={inputFileRef}
                    type="file"
                    id="imgPath"
                    name="imgPath"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {path && (
                    <div className="relative group w-full mt-2">
                      <ImageNext
                        src={path}
                        alt="Uploaded image"
                        width={350}
                        height={350}
                        className="w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-500 shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  )}

                  <ConfirmAction
                    action={() => inputFileRef.current?.click()}
                    message="คุณต้องการอัพโหลดแผนที่ใหม่หรือไม่?"
                    title="ยืนยันการอัพโหลดแผนที่"
                  >
                    <Button
                      type="button"
                      className="w-full mt-2"
                      disabled={!!path}
                    >
                      อัพโหลดรูปภาพ
                    </Button>
                  </ConfirmAction>

                  {field.state.meta.errors.length !== 0 && (
                    <p className="mt-1 text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </>
              )}
            </form.Field>
            <form.Field name="name">
              {(field) => (
                <div className="mt-4">
                  <Label htmlFor={field.name}>ชื่อแผนที่</Label>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="กรุณากรอกชื่อผู้ครอบครอง"
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
