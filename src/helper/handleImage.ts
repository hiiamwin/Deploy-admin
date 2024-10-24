import "server-only";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import MyError from "./myError";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dcpyofgve",
  api_key: process.env.CLOUDINARY_API_KEY || "965529757617195",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "XGvy_RdHKjRm6GNsGtvQrwYd7AY",
});

async function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return sharp(buffer)
    .resize(maxWidth, maxHeight, {
      fit: "cover",
      withoutEnlargement: false,
    })
    .webp({ quality: 80 })
    .toBuffer();
}

export async function uploadImage(images: FormData) {
  const imageUploadPromises = [];
  for (let i = 0; i < 3; i++) {
    const imageFile = images.get(`image${i}`) as File | null;
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
    return await Promise.all(imageUploadPromises);
  } catch (error) {
    throw new MyError(500, "Upload image failed");
  }
}

export async function uploadASingleImage(image: File) {
  const resizedImageBuffer = await resizeImage(image, 640, 640);

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "dish" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );

    uploadStream.end(resizedImageBuffer);
  });
}
