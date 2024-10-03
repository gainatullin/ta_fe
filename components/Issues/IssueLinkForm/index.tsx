import React from 'react';
import { Button, Col, Form, message, Row, Select } from 'antd';

import { useAppSelector, useSubmit } from 'core/hooks';
import { LinksServices } from 'core/services';
import { ELinkType } from 'core/types';

interface IProps {
  issueId: number;
  onCancel: () => void;
}

const IssueLinkForm = ({ issueId, onCancel }: IProps) => {
  const [form] = Form.useForm();
  const issues = useAppSelector(state => state.issues.list);
  const { isSubmitting, submit, clearError } = useSubmit();

  const initialValues = {
    linkType: 'isBLockedBy',
    targetIssueId: null,
  };

  const handleSubmit = (values: any) => {
    submit(LinksServices.create, { ...values, sourceIssueId: issueId }, () => {
      message.success('Link created');
      onCancel();
    });
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={handleSubmit} onFieldsChange={clearError}>
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item name="linkType" rules={[{ required: true, message: 'Please select type' }]}>
            <Select>
              {(Object.keys(ELinkType) as (keyof typeof ELinkType)[]).map(key => (
                <Select.Option key={key} value={ELinkType[key]}>
                  {key}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item name="targetIssueId" rules={[{ required: true, message: 'Please select issue' }]}>
            <Select placeholder="Select issue ...">
              {issues.map(issue => (
                <Select.Option key={issue.id} value={issue.id}>
                  {issue.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <div>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Create
        </Button>
        <Button type="link" disabled={isSubmitting} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default IssueLinkForm;
