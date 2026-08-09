// Preview copy: the `import "server-only"` guard from the original is removed
// so this runs during static export (build-time SSR). Original file untouched.

/** Canonical origin. Override in production with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rockgate.example.com";

export const SITE_TITLE = "Rock Gate — Construction, Engineering & Contracting in Egypt";
export const SITE_DESCRIPTION =
  "Rock Gate is an Egyptian construction and engineering company delivering general contracting, infrastructure, interior finishing and project management across Egypt.";

/** Stable @id anchors used to tie structured-data graphs together. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
