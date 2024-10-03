import { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

import styles from './issueName.module.scss';

interface IProps {
  name: string;
  onChange: (value: string) => void;
}

const IssueName = ({ name, onChange }: IProps) => {
  const [value, setValue] = useState<string>(name);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmit = () => {
    name !== value && onChange(value);
    setIsEditMode(false);
  };

  const handleReset = () => {
    setValue(name);
    setIsEditMode(false);
  };

  if (!isEditMode) {
    return (
      <div className={styles.issueName} onClick={() => setIsEditMode(true)}>
        {value}
      </div>
    );
  }

  return (
    <Input
      className={styles.issueName_input}
      value={value}
      onChange={e => setValue(e.target.value)}
      suffix={
        <>
          <Button type="text" onClick={handleSubmit} icon={<CheckOutlined />} />
          <Button type="text" onClick={handleReset} icon={<CloseOutlined />} />
        </>
      }
    />
  );
};

export default IssueName;
