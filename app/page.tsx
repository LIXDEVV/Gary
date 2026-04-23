'use client';

import { Copy, Check, Wallet } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface Community {
  name: string;
  description: string;
  icon: string;
  members: number;
  link: string;
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // === CONEXIÓN PHANTOM WALLET ===
  const connectWallet = async () => {
    if (!window.phantom?.solana) {
      alert("Phantom Wallet no está instalada.\n\n¿Quieres instalarla ahora?");
      window.open("https://phantom.app/", "_blank");
      return;
    }

    try {
      setIsConnecting(true);
      const resp = await window.phantom.solana.connect();
      setWalletAddress(resp.publicKey.toString());
    } catch (error) {
      console.error(error);
      alert("Error al conectar la wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    window.phantom?.solana?.disconnect();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('6oqrBATpFy8ispnR7b2Fc2gUniJ6dj31Z3MXcVHepump');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortAddress = walletAddress 
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
    : '';

  const communities: Community[] = [ /* ... mismo array que tenías ... */ ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#e8f5f1] to-background text-foreground overflow-hidden relative">
      {/* Background image */}
      <div className="fixed inset-0 pointer-events-none">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fondo-tmsJd7kfCoNcXIbcuyGY6xgJjqInrI.png"
          alt="Background"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      {/* Background elements */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-15"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-amber-400 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Navigation - BOTÓN WALLET AQUÍ */}
      <nav className="relative z-50 border-b border-border bg-black/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">GARAY</span>
              <span className="text-xs text-muted-foreground">AI COMPANIONS</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hidden sm:flex text-accent hover:text-orange-300 transition text-sm font-semibold">
                Share GARAY on X
              </a>

              {/* === BOTÓN PHANTOM WALLET === */}
              {walletAddress ? (
                <button
                  onClick={disconnectWallet}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold transition text-sm"
                >
                  <Wallet size={18} />
                  {shortAddress}
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-6 py-2 rounded-lg font-semibold transition text-sm disabled:opacity-70"
                >
                  <Wallet size={18} />
                  {isConnecting ? "Conectando..." : "Connect Phantom"}
                </button>
              )}

              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="bg-accent text-accent-foreground px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition text-sm">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* El resto de tu código (Hero, Stats, Communities, Tokenomics, Footer) queda exactamente igual */}
      {/* ... (pega aquí todo el resto que tenías desde el Hero hasta el Footer) ... */}

    </div>
  );
}