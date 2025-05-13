export const handleUpdateFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload/logo", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();

  return data;
};