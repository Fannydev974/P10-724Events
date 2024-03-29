import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);


  // Filtre les événements en fonction du type sélectionné
  const filteredEventsByType = (
    type
      ? data?.events.filter(event => event.type === type)
      : data?.events) || [];

  // Filtrage des événements en fonction de la page actuelle (pagination)
  const paginatedEvents = filteredEventsByType.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  ); // méthode slice() pour extraire une portion du tableau filteredEventsByType
  // compris entre l'index de départ et l'index de fin calculés précédemment. 
  // "paginatedEvents" contiendra les événements de la page actuelle, en fonction du type filtré, 
  // et en respectant la pagination définie par PER_PAGE.




  const changeType = (evtType) => {
    // Réinitialiser la page actuelle à 1 lorsque le type change
    setCurrentPage(1);
    // Mettre à jour le type d'événement sélectionné
    setType(evtType);
  };


  const pageNumber = Math.floor((paginatedEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
