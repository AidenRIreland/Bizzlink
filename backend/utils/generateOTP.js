export const generateOTP = () => {
    //? Generates a 6-digit random OTP incase theirs no 2FA
    return Math.floor(100000 + Math.random() * 900000).toString();
  };