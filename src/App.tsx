import "./App.css";
import { AppProvider } from "./context/AppContext";
import AppRouter from "./router";

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
