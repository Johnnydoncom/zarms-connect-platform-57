import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import { 
  Star, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Shield, 
  Calendar,
  Camera,
  ArrowLeft,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkerProfile = () => {
  const { id } = useParams();
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    name: '',
    comment: ''
  });

  // Mock worker data (in real app, fetch based on id)
  const worker = {
    id: '1',
    name: 'Adebayo Johnson',
    profession: 'Plumber',
    state: 'Lagos',
    lga: 'Ikeja',
    areas: ['Computer Village', 'Allen Avenue', 'Oregun', 'Alausa'],
    rating: 4.8,
    reviewCount: 25,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    phone: '+2348012345678',
    whatsapp: '2348012345678',
    verified: true,
    joinedDate: '2023-06-15',
    bio: 'Experienced plumber with 8+ years in residential and commercial projects. Specialized in pipe installation, leak repairs, and water system maintenance. Available for emergency calls and scheduled maintenance.',
    workGallery: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop'
    ],
    reviews: [
      {
        id: 1,
        name: 'Mrs. Adebisi',
        rating: 5,
        comment: 'Excellent work! Fixed my kitchen sink perfectly and was very professional.',
        date: '2024-01-15'
      },
      {
        id: 2,
        name: 'Mr. Okafor',
        rating: 5,
        comment: 'Very reliable and skilled. Completed the bathroom renovation on time.',
        date: '2024-01-10'
      },
      {
        id: 3,
        name: 'Fatima A.',
        rating: 4,
        comment: 'Good work, reasonable prices. Would recommend to others.',
        date: '2024-01-05'
      }
    ]
  };

  const handleCall = () => {
    window.open(`tel:${worker.phone}`, '_blank');
  };

  const handleWhatsApp = () => {
    const message = `Hello, I found your profile on Zarms Connect`;
    window.open(`https://wa.me/${worker.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Review submitted:', reviewForm);
    // Reset form
    setReviewForm({ rating: 0, name: '', comment: '' });
    // Show success message (implement toast)
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Worker Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <img 
                      src={worker.photo} 
                      alt={worker.name}
                      className="w-32 h-32 object-cover rounded-full mx-auto"
                    />
                    {worker.verified && (
                      <Badge className="absolute bottom-2 right-12 bg-success text-white">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{worker.name}</h1>
                    <p className="text-lg text-muted-foreground">{worker.profession}</p>
                  </div>

                  <div className="flex items-center justify-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{worker.state}, {worker.lga}</span>
                  </div>

                  {/* Service Areas */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Service Areas (Landmarks):</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {worker.areas.map((area, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(worker.rating)
                              ? 'text-accent fill-current'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{worker.rating}</span>
                    <span className="text-muted-foreground">({worker.reviewCount} reviews)</span>
                  </div>

                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Joined {new Date(worker.joinedDate).toLocaleDateString('en-GB', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Actions */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Contact {worker.name}</h3>
                
                <Button
                  variant="call"
                  size="lg"
                  onClick={handleCall}
                  className="w-full"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
                
                <Button
                  variant="whatsapp"
                  size="lg"
                  onClick={handleWhatsApp}
                  className="w-full"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Response time: Usually within 2 hours
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">{worker.bio}</p>
              </CardContent>
            </Card>

            {/* Work Gallery */}
            {worker.workGallery.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Work Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {worker.workGallery.map((image, index) => (
                      <div 
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <img 
                          src={image} 
                          alt={`Work sample ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Customer Reviews</h2>
                
                {/* Leave a Review */}
                <div className="bg-muted rounded-lg p-6 mb-6">
                  <h3 className="font-medium text-foreground mb-4">Leave a Review</h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    {/* Star Rating */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Rating *
                      </label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                            className="p-1"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= reviewForm.rating
                                  ? 'text-accent fill-current'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Your Name *
                        </label>
                        <Input
                          value={reviewForm.name}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Review *
                      </label>
                      <Textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                        placeholder="Share your experience working with this professional..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" variant="gold">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Review
                    </Button>
                  </form>
                </div>

                {/* Existing Reviews */}
                <div className="space-y-4">
                  {worker.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{review.name}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-accent fill-current'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('en-GB')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
