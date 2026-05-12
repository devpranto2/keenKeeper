'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import callIcon from '../../../assets/call.png';
import textIcon from '../../../assets/text.png';
import videoIcon from '../../../assets/video.png';
import { FaAngleDown, FaArrowDown } from 'react-icons/fa';

export default function TimelinePage() {
  const router = useRouter();
  const pathname = usePathname();

  const [interactions, setInteractions] = useState([]);
  const [filteredInteractions, setFilteredInteractions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const loadInteractions = () => {
    const savedInteractions = JSON.parse(
      sessionStorage.getItem('temp_interactions') || '[]'
    );

    const reversed = [...savedInteractions].reverse();

    setInteractions(reversed);
    setFilteredInteractions(reversed);
  };

  useEffect(() => {
    loadInteractions();

    const handleInteractionAdded = () => {
      loadInteractions();
    };

    window.addEventListener('interactionAdded', handleInteractionAdded);

    return () => {
      window.removeEventListener('interactionAdded', handleInteractionAdded);
    };
  }, [pathname]);

  useEffect(() => {
    if (selectedFilter === 'all') {
      setFilteredInteractions(interactions);
    } else {
      setFilteredInteractions(
        interactions.filter((item) => item.type === selectedFilter)
      );
    }
  }, [selectedFilter, interactions]);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInteractionText = (type, friendName) => {
    switch (type) {
      case 'Call':
        return `Call with ${friendName}`;
      case 'Text':
        return `Text with ${friendName}`;
      case 'Video':
        return `Video call with ${friendName}`;
      default:
        return `${type} with ${friendName}`;
    }
  };

  const getInteractionIcon = (type) => {
    switch (type) {
      case 'Call':
        return callIcon;
      case 'Text':
        return textIcon;
      case 'Video':
        return videoIcon;
      default:
        return callIcon;
    }
  };

  const clearHistory = () => {
    sessionStorage.removeItem('temp_interactions');
    setInteractions([]);
    setFilteredInteractions([]);
    toast.info('Timeline cleared!');
  };

  const handleCardClick = (interaction) => {
    sessionStorage.setItem(
      'selectedInteraction',
      JSON.stringify(interaction)
    );

    router.push('/status');
  };

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold text-gray-900">
              Timeline
            </h1>

            {interactions.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm text-gray-400 hover:text-red-500"
              >
                Clear
              </button>
            )}
          </div>

          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-white border-gray-200 text-gray-500 w-48 justify-between"
            >
              Filter Timeline <FaAngleDown/>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content `z-[1]` menu p-2 shadow bg-white rounded-box w-48"
            >
              <li>
                <button onClick={() => setSelectedFilter('Call')}>
                  Call
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedFilter('Text')}>
                  Text
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedFilter('Video')}>
                  Video
                </button>
              </li>
             
            </ul>
          </div>
        </div>

        {filteredInteractions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No interactions yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredInteractions.map((interaction) => (
              <div
                key={interaction.id}
                onClick={() => handleCardClick(interaction)}
                className="cursor-pointer flex gap-4 items-center border-2 border-gray-100 rounded-sm p-4 hover:bg-gray-50"
              >
                <Image
                  src={getInteractionIcon(interaction.type)}
                  alt={interaction.type}
                  width={40}
                  height={40}
                />

                <div>
                  <div className="text-sm text-gray-400">
                    {formatDate(interaction.timestamp)}
                  </div>

                  <div className="text-gray-900">
                    <strong className="font-bold">{interaction.type}</strong> with {interaction.friendData.name}
                  </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}