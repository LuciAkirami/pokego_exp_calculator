import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Pokémon GO XP Calculator
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Calculate your XP gains and plan your leveling strategy
        </p>
      </div>
    </header>
  );
};

export default Header;
