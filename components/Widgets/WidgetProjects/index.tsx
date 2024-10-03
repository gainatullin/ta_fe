import { Col, Row } from 'antd';

import { useAppSelector } from 'core/hooks';

import ProjectCard from 'components/Projects/ProjectCard';

const WidgetProjects = () => {
  const projects = useAppSelector(state => state.projects.list);

  return (
    <Row gutter={[16, 16]}>
      {projects.map(project => (
        <Col key={project.id} xs={24} sm={12}>
          <ProjectCard project={project} />
        </Col>
      ))}
    </Row>
  );
};

export default WidgetProjects;
