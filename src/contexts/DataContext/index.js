import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);

  const events = data?.events; //  Si data est défini, la propriété events est extraite et assignée à events. Sinon, events sera undefind.
  const sortedEvents = events?.sort((evtA, evtB) => new Date(evtA.date) > new Date(evtB.date) ? -1 : 1); // trie les événements en fonction de leur date.
  const last = sortedEvents?.[0]; // extrait l'événement le plus récent après le tri, 
  // Si sortedEvents est défini et non vide, le premier élément est assigné à last.Sinon, last =undefind.


  useEffect(() => {
    if (data) return;
    getData();
  });

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
