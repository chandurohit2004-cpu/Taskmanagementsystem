import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { CheckSquare, LayoutDashboard, ListTodo, Sun, Moon, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center space-x-3 text-sky-600 dark:text-sky-400 font-bold text-xl">
            <CheckSquare className="w-7 h-7" />
            <span>TaskTracker</span>
          </Link>

          {/* Navigation Links */}
          {user && (
            <nav className="flex items-center space-x-2 md:space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-sky-50 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <ListTodo className="w-4 h-4" />
                <span>My Tasks</span>
              </Link>

              <Link
                to="/dashboard"
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-sky-50 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
            </nav>
          )}

          {/* Right Action Items */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Profile & Logout */}
            {user ? (
              <div className="flex items-center space-x-3 border-l pl-3 border-gray-200 dark:border-gray-700">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span className="font-semibold">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-sky-600 px-3 py-1.5 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-sky-600 text-white hover:bg-sky-700 px-4 py-1.5 rounded-lg font-medium shadow-sm transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
