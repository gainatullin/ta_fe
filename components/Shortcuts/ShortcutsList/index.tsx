import Link from 'next/link';

import { useAppDispatch, useAppSelector } from 'core/hooks';
import { openModal } from 'core/store';

import styles from './shortcutsList.module.scss';

const ShortcutsList = () => {
  const dispatch = useAppDispatch();
  const shortcuts = useAppSelector(state => state.shortcuts.list);

  const handleEditShortcut = (item: any) => {
    dispatch(openModal({ name: 'Edit shortcut', type: 'createShortcut', values: { item } }));
  };

  return (
    <ul className={styles.list}>
      {shortcuts.map((item: any) => (
        <li key={item?.id}>
          <div className="shortcut-wrap">
            <div>
              <Link href={item?.link}>
                <a target="_blank">{item?.name}</a>
              </Link>
            </div>
            <div className="shortcut-edit" onClick={() => handleEditShortcut(item)}>
              Edit
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ShortcutsList;
