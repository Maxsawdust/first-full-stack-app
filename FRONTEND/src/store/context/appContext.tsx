import { createContext, useState } from "react";

type MenuContextType = {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
};

export const MenuContext = createContext<MenuContextType>({
  menuOpen: false,
  setMenuOpen: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
}
