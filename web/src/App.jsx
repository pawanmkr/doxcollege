import Navigation from "./components/Navigation";
import AppRoutes from '../src/router/routesConfig';
import { DocumentContextProvider } from "./context/DocumentContext";

const App = () => {
  return (
    <DocumentContextProvider>
      <div className="screen">
        <Navigation />
        <AppRoutes />
      </div>
    </DocumentContextProvider>
  );
}

export default App;
