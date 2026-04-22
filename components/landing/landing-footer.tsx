import Link from "next/link";
import {
  landingFooterContact,
  landingFooterQuickLinks,
  landingFooterResources,
  landingFooterSocials,
} from "@/lib/landing-data";

type SocialIconProps = {
  className?: string;
};

function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="5" />
      <circle cx="12" cy="12" r="4.15" />
      <circle cx="17.25" cy="6.75" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GitHubIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.55-3.9-1.55-.53-1.33-1.29-1.69-1.29-1.69-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.05 1.8 2.74 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.57-.29-5.27-1.29-5.27-5.74 0-1.26.45-2.28 1.2-3.09-.12-.3-.52-1.5.11-3.14 0 0 .97-.31 3.17 1.18a10.99 10.99 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.64.23 2.84.11 3.14.75.81 1.2 1.83 1.2 3.09 0 4.46-2.7 5.44-5.28 5.73.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

const socialIconMap = {
  Instagram: InstagramIcon,
  GitHub: GitHubIcon,
} as const;

export function LandingFooter() {
  return (
    <footer id="contact" data-section className="mt-16 border-t-2 border-slate-700 bg-[#0a1018] text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-slate-700/80 pb-6">
          <p data-stagger className="font-heading text-2xl tracking-tight text-slate-50">
            Readora.
          </p>
          <p data-stagger className="text-sm text-slate-400">
            Modern reading for curious minds.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div data-stagger className="space-y-5">
            <p className="text-xs font-semibold tracking-[0.22em] text-emerald-400 uppercase">Navigate</p>
            <ul className="space-y-3">
              {landingFooterQuickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[15px] text-slate-200 transition-colors hover:text-emerald-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-stagger className="space-y-5">
            <p className="text-xs font-semibold tracking-[0.22em] text-slate-400 uppercase">Resources</p>
            <ul className="space-y-3">
              {landingFooterResources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[15px] text-slate-300 transition-colors hover:text-slate-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-stagger className="space-y-5">
            <p className="text-xs font-semibold tracking-[0.22em] text-slate-400 uppercase">Contact</p>
            <ul className="space-y-3 text-[15px] text-slate-300">
              {landingFooterContact.phones.map((phone) => (
                <li key={phone}>{phone}</li>
              ))}
              <li>{landingFooterContact.email}</li>
              <li>{landingFooterContact.location}</li>
              <li>{landingFooterContact.hours}</li>
            </ul>
          </div>

          <div data-stagger className="space-y-5">
            <p className="text-xs font-semibold tracking-[0.22em] text-slate-400 uppercase">Follow</p>
            <div className="flex items-center gap-3">
              {landingFooterSocials.map((social) => {
                const Icon = socialIconMap[social.label as keyof typeof socialIconMap];

                if (!Icon) {
                  return null;
                }

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-600 text-slate-200 transition-colors hover:border-emerald-400 hover:text-emerald-300"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </Link>
                );
              })}
            </div>
            <p className="text-sm text-slate-400">Quick support from 10am to 6pm, everyday.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-700/80 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Readora. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="transition-colors hover:text-slate-100">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-slate-100">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
