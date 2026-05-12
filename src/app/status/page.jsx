'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function StatusPage() {
  const router = useRouter();
  const [interaction, setInteraction] = useState(null);

  useEffect(() => {
    // Get the data passed from timeline page
    if (router && router.state) {
      setInteraction(router.state.interactionData);
    }
    
    // Optional: If no data, redirect back to timeline
    if (!router.state?.interactionData) {
      // router.push('/timeline');
    }
  }, [router]);

  if (!interaction) {
    return (
      <div className="min-h-screen bg-white py-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-400">No interaction selected</p>
          <Link href="/timeline" className="text-[#1f5b4a] hover:underline mt-4 inline-block">
            ← Back to Timeline
          </Link>
        </div>
      </div>
    );
  }

  const { type, friendData, timestamp } = interaction;

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back button */}
        <Link href="/timeline" className="inline-flex items-center text-gray-500 hover:text-[#1f5b4a] mb-6 transition">
          ← Back to Timeline
        </Link>

        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Interaction Status</h1>
        
        <div className="bg-white border-2 rounded-lg p-6 shadow-sm">
          {/* Header with icon */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Image 
                src={
                  type === 'Call' ? '/call.png' :
                  type === 'Text' ? '/text.png' :
                  '/video.png'
                }
                alt={type}
                width={32}
                height={32}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {type} with {friendData.name}
              </h2>
              <p className="text-gray-500">
                {new Date(timestamp).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          {/* Friend Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Friend Name</p>
                <p className="font-medium text-gray-900">{friendData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{friendData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  friendData.status === 'overdue' ? 'bg-red-100 text-red-700' :
                  friendData.status === 'almost due' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {friendData.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Interaction Type</p>
                <p className="font-medium text-gray-900">{type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Goal</p>
                <p className="font-medium text-gray-900">Every {friendData.goal} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Days Since Last Contact</p>
                <p className="font-medium text-gray-900">{friendData.days_since_contact} days</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">Bio</p>
              <p className="text-gray-700 italic">{friendData.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}