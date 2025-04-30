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

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [password,setPassword]= useState("");
  const [,   setError]   = useState<string | null>(null);
  const [, setLoading] = useState(false);

  const handleSubmit = async( e: React.FormEvent ) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch( "http://localhost:1313/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const resBody = await res.json();  
      if ( !resBody.success ) {
        setError(resBody.message);
        return;
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch ( error: any ) {
      setError( error.message );
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter the details below to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
            <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="text"
                  type="text"
                  placeholder="John Doe"
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div>
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setPassword(e.target.value)}
                  required />
              </div>
              <Button type="submit" className="w-full bg-blue-800 text-white">
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
