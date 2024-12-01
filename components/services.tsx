'use client';

import { motion } from 'framer-motion';
import { 
  Palette, 
  LineChart,
  Globe2,
  Lightbulb,
  Target,
  MessageSquare 
} from 'lucide-react';

const services = [
  {
    icon: Globe2,
    title: 'Brand Strategy',
    description: 'Helping brands establish their identity and stand out in competitive markets.',
    features: [
      'Brand Audit',
      'Brand Identity Development',
      'Brand Positioning',
      'Brand Guidelines'
    ]
  },
  {
    icon: Target,
    title: 'Marketing Strategy',
    description: 'Creating data-driven strategies to connect with target audiences and drive growth.',
    features: [
      'Competitor Analysis',
      'Market Research',
      'Digital Marketing Campaigns',
      'SEO Optimization',
    ]
  },
  {
    icon: Lightbulb,
    title: 'Creative Strategy',
    description: 'Transforming ideas into compelling campaigns that resonate across channels.',
    features: [
      'Campaign Concept Development',
      'Content Strategy',
      'Storytelling',
      'Creative Direction'
    ]
  },
  {
    icon: Palette,
    title: 'Visual Communication',
    description: 'Delivering designs that elevate brand presence and ensure clear messaging.',
    features: [
      'Logo Design',
      'Branded Collaterals',
      'UI/UX Design',
      'Print Design'
    ]
  },
  {
    icon: LineChart,
    title: 'Technical Services',
    description: 'Empowering businesses with robust digital solutions and seamless technology integration.',
    features: [
      'Web Development',
      'Analytics Integration',
      'IT Support',
      'App Development'
    ]
  },
  {
    icon: MessageSquare,
    title: 'Content Creation',
    description: 'Producing engaging content to amplify your brand’s voice and reach.',
    features: [
      'Copywriting',
      'Translation',
      'Social Media',
      'Video Production'
    ]
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive branding and marketing solutions delivered by our multilingual team across four continents
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <service.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-semibold ml-4">{service.title}</h3>
              </div>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}