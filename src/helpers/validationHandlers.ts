//---------------EMAIL
export const isEmailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
//---------------PASSWORD
export const isPasswordValid = (password: string): boolean => {
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  console.log(hasMinLength, hasNumber, hasSpecialChar);

  return hasMinLength && hasNumber && hasSpecialChar;
};
