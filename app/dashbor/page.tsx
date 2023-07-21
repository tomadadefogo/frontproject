'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
export default function Page() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'http://localhost:3002/login',
        { emailOrUsername, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Resposta do backend:', response.data);

      // Aqui você pode redirecionar o usuário para a próxima página após o login bem-sucedido.
      // Por exemplo, usando a função router.push('/dashboard');
      router.push('/principal')
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="emailOrUsername">E-mail ou Nome de usuário:</label>
          <input
            type="text"
            id="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
