
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard, { Event } from './EventCard';

// Sample events data (in a real app, this would come from an API)
const eventsData: Event[] = [
  {
    id: 1,
    name: 'Tech Conference 2023',
    date: 'April 15, 2023',
    location: 'Convention Center',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: '$49'
  },
  {
    id: 2,
    name: 'Music Festival',
    date: 'May 20, 2023',
    location: 'Central Park',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: '$29'
  },
  {
    id: 3,
    name: 'Art Exhibition',
    date: 'June 10, 2023',
    location: 'Modern Art Museum',
    category: 'Art',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: 'Free'
  },
  {
    id: 4,
    name: 'Food Festival',
    date: 'July 5, 2023',
    location: 'Downtown Square',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    price: '$15'
  },
  {
    id: 5,
    name: 'Career Fair',
    date: 'August 12, 2023',
    location: 'University Campus',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: 'Free'
  },
  {
    id: 6,
    name: 'Sports Tournament',
    date: 'September 3, 2023',
    location: 'Sports Complex',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: '$10'
  }
];

const Events = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    };

    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
    }

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const { clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8;
    
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-lg text-gray-600">
              Discover and register for the hottest events in your area
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border ${
                canScrollLeft 
                  ? 'border-gray-300 hover:bg-gray-100 text-gray-700' 
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border ${
                canScrollRight 
                  ? 'border-gray-300 hover:bg-gray-100 text-gray-700' 
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar animate-on-scroll"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {eventsData.map((event, index) => (
            <div 
              key={event.id} 
              className="flex-shrink-0 w-full sm:w-[calc(100%/2-12px)] md:w-[calc(100%/3-16px)] lg:w-[calc(100%/4-18px)]"
            >
              <EventCard event={event} index={index} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a 
            href="/events" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            View all events
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Events;
