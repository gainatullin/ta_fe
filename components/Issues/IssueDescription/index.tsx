import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';

import styles from './issueDescription.module.scss';

interface IProps {
  description: string;
  onChange: (value: string) => void;
}

const IssueDescription = ({ description, onChange }: IProps) => {
  const [value, setValue] = useState<string>(description);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmit = () => {
    description !== value && onChange(value);
    setIsEditMode(false);
  };

  const handleReset = () => {
    setValue(description);
    setIsEditMode(false);
  };

  return (
    <>
      <h4>Description:</h4>
      {!isEditMode ? (
        <div
          className={Boolean(value) ? styles.issueDescription : styles.issueDescription_empty}
          onClick={() => setIsEditMode(true)}
        >
          {Boolean(value) ? value : 'Add description'}
        </div>
      ) : (
        <>
          <Input.TextArea onChange={event => setValue(event.target.value)} defaultValue={value} />
          <Space className={styles.issueDescription_buttons}>
            <Button type="primary" onClick={handleSubmit}>
              Save
            </Button>
            <Button type="text" onClick={handleReset}>
              Cancel
            </Button>
          </Space>
        </>
      )}
    </>
  );
};

export default IssueDescription;
