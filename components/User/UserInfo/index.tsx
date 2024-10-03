import { Avatar, Space } from 'antd';

import { getAvatarSrc } from 'core/helpers';
import { TUser } from 'core/types';

interface IProps {
  user: TUser;
}

const UserInfo = ({ user }: IProps) => {
  return (
    <Space>
      <Avatar size="small" src={getAvatarSrc('users', user.id)} />
      <span>{user.name}</span>
    </Space>
  );
};

export default UserInfo;
