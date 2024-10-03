import { Col, Row } from 'antd';

import { NextPageWithLayout } from 'core/types';

import { getMainLayoutWithAuth } from 'components/Main/MainLayout';
import WidgetsList from 'components/Widgets/WidgetsList';

const My: NextPageWithLayout = () => {
  return (
    <section className="container">
      <Row justify="space-between" align="middle" style={{ marginBottom: '10px' }}>
        <Col>
          <h1>My work</h1>
        </Col>
        <Col />
      </Row>
      <WidgetsList />
    </section>
  );
};

My.getLayout = getMainLayoutWithAuth;

export default My;
