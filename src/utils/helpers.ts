export const handleLogout = async (router: any, signOut: any) => {
  try {
    await signOut();
    router.replace('/login-email');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
