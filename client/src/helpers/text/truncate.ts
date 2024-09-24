export const truncate = (str: string, maxLength: number = 20): string => {
  if (str.length > maxLength) {
    return `${str.slice(0, maxLength)}...`;
  }
  return str;
};
