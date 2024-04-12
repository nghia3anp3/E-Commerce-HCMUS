import React from 'react'

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
    let {id, display, children, addReply} = this.props
    return (
        <div className="container gap-5 m-3 border rounded-md p-4">
              <h3 className="font-bold text-lg">
                {id}
              </h3>
              <div class="border border-gray-300 rounded-lg shadow-md max-w-md p-4 bg-gray-100">
                <p class="text-gray-600">
                    {/* Replace {display} with the actual comment content */}
                    {display}
                </p>
              </div>
              {!showReplyBox && (
                <button 
                  className="flex justify-end text-blue-500 mt-2 hover:underline"
                  onClick={this.onClickReply}
                >
                  Reply
                </button>
              )}
              {showReplyBox && (
                <div className='flex flex-col mt-4'>
                  <input
                    className="w-1/2 bg-gray-100 rounded border border-gray-400 leading-normal h-20 py-2 px-3 mb-4 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                    placeholder="Comment"
                    type="text"
                    value={replyText}
                    onChange={(event) => {this.onChangeContext(event)}}
                  />
                  <div className='flex flex-row justify-start'>
                    <button
                      className ='p-2 mr-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out'
                      onClick={() => this.onClickSave(id, replyText, addReply)}
                    >
                      Save
                    </button>
                    <button
                      className ='p-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 transition duration-300 ease-in-out'
                      onClick={this.onClickCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {children.length > 0 && (
                <ul className="mt-4">
                  {children.map((childComment, index) => (
                    <li key={index}>
                      <Comment
                        id={childComment.id}
                        display={childComment.display}
                        children={childComment.children}
                        addReply={addReply}
                      />
                    </li>
                  ))}
                </ul>
              )}
        </div>
      )
  }
}

export default Comment
