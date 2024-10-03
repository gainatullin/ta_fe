import { Button, Space } from 'antd';

import { updateFilters } from 'core/actions';
import { useAppDispatch, useAppSelector } from 'core/hooks';

const FilterQuick = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.session.user);
  const components = useAppSelector(state => state.components.list);
  const filters = useAppSelector(state => state.issues.filters);

  const isMyIssues = Boolean(filters.users.find(userId => userId === user?.id)) && filters.users.length === 1;

  const handleClickMyIssues = () => {
    if (user) {
      const newFilterUsers = !isMyIssues ? [user.id] : [];
      dispatch(updateFilters({ ...filters, users: newFilterUsers }));
    }
  };

  const handleClickComponent = (componentId: number) => {
    const findIndex = filters.components.findIndex(id => id === componentId);
    const newFilterComponents =
      findIndex === -1 ? [...filters.components, componentId] : filters.components.filter(id => id !== componentId);
    dispatch(updateFilters({ ...filters, components: newFilterComponents }));
  };

  return (
    <Space>
      <Button type={isMyIssues ? 'primary' : 'default'} onClick={handleClickMyIssues}>
        My issues
      </Button>
      {components.map(component => (
        <Button
          key={component.id}
          type={Boolean(filters.components.find(id => id === component.id)) ? 'primary' : 'default'}
          onClick={() => handleClickComponent(component.id)}
        >
          {component.name}
        </Button>
      ))}
    </Space>
  );
};

export default FilterQuick;
