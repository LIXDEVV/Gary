'use client';

import { Wallet, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Conectar Phantom Wallet
  const connectWallet = async () => {
    if (!window.phantom?.solana) {
      alert("Phantom Wallet no está instalada.\n\n¿Quieres abrir la página para instalarla?");
      window.open("https://phantom.app/", "_blank");
      return;
    }

    try {
      setIsConnecting(true);
      const resp = await window.phantom.solana.connect();
      const address = resp.publicKey.toString();
      setWalletAddress(address);
      console.log("Wallet conectada:", address);
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

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shortAddress = walletAddress 
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
    : '';

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-orange-500/20 bg-black/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              GARAY
            </span>
            <span className="text-sm text-orange-400/70">AI COMPANIONS</span>
          </div>

          {/* Botón Wallet en Nav */}
          {walletAddress ? (
            <button
              onClick={disconnectWallet}
              className="flex items-center gap-2 bg-green-600/90 hover:bg-green-600 px-5 py-2.5 rounded-xl font-medium transition-all"
            >
              <Wallet size={18} />
              {shortAddress}
            </button>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-6 py-2.5 rounded-xl font-semibold transition-all disabled:opacity-70"
            >
              <Wallet size={18} />
              {isConnecting ? "Conectando..." : "Connect Phantom"}
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-7xl font-bold mb-6">GARAY AI</h1>
          <p className="text-2xl text-orange-300 mb-10">Comunidades Inteligentes en Solana</p>

          {/* Botón grande en Hero */}
          {!walletAddress && (
            <button
              onClick={connectWallet}
              className="mt-8 bg-white text-black text-xl px-10 py-4 rounded-2xl font-bold hover:bg-orange-400 transition flex items-center gap-3 mx-auto"
            >
              <Wallet className="w-7 h-7" />
              Connect Wallet to Join the Pack
            </button>
          )}

          {walletAddress && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={copyAddress}
                className="flex items-center gap-2 bg-zinc-900 border border-orange-500 px-6 py-3 rounded-xl text-orange-400"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {shortAddress}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Resto de tu página (token address, comunidades, etc.) */}
      {/* ... pega aquí el resto de tu código original ... */}

    </div>
  );
}