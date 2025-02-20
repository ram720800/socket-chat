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

export const SignUpPage = ({ type }) => {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    email: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if(!formData.email.includes("@")) return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 7) return toast.error("Password must be at least 7 characters");
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
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle className="text-center">
            {type === "signup" ? " Create an account" : "Sign In"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <span className="font-medium">Full Name</span>
            {type === "signup" && (
              <Input
                type="text"
                name="fullName"
                placeholder="What should we call you?"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            )}
            <span className="font-medium">Email</span>
            <Input
              type="email"
              name="email"
              placeholder="you@your-domain.com"
              vlaue={formData.email}
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
              variant="default"
              type="submit"
              className="w-full text-bl2"
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
        <CardFooter className="text-center text-sm">
          <p>
            <Link to="/signin" className="text-blue-400 hover:underline">
              Already have an account?
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
