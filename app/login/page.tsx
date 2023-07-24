'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false); // State to track the theme preference
  const router = useRouter();

  useEffect(() => {
    // Load theme preference from local storage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setDarkMode(storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    applyTheme();
  }, [darkMode]);

  const applyTheme = () => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.style.setProperty('--background-color', 'black');
      root.style.setProperty('--text-color', 'white');
      root.style.setProperty('--button-bg-color', '#4a5568');
    } else {
      root.style.setProperty('--background-color', 'white');
      root.style.setProperty('--text-color', 'black');
      root.style.setProperty('--button-bg-color', '#3182ce');
    }
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3002/login',
        { emailOrUsername, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Resposta do backend:', response.data);

      
      router.push('/principal');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-black' : 'bg-white'
      } flex items-center justify-center`}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className={`text-3xl font-extrabold text-center ${darkMode ? 'text-white' : 'text-black'}`}>
            Login
          </h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="emailOrUsername" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
              E-mail ou Nome de usuário:
            </label>
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                darkMode ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            />
          </div>
          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
              Senha:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                darkMode ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            />
          </div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400'
            }`}
          >
            Entrar
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-12 rounded-full p-2 ${
              darkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            {darkMode ? '🌞' : '🌚'}
          </button>
        </div>
      </div>
    </div>
  );
}
