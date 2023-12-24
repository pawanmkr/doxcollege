import Navigation from "./components/Navigation";
import AppRoutes from '../src/router/routesConfig';
import { DocumentContextProvider } from "./context/DocumentContext";
import Footer from "./components/Footer";

const App = () => {
  return (
    <DocumentContextProvider>
      <div className="screen">
        <Navigation />
        <AppRoutes />
        <Footer />
      </div>
    </DocumentContextProvider>
  );
}

export default App;
