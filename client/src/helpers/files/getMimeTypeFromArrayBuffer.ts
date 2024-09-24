export function getMimeTypeFromArrayBuffer(
  arrayBuffer: ArrayBuffer,
): string | null {
  const uint8arr = new Uint8Array(arrayBuffer);

  const len = 4;
  if (uint8arr.length >= len) {
    const signatureArr = new Array(len);
    for (let i = 0; i < len; i++) {
      signatureArr[i] = uint8arr[i].toString(16);
    }
    const signature = signatureArr.join('').toUpperCase();

    switch (signature) {
      case '89504E47':
        return 'image/png';
      case '47494638':
        return 'image/gif';
      case 'FFD8FFE0':
      case 'FFD8FFE1':
      case 'FFD8FFE2':
        return 'image/jpeg';
      case '52494646':
        return 'image/webp';
      default:
        return null;
    }
  }
  return null;
}
