import { NextPageWithLayout } from 'core/types';

import { getMainLayoutWithAuth } from 'components/Main/MainLayout';
import AvatarForm from 'components/User/AvatarForm';
import ProfileForm from 'components/User/ProfileForm';

const Profile: NextPageWithLayout = () => {
  return (
    <section className="container">
      <h1>Profile</h1>
      <AvatarForm />
      <ProfileForm />
    </section>
  );
};

Profile.getLayout = getMainLayoutWithAuth;

export default Profile;
