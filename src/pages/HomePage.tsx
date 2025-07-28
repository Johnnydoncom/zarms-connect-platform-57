import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WorkerCard from '@/components/WorkerCard';
import WorkerSetupSection from '@/components/WorkerSetupSection';

// Mock data for workers
const mockWorkers = [
  {
    id: '1',
    name: 'Adebayo Johnson',
    profession: 'Plumber',
    state: 'Lagos',
    lga: 'Ikeja',
    areas: ['Computer Village', 'Allen Avenue', 'Oregun'],
    rating: 4.8,
    reviewCount: 25,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    phone: '+2348012345678',
    whatsapp: '2348012345678',
    verified: true,
    pastWorkPhotos: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=150&h=150&fit=crop'
    ]
  },
  {
    id: '2',
    name: 'Fatima Abdullahi',
    profession: 'Electrician',
    state: 'Abuja',
    lga: 'Abuja Municipal',
    areas: ['Wuse', 'Berger Junction', 'Garki'],
    rating: 4.9,
    reviewCount: 32,
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=face',
    phone: '+2348023456789',
    whatsapp: '2348023456789',
    verified: true,
    pastWorkPhotos: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150&h=150&fit=crop'
    ]
  },
  {
    id: '3',
    name: 'Chidi Okonkwo',
    profession: 'Carpenter',
    state: 'Lagos',
    lga: 'Surulere',
    areas: ['National Stadium', 'Shitta', 'Aguda'],
    rating: 4.7,
    reviewCount: 18,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    phone: '+2348034567890',
    whatsapp: '2348034567890',
    verified: true,
    pastWorkPhotos: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=150&h=150&fit=crop',
      'https://images.unsplash.com/photo-1585128792020-803d29415281?w=150&h=150&fit=crop'
    ]
  },
  {
    id: '4',
    name: 'Aisha Mohammed',
    profession: 'AC Technician',
    state: 'Lagos',
    lga: 'Lagos Island',
    areas: ['Victoria Island', 'Eko Hotel', 'Falomo'],
    rating: 4.6,
    reviewCount: 14,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    phone: '+2348045678901',
    whatsapp: '2348045678901',
    verified: true
  },
  {
    id: '5',
    name: 'Emeka Nwankwo',
    profession: 'Mechanic',
    state: 'Lagos',
    lga: 'Ikorodu',
    areas: ['Mile 12 Market', 'Ketu', 'Ojota'],
    rating: 4.5,
    reviewCount: 22,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    phone: '+2348056789012',
    whatsapp: '2348056789012',
    verified: true
  },
  {
    id: '6',
    name: 'Kemi Adebayo',
    profession: 'Painter',
    state: 'Lagos',
    lga: 'Eti-Osa',
    areas: ['Lekki Phase 1', 'Admiralty Way', 'Chevron'],
    rating: 4.8,
    reviewCount: 19,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
    phone: '+2348067890123',
    whatsapp: '2348067890123',
    verified: true
  },
  {
    id: '7',
    name: 'Ibrahim Hassan',
    profession: 'Welder',
    state: 'Kano',
    lga: 'Nasarawa',
    areas: ['Sabon Gari Market', 'Fagge', 'Kurmi Market'],
    rating: 4.4,
    reviewCount: 16,
    photo: 'https://images.unsplash.com/photo-1507566877423-aaa4f4ee0253?w=300&h=300&fit=crop&crop=face',
    phone: '+2348078901234',
    whatsapp: '2348078901234',
    verified: true
  },
  {
    id: '8',
    name: 'Grace Okoro',
    profession: 'Tiler',
    state: 'Rivers',
    lga: 'Port Harcourt',
    areas: ['Pleasure Park', 'Rumuola', 'GRA'],
    rating: 4.7,
    reviewCount: 21,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
    phone: '+2348089012345',
    whatsapp: '2348089012345',
    verified: true
  },
  {
    id: '9',
    name: 'Yusuf Garba',
    profession: 'Bricklayer',
    state: 'Kaduna',
    lga: 'Kaduna North',
    areas: ['Kawo New Market', 'Barnawa', 'Malali'],
    rating: 4.6,
    reviewCount: 13,
    photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face',
    phone: '+2348090123456',
    whatsapp: '2348090123456',
    verified: true
  },
  {
    id: '10',
    name: 'Blessing Udoh',
    profession: 'Generator Technician',
    state: 'Edo',
    lga: 'Oredo',
    areas: ['Ring Road', 'Ikpoba Hill', 'New Benin'],
    rating: 4.5,
    reviewCount: 17,
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop&crop=face',
    phone: '+2348001234567',
    whatsapp: '2348001234567',
    verified: true
  },
  {
    id: '11',
    name: 'Daniel Eze',
    profession: 'Roofer',
    state: 'Enugu',
    lga: 'Enugu South',
    areas: ['Coal City', 'Independence Layout', 'New Haven'],
    rating: 4.4,
    reviewCount: 12,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    phone: '+2348012345098',
    whatsapp: '2348012345098',
    verified: true
  },
  {
    id: '12',
    name: 'Hadiza Usman',
    profession: 'Cleaner',
    state: 'Borno',
    lga: 'Maiduguri',
    areas: ['Monday Market', 'Gwange', 'Custom Area'],
    rating: 4.6,
    reviewCount: 20,
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=face',
    phone: '+2348023456109',
    whatsapp: '2348023456109',
    verified: true
  }
];

const HomePage = () => {
  const [showMore, setShowMore] = useState(false);
  const visibleWorkers = 8;
  
  const displayedWorkers = showMore 
    ? mockWorkers 
    : mockWorkers.slice(0, visibleWorkers);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Featured Workers Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Workers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse verified skilled professionals in your area. All workers are document-verified and rated by customers.
            </p>
          </div>

          {/* Workers Count */}
          <div className="text-center mb-6">
            <p className="text-lg text-muted-foreground">
              {mockWorkers.length} workers found
            </p>
          </div>

          {/* Vertically Stacked Workers for Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedWorkers.map((worker) => (
              <WorkerCard key={worker.id} {...worker} />
            ))}
          </div>

          {/* Load More Button */}
          {!showMore && mockWorkers.length > visibleWorkers && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowMore(true)}
              >
                Load More Workers
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Worker Setup Section */}
      <WorkerSetupSection />
    </div>
  );
};

export default HomePage;