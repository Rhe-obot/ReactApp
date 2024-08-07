import React, { useContext, useState } from 'react';
import { ClickContext } from '../Click/ClickContext';
import Modal from "react-modal";
import './Display.css';
import Navbar from '../Navbar/Navbar';

interface Thumbnail {
  large: string;
  small: string;
}

interface Author {
  name: string;
  avatar?: string;
  role: string;
}

interface Article {
  id: number;
  date: string;
  title: string;
  content: string;
  thumbnail: Thumbnail;
  author: Author;
}

const customStyles = {
  content: {
    top: '48%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    width: '90%',
    padding: '0',
    border: 'none',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

Modal.setAppElement('#root');

const Display: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const context = useContext(ClickContext);

  if (!context) {
    throw new Error('ClickContext must be used within a ClickProvider');
  }

  const { state, dispatch } = context;

  const handleImageClick = (id: number) => {
    console.log(`Image clicked with ID: ${id}`);
    dispatch({ type: 'INCREMENT_CLICK', id });
    const article = state.articles.find(a => a.id === id);
    if (article) {
      setSelectedArticle(article);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="cards-container">
        {state.articles.map(article => (
          <div key={article.id} className="card">
            <div className="image-container">
              <img src={article.thumbnail.small} alt={article.title} />
              <div className="overlay">
                <button
                  className="learn-more"
                  onClick={() => handleImageClick(article.id)}
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="card-description">
              <div className="dots">
                <div className="dot blue">
                  <img src="/bluedot.png" alt="dot" />
                </div>
                <div className="dot yellow">
                  <img src="/yellowdot.png" alt='dot' />
                </div>
              </div>
              <h2>{article.title}</h2>
              <div className='card-content'>
                <p>{article.content}</p>
              </div>
              <div className="card-author">
                <p>{article.author.name} - {article.author.role}</p>
              </div>
              <div className="card-date">
                <p>{article.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedArticle && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Article Modal"
        >
          <div className='Modal'>
            <div className="modal-header">
              <img
                src="/close-button.png"
                alt="Close"
                className="modal-close-button"
                onClick={closeModal}
              />
              <img src={selectedArticle.thumbnail.large} alt={selectedArticle.title} className="modal-main-image" />
            </div>
            <div className="modal-body">
              <h2 className="modal-title">{selectedArticle.title}</h2>
              <p className="modal-content">{selectedArticle.content}</p>
              <div className="author-details">
                {selectedArticle.author.avatar && (
                  <img src={selectedArticle.author.avatar} alt={selectedArticle.author.name} className="author-avatar" />
                )}
                <div>
                  <p>{selectedArticle.author.name} - {selectedArticle.author.role}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Display;