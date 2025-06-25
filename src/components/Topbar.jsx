import { HiOutlineSearch } from 'react-icons/hi';

const Topbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('demoUser');
    window.location.reload();
  };

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-br from-white/10 to-[#23272a]/80 backdrop-blur-xl shadow-lg rounded-tl-none rounded-br-2xl border-b-2 border-accent/60">
      {/* Search Bar */}
      <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 shadow-inner w-full max-w-md">
        <HiOutlineSearch className="w-5 h-5 text-accent mr-2" />
        <input
          type="text"
          placeholder="Search for songs, artists, albums..."
          className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
        />
      </div>
      {/* Logout Button */}
      <div className="ml-6 flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar; 