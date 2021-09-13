import "./IconsBar.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faComment as faCommentRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
  updateTweet,
  removeTweet,
  getCurrentUser,
} from "./../db/firebaseConfig";
import { Modal, ModalHeader, ModalFooter } from "reactstrap";

function IconsBar(props) {
  const [modal, setModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const fetchUser = async () => {
    const user = localStorage.getItem("loggedUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      const currentUser = await getCurrentUser(parsedUser.uid);
      setCurrentUser(currentUser);
    }
    if (!user) {
      try {
        const currentUser = await getCurrentUser();
        setCurrentUser(currentUser);
      } catch (e) {
        console.log("deu ruim", e);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const { uid, usersFavorited, comments } = props;

  const haveFavorited = usersFavorited.some(
    (user) => user === currentUser.username
  );
  const temComentarios = comments.length > 0;

  const deleteTweet = () => {
    removeTweet(uid);
  };

  const faveTweet = () => {
    if (!usersFavorited.includes(currentUser.username)) {
      const newUsersFavorited = [...usersFavorited, currentUser.username];
      updateTweet(uid, newUsersFavorited);
    }
    if (usersFavorited.includes(currentUser.username)) {
      const newUsersFavorited = usersFavorited.filter(
        (user) => user !== currentUser.username
      );
      updateTweet(uid, newUsersFavorited);
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="icon-container">
        <div className="icon-container__contents">
          <FontAwesomeIcon
            icon={haveFavorited ? faHeart : faHeartRegular}
            role="button"
            onClick={faveTweet}
          />
          {usersFavorited.length && (
            <p className="icon-container__number">{usersFavorited.length}</p>
          )}
        </div>

        <div className="icon-container__contents">
          <FontAwesomeIcon
            icon={temComentarios ? faComment : faCommentRegular}
          />
          {temComentarios && (
            <p className="icon-container__number">{comments.length}</p>
          )}
        </div>

        <div className="icon-container__contents">
          <FontAwesomeIcon icon={faTrash} role="button" onClick={toggle} />
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Deletar tweet</ModalHeader>
        <ModalFooter>
          <button className="btn btn-primary" onClick={deleteTweet}>
            Deletar tweet
          </button>
          <button className="btn btn-primary-inverted" onClick={toggle}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default IconsBar;
