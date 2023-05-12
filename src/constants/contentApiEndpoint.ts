import { iAllowedLocale } from '@/constants/commonConstant';

export const CONTENT_API_ENDPOINTS = {
  LOGIN_PAGE: (locale: iAllowedLocale = 'en') =>
    `/login-page-content?locale=${locale}`,
};
