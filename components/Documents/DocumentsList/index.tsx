import Link from 'next/link';

import { useAppSelector } from 'core/hooks';

import styles from './documentsList.module.scss';

const DocumentsList = () => {
  const project = useAppSelector(state => state.projects.current);
  const documents = useAppSelector(state => state.documents.list);

  return (
    <ul className={styles.list}>
      {documents.map((item: any) => (
        <li key={item?.id}>
          <Link href={`/projects/${project?.ticket}/documents/${item?.id}`}>
            <a>{item?.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DocumentsList;
