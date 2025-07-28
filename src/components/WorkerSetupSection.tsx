import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Shield, CreditCard, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkerSetupSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Register',
      description: 'Fill in personal & professional info',
      color: 'bg-info'
    },
    {
      icon: Shield,
      title: 'Verify',
      description: 'Upload ID & skill certificate, live selfie',
      color: 'bg-warning'
    },
    {
      icon: CreditCard,
      title: 'Pay',
      description: 'Complete ₦2,500 registration via Paystack',
      color: 'bg-accent'
    },
    {
      icon: Eye,
      title: 'Go Public',
      description: 'Profile becomes visible and searchable',
      color: 'bg-success'
    }
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Want to get listed on Zarms Connect?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create a free professional profile to get discovered by customers. 
              Upload your details, verify your documents, and pay{' '}
              <span className="font-semibold text-accent">₦2,500</span>{' '}
              (one-time) to go public.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6 text-center">
                    {/* Step Number */}
                    <Badge className="absolute top-3 right-3 text-xs">
                      {index + 1}
                    </Badge>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 ${step.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/register">
              <Button variant="gold" size="lg" className="text-lg px-8 py-3">
                Become a Worker
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Join thousands of professionals earning more with Zarms Connect
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Verified Profiles</h4>
              <p className="text-muted-foreground text-sm">
                All workers undergo document verification for customer trust
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <Eye className="w-6 h-6 text-accent-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Maximum Visibility</h4>
              <p className="text-muted-foreground text-sm">
                Get discovered by customers searching in your area
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success rounded-full mx-auto mb-4 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">One-Time Payment</h4>
              <p className="text-muted-foreground text-sm">
                Just ₦2,500 to activate your profile. No monthly fees
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkerSetupSection;