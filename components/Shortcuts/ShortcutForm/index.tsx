import { Button, Col, Form, Input, message, Row } from 'antd';

import { loadShortcuts } from 'core/actions';
import { useAppDispatch, useAppSelector, useSubmit } from 'core/hooks';
import { ShortcutsServices } from 'core/services';

import styles from './shortcutForm.module.scss';

interface IProps {
  onCancel: () => void;
  shortcut: any;
}

const ShortcutForm: React.FC<IProps> = ({ onCancel, shortcut }) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(state => state.projects.current);
  const [form] = Form.useForm();
  const { isSubmitting, submit, clearError } = useSubmit();

  const initialValues = {
    link: shortcut?.link || '',
    name: shortcut?.name || '',
  };

  const handleOnSuccess = (msg: string) => {
    dispatch(loadShortcuts());
    message.success(msg);
    onCancel();
  };

  const handleSubmit = (values: any) => {
    if (shortcut) {
      const data = { ...values, id: shortcut.id };
      submit(ShortcutsServices.update, data, () => handleOnSuccess('Shortcut updated'));
    } else {
      const data = { ...values, projectId: project?.id };
      submit(ShortcutsServices.create, data, () => handleOnSuccess('Shortcut created'));
    }
  };

  const closeRemoveShortcut = () => {
    submit(ShortcutsServices.remove, { id: shortcut.id }, () => handleOnSuccess('Shortcut removed'));
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      layout="vertical"
      onFieldsChange={clearError}
    >
      <div className={styles.formContent}>
        <Form.Item
          label="Web address"
          name="link"
          rules={[
            { required: true, message: 'Please input Web address' },
            { min: 7, message: 'Web address must be minimum 7 characters.' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input Shortcut name' },
            { min: 3, message: 'Shortcut name must be minimum 3 characters.' },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <Row justify="space-between">
        <Col />
        <Col>
          {shortcut && (
            <Button type="link" onClick={closeRemoveShortcut}>
              Remove
            </Button>
          )}
          <Button type="link" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            {shortcut ? 'Update' : 'Create'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ShortcutForm;
