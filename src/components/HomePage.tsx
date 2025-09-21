import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from './ui/card';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const calculatorCards = [
    {
      id: 'level-50',
      title: 'To Level 50',
      subtitle: 'Simple XP calculator',
      icon: '🎯',
      description: 'Calculate XP needed to reach level 50',
      color: 'from-red-600 to-red-800'
    },
    {
      id: 'detailed',
      title: 'Detailed XP',
      subtitle: 'Between levels',
      icon: '📊',
      description: 'Calculate XP between specific levels',
      color: 'from-red-700 to-red-900'
    },
    {
      id: 'catching',
      title: 'Catch XP',
      subtitle: 'From catches',
      icon: '🎣',
      description: 'Calculate XP from catching Pokemon',
      color: 'from-red-500 to-red-700'
    },
    {
      id: 'raids',
      title: 'Raid XP',
      subtitle: 'From raids',
      icon: '⚔️',
      description: 'Calculate XP from raid battles',
      color: 'from-red-600 to-red-800'
    },
    {
      id: 'friendship',
      title: 'Friends XP Calculator',
      subtitle: 'Calculate XP gained from friends',
      icon: '👥',
      description: 'Calculate XP from friendship milestones',
      color: 'from-red-700 to-red-900',
    },
    {
      id: 'evolution',
      title: 'Evolution XP Calculator',
      subtitle: 'Calculate XP gained from evolutions',
      icon: '✨',
      description: 'Calculate XP from Pokemon evolutions',
      color: 'from-red-500 to-red-700',
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-red-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-red-600">XP Calculators</h1>
              <p className="text-gray-400 text-sm mt-1">App Home Screen</p>
            </div>
            <button className="p-2 text-red-600 hover:text-red-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Grid of Calculator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {calculatorCards.map((card) => (
            <Card
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="bg-gray-900 border-gray-800 hover:border-red-600 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:shadow-red-900/20"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl`}>
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-white group-hover:text-red-400 transition-colors">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm mb-2">{card.subtitle}</CardDescription>
                    <p className="text-gray-500 text-xs">{card.description}</p>
                  </div>
                  <div className="text-red-600 group-hover:text-red-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Width Cards */}
        {/* <div className="space-y-6">
          {calculatorCards.filter(card => card.fullWidth).map((card) => (
            <Card
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="bg-gray-900 border-gray-800 hover:border-red-600 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:shadow-red-900/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-3xl`}>
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-white group-hover:text-red-400 transition-colors">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-lg mb-2">{card.subtitle}</CardDescription>
                    <p className="text-gray-500">{card.description}</p>
                  </div>
                  <div className="text-red-600 group-hover:text-red-400 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        {/* Future Feature Card */}
        <div className="mt-8">
          <Card className="bg-gray-900 border-2 border-dashed border-gray-700 hover:border-red-600 transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gray-800 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="text-xl text-white mb-2">Future Feature</CardTitle>
                <CardDescription className="text-gray-400">Coming Soon</CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
