import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Instagram, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Contact Me
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Get in touch through these channels
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <a 
              href="mailto:callmers5.5@gmail.com"
              className="flex items-center gap-3 p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors group"
            >
              <Mail className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">callmers5.5@gmail.com</p>
              </div>
            </a>
            
            <a 
              href="https://www.instagram.com/rejoan.siyam/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors group"
            >
              <Instagram className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
              <div>
                <p className="font-medium text-foreground">Instagram</p>
                <p className="text-sm text-muted-foreground">@rejoan.siyam</p>
              </div>
            </a>
            
            <Link to="/" className="block mt-6">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Game
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;