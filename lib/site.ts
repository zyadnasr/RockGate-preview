// Preview copy: the `import "server-only"` guard from the original is removed
// so this runs during static export (build-time SSR). Original file untouched.

/** Canonical origin. Override with NEXT_PUBLIC_SITE_URL if the host changes. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://zyadnasr.github.io/RockGate-preview";

export const SITE_TITLE = "Rock Gate — Construction, Engineering & Contracting in Egypt";
export const SITE_DESCRIPTION =
  "Rock Gate is an Egyptian construction and engineering company delivering general contracting, infrastructure, interior finishing and project management across Egypt.";

/** Stable @id anchors used to tie structured-data graphs together. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
