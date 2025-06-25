import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleSkip = () => {
    localStorage.setItem('demoUser', 'true');
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-[#18181f] p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
          <button type="submit" className="bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Sign Up</button>
        </form>
        <button onClick={handleSkip} className="mt-6 w-full bg-gray-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-600 transition">Skip Demo</button>
      </div>
    </div>
  );
};

export default Signup; 