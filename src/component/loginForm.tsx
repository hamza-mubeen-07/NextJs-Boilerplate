'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useAppSelector } from '@/hooks/storeHooks';
import { store } from '@/store';
import {
  iContentStoreState,
  rehydrateContent,
} from '@/store/content/content-slice';

const LoginForm = ({
  loginPageContent,
}: {
  loginPageContent: iContentStoreState;
}) => {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(rehydrateContent(loginPageContent));
    loaded.current = true;
  }

  const loginPage = useAppSelector((state) => state.content.loginPage);

  return (
    <div>
      <h1> {loginPage.pageHeading} </h1>
      <h4> {loginPage.pageSubHeading} </h4>
      <Link href="/" locale="ar">
        Switch Lang
      </Link>
    </div>
  );
};

export default LoginForm;
