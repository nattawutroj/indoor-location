import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface MapViewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  imagePath: string;
  imageName: string;
}

export const MapViewModal = ({
  open,
  setOpen,
  imagePath,
  imageName,
}: MapViewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{imageName}</DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-[80vh]">
          {imagePath && (
            <Image
              src={imagePath}
              alt={imageName}
              fill
              className="object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}; 