import React from 'react'
import Comment from './Comment';

class Comments extends React.Component {
    state = {
        commentInput: '',
        comments: [
            {id: 'User1', display: 'LHH', children: []},
            {id: 'User2', display: '1323',  children: [{id: 'User3', display: '924', children: []}]}
        ]
    }
    
    // Comment mới
    newComment = (context) => {
        return {
          id: new Date().getTime(),
          display: context, 
          children: []
        };
    }

    // Click vào Post Comment
    onclickPostComment = () => {
        this.setState({
            comments: [this.newComment(this.state.commentInput), ...this.state.comments],
            commentInput: ''
        })
      }
    
    // Thay đổi chữ trong nội dung ô comment
    onChangeComment = (event) => {
        this.setState({
            commentInput: event.target.value
        })
      }

    // Thêm comment mới vào list comments
    insertComment = (comments, parentId, text) => {
        for (let i = 0; i < comments.length; i++) {
          let comment = comments[i];
          if (comment.id === parentId) {
            comment.children.unshift(this.newComment(text));
          }
        }
    
        for (let i = 0; i < comments.length; i++) {
          let comment = comments[i];
          this.insertComment(comment.children, parentId, text);
        }
      }

    // Add Reply
    addReply = (commentId, replyText) => {
        let commentsWithNewReply = [...this.state.comments];
        this.insertComment(commentsWithNewReply, commentId, replyText);
        this.setState({
            comments: commentsWithNewReply
        })
      }

    render () {
        let {commentInput, comments} = this.state
        return(
            <div className='m-8'>
                <h3 className="font-semibold p-1">Discussion</h3>
                <ul>
                    {comments.map((comment) => (
                        <Comment id = {comment.id} display={comment.display} children = {comment.children} addReply={this.addReply} />
                    ))}
                </ul>
                <div className="flex flex-col justify-start ml-6">
                <input
                className="w-2/3 bg-gray-100 rounded border border-gray-400 leading-normal h-20 mb-6 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                placeholder="Comment" value={commentInput} onChange={(event) => this.onChangeComment(event)}>
                </input>
             <input type="submit" className="w-32 py-1.5 rounded-md text-white bg-indigo-500 text-lg" value='Post Comment' onClick={this.onclickPostComment} />
            </div>
            </div>
        )
    }
}

export default Comments