import React, { useEffect, useState, useContext } from 'react';
import { ClickContext } from '../Click/ClckContext';
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
  it: number;
  date: number;
  title: string;
  content: string;
  thumbnail: Thumbnail;
  author: Author;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const Display: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const context = useContext(ClickContext);
  const [loading, setLoading] = useState(true);

  if (!context) {
    throw new Error('ClickContext must be used within a ClickProvider');
  }

  const { state, dispatch } = context;

  useEffect(() => {
    fetch('/Data.json')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
        setLoading(false); // Moved this inside the .then callback
      });
  }, []);

  const handleImageClick = (id: number, title: string) => {
    dispatch({ type: 'INCREMENT_CLICK', id, title });
    const article = articles.find(a => a.it === id);
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
      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {articles.map(article => (
            <div key={article.it} className="display">
              <h2>{article.title}</h2>
              <p>{new Date(article.date * 1000).toLocaleDateString()}</p>
              <div className="image-container">
                <img src={article.thumbnail.small} alt={article.title} />
                <div className="overlay">
                  <button
                    className="learn-more"
                    onClick={() => handleImageClick(article.it, article.title)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
              <p>Clicks: {state.clicks[article.it] || 0}</p>
              <p>{article.content}</p>
            </div>
          ))}

          {selectedArticle && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={{
                ...customStyles,
                overlay: { transition: "opacity 0.3s ease" },
              }}
              contentLabel="Article Modal"
            >
              <div className="modal-content">
                <h2>{selectedArticle.title}</h2>
                <img src={selectedArticle.thumbnail.large} alt={selectedArticle.title} className="modal-main-image" />
                <div className="author-details">
                  {selectedArticle.author.avatar && (
                    <img src={selectedArticle.author.avatar} alt={selectedArticle.author.name} className="author-avatar" />
                  )}
                  <div>
                    <p><strong>{selectedArticle.author.name}</strong></p>
                    <p>{selectedArticle.author.role}</p>
                  </div>
                </div>
                <p>{new Date(selectedArticle.date * 1000).toLocaleDateString()}</p>
                <button onClick={closeModal} className="close-button">Close</button>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default Display;
