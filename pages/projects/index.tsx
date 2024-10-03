import { FileAddOutlined, FolderAddOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';

import { useAppDispatch } from 'core/hooks';
import { openModal } from 'core/store';
import { NextPageWithLayout } from 'core/types';

import { getMainLayout } from 'components/Main/MainLayout';
import ProjectsList from 'components/Projects/ProjectsList';

const Projects: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();

  const handleClickCreateProject = () => {
    dispatch(openModal({ name: 'Создание проекта', type: 'createProject' }));
  };

  const handleClickCreateWorkspace = () => {
    dispatch(openModal({ name: 'Создание workspace', type: 'createWorkspace' }));
  };

  return (
    <section className="container">
      <Row justify="space-between" align="middle" style={{ marginBottom: '10px' }}>
        <Col>
          <h1>Projects</h1>
        </Col>
        <Col>
          <Space>
            <Button onClick={handleClickCreateProject} icon={<FileAddOutlined />}>
              Create projects
            </Button>
            <Button onClick={handleClickCreateWorkspace} icon={<FolderAddOutlined />}>
              Create workspace
            </Button>
          </Space>
        </Col>
      </Row>
      <ProjectsList />
    </section>
  );
};

Projects.getLayout = getMainLayout;

export default Projects;
