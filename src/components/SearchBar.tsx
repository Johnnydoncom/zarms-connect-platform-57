import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin } from 'lucide-react';
import { professions, getStatesList, getLGAsByState } from '@/data/nigeria-locations';

const SearchBar = () => {
  const [service, setService] = useState('');
  const [state, setState] = useState('');
  const [lga, setLga] = useState('');
  const [area, setArea] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredProfessions, setFilteredProfessions] = useState<string[]>([]);

  const states = getStatesList();
  const lgas = state ? getLGAsByState(state) : [];

  const handleServiceChange = (value: string) => {
    setService(value);
    if (value.length > 0) {
      const filtered = professions.filter(profession => 
        profession.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProfessions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredProfessions([]);
    }
  };

  const handleSuggestionClick = (profession: string) => {
    setService(profession);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching:', { service, state, lga, area });
  };

  return (
    <div className="bg-background/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 max-w-md mx-auto border border-white/20">
      <div className="space-y-4">
        {/* Service Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="What service do you need?"
            value={service}
            onChange={(e) => handleServiceChange(e.target.value)}
            onFocus={() => service && setShowSuggestions(filteredProfessions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="pl-10 h-12 text-base"
          />
          
          {/* Auto-suggestions dropdown */}
          {showSuggestions && (
            <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredProfessions.map((profession, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onClick={() => handleSuggestionClick(profession)}
                >
                  {profession}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* State Selection */}
        <div>
          <Select value={state} onValueChange={(value) => {
            setState(value);
            setLga(''); // Reset LGA when state changes
          }}>
            <SelectTrigger className="h-12">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select State" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {states.map((stateName) => (
                <SelectItem key={stateName} value={stateName}>
                  {stateName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* LGA Selection */}
        <div>
          <Select 
            value={lga} 
            onValueChange={setLga}
            disabled={!state}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder={!state ? "Select state first" : "Select LGA"} />
            </SelectTrigger>
            <SelectContent>
              {lgas.map((lgaName) => (
                <SelectItem key={lgaName} value={lgaName}>
                  {lgaName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Area/Landmark */}
        <div>
          <Input
            placeholder="Area/Landmark"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="h-12 text-base"
          />
        </div>

        {/* Search Button */}
        <Button 
          onClick={handleSearch} 
          className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-white"
        >
          Search Workers
          <Search className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;