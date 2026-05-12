'use client'

import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-6">
            <div className="text-center max-w-xl">

                {/* Error Code */}
                <h1 className="text-8xl md:text-9xl font-bold text-[#138968]">
                    404
                </h1>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-4">
                    Oops! Page Not Found
                </h2>

                {/* Description */}
                <p className="text-gray-500 mt-4 leading-relaxed">
                    The page you are looking for might have been removed,
                    renamed, or is temporarily unavailable.
                </p>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
                    <Link href="/">
                        <button className="btn bg-[#138968] hover:bg-[#0f6d54] text-white border-none">
                            Go Home
                        </button>
                    </Link>

    
                </div>

               

            </div>
        </div>
    );
};

export default NotFound;