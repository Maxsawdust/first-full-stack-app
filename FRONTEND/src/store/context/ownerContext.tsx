import { createContext } from "react";
import { OwnerType } from "../../interfaces/CarInterface";
import { useState } from "react";

type OwnerContextType = {
  owners: OwnerType[];
  setOwners: (value: OwnerType[]) => void;
};

export const OwnerContext = createContext<OwnerContextType>({
  owners: [],
  setOwners: () => {},
});

export default function OwnerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [owners, setOwners] = useState<OwnerType[]>([]);

  return (
    <OwnerContext.Provider value={{ owners, setOwners }}>
      {children}
    </OwnerContext.Provider>
  );
}
