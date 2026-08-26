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
 *   - [PARTNER-DEVELOPMENT-CALENDAR 2026-08-26 by Codex] Source-verified work
 *     may be recorded before release only when the remaining device or rollout
 *     gate is stated explicitly and the entry is not labelled as shipped.
 *
 * Last Modified: v1.1 - Client and Rust reports through 2026-08-26.
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
  Object.freeze({
    date: '2026-08-22',
    entries: Object.freeze([
      Object.freeze({
        id: 'client-membership-catalog-authority',
        area: 'client',
        status: 'complete',
        title: Object.freeze({
          en: 'Membership catalog ownership unified',
          zh: '會員套餐目錄完成單一資料源整合',
        }),
        summary: Object.freeze({
          en: 'Moved plan loading, caching, retry, and fail-closed purchase states into one provider; 95 focused tests and static analysis passed.',
          zh: '把套餐載入、快取、重試與失敗關閉購買狀態統一到單一 Provider；95 項聚焦測試與靜態分析通過。',
        }),
      }),
      Object.freeze({
        id: 'client-desktop-data-migration',
        area: 'client',
        status: 'complete',
        title: Object.freeze({
          en: 'Desktop data migration made testable',
          zh: '桌面資料遷移完成可測試化',
        }),
        summary: Object.freeze({
          en: 'Added bounded macOS Direct and Windows legacy-data migration stages, privacy-safe status logs, and regression tests before identity and wallet startup.',
          zh: '在身份與錢包啟動前加入有界的 macOS Direct 與 Windows 舊資料遷移、隱私安全狀態日誌及回歸測試。',
        }),
      }),
    ]),
  }),
  Object.freeze({
    date: '2026-08-23',
    entries: Object.freeze([
      Object.freeze({
        id: 'client-membership-entitlement-model',
        area: 'client',
        status: 'complete',
        title: Object.freeze({
          en: 'Membership entitlements unified',
          zh: '會員權益模型完成統一',
        }),
        summary: Object.freeze({
          en: 'Introduced one feature model for plans, wallet, membership details, and gates; expired plans now fall back to free rights. Flutter and backend tests passed.',
          zh: '套餐、錢包、會員詳情與功能門控改用同一權益模型；過期會員會回落到免費權益。Flutter 與後端測試通過。',
        }),
      }),
      Object.freeze({
        id: 'client-vpn-keychain-lifecycle',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'macOS VPN credential lifecycle hardened',
          zh: 'macOS VPN 憑證生命週期完成加固',
        }),
        summary: Object.freeze({
          en: 'Replaced repeated Keychain delete/recreate behavior with update-in-place storage and stabilized tunnel recovery; signed DMG device verification remains.',
          zh: '把重複刪除與重建 Keychain 改為原位更新，並穩定隧道恢復；仍待正式簽名 DMG 真機驗證。',
        }),
      }),
      Object.freeze({
        id: 'node-verified-submit-two-hop',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Verified client submission crossed two hops',
          zh: '已驗證客戶端提交跑通兩跳',
        }),
        summary: Object.freeze({
          en: 'Bound submit responses to exact requests, exposed privacy-safe health counters, and exercised the live encrypted submit path over two relay hops.',
          zh: '提交回應已綁定精確請求，新增隱私安全健康計數，並完成真實密文提交跨兩個中繼跳點的測試。',
        }),
      }),
    ]),
  }),
  Object.freeze({
    date: '2026-08-24',
    entries: Object.freeze([
      Object.freeze({
        id: 'client-vpn-membership-purchase-flow',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'VPN-to-membership purchase flow connected',
          zh: 'VPN 到會員購買流程完成串接',
        }),
        summary: Object.freeze({
          en: 'Connected quota exhaustion to plan selection, points redemption, payment return, and original-session continuation. Payment remains fail-closed until custody addresses and real-payment acceptance pass.',
          zh: '已串接額度耗盡、套餐選擇、積分兌換、付款返回與原連線續接；收款地址與真實付款驗收前，支付仍保持失敗關閉。',
        }),
      }),
      Object.freeze({
        id: 'node-durable-relay-replay',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Blind relay replay became restart-durable',
          zh: '盲中繼重放保護完成跨重啟持久化',
        }),
        summary: Object.freeze({
          en: 'Added durable exact-request admission and sealed ACK replay so retries remain idempotent across restart without persisting route ids or payload plaintext.',
          zh: '新增精確請求持久准入與密封 ACK 重放，讓重啟後重試仍保持冪等，且不保存 route id 或 payload 明文。',
        }),
      }),
    ]),
  }),
  Object.freeze({
    date: '2026-08-25',
    entries: Object.freeze([
      Object.freeze({
        id: 'client-payment-return-reconnect',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'Payment return and VPN resume made recoverable',
          zh: '付款返回與 VPN 續接完成可恢復化',
        }),
        summary: Object.freeze({
          en: 'Added deep-link return, authoritative membership refresh, an encrypted identity-scoped reconnect journal, and original-node resume. Real-account device acceptance is still required.',
          zh: '新增 Deep Link 返回、權威會員刷新、按身份隔離的加密續接日誌與原節點恢復；仍需真實帳戶真機驗收。',
        }),
      }),
      Object.freeze({
        id: 'node-custody-recovery-domains',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Encrypted custody recovery hardened',
          zh: '加密託管恢復完成加固',
        }),
        summary: Object.freeze({
          en: 'Recovered armed and middle-hop relay claims, reported verified recovery outcomes, and separated custody, cursor, replay, cleanup, and circuit responsibilities.',
          zh: '補齊 armed 與中間跳 claim 恢復、可驗證恢復結果，並拆分 custody、cursor、replay、cleanup 與 circuit 職責。',
        }),
      }),
    ]),
  }),
  Object.freeze({
    date: '2026-08-26',
    entries: Object.freeze([
      Object.freeze({
        id: 'client-membership-purchase-policy',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'Membership purchase state moved out of widgets',
          zh: '會員購買狀態完成 Widget 解耦',
        }),
        summary: Object.freeze({
          en: 'Unified loading, current-plan, purchasable, retry, and unavailable states behind a pure policy and lifecycle-safe ViewModel; 107 focused tests passed. Release-device validation remains.',
          zh: '以純策略與生命週期安全 ViewModel 統一載入中、目前方案、可購買、可重試與不可用狀態；107 項聚焦測試通過，仍待發布版真機驗證。',
        }),
      }),
      Object.freeze({
        id: 'client-wallet-identity-lease',
        area: 'client',
        status: 'complete',
        title: Object.freeze({
          en: 'Wallet identity races closed in reconnect flows',
          zh: '續接流程的錢包身份競態完成封堵',
        }),
        summary: Object.freeze({
          en: 'Bound entitlement checks, dialogs, delayed native failures, and reconnect cleanup to the initiating wallet so one identity cannot consume another identity\'s result.',
          zh: '額度判定、提示框、延遲原生錯誤與續接清理均綁定發起錢包，避免一個身份使用另一身份的結果。',
        }),
      }),
      Object.freeze({
        id: 'node-blind-relay-domain-composition',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Blind relay core split into composed domains',
          zh: '盲中繼核心完成組合式領域拆分',
        }),
        summary: Object.freeze({
          en: 'Separated admission, abuse control, replay ownership, durable codec, retry, transport, response policy, telemetry, and observation behind traits. GitHub main 3ee6183 passed 2,075 workspace tests with one ignored.',
          zh: '以 Trait 拆分准入、防濫用、重放所有權、持久 codec、重試、傳輸、回應策略、遙測與觀測。GitHub main 3ee6183 通過 2,075 項 workspace 測試，1 項忽略。',
        }),
      }),
      Object.freeze({
        id: 'partner-report-through-august-26',
        area: 'web',
        status: 'complete',
        title: Object.freeze({
          en: 'Partner daily report updated through August 26',
          zh: '合作方開發日報更新至 8 月 26 日',
        }),
        summary: Object.freeze({
          en: 'Added source- and test-reviewed client and Rust milestones for August 22–26 while keeping unreleased work distinct from shipped builds.',
          zh: '補充 8 月 22–26 日經源碼與測試核對的客戶端及 Rust 里程碑，並明確區分未發布工作與正式版本。',
        }),
      }),
    ]),
  }),
]);
