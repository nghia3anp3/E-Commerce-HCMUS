import React from 'react';
import NoAvatar from '../img/Comment/No_avatar.png';
import { AuthContext } from '../context/AuthContext';

class Comments extends React.Component {
  state = {
    replyText: '',
    showReplyBox: false,
    userid: '',
    commentInput: '',
    comments: [],
  };

  componentDidMount() {
    // Check if user is logged in and set userid in state
    this.updateUserId();
    const { product_comments, product_subcomments } = this.props;
    this.loadComments(product_comments, product_subcomments);
  }

  componentDidUpdate(prevProps) {
    // Check if user login status has changed and update userid accordingly
    if (prevProps.authContext.isLoggedIn !== this.props.authContext.isLoggedIn) {
      this.updateUserId();
    }
  }

  updateUserId() {
    const { authContext } = this.props;
    if (authContext.isLoggedIn) {
      this.setState({ userid: authContext.user.account });
    }
  }

  onClickPostComment = () => {
    this.setState({
      comments: [this.newComment(this.state.userid, this.state.commentInput), ...this.state.comments],
      commentInput: '',
    });
  };

  onChangeComment = (event) => {
    this.setState({
      commentInput: event.target.value,
    });
  };

  newComment = (userid, content) => {
    return {
      id: userid, // Nên là id comment
      content: content,
      subcomment: [],
    };
  };

  insertComment = (comments, parentId, text, userid) => {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === parentId) {
        comment.subcomment.unshift(this.newComment(userid, text));
      }
    }

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      this.insertComment(comment.subcomment, parentId, text, userid);
    }
  };

  addReply = (commentId, replyText) => {
    let commentsWithNewReply = [...this.state.comments];
    this.insertComment(commentsWithNewReply, commentId, replyText, this.state.userid);
    this.setState({
      comments: commentsWithNewReply,
    });
  };

  loadComments = (product_comments, product_subcomments) => {
    let oldComments = [...this.state.comments];
    let oldSubComments = [];

    for (let i = 0; i < product_subcomments.length; i++) {
      let subcomment = product_subcomments[i];
      oldSubComments.push(this.newComment(subcomment.customer_name, subcomment.content));
    }

    for (let i = 0; i < product_comments.length; i++) {
      let comment = product_comments[i];
      let _comment = this.newComment(comment.customer_name, comment.content);
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

  onClickReply = (commentId) => {
    this.setState((prevState) => ({
      showReplyBox: {
        ...prevState.showReplyBox,
        [commentId]: !prevState.showReplyBox[commentId],
      },
    }));
  };

  onClickSave = (commentId, replyText) => {
    this.addReply(commentId, replyText);
    this.setState((prevState) => ({
      showReplyBox: {
        ...prevState.showReplyBox,
        [commentId]: false,
      },
      replyText: '',
    }));
  };

  onClickCancel = (commentId) => {
    this.setState((prevState) => ({
      showReplyBox: {
        ...prevState.showReplyBox,
        [commentId]: false,
      },
      replyText: '',
    }));
  };

  renderComment = (comment) => {
    const { id, avatar, content, subcomment } = comment;
    const { replyText, showReplyBox } = this.state;

    return (
      <div className="flex gap-4 m-4 relative" key={id}>
        <div className="flex-shrink-0">
          <img src={avatar || NoAvatar} alt="Avatar" className="w-12 h-12 rounded-full" />
        </div>
        <div>
          <div className="inline-block rounded-lg overflow-hidden">
            <div className="bg-slate-400 px-2 pt-2 rounded-t-lg">
              <h3 className="font-bold text-lg">{id}</h3>
            </div>
            <div className="bg-slate-400 p-2 rounded-b-lg">
              <div className="text-white">{content}</div>
            </div>
          </div>
          {!showReplyBox[id] && (
            <div>
              <button className="p-2 text-blue-500 hover:underline">Thích</button>
              <button className="p-2 text-blue-500 hover:underline" onClick={() => this.onClickReply(id)}>
                Phản hồi
              </button>
            </div>
          )}
          {showReplyBox[id] && (
            <div className="mt-4">
              <input
                className="bg-gray-100 rounded border border-gray-400 leading-normal h-20 py-2 px-3 mb-4 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                placeholder="Bình luận"
                type="text"
                value={replyText}
                onChange={this.onChangeContext}
              />
              <div className="flex flex-row justify-start">
                <button
                  className="p-2 mr-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                  onClick={() => this.onClickSave(id, replyText)}
                >
                  Lưu
                </button>
                <button
                  className="p-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 transition duration-300 ease-in-out"
                  onClick={() => this.onClickCancel(id)}
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
          {subcomment.length > 0 && (
            <ul className="mt-4">
              {subcomment.map((childComment) => (
                <li key={childComment.id}>{this.renderComment(childComment)}</li>
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
      <AuthContext.Consumer>
        {(authContext) => (
          <>
            {authContext.isLoggedIn ? (
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
                    onClick={this.onClickPostComment}
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 m-4 bg-red-200">
                <h3 className="font-semibold p-1">Error: Not Logged In</h3>
                <p>Please log in to participate in the discussion.</p>
              </div>
            )}
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default (props) => (
  <AuthContext.Consumer>
    {(authContext) => <Comments {...props} authContext={authContext} />}
  </AuthContext.Consumer>
);
