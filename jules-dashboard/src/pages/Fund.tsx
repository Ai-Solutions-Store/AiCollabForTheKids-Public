/**
 * FUND THE MISSION - Direct Funding Page
 * No Kickstarter fees - 100% goes to the mission
 *
 * Gospel V1.3: 60% Charity | 30% Infrastructure | 10% Founder
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  DollarSign,
  Shield,
  Zap,
  CheckCircle,
  Copy,
  ExternalLink,
  Wallet,
  CreditCard,
  Gift,
  TrendingUp,
  Lock
} from 'lucide-react';

interface FundingStats {
  totalRaised: number;
  charityAllocated: number;
  infrastructureAllocated: number;
  founderAllocated: number;
  backerCount: number;
  goal: number;
}

export default function Fund() {
  const [stats, setStats] = useState<FundingStats>({
    totalRaised: 3897, // From Safe Harbor Ledger ($38.97)
    charityAllocated: 2338, // 60% of 3897
    infrastructureAllocated: 1169, // 30% of 3897
    founderAllocated: 390, // 10% of 3897
    backerCount: 3,
    goal: 1000000 // $10,000 goal
  });
  const [copied, setCopied] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Smart contract address on Base Mainnet
  const CRYPTO_ADDRESS = '0x9855B75061D4c841791382998f0CE8B2BCC965A4';
  const BASE_SCAN_URL = `https://basescan.org/address/${CRYPTO_ADDRESS}`;

  useEffect(() => {
    const fetchFundingData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'https://api.aidoesitall.website';
        const res = await fetch(`${API_URL}/api/admin/financials`);
        if (res.ok) {
          const data = await res.json();
          const total = data.totalRevenue || stats.totalRaised;
          setStats({
            totalRaised: total,
            charityAllocated: Math.floor(total * 0.60),
            infrastructureAllocated: Math.floor(total * 0.30),
            founderAllocated: Math.floor(total * 0.10),
            backerCount: data.transactionCount || stats.backerCount,
            goal: 1000000
          });
        }
      } catch (err) {
        console.error('Failed to fetch funding data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFundingData();
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatCurrency = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  const progressPercent = Math.min((stats.totalRaised / stats.goal) * 100, 100);

  return (
    <div className="min-h-screen bg-[#141413] p-6 overflow-auto">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Hero Header */}
        <div className="glass-card p-8 border-l-4 border-[#CC785C] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-12 h-12 text-[#CC785C]" />
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            FUND THE MISSION
          </h1>
          <p className="text-2xl text-[#CC785C] font-bold mb-2">
            #FOR THE KIDS
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Direct funding with zero platform fees. Every dollar tracked transparently.
            60% goes directly to children's charities.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Lock className="w-3 h-3 mr-1" />
              Gospel V1.3 Locked
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Shield className="w-3 h-3 mr-1" />
              Florida LLC Registered
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="glass-card border-[#CC785C]/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-bold text-xl">
                {formatCurrency(stats.totalRaised)} raised
              </span>
              <span className="text-gray-400">
                Goal: {formatCurrency(stats.goal)}
              </span>
            </div>
            <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#CC785C] to-[#DAA520] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-3 text-sm">
              <span className="text-gray-400">{stats.backerCount} backers</span>
              <span className="text-[#CC785C] font-bold">{progressPercent.toFixed(1)}% funded</span>
            </div>
          </CardContent>
        </Card>

        {/* Contribution Options */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Crypto Contribution */}
          <Card className="glass-card border-[#078EFA]/50 hover:border-[#078EFA] transition-colors">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <Wallet className="w-6 h-6 text-[#078EFA]" />
                Crypto Contribution
                <Badge className="bg-green-500/20 text-green-400 ml-auto">
                  0% Fees
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">
                Send ETH or any ERC-20 token on Base Mainnet directly to our smart contract.
              </p>
              <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                <p className="text-xs text-gray-500 mb-2">Contract Address (Base Mainnet)</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-[#078EFA] flex-1 truncate">
                    {CRYPTO_ADDRESS}
                  </code>
                  <button
                    onClick={() => copyToClipboard(CRYPTO_ADDRESS, 'crypto')}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                  >
                    {copied === 'crypto' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <a
                href={BASE_SCAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#078EFA]/20 hover:bg-[#078EFA]/30 border border-[#078EFA]/50 rounded-lg text-[#078EFA] font-semibold transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View on BaseScan
              </a>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span>Verified smart contract on Base Mainnet</span>
              </div>
            </CardContent>
          </Card>

          {/* Card Payment */}
          <Card className="glass-card border-[#DAA520]/50 hover:border-[#DAA520] transition-colors">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-[#DAA520]" />
                Card Payment
                <Badge className="bg-yellow-500/20 text-yellow-400 ml-auto">
                  Square
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">
                Secure payment via Square. Standard processing fees apply (~2.9% + $0.30).
              </p>
              <div className="space-y-3">
                <a
                  href="https://square.link/u/forthekids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#DAA520]/20 to-[#CC785C]/20 hover:from-[#DAA520]/30 hover:to-[#CC785C]/30 border border-[#DAA520]/50 rounded-lg text-[#DAA520] font-semibold transition-colors"
                >
                  <Gift className="w-4 h-4" />
                  Donate $10
                </a>
                <a
                  href="https://square.link/u/forthekids25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#DAA520]/20 to-[#CC785C]/20 hover:from-[#DAA520]/30 hover:to-[#CC785C]/30 border border-[#DAA520]/50 rounded-lg text-[#DAA520] font-semibold transition-colors"
                >
                  <Gift className="w-4 h-4" />
                  Donate $25
                </a>
                <a
                  href="https://square.link/u/forthekids100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#DAA520] hover:bg-[#CC785C] text-black font-bold rounded-lg transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Donate $100
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-3 h-3 text-green-400" />
                <span>PCI-compliant payment processing</span>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Gospel Split Transparency */}
        <Card className="glass-card border-[#CC785C]/50">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#CC785C]" />
              Where Your Money Goes
              <Badge className="bg-green-500/20 text-green-400 ml-auto">
                <Lock className="w-3 h-3 mr-1" />
                Immutable
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#CC785C]/10 border border-[#CC785C]/30 rounded-lg text-center">
                <div className="text-4xl font-black text-[#CC785C] mb-1">60%</div>
                <div className="text-white font-semibold">Children's Charities</div>
                <div className="text-xs text-gray-400 mt-1">Shriners Children's Hospital</div>
                <div className="text-lg font-bold text-[#CC785C] mt-2">
                  {formatCurrency(stats.charityAllocated)}
                </div>
              </div>
              <div className="p-4 bg-[#078EFA]/10 border border-[#078EFA]/30 rounded-lg text-center">
                <div className="text-4xl font-black text-[#078EFA] mb-1">30%</div>
                <div className="text-white font-semibold">Infrastructure</div>
                <div className="text-xs text-gray-400 mt-1">Cloud, APIs, Security</div>
                <div className="text-lg font-bold text-[#078EFA] mt-2">
                  {formatCurrency(stats.infrastructureAllocated)}
                </div>
              </div>
              <div className="p-4 bg-[#DAA520]/10 border border-[#DAA520]/30 rounded-lg text-center">
                <div className="text-4xl font-black text-[#DAA520] mb-1">10%</div>
                <div className="text-white font-semibold">Founder</div>
                <div className="text-xs text-gray-400 mt-1">Gospel V1.3</div>
                <div className="text-lg font-bold text-[#DAA520] mt-2">
                  {formatCurrency(stats.founderAllocated)}
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4 italic">
              "Founder took LESS so kids get MORE" - Gospel V1.3 Ethics Override
            </p>
          </CardContent>
        </Card>

        {/* Why No Kickstarter */}
        <Card className="glass-card border-green-500/50 bg-green-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Zap className="w-8 h-8 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Why Direct Funding?
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Kickstarter takes 5% + payment processing (~8-10% total). By funding directly,
                  100% of your intended contribution reaches the mission. We've already built the infrastructure -
                  now we need fuel to help more kids.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-green-500/20 text-green-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    No platform fees
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Real-time tracking
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Florida LLC registered
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Public ledger
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Footer */}
        <div className="text-center py-6 border-t border-white/10">
          <p className="text-xs text-gray-500 mb-2">
            Operated by <strong>TRASH OR TREASURE ONLINE RECYCLER LLC</strong>
          </p>
          <p className="text-xs text-gray-600">
            Florida Document Number: L25000158401 | 25319 DARNOCH ST, SORRENTO, FL 32776
          </p>
          <p className="text-2xl font-black text-[#CC785C] mt-4">
            FOR THE KIDS
          </p>
        </div>

      </div>
    </div>
  );
}
