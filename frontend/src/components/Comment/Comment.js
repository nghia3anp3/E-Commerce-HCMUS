import React from 'react'
import NoAvatar from '../../img/Comment/No_avatar.png'

class Comment extends React.Component {
    
  state =  {
    replyText: '', 
    showReplyBox: false,
  }

  onChangeContext = (event) => {
    this.setState({
        replyText: event.target.value
    })
  }

  onClickReply = () => {
    this.setState({
        showReplyBox: true
    })
  }

  onClickSave = (id, replyText, addReply) => {
    addReply(id, replyText)
    this.setState({
        showReplyBox: false,
        replyText: ''
    })
  }

  onClickCancel = () => {
    this.setState({
        showReplyBox: false,
        replyText: ''
    })
  }

  render() {
    let {replyText, showReplyBox} = this.state
    let {key, id, avatar, content, children, addReply} = this.props
    if (avatar === undefined) {
      avatar = NoAvatar
    }
    return (
      <div className="flex gap-4 m-4 relative">
        <div className="flex-shrink-0">
          <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
        </div>
        <div>
            <div className="inline-block rounded-lg overflow-hidden">
              {/* ----------------- ID ---------------------------- */}
              <div className="bg-slate-400 px-2 pt-2 rounded-t-lg">
                <h3 className="font-bold text-lg">{id}</h3>
              </div>
              {/* ----------------- Nội dung bình luận ---------------------------- */}
              <div className="bg-slate-400 p-2 rounded-b-lg">
                <div className="text-white">
                      {content}
                </div>
              </div>
            </div>
            {!showReplyBox && (
              <div>
                <button 
                className="p-2 text-blue-500 hover:underline">
                Thích
              </button>
                <button 
                  className="p-2 text-blue-500 hover:underline"
                  onClick={this.onClickReply}>
                  Phản hồi
                </button>
              </div>
            )}
          {showReplyBox && (
            <div className='mt-4'>
              <input
                className="bg-gray-100 rounded border border-gray-400 leading-normal h-20 py-2 px-3 mb-4 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                placeholder="Bình luận"
                type="text"
                value={replyText}
                onChange={(event) => {this.onChangeContext(event)}}
              />
              <div className='flex flex-row justify-start'>
                <button
                  className ='p-2 mr-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out'
                  onClick={() => this.onClickSave(id, replyText, addReply)}
                >
                  Lưu
                </button>
                <button
                  className ='p-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 transition duration-300 ease-in-out'
                  onClick={this.onClickCancel}
                >
              Hủy
            </button>
          </div>
        </div>
      )}
      {children.length > 0 && (
        <ul className="mt-4">
          {children.map((childComment, index) => (
            <li key={index}>
                <Comment
                  key = {key}
                  id={childComment.id}
                  avatar={childComment.avatar} 
                  content={childComment.content}
                  children={childComment.children}
                  addReply={addReply}
                />
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  )
  }
}

export default Comment
