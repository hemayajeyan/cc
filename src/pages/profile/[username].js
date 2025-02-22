import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'pages/Layout';

const UserProfile = ({ user }) => {
  const router = useRouter();
  const { username } = router.query;

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/6'>
          <div className='flex justify-center'>
            <ProfileSection
              userName={user?.userName}
              topSize={user?.topSize}
              bottomSize={user?.bottomSize}
              email={user?.email}
              name={user?.name}
              role={user?.role}
              gender={user?.gender}
              profilePicture={user?.profilePicture}
              onUploadClothes={handleUploadClothes}
            />
          </div>
        </div>
        <div className='w-full md:w-2/3'>
          <h1 className='font-extrabold'>LISTING</h1>
          <div className='p-1'>
            <ListingGrid />
          </div>
        </div>
        <div className='w-full md:w-1/6'>
          <div className='flex justify-center'>
            <ReviewSection reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { username } = context.params;
  const user = false;

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user },
  };
};

export default UserProfile;