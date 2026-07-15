import { supabaseClient } from "@/lib/supabase";

export const handleImageUpload = async (
  file: Blob,
  fileNameHint: string,
  bucketName: string,
) => {
  const fileName = `${Date.now()}-${fileNameHint}`;

  const { error } = await supabaseClient.storage
    .from(bucketName)
    .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseClient.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  return { publicUrl: data.publicUrl, filePath: fileName };
};
