import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import {
  confirmPasswordField,
  emailField,
  formSubmitted,
  passwordField,
  usernameField,
} from "../model/register";
import { useUnit } from "effector-react";
import { Link } from "react-router";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [confirmPasswordError, emailError, passwordError, usernameError] =
    useUnit([
      confirmPasswordField.$error,
      emailField.$error,
      passwordField.$error,
      usernameField.$error,
    ]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form> */}
          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                aria-invalid={!!usernameError.length}
                id="username"
                placeholder="username"
                required
                onChange={(event) => {
                  usernameField.valueChanged(event.target.value);
                }}
              />
              {usernameError && (
                <FieldDescription className="text-red-500">
                  {usernameError}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                aria-invalid={!!emailError.length}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(event) => {
                  emailField.valueChanged(event.target.value);
                }}
              />
              {emailError && (
                <FieldDescription className="text-red-500">
                  {emailError}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
              </div>
              <Input
                aria-invalid={!!passwordError.length}
                id="password"
                type="password"
                placeholder="********"
                required
                onChange={(event) => {
                  passwordField.valueChanged(event.target.value);
                }}
              />
              {passwordError && (
                <FieldDescription className="text-red-500">
                  {passwordError}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="confirm-password">
                  Confirm password
                </FieldLabel>
              </div>
              <Input
                aria-invalid={!!confirmPasswordError.length}
                id="confirm-password"
                type="password"
                placeholder="********"
                required
                onChange={(event) => {
                  confirmPasswordField.valueChanged(event.target.value);
                }}
              />
              {confirmPasswordError && (
                <FieldDescription className="text-red-500">
                  {confirmPasswordError}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <Button
                // type="submit"
                onClick={() => {
                  formSubmitted();
                }}
              >
                sign up
              </Button>
              <FieldDescription className="text-center">
                Have an account already? <Link to="/sign-in">Sign in</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
          {/* </form> */}
        </CardContent>
      </Card>
    </div>
  );
}
