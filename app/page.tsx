'use client';

import { Copy, Check } from 'lucide-react';
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText('6oqrBATpFy8ispnR7b2Fc2gUniJ6dj31Z3MXcVHepump');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    },
    {
      name: 'NFT Collectors',
      description: 'Discover and discuss digital art and NFTs',
      icon: '🎨',
      members: 1834,
      link: 'https://www.youtube.com/'
    },
    {
      name: 'Metaverse',
      description: 'Explore virtual worlds and metaverse projects',
      icon: '🌐',
      members: 956,
      link: 'https://www.youtube.com/'
    }
  ];

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

      {/* Navigation */}
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
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="bg-accent text-accent-foreground px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition text-sm">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center border-b border-border pt-20 pb-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">The trenches,</span>
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold text-amber-100">
              regrouped.
            </h2>
          </div>

          <p className="text-amber-100 text-xl leading-relaxed max-w-3xl mx-auto">
            Home for crypto natives. Communities powered by Garay AI — share alpha, build your tribe, own your voice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Sign in with X
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-orange-300 transition font-semibold">
              Share GARAY on X
            </a>
          </div>

          <div className="relative h-96 md:h-[400px] flex items-center justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/personaje-EsOAYFJWvB55rIN5aw317kenuGGXqu.png"
              alt="Garay"
              width={350}
              height={350}
              className="w-full max-w-sm h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 border-b border-border py-16 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-accent">0</p>
              <p className="text-muted-foreground">Communities</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-accent">0</p>
              <p className="text-muted-foreground">Members</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-accent">0</p>
              <p className="text-muted-foreground">Posts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="relative z-10 border-b border-border py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-accent mb-8">EXPLORE</h2>
            
            <div className="flex gap-4 mb-12">
              {['all', 'trending', 'new'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                    activeCategory === category
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-orange-950/30 text-amber-100 hover:bg-orange-900/40'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">Communities</h3>
              <p className="text-amber-100 max-w-3xl">
                Built for crypto natives. Communities that cut through the noise. No scammers. No hype loops. Just aligned people, building the future, together.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community, idx) => (
              <a 
                key={idx}
                href={community.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border rounded-lg p-6 bg-orange-950/30 hover:bg-orange-900/40 transition shadow-sm block group"
              >
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
      </section>

      {/* Tokenomics Section */}
      <section className="relative z-10 border-b border-border py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">$GARAY TOKENOMICS</span>
          </h2>
          
          <div className="mt-8 bg-orange-950/30 border border-border rounded-lg p-8 max-w-2xl">
            <h3 className="text-2xl font-bold text-accent mb-4">Fair launch on Pump.fun, home of the Solana network.</h3>
            <p className="text-amber-100 mb-6">
              95% fair launch, 5% dev buy and lock.
            </p>
            
            <div className="flex items-center gap-3 bg-black/50 p-4 rounded-lg">
              <code className="text-xs sm:text-sm font-mono text-muted-foreground break-all flex-1">
                6oqrBATpFy8ispnR7b2Fc2gUniJ6dj31Z3MXcVHepump
              </code>
              <button 
                onClick={copyToClipboard}
                className="p-2 hover:bg-orange-900 rounded transition flex-shrink-0"
                title="Copy contract address"
              >
                {copied ? <Check size={18} className="text-orange-400" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 border-t border-border bg-black/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-sm text-muted-foreground">© Garay 2026</p>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground flex-wrap">
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">PRIVACY</a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">TELEGRAM</a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">X</a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">DISCORD</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
