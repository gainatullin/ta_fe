import { Col, Collapse, Row } from 'antd';

import WidgetAssignee from 'components/Widgets/WidgetAssignee';
import WidgetProjects from 'components/Widgets/WidgetProjects';
import WidgetReporter from 'components/Widgets/WidgetReporter';

import styles from './WidgetsList.module.scss';

const { Panel } = Collapse;

const WidgetsList = () => {
  return (
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Collapse bordered={false} expandIconPosition="right" className={styles.collapse} defaultActiveKey={1}>
          <Panel header={<h3>My projects</h3>} key={1}>
            <WidgetProjects />
          </Panel>
        </Collapse>
        <Collapse bordered={false} expandIconPosition="right" className={styles.collapse} defaultActiveKey={1}>
          <Panel header={<h3>Assigned to me</h3>} key={1}>
            <WidgetAssignee />
          </Panel>
        </Collapse>
      </Col>
      <Col xs={24} md={12}>
        <Collapse bordered={false} expandIconPosition="right" className={styles.collapse} defaultActiveKey={1}>
          <Panel header={<h3>I'm a Reporter</h3>} key={1}>
            <WidgetReporter />
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default WidgetsList;
