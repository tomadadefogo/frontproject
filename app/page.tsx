'use client'
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link'
export default function Page() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(email, password, username);
    try {
      // Enviar os dados para o backend usando axios.post
      const response = await axios.post(
        'http://localhost:3002/registro',
        JSON.stringify({ username, password, email }),
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Verificar a resposta do backend
      console.log('Resposta do backend:', response.data);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nome de usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <Link href="/dashbor">Ja possui conta? Clique aqui.</Link>
    </div>
  );
}
