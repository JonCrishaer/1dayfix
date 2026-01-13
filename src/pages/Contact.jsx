import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, MessageSquare, Loader } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await base44.integrations.Core.SendEmail({
        to: 'contact@1dayapp.com',
        subject: `New Contact Form: ${formData.subject}`,
        body: `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 sm:pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-black mb-3">Get in Touch</h1>
          <p className="text-xl text-gray-600">We'd love to hear from you. Send us a message.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-black mb-8">Contact Information</h2>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-black">Email</h3>
                </div>
                <p className="text-gray-600 ml-16">
                  <a href="mailto:contact@1dayapp.com" className="hover:text-black transition">
                    contact@1dayapp.com
                  </a>
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-black">Community</h3>
                </div>
                <p className="text-gray-600 ml-16">
                  Join our community to connect with other deep workers and get support.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 mt-12">
                <h3 className="text-lg font-bold text-black mb-3">Response Time</h3>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24-48 hours. Thank you for reaching out!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-lg p-8 border border-gray-200"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 border border-green-300 rounded-lg"
                >
                  <p className="text-green-800 font-semibold">✓ Message sent successfully!</p>
                  <p className="text-green-700 text-sm">We'll get back to you soon.</p>
                </motion.div>
              )}

              <div>
                <label className="text-sm font-medium text-black mb-2 block">Your Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="bg-white border-gray-300 text-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-black mb-2 block">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="bg-white border-gray-300 text-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-black mb-2 block">Subject</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="bg-white border-gray-300 text-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-black mb-2 block">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  required
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:border-black"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-gray-900 text-white py-6 text-lg font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}