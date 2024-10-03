import { Avatar, Button, Form, Input, message } from 'antd';

import { useAppSelector, useSubmit } from 'core/hooks';
import { CommentsServices } from 'core/services';

import styles from './commetCreateForm.module.scss';

interface IProps {
  issueId: number;
  onCreate: () => void;
}

const CommentCreateForm = ({ issueId, onCreate }: IProps) => {
  const user = useAppSelector(state => state.session.user);
  const [form] = Form.useForm();
  const { isSubmitting, submit, clearError } = useSubmit();

  const initialValues = {
    description: '',
  };

  const handleSubmit = (values: any) => {
    submit(CommentsServices.create, { ...values, issueId }, () => {
      form.setFieldsValue({ description: '' });
      message.success('Created');
      onCreate();
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar src={user?.avatarSrc} />
      </div>
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
        layout="vertical"
        onFieldsChange={clearError}
      >
        <Form.Item name="description">
          <Input.TextArea placeholder="Add comment" />
        </Form.Item>
        <div>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CommentCreateForm;
