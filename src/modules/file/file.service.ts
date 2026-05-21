import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../../configs/prisma";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
});

export const uploadFileService = async (file: any, userId: string) => {
  const fileKey = `${Date.now()}-${file.originalname}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

  const savedFile = await prisma.file.create({
    data: {
      fileName: file.originalname,
      fileUrl,
      s3Key: fileKey,
      fileSize: file.size,
      fileType: file.mimetype,
      userId,
    },
  });

  return savedFile;
};

export const getFilesService = async (userId: string) => {
  return await prisma.file.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteFileService = async (fileId: string) => {
  const file = await prisma.file.findUnique({
    where: { id: fileId },
  });

  if (!file) {
    throw new Error("File not found");
  }

  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: file.s3Key,
    })
  );

  await prisma.file.delete({
    where: { id: fileId },
  });

  return true;
};