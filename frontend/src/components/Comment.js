import React from 'react';
import NoAvatar from '../img/Comment/No_avatar.png';
import { AuthContext } from '../context/AuthContext';

class Comments extends React.Component {

  state = {
    replyText: '',
    showReplyBox: false,
    userid: '',
    username: '',
    commentInput: '',
    current_comment_id: 0,
    comments: [],
  };

  componentDidMount() {
    // Check if user is logged in and set username in state
    this.updateUser();
    const { product_comments, product_subcomments } = this.props;
    this.loadComments(product_comments, product_subcomments);
  }

  componentDidUpdate(prevProps) {
    // Check if user login status has changed and update username accordingly
    if (prevProps.authContext.isLoggedIn !== this.props.authContext.isLoggedIn) {
      this.updateUser();
    }
  }

  updateUser() {
    const { authContext } = this.props;
    if (authContext.isLoggedIn) {
      this.setState({ 
        userid: authContext.user.user_id,
        username: authContext.user.account 
      });
    }
  }

  handlePostComment = async () => {
    const { commentInput, userid, username } = this.state;
    const { product_id, type } = this.props;
    const comment_id = Date.now()
    const newComment = this.newComment(comment_id, username, commentInput);

    this.setState(prevState => ({
      comments: [newComment, ...prevState.comments],
      commentInput: '',
    }));

    // Create comment
    try {
      const response = await fetch('http://localhost:8000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: product_id,
          type: type,
          comment_id: comment_id,  
          title: "",  
          content: commentInput,
          thank_count: 0,  
          customer_id: userid,
          rating: 0,  
          created_at: Date.now(),
          customer_name: username,
          purchased_at: Date.now(), 
          sub_comments_id: 0
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Comment posted successfully:', result.content);
      } else {
        console.error('Error posting comment:', result.message);
        this.setState({ error: result.message });
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }

    // AI auto reply
    try {
      const response1 = await fetch('http://localhost:8000/api/comments/AI_auto_comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comments: commentInput
        })
      });
      const result1 = await response1.json();
      console.log(result1)
      this.setState({
        replyText: result1.message,
        current_comment_id: comment_id,
        username: 'Admin',
      }, () => {
        this.onClickSave(true);
      });
    }catch (error) {
      console.error('Error posting comment:', error);
    }
  };


  onChangeComment = (event) => {
    this.setState({
      commentInput: event.target.value,
    });
  };

  newComment = (comment_id, username, content) => {
    return {
      comment_id: comment_id,
      customer_name: username, 
      content: content,
      subcomment: [],
    };
  };

  insertComment = (comments, parentId, comment_id, username, text) => {
  
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.comment_id === parentId) {
        comment.subcomment.unshift(this.newComment(comment_id, username, text));
      }
    }

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      this.insertComment(comment.subcomment, parentId, comment_id, username, text);
    }
  };


  addReply = (parentId, replyText) => {
    let commentsWithNewReply = [...this.state.comments];
    const comment_id = Date.now()
    this.insertComment(commentsWithNewReply, parentId, comment_id, this.state.username, replyText);
    this.setState({
      comments: commentsWithNewReply,
    });
  };

  loadComments = (product_comments, product_subcomments) => {
    let oldComments = [...this.state.comments];
    let oldSubComments = [];

    for (let i = 0; i < product_subcomments.length; i++) {
      let subcomment = product_subcomments[i];
      oldSubComments.push(this.newComment(subcomment.sub_comment_id, subcomment.fullname, subcomment.content));
    }

    for (let i = 0; i < product_comments.length; i++) {
      let comment = product_comments[i];
      let _comment = this.newComment(comment.comment_id, comment.customer_name, comment.content);
      for (let j = 0; j < product_subcomments.length; j++) {
        let subcomment = product_subcomments[j];
        if (subcomment.comment_id === comment.comment_id) {
          _comment.subcomment.push(oldSubComments[j]);
        }
      }
      oldComments.push(_comment);
    }
    this.setState({ comments: oldComments });
  };

  onChangeContext = (event) => {
    this.setState({
      replyText: event.target.value,
    });
  };

  onClickReply = (comment_id) => {
    this.setState((prevState) => ({
      showReplyBox: {
        ...prevState.showReplyBox,
        [comment_id]: !prevState.showReplyBox[comment_id],
      },
    }));
    this.setState({current_comment_id: comment_id})
  };

  
  onClickSave = async () => {
    
    const {replyText, userid, username, current_comment_id} = this.state;
    const {product_id, type } = this.props;
    let comment_id = current_comment_id
    this.addReply(comment_id, replyText);
    this.setState((prevState) => ({
      showReplyBox: {
        ...prevState.showReplyBox,
        [comment_id]: false,
      },
      replyText: '',
    }));
    try {
      const response = await fetch("http://localhost:8000/api/subcomments",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: product_id,
          type: type,
          sub_comment_id: Date.now(),
          comment_id: comment_id,
          commentator: "customer",
          customer_id: userid,
          fullname: username,
          avatar_url: "",
          content: replyText,
          score: 0,
          created_at: Date.now(),
          badge: "",
          status: 2,
          is_reported: false,
        })
      })
      const result = await response.json();
      this.updateUser()
      if (response.ok) {
        console.log('Subcomment posted successfully:', result);
      } else {
        console.error('Error posting subcomment:', result.message);
      }

    } catch (error) {
      console.error('Error posting sub comment: ', error)
    }
  };

  onClickCancel = (comment_id) => {
    this.setState((prevState) => ({
      showReplyBox: {
        ...prevState.showReplyBox,
        [comment_id]: false,
      },
      replyText: '',
    }));
    this.setState({current_comment_id: 0})
  };

  handleDeleteMainComment = async (comment_id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/comments/${comment_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        this.setState((prevState) => ({
          comments: prevState.comments.filter((comment) => comment.comment_id !== comment_id),
        }));
      } else {
        const result = await response.json();
        console.error('Error deleting comment:', result.message);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  handleDeleteSubComment = async (sub_comment_id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/subcomments/${sub_comment_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        this.setState((prevState) => ({
          comments: this.removeSubcomment(prevState.comments, sub_comment_id),
        }));
      } else {
        const result = await response.json();
        console.error('Error deleting subcomment:', result.message);
      }
    } catch (error) {
      console.error('Error deleting subcomment:', error);
    }
  };

  removeSubcomment = (comments, sub_comment_id) => {
    for (let comment of comments) {
      comment.subcomment = comment.subcomment.filter(subcomment => subcomment.comment_id !== sub_comment_id);
      comment.subcomment = this.removeSubcomment(comment.subcomment, sub_comment_id);
    }
    return comments;
  };

  renderComment = (comment, is_sub_comment = false) => {
    const { comment_id, customer_name, avatar, content, subcomment } = comment;
    const { replyText, showReplyBox, username} = this.state;
    return (
      <div className="flex gap-4 m-4 relative" key={customer_name}>
        <div className="flex-shrink-0">
          <img src={avatar || NoAvatar} alt="Avatar" className="w-12 h-12 rounded-full" />
        </div>
        <div>
          <div className="inline-block rounded-lg overflow-hidden">
            <div className="bg-slate-400 px-2 pt-2 rounded-t-lg">
              <h3 className="font-bold text-lg">{customer_name}</h3>
            </div>
            <div className="bg-slate-400 p-2 rounded-b-lg">
              <div className="text-white">{content}</div>
            </div>
          </div>
          {!showReplyBox[comment_id] && (
            <div>
              <button className="p-2 text-blue-500 hover:underline" onClick={() => this.onClickReply(comment_id)}>
                Phản hồi
              </button>
              {customer_name === username && !is_sub_comment  && (
                <button className="p-2 text-red-500 hover:underline" onClick={() => this.handleDeleteMainComment(comment_id)}>
                  Xóa
                </button>
              )}
              {customer_name === username && is_sub_comment  && (
                <button className="p-2 text-red-500 hover:underline" onClick={() => this.handleDeleteSubComment(comment_id)}>
                  Xóa
                </button>
              )}

            </div>
          )}
          {showReplyBox[comment_id] && (
            <div className="mt-4">
              <input
                className="bg-gray-100 rounded border border-gray-400 leading-normal h-20 py-2 px-3 mb-4 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                placeholder="Comment"
                type="text"
                value={replyText}
                onChange={this.onChangeContext}
              />
              <div className="flex flex-row justify-start">
                <button
                  className="p-2 mr-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                  onClick={this.onClickSave}
                >
                  Lưu
                </button>
                <button
                  className="p-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 transition duration-300 ease-in-out"
                  onClick={() => this.onClickCancel(comment_id)}
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
          {subcomment.length > 0 && (
            <ul className="mt-4">
              {subcomment.map((childComment) => (
                <li key={childComment.comment_id}>
                  {this.renderComment(childComment, true)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };
  

  render() {
    let { commentInput, comments } = this.state;
    return (
      <div className="p-4 m-4 bg-gray-200">
        <h3 className="font-semibold p-1">Bình luận</h3>
        <ul>
          {comments.map((comment) => this.renderComment(comment))}
        </ul>
        <div className="flex flex-col justify-start ml-6">
          <input
            className="w-2/3 bg-gray-100 rounded border border-gray-400 leading-normal h-20 mb-6 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
            placeholder="Comment"
            value={commentInput}
            onChange={this.onChangeComment}
          />
          <input
            type="submit"
            className="w-32 py-1.5 rounded-md text-white bg-indigo-500 text-lg"
            value="Bình luận"
            onClick={this.handlePostComment}
          />
        </div>
      </div>
    );
  }
}

export default (props) => (
  <AuthContext.Consumer>
    {(authContext) => <Comments {...props} authContext={authContext} />}
  </AuthContext.Consumer>
);
