export const DEFAULT_LOCALE = 'en' as const;
export const ALLOWED_LOCALE = [DEFAULT_LOCALE, 'ar'] as const;
export type iAllowedLocale = (typeof ALLOWED_LOCALE)[number];
