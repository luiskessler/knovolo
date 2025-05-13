import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { constructURL, s3 } from "~/server/storage";

export const uploadRouter = createTRPCRouter({
    getPresignedUrl: publicProcedure
      .input(
        z.object({
          fileName: z.string(),
          fileType: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { fileName, fileType } = input;
        const fileExtension = input.fileName.split(".").pop();
        const key = `knowledge_layer/uploads/${uuidv4()}.${fileExtension}`;
        
        const command = new PutObjectCommand({
          Bucket: ctx.session?.user.organization?.bucket || "uploads",
          Key: key,
          ContentType: input.fileType,
        });
        
        try {
          const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
          
          const bucketName = ctx.session?.user.organization?.bucket! || "";
          const directUrl = await constructURL(bucketName, key);
          
          return {
            presignedUrl,
            key,
            url: directUrl,
          };
        } catch (error) {
          console.error("Error generating presigned URL:", error);
          throw new Error("Failed to generate upload URL");
        }
      }),
  });
