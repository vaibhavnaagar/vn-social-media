import React, { useEffect, useState } from "react";
import CreatePost from './createPost';

const Hearts = ({postId, postHearts}) => {
  const id = useState(postId);
  const [like, setLikeValue] = useState(1);
  const [hearts, setHearts] = useState(postHearts);

  const handleClick = async event => {
    event.preventDefault();
    await fetch('https://media_posts_router_worker.vnagar3.workers.dev/posts/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id[0], like: like })
      }).then(response => {
        console.log(response)
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText)
        }
      }).then(postResp => {
        setHearts(postResp.hearts);
        setLikeValue((like === 1) ? -1 : 1);
      }).catch(error => {
        console.log(error)
      });
  };

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <button onClick={handleClick} className="text-danger mr-2"><span><i className="fa fa-heart"></i></span></button>
          <span className="text-muted font-weight-bold">{hearts}</span>
        </div>
      </div>
    </div>
  );
};


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const togglePostPopup = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch(
        "https://media_posts_router_worker.vnagar3.workers.dev/posts"
      );
      const postsResp = await resp.json();
      setPosts(postsResp);
    };

    getPosts();
  }, []);

  return (
    <section className="main-content">
		<div className="container">
			<h1 className="text-center text-uppercase">Social Media Posts</h1>
			<br/>
      <div className="text-center">
        <input type="button" className="btn btn-primary" value="Create New Post" onClick={togglePostPopup} />
      </div>
      {isOpen && <CreatePost />}
			<br/>
      {posts.map((post) => (
        <div key={post.id} className="row">
  				<div className="col-sm-6 offset-sm-3">
  					<div className="post-block">
  						<div className="d-flex justify-content-between">
  							<div className="d-flex mb-3">
  								<div className="mr-2">
  									<a href="https://picsum.photos" className="text-dark"><img src={"https://picsum.photos/200?" + post.username} alt="User" className="author-img"/></a>
  								</div>
  								<div>
  									<h5 className="mb-0"><a href="#!" className="text-dark">{post.username}</a></h5>
  									<p className="mb-0 text-muted">{new Date(post.date).toLocaleString()}</p>
  								</div>
  							</div>
  						</div>
  						<div className="post-block__content mb-2">
  							<p>{post.content}</p>
  							<img src={post.imageUrl} alt=""/>
  						</div>
  						<Hearts postId={post.id} postHearts={post.hearts} />
  					</div>
  				</div>
  			</div>
      ))}
    </div>
  	</section>
  );
};

export default Posts;
