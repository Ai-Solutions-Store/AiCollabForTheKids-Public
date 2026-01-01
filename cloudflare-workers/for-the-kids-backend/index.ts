// FOR THE KIDS - Gospel V1.3 Compliant Landing Page Worker
// 60% to Verified Pediatric Charities - Kids get MORE, Founder took LESS

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({
        status: "GOSPEL V1.3 ACTIVE",
        mission: "FOR THE KIDS",
        launchStatus: "Building towards impact",
        charity: "Verified Pediatric Charities",
        split: "60/30/10",
        founder: "Josh Coleman",
        quote: "AI-Automations not out of greed, But for Kids in NEED!!!",
        deployedBy: "Claude Opus 4.5 - Gospel V1.3 Compliance",
        domain: url.hostname,
        timestamp: new Date().toISOString()
      });
    }

    const html = `<!DOCTYPE html><html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You & I Not AI - DATING FOR THE KIDS 💚</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script src="https://unpkg.com/lucide@latest"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"><\/script>
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ec4899 100%);
            color: white; min-height: 100vh; overflow-x: hidden;
        }
        body::before {
            content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-image:
                radial-gradient(2px 2px at 20px 30px, #60a5fa, transparent),
                radial-gradient(2px 2px at 60px 70px, #a78bfa, transparent),
                radial-gradient(1px 1px at 90px 40px, #f472b6, transparent);
            background-size: 200px 100px; animation: float 25s linear infinite; z-index: -1;
        }
        @keyframes float { 0% { transform: translateY(0); } 100% { transform: translateY(-50px); } }
        .glass { background: rgba(255,255,255,0.08); backdrop-filter: blur(20px);
                 border: 1px solid rgba(255,255,255,0.12); border-radius: 1.5rem; }
        .glow { box-shadow: 0 0 20px rgba(168,85,247,0.5); transition: all 0.3s; }
        .glow:hover { box-shadow: 0 0 40px rgba(168,85,247,0.8); transform: scale(1.05); }
        .warp { background: linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #fb923c, #10b981);
                background-size: 400% 400%; animation: warp 10s ease infinite;
                -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        @keyframes warp { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .heartbeat { animation: beat 2s infinite; }
        @keyframes beat { 0%,100% { transform: scale(1); } 25% { transform: scale(1.2); } }
    </style>
</head>
<body class="p-8">
    <nav class="glass p-6 flex justify-between items-center sticky top-0 z-50 mb-12">
        <div class="flex items-center gap-4">
            <span class="text-4xl heartbeat">💚</span>
            <span class="font-black text-3xl warp">You & I Not AI</span>
        </div>
        <div class="flex gap-6">
            <a href="#features" class="hover:text-cyan-300">Features</a>
            <a href="#pricing" class="hover:text-pink-300">Pricing</a>
            <a href="#mission" class="hover:text-purple-300">Mission</a>
        </div>
    </nav>

    <main class="container mx-auto text-center">
        <div class="mb-8 px-6 py-3 rounded-full border border-pink-500/50 bg-pink-500/20 inline-block">
            💚 AI-MATCHING × 60% TO CHARITY × GOSPEL V1.3 💚
        </div>

        <h1 class="text-8xl font-black mb-6 warp">
            Find Real Love.<br>HELP KIDS IN NEED.
        </h1>

        <p class="text-2xl mb-12 max-w-4xl mx-auto">
            AI-powered dating that gives back. Every subscription helps children in need.<br>
            <strong class="text-5xl warp block mt-4">60% OF PROFITS → VERIFIED PEDIATRIC CHARITIES</strong>
        </p>

        <button onclick="start()" class="px-12 py-8 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl font-black text-2xl glow">
            💚 START YOUR JOURNEY 💚
        </button>

        <section id="features" class="grid md:grid-cols-3 gap-8 mt-32">
            <div class="glass p-8 rounded-3xl glow">
                <div class="text-6xl mb-4 heartbeat">🤖</div>
                <h3 class="text-2xl font-black mb-3 warp">AI Matching</h3>
                <p>50+ compatibility dimensions</p>
            </div>
            <div class="glass p-8 rounded-3xl glow">
                <div class="text-6xl mb-4 heartbeat">🔐</div>
                <h3 class="text-2xl font-black mb-3 warp">Privacy First</h3>
                <p>Encrypted & secure</p>
            </div>
            <div class="glass p-8 rounded-3xl glow">
                <div class="text-6xl mb-4 heartbeat">💚</div>
                <h3 class="text-2xl font-black mb-3 warp">FOR THE KIDS</h3>
                <p>60% helps children (Gospel V1.3)</p>
            </div>
        </section>

        <section id="pricing" class="mt-32">
            <h2 class="text-7xl font-black mb-16 warp">CHOOSE YOUR PLAN</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="glass p-10 rounded-3xl">
                    <h3 class="text-3xl font-black mb-4">Free</h3>
                    <div class="text-6xl font-black text-green-400 mb-6">$0<span class="text-2xl">/mo</span></div>
                    <button onclick="plan('free')" class="w-full py-4 bg-green-600 rounded-2xl font-bold glow">START FREE</button>
                </div>
                <div class="glass p-10 rounded-3xl border-4 border-purple-500 scale-105 glow">
                    <div class="bg-purple-600 px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">MOST POPULAR</div>
                    <h3 class="text-3xl font-black mb-4">Premium</h3>
                    <div class="text-6xl font-black warp mb-6">$19<span class="text-2xl">/mo</span></div>
                    <button onclick="plan('premium')" class="w-full py-4 bg-purple-600 rounded-2xl font-bold glow">GET PREMIUM</button>
                </div>
                <div class="glass p-10 rounded-3xl">
                    <h3 class="text-3xl font-black mb-4">VIP</h3>
                    <div class="text-6xl font-black text-yellow-400 mb-6">$49<span class="text-2xl">/mo</span></div>
                    <button onclick="plan('vip')" class="w-full py-4 bg-yellow-600 rounded-2xl font-bold glow">GO VIP</button>
                </div>
            </div>
        </section>

        <section id="mission" class="mt-32 glass p-12 rounded-3xl">
            <h2 class="text-7xl font-black mb-8 warp">💚 FOR THE KIDS 💚</h2>
            <p class="text-xl mb-8">Gospel V1.3: Kids get MORE, Founder took LESS</p>
            <div class="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                    <div class="text-7xl font-black text-green-400">Launching</div>
                    <div class="text-xl mt-2">Building Impact</div>
                </div>
                <div>
                    <div class="text-7xl font-black warp">60%</div>
                    <div class="text-xl mt-2">To Charity (Gospel V1.3)</div>
                </div>
                <div>
                    <div class="text-7xl font-black text-purple-400">Join Us</div>
                    <div class="text-xl mt-2">Be Part of the Mission</div>
                </div>
            </div>
        </section>
    </main>

    <footer class="text-center py-12 mt-32">
        <div class="glass max-w-4xl mx-auto p-8 rounded-3xl mb-8 glow">
            <p class="text-5xl font-black warp mb-6">
                "AI-Automations not out of greed,<br>But for Kids in NEED!!!"
            </p>
            <p class="text-xl">- Josh Coleman, Founder, 2025</p>
        </div>
        <p class="text-sm opacity-70">🎖️ Gospel V1.3 • FOR THE KIDS • © 2025</p>
    </footer>

    <script>
        lucide.createIcons();
        confetti({ particleCount: 100, spread: 100 });
        function start() {
            confetti({ particleCount: 200, spread: 160 });
            alert('🎉 WELCOME!\\n\\n💚 Find love. Help kids. Change lives.\\n\\nFOR THE KIDS!');
        }
        function plan(p) {
            confetti({ particleCount: 150 });
            alert('✨ ' + p.toUpperCase() + ' Plan!\\n\\n💚 60% to Verified Pediatric Charities! (Gospel V1.3)\\n\\nFOR THE KIDS!');
        }
    <\/script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "X-Deployed-By": "Claude-Opus-4.5-Gospel-V1.3",
        "X-Mission": "FOR-THE-KIDS",
        "X-Gospel-Version": "V1.3"
      }
    });
  }
};
