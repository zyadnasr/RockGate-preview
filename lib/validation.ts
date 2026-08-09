import { PROJECT_TYPES } from "@/lib/data";

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  projectAddress: string;
  projectType: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  projectAddress?: string;
  projectType?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2 || name.length > 100) {
    errors.name = "Name must be between 2 and 100 characters.";
  }

  const email = values.email.trim().toLowerCase();
  if (!email) {
    errors.email = "Email is required.";
  } else if (email.length > 254 || !EMAIL_PATTERN.test(email) || email.includes("..")) {
    errors.email = "Please enter a valid email address.";
  }

  const phone = values.phone.trim();
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_PATTERN.test(phone) || phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }

  const address = values.projectAddress.trim();
  if (!address) {
    errors.projectAddress = "Project address is required.";
  } else if (address.length < 5 || address.length > 200) {
    errors.projectAddress = "Please provide a valid project address.";
  }

  const projectType = values.projectType.trim();
  if (!projectType) {
    errors.projectType = "Please select a project type.";
  } else if (!(PROJECT_TYPES as readonly string[]).includes(projectType)) {
    errors.projectType = "Please select a valid project type.";
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = "Please describe your project.";
  } else if (message.length < 20) {
    errors.message = "Please provide more detail (at least 20 characters).";
  } else if (message.length > 5000) {
    errors.message = "Message is too long (maximum 5000 characters).";
  }

  return errors;
}
