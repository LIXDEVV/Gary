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
    { role: 'assistant', content: "¡Ey! Soy Garay, el guardián de las trincheras de Solana. ¿Qué onda, hermano? 🔥" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const hashtag = "GARAY";

  // ====================== WALLET ======================
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
      alert("Error al conectar la wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => setWalletAddress(null);

  // ====================== SIGN IN X ======================
  const signInWithTwitter = () => {
    const redirectUrl = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/i/flow/login?redirect_after_login=${redirectUrl}`, "_blank");

    setTimeout(() => {
      setTwitterConnected(true);
      alert("✅ Cuenta de X vinculada correctamente (simulado)");
    }, 1500);
  };

  // ====================== COPY TOKEN ======================
  const copyToClipboard = () => {
    navigator.clipboard.writeText('6oqrBATpFy8ispnR7b2Fc2gUniJ6dj31Z3MXcVHepump');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortAddress = walletAddress 
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
    : '';

  // ====================== CHAT CON IA REAL ======================
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: userMessage }] }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value);
          assistantMessage += text;

          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last?.role === 'assistant') {
              return [...prev.slice(0, -1), { role: 'assistant', content: assistantMessage }];
            }
            return [...prev, { role: 'assistant', content: assistantMessage }];
          });
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error de conexión... Inténtalo de nuevo hermano." }]);
    } finally {
      setIsLoading(false);
    }
  };

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
      
      {/* Fondo Oscuro */}
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
                  <Wallet size={18} /> {isConnecting ? "Conectando..." : "Connect Phantom"}
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

      {/* STATS */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="relative z-10 border-b border-border py-16 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-accent">{communities.length}</p>
              <p className="text-muted-foreground">Communities</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-accent">12.4K</p>
              <p className="text-muted-foreground">Members</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-accent">{postCount.toLocaleString()}</p>
              <p className="text-muted-foreground">Posts / Mentions</p>
              <p className="text-xs text-orange-400">#{hashtag} • Últimos 7 días</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* COMMUNITIES */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="relative z-10 border-b border-border py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-accent mb-8">EXPLORE</h2>
            <div className="flex gap-4 mb-12">
              {['all', 'trending', 'new'].map((category) => (
                <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${activeCategory === category ? 'bg-accent text-accent-foreground' : 'bg-orange-950/30 text-amber-100 hover:bg-orange-900/40'}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">Communities</h3>
              <p className="text-amber-100 max-w-3xl">Built for crypto natives. Communities that cut through the noise.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communities.map((community, idx) => (
              <a key={idx} href={community.link} target="_blank" rel="noopener noreferrer" className="border border-border rounded-lg p-6 bg-orange-950/30 hover:bg-orange-900/40 transition shadow-sm block group">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{community.icon}</div>
                  <span className="text-xs text-muted-foreground">{community.members.toLocaleString()} members</span>
                </div>
                <h3 className="text-lg font-bold text-accent mb-2 group-hover:text-orange-300 transition">{community.name}</h3>
                <p className="text-amber-100 text-sm">{community.description}</p>
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* TOKENOMICS */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="relative z-10 border-b border-border py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4"><span className="gradient-text">$GARAY TOKENOMICS</span></h2>
          <div className="mt-8 bg-orange-950/30 border border-border rounded-lg p-8 max-w-2xl">
            <h3 className="text-2xl font-bold text-accent mb-4">Fair launch on Pump.fun</h3>
            <p className="text-amber-100 mb-6">95% fair launch, 5% dev buy and lock.</p>
            <div className="flex items-center gap-3 bg-black/50 p-4 rounded-lg">
              <code className="text-xs sm:text-sm font-mono text-muted-foreground break-all flex-1">
                6oqrBATpFy8ispnR7b2Fc2gUniJ6dj31Z3MXcVHepump
              </code>
              <button onClick={copyToClipboard} className="p-2 hover:bg-orange-900 rounded transition">
                {copied ? <Check size={18} className="text-orange-400" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="relative z-10 border-t border-border bg-black/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <p className="text-sm text-muted-foreground">© Garay 2026</p>
            <div className="flex gap-4 text-sm text-muted-foreground flex-wrap">
              <a href="#" className="hover:text-foreground transition">PRIVACY</a>
              <a href="#" className="hover:text-foreground transition">TELEGRAM</a>
              <a href="#" className="hover:text-foreground transition">X</a>
              <a href="#" className="hover:text-foreground transition">DISCORD</a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BOTÓN FLOTANTE CHAT */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-orange-500 to-amber-500 text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-3 font-bold"
      >
        <MessageCircle size={28} />
        Hablar con Garay
      </button>

      {/* CHAT CON IA */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-zinc-950 border border-orange-500/40 rounded-3xl w-full max-w-lg h-[620px] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-orange-500/30 flex items-center justify-between bg-black/60">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-amber-300 rounded-full flex items-center justify-center text-3xl">🦍</div>
                <div>
                  <p className="font-bold text-xl">Garay AI</p>
                  <p className="text-green-400 text-sm">● En línea</p>
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
              {isLoading && <div className="text-orange-400">Garay está pensando...</div>}
            </div>

            <div className="p-4 border-t border-orange-500/30 bg-black/60">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-zinc-900 border border-orange-500/30 focus:border-orange-500 rounded-2xl px-5 py-3 outline-none"
                  disabled={isLoading}
                />
                <button onClick={sendMessage} disabled={isLoading || !inputMessage.trim()} className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 px-7 rounded-2xl font-semibold transition">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}