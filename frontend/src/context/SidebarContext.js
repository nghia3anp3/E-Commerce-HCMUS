import React, {useState, createContext} from 'react'
// create context
export const SidebarContext = createContext();

const SidebarProvider = ({children}) => {
  const [isOpen, setisOpen] = useState(false)
  const handleClose = () => {
    setisOpen(false);
  };

  return (
    <SidebarContext.Provider value={{isOpen, setisOpen, handleClose}}>
      {children}
    </SidebarContext.Provider>
  )
};

export default SidebarProvider