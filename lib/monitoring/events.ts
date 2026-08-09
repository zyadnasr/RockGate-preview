/**
 * Canonical event names shared by the tracking layer. Components that are
 * wired through the delegated `data-analytics` tracker reference these as
 * attribute values, and the tracker treats any `data-analytics="..."` value
 * as an event name.
 */
export const EVENTS = {
  pageView: "page_view",
  heroCtaClick: "hero_cta_click",
  contactFormSubmit: "contact_form_submit",
  projectSelect: "project_select",
  themeToggle: "theme_toggle",
  phoneClick: "phone_click",
  emailClick: "email_click",
  outboundClick: "outbound_click",
  navClick: "nav_click",
  scrollDepth: "scroll_depth",
  webVital: "web_vital",
  routeTransition: "route_transition",
  errorCaptured: "error_captured",
} as const;
