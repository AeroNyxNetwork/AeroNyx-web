/**
 * ============================================
 * File: data/partnerDevelopmentCalendar.js
 * ============================================
 * Creation Reason:
 *   Keep the unlisted partner brief current with a simple, public-safe record
 *   of AeroNyx development work completed or actively verified each day.
 *
 * Main Functionality:
 *   - Stores one ordered record per development date.
 *   - Keeps English and Chinese titles and summaries together.
 *   - Restricts entries to the fixed product areas and delivery states used by
 *     the partner calendar UI and machine-readable review export.
 *
 * Dependencies:
 *   - pages/partner/[accessKey].js imports this immutable dataset for the
 *     interactive calendar, print record, and JSON evidence snapshot.
 *
 * Main Logical Flow:
 *   1. Append a new ISO date after that day's work has been verified.
 *   2. Add concise entries with a unique id, area, status, and bilingual copy.
 *   3. The partner page derives month cells, counts, and selected-day details.
 *
 * Important Note for Next Developer:
 *   - [PARTNER-DEVELOPMENT-CALENDAR 2026-08-21 by Codex] Keep dates in strict
 *     ascending YYYY-MM-DD order and entry ids unique across the full file.
 *   - Record verified work, not activity theater or fictional percentages.
 *   - Never include route keys, customer data, node identities, private
 *     endpoints, credentials, payloads, or unreleased commercial terms.
 *   - Use only the areas client, node, web, or docs and the statuses complete,
 *     active, or next so the public export remains backward compatible.
 *   - Do not rewrite historical entries silently. Correct material errors with
 *     a clearly dated follow-up entry so partners can understand the change.
 *
 * Last Modified: v1.0 - Initial public-safe daily development calendar.
 * ============================================
 */

export const PARTNER_DEVELOPMENT_DAYS = Object.freeze([
  Object.freeze({
    date: '2026-08-19',
    entries: Object.freeze([
      Object.freeze({
        id: 'partner-review-system',
        area: 'web',
        status: 'complete',
        title: Object.freeze({
          en: 'Partner review system launched',
          zh: '合作方審閱系統上線',
        }),
        summary: Object.freeze({
          en: 'Added an unlisted, public-safe view of client delivery, Rust node progress, evidence, and review notes.',
          zh: '新增未列出的公開安全頁面，集中展示客戶端交付、Rust 節點進度、證據與審閱筆記。',
        }),
      }),
    ]),
  }),
  Object.freeze({
    date: '2026-08-21',
    entries: Object.freeze([
      Object.freeze({
        id: 'partner-delivery-board',
        area: 'web',
        status: 'complete',
        title: Object.freeze({
          en: 'Delivery view simplified',
          zh: '交付視圖完成簡化',
        }),
        summary: Object.freeze({
          en: 'Replaced the long report with a task list for completed, active, and next work, with evidence available on demand.',
          zh: '把長報告改成已完成、進行中與下一步任務清單，需要時再展開證據。',
        }),
      }),
      Object.freeze({
        id: 'rust-evidence-reverified',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Rust node baseline reverified',
          zh: 'Rust 節點基線重新核對',
        }),
        summary: Object.freeze({
          en: 'Confirmed GitHub main at 849bdcd and rechecked the bounded custody-witness latency milestone.',
          zh: '確認 GitHub main 為 849bdcd，並重新核對受限 custody witness 延遲里程碑。',
        }),
      }),
      Object.freeze({
        id: 'partner-status-copy-simplified',
        area: 'web',
        status: 'complete',
        title: Object.freeze({
          en: 'Current status language simplified',
          zh: '目前狀態文案完成簡化',
        }),
        summary: Object.freeze({
          en: 'Replaced defensive review language with four direct statements covering the default path, calls, ledger data, and payload privacy.',
          zh: '用四句直接說明默認路徑、通話、帳本資料與內容隱私，刪除防禦性和顧問式表達。',
        }),
      }),
      Object.freeze({
        id: 'daily-development-calendar',
        area: 'web',
        status: 'complete',
        title: Object.freeze({
          en: 'Daily development calendar added',
          zh: '每日開發日曆上線',
        }),
        summary: Object.freeze({
          en: 'Added a monthly, bilingual record so partners can review what changed on each development day.',
          zh: '新增雙語月曆，合作方可以按日期查看每天完成的開發更新。',
        }),
      }),
    ]),
  }),
]);
