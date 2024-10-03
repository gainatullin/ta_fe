import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, message } from 'antd';
import moment from 'moment';

import { useAppSelector, useSubmit } from 'core/hooks';
import { ResumeServices } from 'core/services';

const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';

const ResumeForm: React.FC = () => {
  const { user } = useAppSelector(state => state.session);
  const [form] = Form.useForm();
  const [resumeData, setResumeData] = useState<any>(null);
  const { isSubmitting, submit, clearError } = useSubmit();

  useEffect(() => {
    if (user) {
      ResumeServices.get({ creatorId: user?.id })
        .then(res => {
          let skillsAll = '';
          res?.skills.map((item: any) => (skillsAll += item.value + ' '));
          form.setFieldsValue({
            id: res.id,
            name: res?.name || '',
            birthDate: moment(res?.birthDate, dateFormat) || '',
            country: res?.country || '',
            city: res?.city || '',
            education: res?.education || '',
            experience: res?.experience || '',
            skills: skillsAll.trim(),
          });
          setResumeData(res);
        })
        .catch(error => console.log(error));
    }
  }, [user, form]);

  const onSubmit = (values: any): void => {
    const birth = moment(values.birthdate).format(dateFormat);
    const skills = values?.skills ? values.skills.split(' ') : [];
    const updateData = {
      name: values.name,
      birthDate: birth,
      country: values.country,
      city: values.city,
      education: values.education,
      experience: values.experience,
      skills,
    };
    if (Boolean(resumeData)) {
      submit(ResumeServices.update, { ...updateData, id: resumeData?.id }, () => {
        message.info('The data was changed successfully');
      });
    } else {
      submit(ResumeServices.create, updateData, () => {
        message.info('The data was changed successfully');
      });
    }
  };

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical" onFieldsChange={clearError}>
      <div>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input name' },
            { min: 1, message: 'Name must be minimum 1 characters.' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Birthate" name="birthDate">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input />
        </Form.Item>
        <Form.Item label="Education" name="education">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Experience" name="experience">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Skills" name="skills">
          <TextArea rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit" size="large" disabled={isSubmitting}>
          {isSubmitting && <LoadingOutlined />}
          Save
        </Button>
      </div>
    </Form>
  );
};

export default ResumeForm;
