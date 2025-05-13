import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  region: 'us-east-1',
  endpoint: 'http://localhost:9000',
  forcePathStyle: true,
  credentials: {
    accessKeyId: 'minioadmin',
    secretAccessKey: 'minioadmin',
  },
})
  

export async function initializeOrganizationBucket(orgId: string) {
  const bucketName = `org-${orgId}`.toLowerCase()
  try {
    await s3.send(
      new CreateBucketCommand({
        Bucket: bucketName,
      })
    )
    return ({ status: 200, message: `Bucket ${bucketName} created successfully`, data: bucketName });
  } catch (error: any) {
    if (error.name === 'BucketAlreadyOwnedByYou') {
      return ({ status: 400, message: `Bucket ${bucketName} already exists`, data: "Error" });
    } else {
      return ({ status: 400, message: `Error creating ${bucketName}`, data: "Error"});
    }
  }
}

export async function constructURL(bucketName: string, key: string) {
  const url = `${process.env.S3_URL}/${bucketName}/${key}`;

  return url;
}