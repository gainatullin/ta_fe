import { Button, Col, Row } from 'antd';

import { useAppDispatch, useAppSelector } from 'core/hooks';
import { openModal } from 'core/store';
import { NextPageWithLayout } from 'core/types';

import ComponentsList from 'components/Components/ComponentsList';
import { getProjectLayout } from 'components/Projects/ProjectLayout';

const Components: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(state => state.projects.current);

  const handleClickCreate = () => {
    dispatch(openModal({ name: 'Create component', type: 'createComponent', values: { projectId: project?.id } }));
  };

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <h1>Components</h1>
        </Col>
        <Col>
          <Button type="primary" onClick={handleClickCreate}>
            Create
          </Button>
        </Col>
      </Row>
      <ComponentsList />
    </div>
  );
};

Components.getLayout = getProjectLayout;

export default Components;
