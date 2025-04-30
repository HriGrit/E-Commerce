import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SetStateAction, useState } from "react"
import { useNavigate } from "react-router";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password,   setPassword]   = useState("");
  const [,   setError]   = useState<string | null>(null);
  const [, setLoading] = useState(false);

  const handleSubmit = async( e: React.FormEvent ) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch( "http://localhost:1313/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, email }),
      });

      const resBody = await res.json();  
      if ( !resBody.success ) {
        setError(resBody.message);
        return;
      }

      navigate('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch ( error: any ) {
      setError( error.message );
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setPassword(e.target.value)}
                  required />
              </div>
              <Button type="submit" className="w-full bg-blue-700 text-white cursor-pointer">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
