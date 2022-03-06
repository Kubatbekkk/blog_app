import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import ReactPaginate from "react-paginate";
import { ClapButton } from "@lyket/react";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [pageNumber, setPageNumber] = useState(0);

  const postsPerPage = 3;
  const pagesVisited = pageNumber * postsPerPage;

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [postsCollectionRef]);

  const [value, setValue] = useState('');

  const filteredPosts = postLists.filter(post => {
    return post.title.toLowerCase().includes(value.toLowerCase())
  })

  // const deletePost = async 
  async function deletePost(id) {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  const displayPosts = filteredPosts.slice(pagesVisited, pagesVisited + postsPerPage)
    .map(post => {
    return (
      <div className="post" key={post.id}>
        <div className="postHeader">
          <div className="title">
            <h1> {post.title}</h1>
          </div>
          <div className="deletePost">
            {isAuth && post.author.id === auth.currentUser.uid && (
              <button
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                {" "}
                x
              </button>
            )}
          </div>
        </div>
        <div className="postTextContainer"> {post.postText} </div>
        <div className="postAuthor"><h6>@{post.author.name}</h6><ClapButton id={post.id}/></div>
      </div>
    );
  })
  const pageCount = Math.ceil(postLists.length / postsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <>
    <div className="form">
      <form className="search__form">
        <input 
          type="text"
          placeholder="Search by Title..."
          className="search__input"
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
    <div className="homePage"> 
      {displayPosts}
      <ReactPaginate 
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
    </>
  );
};

export default Home;