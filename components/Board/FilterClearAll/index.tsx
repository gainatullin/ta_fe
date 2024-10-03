import { Button, Space } from 'antd';

import { updateFilters } from 'core/actions';
import { useAppDispatch, useAppSelector } from 'core/hooks';
import { isFilteredSelector } from 'core/store';

const FilterClearAll = () => {
  const dispatch = useAppDispatch();
  const isFiltered = useAppSelector(isFilteredSelector);

  const handleClickClearAll = () => {
    dispatch(updateFilters({ name: '', users: [], components: [] }));
  };

  if (!isFiltered) return null;

  return (
    <Space>
      <Button type="link" onClick={handleClickClearAll}>
        Clear all
      </Button>
    </Space>
  );
};

export default FilterClearAll;
