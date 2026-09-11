"use client";

import { FormEvent, useState } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

export function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <section className="home-newsletter home-section" aria-label="Newsletter signup">
      <div className="newsletter-inner"><div><p className="eyebrow">The Lunelle letter</p><h2>Stay in the <em>Lunelle</em> loop.</h2><p>Get first access to new collections, exclusive offers and seasonal edits.</p></div>{done ? <div className="newsletter-done"><CheckIcon size={16} /> You&apos;re on the list. Thank you.</div> : <form onSubmit={submit} className="home-newsletter-form"><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" aria-label="Your email address" /><button type="submit" aria-label="Subscribe"><ArrowRightIcon size={19} /></button></form>}</div>
    </section>
  );
}
