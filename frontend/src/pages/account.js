import React, { Component } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

class Account extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
        isEditingEmail: false,
        isEditingPhone: false,
        editedEmail: '',
        editedPhone: ''
    };
  }

  handleEditClick = (type) => {
    const { user } = this.context;
    if (type === 'email') {
      this.setState({
        isEditingEmail: true,
        editedEmail: user.email
      });
    } else if (type === 'phone') {
      this.setState({
        isEditingPhone: true,
        editedPhone: user.phone
      });
    }
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSaveClick = (type) => {
    if (type === 'email') {
      console.log("New email:", this.state.editedEmail);
      // const { updateUserEmail } = this.context;
      // updateUserEmail(this.state.editedEmail);
      this.setState({
        isEditingEmail: false
      });
    } else if (type === 'phone') {
      console.log("New phone:", this.state.editedPhone);
      // const { updateUserPhone } = this.context;
      // updateUserPhone(this.state.editedPhone);
      this.setState({
        isEditingPhone: false
      });
    }
  };

  render() {
    const { isLoggedIn, user } = this.context;
    const { isEditingEmail, editedEmail } = this.state;

    return (
      <section className='py-20'>
        <div className='container mx-auto p-12'>
          <div className="max-w-lg mx-auto mt-8">
            {isLoggedIn ? (
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold mb-4">Welcome, {user.account}</h1>
                <p className="text-gray-700 mb-4">Quản lý hồ sơ của bạn</p>

                <div className="mb-4">
                  <p className="text-gray-700"><strong>Account:</strong> {user.account}</p>
                </div>
                <div className="mb-4 flex flex-row gap-2">
                  <p className="text-gray-700"><strong>Password:</strong> *********</p>
                  <Link to="/changePassword" className="text-blue-300 underline">Change password</Link>
                </div>
                <div className="mb-4 flex flex-row gap-2">
                  <p className="text-gray-700"><strong>Email:</strong></p>
                  {isEditingEmail ? (
                    <>
                      <input
                        type="text"
                        name="editedEmail"
                        value={editedEmail}
                        onChange={this.handleInputChange}
                        className="border rounded px-2 py-1 mr-2"
                        placeholder="Enter new gmail"
                      />
                      <button
                        onClick={() => this.handleSaveClick('email')}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Submit
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-700">{user.email}</p>
                      <button
                        onClick={() => this.handleEditClick('email')}
                        className="text-blue-300 underline"
                      >
                        Change Email
                      </button>
                    </>
                  )}
                </div>
                <div className="mb-4 flex flex-row gap-2">
                  <p className="text-gray-700"><strong>Phone:</strong></p>
                                {/* <Link to="/changePhoneNumber" className="text-blue-300 underline">Change phone number</Link> */}
                  {/* {isEditingPhone  ? (
                    <>
                    <p className="text-gray-700">{user.phone}</p>
                    </>
                  ) : (
                    <>
                    <p className="text-gray-700">{user.phone}</p>
                    </>
                  )}         */}
                </div>
            </div>
            ) : (   
              <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold mb-4">Please <Link to='/login'>login</Link> to view your account</h1>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Account;
