/**
 * ============================================
 * File Creation/Modification Notes
 * ============================================
 * Creation Reason:
 *   Next.js default 500 output is English-only. AeroNyx localized pages need a
 *   consistent server-error experience across English, Russian, Chinese,
 *   Japanese, Korean, and Spanish.
 *
 * Modification Reason:
 *   v1.0 - Localized custom 500 page.
 *
 * Main Functionality:
 *   - Reuses ErrorPageShell from pages/404.js for the shared visual language.
 *   - Renders localized server-error copy without exposing request metadata,
 *     diagnostics, or user-level information.
 *
 * Dependencies:
 *   - pages/404.js ErrorPageShell.
 *   - lib/i18n errorPages.serverError copy through the shared shell.
 *
 * Main Logical Flow:
 *   1. Import the shared error-page shell.
 *   2. Render the server-error variant with status code 500.
 *
 * Important Note for Next Developer:
 *   - Keep this page minimal. Public server-error pages should not leak
 *     operational details or identifiers.
 *   - If the 404 shell changes route behavior, verify this page still keeps
 *     localized navigation and safe public copy.
 *
 * Last Modified: v1.0 - Localized 500 page
 * ============================================
 */

import { ErrorPageShell } from './404';

const Custom500 = () => <ErrorPageShell kind="serverError" statusCode="500" />;

export default Custom500;
