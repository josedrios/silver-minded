import { createContext, useEffect, useState } from 'react';
import { getMonthRange, year, month } from '../features/events';
export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState({
    view: {
      frame: getMonthRange(year, month),
      events: [],
    },
    list: {
      frame: {
        start: '',
        end: '',
      },
      events: [],
    },
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
