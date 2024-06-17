import React, { createContext, useState, useEffect } from 'react';

// Create context
export const SubCommentContext = createContext();

const SubCommentProvider = ({ children }) => {
  // Comment state
  const [subcomments, setSubComments] = useState([]);

  // Fetch Comments
  useEffect(() => {
    const fetchSubComments = async () => {
      try {
        // const phoneResponse = await fetch('https://e-commerce-hcmus-server-qggz96m4u-c-zus-projects.vercel.app/phone/comments/');
        // const laptopResponse = await fetch('https://e-commerce-hcmus-server-qggz96m4u-c-zus-projects.vercel.app/laptop/comments/');
        const productResponse = await fetch('http://localhost:8000/api/subcomments')
        if (productResponse.ok ) {
          const productsubcommentData = await productResponse.json();   
          setSubComments(productsubcommentData);
        } else {
          console.error('Failed to fetch Comments:', productResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching Comments:', error);
      }
    };
    fetchSubComments();
  }, []);

  return (
    <SubCommentContext.Provider value={{subcomments} }>
      {children}
    </SubCommentContext.Provider>
  );
};

export default SubCommentProvider;
