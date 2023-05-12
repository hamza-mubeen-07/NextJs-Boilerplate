import { NextRequest, NextResponse } from 'next/server';
import { ALLOWED_LOCALE, DEFAULT_LOCALE } from '@/constants/commonConstant';
import langParser from 'accept-language-parser';

type PathnameLocale = {
  pathname: string;
  locale?: never;
};
type ISOLocale = {
  pathname?: never;
  locale: string;
};

type LocaleSource = PathnameLocale | ISOLocale;

const getLocalePartsFrom = ({ pathname, locale }: LocaleSource) => {
  if (locale) {
    const localeParts = locale.toLowerCase().split('-');
    return localeParts[0];
  } else {
    const pathnameParts = pathname!.toLowerCase().split('/');
    return pathnameParts[1];
  }
};

const findBestMatchingLocale = (acceptLangHeader: string) => {
  // if (!acceptLangHeader) return;
  const parsedLangs = langParser.parse(acceptLangHeader);

  // find the first locale that matches a locale in our list
  for (let i = 0; i < parsedLangs.length; i++) {
    const parsedLang = parsedLangs[i];
    // if we didn't find a match for both language and country, try just the language
    const matchedLanguage = ALLOWED_LOCALE.find((locale) => {
      const parsedLocale = getLocalePartsFrom({ locale });
      return parsedLang.code === parsedLocale;
    });
    if (matchedLanguage) {
      return matchedLanguage;
    }
  }

  return DEFAULT_LOCALE;
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const currentPathnameLang = getLocalePartsFrom({ pathname });

  if (currentPathnameLang === DEFAULT_LOCALE) {
    /* we want to REMOVE the default locale from the pathname, and later when page sent request
     with new urk without en use a rewrite so that Next will still match the correct code file as
     if there was a locale in the pathname */
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${DEFAULT_LOCALE}`,
          pathname.startsWith('/') && pathname.length === 3 ? '/' : ''
        ),
        request.url
      )
    );
  }

  const pathnameIsMissingValidLocale = ALLOWED_LOCALE.every((locale) => {
    return !pathname.startsWith(`/${locale}`);
  });

  if (pathnameIsMissingValidLocale) {
    // rewrite it so next.js will render `/` as if it was `/en/us`
    const matchedLocale = findBestMatchingLocale(
      request.headers.get('Accept-Language') || DEFAULT_LOCALE
    );

    if (matchedLocale !== DEFAULT_LOCALE) {
      const matchedLocaleParts = getLocalePartsFrom({ locale: matchedLocale });
      return NextResponse.redirect(
        new URL(`/${matchedLocaleParts}{pathname}`, request.url)
      );
    } else {
      return NextResponse.rewrite(
        new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
      );
    }
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/',
  ],
};
