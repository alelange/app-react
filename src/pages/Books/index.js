import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImage from './../../assets/logo.svg';

export default function Books() {

  const [books, setBooks] = useState([]);

  const userName = localStorage.getItem('userName');
  const accessToken = localStorage.getItem('accessToken');

  const history = useHistory();

  useEffect(() => {
    api.get('api/v1/Book/asc/20/1', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      setBooks(response.data.list)
    })
  }, [accessToken]);

  async function deleteBook(id, title) {
    try {
      alert(`Tem certeza que deseja deletar o livro ${title}?`)
      await api.delete(`api/v1/Book/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      alert('Delete failed! Try again.')
    }
  }

  async function logout() {
    try {
      await api.get('api/v1/Auth/revoke', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      localStorage.clear();
      history.push('/');
    } catch (err) {
      alert('Logout failed! Try again.')
    }
  }

  return (
    <div className="book-container">
      <header>
        <img src={logoImage} alt="Erudio" />
        <span>Welcome, <strong>{userName.toLowerCase()}</strong>!</span>
        <Link className="button" to="book/new">Add New Book</Link>
        <button type="button" onClick={logout}>
          <FiPower size={18} color="#251fc5" />
        </button>
      </header>

      <h1>Registered Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>Title:</strong>
            <p>{book.title}</p>
            <strong>Author:</strong>
            <p>{book.author}</p>
            <strong>Price:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.price)}</p>
            <strong>Release Date:</strong>
            <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>

            <button type="button">
              <FiEdit size={20} color="#251fc5" />
            </button>
            <button type="button" onClick={() => deleteBook(book.id, book.title)}>
              <FiTrash2 size={20} color="#251fc5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}