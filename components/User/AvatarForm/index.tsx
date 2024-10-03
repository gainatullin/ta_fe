import { Avatar, Button, Upload } from 'antd';

import { useAppDispatch, useAppSelector, useSubmit } from 'core/hooks';
import { UsersServices } from 'core/services';
import { setAvatarSrc } from 'core/store';

import styles from './avatarForm.module.scss';

const AvatarForm = () => {
  const dispatch = useAppDispatch();
  const { submit } = useSubmit();
  const { user } = useAppSelector(state => state.session);

  const uploadAvatar = (info: any): void => {
    const data = new FormData();
    data.append('avatar', info.file);
    submit(
      UsersServices.upload,
      data,
      () => dispatch(setAvatarSrc()),
      error => console.log(error),
    );
  };

  if (!user) return null;

  return (
    <div className={styles.avatarForm}>
      <Avatar size={100} src={user.avatarSrc} />
      <Upload showUploadList={false} customRequest={uploadAvatar}>
        <Button type="link">Change</Button>
      </Upload>
    </div>
  );
};

export default AvatarForm;
