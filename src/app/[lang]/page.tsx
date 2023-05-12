import { store } from '@/store';
import Provider from '@/store/Provider';
import LoginForm from '@/component/loginForm';
import { getLoginPageContent } from '@/store/content/content-thunk';
import { iAllowedLocale } from '@/constants/commonConstant';
import { updateLang } from '@/store/content/content-slice';

const PetListing = async ({ params }: { params: { lang: iAllowedLocale } }) => {
  await store.dispatch(getLoginPageContent(params.lang));
  store.dispatch(updateLang(params.lang));
  const content = store.getState().content;
  return (
    <div>
      <Provider>
        <h1>{JSON.stringify(params)}</h1>
        <LoginForm loginPageContent={content} />
      </Provider>
    </div>
  );
};

export default PetListing;
