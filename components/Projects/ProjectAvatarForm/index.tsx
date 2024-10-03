import { Avatar, Button, Upload } from 'antd';

import { useAppDispatch, useSubmit } from 'core/hooks';
import { ProjectsServices } from 'core/services';
import { updateAvatarSrc } from 'core/store';
import { TProject } from 'core/types';

import styles from './projectAvatar.module.scss';

interface IProps {
  project: TProject;
}

const ProjectAvatarForm = ({ project }: IProps) => {
  const dispatch = useAppDispatch();
  const { submit } = useSubmit();

  const uploadAvatar = (info: any): void => {
    const data = new FormData();
    data.append('avatar', info.file);
    data.append('id', project.id.toString());
    submit(
      ProjectsServices.upload,
      data,
      () => dispatch(updateAvatarSrc()),
      error => console.log(error),
    );
  };

  if (!project) return null;

  return (
    <div className={styles.avatarForm}>
      <Avatar size={100} src={project?.avatarSrc} />
      <Upload showUploadList={false} customRequest={uploadAvatar}>
        <Button type="link">Change</Button>
      </Upload>
    </div>
  );
};

export default ProjectAvatarForm;
