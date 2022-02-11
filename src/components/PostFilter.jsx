import React from 'react';
import MySelect from './UI/select/MySelect';
import MyInput from './UI/input/MyInput';
const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput
        placeholder='search...'
        value={filter.value}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue='Sort by'
        options={[
          { value: 'title', name: 'by name' },
          { value: 'body', name: 'by body' },
        ]}
      />
    </div>
  );
};

export default PostFilter;
