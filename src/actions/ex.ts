"use server";
import { z } from "zod";
import { actionClient } from "./safe-action";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dcpyofgve",
  api_key: process.env.CLOUDINARY_API_KEY || "965529757617195",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "XGvy_RdHKjRm6GNsGtvQrwYd7AY",
});

const resizeImage = async (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<Buffer> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return sharp(buffer)
    .resize(maxWidth, maxHeight, {
      fit: "cover",
      withoutEnlargement: false,
    })
    .webp({ quality: 80 })
    .toBuffer();
};
const schema = z.object({
  images: z.any(),
  name: z.string(),
});
export const uploadImage = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const imageUploadPromises = [];
    for (let i = 0; i < 3; i++) {
      const imageFile = parsedInput.images.get(`image${i}`) as File | null;
      if (imageFile && imageFile instanceof File) {
        const uploadPromise = new Promise<string>(async (resolve, reject) => {
          try {
            // Resize the image
            const resizedImageBuffer = await resizeImage(imageFile, 640, 640);
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "dish" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result!.secure_url);
              }
            );

            uploadStream.end(resizedImageBuffer);
          } catch (error) {
            reject(error);
          }
        });
        imageUploadPromises.push(uploadPromise);
      }
    }

    try {
      const uploadedUrls = await Promise.all(imageUploadPromises);
      console.log(uploadedUrls);
      return uploadedUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error("Failed to upload images");
    }
  });
