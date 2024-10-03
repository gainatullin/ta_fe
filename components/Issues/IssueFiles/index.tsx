import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './IssueFiles.module.scss';

interface IProps {
  issueId: number;
}

const IssueFiles = ({ issueId }: IProps) => {
  console.log(issueId);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Files:</h4>
        <Button type="link" shape="circle" icon={<PlusOutlined />} />
      </div>
    </div>
  );
};

export default IssueFiles;
