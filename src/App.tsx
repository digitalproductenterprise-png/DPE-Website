import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  formatter?: (value: number) => string;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  prefix = '',
  suffix = '',
  duration = 1800,
  formatter,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  const display = formatter ? formatter(value) : value.toLocaleString();
  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

interface Service {
  title: string;
  description: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  business: string;
  quote: string;
  image: string;
  savings: string;
}

interface PricingTier {
  title: string;
  price: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    title: 'AI Audit & Strategy',
    description:
      "A comprehensive review of your current operations to identify the highest-ROI AI opportunities. You'll receive a clear roadmap tailored to your business.",
  },
  {
    title: 'Workflow Automation',
    description:
      'We automate repetitive admin tasks, customer enquiries, invoicing, and reporting so your team can focus on high-value work.',
  },
  {
    title: 'AI Content & Marketing',
    description:
      'High-quality, on-brand content that converts — product descriptions, email campaigns, social posts, and website copy generated and refined for your business.',
  },
  {
    title: 'Monthly Retainer',
    description:
      'Ongoing AI support and optimisation. We monitor results, introduce new tools, and continuously improve your automated systems.',
  },
];

const steps: Step[] = [
  {
    number: 1,
    title: 'Free AI Audit',
    description:
      'We spend time understanding your business, processes, and pain points. No jargon. Just a clear picture of where AI can help.',
  },
  {
    number: 2,
    title: 'Custom Roadmap',
    description:
      'You receive a practical, prioritised plan showing exactly what to implement, expected time savings, and projected ROI.',
  },
  {
    number: 3,
    title: 'Implementation',
    description:
      'We build and integrate the AI solutions into your existing tools and workflows with minimal disruption to your team.',
  },
  {
    number: 4,
    title: 'Ongoing Optimisation',
    description:
      'We track results, refine performance, and introduce new improvements so your savings keep growing month after month.',
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Thompson',
    business: 'Thompson & Co Retail',
    quote:
      'DPE saved us 28 hours a week on admin alone. The automation they built paid for itself in under 6 weeks. Finally, we have time to focus on customers again.',
    image: '/testimonials/sarah.jpg',
    savings: '£47,000 saved',
  },
  {
    id: 2,
    name: 'James Harrington',
    business: 'Harrington Building Services',
    quote:
      'We were sceptical about AI. DPE showed us exactly where it would help — and it did. Our response time to leads dropped from 2 days to under 4 hours.',
    image: '/testimonials/james.jpg',
    savings: '£82,000 saved',
  },
  {
    id: 3,
    name: 'Emma Patel',
    business: 'The Little Kitchen Group',
    quote:
      "The AI content and marketing system they built generates 3x more leads than our old process. Our team is happier and we're turning away less business.",
    image: '/testimonials/emma.jpg',
    savings: '£31,500 saved',
  },
];

const pricingTiers: PricingTier[] = [
  {
    title: 'AI Audit',
    price: 'from £250',
    description: 'Perfect starting point',
    features: [
      'Full business review',
      'ROI-focused recommendations',
      'Written roadmap',
      '30-min follow-up call',
    ],
  },
  {
    title: 'Implementation',
    price: 'from £1,000',
    description: 'One-off project',
    features: [
      'Custom AI setup',
      'Staff training included',
      'Integration with your tools',
      '30-day support',
    ],
  },
  {
    title: 'Monthly Retainer',
    price: 'from £500/mo',
    description: 'Ongoing partnership',
    features: [
      'Continuous optimisation',
      'New AI tools added',
      'Priority support',
      'Monthly results reports',
    ],
  },
];

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why DPE', href: '#why-dpe' },
  { label: 'Results', href: '#results' },
  { label: 'Contact', href: '#contact' },
];

const policyLinks: { label: string; href: string }[] = [
  { label: 'Privacy Policy', href: '/legal/privacy-policy.html' },
  { label: 'Terms of Service', href: '/legal/terms-of-service.html' },
  { label: 'Cookie Policy', href: '/legal/cookie-policy.html' },
  { label: 'Accessibility', href: '/legal/accessibility.html' },
  { label: 'Refund Policy', href: '/legal/refund-policy.html' },
  { label: 'Earnings Disclaimer', href: '/legal/earnings-disclaimer.html' },
];

