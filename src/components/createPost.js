import React, { useState } from "react";

const CreatePost = () => {
  const [postStatus, setPostStatus] = useState("");

  const handleClose = () => {
    window.location.reload(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    let now = new Date().toUTCString();
    let postData = {
      username: event.target.username.value,
      title: event.target.title.value,
      imageUrl: event.target.imageUrl.value,
      content: event.target.content.value,
      date: now
    };
    await fetch('https://media_posts_router_worker.vnagar3.workers.dev/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      }).then(response => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText)
        }
      }).then(responseJson => {
        setPostStatus(responseJson);
      }).catch(error => {
        setPostStatus("Post creation failed!");
        console.log(error);
      });
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        <div className="container">
	        <div className="row">
	          <div className="col-md-8 col-md-offset-2">
    		      <h1>New Post</h1>
              <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username <span className="require">*</span></label>
                <input type="text" className="form-control" name="username" defaultValue="" />
              </div>
    		      <div className="form-group">
    		        <label>Title <span className="require">*</span></label>
    		        <input type="text" className="form-control" name="title" defaultValue="" />
    		      </div>
              <div className="form-group">
    		        <label>Image URL</label>
    		        <input type="text" className="form-control" name="imageUrl" defaultValue="" />
    		      </div>
    		      <div className="form-group">
    		        <label>Content</label>
    		        <textarea rows="5" className="form-control" name="content" defaultValue="" ></textarea>
    		      </div>
    		      <div className="form-group">
    		        <p><span className="require">*</span> - Required Fields</p>
    		      </div>
    		      <div className="form-group">
    		        <button type="submit" className="btn btn-primary">Create</button>
                <span className="text-muted font-weight-bold text-center">&nbsp;&nbsp;&nbsp;&nbsp;{postStatus}</span>
    		      </div>
              </form>
		        </div>
	        </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
