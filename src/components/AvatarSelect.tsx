import React, { useState } from 'react';
import { avatarOptions } from '../types/player';
import { Utils } from '../utils/utils';

interface AvatarSelectProps {
  index: number;
  selectedAvatar: string;
  onSelect: (avatar: string) => void;
}

export default function AvatarSelect({ index, selectedAvatar, onSelect }: AvatarSelectProps) {

  const [avatarOptionsSlice, setAvatarOptionsSlice] = useState<string[]>([]);

  const getRandomAvatarOptionsSlice = (index: number) => {
    const avatars = Utils.shuffleArray(avatarOptions);
    const startIndex = (index * 3) % avatarOptions.length;
    const endIndex = (index * 3 + 3) % avatarOptions.length;
    if (startIndex > endIndex) {
      return avatars.slice(startIndex, avatarOptions.length).concat(avatars.slice(0, endIndex));
    }

    return avatars.slice(startIndex, endIndex);
  }

  if (avatarOptionsSlice.length === 0) {
    setAvatarOptionsSlice(getRandomAvatarOptionsSlice(index));
  }

  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {avatarOptionsSlice.map((avatar) => (
        <button
          key={avatar}
          onClick={(e) => {
            e.preventDefault();
            onSelect(avatar);
          }}
          className={`p-1 rounded-lg transition-all ${selectedAvatar === avatar ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'
            }`}
        >
          <img
            src={avatar}
            alt="Avatar option"
            className="w-12 h-12 rounded-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}