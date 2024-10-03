import { Avatar, Button, Space } from 'antd';

import { updateFilters } from 'core/actions';
import { getAvatarSrc } from 'core/helpers';
import { useAppDispatch, useAppSelector } from 'core/hooks';
import { TUser } from 'core/types';

import styles from './filterByAssignee.module.scss';

const FilterByAssignee = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.list);
  const filters = useAppSelector(state => state.issues.filters);

  const handleClickUser = (user: TUser) => {
    const findIndex = filters.users.findIndex(userId => userId === user.id);
    const newFilterUsers =
      findIndex === -1 ? [...filters.users, user.id] : filters.users.filter(userId => userId !== user.id);
    dispatch(updateFilters({ ...filters, users: newFilterUsers }));
  };

  return (
    <Space className="avatar-board">
      <div className={styles.wrap}>
        {users.map((user, index) => (
          <div className={styles.item} key={user.id} style={{zIndex: users.length-index}}>
            <Button
              className={styles.avatarButton}
              type={filters.users.findIndex(userId => userId === user.id) >= 0 ? 'primary' : 'text'}
              shape="circle"
              onClick={() => handleClickUser(user)}
            >
              <Avatar src={getAvatarSrc('users', user.id)} />
            </Button>
          </div>
        ))}
      </div>
    </Space>
  );
};

export default FilterByAssignee;
