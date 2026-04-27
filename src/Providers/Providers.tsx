import { DynamicThemeProvider } from "./DynamicThemeProvider";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }) => {
  return (
    <StoreProvider>
      <DynamicThemeProvider>{children}</DynamicThemeProvider>
    </StoreProvider>
  );
};

export default Providers;
