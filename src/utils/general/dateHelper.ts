"use client";

export const formatDateToLocaleString = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
