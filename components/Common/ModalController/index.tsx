import { useEffect, useState } from 'react';
import { Modal as AntdModal } from 'antd';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'core/hooks';
import { closeModal } from 'core/store';

import ComponentForm from 'components/Components/ComponentForm';
import Issue from 'components/Issues/Issue';
import IssueCreateForm from 'components/Issues/IssueCreateForm';
import ProjectForm from 'components/Projects/ProjectForm';
import ShortcutForm from 'components/Shortcuts/ShortcutForm';
import SignController from 'components/Sign/SignController';
import AddPeopleForm from 'components/Team/AddPeopleForm';
import InviteForm from 'components/Team/InviteForm';
import WorkspaceForm from 'components/Workspaces/WorkspaceForm';

import styles from './modal.module.scss';

const ModalController = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const data = useAppSelector(state => state.modal.data);

  const handleCloseModal = () => dispatch(closeModal());

  useEffect(() => setIsVisible(Boolean(data)), [data]);

  const modalContentComponents: any = {
    signController: <SignController onCancel={handleCloseModal} />,
    createProject: <ProjectForm onCancel={handleCloseModal} />,
    editProject: <ProjectForm project={data?.values?.project} onCancel={handleCloseModal} />,
    createWorkspace: <WorkspaceForm onCancel={handleCloseModal} />,
    editWorkspace: <WorkspaceForm workspace={data?.values?.workspace} onCancel={handleCloseModal} />,
    createComponent: <ComponentForm projectId={data?.values?.projectId} onCancel={handleCloseModal} />,
    editComponent: <ComponentForm component={data?.values?.component} onCancel={handleCloseModal} />,
    createIssue: <IssueCreateForm onCancel={handleCloseModal} />,
    editIssue: <Issue issueId={data?.values?.issueId} onCancel={handleCloseModal} />,
    createShortcut: <ShortcutForm onCancel={handleCloseModal} shortcut={data?.values?.item} />,
    inviteUser: <InviteForm onCancel={handleCloseModal} />,
    addPeople: <AddPeopleForm onCancel={handleCloseModal} />,
  };

  const width = data?.type === 'editIssue' ? 1100 : 520;

  const classes = classNames(styles.container, { [styles.issue]: data?.type === 'editIssue' });

  return (
    <AntdModal
      title={data?.name}
      footer={null}
      visible={isVisible}
      onCancel={handleCloseModal}
      width={width}
      style={data?.type === 'editIssue' ? { top: '40px' } : {}}
      className={classes}
    >
      {data?.type && modalContentComponents[data?.type]}
    </AntdModal>
  );
};

export default ModalController;
