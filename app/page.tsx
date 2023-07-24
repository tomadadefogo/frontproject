'use client'


import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Page() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(email, password, username);
    try {
      
      const response = await axios.post(
        'http://localhost:3002/registro',
        JSON.stringify({ username, password, email }),
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Resposta do backend:', response.data);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-center text-gray-900">Registro</h1>
        </div>
        <form className="mt-8 space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Nome de usuário:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
              placeholder= "Seu username aqui"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
              placeholder= "Seu email aqui"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="text-m font-medium text-gray-700">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
              placeholder= "Sua senha aqui"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Registrar
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Já possui conta? Clique aqui.
          </Link>
        </div>
      </div>
    </div>
  );
}
