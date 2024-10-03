import { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';

interface IProps {
  value: string | number;
  onChange: (value: string | number) => void;
}

const IssueInput = ({ value, onChange }: IProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [iValue, setIValue] = useState<string | number>(value);

  const handleSubmit = () => {
    onChange(iValue);
    setIsEditMode(false);
  };

  const handleReset = () => {
    setIValue(value);
    setIsEditMode(false);
  };

  if (!isEditMode) {
    return <Input value={iValue} readOnly onClick={() => setIsEditMode(true)} style={{ width: '160px' }} />;
  }

  return (
    <Input
      value={iValue}
      onChange={event => setIValue(event.target.value)}
      onPressEnter={handleSubmit}
      suffix={
        <>
          <CloseOutlined style={{ cursor: 'pointer' }} onClick={handleReset} />
          <CheckOutlined style={{ cursor: 'pointer' }} onClick={handleSubmit} />
        </>
      }
      style={{ width: '160px' }}
    />
  );
};

export default IssueInput;
