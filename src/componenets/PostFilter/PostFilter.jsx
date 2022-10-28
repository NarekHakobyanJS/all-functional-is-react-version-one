import React from 'react';
import MyInput from '../../UI/MyInput/MyInput';
import MySelect from '../../UI/Select/MySelect';

function PostFilter({filter, setFilter}) {
    return (
        <div>
            <MyInput
                placeholder="Որոնում..."
                value={filter.query}
                onChange={e => setFilter({...filter, query : e.target.value})}
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort =>setFilter({...filter, sort : selectedSort}) }
                defaultValue="Դասավորել ըստ․․․"
                options={[
                    { value: "title", name: "անունի" },
                    { value: "body", name: "նկարագրության" },
                ]}
            />
        </div>
    )
}

export default PostFilter