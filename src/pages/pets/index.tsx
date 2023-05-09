import { useEffect } from 'react';
import { getPetsList } from '@/store/pets/petThunks';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { RootState, store } from '@/store';
import { rehydrate } from '@/store/pets/petSlice';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const PetListing = ({
  initialState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();
  const { petsList } = useAppSelector((state) => state.pets);

  useEffect(() => {
    console.log(initialState.pets);
    dispatch(rehydrate(initialState.pets));
  }, []);

  return (
    <div>
      <h1> Pet Listing </h1>
      <div>
        {petsList.map((pet, index) => (
          <p key={index}>{pet.name}</p>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  initialState: RootState;
}> = async () => {
  await store.dispatch(getPetsList());

  return {
    props: {
      initialState: store.getState(),
    },
  };
};

export default PetListing;
