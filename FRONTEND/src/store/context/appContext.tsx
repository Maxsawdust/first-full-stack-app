import MenuProvider from "./menuContext";
import CarProvider from "./carContext";
import OwnerProvider from "./ownerContext";
import ModalProvider from "./modalContext";

// context provider for other contexts
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <OwnerProvider>
        <CarProvider>
          <MenuProvider>{children}</MenuProvider>
        </CarProvider>
      </OwnerProvider>
    </ModalProvider>
  );
}
