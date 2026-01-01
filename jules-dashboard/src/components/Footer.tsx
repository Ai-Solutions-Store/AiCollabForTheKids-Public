import React from 'react';

/**
 * Footer Component
 * Displays legal entity information
 */

const Footer: React.FC = () => {
  return (
    <footer className="w-full backdrop-blur-xl bg-slate-900/40 border-t border-white/10 py-6 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Primary Legal Disclosure */}
        <div className="text-center mb-4">
          <p className="text-sm text-slate-300 font-medium">
            Operated by <span className="text-white font-bold">TRASH OR TREASURE ONLINE RECYCLER LLC</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Florida Document Number: L25000158401 | Address: 25319 DARNOCH ST, SORRENTO, FL 32776
          </p>
        </div>


        {/* Links & Contact */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-slate-400">
          <a href="mailto:support@youandinotai.com" className="hover:text-white transition-colors">
            Support
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 pt-4 border-t border-white/10">
          <p className="text-xs text-slate-600 mt-1">
            © {new Date().getFullYear()} TRASH OR TREASURE ONLINE RECYCLER LLC. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