const trustIndustries = ['Retail', 'Professional Services', 'Trades', 'Hospitality'];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    service: 'Not sure yet — let’s discuss',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' },
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.businessName.trim()) errors.businessName = 'Business name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '9af01a16-a55f-4377-8ac5-7aeb50822eb0',
          subject: `New DPE lead — ${formData.name} (${formData.businessName})`,
          from_name: 'DPE Website',
          name: formData.name,
          business_name: formData.businessName,
          email: formData.email,
          interested_in: formData.service,
          replyto: formData.email,
          botcheck: '',
        }),
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Submission failed');
      }
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          businessName: '',
          email: '',
          service: 'Not sure yet — let’s discuss',
        });
        setFormErrors({});
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setFormErrors({
        submit: 'Something went wrong sending your message. Please email us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#555555] overflow-x-clip">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#2C2C2C] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div
              className="flex items-baseline cursor-pointer select-none"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span
                className="text-3xl font-extrabold tracking-tight text-[#C9A227]"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                DPE
              </span>
            </div>

            <div className="hidden md:flex items-center gap-9 text-sm font-medium">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className={`nav-link transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-[#C9A227]'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary px-6 py-2.5 rounded font-semibold text-sm tracking-wide"
              >
                Book a Free Call
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-[#2C2C2C]"
            >
              <div className="px-6 py-6 flex flex-col gap-4 text-sm">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left py-2 text-white/90 hover:text-[#C9A227]"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-primary mt-3 w-full py-3 rounded font-semibold text-sm"
                >
                  Book a Free Call
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        className="relative bg-[#2C2C2C] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(44,44,44,0.55)_0%,_rgba(44,44,44,0.85)_70%,_#2C2C2C_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,39,0.18),_transparent_60%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center pt-10 md:pt-14 pb-20 md:pb-24">
          <h1
            className="gold-heading text-[44px] sm:text-[56px] md:text-[72px] leading-[1.05] font-bold tracking-[-1.5px] mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Your Business.
            <br />
            Powered by AI.
          </h1>
          <p className="max-w-[620px] mx-auto text-lg md:text-2xl text-white/75 font-light tracking-[-0.2px] mb-6">
            We help UK SMEs cut costs, save hours, and scale faster using AI built around your
            business.
          </p>
          <p className="text-[#C9A227] text-base md:text-lg font-medium tracking-wide mb-10">
            AI that works. Savings you’ll feel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary px-9 py-4 text-base md:text-lg font-semibold rounded tracking-wider"
            >
              Get a Free AI Audit
            </button>
            <button
              onClick={() => scrollToSection('#how-it-works')}
              className="btn-ghost px-9 py-4 text-base md:text-lg font-semibold rounded tracking-wider"
            >
              See How It Works
            </button>
          </div>

          {/* Trust bar */}
          <div className="border-t border-white/10 pt-8 mt-2">
            <div className="text-[14px] font-extrabold tracking-[3px] uppercase text-white/80 mb-4">
              Trusted by UK businesses across
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/65 text-sm md:text-[15px]">
              {trustIndustries.map((industry, i) => (
                <React.Fragment key={industry}>
                  <span className="font-medium">{industry}</span>
                  {i < trustIndustries.length - 1 && (
                    <span className="text-[#C9A227]/60">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-[#F4F4F4] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block uppercase tracking-[3px] text-[#C9A227] text-xs font-semibold mb-3">
              Sound familiar?
            </span>
            <h2 className="gold-heading text-4xl md:text-5xl tracking-tight">
              You’re not alone
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Drowning in admin',
                text: 'Hours lost every week on repetitive tasks that AI could handle in minutes.',
              },
              {
                title: 'Missed opportunities',
                text: 'Competitors are responding faster, closing more deals, and growing quicker while you stay stuck.',
              },
              {
                title: 'Unsure where to start',
                text: 'AI feels overwhelming. You don’t want buzzwords — you want clear, practical next steps.',
              },
            ].map((point, index) => (
              <div
                key={index}
                className="gold-border-left bg-white p-9 rounded-xl shadow-sm"
              >
                <h3 className="text-[#2C2C2C] text-2xl mb-4 tracking-tight font-semibold">
                  {point.title}
                </h3>
                <p className="text-[#555555] leading-relaxed text-[15px]">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="gold-heading text-4xl md:text-5xl tracking-[-1px]">What We Do</h2>
          <p className="mt-4 max-w-md mx-auto text-base md:text-lg text-[#555555]">
            Practical AI solutions designed specifically for UK small and medium businesses.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="card group bg-white border border-[#C9A227] p-9 rounded-2xl shadow-[0_0_0_1px_rgba(201,162,39,0.25),0_6px_20px_-6px_rgba(201,162,39,0.25)] hover:shadow-[0_0_0_1px_rgba(201,162,39,0.5),0_14px_32px_-6px_rgba(201,162,39,0.4)] transition-shadow"
            >
              <div className="gold-accent w-9 mb-7" />
              <h3 className="text-[#2C2C2C] text-2xl font-semibold mb-4 tracking-[-0.3px]">
                {service.title}
              </h3>
              <p className="text-[#555555] leading-relaxed text-[15px] pr-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => scrollToSection('#contact')}
            className="inline-flex items-center gap-2 text-[#C9A227] hover:text-[#b38f20] font-semibold tracking-wide group"
          >
            Not sure which fits? Book a free call
            <ChevronRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative bg-[#2C2C2C] py-20 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
          style={{ backgroundImage: "url('/Hero image - DPE.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(44,44,44,0.7)_0%,_rgba(44,44,44,0.85)_50%,_rgba(44,44,44,0.95)_100%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="gold-heading text-4xl md:text-5xl tracking-tight">How It Works</h2>
            <p className="mt-4 text-white/65 text-base md:text-lg">
              A simple, proven process that delivers measurable results.
            </p>
          </div>

          <div className="relative grid md:grid-cols-4 gap-10 md:gap-6">
            {/* Connector line */}
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />

            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="step-circle mx-auto mb-6">{step.number}</div>
                <h3 className="text-lg font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed px-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why DPE + Stats */}
      <section id="why-dpe" className="bg-[#F4F4F4] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="gold-heading text-4xl md:text-5xl tracking-tight mb-6 leading-[1.1]">
                Why UK businesses choose DPE
              </h2>
              <p className="text-[#555555] text-base md:text-[17px] leading-relaxed">
                We’re not another AI consultancy selling hype. We’re practical, UK-based, and
                obsessively focused on delivering measurable time and cost savings for SMEs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Practical AI, not buzzwords' },
                { label: 'UK-based and UK-focused' },
                { label: 'Results tracked in time & money' },
                { label: 'No lock-in contracts' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white rounded-lg p-4 border border-[#C9A227] shadow-[0_0_0_1px_rgba(201,162,39,0.25),0_4px_12px_-2px_rgba(201,162,39,0.18)] transition-shadow hover:shadow-[0_0_0_1px_rgba(201,162,39,0.45),0_8px_20px_-4px_rgba(201,162,39,0.3)]"
                >
                  <Check className="w-5 h-5 text-[#C9A227] mt-0.5 flex-shrink-0" />
                  <span className="text-[#2C2C2C] font-medium text-[15px]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 text-center mt-16 max-w-3xl mx-auto">
            <div>
              <div className="stat-glow text-4xl md:text-5xl font-bold">
                <CountUp end={500} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-[2px] text-[#555555] mt-2">
                Hours Saved
              </div>
            </div>
            <div>
              <div className="stat-glow text-4xl md:text-5xl font-bold">
                <CountUp end={120} prefix="£" suffix="K+" />
              </div>
              <div className="text-xs uppercase tracking-[2px] text-[#555555] mt-2">
                Client Savings
              </div>
            </div>
            <div>
              <div className="stat-glow text-4xl md:text-5xl font-bold">
                <CountUp end={100} suffix="%" />
              </div>
              <div className="text-xs uppercase tracking-[2px] text-[#555555] mt-2">
                UK Businesses
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="py-20 max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <span className="inline-block uppercase tracking-[3px] text-[#C9A227] text-xs font-semibold mb-3">
            Real Results
          </span>
          <h2 className="charcoal-heading text-4xl md:text-5xl tracking-tight max-w-2xl leading-[1.1]">
            Businesses like yours are saving time and money
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="testimonial-card bg-white p-8 rounded-2xl border border-[#EFEFEF] flex flex-col"
            >
              <div className="text-[#C9A227] text-4xl leading-none mb-3 font-serif">“</div>
              <p className="text-[#2C2C2C] mb-6 leading-relaxed text-[15px] flex-1">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-[#F0F0F0]">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="avatar-photo"
                />
                <div>
                  <div className="font-semibold text-[#2C2C2C] text-sm">{t.name}</div>
                  <div className="text-xs text-[#555555]">{t.business}</div>
                </div>
              </div>
              <div className="mt-4 inline-flex self-start items-center px-3 py-1 rounded-full bg-[#C9A227]/10 text-[#C9A227] text-xs font-semibold tracking-wide">
                {t.savings}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="relative bg-[#2C2C2C] py-20 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
          style={{ backgroundImage: "url('/Hero image - DPE.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(44,44,44,0.7)_0%,_rgba(44,44,44,0.85)_50%,_rgba(44,44,44,0.95)_100%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="gold-heading text-4xl md:text-5xl tracking-tight">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-white/65 text-base md:text-lg">
              No hidden fees. Every project is scoped individually after your free audit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className="bg-white text-[#2C2C2C] p-8 rounded-2xl flex flex-col border border-[#C9A227] shadow-[0_0_0_1px_rgba(201,162,39,0.35),0_8px_28px_-6px_rgba(201,162,39,0.35)] transition-shadow hover:shadow-[0_0_0_1px_rgba(201,162,39,0.6),0_14px_40px_-6px_rgba(201,162,39,0.55)]"
              >
                <div className="font-semibold text-lg text-[#555555]">{tier.title}</div>
                <div className="text-[#C9A227] text-4xl font-bold my-2">{tier.price}</div>
                <div className="text-sm text-[#555555] mb-6">{tier.description}</div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-[15px]">
                      <Check className="w-4 h-4 text-[#C9A227] mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-primary w-full py-3 rounded font-semibold tracking-wide"
                >
                  Let’s Talk
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-white/50 text-sm mt-10">
            All projects scoped individually. No hidden fees.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="bg-[#F4F4F4] py-20">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="charcoal-heading text-3xl md:text-4xl tracking-tight leading-[1.15]">
              Ready to See What AI Can Do for Your Business?
            </h2>
            <p className="mt-4 text-[#555555] text-base">
              Book a free, no-obligation 30-minute call with one of our AI specialists.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-xl shadow-md">
            {isSubmitted ? (
              <div className="text-center py-8">
                <Check className="mx-auto text-[#C9A227] mb-4" size={48} />
                <h3 className="text-xl font-semibold text-[#2C2C2C]">
                  Thank you! We'll be in touch shortly.
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field w-full border border-[#E0E0E0] p-3 rounded text-[#2C2C2C]"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Your Business Ltd"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="input-field w-full border border-[#E0E0E0] p-3 rounded text-[#2C2C2C]"
                  />
                  {formErrors.businessName && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.businessName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@yourbusiness.co.uk"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field w-full border border-[#E0E0E0] p-3 rounded text-[#2C2C2C]"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    I’m interested in
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="input-field w-full border border-[#E0E0E0] p-3 rounded text-[#2C2C2C] bg-white"
                  >
                    <option>Not sure yet — let’s discuss</option>
                    <option>AI Audit</option>
                    <option>Implementation</option>
                    <option>Monthly Retainer</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 font-semibold rounded tracking-wider mt-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Book My Free Call'}
                  {!isSubmitting && <ArrowRight size={18} />}
                </button>

                {formErrors.submit && (
                  <p className="text-center text-sm text-red-600 pt-1">{formErrors.submit}</p>
                )}

                <p className="text-center text-xs text-[#555555] pt-2">
                  We’ll reply within 24 hours. No pressure, no hard sell.
                </p>
              </form>
            )}
          </div>

          <p className="text-center text-xs text-[#555555] mt-8">
            Or email us directly:{' '}
            <a
              href="mailto:support@digitalproductenterprise.com"
              className="text-[#C9A227] font-semibold hover:underline"
            >
              support@digitalproductenterprise.com
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white/70 pt-14 pb-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-8 text-sm pb-10 border-b border-white/10">
            <div>
              <div className="flex items-baseline">
                <span
                  className="text-3xl font-extrabold text-[#C9A227]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  DPE
                </span>
              </div>
              <p className="mt-2 text-white/60">AI That Works For You.</p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white/70 hover:text-[#C9A227] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 text-xs text-white/50">
            <div>© 2026 Digital Product Enterprise. All rights reserved.</div>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {policyLinks.map((policy) => (
                <a
                  key={policy.label}
                  href={policy.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A227] hover:text-[#e8d48a] transition-colors"
                >
                  {policy.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
