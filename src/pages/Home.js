import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import ReactPaginate from "react-paginate";

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

  // const deletePost = async 
  async function deletePost(id) {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  const displayPosts = postLists.slice(pagesVisited, pagesVisited + postsPerPage).map(post => {
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
        <h3>@{post.author.name}</h3>
      </div>
    );
  })
  const pageCount = Math.ceil(postLists.length / postsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <div className="homePage"> 
      {displayPosts}
      <ReactPaginate 
        previousLabel={"Previous"}
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
  );
};

export default Home;