import React from 'react';

interface FriendshipInputs {
  good_friends: number;
  great_friends: number;
  ultra_friends: number;
  best_friends: number;
}

interface FriendshipCardProps {
  inputs: FriendshipInputs;
  onInputChange: (field: keyof FriendshipInputs, value: number) => void;
}

const FriendshipCard: React.FC<FriendshipCardProps> = ({
  inputs,
  onInputChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
          👥
        </span>
        Friendship
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Good Friends
          </label>
          <input
            type="number"
            min="0"
            value={inputs.good_friends}
            onChange={(e) => onInputChange('good_friends', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">3,000 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Great Friends
          </label>
          <input
            type="number"
            min="0"
            value={inputs.great_friends}
            onChange={(e) => onInputChange('great_friends', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">10,000 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ultra Friends
          </label>
          <input
            type="number"
            min="0"
            value={inputs.ultra_friends}
            onChange={(e) => onInputChange('ultra_friends', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">50,000 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Best Friends
          </label>
          <input
            type="number"
            min="0"
            value={inputs.best_friends}
            onChange={(e) => onInputChange('best_friends', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">100,000 XP each</p>
        </div>
      </div>
    </div>
  );
};

export default FriendshipCard;
