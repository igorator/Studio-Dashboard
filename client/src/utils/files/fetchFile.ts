export const fetchFile = async (url: string | undefined) => {
  if (!url) {
    throw new Error('URL is undefined');
  }

  const response = await fetch(url);
  const blob = await response.blob();
  const fileName = url.split('/').pop() || 'unknown_file'; // Защита от пустого значения
  const file = new File([blob], fileName, { type: blob.type });

  return file;
};
