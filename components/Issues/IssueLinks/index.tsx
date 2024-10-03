import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { LinksServices } from 'core/services';

import IssueLinkForm from 'components/Issues/IssueLinkForm';

import styles from './IssueLinks.module.scss';

interface IProps {
  issueId: number;
}

const IssueLinks = ({ issueId }: IProps) => {
  const [links, setLinks] = useState([]);
  const [showLinkAddForm, setShowAddLinkForm] = useState<boolean>(false);

  const loadLinks = () => {
    LinksServices.search({ issueId })
      .then(rs => setLinks(rs.list))
      .catch(error => console.log(error));
  };

  useEffect(loadLinks, [issueId]);

  const handleCancel = () => {
    setShowAddLinkForm(false);
    loadLinks();
  };

  console.log(links);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Issue links:</h4>
        <Button type="link" shape="circle" icon={<PlusOutlined />} onClick={() => setShowAddLinkForm(true)} />
      </div>
      {showLinkAddForm && <IssueLinkForm issueId={issueId} onCancel={handleCancel} />}
    </div>
  );
};

export default IssueLinks;
