'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/friendsData.json')
      .then(res => res.json())
      .then(data => {
        setFriends(data);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
        
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#1f5b4a] border-t-transparent"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading friends...</p>
          <p className="text-sm text-gray-400 mt-2">Please wait while we fetch your connections</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <main className="bg-[#f8fafc]">
        <div className="py-10 px-6">
          <div className="w-10/12 mx-auto text-center">

            {/* Heading */}
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Friends to keep close in your life
            </h1>

            {/* Description */}
            <p className="max-w-xl mx-auto text-sm text-gray-500 mb-8 leading-relaxed">
              Your personal shelf of meaningful connections. Browse, tend, <br></br>
              and nurture the relationships that matter most.
            </p>

            {/* Button */}
            <button className="btn bg-[#1f5b4a] hover:bg-[#17473b] text-white border-none mb-12">
              <FaPlus /> Add a Friend
            </button>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <div className="card bg-white shadow-sm border-gray-50">
                <div className="card-body items-center text-center py-6">
                  <h2 className="text-4xl font-bold text-[#1f5b4a]">{friends.length}</h2>
                  <p className="text-gray-500">Total Friends</p>
                </div>
              </div>

              <div className="card bg-white shadow-sm border-gray-50">
                <div className="card-body items-center text-center py-6">
                  <h2 className="text-4xl font-bold text-[#1f5b4a]">
                    {friends.filter(f => f.status === 'on-track').length}
                  </h2>
                  <p className="text-gray-500">On Track</p>
                </div>
              </div>

              <div className="card bg-white shadow-sm border-gray-50">
                <div className="card-body items-center text-center py-6">
                  <h2 className="text-4xl font-bold text-[#1f5b4a]">
                    {friends.filter(f => f.status === 'overdue' || f.status === 'almost due').length}
                  </h2>
                  <p className="text-gray-500">Need Attention</p>
                </div>
              </div>

              <div className="card bg-white shadow-sm border-gray-50">
                <div className="card-body items-center text-center py-6">
                  <h2 className="text-4xl font-bold text-[#1f5b4a]">12</h2>
                  <p className="text-gray-500">Interactions This Month</p>
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <div className="border-gray-300 mt-10"></div>

          </div>
        </div>

        {/* Friends Grid Section */}
        <div className="w-10/12 mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold mb-10 text-slate-800">
            My Friends ({friends.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {friends.map(friend => (
              <Link
                href={`/friendsDetails/${friend.id}`}
                key={friend.id}
                className="card bg-white shadow-md rounded-xl border border-gray-100 hover:shadow-xl transition transform hover:-translate-y-1 duration-300"
              >
                <div className="card-body items-center text-center py-8">
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <Image
                        src={friend.picture}
                        alt={friend.name}
                        width={96}
                        height={96}
                        className="rounded-full"
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mt-4">
                    {friend.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {friend.days_since_contact}d ago
                  </p>

                  <div className="badge badge-success text-white mt-3">
                    {friend.tags[0]}
                  </div>

                  {friend.status === 'overdue' && (
                    <div className="badge badge-error mt-4 text-white">
                      {friend.status}
                    </div>
                  )}

                  {friend.status === 'almost due' && (
                    <div className="badge badge-warning mt-4 text-white">
                      {friend.status}
                    </div>
                  )}

                  {friend.status === 'on-track' && (
                    <div className="badge badge-success mt-4 text-white">
                      {friend.status}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <ToastContainer />
      </main>
    </div>
  );
}