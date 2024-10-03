import { Col, Row, Space } from 'antd';

import { NextPageWithLayout } from 'core/types';

import FilterByAssignee from 'components/Board/FilterByAssignee';
import FilterByName from 'components/Board/FilterByName';
import FilterClearAll from 'components/Board/FilterClearAll';
import FilterQuick from 'components/Board/FilterQuick';
import Kanban from 'components/Board/Kanban';
import ProjectBreadcrumbs from 'components/Projects/ProjectBreadcrumbs';
import { getProjectLayout } from 'components/Projects/ProjectLayout';

const Project: NextPageWithLayout = () => {
  return (
    <>
      <header>
        <ProjectBreadcrumbs />
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <h1>Board</h1>
              <FilterByName />
              <FilterByAssignee />
              <FilterQuick />
              <FilterClearAll />
            </Space>
          </Col>
          <Col />
        </Row>
      </header>
      <main>
        <Kanban />
      </main>
    </>
  );
};

Project.getLayout = getProjectLayout;

export default Project;
