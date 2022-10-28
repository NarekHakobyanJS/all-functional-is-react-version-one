import React from 'react'
import MyButton from '../../UI/MyButton/MyButton'

function PostItem({post, number, remove }) {
    return (
        <div className='post'>
            <div className='post-content'>
                <strong>{post.id}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className='post-btn'>
                <MyButton onClick={() => remove(post)}>delete</MyButton>
            </div>
        </div>
    )
}

export default PostItem