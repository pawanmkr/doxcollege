import { createContext } from "react";
import { useState } from "react";

export const DocumentContext = createContext();

export function DocumentContextProvider({ children }) {
  const [documents, setDocuments] = useState([]);

  return (
    <DocumentContext.Provider value={{ documents, setDocuments }}>
      {children}
    </DocumentContext.Provider>
  )
}