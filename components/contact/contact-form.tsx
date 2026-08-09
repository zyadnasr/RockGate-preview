"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";
import { validateContactForm, type ContactFormValues, type ContactFormErrors } from "@/lib/validation";
import { PROJECT_TYPES } from "@/lib/data";
import { EVENTS, track } from "@/lib/monitoring";
import { EASE } from "@/components/animations/motion";

const INITIAL: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  projectAddress: "",
  projectType: "",
  message: "",
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const REQUEST_TIMEOUT_MS = 15_000;

export function ContactForm() {
  const [values, setValues] = React.useState<ContactFormValues>(INITIAL);
  const [errors, setErrors] = React.useState<ContactFormErrors>({});
  const [status, setStatus] = React.useState<SubmitStatus>("idle");
  const [website, setWebsite] = React.useState("");

  const handleChange = React.useCallback(
    (field: keyof ContactFormValues) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValues((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      },
    [errors],
  );

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (status === "submitting") return;

      const errs = validateContactForm(values);
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;

      if (website.trim()) {
        setStatus("success");
        setValues(INITIAL);
        return;
      }

      setStatus("submitting");

      // PREVIEW MODE — the original posts to /api/contact, which does not
      // exist on the GitHub Pages static host. To keep the UI functional in
      // the preview we short-circuit to a simulated success after a short
      // delay. No data leaves the browser.
      // TODO: In the production app, replace this block with the real
      // `fetch("/api/contact", { ... })` POST and success/error handling.
      window.setTimeout(() => {
        track(EVENTS.contactFormSubmit, { outcome: "success" });
        setStatus("success");
        setValues(INITIAL);
      }, 700);
    },
    [values, website, status],
  );

  const handleReset = React.useCallback(() => {
    setValues(INITIAL);
    setErrors({});
    setStatus("idle");
    setWebsite("");
  }, []);

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex flex-col items-center gap-6 rounded-xl border border-accent/30 bg-accent/5 p-12 text-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">Thank you.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our engineers will respond within one business day with a tailored proposal.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset}>
            Submit another enquiry
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          aria-busy={status === "submitting"}
          className="space-y-6"
          noValidate
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              label="Full name"
              placeholder="Ahmed Hassan"
              name="name"
              autoComplete="name"
              required
              value={values.name}
              onChange={handleChange("name")}
              error={errors.name}
            />
            <FormField
              label="Phone number"
              type="tel"
              placeholder="+20 100 000 0000"
              name="phone"
              autoComplete="tel"
              required
              value={values.phone}
              onChange={handleChange("phone")}
              error={errors.phone}
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              label="Email address"
              type="email"
              placeholder="ahmed@company.com"
              name="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={handleChange("email")}
              error={errors.email}
            />
            <FormField
              label="Project address / location"
              placeholder="Project address or site location"
              name="projectAddress"
              required
              value={values.projectAddress}
              onChange={handleChange("projectAddress")}
              error={errors.projectAddress}
            />
          </div>
          <FormField
            label="Project type"
            as="select"
            name="projectType"
            required
            value={values.projectType}
            onChange={handleChange("projectType")}
            error={errors.projectType}
          >
            <option value="">Select type...</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </FormField>
          <FormField
            label="Project description"
            as="textarea"
            placeholder="Tell us about your project — scope, timeline, site location, and any specific requirements..."
            name="message"
            required
            value={values.message}
            onChange={handleChange("message")}
            error={errors.message}
          />

          <div
            aria-hidden="true"
            className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
          >
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              disabled={status === "submitting"}
              className="w-full sm:w-auto"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                "Submit enquiry"
              )}
            </Button>
            <p className="text-xs text-muted-foreground/60">
              We&apos;ll respond within one business day.
            </p>
          </div>

          <div role="status" aria-live="polite">
            {status === "error" && (
              <p className="text-sm text-red-500 dark:text-red-400">Something went wrong. Please try again.</p>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
