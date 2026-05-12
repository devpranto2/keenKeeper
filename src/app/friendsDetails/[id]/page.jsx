'use client';

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import callIcon from '../../../../assets/call.png';
import textIcon from '../../../../assets/text.png';
import videoIcon from '../../../../assets/video.png';
import { MdDelete } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { HiMiniBellSnooze } from "react-icons/hi2";

export default function FriendDetails() {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    fetch('/friendsData.json')
      .then(res => res.json())
      .then(data => {
        const foundFriend = data.find(f => f.id === parseInt(id));
        setFriend(foundFriend);
      });
  }, [id]);

  const handleInteraction = (type) => {
    if (!friend) return;
    
    // Create interaction object
    const interaction = {
      id: Date.now(),
      type: type,
      friendData: friend,
      timestamp: new Date().toISOString()
    };
    
    // Get existing interactions from sessionStorage
    const existingInteractions = JSON.parse(sessionStorage.getItem('temp_interactions') || '[]');
    existingInteractions.push(interaction);
    sessionStorage.setItem('temp_interactions', JSON.stringify(existingInteractions));
    
    // Dispatch custom event to notify Timeline page
    window.dispatchEvent(new Event('interactionAdded'));
    
    // Show toast
    toast.success(`${type} with ${friend.name} logged!`);
  };

  if (!friend) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="min-h-screen bg-base-200 py-10">
        <div className="w-10/12 mx-auto grid md:grid-cols-3 gap-6">
          {/* Left Side */}
          <div className="space-y-4">
            <div className="card bg-white shadow-sm">
              <div className="card-body items-center text-center">
                <div className="avatar">
                  <div className="w-20 rounded-full">
                    <Image
                      src={friend.picture}
                      alt={friend.name}
                      width={80}
                      height={80}
                    />
                  </div>
                </div>

                <h2 className="text-xl font-bold">{friend.name}</h2>

                <div className="badge badge-error text-white">
                  {friend.status}
                </div>

                <div className="badge badge-success badge-outline">
                  {friend.tags[0]}
                </div>

                <p className="text-gray-500 italic text-sm">
                  {friend.bio}
                </p>
                <p>Email : {friend.email}</p>
              </div>
            </div>

            <button className="btn w-full bg-white border shadow-sm">
             <HiMiniBellSnooze /> Snooze 2 Weeks
            </button>

            <button className="btn w-full bg-white border shadow-sm">
             <FaBoxArchive /> Archive
            </button>

            <button className="btn w-full bg-white border shadow-sm text-red-500">
             <MdDelete /> Delete
            </button>
          </div>

          {/* Right Side */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="card bg-white shadow-sm">
                <div className="card-body text-center">
                  <h2 className="text-3xl font-bold text-black">
                    {friend.days_since_contact}
                  </h2>
                  <p className="text-gray-500 text-sm">Days Since Contact</p>
                </div>
              </div>

              <div className="card bg-white shadow-sm">
                <div className="card-body text-center">
                  <h2 className="text-3xl font-bold text-black">
                    {friend.goal}
                  </h2>
                  <p className="text-gray-500 text-sm">Goal (Days)</p>
                </div>
              </div>

              <div className="card bg-white shadow-sm">
                <div className="card-body text-center">
                  <h2 className="text-2xl font-bold text-black">
                    {friend.next_due_date}
                  </h2>
                  <p className="text-gray-500 text-sm">Next Due</p>
                </div>
              </div>
            </div>

            <div className="card bg-white shadow-sm">
              <div className="card-body flex flex-row justify-between items-center">
                <div className="py-4">
                  <h3 className="font-semibold">Relationship Goal</h3>
                  <p className="text-gray-500">
                    Connect every <span className="font-bold">{friend.goal} days</span>
                  </p>
                </div>
                <button className="btn btn-sm">Edit</button>
              </div>
            </div>

            <div className="card bg-white shadow-sm">
              <div className="card-body">
                <h3 className="font-semibold mb-4">Quick Check-In</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button 
                    onClick={() => handleInteraction('Call')}
                    className="btn h-24 bg-base-100 border flex-col"
                  >
                    <Image src={callIcon} alt="Call" width={24} height={24} />
                    Call
                  </button>

                  <button 
                    onClick={() => handleInteraction('Text')}
                    className="btn h-24 bg-base-100 border flex-col"
                  >
                    <Image src={textIcon} alt="Text" width={24} height={24} />
                    Text
                  </button>

                  <button 
                    onClick={() => handleInteraction('Video')}
                    className="btn h-24 bg-base-100 border flex-col"
                  >
                    <Image src={videoIcon} alt="Video" width={24} height={24} />
                    Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}