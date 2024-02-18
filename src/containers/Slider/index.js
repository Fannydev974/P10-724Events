import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ); // méthode sort() évenements classés par ordre décroissant

  const imgSlide = data?.focus?.length; //  imgSlide avec la longueur du tableau data.focus, gère également les cas où data ou data.focus pourrait être nul ou indéfini grâce à ?.


  const nextCard = () => { // fonction appelée de manière répétée grâce à useEffect pour passer à la prochaine carte dans le slider.
    setTimeout(
      () => setIndex(index < imgSlide - 1 ? index + 1 : 0), //
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((focus, radioIdx) => ( // map pour byDataDesc créer des boutons radio pour chaque élément du tableau.
            <input
              key={focus.title} // Chaque bouton radio est généré à partir d'un élément du tableau byDateDesc, représenté ici par la variable focus.
              type="radio" // indique que ces éléments sont des boutons radio.
              name="radio-button" //  seul un bouton peut être sélectionné à la fois.
              checked={index === radioIdx}
              readOnly // signifie que l'utilisateur ne peut pas modifier l'état du bouton.
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;


