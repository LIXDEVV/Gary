'use client';

import { Copy, Check, Wallet, LogIn, MessageCircle, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Community {
  name: string;
  description: string;
  icon: string;
  members: number;
  link: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [postCount, setPostCount] = useState(342);

  // Chat States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey! I'm Garay, guardian of the Solana trenches. What's good, brother? 🔥" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const hashtag = "GARAY";

  // ====================== PREDEFINED RESPONSES ======================
  const predefinedResponses = [
    "In the trenches we learned that patience is the ultimate alpha.",
    "That's a solid mindset. Keep building, anon.",
    "Garay approves this message 🔥",
    "Real ones recognize real ones. What's your next move?",
    "The streets are watching. Stay dangerous.",
    "This is how legends are born.",
    "Solana summer never ended, we just went underground.",
    "You're speaking facts. Let's cook.",
    "Alpha detected.",
    "We don't chase, we attract.",
    "The pack is growing stronger every day.",
    "Keep that same energy, king.",
    "Wisdom from the trenches: focus on what matters.",
    "The future belongs to those who build it.",
    "Locked in. What's the play?"
  ];

  const sendMessage = () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage("");
    setIsLoading(true);

    setTimeout(() => {
      const randomResponse = predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsLoading(false);
    }, 800);
  };

  // Wallet Connection
  const connectWallet = async () => {
    if (!window.phantom?.solana) {
      alert("Phantom Wallet is not installed.\n\nDo you want to install it?");
      window.open("https://phantom.app/", "_blank");
      return;
    }
    try {
      setIsConnecting(true);
      const resp = await window.phantom.solana.connect();
      setWalletAddress(resp.publicKey.toString());
    } catch (error) {
      alert("Error connecting wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => setWalletAddress(null);

  const signInWithTwitter = () => {
    const redirectUrl = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/i/flow/login?redirect_after_login=${redirectUrl}`, "_blank");
    setTimeout(() => {
      setTwitterConnected(true);
      alert("✅ X account connected successfully (simulated)");
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('6oqrBATpFy8ispnR7b2Fc2gUniJ6dj31Z3MXcVHepump');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortAddress = walletAddress 
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
    : '';

  const communities: Community[] = [
    {
      name: 'Trading Signals',
      description: 'Alpha and trading strategies for crypto natives',
      icon: '📊',
      members: 1247,
      link: 'https://www.youtube.com/'
    },
    {
      name: 'AI Development',
      description: 'Building the future of AI with Garay',
      icon: '🤖',
      members: 892,
      link: 'https://www.youtube.com/'
    },
    {
      name: 'Web3 Builders',
      description: 'Connect with developers pushing Web3 forward',
      icon: '🔗',
      members: 3421,
      link: 'https://www.youtube.com/'
    },
    {
      name: 'DeFi Strategies',
      description: 'Advanced DeFi trading and yield farming',
      icon: '💰',
      members: 2156,
      link: 'https://www.youtube.com/'
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-black text-foreground overflow-hidden relative">
      
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fondo-tmsJd7kfCoNcXIbcuyGY6xgJjqInrI.png"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <div className="fixed inset-0 bg-black/75 z-[-1]" />

      <div className="fixed inset-0 opacity-30 pointer-events-none z-[-1]">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-amber-400 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-border bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">GARAY</span>
              <span className="text-xs text-muted-foreground">AI COMPANIONS</span>
            </div>

            <div className="flex items-center gap-3">
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="hidden sm:flex text-accent hover:text-orange-300 transition text-sm font-semibold">
                Share GARAY on X
              </a>

              {walletAddress ? (
                <button onClick={disconnectWallet} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold transition text-sm">
                  <Wallet size={18} /> {shortAddress}
                </button>
              ) : (
                <button onClick={connectWallet} disabled={isConnecting} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-6 py-2 rounded-lg font-semibold transition text-sm disabled:opacity-70">
                  <Wallet size={18} /> {isConnecting ? "Connecting..." : "Connect Phantom"}
                </button>
              )}

              <button onClick={signInWithTwitter} className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-orange-400 transition text-sm">
                <LogIn size={18} />
                {twitterConnected ? "✓ Connected" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <motion.section initial="hidden" animate="visible" variants={sectionVariants} className="relative z-10 min-h-screen flex flex-col items-center justify-center border-b border-border pt-20 pb-40">
        {/* Hero content same as before */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">The trenches,</span>
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold text-amber-100">regrouped.</h2>
          </div>
          <p className="text-amber-100 text-xl leading-relaxed max-w-3xl mx-auto">
            Home for crypto natives. Communities powered by Garay AI — share alpha, build your tribe, own your voice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Sign in with X
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-orange-300 transition font-semibold">
              Share GARAY on X
            </a>
          </div>
          <div className="relative h-96 md:h-[400px] flex items-center justify-center">
            <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/personaje-EsOAYFJWvB55rIN5aw317kenuGGXqu.png" alt="Garay" width={350} height={350} className="w-full max-w-sm h-auto drop-shadow-2xl" priority />
          </div>
        </div>
      </motion.section>

      {/* STATS, COMMUNITIES, TOKENOMICS, FOOTER (igual que antes) */}
      {/* ... (puedes copiar las secciones de la versión anterior o dime si las quieres completas) */}

      {/* FLOATING CHAT BUTTON */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-orange-500 to-amber-500 text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-3 font-bold"
      >
        <MessageCircle size={28} />
        Talk to Garay
      </button>

      {/* CHAT WINDOW WITH PREDEFINED RESPONSES */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-zinc-950 border border-orange-500/40 rounded-3xl w-full max-w-lg h-[620px] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-orange-500/30 flex items-center justify-between bg-black/60">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-amber-300 rounded-full flex items-center justify-center text-3xl">🦍</div>
                <div>
                  <p className="font-bold text-xl">Garay AI</p>
                  <p className="text-green-400 text-sm">● Online in the trenches</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-zinc-800 rounded-xl">
                <X size={26} />
              </button>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-black/40">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed ${
                    msg.role === 'user' ? 'bg-orange-500 text-black font-medium' : 'bg-zinc-900 border border-orange-500/20 text-amber-100'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-orange-400">Garay is thinking...</div>}
            </div>

            <div className="p-4 border-t border-orange-500/30 bg-black/60">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message to Garay..."
                  className="flex-1 bg-zinc-900 border border-orange-500/30 focus:border-orange-500 rounded-2xl px-5 py-3 outline-none"
                  disabled={isLoading}
                />
                <button 
                  onClick={sendMessage} 
                  disabled={isLoading || !inputMessage.trim()} 
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 px-7 rounded-2xl font-semibold transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}