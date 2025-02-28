import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";
import { AnimatedBG2 } from "../components/Animation.jsx";

export const SignUpPage = () => {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    email: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.email.includes("@"))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 7)
      return toast.error("Password must be at least 7 characters");
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sucess = validateForm();
    if (sucess === true) {
      signUp(formData);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen g2">
      <div className="bg-[url('/sc_bg_img.png')] bg-cover bg-center h-screen w-full absolute">
        <AnimatedBG2 />
      </div>
      <Card className="w-[400px] z-20 bg-[var(--color-bl2)] border-none mt-4 fixed max-lg:mt-6 max-lg:w-[300px]">
        <CardHeader>
          <CardTitle className="text-center text-[var(--color-wl2)] text-2xl font-bold">
            Create an account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <span className="text-xs font-bold uppercase text-[var(--color-wl3)]">
              Full Name
            </span>
            <span className="size-4 rounded-full absolute text-[var(--color-r3)]">
              *
            </span>
            <Input
              type="text"
              name="fullName"
              placeholder="What should we call you?"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="border-none bg-[var(--color-bl1)]"
            />
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
              vlaue={formData.email}
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
              type="submit"
              className="w-full !bg-[var(--color-b1)] hover:!bg-[var(--color-db2)]"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader className="s-10 animate-spin" />
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm -mt-5">
          <p>
            <Link
              to="/signin"
              className="text-[var(--color-b1)] hover:underline"
            >
              Already have an account?
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
