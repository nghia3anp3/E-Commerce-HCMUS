import React, { Component } from 'react';
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';

class Account extends Component {
  static contextType = AuthContext;

  render() {
    const { isLoggedIn, user } = this.context;

    return (
        <section className='py-20'>
            <div className='container mx-auto p-12'>
                <div className="max-w-lg mx-auto mt-8">
                {isLoggedIn ? (
                    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl font-bold mb-4">Welcome, {user.account}</h1>
                    <p className="text-gray-700 mb-4">Email: {user.email}</p>
                    {/* Display other user information here */}
                    </div>
                ) : (
                    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                        <h1 className="text-2xl font-bold mb-4">Please <Link to='/login'>login</Link> to view your account </h1>
                    {/* Optionally, you can add a login link/button here */}
                    </div>
                )}
                </div>
            </div>
        </section>    
    );
  }
}

export default Account;
