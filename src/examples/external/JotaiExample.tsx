import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ExampleLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { Kbd } from "../../components/ui/kbd";

// Base atoms
const firstNameAtom = atom("");
const lastNameAtom = atom("");
const emailAtom = atom("");
const passwordAtom = atom("");
const confirmPasswordAtom = atom("");
const agreeToTermsAtom = atomWithStorage("agreeToTerms", false);
const countryAtom = atom("us");

// Derived atoms
const fullNameAtom = atom((get) => {
  const firstName = get(firstNameAtom);
  const lastName = get(lastNameAtom);
  return firstName && lastName ? `${firstName} ${lastName}` : "";
});

const emailValidAtom = atom((get) => {
  const email = get(emailAtom);
  return email.includes("@") && email.includes(".");
});

const passwordsMatchAtom = atom((get) => {
  const password = get(passwordAtom);
  const confirmPassword = get(confirmPasswordAtom);
  return password === confirmPassword && password.length > 0;
});

const passwordStrengthAtom = atom((get) => {
  const password = get(passwordAtom);
  if (password.length === 0) return { score: 0, label: "None" };
  if (password.length < 6) return { score: 1, label: "Weak" };
  if (password.length < 10) return { score: 2, label: "Medium" };
  if (
    password.length >= 10 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    return { score: 3, label: "Strong" };
  }
  return { score: 2, label: "Medium" };
});

const formValidAtom = atom((get) => {
  const fullName = get(fullNameAtom);
  const emailValid = get(emailValidAtom);
  const passwordsMatch = get(passwordsMatchAtom);
  const agreeToTerms = get(agreeToTermsAtom);
  const password = get(passwordAtom);

  return (
    fullName.length > 0 &&
    emailValid &&
    passwordsMatch &&
    password.length >= 6 &&
    agreeToTerms
  );
});

const formDataAtom = atom((get) => ({
  firstName: get(firstNameAtom),
  lastName: get(lastNameAtom),
  fullName: get(fullNameAtom),
  email: get(emailAtom),
  country: get(countryAtom),
  passwordStrength: get(passwordStrengthAtom),
}));

const JotaiExample = () => {
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [confirmPassword, setConfirmPassword] = useAtom(confirmPasswordAtom);
  const [agreeToTerms, setAgreeToTerms] = useAtom(agreeToTermsAtom);
  const [country, setCountry] = useAtom(countryAtom);

  // Derived values
  const fullName = useAtomValue(fullNameAtom);
  const emailValid = useAtomValue(emailValidAtom);
  const passwordsMatch = useAtomValue(passwordsMatchAtom);
  const passwordStrength = useAtomValue(passwordStrengthAtom);
  const formValid = useAtomValue(formValidAtom);
  const formData = useAtomValue(formDataAtom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formValid) {
      alert("Form submitted successfully!");
    }
  };

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-gray-800";
    if (score === 1) return "bg-red-500";
    if (score === 2) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthTextColor = (score: number) => {
    if (score === 0) return "text-gray-500";
    if (score === 1) return "text-red-600 dark:text-red-400";
    if (score === 2) return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <ExampleLayout
      title="Jotai"
      description="Atomic state management with derived values and dependencies"
      sourcePath="src/examples/external/JotaiExample.tsx"
      sourceLine={130}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Registration Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>

            {fullName && (
              <Alert>
                <AlertDescription>
                  Welcome, <strong>{fullName}</strong>!
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
              {email && (
                <div
                  className={`mt-1 text-xs ${
                    emailValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {emailValid ? "✓ Valid email" : "✗ Invalid email format"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              {password && (
                <div className="mt-2">
                  <div className="mb-1 text-xs text-muted-foreground">
                    Password strength:{" "}
                    <span
                      className={getStrengthTextColor(passwordStrength.score)}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-1 overflow-hidden rounded bg-gray-950">
                    <div
                      className={`h-full transition-all duration-300 ${getStrengthColor(
                        passwordStrength.score
                      )}`}
                      style={{
                        width: `${(passwordStrength.score / 3) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
              {confirmPassword && (
                <div
                  className={`mt-1 text-xs ${
                    passwordsMatch ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {passwordsMatch
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </div>
              )}
            </div>

            <div>
              <Label className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  checked={agreeToTerms}
                  onCheckedChange={(checked) =>
                    setAgreeToTerms(checked === true)
                  }
                />
                <span className="text-sm">
                  I agree to the terms and conditions
                </span>
              </Label>
              <p className="ml-6 mt-1 text-xs text-muted-foreground">
                (Persisted to localStorage)
              </p>
            </div>

            <Button
              type="submit"
              disabled={!formValid}
              className={
                formValid
                  ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600"
                  : ""
              }
            >
              {formValid
                ? "Submit Registration"
                : "Please complete all required fields"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Form State (Live)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-muted p-4">
            <pre className="m-0 text-sm">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Form valid:{" "}
            <code className={formValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
              {formValid ? "true" : "false"}
            </code>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <Kbd>Jotai</Kbd> provides primitive and flexible atomic state management
            </li>
            <li>
              <Kbd>atom()</Kbd> creates a piece of state (primitive atom)
            </li>
            <li>Derived atoms automatically compute values from other atoms</li>
            <li>
              <Kbd>useAtom()</Kbd> hook provides both value and setter
            </li>
            <li>
              <Kbd>useAtomValue()</Kbd> for read-only access (optimization)
            </li>
            <li>
              <Kbd>atomWithStorage()</Kbd> persists atom value to localStorage
            </li>
            <li>
              Fine-grained reactivity - components only re-render when their
              atoms change
            </li>
            <li>No providers needed at the root level</li>
            <li>TypeScript support with full type inference</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Atomic State Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-base font-semibold text-green-600 dark:text-green-400">✓ Advantages</h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Minimal boilerplate</li>
                <li>Natural composition of state</li>
                <li>Derived state is easy and efficient</li>
                <li>Bottom-up architecture</li>
                <li>Excellent for forms</li>
                <li>Suspense support</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold">📋 Best For</h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>Complex forms with dependencies</li>
                <li>Computed/derived values</li>
                <li>Fine-grained reactivity</li>
                <li>Incrementally adoptable state</li>
                <li>When atoms naturally model your domain</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </ExampleLayout>
  );
};

export default JotaiExample;
