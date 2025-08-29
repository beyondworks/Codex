import { useState } from "react";
import { supabase } from "../utils/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Youtube, 
  Instagram, 
  MessageCircle,
  TrendingUp,
  Users,
  BarChart3,
  ArrowLeft,
  CheckCircle2,
  Zap
} from "lucide-react";

interface LoginPageProps {
  onBack?: () => void;
  onLogin: () => void;
}

export function LoginPage({ onBack, onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const socialProviders = [
    { 
      name: "YouTube", 
      icon: Youtube, 
      color: "bg-red-500 hover:bg-red-600", 
      textColor: "text-white"
    },
    { 
      name: "Instagram", 
      icon: Instagram, 
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600", 
      textColor: "text-white"
    },
    { 
      name: "KakaoTalk", 
      icon: MessageCircle, 
      color: "bg-yellow-400 hover:bg-yellow-500", 
      textColor: "text-black"
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Real-time Trend Analysis",
      description: "Discover the hottest products and trending opportunities in real time"
    },
    {
      icon: Users,
      title: "Creator Insights",
      description: "Analyze strategies from successful creators and industry leaders"
    },
    {
      icon: BarChart3,
      title: "AI Revenue Prediction",
      description: "Predict content revenue using advanced machine learning algorithms"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }
    toast.success("Successfully logged in");
    setIsLoading(false);
    onLogin();
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    const prov = provider.toLowerCase().includes("instagram") ? "google" :
                 provider.toLowerCase().includes("youtube") ? "google" :
                 provider.toLowerCase().includes("kakaotalk") ? "kakao" : "google";
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: prov as any });
    if (error) toast.error(error.message);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-gray-50 via-white to-apple-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left - Brand Introduction */}
        <div className="flex flex-col justify-center space-y-8">
          {/* Back Button */}
          {onBack && (
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="self-start p-2 hover:bg-apple-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          )}

          {/* Brand Header */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-brand-gradient rounded-2xl flex items-center justify-center shadow-apple-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-apple-large-title font-semibold text-brand-gradient">Creator-Pulse</h1>
                <p className="text-apple-body text-apple-gray-600">Innovation in Shopping Content Analysis</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-apple-title-1 lg:text-apple-large-title font-semibold leading-tight text-apple-gray-900">
                Start Your<br />
                <span className="text-brand-gradient">Smart Content Strategy</span><br />
                with Data-Driven Insights
              </h2>
              <p className="text-apple-body text-apple-gray-600 leading-relaxed">
                Over 2,500 successful creators are generating an average of $8,500 monthly revenue with Creator-Pulse.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white/70 rounded-xl border border-apple-gray-200 hover:bg-white/90 transition-all duration-200 shadow-apple-xs hover:shadow-apple-sm">
                <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center flex-shrink-0 shadow-apple-sm">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-apple-callout font-semibold text-apple-gray-900">{feature.title}</h4>
                  <p className="text-apple-footnote text-apple-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Stats */}
          <div className="bg-white/70 rounded-xl p-6 border border-apple-gray-200 shadow-apple-sm">
            <h4 className="text-apple-callout font-semibold text-center mb-4 text-apple-gray-900">Creator-Pulse Performance</h4>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-apple-title-2 font-bold text-brand-gradient">50,000+</div>
                <div className="text-apple-footnote text-apple-gray-600">Products Analyzed</div>
              </div>
              <div>
                <div className="text-apple-title-2 font-bold text-brand-gradient">$8.5M</div>
                <div className="text-apple-footnote text-apple-gray-600">Monthly Revenue</div>
              </div>
              <div>
                <div className="text-apple-title-2 font-bold text-brand-gradient">2,500+</div>
                <div className="text-apple-footnote text-apple-gray-600">Active Creators</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Login Form */}
        <div className="flex flex-col justify-center">
          <Card className="w-full max-w-md mx-auto shadow-apple-xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl">
            <CardHeader className="text-center space-y-4 pb-6">
              <CardTitle className="text-apple-title-1 font-semibold text-apple-gray-900">Sign In</CardTitle>
              <p className="text-apple-body text-apple-gray-600">
                Start your success story with Creator-Pulse
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Login */}
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-apple-footnote text-apple-gray-600 mb-4">Quick Sign In</p>
                  <div className="grid grid-cols-3 gap-3">
                    {socialProviders.map((provider) => (
                      <Button
                        key={provider.name}
                        variant="outline"
                        className={`h-12 ${provider.color} ${provider.textColor} border-0 hover:scale-105 transition-all duration-200`}
                        onClick={() => handleSocialLogin(provider.name)}
                        disabled={isLoading}
                      >
                        <provider.icon className="h-5 w-5" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-apple-caption uppercase">
                  <span className="bg-white px-2 text-apple-gray-500">Or sign in with email</span>
                </div>
              </div>

              {/* Email Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-apple-callout font-medium text-apple-gray-900">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-apple-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="pl-10 h-12 bg-apple-gray-50 border-apple-gray-200 focus:border-brand-primary focus:ring-brand-primary/20 rounded-lg text-apple-body"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-apple-callout font-medium text-apple-gray-900">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-apple-gray-500" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-12 h-12 bg-apple-gray-50 border-apple-gray-200 focus:border-brand-primary focus:ring-brand-primary/20 rounded-lg text-apple-body"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-apple-gray-500 hover:text-apple-gray-900 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    />
                    <Label htmlFor="remember" className="text-apple-footnote text-apple-gray-700">Keep me signed in</Label>
                  </div>
                  <Button variant="link" size="sm" className="px-0 text-brand-primary hover:text-brand-primary/80 text-apple-footnote">
                    Forgot your password?
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-brand-gradient hover:opacity-90 text-white transition-all duration-200 rounded-lg shadow-apple-sm hover:shadow-apple-md text-apple-callout font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-apple-body">Signing in...</span>
                    </div>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      <span className="text-apple-callout font-medium">Sign In</span>
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-lg p-4 border border-brand-primary/20 shadow-apple-xs">
                  <div className="flex items-center gap-2 mb-2 justify-center">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                    <span className="text-apple-footnote font-medium text-apple-gray-900">Free Trial Benefits</span>
                  </div>
                  <p className="text-apple-caption text-apple-gray-600">
                    Experience premium features free for 7 days when you first sign up
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-apple-footnote text-apple-gray-600">
                    Don't have an account yet?
                  </p>
                  <Button variant="outline" size="sm" className="border-brand-primary/30 text-brand-primary hover:bg-brand-primary/5 rounded-lg text-apple-footnote font-medium">
                    Start Free Trial
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center text-apple-caption text-apple-gray-500 max-w-md mx-auto">
            <p>Creator-Pulse securely protects your data in compliance with privacy regulations</p>
          </div>
        </div>
      </div>
    </div>
  );
}