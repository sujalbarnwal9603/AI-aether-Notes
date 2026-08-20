import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NotesProvider } from "./context/NotesContext";
import AppLayout from "./components/layout/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <NotesProvider>
        <AppLayout />
      </NotesProvider>
    </BrowserRouter>
  );
}
