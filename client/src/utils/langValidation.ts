export const isUkrainian = (value: string) =>
  /^[\u0400-\u04FF\s.,!?]+$/.test(value);

export const isEnglish = (value: string) => /^[A-Za-z\s.,!?]+$/.test(value);
