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
    maxWidth: '500px', 
    width: '90%',
    padding: '0',
    border: 'none',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
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

  const {  dispatch } = context;

  useEffect(() => {
    fetch('/Data.json')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
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
        <div className="cards-container">
          {articles.map(article => (
            <div key={article.it} className="card">
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
              <div className="card-content">
                <h2>{article.title}</h2>
                <p>{article.content}</p>
                <div className="card-date">
                  <p>{new Date(article.date * 1000).toLocaleDateString()}</p>
                </div>
                <div className="card-author">
                  <p>{article.author.name} - {article.author.role}</p>
                </div>
               
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedArticle && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Article Modal"
        >
          <div className="modal-header">
          <img 
              src="/close-button.svg" 
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
        </Modal>
      )}
    </div>
  );
};

export default Display;