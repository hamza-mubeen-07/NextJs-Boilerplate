import { store } from '@/store';
import Provider from '@/store/Provider';
import LoginForm from '@/component/loginForm';
import { getLoginPageContent } from '@/store/content/content-thunk';

const PetListing = async () => {
  await store.dispatch(getLoginPageContent());
  const content = store.getState().content;
  return (
    <div>
      <Provider>
        <LoginForm loginPageContent={content} />
      </Provider>
    </div>
  );
};

export default PetListing;
