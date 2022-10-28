import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './componenets/Header/Header';
import PostFilter from './componenets/PostFilter/PostFilter';
import PostForm from './componenets/PostForm/PostForm';
import PostList from './componenets/PostList/PostList';
import { usePosts } from './hooks/usePosts';
import MyButton from './UI/MyButton/MyButton';
import MyModal from './UI/MyModal/MyModal';
import PostService from './API/PostService';
import Loader from './UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from './utils/pages';


function App() {
  //posts state
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: "", query: "" })
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  let pageArray = getPagesArray(totalPages)
  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  const changePage = (page) => {
    setPage(page)
  }
  function createPost(newPost) {
    setPosts([...posts, newPost])
    setModal(false)
  }

  function removePost(post) {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  useEffect(() => {
    fetchPosts()
  }, [page])


  return (
    <div className="app">
      <Header />
      <div>
        <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
          create Post
        </MyButton>
        <MyModal
          visible={modal}
          setVisible={setModal}
        >
          <PostForm create={createPost} />
        </MyModal>
        <hr style={{ margin: "15px 0" }} />
        <PostFilter filter={filter}
          setFilter={setFilter} />
        {
          postError && <h1>սխալ... {postError}</h1>
        }
        {isPostLoading ? <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}> <Loader /> </div> : <PostList remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Գրառումների Ցուցակ" />
        }
        <div style={{ marginTop: "30px" }}>
          {

            pageArray.map(p =>
              <MyButton onClick={() => changePage(p)}>{p}</MyButton>

            )

          }

        </div>
      </div>
    </div>
  );
}

export default App;
