import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export const sendForgotPasswordOtp = ({ email }) => {
  return api.post('/auth/forgot-password/send-otp', { email }, { skipErrorNotification: true });
};

export const verifyForgotPasswordOtp = ({ email, otpCode }) => {
  return api.post(
    '/auth/forgot-password/verify-otp',
    { email, otpCode },
    { skipErrorNotification: true },
  );
};

export const resetPassword = ({ resetToken, newPassword }) => {
  return api.post(
    '/auth/reset-password',
    { resetToken, newPassword },
    { skipErrorNotification: true },
  );
};

export const useForgotPasswordSendOtp = ({ onSuccess } = {}) =>
  useMutation({ mutationFn: sendForgotPasswordOtp, onSuccess });

export const useForgotPasswordVerifyOtp = ({ onSuccess } = {}) =>
  useMutation({ mutationFn: verifyForgotPasswordOtp, onSuccess });

export const useResetPassword = ({ onSuccess } = {}) =>
  useMutation({ mutationFn: resetPassword, onSuccess });
