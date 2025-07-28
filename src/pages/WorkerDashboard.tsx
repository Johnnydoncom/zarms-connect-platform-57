import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import { 
  User, 
  Shield, 
  CreditCard, 
  Eye, 
  Upload, 
  Star,
  Phone,
  MessageCircle,
  Camera,
  FileText,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const WorkerDashboard = () => {
  const [profileProgress, setProfileProgress] = useState(50);
  const [profileStatus, setProfileStatus] = useState('basic'); // basic, documents_uploaded, documents_verified, payment_pending, active

  // Mock worker data
  const workerData = {
    name: 'Adebayo Johnson',
    profession: 'Plumber',
    email: 'adebayo.johnson@email.com',
    phone: '+2348012345678',
    whatsapp: '2348012345678',
    state: 'Lagos',
    localGovernment: 'Ikeja',
    areas: ['Computer Village', 'Allen Avenue', 'Oregun'],
    rating: 4.8,
    reviewCount: 25,
    isDocumentVerified: false,
    isPaymentComplete: false,
    isProfileActive: false
  };

  const getProgressSteps = () => {
    return [
      { id: 'profile', label: 'Complete Profile', completed: true, percentage: 50 },
      { id: 'documents', label: 'Upload Documents', completed: profileStatus !== 'basic', percentage: 70 },
      { id: 'verification', label: 'Admin Verification', completed: workerData.isDocumentVerified, percentage: 95 },
      { id: 'payment', label: 'Payment Complete', completed: workerData.isPaymentComplete, percentage: 100 }
    ];
  };

  const handlePayment = () => {
    // Redirect to payment page
    console.log('Redirecting to payment...');
  };

  const handlePreviewProfile = () => {
    window.open('/worker/preview', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Dashboard Header */}
      <section className="bg-primary py-4 md:py-8">
        <div className="container mx-auto px-4">
          {/* Mobile Website Name */}
          <div className="block md:hidden mb-3">
            <h2 className="text-lg font-bold text-primary-foreground text-center">Zarms Connect</h2>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-3xl font-bold text-primary-foreground">
                Welcome back, {workerData.name}
              </h1>
              <p className="text-sm md:text-base text-primary-foreground/80">
                {workerData.profession} • {workerData.state}, {workerData.localGovernment} • {workerData.areas.join(', ')}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <Button variant="outline" onClick={handlePreviewProfile} className="flex-1 md:flex-initial">
                <Eye className="w-4 h-4 mr-2" />
                Preview Profile
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Profile Completion</span>
                    <span>{profileProgress}%</span>
                  </div>
                  <Progress value={profileProgress} className="h-2" />
                </div>

                <div className="space-y-4">
                  {getProgressSteps().map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-success text-white' 
                          : index === 0 
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${step.completed ? 'text-success' : 'text-foreground'}`}>
                          {step.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Profile Views</span>
                  <span className="font-semibold">245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Phone Calls</span>
                  <span className="font-semibold">18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">WhatsApp Messages</span>
                  <span className="font-semibold">32</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-accent fill-current mr-1" />
                    <span className="font-semibold">{workerData.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Profile Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <p className="text-muted-foreground">
                    Update your professional details
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input defaultValue={workerData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label>Profession</Label>
                      <Input defaultValue={workerData.profession} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input defaultValue={workerData.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label>WhatsApp Number</Label>
                      <Input defaultValue={workerData.whatsapp} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input defaultValue={workerData.state} />
                    </div>
                    <div className="space-y-2">
                      <Label>Local Government</Label>
                      <Input defaultValue={workerData.localGovernment} />
                    </div>
                    <div className="space-y-2">
                      <Label>Areas (Max 3)</Label>
                      <Input defaultValue={workerData.areas.join(', ')} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Bio/Description</Label>
                    <Textarea 
                      placeholder="Tell customers about your experience and skills..."
                      rows={4}
                      defaultValue="Experienced plumber with 8+ years in residential and commercial projects. Specialized in pipe installation, leak repairs, and water system maintenance."
                    />
                  </div>

                  <Button variant="default">Save Changes</Button>
                </CardContent>
              </Card>

              {/* Document Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Document Verification</CardTitle>
                  <p className="text-muted-foreground">
                    Upload required documents for verification
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Government ID</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload NIN, Driver's License, or Voter's Card
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload ID
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Skill Certificate</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Trade certificate or training document
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Certificate
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center md:col-span-2">
                      <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Live Selfie Verification</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Take a live selfie for identity verification
                      </p>
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Take Selfie
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment & Activation</CardTitle>
                  <p className="text-muted-foreground">
                    Complete payment to activate your profile
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">Profile Activation Fee</h3>
                    <p className="text-3xl font-bold text-accent mb-4">₦2,500</p>
                    <p className="text-sm text-muted-foreground mb-6">
                      You are paying ₦2,500 to activate your profile on Zarms Connect. 
                      Your next payment of ₦1,500 is due next year.
                    </p>
                    
                    <Button variant="gold" size="lg" className="w-full" onClick={handlePayment}>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pay ₦2,500 via Paystack
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;