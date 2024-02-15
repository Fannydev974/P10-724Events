import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const mockContactApi = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    // Simule un échec aléatoire
    if (Math.random() > 0.5) {
      resolve({ message: "Message envoyé !" });
    } else {
      reject(new Error("Echec de l'envoi du message"));
    }
  }, 1000);
});

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  const sendContact = useCallback(async (evt) => {
    evt.preventDefault();
    setSending(true);
    try {
      await mockContactApi();
      setSending(false);
      onSuccess(); // Appeler la fonction onSuccess lorsque l'envoi réussit
    } catch (err) {
      setSending(false);
      onError(err); // Appeler la fonction onError avec l'erreur en cas d'échec
    }
  }, [onSuccess, onError]);

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;

