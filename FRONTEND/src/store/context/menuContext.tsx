import { useState, createContext } from "react";

// defining type for context
type MenuContextType = {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
};

// creating default context
export const MenuContext = createContext<MenuContextType>({
  menuOpen: false,
  setMenuOpen: () => {},
});

export default function MenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // creating state to handle menu functions
  const [menuOpen, setMenuOpen] = useState(false);

  // exporting a provider
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
}
