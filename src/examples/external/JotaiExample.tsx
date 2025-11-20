import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

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
      alert("Form submitted successfully! Check console for data.");
      console.log("Form Data:", formData);
    }
  };

  const getStrengthColor = (score: number) => {
    if (score === 0) return "#666";
    if (score === 1) return "#e74c3c";
    if (score === 2) return "#f39c12";
    return "#2ecc71";
  };

  return (
    <div className="example-container">
      <div className="example-header">
        <h1>Jotai</h1>
        <p>Atomic state management with derived values and dependencies</p>
      </div>

      <div className="example-section">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.25rem",
                  fontSize: "0.875rem",
                  color: "#999",
                }}
              >
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.25rem",
                  fontSize: "0.875rem",
                  color: "#999",
                }}
              >
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {fullName && (
            <div
              className="success"
              style={{ padding: "0.5rem", fontSize: "0.875rem" }}
            >
              Welcome, <strong>{fullName}</strong>!
            </div>
          )}

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
                color: "#999",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              style={{ width: "100%" }}
            />
            {email && (
              <div
                style={{
                  marginTop: "0.25rem",
                  fontSize: "0.75rem",
                  color: emailValid ? "#2ecc71" : "#e74c3c",
                }}
              >
                {emailValid ? "✓ Valid email" : "✗ Invalid email format"}
              </div>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
                color: "#999",
              }}
            >
              Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="de">Germany</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
                color: "#999",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{ width: "100%" }}
            />
            {password && (
              <div style={{ marginTop: "0.5rem" }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#999",
                    marginBottom: "0.25rem",
                  }}
                >
                  Password strength:{" "}
                  <span
                    style={{ color: getStrengthColor(passwordStrength.score) }}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
                <div
                  style={{
                    height: "4px",
                    background: "#2a2a2a",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(passwordStrength.score / 3) * 100}%`,
                      background: getStrengthColor(passwordStrength.score),
                      transition: "width 0.3s, background-color 0.3s",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
                color: "#999",
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              style={{ width: "100%" }}
            />
            {confirmPassword && (
              <div
                style={{
                  marginTop: "0.25rem",
                  fontSize: "0.75rem",
                  color: passwordsMatch ? "#2ecc71" : "#e74c3c",
                }}
              >
                {passwordsMatch
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </div>
            )}
          </div>

          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span>I agree to the terms and conditions</span>
            </label>
            <p
              style={{
                margin: "0.25rem 0 0 1.75rem",
                fontSize: "0.75rem",
                color: "#999",
              }}
            >
              (Persisted to localStorage)
            </p>
          </div>

          <button
            type="submit"
            disabled={!formValid}
            style={{ padding: "0.75rem" }}
          >
            {formValid
              ? "Submit Registration"
              : "Please complete all required fields"}
          </button>
        </form>
      </div>

      <div className="example-section">
        <h2>Form State (Live)</h2>
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "4px",
            padding: "1rem",
          }}
        >
          <pre style={{ margin: 0, fontSize: "0.875rem" }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
        <div
          style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#999" }}
        >
          Form valid:{" "}
          <code style={{ color: formValid ? "#2ecc71" : "#e74c3c" }}>
            {formValid ? "true" : "false"}
          </code>
        </div>
      </div>

      <div className="example-section">
        <h2>Key Concepts</h2>
        <ul style={{ color: "#999", lineHeight: "1.8" }}>
          <li>
            <strong>Jotai</strong> provides primitive and flexible atomic state
            management
          </li>
          <li>
            <code>atom()</code> creates a piece of state (primitive atom)
          </li>
          <li>Derived atoms automatically compute values from other atoms</li>
          <li>
            <code>useAtom()</code> hook provides both value and setter
          </li>
          <li>
            <code>useAtomValue()</code> for read-only access (optimization)
          </li>
          <li>
            <code>atomWithStorage()</code> persists atom value to localStorage
          </li>
          <li>
            Fine-grained reactivity - components only re-render when their atoms
            change
          </li>
          <li>No providers needed at the root level</li>
          <li>TypeScript support with full type inference</li>
        </ul>
      </div>

      <div className="example-section">
        <h2>Atomic State Benefits</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <h3
              style={{
                color: "#2ecc71",
                fontSize: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              ✓ Advantages
            </h3>
            <ul
              style={{ color: "#999", fontSize: "0.875rem", lineHeight: "1.6" }}
            >
              <li>Minimal boilerplate</li>
              <li>Natural composition of state</li>
              <li>Derived state is easy and efficient</li>
              <li>Bottom-up architecture</li>
              <li>Excellent for forms</li>
              <li>Suspense support</li>
            </ul>
          </div>
          <div>
            <h3
              style={{
                color: "#61dafb",
                fontSize: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              📋 Best For
            </h3>
            <ul
              style={{ color: "#999", fontSize: "0.875rem", lineHeight: "1.6" }}
            >
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
