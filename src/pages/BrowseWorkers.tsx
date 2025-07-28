import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import WorkerCard from '@/components/WorkerCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { professions, getStatesList, getLGAsByState } from '@/data/nigeria-locations';

// Mock data (same as HomePage but with more filters)
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
    verified: true
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
    verified: true
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
    verified: true
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
  }
];

const BrowseWorkers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedLga, setSelectedLga] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const allProfessions = ['All', ...professions];
  const allStates = ['All States', ...getStatesList()];
  const lgas = selectedState && selectedState !== 'All States' ? ['All LGAs', ...getLGAsByState(selectedState)] : [];

  const filteredWorkers = mockWorkers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.areas?.some(area => area.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         worker.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.lga.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProfession = !selectedProfession || selectedProfession === 'All' || 
                             worker.profession === selectedProfession;
    
    const matchesState = !selectedState || selectedState === 'All States' || 
                        worker.state === selectedState;
    
    const matchesLga = !selectedLga || selectedLga === 'All LGAs' || 
                      worker.lga === selectedLga;

    return matchesSearch && matchesProfession && matchesState && matchesLga;
  });
  
  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    setSelectedLga(''); // Reset LGA when state changes
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
            Browse Workers
          </h1>
          <p className="text-primary-foreground/80 text-center max-w-2xl mx-auto">
            Find verified skilled professionals in your area. Use filters to narrow down your search.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search by name, profession, or area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background rounded-lg border">
                <Select value={selectedProfession} onValueChange={setSelectedProfession}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    {allProfessions.map((prof) => (
                      <SelectItem key={prof} value={prof}>
                        {prof}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedState} onValueChange={handleStateChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {allStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  value={selectedLga} 
                  onValueChange={setSelectedLga}
                  disabled={!selectedState || selectedState === 'All States'}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select LGA" />
                  </SelectTrigger>
                  <SelectContent>
                    {lgas.map((lga) => (
                      <SelectItem key={lga} value={lga}>
                        {lga}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Results Summary */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
              <div>
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold">{filteredWorkers.length}</span> workers
                </p>
                {(selectedProfession || selectedState || selectedLga) && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProfession && selectedProfession !== 'All' && (
                      <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedProfession('')}>
                        {selectedProfession} ×
                      </Badge>
                    )}
                    {selectedState && selectedState !== 'All States' && (
                      <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedState('')}>
                        {selectedState} ×
                      </Badge>
                    )}
                    {selectedLga && selectedLga !== 'All LGAs' && (
                      <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedLga('')}>
                        {selectedLga} ×
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredWorkers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWorkers.map((worker) => (
                <WorkerCard key={worker.id} {...worker} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">No workers found matching your criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedProfession('');
                  setSelectedState('');
                  setSelectedLga('');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BrowseWorkers;
