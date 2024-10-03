import { Col, Row, Space } from 'antd';

import { NextPageWithLayout } from 'core/types';

import BackLogList from 'components/Backlog/BacklogList';
import FilterByAssignee from 'components/Board/FilterByAssignee';
import FilterByName from 'components/Board/FilterByName';
import FilterClearAll from 'components/Board/FilterClearAll';
import FilterQuick from 'components/Board/FilterQuick';
import ProjectBreadcrumbs from 'components/Projects/ProjectBreadcrumbs';
import { getProjectLayout } from 'components/Projects/ProjectLayout';

const Backlog: NextPageWithLayout = () => {
  return (
    <>
      <header>
        <ProjectBreadcrumbs />
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <h1>BackLog</h1>
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
        <BackLogList />
      </main>
    </>
  );
};

Backlog.getLayout = getProjectLayout;

export default Backlog;
