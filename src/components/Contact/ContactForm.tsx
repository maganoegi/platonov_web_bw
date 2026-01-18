import { useMemo, useState } from "react";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  company: z.string().optional() // honeypot (should stay empty)
});

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState<string>("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot

  const canSend = useMemo(() => {
    const r = Schema.safeParse({ name, email, message, company });
    return r.success;
  }, [name, email, message, company]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    const parsed = Schema.safeParse({ name, email, message, company });
    if (!parsed.success) {
      setErr("Please fill all fields correctly.");
      return;
    }

    // honeypot
    if (company.trim().length > 0) {
      setStatus("sent"); // pretend success (anti-spam)
      return;
    }

    setStatus("sending");
    try {
      // configure with env var; can be API Gateway URL or Express route
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || "/api/contact";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
    } catch {
      setStatus("error");
      setErr("Failed to send. Please try again later.");
    }
  }

  return (
    <form onSubmit={onSubmit} aria-label="Contact form">
      {/* Keep visuals unchanged: you’ll apply your existing classes/markup here.
          This is basic accessible structure without forcing new styling. */}
      <div>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} name="name" />
        </label>
      </div>
      <div>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
        </label>
      </div>
      <div>
        <label>
          Message
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} name="message" />
        </label>
      </div>

      {/* honeypot: visually hidden via your CSS (add a rule that doesn't affect layout) */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label>
          Company
          <input value={company} onChange={(e) => setCompany(e.target.value)} name="company" />
        </label>
      </div>

      <button type="submit" disabled={!canSend || status === "sending"}>
        {status === "sending" ? "Sending..." : "Send"}
      </button>

      {err ? <div role="alert">{err}</div> : null}
      {status === "sent" ? <div role="status">Sent.</div> : null}
    </form>
  );
}
