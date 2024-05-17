import React, { createContext, useState, useEffect } from 'react';

// Create context
export const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  // Comment state
  const [comments, setComments] = useState([]);

  // Fetch Comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const phoneResponse = await fetch('https://e-commerce-hcmus-server-qggz96m4u-c-zus-projects.vercel.app/phone/comments/');
        const laptopResponse = await fetch('https://e-commerce-hcmus-server-qggz96m4u-c-zus-projects.vercel.app/laptop/comments/');
        
        if (phoneResponse.ok && laptopResponse.ok) {
          const phoneData = await phoneResponse.json();
          const laptopData = await laptopResponse.json();
          
          const phoneDataWithType = phoneData.map(item => ({ ...item, category: 'phone' }));
          const laptopDataWithType = laptopData.map(item => ({ ...item, category: 'laptop' }));
          
          const combinedData = phoneDataWithType.concat(laptopDataWithType);
          
          setComments(combinedData);
        } else {
          console.error('Failed to fetch Comments:', phoneResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching Comments:', error);
      }
    };
    fetchComments();
  }, []);

  return (
    <CommentContext.Provider value={{comments} }>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
