/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import path from "path";

const upload = async ({ key, file }: { key: string; file: any }) => {
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY || "",
    },
    region: process.env.AWS_REGION || "us-east-1",
  });
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (caught) {
    if (
      caught instanceof S3ServiceException &&
      caught.name === "EntityTooLarge"
    ) {
      console.error(
        `Error from S3 while uploading object to. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`
      );
    } else if (caught instanceof S3ServiceException) {
      console.error(
        `Error from S3 while uploading object to  ${caught.name}: ${caught.message}`
      );
    } else {
      console.error(`Unknown error uploading object to.`, caught);
      throw caught;
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    const ext = path.extname(file.name); // ".png"

    const fileNameWithoutExt = path.basename(file.name, ext);
    const key = `${fileNameWithoutExt}-${Date.now()}${ext}`;
    await upload({
      key,
      file,
    });
    return NextResponse.json({
      success: true,
      key,
      fileName: file?.name,
      fileType: file?.type,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to parse FormData", details: (err as Error).message },
      { status: 400 }
    );
  }
  // ...
}
