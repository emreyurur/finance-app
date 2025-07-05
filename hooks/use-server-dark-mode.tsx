// use-server-dark-mode.ts
import { cookies } from 'next/headers';

const useServerDarkMode = async (defaultTheme = 'dark') => {
  return (await cookies()).get('theme')?.value ?? defaultTheme;
};

export default useServerDarkMode;
