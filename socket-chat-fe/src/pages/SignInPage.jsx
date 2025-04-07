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
import { AnimatedBG1 } from "../components/Animation.jsx";

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
      <div className="bg-[url('/sc_bg_img.png')] bg-center bg-cover w-full h-screen absolute">
        <AnimatedBG1 />
      </div>
      <Link to="/">
        <div className="absolute top-8 left-4">
          <img src="/Sec-logo.svg" alt="socket" width={180} height={125} />
        </div>
      </Link>
      <Card className="w-[400px] z-20 bg-[var(--color-bl2)] border-none mt-4 fixed max-lg:mt-6 max-lg:w-[300px]">
        <CardHeader>
          <CardTitle className="text-center text-[var(--color-wl2)] text-2xl font-bold">
            Welcome back!
          </CardTitle>
          <span className="text-sm text-center text-[var(--color-wl2)]">
            We're so excited to see you again!
          </span>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <span className="text-xs font-bold uppercase text-[var(--color-wl3)]">
              Email
            </span>
            <span className="size-4 rounded-full absolute text-[var(--color-r3)]">
              *
            </span>
            <Input
              type="email"
              name="email"
              placeholder="you@your-domain.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-none bg-[var(--color-bl1)]"
            />
            <span className="text-xs font-bold uppercase text-[var(--color-wl3)]">
              Password
            </span>
            <span className="size-4 rounded-full absolute text-[var(--color-r3)]">
              *
            </span>
            <Input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Shhh! This is super secret"
              value={formData.password}
              onChange={handleChange}
              required
              className="relative border-none bg-[var(--color-bl1)]"
            />
            <button
              type="button"
              className="absolute -translate-y-10 translate-x-[20rem] max-lg:translate-x-[14rem]"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeOff className="size-4 text-[var(--color-wl3)]" />
              ) : (
                <Eye className="size-4 text-[var(--color-wl3)]" />
              )}
            </button>
            <Button
              varient="default"
              type="submit"
              className="w-full !bg-[var(--color-b1)] hover:!bg-[var(--color-db2)]"
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
        <CardFooter className="text-sm text-center -mt-5">
          <p className="text-[var(--color-wl3)]">
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
