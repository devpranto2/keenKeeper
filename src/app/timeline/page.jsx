'use client';

import { useRouter } from 'next/navigation'; // Add this import
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import callIcon from '../../../assets/call.png';
import textIcon from '../../../assets/text.png';
import videoIcon from '../../../assets/video.png';

export default function TimelinePage() {
  const router = useRouter(); // Add this
  const [interactions, setInteractions] = useState([]);
  const [filteredInteractions, setFilteredInteractions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const pathname = usePathname();

  const loadInteractions = () => {
    const savedInteractions = JSON.parse(sessionStorage.getItem('temp_interactions') || '[]');
    setInteractions(savedInteractions.reverse());
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
      const filtered = interactions.filter(
        interaction => interaction.type === selectedFilter
      );
      setFilteredInteractions(filtered);
    }
  }, [interactions, selectedFilter]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getInteractionText = (type, friendName) => {
    switch(type) {
      case 'Call': return `Call with ${friendName}`;
      case 'Text': return `Text with ${friendName}`;
      case 'Video': return `Video call with ${friendName}`;
      default: return `${type} with ${friendName}`;
    }
  };

  const getInteractionIcon = (type) => {
    switch(type) {
      case 'Call': return callIcon;
      case 'Text': return textIcon;
      case 'Video': return videoIcon;
      default: return callIcon;
    }
  };

  const clearHistory = () => {
    sessionStorage.removeItem('temp_interactions');
    setInteractions([]);
    setFilteredInteractions([]);
    setSelectedFilter('all');
    toast.info('Timeline cleared!');
  };

  // Add this function to handle card clicks
  const handleCardClick = (interaction) => {
    // Navigate to status page with the interaction data
    router.push('/status', {
      state: { interactionData: interaction }
    });
  };

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-semibold text-gray-900">Timeline</h1>
            {interactions.length > 0 && (
              <button 
                onClick={clearHistory}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          
          {/* DaisyUI Dropdown Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn bg-white text-gray-500 border-gray-200 hover:bg-gray-50 normal-case justify-between w-48">
              Filter Timeline
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-box w-48 border border-gray-100">
              <li>
                <button 
                  onClick={() => setSelectedFilter('Call')}
                  className={selectedFilter === 'Call' ? 'active bg-[#1f5b4a] text-white' : ''}
                >
                  Call
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSelectedFilter('Text')}
                  className={selectedFilter === 'Text' ? 'active bg-[#1f5b4a] text-white' : ''}
                >
                  Text
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSelectedFilter('Video')}
                  className={selectedFilter === 'Video' ? 'active bg-[#1f5b4a] text-white' : ''}
                >
                  Video
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Timeline Items */}
        {filteredInteractions.length === 0 ? (
          <div className="text-center py-12 border-2">
            {interactions.length === 0 ? (
              <>
                <p className="text-gray-400">No interactions yet</p>
                <p className="text-sm text-gray-300 mt-2">
                  Click Call/Text/Video from any friends detail page
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-400">No {selectedFilter.toLowerCase()} interactions</p>
                <button 
                  onClick={() => setSelectedFilter('all')}
                  className="text-sm text-[#1f5b4a] mt-2 hover:underline"
                >
                  Show all interactions
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredInteractions.map(({ id, type, friendData, timestamp }) => (
              <div 
                key={id} 
                onClick={() => handleCardClick({ id, type, friendData, timestamp })}
                className="cursor-pointer flex flex-row gap-4 items-center border-gray-100 bg-white border-2 rounded-sm p-4 hover:bg-gray-50 transition-all duration-200"
              >
                <div>
                  <Image 
                    src={getInteractionIcon(type)} 
                    alt={type}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">
                    {formatDate(timestamp)}
                  </div>
                  <div className="text-gray-900">
                    {getInteractionText(type, friendData.name)}
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