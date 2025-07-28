import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Phone, MessageCircle, MapPin } from 'lucide-react';

interface WorkerCardProps {
  id: string;
  name: string;
  profession: string;
  state: string;
  lga: string;
  areas?: string[];
  rating: number;
  reviewCount: number;
  photo: string;
  phone: string;
  whatsapp: string;
  verified?: boolean;
  pastWorkPhotos?: string[];
}

const WorkerCard = ({ 
  id, 
  name, 
  profession, 
  state,
  lga,
  areas,
  rating, 
  reviewCount, 
  photo, 
  phone, 
  whatsapp,
  verified = false,
  pastWorkPhotos = []
}: WorkerCardProps) => {
  
  const handleCall = () => {
    window.open(`tel:${phone}`, '_blank');
  };

  const handleWhatsApp = () => {
    const message = `Hello, I found your profile on Zarms Connect`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleViewProfile = () => {
    window.open(`/worker/${id}`, '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group">
      {/* Worker Photo and Past Work Gallery */}
      <div className="p-4">
        <div className="flex items-start space-x-4">
          {/* Round Profile Picture */}
          <div className="relative flex-shrink-0">
            <img 
              src={photo} 
              alt={`${name} - ${profession}`}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
              onClick={handleViewProfile}
            />
            {verified && (
              <Badge className="absolute -top-1 -right-1 bg-success text-white text-xs px-1 py-0.5">
                ✓
              </Badge>
            )}
          </div>

          {/* Worker Info */}
          <div className="flex-1 min-w-0" onClick={handleViewProfile}>
            <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors truncate">
              {name}
            </h3>
            <p className="text-muted-foreground">{profession}</p>
            
            {/* Location and Areas */}
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">
                {areas && areas[0] ? `${areas[0]}, ${lga}` : `${state}, ${lga}`}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(rating)
                        ? 'text-accent fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {rating.toFixed(1)} ({reviewCount})
              </span>
            </div>
          </div>
        </div>

        {/* Past Work Photos Gallery */}
        {pastWorkPhotos.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-foreground mb-2">Past Work</p>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {pastWorkPhotos.map((workPhoto, index) => (
                <img
                  key={index}
                  src={workPhoto}
                  alt={`${name}'s work ${index + 1}`}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0 border border-border"
                />
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4">
          <Button
            variant="call"
            size="sm"
            onClick={handleCall}
            className="flex-1"
          >
            <Phone className="w-4 h-4 mr-1" />
            Call
          </Button>
          <Button
            variant="whatsapp"
            size="sm"
            onClick={handleWhatsApp}
            className="flex-1"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            WhatsApp
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WorkerCard;