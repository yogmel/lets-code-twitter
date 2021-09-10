import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";
import { writeNewTweet } from "./../../db/firebaseConfig";

function AddTweetModal(props) {
  const [tweet, setTweet] = useState("");
  const { modal, toggle } = props;

  const createTweet = async () => {
    await writeNewTweet(tweet);
    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Novo tweet</ModalHeader>
      <ModalBody>
        <textarea
          placeholder="Escreva seu tweet com menos de 340 caracteres..."
          onChange={(e) => setTweet(e.target.value)}
        ></textarea>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={createTweet}>
          Adicionar tweet
        </button>
        <button className="btn btn-primary-inverted" onClick={toggle}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default AddTweetModal;
