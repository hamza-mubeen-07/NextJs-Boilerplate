import { apiManager } from '@/service/apiManager';
import { CONTENT_API_ENDPOINTS } from '@/constants/contentApiEndpoint';
import { store } from '@/store';
import { addLoginContent } from '@/store/content/content-slice';
import Provider from '@/store/Provider';
import LoginForm from '@/component/loginForm';

const getLoginData = async () => {
  const resp = await apiManager(
    CONTENT_API_ENDPOINTS.LOGIN_PAGE('en'),
    {},
    'GET',
    {}
  );
  return resp.data.data.attributes;
};

const PetListing = async () => {
  const loginPage = await getLoginData();
  store.dispatch(addLoginContent(loginPage));

  return (
    <div>
      <Provider>
        <LoginForm loginPageContent={loginPage} />
      </Provider>
    </div>
  );
};

export default PetListing;
