import React from 'react';
import Comment from './Comment';
import Cat1 from '../../img/Comment/cat1.jpg';
import Cat2 from '../../img/Comment/cat2.jpg';
import { AuthContext } from '../../context/AuthContext';

class Comments extends React.Component {
    state = {
        userid: '', // Initialize userid
        commentInput: '',
        comments: [
            { id: 'User1', avatar: Cat1, display: 'LHH', children: [] },
            { id: 'User2', avatar: Cat2, display: '1323', children: [{ id: 'User3', avatar: Cat1, display: '924', children: [] }] }
        ]
    };

    componentDidMount() {
        // Check if user is logged in and set userid in state
        this.updateUserId();
    }

    componentDidUpdate(prevProps, prevState) {
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

    // Click vào Post Comment
    onclickPostComment = () => {
        this.setState({
            comments: [this.newComment(this.state.userid, this.state.commentInput), ...this.state.comments],
            commentInput: ''
        });
    };

    // Thay đổi chữ trong nội dung ô comment
    onChangeComment = (event) => {
        this.setState({
            commentInput: event.target.value
        });
    };

    // Comment mới
    newComment = (userid, context) => {
        return {
            id: userid,
            display: context,
            children: []
        };
    };

    // Thêm comment mới vào list comments
    insertComment = (comments, parentId, text, userid) => {
        for (let i = 0; i < comments.length; i++) {
            let comment = comments[i];
            if (comment.id === parentId) {
                comment.children.unshift(this.newComment(userid, text));
            }
        }

        for (let i = 0; i < comments.length; i++) {
            let comment = comments[i];
            this.insertComment(comment.children, parentId, text, userid);
        }
    };

    // Add Reply
    addReply = (commentId, replyText) => {
        let commentsWithNewReply = [...this.state.comments];
        this.insertComment(commentsWithNewReply, commentId, replyText, this.state.userid);
        this.setState({
            comments: commentsWithNewReply
        });
    };

    render() {
        let { commentInput, comments } = this.state;
        return (
            <AuthContext.Consumer>
                {authContext => (
                    <>
                        {authContext.isLoggedIn ? (
                            <div className='p-4 m-4 bg-gray-200'>
                                <h3 className="font-semibold p-1">Discussion</h3>
                                <ul>
                                    {comments.map((comment) => (
                                        <Comment key={comment.id} id={comment.id} avatar={comment.avatar} display={comment.display} children={comment.children} addReply={this.addReply} />
                                    ))}
                                </ul>
                                <div className="flex flex-col justify-start ml-6">
                                    <input
                                        className="w-2/3 bg-gray-100 rounded border border-gray-400 leading-normal h-20 mb-6 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                                        placeholder="Comment" value={commentInput} onChange={(event) => this.onChangeComment(event)}
                                    />
                                    <input type="submit" className="w-32 py-1.5 rounded-md text-white bg-indigo-500 text-lg" value='Bình luận' onClick={this.onclickPostComment} />
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
        {authContext => <Comments {...props} authContext={authContext} />}
    </AuthContext.Consumer>
);
