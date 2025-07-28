import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import { UserPlus, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    whatsapp: '',
    email: '',
    profession: '',
    state: '',
    lga: '',
    area: '',
    bio: '',
    password: '',
    confirmPassword: ''
  });

  const professions = [
    'Plumber', 'Electrician', 'Carpenter', 'Mechanic', 'Painter', 'Welder', 
    'Bricklayer', 'Tiler', 'Roofer', 'AC Technician', 'Generator Technician'
  ];

  const states = [
    'Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Ogun', 'Imo', 
    'Plateau', 'Edo', 'Delta', 'Osun', 'Bayelsa', 'Kogi', 'Zamfara'
  ];

  const lgasByState: Record<string, string[]> = {
    'Lagos': ['Ikeja', 'Lagos Island', 'Lagos Mainland', 'Surulere', 'Ikorodu', 'Epe', 'Badagry'],
    'Abuja': ['Abuja Municipal', 'Gwagwalada', 'Kuje', 'Bwari', 'Abaji', 'Kwali'],
    // Add more LGAs as needed
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', formData);
    // Redirect to dashboard after successful registration
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Become a Worker
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Join thousands of skilled professionals on Zarms Connect. 
              Start by creating your profile.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <UserPlus className="w-6 h-6 mr-3 text-primary" />
                  Personal & Professional Information
                </CardTitle>
                <p className="text-muted-foreground">
                  Step 1 of 3: Fill in your basic details to get started
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+234..."
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                        <Input
                          id="whatsapp"
                          type="tel"
                          placeholder="+234..."
                          value={formData.whatsapp}
                          onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Professional Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="profession">Profession *</Label>
                      <Select value={formData.profession} onValueChange={(value) => handleInputChange('profession', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your profession" />
                        </SelectTrigger>
                        <SelectContent>
                          {professions.map((prof) => (
                            <SelectItem key={prof} value={prof}>
                              {prof}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Select 
                          value={formData.state} 
                          onValueChange={(value) => {
                            handleInputChange('state', value);
                            handleInputChange('lga', ''); // Reset LGA when state changes
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lga">LGA *</Label>
                        <Select 
                          value={formData.lga} 
                          onValueChange={(value) => handleInputChange('lga', value)}
                          disabled={!formData.state}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select LGA" />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.state && lgasByState[formData.state]?.map((lga) => (
                              <SelectItem key={lga} value={lga}>
                                {lga}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="area">Area/Landmark *</Label>
                        <Input
                          id="area"
                          placeholder="e.g. Computer Village"
                          value={formData.area}
                          onChange={(e) => handleInputChange('area', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio/Description *</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell customers about your experience and skills..."
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={4}
                        required
                      />
                    </div>
                  </div>

                  {/* Account Security */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Account Security</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button type="submit" variant="gold" size="lg" className="w-full">
                      Create Account
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Already have an account?{' '}
                      <Link to="/login" className="text-primary hover:underline">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Next Steps Preview */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Shield className="w-5 h-5 mr-3 text-accent" />
                  What's Next?
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                      2
                    </div>
                    <span>Upload verification documents (ID, skill certificate, live selfie)</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-xs font-bold">
                      3
                    </div>
                    <span>Pay ₦2,500 one-time activation fee via Paystack</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                    <span>Your profile goes live and becomes searchable!</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkerRegistration;