export const formatDate = (date: string | Date): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
};
