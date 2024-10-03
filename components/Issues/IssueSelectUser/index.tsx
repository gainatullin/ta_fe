import { useState } from 'react';
import { Select } from 'antd';

import { useAppSelector } from 'core/hooks';
import { TUser } from 'core/types';

import UserInfo from 'components/User/UserInfo';

interface IProps {
  user: TUser | null;
  onChange: (userId: number | null) => void;
}

const IssueSelectUser = ({ user, onChange }: IProps) => {
  const users = useAppSelector(state => state.users.list);
  const [selectedUser, setSelectedUser] = useState<TUser | null | undefined>(user);

  const handleSelect = (userId: any) => {
    const newUser = userId ? users.find(item => item.id === userId) : null;
    setSelectedUser(newUser);
    onChange(newUser ? newUser.id : null);
  };

  return (
    <Select onChange={handleSelect} defaultValue={selectedUser ? selectedUser.id : 0} style={{ width: '160px' }}>
      <Select.Option key={0} value={0}>
        Unassigned
      </Select.Option>
      {users.map(item => (
        <Select.Option key={item.id} value={item.id}>
          <UserInfo user={item} />
        </Select.Option>
      ))}
    </Select>
  );
};

export default IssueSelectUser;
