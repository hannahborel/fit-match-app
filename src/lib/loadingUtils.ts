/**
 * Ensures a minimum loading duration for better UX
 * Prevents loading states from flickering too quickly
 *
 * @param promise - The async operation to execute
 * @param minDuration - Minimum duration in milliseconds (default: 3000ms)
 * @returns The result of the promise after the minimum duration
 */
export async function withMinimumLoadingDuration<T>(
  promise: Promise<T>,
  minDuration: number = 3000
): Promise<T> {
  const startTime = Date.now();

  try {
    const result = await promise;
    const elapsed = Date.now() - startTime;
    const remaining = minDuration - elapsed;

    if (remaining > 0) {
      await new Promise(resolve => setTimeout(resolve, remaining));
    }

    return result;
  } catch (error) {
    const elapsed = Date.now() - startTime;
    const remaining = minDuration - elapsed;

    if (remaining > 0) {
      await new Promise(resolve => setTimeout(resolve, remaining));
    }

    throw error;
  }
}
