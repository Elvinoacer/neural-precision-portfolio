export default function Footer() {
  return (
    <footer className="bg-gray-950 font-label-mono text-xs tracking-widest uppercase text-cyan-400 w-full py-12 border-t border-gray-800 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1280px] mx-auto px-6 mb-12">
        {/* Column 1: Brand & Socials */}
        <div className="flex flex-col gap-4">
          <div className="text-lg font-bold text-white">NEURAL_PRECISION</div>
          <p className="text-gray-500 normal-case tracking-normal text-sm font-body-md">
            Precision Data. Seamless Assistance.
          </p>
          <div className="flex gap-4 mt-2">
            <a
              className="text-gray-500 hover:text-cyan-300 transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              LinkedIn
            </a>
            <a
              className="text-gray-500 hover:text-cyan-300 transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              GitHub
            </a>
            <a
              className="text-gray-500 hover:text-cyan-300 transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Twitter
            </a>
            <a
              className="text-gray-500 hover:text-cyan-300 transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Email
            </a>
          </div>
        </div>
        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold mb-2">System.Links</h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                className="text-gray-500 hover:text-cyan-300 transition-colors opacity-80 hover:opacity-100"
                href="#"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-gray-500 hover:text-cyan-300 transition-colors opacity-80 hover:opacity-100"
                href="#services"
              >
                Services
              </a>
            </li>
            <li>
              <a
                className="text-gray-500 hover:text-cyan-300 transition-colors opacity-80 hover:opacity-100"
                href="#tools"
              >
                Tools
              </a>
            </li>
            <li>
              <a
                className="text-gray-500 hover:text-cyan-300 transition-colors opacity-80 hover:opacity-100"
                href="#why-choose-us"
              >
                Why Me
              </a>
            </li>
            <li>
              <a
                className="text-cyan-400 hover:text-cyan-300 transition-colors opacity-80 hover:opacity-100"
                href="#contact"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* Column 3: Status */}
        <div className="flex flex-col gap-4 items-start md:items-end">
          <h4 className="text-white font-bold mb-2 text-left md:text-right w-full">
            System.Status
          </h4>
          <div className="inline-flex items-center gap-2 bg-tertiary-container/10 border border-tertiary-container/30 px-3 py-1.5 rounded-DEFAULT">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="text-tertiary normal-case tracking-normal font-body-md font-semibold text-sm">
              Available for Projects
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800/50 pt-8 max-w-[1280px] mx-auto px-6 text-center text-gray-500">
        © 2024 NEURAL PRECISION. DATA-DRIVEN EXCELLENCE.
      </div>
    </footer>
  );
}
