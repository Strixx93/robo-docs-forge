import { SidebarLayout } from '@/components/ui/sidebar-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, BookOpen, Code, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Documentation sections for navigation
const documentationSections = [
  {
    title: 'Platform Overview',
    description: 'Comprehensive introduction to our robotics platform, architecture, and key features.',
    icon: BookOpen,
    url: '/docs/overview',
    type: 'Getting Started'
  },
  {
    title: 'API Reference',
    description: 'Complete Python API documentation with code examples and implementation guides.',
    icon: Code,
    url: '/docs/api-reference',
    type: 'Development'
  },
  {
    title: 'Safety Protocols',
    description: 'Essential safety procedures, emergency protocols, and compliance requirements.',
    icon: Shield,
    url: '/docs/safety-protocols',
    type: 'Safety'
  }
];

const Index = () => {
  return (
    <SidebarLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary mx-auto mb-6 animate-glow">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
            RoboDocs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive technical documentation for robotics onboarding and development. 
            Get your team up to speed with our interactive guides and code examples.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-gradient-primary hover:glow-primary" asChild>
              <Link to="/docs/overview">
                <BookOpen className="w-4 h-4 mr-2" />
                Start Learning
              </Link>
            </Button>
            <Button variant="outline" className="hover:bg-primary/10 hover:border-primary" asChild>
              <Link to="/admin">
                View Admin Panel
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-subtle border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Comprehensive Guides</CardTitle>
                  <p className="text-sm text-muted-foreground">Step-by-step documentation</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-subtle border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Code Examples</CardTitle>
                  <p className="text-sm text-muted-foreground">Ready-to-use implementations</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-subtle border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Safety Protocols</CardTitle>
                  <p className="text-sm text-muted-foreground">Best practices and standards</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Documentation Sections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Documentation Sections</h2>
          <div className="grid gap-6">
            {documentationSections.map((section, index) => (
              <Link key={section.url} to={section.url} className="block">
                <Card className="group hover:shadow-card transition-all duration-300 hover:border-primary/30 cursor-pointer animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <section.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {section.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {section.type}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-hero border-primary/20 text-center">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Managing Content?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Access the admin panel to create and manage your documentation sections. 
              Build comprehensive guides that will help your team succeed.
            </p>
            <Button className="bg-gradient-primary hover:glow-primary" asChild>
              <Link to="/admin">
                <Shield className="w-4 h-4 mr-2" />
                Access Admin Panel
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default Index;