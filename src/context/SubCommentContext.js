// import React, { createContext, useState, useEffect } from 'react';

// // Create context
// export const SubCommentContext = createContext();

// const SubCommentProvider = ({ children }) => {
//   // Comment state
//   const [sub_comments, setSubComments] = useState([]);

//   // Fetch Comments
//   useEffect(() => {
//     const fetchSubComments = async () => {
//       try {
//         const phoneResponse = await fetch('https://e-commerce-hcmus-server-qggz96m4u-c-zus-projects.vercel.app/phone/sub_comments/');
//         const laptopResponse = await fetch('https://e-commerce-hcmus-server-qggz96m4u-c-zus-projects.vercel.app/laptop/sub_comments/');
        
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
//     fetchSubComments();
//   }, []);

//   return (
//     <SubCommentContext.Provider value={{sub_comments} }>
//       {children}
//     </SubCommentContext.Provider>
//   );
// };

// export default SubCommentProvider;
