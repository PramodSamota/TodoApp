import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React,{useState} from "react"
import { useAuthStore } from "@/store/authStore"
import { useNavigate } from "react-router-dom"

export function SigninPage() {

  const [formData, setFormData] = useState({
      email: '',
      password: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [id]: value
        }));
        // Clear error when user types
        if (errors[id]) {
          setErrors(prev => ({ ...prev, [id]: '' }));
        }
      };

      const validate = () => {
    const newErrors: Record<string, string> = {};
    
   
    if (!formData.email) newErrors.email = 'Email is required';
        setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const {login, isLoggingIn} = useAuthStore();
  const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (validate()) {
        
        try {
          
          console.log('Submitting:', formData);
          
          const res = await login(formData);
          
          console.log("res",res);
  
          if((res).success){
            navigate("/")
          }
          
        } catch (error) {
          console.error('Signup failed:', error);
        } 
      }
    };
  

  return (
    <Card className="w-[400px] h-[265px] ">
      <CardHeader className="p-[10px]">
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="p-[10px]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2 pb-[10px] h-[60px]">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2 pb-[10px] h-[60px]">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
               
              </div>
              <Input id="password" type="password" 
              onChange={handleChange}
              required />
            </div>
          </div>
          <CardFooter className="flex-col gap-2 ">
        <Button className=" h-[40px] w-full" type="submit" 
        disabled={isLoggingIn}
        >
          Login
        </Button>       
      </CardFooter>
        </form>
      </CardContent>
      
    </Card>
  )
}
