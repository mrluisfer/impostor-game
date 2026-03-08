export type AppTheme = 'midnight' | 'sunset' | 'mint';

export const APP_THEMES: AppTheme[] = ['midnight', 'sunset', 'mint'];

export function isAppTheme(value: string): value is AppTheme {
  return APP_THEMES.includes(value as AppTheme);
}
