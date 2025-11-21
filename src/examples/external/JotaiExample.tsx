import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ViewSourceLink } from "../../components/ui";

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
    if (score === 1) return "text-red-400";
    if (score === 2) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 border-b-2 border-gray-800 pb-4">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl text-cyan-400">Jotai</h1>
            <p className="text-gray-500">
              Atomic state management with derived values and dependencies
            </p>
          </div>
          <ViewSourceLink url={import.meta.url} />
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Registration Form</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-gray-500">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-500">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {fullName && (
            <div className="rounded bg-green-900/30 p-2 text-sm text-green-400">
              Welcome, <strong>{fullName}</strong>!
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm text-gray-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
            />
            {email && (
              <div
                className={`mt-1 text-xs ${
                  emailValid ? "text-green-400" : "text-red-400"
                }`}
              >
                {emailValid ? "✓ Valid email" : "✗ Invalid email format"}
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
            >
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="de">Germany</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
            />
            {password && (
              <div className="mt-2">
                <div className="mb-1 text-xs text-gray-500">
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
                    style={{ width: `${(passwordStrength.score / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none"
            />
            {confirmPassword && (
              <div
                className={`mt-1 text-xs ${
                  passwordsMatch ? "text-green-400" : "text-red-400"
                }`}
              >
                {passwordsMatch
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </div>
            )}
          </div>

          <div>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 cursor-pointer"
              />
              <span className="text-sm text-gray-200">
                I agree to the terms and conditions
              </span>
            </label>
            <p className="ml-6 mt-1 text-xs text-gray-500">
              (Persisted to localStorage)
            </p>
          </div>

          <button
            type="submit"
            disabled={!formValid}
            className={`rounded px-4 py-3 text-sm font-medium transition-all ${
              formValid
                ? "bg-cyan-500 text-gray-950 hover:bg-cyan-600 active:scale-95"
                : "cursor-not-allowed bg-gray-800 text-gray-500"
            }`}
          >
            {formValid
              ? "Submit Registration"
              : "Please complete all required fields"}
          </button>
        </form>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Form State (Live)</h2>
        <div className="rounded border border-gray-800 bg-gray-950 p-4">
          <pre className="m-0 text-sm">{JSON.stringify(formData, null, 2)}</pre>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Form valid:{" "}
          <code className={formValid ? "text-green-400" : "text-red-400"}>
            {formValid ? "true" : "false"}
          </code>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Key Concepts</h2>
        <ul className="list-inside space-y-2 leading-relaxed text-gray-500">
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              Jotai
            </code>{" "}
            provides primitive and flexible atomic state management
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              atom()
            </code>{" "}
            creates a piece of state (primitive atom)
          </li>
          <li>Derived atoms automatically compute values from other atoms</li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              useAtom()
            </code>{" "}
            hook provides both value and setter
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              useAtomValue()
            </code>{" "}
            for read-only access (optimization)
          </li>
          <li>
            <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-cyan-400">
              atomWithStorage()
            </code>{" "}
            persists atom value to localStorage
          </li>
          <li>
            Fine-grained reactivity - components only re-render when their atoms
            change
          </li>
          <li>No providers needed at the root level</li>
          <li>TypeScript support with full type inference</li>
        </ul>
      </div>

      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl text-gray-200">Atomic State Benefits</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-base text-green-400">✓ Advantages</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Minimal boilerplate</li>
              <li>Natural composition of state</li>
              <li>Derived state is easy and efficient</li>
              <li>Bottom-up architecture</li>
              <li>Excellent for forms</li>
              <li>Suspense support</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-base text-cyan-400">📋 Best For</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-500">
              <li>Complex forms with dependencies</li>
              <li>Computed/derived values</li>
              <li>Fine-grained reactivity</li>
              <li>Incrementally adoptable state</li>
              <li>When atoms naturally model your domain</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JotaiExample;
