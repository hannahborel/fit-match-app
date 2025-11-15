import { useCallback, useState } from 'react';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';

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

/**
 * Hook for handling both sign-in and sign-up flows using email verification codes.
 *
 * Supports two authentication paths:
 * 1. Sign In (existing users): Uses Clerk's signIn API with email_code strategy
 * 2. Sign Up (new users): Uses Clerk's signUp API with email verification
 *
 * Both flows use the same UI screens and email code verification process,
 * differentiated only by the isNewUser flag passed through the authentication flow.
 */
export function useHandleLogin() {
  const { isLoaded, signIn } = useSignIn();
  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  /**
   * Sends an email verification code to the user's email address.
   *
   * @param email - The user's email address
   * @param isNewUser - Whether this is a new user sign-up (true) or existing user sign-in (false)
   * @returns Promise resolving to SendEmailCodeResult indicating success/failure
   *
   * For new users:
   * - Creates a new sign-up session with Clerk
   * - Prepares email address verification with a 6-digit code
   *
   * For existing users:
   * - Creates a sign-in attempt with Clerk
   * - Prepares first factor authentication using email_code strategy
   */
  const sendEmailCode = useCallback(
    async (email: string, isNewUser: boolean = false): Promise<SendEmailCodeResult> => {
      if (isNewUser) {
        // New user flow - use signUp
        if (!signUpLoaded || !signUp) {
          return { ok: false, error: 'Auth not initialized' };
        }

        setIsSending(true);
        setSendError(null);
        try {
          await signUp.create({
            emailAddress: email,
          });

          await signUp.prepareEmailAddressVerification({
            strategy: 'email_code',
          });

          return { ok: true };
        } catch (error: any) {
          console.error('Error sending email code for new user:', error);
          const message =
            typeof error?.message === 'string'
              ? error.message
              : 'Failed to send code';
          setSendError(message);
          return { ok: false, error: message };
        } finally {
          setIsSending(false);
        }
      } else {
        // Existing user flow - use signIn
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
      }
    },
    [isLoaded, signIn, signUpLoaded, signUp],
  );

  const verifyEmailCode = useCallback(
    async (code: string, isNewUser: boolean = false): Promise<VerifyEmailCodeResult> => {
      if (code.length !== 6) {
        return { ok: false, error: 'Code must be 6 digits' };
      }

      if (isNewUser) {
        // New user verification - use signUp
        if (!signUpLoaded || !signUp) {
          return { ok: false, error: 'Auth not initialized' };
        }

        setIsVerifying(true);
        setVerifyError(null);
        try {
          const result = await signUp.attemptEmailAddressVerification({
            code,
          });

          console.log('Sign up verification result:', {
            status: result.status,
            createdSessionId: result.createdSessionId,
          });

          if (result.status === 'complete' && result.createdSessionId) {
            return {
              ok: true,
              status: result.status ?? undefined,
              createdSessionId: result.createdSessionId ?? undefined,
            };
          }

          return {
            ok: false,
            status: result.status ?? undefined,
            error: 'Verification not complete',
          };
        } catch (error: any) {
          console.error('Error verifying email code for new user:', error);
          const message =
            typeof error?.message === 'string'
              ? error.message
              : 'Failed to verify code';
          setVerifyError(message);
          return { ok: false, error: message };
        } finally {
          setIsVerifying(false);
        }
      } else {
        // Existing user verification - use signIn
        if (!isLoaded || !signIn) {
          return { ok: false, error: 'Auth not initialized' };
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
      }
    },
    [isLoaded, signIn, signUpLoaded, signUp],
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
