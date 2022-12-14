import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from '../PostItem/PostItem';

function PostList({ posts, title, remove }) {
    if (!posts.length) {
        return (
            <h1>Նման գրառում գոյություն չունի</h1>
        )
    }
    return (

        <div>
            <h1 style={{ textAlign: "center" }}>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >

                        <PostItem
                            number={index + 1}
                            post={post}
                            key={post.id}
                            remove={remove}
                        />
                    </CSSTransition>
                )}

            </TransitionGroup>
        </div>
    )
}

export default PostList