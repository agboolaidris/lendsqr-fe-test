"use client";
import { TextField } from "@ui/text-field";
import { Button } from "@ui/button";
import { Typography } from "@ui/typography";
import "./login.scss";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<yup.InferType<typeof schema>> = useCallback(
    (data) => {
      console.log(data);
    },
    [],
  );
  return (
    <div className="login-page">
      <div className="login-page__header">
        <Typography size="4xl" weight="semibold" variant="secondary">
          Welcome!
        </Typography>
        <Typography>Enter details to login.</Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="login-page__form">
        <TextField
          label="Email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />

        <div className="login-page__password">
          <TextField
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={errors.password?.message}
            rightIcon={
              <button
                type="button"
                className="login-page__toggle-password"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
          />

          <Link href="#">
            <Typography variant="primary" className="login-page__forgot">
              Forgot your password?
            </Typography>
          </Link>
        </div>

        <Button className="login-page__submit w-full">LOG IN</Button>
      </form>
    </div>
  );
}

export default LoginPage;
