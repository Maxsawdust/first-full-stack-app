import MenuProvider from "./menuContext";
import CarProvider from "./carContext";
import OwnerProvider from "./ownerContext";

// context provider for other contexts
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OwnerProvider>
      <CarProvider>
        <MenuProvider>{children}</MenuProvider>
      </CarProvider>
    </OwnerProvider>
  );
}
