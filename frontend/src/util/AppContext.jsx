import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [transactions, setTransactions] = useState([]);

  return (
    <AppContext.Provider value={{ tasks, setTasks, events, setEvents, transactions, setTransactions }}>
      {children}
    </AppContext.Provider>
  );
}