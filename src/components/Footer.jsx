import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-300 h-[100px]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center md:py-8 justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Evalwell care. All rights reserved.
        </p>
      </div>
    </footer>
  );
}