/**
 * ============================================
 * File: components/layout/Footer.jsx
 * ============================================
 * Modification Reason: v2.4 - 2026 social icon and protocol link polish.
 *   Updated the X social icon away from the legacy Twitter bird and tuned the
 *   developer/resource labels so the footer feels current and protocol-first.
 *
 * Historical Notes:
 * v2.3 - Footer control geometry polish.
 *   Footer brand, column links, and legal links now keep a consistent minimum
 *   interaction size so the final page section feels as deliberate as the
 *   hero and protocol modules on touch devices.
 *
 * Historical Notes:
 * v2.1 — Protocol-first IA alignment.
 *   Footer links now point to the new MemChain and Privacy Network secondary
 *   pages while the brand blurb describes AeroNyx as the encrypted
 *   coordination protocol for humans, apps, and autonomous agents.
 *
 *   v2.0 — Bug fix + premium alignment pass.
 *   1. FIX: contact link pointed to http://mail.google.com/ (opened the
 *      Gmail homepage, not a compose window). Now mailto:hi@aeronyx.network
 *      — works with the user's default mail client on every platform.
 *   2. Surface alignment: bg-neutral-900 → surface-0 with weak line
 *      borders (matches globals.css v3.0 system).
 *   3. Type: font-bold/semibold → font-medium; column headings use the
 *      eyebrow style (small caps tracking) — heavy footer type reads
 *      as dated.
 *   4. Social buttons: circles → 4px squares (sharp geometry rule);
 *      unused Discord/LinkedIn icon components removed (recover from
 *      version history if those channels launch).
 *
 * Main Functionality:
 *   - Site footer: brand blurb, social links, three link columns,
 *     legal row.
 *
 * Dependencies:
 *   - components/ui/Container, components/ui/AeroNyxLogo
 *   - next/link
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Keep mailto: for the contact address; never link a webmail
 *     provider's homepage.
 *   - External links use <a target=_blank rel=noopener>; internal
 *     routes use next/link.
 *
 * Last Modified: v2.2 — Footer link tap-target polish
 * Last Modified: v2.3 - Consistent footer hit areas and link formatting
 * Last Modified: v2.4 - X icon and protocol link polish
 * ============================================
 */

import Link from 'next/link';
import Container from '../ui/Container';
import AeroNyxLogo from '../ui/AeroNyxLogo';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-14 md:py-16" style={{ background: 'var(--surface-0, #08080D)' }}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 inline-flex min-h-[44px] items-center space-x-2">
              <span className="h-10 w-10 flex items-center justify-center">
                <AeroNyxLogo width={40} height={40} />
              </span>
              <span className="text-xl font-light">AeroNyx</span>
            </Link>
            <p className="text-white/55 mb-6 max-w-md text-sm leading-relaxed">
              AeroNyx is the encrypted coordination layer for humans, apps, and
              autonomous agents: private routing, encrypted messages, node-blind
              memory, and blind protocol services.
            </p>
            <div className="flex space-x-3">
              <SocialLink href="https://twitter.com/AeroNyxNetwork" label="AeroNyx on X" icon={<XIcon />} />
              <SocialLink href="https://github.com/AeroNyxNetwork" label="AeroNyx on GitHub" icon={<GithubIcon />} />
            </div>
          </div>

          <FooterColumn
            heading="Products"
            links={[
              { href: '/privacy-network', label: 'Privacy Network' },
              { href: '/memchain', label: 'MemChain' },
              { href: 'https://docs.aeronyx.network/developer-documentation/overview', label: 'Developer Docs' },
              { href: 'https://app.aeronyx.network/', label: 'Nodeboard' },
            ]}
          />

          <FooterColumn
            heading="Resources"
            links={[
              { href: 'https://docs.aeronyx.network/', label: 'Documentation' },
              { href: 'https://docs.aeronyx.network/aeronyx-whitepaper/technical-white-paper', label: 'Whitepaper' },
              { href: 'https://github.com/AeroNyxNetwork', label: 'GitHub' },
              { href: 'https://app.aeronyx.network/', label: 'App' },
            ]}
          />

          <FooterColumn
            heading="About"
            links={[
              { href: 'https://twitter.com/AeroNyxNetwork', label: 'X' },
              { href: 'https://t.me/AeroNyxNetwork', label: 'Telegram' },
              { href: 'https://docs.aeronyx.network/media-resources', label: 'Press Kit' },
              { href: 'mailto:hi@aeronyx.network', label: 'hi@aeronyx.network' }, // v2.0 fix
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-white/35 text-sm">
            © {new Date().getFullYear()} AeroNyx Network. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href="https://docs.aeronyx.network/articles/aeronyx-privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center text-sm text-white/35 hover:text-white transition-colors duration-fast"
            >
              Privacy Policy
            </a>
            <a
              href="https://docs.aeronyx.network/articles/aeronyx-user-agreement"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center text-sm text-white/35 hover:text-white transition-colors duration-fast"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

const FooterColumn = ({ heading, links }) => (
  <div>
    <h4 className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-4">{heading}</h4>
    <ul className="space-y-2">
      {links.map((link, index) => {
        const external = link.href.startsWith('http') || link.href.startsWith('mailto:');
        return (
          <li key={index}>
            {external ? (
              <a
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="inline-flex min-h-[44px] items-center text-sm text-white/55 hover:text-white transition-colors duration-fast"
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="inline-flex min-h-[44px] items-center text-sm text-white/55 hover:text-white transition-colors duration-fast">
                {link.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

const SocialLink = ({ href, label, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-11 w-11 items-center justify-center rounded border border-white/10 bg-white/[0.03] text-white/55 hover:border-brand-line hover:bg-brand-faint hover:text-white transition-colors duration-fast"
  >
    {icon}
  </a>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8.2 4H4L10.8 12M15.8 20H20L13.2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 22.0001V18.1301C16.0375 17.6532 15.9731 17.1739 15.811 16.7239C15.6489 16.2738 15.3929 15.8635 15.06 15.5201C18.2 15.1701 21.5 14.0001 21.5 8.52006C21.4997 7.12389 20.9627 5.78126 20 4.77006C20.4559 3.54857 20.4236 2.19841 19.91 1.00006C19.91 1.00006 18.73 0.65006 16 2.48006C13.708 1.85888 11.292 1.85888 9 2.48006C6.27 0.65006 5.09 1.00006 5.09 1.00006C4.57638 2.19841 4.54414 3.54857 5 4.77006C4.03013 5.78876 3.49252 7.14352 3.5 8.55006C3.5 13.9701 6.8 15.1401 9.94 15.5501C9.611 15.89 9.35726 16.2955 9.19531 16.74C9.03335 17.1845 8.96681 17.658 9 18.1301V22.0001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 18.0001C4.49 20.0001 4 16.5001 2 16.0001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Footer;
