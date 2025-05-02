import { createContext, useEffect, useState } from 'react';
import { today } from '../features/events';
export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    events: [],
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        events,
        setEvents,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
