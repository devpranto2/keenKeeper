import Image from 'next/image';
import React from 'react';
import insta from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import tweeter from '../../assets/twitter.png';

const Footer = () => {
    return (
        <footer className="bg-[#244d3f] text-white py-14">
            <div className="max-w-6xl mx-auto px-6 text-center">

                {/* Title */}
                <h1 className="text-5xl font-bold mb-4">KeenKeeper</h1>

                {/* Description */}
                <p className="max-w-2xl mx-auto text-gray-200 leading-relaxed mb-8">
                    Your personal shelf of meaningful connections. Browse, tend,
                    and nurture the relationships that matter most.
                </p>

                {/* Social */}
                <div className="mb-10">
                    <h3 className="text-xl font-semibold mb-5">
                        Social Links
                    </h3>

                    <div className="flex justify-center gap-4">
                        <a href="#" className="btn btn-circle bg-white border-none hover:bg-gray-200">
                            <Image
                                src={insta}
                                alt="Instagram"
                                width={20}
                                height={20}
                            />
                        </a>

                        <a href="#" className="btn btn-circle bg-white border-none hover:bg-gray-200">
                            <Image
                                src={facebook}
                                alt="Facebook"
                                width={20}
                                height={20}
                            />
                        </a>

                        <a href="#" className="btn btn-circle bg-white border-none hover:bg-gray-200">
                            <Image
                                src={tweeter}
                                alt="Twitter"
                                width={20}
                                height={20}
                            />
                        </a>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-200">
                    <p>© 2026 KeenKeeper. All rights reserved.</p>

                    <div className="flex gap-6">
                        <a href="#" className="link link-hover text-white">
                            Privacy Policy
                        </a>
                        <a href="#" className="link link-hover text-white">
                            Terms of Service
                        </a>
                        <a href="#" className="link link-hover text-white">
                            Cookies
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;