import Link from 'next/link';
import Container from '../ui/Container';
import AeroNyxLogo from '../ui/AeroNyxLogo';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              {/* Replace the logo with the new AeroNyx SVG logo */}
              <span className="h-10 w-10 flex items-center justify-center">
                <AeroNyxLogo width={40} height={40} />
              </span>
              <span className="text-xl font-bold">AeroNyx</span>
            </Link>
            <p className="text-neutral-300 mb-6 max-w-md">
              AeroNyx Network is building the foundation for privacy-first decentralized computing, 
              empowering billions of devices to securely share resources in a global marketplace.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://twitter.com/AeroNyxNetwork" icon={<TwitterIcon />} />
              <SocialLink href="https://github.com/AeroNyxNetwork" icon={<GithubIcon />} />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <FooterLinks 
              links={[
                { href: 'https://docs.aeronyx.network/developer-documentation/overview', label: 'Privacy SDK' },
                { href: 'https://app.aeronyx.network/', label: 'Resource Marketplace' },
                { href: 'https://app.aeronyx.network/', label: 'AI Infrastructure' },
                { href: 'https://docs.aeronyx.network/decentralized-node-documentation', label: 'Decentralized Nodes' }
              ]}
            />
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <FooterLinks 
              links={[
                { href: 'https://docs.aeronyx.network/', label: 'Documentation' },
                { href: 'https://docs.aeronyx.network/aeronyx-whitepaper/technical-white-paper', label: 'Whitepaper' },
                { href: 'https://github.com/AeroNyxNetwork', label: 'GitHub' },
                { href: 'https://app.aeronyx.network/', label: 'App' }
              ]}
            />
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <FooterLinks 
              links={[
                { href: 'https://twitter.com/AeroNyxNetwork', label: 'X' },
                { href: 'https://t.me/AeroNyxNetwork', label: 'Telegram' },
                { href: 'hi@aeronyx.network', label: 'Contact' },
                { href: 'https://docs.aeronyx.network/media-resources', label: 'Press Kit' }
              ]}
            />
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} AeroNyx Network. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

const FooterLinks = ({ links }) => {
  return (
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <Link 
            href={link.href}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const SocialLink = ({ href, icon }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-10 w-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
    >
      {icon}
    </a>
  );
};

// Social Icons
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60512 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 22.0001V18.1301C16.0375 17.6532 15.9731 17.1739 15.811 16.7239C15.6489 16.2738 15.3929 15.8635 15.06 15.5201C18.2 15.1701 21.5 14.0001 21.5 8.52006C21.4997 7.12389 20.9627 5.78126 20 4.77006C20.4559 3.54857 20.4236 2.19841 19.91 1.00006C19.91 1.00006 18.73 0.65006 16 2.48006C13.708 1.85888 11.292 1.85888 9 2.48006C6.27 0.65006 5.09 1.00006 5.09 1.00006C4.57638 2.19841 4.54414 3.54857 5 4.77006C4.03013 5.78876 3.49252 7.14352 3.5 8.55006C3.5 13.9701 6.8 15.1401 9.94 15.5501C9.611 15.89 9.35726 16.2955 9.19531 16.74C9.03335 17.1845 8.96681 17.658 9 18.1301V22.0001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 18.0001C4.49 20.0001 4 16.5001 2 16.0001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 11C16 10.4477 15.5523 10 15 10C14.4477 10 14 10.4477 14 11C14 11.5523 14.4477 12 15 12C15.5523 12 16 11.5523 16 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.09 17.5C10.19 18.31 12.67 19.43 15 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.27 6.18C19.7869 7.95575 20.0633 9.80332 20.09 11.66C20.09 15.56 18.37 17.32 17.47 18.12C17.47 18.12 17.47 18.12 17.47 18.12C16.3 19.21 13.92 20.22 11.47 20.22C9.01996 20.22 7.09996 19.31 5.50996 18.12C4.70996 17.42 3.10996 15.66 3.10996 11.66C3.14461 9.7834 3.45335 7.92731 4.01996 6.15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.33997 6.17C8.33997 6.17 9.35997 5 11.98 5C14.6 5 15.66 6.17 15.66 6.17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Footer;
