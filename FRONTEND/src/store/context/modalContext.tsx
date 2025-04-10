import { createContext, useEffect } from "react";
import { useState } from "react";
import { CarType, OwnerType } from "../../interfaces/CarInterface";

type ModalContextType = {
  editCars: {
    carsModalShown: boolean;
    setCarsModalShown: (value: boolean) => void;
    carToEdit: CarType | null;
    setCarToEdit: (value: CarType | null) => void;
  };

  editOwners: {
    ownersModalShown: boolean;
    setOwnersModalShown: (value: boolean) => void;
    ownerToEdit: OwnerType | null;
    setOwnerToEdit: (value: OwnerType) => void;
  };

  addOwners: {
    addOwnersModalShown: boolean;
    setAddOwnersModalShown: (value: boolean) => void;
  };
};

export const ModalContext = createContext<ModalContextType>({
  editCars: {
    carsModalShown: false,
    setCarsModalShown: () => {},
    carToEdit: null,
    setCarToEdit: () => {},
  },

  editOwners: {
    ownersModalShown: false,
    setOwnersModalShown: () => {},
    ownerToEdit: null,
    setOwnerToEdit: () => {},
  },

  addOwners: {
    addOwnersModalShown: false,
    setAddOwnersModalShown: () => {},
  },
});

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [carsModalShown, setCarsModalShown] = useState(false);
  const [carToEdit, setCarToEdit] = useState<CarType | null>(null);

  const [ownersModalShown, setOwnersModalShown] = useState(false);
  const [ownerToEdit, setOwnerToEdit] = useState<OwnerType | null>(null);

  const [addOwnersModalShown, setAddOwnersModalShown] = useState(false);

  // closing and opening cars modal reflecting edit owners modal change
  useEffect(() => {
    setCarsModalShown(!ownersModalShown);
  }, [ownersModalShown]);

  const value = {
    editCars: {
      carsModalShown,
      setCarsModalShown,
      carToEdit,
      setCarToEdit,
    },

    editOwners: {
      ownersModalShown,
      setOwnersModalShown,
      ownerToEdit,
      setOwnerToEdit,
    },

    addOwners: {
      addOwnersModalShown,
      setAddOwnersModalShown,
    },
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
