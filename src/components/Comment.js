import React from 'react'

class Comment extends React.Component {
    
  state =  {
    isShowReply : false
  }

  onClickReply = () => {
    this.setState({
        isShowReply: true
    })
  }

  onClickHideComment = () => {
    this.setState({
        isShowReply: false
    })
  }

  render() {
    let {isShowReply} = this.state
    return (
        <div className="w-full bg-white rounded-lg border p-1 md:p-3 m-10">
          <h3 className="font-semibold p-1">Discussion</h3>
          <div className="flex flex-col gap-5 m-3">
            {/* Comment Container */}
            <div>
              <div className="flex w-full justify-between border rounded-md">
                <div className="p-3">
                  <div className="flex gap-3 items-center">
                    <img src="https://avatars.githubusercontent.com/u/22263436?v=4" className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400 shadow-emerald-400" alt="User Avatar" />
                    <h3 className="font-bold">
                      User 1
                      <br />
                      <span className="text-sm text-gray-400 font-normal">Level 1</span>
                    </h3>
                  </div>
                  <p className="text-gray-600 mt-2">
                    This is sample comment
                  </p>
                  <button className="text-right text-blue-500" onClick={() => this.onClickReply()}>Reply</button>
                  {isShowReply && 
                <div>
                    <div className="w-full px-3 mb-2 mt-6">
                    <textarea
                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                    name="body" placeholder="Comment" required></textarea>
                    </div>
                    <div className="w-full flex justify-end px-3 my-3">
                        <input type="submit" className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 text-lg" value='Post Comment' />
                    </div>(
                    <button onClick={() => this.onClickHideComment()}>Hide</button>
                </div>
                }
                </div>
                <div className="flex flex-col items-end gap-3 pr-3 py-3">
                  <div>
                    <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  </div>
                  <div>
                    <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Reply Container  */}
              <div className="text-gray-300 font-bold pl-14">|</div>
              <div className="flex justify-between border ml-5 rounded-md">
                <div className="p-3">
                  <div className="flex gap-3 items-center">
                    <img src="https://avatars.githubusercontent.com/u/22263436?v=4" className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400" alt="User Avatar" />
                    <h3 className="font-bold">
                      User 2
                      <br />
                      <span className="text-sm text-gray-400 font-normal">Level 1</span>
                    </h3>
                  </div>
                  <p className="text-gray-600 mt-2">
                    This is sample comment
                  </p>
                </div>
                <div className="flex flex-col gap-3 pr-3 py-3">
                  <div>
                    <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  </div>
                  <div>
                    <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* END Reply Container  */}
            </div>
            {/* END Comment Container  */}
            {/* Add more comments and replies here */}
          </div>
          <div className="w-full px-3 mb-2 mt-6">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
              name="body" placeholder="Comment" required></textarea>
          </div>
          <div className="w-full flex justify-end px-3 my-3">
            <input type="submit" className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 text-lg" value='Post Comment' />
          </div>
        </div>
      )
  }
}

export default Comment