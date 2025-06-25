import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EXAMPLE_USER = 'demo';
const EXAMPLE_PASS = 'demo123';

const AuthGate = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('demoUser')) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === EXAMPLE_USER && password === EXAMPLE_PASS) {
      localStorage.setItem('demoUser', 'true');
      window.location.href = '/';
    } else {
      setError('Invalid credentials. Use the example username and password below.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-[#18181f] p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login Required</h2>
        <div className="mb-4 text-gray-300 text-sm text-center">
          <div>Example Username: <span className="font-mono text-accent">demo</span></div>
          <div>Example Password: <span className="font-mono text-accent">demo123</span></div>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-accent outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-accent outline-none"
            required
          />
          <button type="submit" className="bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Login</button>
        </form>
        {error && <div className="text-red-400 mt-4 text-center">{error}</div>}
        <button
          onClick={() => { localStorage.setItem('demoUser', 'true'); window.location.href = '/'; }}
          className="mt-6 w-full bg-gray-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-600 transition"
        >
          Skip Demo
        </button>
      </div>
    </div>
  );
};

export default AuthGate; 