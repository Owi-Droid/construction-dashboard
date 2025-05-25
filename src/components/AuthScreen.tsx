import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Construction, Eye, EyeOff, Building, Users, Shield } from "lucide-react";

interface AuthScreenProps {
  onLogin: (email: string, password: string) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    company: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(formData.email, formData.password);
    } else {
      // For demo purposes, automatically log in after signup
      onLogin(formData.email, formData.password);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-construction-50 via-steel-50 to-construction-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
  
      
      <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center p-8">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl ">
               <img src='/img/logo.png'/>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-[#1570EF] to-[#1366D9] rounded-full blur opacity-30 "></div>
            </div>
            
            <div className="space-y-4">
             
              <p className="text-xl text-steel-600 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                Admin Panel
              </p>
              <p className="text-lg text-steel-500 max-w-md animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
                Manage your construction projects, materials, and team with our comprehensive dashboard
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-3 p-4 bg-white/70 backdrop-blur-sm rounded-lg">
                <Building className="w-6 h-6 text-construction-500" />
                <span className="text-steel-700">Project Management</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/70 backdrop-blur-sm rounded-lg">
                <Users className="w-6 h-6 text-construction-500" />
                <span className="text-steel-700">Team Collaboration</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/70 backdrop-blur-sm rounded-lg">
                <Shield className="w-6 h-6 text-construction-500" />
                <span className="text-steel-700">Secure & Reliable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex items-center justify-center animate-slide-in-right">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="lg:hidden mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-construction-500 to-construction-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Construction className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <CardTitle className="text-2xl font-bold text-steel-900">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
              <p className="text-steel-600">
                {isLogin 
                  ? 'Sign in to access your construction dashboard' 
                  : 'Join us to manage your construction projects'
                }
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="border-steel-200 focus:border-construction-500"
                        required={!isLogin}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Enter your company name"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="border-steel-200 focus:border-construction-500"
                        required={!isLogin}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-steel-200 focus:border-construction-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="border-steel-200 focus:border-construction-500 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-steel-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-steel-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="border-steel-200 focus:border-construction-500"
                      required={!isLogin}
                    />
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-[#1366D9] hover:bg-[#1570EF] text-white font-medium py-2.5 transition-all duration-200 hover:shadow-lg"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              <div className="relative">
                <Separator className="my-4" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-steel-500">
                  or
                </span>
              </div>

              <div className="text-center">
                <p className="text-steel-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <Button
                    variant="link"
                    className="text-construction-600 hover:text-construction-700 font-medium p-0 ml-1"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </Button>
                </p>
              </div>

              {isLogin && (
                <div className="text-center">
                  <Button variant="link" className="text-steel-500 hover:text-steel-700">
                    Forgot your password?
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  
  );
}