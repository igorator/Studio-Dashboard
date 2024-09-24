import { useState, useEffect } from 'react';
import { getMimeTypeFromArrayBuffer } from '../helpers/files/getMimeTypeFromArrayBuffer';

export function useImageFromBuffer(data: number[] | null) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const bufferToBase64 = async (buffer: Uint8Array) => {
    const base64url = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(new Blob([buffer]));
    });
    return base64url.slice(base64url.indexOf(',') + 1); // Убираем префикс
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (data === null) {
        setError('No cover data provided');
        setLoading(false);
        return;
      }

      if (Array.isArray(data) && data.length > 0) {
        try {
          setLoading(true);

          const uint8Array = new Uint8Array(data);
          const mimeType = getMimeTypeFromArrayBuffer(uint8Array.buffer);

          if (!mimeType) {
            throw new Error('Unable to determine MIME type');
          }

          const base64String = await bufferToBase64(uint8Array);
          setImage(`data:${mimeType};base64,${base64String}`);
        } catch (err) {
          console.error('Failed to load image:', err);
          setError('Failed to load image');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Invalid data format');
        setLoading(false);
      }
    };

    fetchImage();
  }, [data]);

  return { image, loading, error };
}
