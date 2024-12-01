'use client';

import { ContactForm } from '@/components/forms/contact-form';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your brand? Fill out the form below or email us directly at{' '}
            <a href="mailto:contact@blancoba.com" className="text-primary hover:underline">
              contact@blancoba.com
            </a>
            . Our team will get back to you within 24 hours.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}