import { Avatar, Divider, Space } from 'antd';

import { useAppSelector } from 'core/hooks';

import styles from './userMenu.module.scss';

interface IProps {
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

const UserMenu = ({ onLogout, onNavigate }: IProps) => {
  const { user } = useAppSelector(state => state.session);
  return (
    <div className={styles.userMenu}>
      <div>Account</div>
      <Space className={styles.userMenu_info}>
        <Avatar src={user?.avatarSrc} />
        <div>
          <div className={styles.userMenu_name}>{user?.name}</div>
          <div className={styles.userMenu_email}>{user?.email}</div>
        </div>
      </Space>
      <Divider className={styles.userMenu_divider} />
      <ul className={styles.userMenu_links}>
        <li onClick={() => onNavigate('/my/profile')}>
          <a>Profile</a>
        </li>
        <li onClick={() => onNavigate('/my/resume')}>
          <a>Resume</a>
        </li>
      </ul>
      <Divider className={styles.userMenu_divider} />
      <ul className={styles.userMenu_links}>
        <li onClick={onLogout}>
          <a>Log out</a>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
