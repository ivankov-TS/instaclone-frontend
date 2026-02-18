import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Logo } from "@/shared/ui/logo";
import { emailField, formSubmitted, passwordField } from "../model/login";
import { Link } from "react-router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <Logo scale={1.5} />
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            onChange={(event) => {
              emailField.valueChanged(event.currentTarget.value);
            }}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            onChange={(event) => {
              passwordField.valueChanged(event.currentTarget.value);
            }}
            id="password"
            type="password"
            placeholder="********"
            required
          />
        </Field>
        <Field>
          <Button
            type="submit"
            onClick={() => {
              formSubmitted();
            }}
          >
            Sign in
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
      <FieldDescription className="px-6 text-center">
        By signing in, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
