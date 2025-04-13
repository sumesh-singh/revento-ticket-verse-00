
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-6">Last updated: April 13, 2025</p>
          
          <Separator className="mb-8" />
          
          <div className="max-w-3xl space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground mb-3">
                Welcome to Revento ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of the Revento website, mobile application, and services (collectively, the "Services").
              </p>
              <p className="text-muted-foreground">
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Accounts and Registration</h2>
              <p className="text-muted-foreground mb-3">
                To access certain features of the Services, you must register for an account. When you register, you must provide accurate and complete information. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
              </p>
              <p className="text-muted-foreground">
                You must be at least 18 years old to create an account. By creating an account, you represent and warrant that you are at least 18 years old.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
              <p className="text-muted-foreground mb-3">
                You are responsible for your use of the Services and any content you provide, including compliance with applicable laws, rules, and regulations. You may not use our Services in any manner that could interfere with, disable, disrupt, overburden, or otherwise impair the Services.
              </p>
              <p className="text-muted-foreground">
                You may not access or use the Services if you are barred from receiving services under applicable law or have been suspended or removed by Revento.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Event Ticket Purchases</h2>
              <p className="text-muted-foreground mb-3">
                When you purchase tickets to events through our Services, you agree to pay the ticket price and any applicable fees displayed to you at the time of purchase. All ticket sales are final and non-refundable unless otherwise specified by the event organizer or required by law.
              </p>
              <p className="text-muted-foreground">
                Event organizers are responsible for setting ticket prices, managing event details, and fulfilling their obligations to ticket holders. Revento is not responsible for the conduct of event organizers or the quality, safety, or legality of events.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Rewards Program</h2>
              <p className="text-muted-foreground mb-3">
                The Revento Rewards Program allows users to earn and redeem points for various benefits. Reward points have no cash value and cannot be sold, transferred, or exchanged except as expressly permitted within the Services.
              </p>
              <p className="text-muted-foreground">
                We reserve the right to modify, suspend, or terminate the Rewards Program at any time without notice.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
              <p className="text-muted-foreground mb-3">
                The Services and all content and materials included on them are owned by Revento or its licensors and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-muted-foreground">
                We grant you a limited, non-exclusive, non-transferable, and revocable license to use the Services for their intended purposes, subject to these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Privacy</h2>
              <p className="text-muted-foreground mb-3">
                Please refer to our Privacy Policy for information about how we collect, use, and share your personal information.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground mb-3">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p className="text-muted-foreground">
                TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, REVENTO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Governing Law</h2>
              <p className="text-muted-foreground mb-3">
                These Terms and your use of the Services shall be governed by and construed in accordance with the laws of the United States, without giving effect to any principles of conflicts of law.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">11. Changes to Terms</h2>
              <p className="text-muted-foreground mb-3">
                We may revise these Terms from time to time. The most current version will always be posted on our website. By continuing to access or use the Services after revisions become effective, you agree to be bound by the revised Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">12. Contact Information</h2>
              <p className="text-muted-foreground mb-3">
                If you have any questions about these Terms, please contact us at support@revento.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
