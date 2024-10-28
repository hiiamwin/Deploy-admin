"use client";
import { uploadImage } from "@/actions/ex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

interface ImageWithUrl {
  file: File;
  url: string;
}

function ExPage() {
  const [images, setImages] = useState<ImageWithUrl[]>([]);
  const { handleSubmit, register } = useForm();
  const { execute } = useAction(uploadImage);

  const handleImageUpload = useCallback(
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
    []
  );

  const removeImage = useCallback((index: number) => {
    setImages((prevImages) => {
      const removedImage = prevImages[index];
      URL.revokeObjectURL(removedImage.url);
      return prevImages.filter((_, i) => i !== index);
    });
  }, []);

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image${index}`, image.file);
    });

    execute({ images: formData, name: data.name });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" {...register("name")} />
      </div>
      <div>
        <Label>Images</Label>
        <div className="flex flex-wrap gap-4 mt-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image.url}
                alt={`Uploaded image ${index + 1}`}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded-md"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                aria-label={`Remove image ${index + 1}`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {images.length < 3 && (
            <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                multiple
              />
              <span className="text-gray-500 text-3xl">+</span>
            </label>
          )}
        </div>
      </div>
      <Image
        src={
          "https://res.cloudinary.com/dcpyofgve/image/upload/v1728639382/dish/qot4wee8aujtdjlpwehh.webp"
        }
        alt="Uploaded image"
        width={200}
        height={200}
        className="rounded-md object-cover"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default ExPage;
