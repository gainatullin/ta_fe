import { NextPageWithLayout } from 'core/types';

import { getMainLayoutWithAuth } from 'components/Main/MainLayout';
import ResumeForm from 'components/User/ResumeForm';

const Resume: NextPageWithLayout = () => {
  return (
    <section className="container">
      <h1>Resume</h1>
      <ResumeForm />
    </section>
  );
};

Resume.getLayout = getMainLayoutWithAuth;

export default Resume;
