export const formatPhoneNumberInput = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');

  // Add hyphens as you type
  let formatted = '';
  if (cleaned.length > 0) {
    formatted = cleaned.substring(0, 3);
    if (cleaned.length > 3) {
      formatted += '-' + cleaned.substring(3, 6);
      if (cleaned.length > 6) {
        formatted += '-' + cleaned.substring(6, 10);
      }
    }
  }

  return formatted;
};
