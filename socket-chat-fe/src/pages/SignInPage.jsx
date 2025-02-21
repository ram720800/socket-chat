import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "../store/useAuthStore.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";

export const SignInPage = () => {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signIn, isSigningIn } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen g2">
      <div className="bg-[url('/sc_bg_img.png')] bg-center bg-cover w-full h-screen absolute"></div>
      <Card className="w-[350px] z-20">
        <CardHeader>
          <CardTitle className="text-center">Welcome back!</CardTitle>
          <span className="text-sm text-center">
            We're so excited to see you again!
          </span>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <span className="font-medium">Email</span>
            <Input
              type="email"
              name="email"
              placeholder="you@your-domain.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span className="font-medium">Password</span>
            <Input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Shhh! Tis is super secret"
              value={formData.password}
              onChange={handleChange}
              required
              className="relative"
            />
            <button
              type="button"
              className="absolute -translate-y-10 translate-x-[17rem]"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
            <Button
              varient="default"
              type="submit"
              className="w-full text-bl2"
              disabled={isSigningIn}
            >
              {isSigningIn ? (
                <>
                  <Loader className="s-10 animate-spin" />
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center">
          <p>
            Need an account?
            <Link to="/signup" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
