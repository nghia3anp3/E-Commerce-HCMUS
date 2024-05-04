// import React, { createContext, useState, useEffect } from 'react';

// // Create context
// export const CommentContext = createContext();

// const CommentProvider = ({ children }) => {
//   // Comment state
//   const [Comments, setComments] = useState([]);

//   // Fetch Comments
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const phoneResponse = await fetch('http://localhost:8000/phone/comments/');
//         const laptopResponse = await fetch('http://localhost:8000/laptop/comments/');
        
//         if (phoneResponse.ok && laptopResponse.ok) {
//           const phoneData = await phoneResponse.json();
//           const laptopData = await laptopResponse.json();
          
//           const phoneDataWithType = phoneData.map(item => ({ ...item, category: 'phone' }));
//           const laptopDataWithType = laptopData.map(item => ({ ...item, category: 'laptop' }));
          
//           const combinedData = phoneDataWithType.concat(laptopDataWithType);
          
//           setComments(combinedData);
//         } else {
//           console.error('Failed to fetch Comments:', phoneResponse.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching Comments:', error);
//       }
//     };
//     fetchComments();
//   }, []);

//   return (
//     <CommentContext.Provider value={{ Comments }}>
//       {children}
//     </CommentContext.Provider>
//   );
// };

// export default CommentProvider;
