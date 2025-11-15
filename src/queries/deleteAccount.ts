import { API_URL } from '@/lib/setApiUrl';

type DeleteAccountArgs = {
  token: string;
};

export const deleteAccount = async ({ token }: DeleteAccountArgs) => {
  const res = await fetch(`${API_URL}/delete-account`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Check if response has content before parsing JSON
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    console.error('Delete account error:', {
      status: res.status,
      statusText: res.statusText,
      data,
    });
    throw new Error(data.message || `Failed to delete account (${res.status})`);
  }

  return data;
};
