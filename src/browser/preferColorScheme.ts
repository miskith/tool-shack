export const preferLightColorScheme = (): boolean => !!(window.matchMedia('(prefers-color-scheme: light)').matches);

export const preferDarkColorScheme = (): boolean => !!(window.matchMedia('(prefers-color-scheme: dark)').matches);

export const preferColorScheme = (): 'light'|'dark' => preferLightColorScheme() ? 'light' : 'dark';
