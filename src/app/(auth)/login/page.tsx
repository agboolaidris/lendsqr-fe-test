"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@ui/Button";
import { TextField } from "@ui/TextField";
import { Typography } from "@ui/Typography";
import Link from "next/link";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "src/context/AuthContext";
import * as yup from "yup";

import styles from "./page.module.scss";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

type LoginFormValues = yup.InferType<typeof schema>;

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const togglePassword = useCallback(() => {
    setShowPassword((v) => !v);
  }, []);

  const onSubmit: SubmitHandler<LoginFormValues> = useCallback(
    async ({ email }) => {
      login(email);
    },
    [login],
  );

  return (
    <div className={styles.root}>
      {/* Header */}
      <div className={styles.header}>
        <Typography size="4xl" weight="semibold" variant="secondary">
          Welcome!
        </Typography>
        <Typography>Enter details to login.</Typography>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextField
          label="Email"
          placeholder="Enter your email"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
          disabled={isSubmitting}
        />

        <div className={styles.passwordBlock}>
          <TextField
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            {...register("password")}
            disabled={isSubmitting}
            error={errors.password?.message}
            rightIcon={
              <button
                type="button"
                className={styles.togglePassword}
                onClick={togglePassword}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
          />

          <Link href="#" className={styles.forgotLink}>
            <Typography variant="primary" size="sm">
              Forgot your password?
            </Typography>
          </Link>
        </div>

        <Button
          loading={isSubmitting}
          type="submit"
          disabled={isSubmitting}
          className={styles.submit}
        >
          LOG IN
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
