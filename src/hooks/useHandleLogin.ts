import { useCallback, useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';

type SendEmailCodeResult = {
  ok: boolean;
  error?: string;
};

type VerifyEmailCodeResult = {
  ok: boolean;
  status?: string;
  createdSessionId?: string;
  error?: string;
};

export function useHandleLogin() {
  const { isLoaded, signIn } = useSignIn();
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const sendEmailCode = useCallback(
    async (email: string): Promise<SendEmailCodeResult> => {
      if (!isLoaded || !signIn) {
        return { ok: false, error: 'Auth not initialized' };
      }

      setIsSending(true);
      setSendError(null);
      try {
        const signInAttempt = await signIn.create({
          identifier: email,
        });

        const emailFactor = signInAttempt.supportedFirstFactors?.find(
          (factor) =>
            factor.strategy === 'email_code' && factor.safeIdentifier === email,
        );

        if (!emailFactor || emailFactor.strategy !== 'email_code') {
          throw new Error('Email code authentication not available');
        }

        const result = await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId: emailFactor.emailAddressId,
        });

        if (result.status === 'needs_first_factor') {
          return { ok: true };
        }

        return { ok: false, error: 'Unexpected status sending code' };
      } catch (error: any) {
        console.error('Error sending email code:', error);
        const message =
          typeof error?.message === 'string'
            ? error.message
            : 'Failed to send code';
        setSendError(message);
        return { ok: false, error: message };
      } finally {
        setIsSending(false);
      }
    },
    [isLoaded, signIn],
  );

  const verifyEmailCode = useCallback(
    async (code: string): Promise<VerifyEmailCodeResult> => {
      if (!isLoaded || !signIn) {
        return { ok: false, error: 'Auth not initialized' };
      }
      if (code.length !== 6) {
        return { ok: false, error: 'Code must be 6 digits' };
      }

      setIsVerifying(true);
      setVerifyError(null);
      try {
        const signInAttempt = await signIn.attemptFirstFactor({
          strategy: 'email_code',
          code,
        });

        if (signInAttempt.status === 'complete') {
          return {
            ok: true,
            status: signInAttempt.status ?? undefined,
            createdSessionId: signInAttempt.createdSessionId ?? undefined,
          };
        }
        return {
          ok: false,
          status: signInAttempt.status ?? undefined,
          error: 'Verification not complete',
        };
      } catch (error: any) {
        console.error('Error verifying email code:', error);
        const message =
          typeof error?.message === 'string'
            ? error.message
            : 'Failed to verify code';
        setVerifyError(message);
        return { ok: false, error: message };
      } finally {
        setIsVerifying(false);
      }
    },
    [isLoaded, signIn],
  );

  return {
    sendEmailCode,
    isSending,
    sendError,
    verifyEmailCode,
    isVerifying,
    verifyError,
  };
}
