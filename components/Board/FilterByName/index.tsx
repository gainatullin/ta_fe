import { useEffect, useState } from 'react';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import { updateFilters } from 'core/actions';
import { useAppDispatch, useAppSelector } from 'core/hooks';

const FilterByName = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.issues.filters);
  const [value, setValue] = useState<string>(filters.name);

  useEffect(() => {
    if (filters.name === '') {
      setValue('');
    }
  }, [filters.name]);

  const handleSearch = () => {
    filters.name.toLowerCase() !== value.toLowerCase() &&
      dispatch(updateFilters({ ...filters, name: value.toLowerCase() }));
  };

  const handleClear = () => {
    setValue('');
    dispatch(updateFilters({ ...filters, name: '' }));
  };

  return (
    <Input
      value={value}
      placeholder="search ..."
      onChange={e => setValue(e.target.value)}
      onPressEnter={handleSearch}
      style={{ width: '160px' }}
      suffix={
        <>
          {value.length > 0 && <ClearOutlined onClick={handleClear} />}
          <SearchOutlined onClick={handleSearch} />
        </>
      }
    />
  );
};

export default FilterByName;
