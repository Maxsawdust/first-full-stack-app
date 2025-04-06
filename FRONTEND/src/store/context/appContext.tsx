import MenuProvider from "./menuContext";
import CarProvider from "./carContext";

// context provider for other contexts
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CarProvider>
      <MenuProvider>{children}</MenuProvider>
    </CarProvider>
  );
}
