"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FaGithub } from "react-icons/fa"

export default function Header() {
  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-white/10
        bg-black/40 backdrop-blur-xl
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left */}
        <div className="flex items-center gap-4">
          
          {/* Logo */}
          <div
            className="
              h-11 w-11 rounded-2xl
              bg-gradient-to-br from-blue-500 to-indigo-600
              flex items-center justify-center
              shadow-lg shadow-blue-500/20
            "
          >
            <span className="text-white font-black text-lg">
              T
            </span>
          </div>

          {/* Brand */}
          <div>
            <h1
              className="
                text-2xl font-black tracking-tight
                text-white
              "
            >
              tsender
            </h1>

            <p className="text-sm text-gray-400">
              ERC20 Airdrop Protocol
            </p>
          </div>

          {/* GitHub */}
          <a
            href="https://github.com/cyfrin/Tsender"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="
              ml-2 p-2 rounded-xl
              bg-white/5
              border border-white/10
              text-gray-300
              hover:text-white
              hover:bg-white/10
              transition-all duration-200
            "
          >
            <FaGithub size={20} />
          </a>
        </div>

        {/* Right */}
        <div className="scale-[0.98]">
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}