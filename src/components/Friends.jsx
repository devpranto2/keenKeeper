'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('/friendsData.json');
        const data = await response.json();
        setFriends(data.slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <div className="w-10/12 mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold  mb-10 text-slate-800">
        My Friends
      </h2>

      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-8">
        {friends.map((friend) => (
          <Link
            href='/friendsDetails'
            key={friend.id}
            className="card bg-white shadow-md rounded-xl border border-gray-100 hover:shadow-xl transition"
          >
            <div className="card-body items-center text-center py-8">
              
              {/* Avatar */}
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <Image
                    src={friend.picture}
                    alt={friend.name}
                    width={96}
                    height={96}
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-2xl font-bold text-slate-800 mt-4">
                {friend.name}
              </h3>

              {/* Days */}
              <p className="text-gray-400 text-sm">
                {friend.days_since_contact}d ago
              </p>

              {/* Tag */}
              <div className="badge badge-success badge-outline mt-3 px-4 py-3 uppercase">
                {friend.tags[0]}
              </div>

              {/* Status */}
              <div
                className={`badge mt-4 px-4 py-3 text-white capitalize ${
                  friend.status === 'overdue'
                    ? 'badge-error'
                    : friend.status === 'almost due'
                    ? 'badge-warning'
                    : 'badge-success'
                }`}
              >
                {friend.status}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}