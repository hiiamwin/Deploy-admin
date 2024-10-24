import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useCallback } from "react";

type ImagePreviewProps = {
  images: { file: File; url: string }[];
  setImages: Dispatch<SetStateAction<{ file: File; url: string }[]>>;
  isPending: boolean;
};
function ImagePreview({ images, setImages, isPending }: ImagePreviewProps) {
  const handleImagePreview = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (files) {
        const newImages = Array.from(files).map((file) => ({
          file,
          url: URL.createObjectURL(file),
        }));
        setImages((prevImages) => {
          const updatedImages = [...prevImages, ...newImages].slice(0, 3);
          return updatedImages;
        });
      }
    },
    [setImages]
  );

  const removeImage = useCallback(
    (index: number) => {
      setImages((prevImages) => {
        const removedImage = prevImages[index];
        URL.revokeObjectURL(removedImage.url);
        return prevImages.filter((_, i) => i !== index);
      });
    },
    [setImages]
  );
  return (
    <div>
      <Label>Hình ảnh món ăn</Label>
      <div className="flex flex-wrap gap-4 mt-2">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image.url}
              alt={`Uploaded image ${index + 1}`}
              width={128}
              height={128}
              className="w-32 h-32 object-cover rounded-md aspect-square"
            />

            <Button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 rounded-full"
              size={"icon"}
              aria-label={`Remove image ${index + 1}`}
              disabled={isPending}
            >
              <X size={16} />
            </Button>
          </div>
        ))}
        {images.length < 3 && (
          <Label className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImagePreview}
              className="hidden"
              multiple
              disabled={isPending}
            />
            <span className="text-gray-500 text-3xl">+</span>
          </Label>
        )}
      </div>
    </div>
  );
}

export default ImagePreview;
