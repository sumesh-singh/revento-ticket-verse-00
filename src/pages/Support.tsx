
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageCircle, Phone, Mail, Book, FileText, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Support = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">How Can We Help?</h1>
            <p className="text-lg text-muted-foreground">Get in touch with our support team</p>
          </div>
          
          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <ContactCard 
              title="Chat With Us"
              description="Get instant answers from our support team"
              icon={<MessageCircle className="h-6 w-6" />}
              action="Start Chat"
            />
            
            <ContactCard 
              title="Call Support"
              description="Available Mon-Fri, 9am to 5pm EST"
              icon={<Phone className="h-6 w-6" />}
              action="Call Now"
            />
            
            <ContactCard 
              title="Email Us"
              description="We'll respond within 24 hours"
              icon={<Mail className="h-6 w-6" />}
              action="Send Email"
            />
          </div>
          
          {/* FAQs */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I create an account?</AccordionTrigger>
                <AccordionContent>
                  To create an account, click on the "Login / Signup" button in the navigation bar and select "Sign up". Fill in your details and follow the prompts to complete registration.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How do reward points work?</AccordionTrigger>
                <AccordionContent>
                  You earn reward points by attending events, participating in activities, and winning competitions. Points can be redeemed for discounts on future event tickets, exclusive merchandise, and VIP experiences.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I transfer my tickets to someone else?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can transfer tickets to other users. Go to "My Tickets" in your dashboard, select the ticket you want to transfer, and click on the transfer option. Enter the recipient's email and follow the instructions.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I become an event organizer?</AccordionTrigger>
                <AccordionContent>
                  To become an event organizer, you need to create an organizer account. During signup, select "Organizer" instead of "User" and complete the additional verification steps required for organizer accounts.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. Some events may also offer alternative payment options specified by the organizer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* Contact form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                <Input id="subject" placeholder="What's this about?" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <Textarea id="message" placeholder="How can we help you?" rows={5} />
              </div>
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface ContactCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
}

const ContactCard = ({ title, description, icon, action }: ContactCardProps) => {
  return (
    <Card className="text-center hover:shadow-md transition-all duration-300">
      <CardHeader>
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="text-primary">{icon}</div>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full">{action}</Button>
      </CardContent>
    </Card>
  );
};

export default Support;
