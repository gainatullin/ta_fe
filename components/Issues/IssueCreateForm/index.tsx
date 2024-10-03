import React from 'react';
import { Button, Col, Form, Input, message, Row, Select, Switch } from 'antd';

import { loadIssues } from 'core/actions';
import { useAppDispatch, useAppSelector, useSubmit } from 'core/hooks';
import { IssuesServices } from 'core/services';
import { closeModal } from 'core/store';
import { EIssuePriority, EIssueStatus, EIssueType } from 'core/types';

import styles from './issueCreateForm.module.scss';

const { TextArea } = Input;

interface IProps {
  onCancel: () => void;
}

const IssueCreateForm: React.FC<IProps> = ({ onCancel }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const user = useAppSelector(state => state.session.user);
  const projects = useAppSelector(state => state.projects.list);
  const project = useAppSelector(state => state.projects.current);
  const components = useAppSelector(state => state.components.list);
  const users = useAppSelector(state => state.users.list);
  const { isSubmitting, submit, clearError } = useSubmit();

  const initialValues = {
    name: '',
    description: '',
    projectId: project?.id,
    componentId: null,
    assigneeId: null,
    reporterId: user?.id,
    priority: EIssuePriority.Medium,
    type: EIssueType.Task,
    isBacklog: false,
    estimate: '',
    storyPoints: null,
  };

  const handleSubmit = (values: any) => {
    const data = { ...values, status: EIssueStatus['To Do'] };
    submit(IssuesServices.create, data, () => {
      dispatch(loadIssues());
      message.success('Created');
      onCancel && onCancel();
    });
  };

  const closeCreateIssue = () => dispatch(closeModal());

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      layout="vertical"
      onFieldsChange={clearError}
    >
      <div className={styles.formContent}>
        <Form.Item label="Project" name="projectId" rules={[{ required: true, message: 'Please select project' }]}>
          <Select>
            {projects.map(project => (
              <Select.Option key={project.id} value={project.id}>
                {project.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Issue type" name="type" rules={[{ required: true, message: 'Please select type' }]}>
          <Select>
            {(Object.keys(EIssueType) as (keyof typeof EIssueType)[]).map(key => (
              <Select.Option key={key} value={EIssueType[key]}>
                {key}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Summary"
          name="name"
          rules={[
            { required: true, message: 'Please input summary' },
            { min: 3, message: 'Name must be minimum 3 characters.' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea />
        </Form.Item>
        <Form.Item label="Component" name="componentId">
          <Select allowClear>
            {components.map(component => (
              <Select.Option key={component.id} value={component.id}>
                {component.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Priority" name="priority" rules={[{ required: true, message: 'Please select priority' }]}>
          <Select>
            {(Object.keys(EIssuePriority) as (keyof typeof EIssuePriority)[]).map(key => (
              <Select.Option key={key} value={EIssuePriority[key]}>
                {key}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Assignee" name="assigneeId">
          <Select allowClear>
            {users.map(user => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Reporter" name="reporterId">
          <Select>
            {users.map(user => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Backlog" name="isBacklog" valuePropName="checked">
          <Switch size="small" />
        </Form.Item>
        <Form.Item label="Estimate" name="estimate">
          <Input />
        </Form.Item>
        <Form.Item label="Story points" name="storyPoints">
          <Input />
        </Form.Item>
      </div>
      <Row justify="space-between">
        <Col />
        <Col>
          <Button type="link" onClick={closeCreateIssue}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            Create
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default IssueCreateForm;
