import React from 'react';
import { Button } from 'antd';

import { useAppDispatch } from 'core/hooks';
import { openModal } from 'core/store';
import { NextPageWithLayout } from 'core/types';

import { getProjectLayout } from 'components/Projects/ProjectLayout';
import TeamList from 'components/Team/TeamList';

import styles from 'components/Team/TeamList/teamList.module.scss';

const Team: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();

  const handleInviteUser = () => {
    dispatch(openModal({ name: 'Invite user', type: 'inviteUser' }));
  };

  const handleAddPeople = () => {
    dispatch(openModal({ name: 'Add people', type: 'addPeople' }));
  };

  return (
    <>
      <div className={styles.head}>
        <h1>Team</h1>
        <div>
          <Button type="primary" onClick={handleInviteUser}>
            Invite
          </Button>
          <Button type="primary" style={{ marginLeft: '20px' }} onClick={handleAddPeople}>
            Add people
          </Button>
        </div>
      </div>
      <TeamList />
    </>
  );
};

Team.getLayout = getProjectLayout;

export default Team;
