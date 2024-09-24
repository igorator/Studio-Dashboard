export const getFileFromEvent = (e: any): File | File[] | null => {
  console.log('Upload event:', e);

  // If e is an array, return the array of files
  if (Array.isArray(e)) {
    return e.map((file) => file.originFileObj);
  }

  // If e has originFileObj, return it, otherwise return e itself
  if (e && e.originFileObj) {
    return e.originFileObj;
  }

  return e;
};
