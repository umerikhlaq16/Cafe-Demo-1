export type NavigationLink = {
  label: string;
  href: string;
};

export type NavbarConfig = {
  ariaLabel: string;
  links: NavigationLink[];
  cta: NavigationLink;
};

export type HeroConfig = {
  eyebrow: string;
  title: string;
  description: string;
  backgroundImage: string;
  cta: NavigationLink;
};

export type WhySectionConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  items: Array<{
    title: string;
    description: string;
  }>;
};

export type ProductItem = {
  name: string;
  price: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type ProductsSectionConfig = {
  eyebrow: string;
  title: string;
  footerText: string;
  items: ProductItem[];
};

export type StorySectionConfig = {
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: NavigationLink;
};

export type AppDownloadConfig = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  features: string[];
  stores: Array<{ name: string; href: string; icon: string }>;
};

export type FooterConfig = {
  tagline: string;
  email: string;
  copyright: string;
  links: NavigationLink[];
  socials: NavigationLink[];
};

export type SiteConfig = {
  site: {
    name: string;
    homeUrl: string;
  };
  navbar: NavbarConfig;
  hero: HeroConfig;
  whySection: WhySectionConfig;
  productsSection: ProductsSectionConfig;
  storySection: StorySectionConfig;
  parfaitsSection: ProductsSectionConfig;
  appDownloadSection: AppDownloadConfig;
  footer: FooterConfig;
};
