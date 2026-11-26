import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export const verifyEmailOtp = ({ email, otpCode }) => {
  return api.post('/auth/verify-email-otp', { email, otpCode }, { skipErrorNotification: true });
};

export const useVerifyEmailOtp = ({ onSuccess } = {}) => {
  return useMutation({
    mutationFn: verifyEmailOtp,
    onSuccess,
  });
};
