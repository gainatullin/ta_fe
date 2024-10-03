import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {Button, Col, Form, Input, message, Row} from 'antd';

import {loadDocuments} from "core/actions/documents";
import {useAppDispatch, useAppSelector, useSubmit} from 'core/hooks';
import {DocumentsServices} from "core/services/documents";
import { TProject } from 'core/types/project';

import 'react-quill/dist/quill.snow.css';
import styles from './documentForm.module.scss';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface IProps {
  project?: TProject;
}
const DocumentForm: React.FC<IProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const project = useAppSelector(state => state.projects.current);
  const { isSubmitting, submit, clearError } = useSubmit();
  const [editorValue, setEditorValue] =  useState("");
  const [docName, setDocName] =  useState("");
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      DocumentsServices.get({id})
        .then(rs => {
          setDocName(rs.name);
          setEditorValue(rs.content);
          form.setFieldsValue({
            name: rs.name,
          });
        })
        .catch(error => console.log(error));
    }
  }, [id, form])

  const initialValues = {
    name: docName || '',
  };

  const handleOnSuccess = (msg: string) => {
    dispatch(loadDocuments());
    message.success(msg);
  };

  const handleSubmit = (values: any) => {
    if (id) {
      const data = {id: Number(id), name: values.name, content: editorValue};
      submit(DocumentsServices.update, data, (result) => {
        router.push(`/projects/${project?.ticket}/documents/${result.id}`);
        handleOnSuccess('Document updated')});
    } else {
      const data = {projectId: project?.id, name: values.name, content: editorValue};
      submit(DocumentsServices.create, data, (result) => {
        router.push(`/projects/${project?.ticket}/documents/${result.id}`)
        handleOnSuccess('Document created')});
    }
  }

  const handleRemoveDocument = () => {
    submit(DocumentsServices.remove, { id }, () => handleOnSuccess('Document removed'));
    router.push(`/projects/${project?.ticket}`)
  };

  const handleGoBack = () => router.back();

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      layout="vertical"
      onFieldsChange={clearError}
    >
      <div>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input Document name' },
            { min: 3, message: 'Shortcut name must be minimum 3 characters.' },
          ]}
        >
          <Input />
        </Form.Item>
          <ReactQuill value={editorValue} theme="snow" onChange={setEditorValue} className={styles.editor} />
      </div>
      <Row justify="space-between" className={styles.formButtons} >
        <Col />
        <Col>
          {docName && (
            <Button type="link" onClick={handleRemoveDocument}>
              Remove
            </Button>
          )}
          <Button type="link" onClick={handleGoBack}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {docName ? 'Update' : 'Save'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default DocumentForm;
