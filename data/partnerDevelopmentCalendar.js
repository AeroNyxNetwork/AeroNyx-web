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
 *   - [PARTNER-LOCAL-EVIDENCE 2026-08-27 by Codex] Local commits and
 *     uncommitted source may be recorded when the exact verification boundary
 *     is stated and the entry remains distinct from pushed or released work.
 *
 * Last Modified: v2.5 - Added the September 3 Rust, client, and web evidence boundary.
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
  Object.freeze({
    date: '2026-08-27',
    entries: Object.freeze([
      Object.freeze({
        id: 'node-backup-restore-command-domains',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Backup and restore paths split into verified domains',
          zh: '備份與恢復流程完成可驗證領域拆分',
        }),
        summary: Object.freeze({
          en: 'Published relay error, backup, audit, inventory, prune, and restore command boundaries while preserving fail-closed ordering. GitHub main ceded91 passed 1,781 library tests with one ignored; no node deployment or restart was performed.',
          zh: '已發布 relay 錯誤、備份、審計、庫存、清理與恢復命令邊界，並保持失敗關閉順序。GitHub main ceded91 通過 1,781 項 library 測試、1 項忽略；未部署或重啟節點。',
        }),
      }),
      Object.freeze({
        id: 'client-membership-financial-recovery',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'Purchase recovery and error boundaries completed locally',
          zh: '購買恢復與錯誤邊界已在本地完成',
        }),
        summary: Object.freeze({
          en: 'Uncommitted local source keeps receipt state monotonic, releases every continuation action lease, and preserves retryable intent when routing or storage fails; static analysis and 170 focused tests passed. Commit, release-device, and real-order validation remain.',
          zh: '本地未提交源碼保持收據狀態單調、確保續接操作鎖在所有出口釋放，並在路由或儲存失敗時保留可重試意圖；靜態分析及 170 項聚焦測試通過。仍待提交、發布版真機與真實訂單驗證。',
        }),
      }),
      // [PARTNER-AUG27-CLOSEOUT 2026-08-29 by Codex] Backfill the verified
      // end-of-day state without advancing the published Rust head.
      Object.freeze({
        id: 'node-local-backup-creation-certification',
        area: 'node',
        status: 'active',
        title: Object.freeze({
          en: 'Local relay recovery and durable stores verified',
          zh: '本地中繼恢復與持久儲存完成驗證',
        }),
        summary: Object.freeze({
          en: 'Local unpushed commits through 241bb86 extracted backup creation and certification, replay and storage schemas, plus verified-submit and blind-route durable stores. Backup and route tests, cargo check, Clippy, and the 1,781-test full suite passed with one ignored; nothing was pushed or deployed.',
          zh: '本地未推送提交截至 241bb86，已拆出備份建立與認證、replay 與 storage schema，以及 verified-submit 與 blind-route 持久儲存。備份與路由專項、cargo check、Clippy 及 1,781 項完整測試通過、1 項忽略；未推送或部署。',
        }),
      }),
      Object.freeze({
        id: 'partner-report-through-august-27',
        area: 'web',
        status: 'complete',
        title: Object.freeze({
          en: 'Partner daily report updated through August 27',
          zh: '合作方開發日報更新至 8 月 27 日',
        }),
        summary: Object.freeze({
          en: 'Added the verified Rust publication baseline plus explicitly labelled local Rust and client evidence while keeping unpushed work and released builds distinct.',
          zh: '新增已核對的 Rust 發布基線，以及明確標示的本地 Rust 與客戶端證據，並保持未推送工作與正式發布版本清楚區分。',
        }),
      }),
    ]),
  }),
  // [PARTNER-AUG28-LOCAL-EVIDENCE 2026-08-29 by Codex] August 28 work was
  // source-reviewed locally and remains explicitly separate from release.
  Object.freeze({
    date: '2026-08-28',
    entries: Object.freeze([
      Object.freeze({
        id: 'node-blind-vault-anonymous-replica-workflow',
        area: 'node',
        status: 'active',
        title: Object.freeze({
          en: 'Blind Vault anonymous recovery and replica workflow built locally',
          zh: 'Blind Vault 匿名恢復與副本工作流已在本地建立',
        }),
        summary: Object.freeze({
          en: 'Local commits through 10f2a31 added encrypted onion replies, anonymous pull, put, delete and lease operations, private inventory commitments, capacity-aware admission, replica planning, execution, and fail-closed invariants. Formatting and static diff checks passed; cargo test, check, Clippy, push, and deployment remain.',
          zh: '本地提交截至 10f2a31，新增加密 onion 回程、匿名 pull、put、delete 與 lease 操作、私密 inventory commitment、容量感知准入、副本規劃、執行及 fail-closed 不變量。格式與靜態差異檢查通過；仍待 cargo test、check、Clippy、推送及部署。',
        }),
      }),
      Object.freeze({
        id: 'client-cross-device-p2p-import-hardening',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'P2P identity import transaction hardened locally',
          zh: 'P2P 身份導入事務已在本地加固',
        }),
        summary: Object.freeze({
          en: 'Uncommitted local source added single-flight pairing/import, full-key identity matching, authoritative signer checks, and rollback across Rust handles, secure storage, preferences, and identity indexes. An earlier checkpoint passed analyze, 22 P2P/lifecycle tests, and identity recovery; later August 28 revisions passed formatting and diff checks but still require current-tree validation.',
          zh: '本地未提交源碼加入單航班配對／導入、完整公鑰身份匹配、權威 signer 核對，以及 Rust handle、安全儲存、偏好資料與身份索引的失敗回滾。較早 checkpoint 通過 analyze、22 項 P2P／生命週期測試及身份恢復契約；8 月 28 日後續修改僅通過格式與差異檢查，仍待目前工作樹驗證。',
        }),
      }),
      Object.freeze({
        id: 'client-cross-device-service-continuity',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'Cross-device service continuity expanded locally',
          zh: '跨設備服務連續性已在本地擴展',
        }),
        summary: Object.freeze({
          en: 'Local source bound group/key recovery, Agent trust, APNs, VoIP, Relay, and RelayWS rebinding to the exact imported identity; it also covered offline dual-QR, desktop secure-link and backup-file paths, Android App Links, background ciphertext resume, and stale-contact cleanup. The short-code protocol gap, current-tree tests/builds, and cross-device hardware matrix remain.',
          zh: '本地源碼把群組／群密鑰恢復、Agent 信任、APNs、VoIP、Relay 與 RelayWS 重綁至精確導入身份；同時覆蓋離線雙 QR、桌面安全連結與備份檔路徑、Android App Link、背景密文續接及舊聯絡人清理。短碼協議缺口、目前工作樹測試／構建及跨設備真機矩陣仍待完成。',
        }),
      }),
      Object.freeze({
        id: 'partner-report-through-august-28',
        area: 'web',
        status: 'complete',
        title: Object.freeze({
          en: 'Partner daily report updated through August 28',
          zh: '合作方開發日報更新至 8 月 28 日',
        }),
        summary: Object.freeze({
          en: 'Backfilled the verified August 27 local closeout and added detailed August 28 Rust and client session evidence with pending validation, push, and release gates stated explicitly.',
          zh: '回填 8 月 27 日已驗證的本地 closeout，並新增 8 月 28 日詳細 Rust 與客戶端 session 證據，明確標示待驗證、推送與發布關卡。',
        }),
      }),
    ]),
  }),
  // [PARTNER-AUG29-CLIENT-AUDIT 2026-08-30 by Codex] August 29 produced
  // verifiable local client source, but current-tree validation still fails and
  // no newer Rust node publication evidence was found that day.
  Object.freeze({
    date: '2026-08-29',
    entries: Object.freeze([
      Object.freeze({
        id: 'client-wallet-backup-v2-import-guardrails',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'Wallet backup v2 and import guardrails advanced locally',
          zh: '錢包備份 v2 與導入護欄已在本地推進',
        }),
        summary: Object.freeze({
          en: 'Local August 29 source moved new backups to a versioned portable-root envelope, added bounded cross-device import and export checks, kept successful upgrade continuation in place, and tightened responsive backup and key-import controls. Current-tree verification is still red: flutter analyze reported 7 issues and focused wallet/backup tests failed to compile on undefined EthereumService, SolanaService, and SolanaDerivedKeyMaterial references in wallet_import_dialog.dart. Nothing was committed, pushed, or released.',
          zh: '8 月 29 日本地源碼把新備份改為帶版本的可攜根秘密封套，加入有界的跨設備導入與導出檢查，讓升級成功後可原地續接，並收緊備份與私鑰導入的響應式控制。當前工作樹驗證仍為紅燈：flutter analyze 回報 7 項問題，聚焦的 wallet/backup 測試因 wallet_import_dialog.dart 內未定義的 EthereumService、SolanaService 與 SolanaDerivedKeyMaterial 而無法編譯。尚未提交、推送或發布。',
        }),
      }),
      Object.freeze({
        id: 'partner-report-through-august-29',
        area: 'web',
        status: 'complete',
        title: Object.freeze({
          en: 'Partner daily report updated through August 29',
          zh: '合作方開發日報更新至 8 月 29 日',
        }),
        summary: Object.freeze({
          en: 'Added the August 29 local client backup and recovery boundary with its current validation blockers stated explicitly, while keeping Rust main at ceded91 because no newer August 29 node source change, pushed commit, deployment, or release was verified.',
          zh: '新增 8 月 29 日客戶端本地備份與恢復邊界，並明確標示目前驗證阻塞；Rust main 仍維持 ceded91，因為沒有核對到 8 月 29 日更新的節點源碼變更、已推送提交、部署或發布。',
        }),
      }),
    ]),
  }),
  // [PARTNER-AUG30-LOCAL-EVIDENCE 2026-08-30 by Codex] Keep today's local
  // Rust commits and uncommitted client source separate from published builds.
  Object.freeze({
    date: '2026-08-30',
    entries: Object.freeze([
      Object.freeze({
        id: 'node-blind-vault-durable-publication-resolution',
        area: 'node',
        status: 'active',
        title: Object.freeze({
          en: 'Blind Vault publication and resolution safety advanced locally',
          zh: 'Blind Vault 發布與解析安全已在本地推進',
        }),
        summary: Object.freeze({
          en: 'Local commits through c854089 added typed reply policies and atomic attempt resolution, retained failed publication state for exact retry, and carried an opaque journal binding from an owned send permit into durable resolution. Rustfmt, static review, and diff checks passed; cargo test, check, Clippy, push, and deployment remain.',
          zh: '本地提交截至 c854089，新增 typed reply policy 與原子 attempt resolution，保留發布失敗狀態供精確重試，並由 owned send permit 攜帶不透明 journal binding 進入持久解析。rustfmt、靜態審閱與差異檢查通過；仍待 cargo test、check、Clippy、推送及部署。',
        }),
      }),
      Object.freeze({
        id: 'node-recovery-store-path-and-diagnostic-hardening',
        area: 'node',
        status: 'active',
        title: Object.freeze({
          en: 'Recovery store paths and diagnostics hardened locally',
          zh: '恢復儲存路徑與診斷已在本地加固',
        }),
        summary: Object.freeze({
          en: 'Local commits pinned the recovery directory descriptor, fenced ownership, rejected ancestor symlinks with layered no-follow opens, and removed sensitive workflow, frame, protocol, and snapshot diagnostics. Formatting and diff checks passed; compilation, tests, push, and deployment remain.',
          zh: '本地提交固定 recovery 目錄 descriptor、加入 ownership fence、以分層 no-follow 開啟拒絕上層符號連結，並移除工作流、frame、協議與 snapshot 的敏感診斷。格式與差異檢查通過；仍待編譯、測試、推送及部署。',
        }),
      }),
      Object.freeze({
        id: 'client-wallet-secret-lifecycle-hardening',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'Wallet secret lifecycle hardened in local source',
          zh: '錢包秘密生命週期已在本地源碼加固',
        }),
        summary: Object.freeze({
          en: 'Uncommitted local source clears mnemonic and chain recovery slots on wallet deletion, binds private-key export to the active profile and chain, verifies every recovery slot before password change, and preserves file-only ciphertext for transaction rollback. Formatting and diff checks passed; analyze, tests, build, commit, push, and release remain.',
          zh: '本地未提交源碼在刪除錢包時清除助記詞與各鏈恢復槽，把私鑰導出綁定至目前 profile 與鏈，在修改密碼前驗證全部恢復槽，並保留 file-only 密文供事務回滾。格式與差異檢查通過；仍待 analyze、測試、構建、提交、推送及發布。',
        }),
      }),
      Object.freeze({
        id: 'client-backup-plaintext-and-import-boundaries',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'Backup plaintext and import boundaries tightened locally',
          zh: '備份明文與導入邊界已在本地收緊',
        }),
        summary: Object.freeze({
          en: 'Uncommitted local source removes stale mobile plaintext-share directories, aligns three encrypted recovery roots, verifies downloaded backup ciphertext, and guards identity changes. Import completion cleanup and mnemonic seed zeroing are still in progress; analyze, tests, build, commit, push, and release remain.',
          zh: '本地未提交源碼清除逾期的行動端明文分享目錄、對齊三類加密恢復根、驗證下載備份密文，並防護身份切換。導入完成後清理與助記詞 seed 清零仍在進行；仍待 analyze、測試、構建、提交、推送及發布。',
        }),
      }),
      Object.freeze({
        id: 'partner-report-through-august-30',
        area: 'web',
        status: 'complete',
        title: Object.freeze({
          en: 'Partner daily report updated through August 30',
          zh: '合作方開發日報更新至 8 月 30 日',
        }),
        summary: Object.freeze({
          en: 'Added the verified August 30 local Rust and client progress with validation, publication, and release boundaries stated explicitly; published client and Rust baselines remain unchanged.',
          zh: '新增 8 月 30 日經核對的本地 Rust 與客戶端進度，明確標示驗證、推送與發布邊界；客戶端及 Rust 正式發布基線維持不變。',
        }),
      }),
    ]),
  }),
  // [PARTNER-AUG31-VERIFIED-DELIVERY 2026-08-31 by Codex] Keep shipped Rust
  // and Docs evidence separate from client work that is still being verified.
  Object.freeze({
    date: '2026-08-31',
    entries: Object.freeze([
      Object.freeze({
        id: 'rust-node-durability-milestone-published',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Privacy-node durability milestone published',
          zh: '隱私節點持久性里程碑已發布',
        }),
        summary: Object.freeze({
          en: 'The protocol-node main line advanced through c4b701b after clean integration of Blind Vault recovery, replay-safe relay acknowledgements, bounded durable route data, private inode checks, request-bound relay evidence, schema v4, ownership-bound failed-publication cleanup, managed-volume growth admission, and non-blocking rejection of unsafe recovery files. Focused server suites and full server compile checks passed on the integrated line.',
          zh: '協議節點 main 已乾淨整合並推進至 c4b701b，涵蓋 Blind Vault 恢復、可安全重放的中繼確認、有界持久路由資料、私有 inode 驗證、與請求綁定的中繼證據、schema v4、綁定 ownership 的發布失敗清理、受管理磁碟增長准入，以及對不安全恢復檔案的非阻塞拒絕。整合線上的聚焦 server 測試組與完整 server 編譯檢查均通過。',
        }),
      }),
      Object.freeze({
        id: 'durable-blind-route-blob-bounds',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Durable blind-route BLOB boundaries enforced',
          zh: '持久盲路由 BLOB 邊界已落實',
        }),
        summary: Object.freeze({
          en: 'SQLite now validates opaque response type and size before materializing ciphertext, preserves reservation ownership on conflicts, and rejects impossible response shapes without mutating durable state. All seven focused regression tests passed.',
          zh: 'SQLite 現在會在物化密文前驗證不透明回應的類型與大小，在衝突時保留 reservation ownership，並在不改動持久狀態的前提下拒絕不可能的回應形狀。7 個聚焦回歸測試全部通過。',
        }),
      }),
      Object.freeze({
        id: 'private-recovery-and-backup-inode-guards',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Private recovery and backup inode checks hardened',
          zh: '私有恢復與備份 inode 驗證完成加固',
        }),
        summary: Object.freeze({
          en: 'Recovery and relay-backup files now verify type, effective ownership, link count, and private mode before mutation. Recovery publication tracks typed phases and pinned temp identity, while non-blocking opens ensure FIFO candidates cannot stall validation. Recovery 18/18, backup filesystem 8/8, audit 27/27, and server compile checks passed.',
          zh: '恢復與中繼備份檔案現在會在修改前驗證類型、有效所有權、連結數及私有權限。恢復發布會追蹤型別化 phase 與固定的 temp identity，非阻塞開啟亦確保 FIFO 候選檔無法卡住驗證。恢復 18/18、備份檔案系統 8/8、audit 27/27 及 server 編譯檢查均通過。',
        }),
      }),
      Object.freeze({
        id: 'blind-route-schema-v4-migration',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Blind-route durable schema migrated safely',
          zh: '盲路由持久 schema 完成安全遷移',
        }),
        summary: Object.freeze({
          en: 'Schema v4 now derives its ciphertext ceiling from the shared protocol constant and migrates v1-v3 data in one fail-closed transaction without extending existing leases. Blind-route 24/24, shared schema 2/2, and full server compile checks passed.',
          zh: 'Schema v4 現在由共用協議常數取得密文上限，並以單一 fail-closed transaction 遷移 v1-v3 資料，且不延長既有 lease。盲路由 24/24、共用 schema 2/2 及完整 server 編譯檢查均通過。',
        }),
      }),
      Object.freeze({
        id: 'managed-volume-growth-admission',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Managed-volume byte growth is now admitted atomically',
          zh: '受管理磁碟位元組增長完成原子准入',
        }),
        summary: Object.freeze({
          en: 'A per-volume typed permit now covers usage measurement through the complete mutation: writes on one volume serialize while independent volumes remain concurrent. Capacity returns 507, uncertain probes return fail-closed 503, and read, delete, recovery, and unmanaged storage remain compatible. All 104 focused tests, Clippy, and the full server compile check passed.',
          zh: '每個磁碟的型別化 permit 現在會覆蓋用量量測至完整 mutation：同一磁碟的寫入會串行，獨立磁碟仍可並行。容量不足回傳 507，探測不確定則 fail-closed 回傳 503；讀取、刪除、恢復及未受管理儲存維持相容。104 項聚焦測試、Clippy 與完整 server 編譯檢查均通過。',
        }),
      }),
      Object.freeze({
        id: 'relay-smoke-request-bound-terminal-proof',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Relay smoke success bound to one terminal receipt',
          zh: '中繼 smoke 成功已綁定單一 terminal receipt',
        }),
        summary: Object.freeze({
          en: 'The smoke verifier now requires a request- and message-matched response plus a terminal signature bound to the exact route, purpose, and opaque envelope. Focused proof tests passed 3/3; socket-bound live-fleet verification remains pending.',
          zh: 'Smoke 驗證現在要求請求與訊息完全對應的回應，以及綁定精確 route、purpose 與不透明 envelope 的 terminal 簽名。聚焦 proof 測試 3/3 通過；需要 socket 的真實節點群驗證仍待完成。',
        }),
      }),
      Object.freeze({
        id: 'docs-seven-language-evidence-release',
        area: 'docs',
        status: 'complete',
        title: Object.freeze({
          en: 'Seven-language protocol evidence refreshed',
          zh: '七語協議證據已更新',
        }),
        summary: Object.freeze({
          en: 'Four canonical protocol pages and 28 localized URLs are live in English, Simplified Chinese, Traditional Chinese, Japanese, Korean, Russian, and Spanish. Article APIs, rendered pages, sitemap entries, internal links, canonical tags, hreflang, and the machine-readable llms evidence header were reverified.',
          zh: '4 個 canonical 協議頁與 28 個在地化 URL 已以英文、簡體中文、繁體中文、日文、韓文、俄文及西班牙文上線。文章 API、渲染頁面、sitemap、內鏈、canonical、hreflang 與可機器讀取的 llms 證據標頭均已重新驗證。',
        }),
      }),
      Object.freeze({
        id: 'client-anonymous-chat-and-channel-ui',
        area: 'client',
        status: 'complete',
        title: Object.freeze({
          en: 'Anonymous web chat and channel UI advanced',
          zh: '匿名網頁聊天與頻道 UI 完成推進',
        }),
        summary: Object.freeze({
          en: 'Anonymous chat-link creation and revocation plus adaptive channel UI were committed with focused service and screen tests. The current client HEAD is 53a981f; existing 1.0.18+14 platform artifacts predate that HEAD and are not presented as a fresh reproducible release.',
          zh: '匿名聊天連結建立與撤銷、頻道自適應 UI 已提交，並附 service 與畫面聚焦測試。目前客戶端 HEAD 為 53a981f；現有 1.0.18+14 多平台產物早於該 HEAD，因此不列為本輪可重現的新發布。',
        }),
      }),
      Object.freeze({
        id: 'client-wallet-recovery-verification',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'Wallet and encrypted recovery work remains active',
          zh: '錢包與加密恢復工作持續進行',
        }),
        summary: Object.freeze({
          en: 'Wallet create, import, delete, account projection, encrypted P2P backup, and device-pairing safeguards remain in an uncommitted client tree. They stay active until scoped review, analysis, focused tests, and clean four-platform rebuild evidence are complete.',
          zh: '錢包建立、導入、刪除、帳戶投影、加密 P2P 備份及設備配對防護仍在未提交客戶端工作樹中。完成範圍審核、分析、聚焦測試及乾淨的四平台重建證據前，維持進行中狀態。',
        }),
      }),
      Object.freeze({
        id: 'rust-next-security-contracts',
        area: 'node',
        status: 'active',
        title: Object.freeze({
          en: 'Next Rust safety contracts are in progress',
          zh: '下一輪 Rust 安全契約正在推進',
        }),
        summary: Object.freeze({
          en: 'The active work queue covers authoritative miner-owner binding, durable relay resource-bound review, and socket-bound live-fleet relay verification.',
          zh: '目前工作佇列包括權威 miner owner 綁定、持久中繼資源邊界審核，以及需要 socket 的真實節點群中繼驗證。',
        }),
      }),
      Object.freeze({
        id: 'partner-report-through-august-31',
        area: 'web',
        status: 'complete',
        title: Object.freeze({
          en: 'Partner daily report updated through August 31',
          zh: '合作方開發日報更新至 8 月 31 日',
        }),
        summary: Object.freeze({
          en: 'Added today\'s published Rust and Docs evidence, kept active client work distinct from delivered milestones, and listed the next verified engineering targets.',
          zh: '新增今日已發布的 Rust 與 Docs 證據，將進行中的客戶端工作與已交付里程碑分開，並列出下一輪可驗證的工程目標。',
        }),
      }),
    ]),
  }),
  // [PARTNER-SEP01-RUST-INTEGRATION 2026-09-01 by Codex] Keep locally
  // integrated evidence distinct from remote release and fleet rollout.
  Object.freeze({
    date: '2026-09-01',
    entries: Object.freeze([
      Object.freeze({
        id: 'node-backup-hardlink-crash-recovery',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Backup audit crash recovery completed',
          zh: '備份審計崩潰恢復完成',
        }),
        summary: Object.freeze({
          en: 'Local Rust commit 720c969 now recovers the two valid hard-link publication windows for active segments and checkpoints without weakening ordinary single-link file checks. Identity, ownership, mode, and link count are reverified before removal; 36 focused backup-audit tests passed and `cargo check -p aeronyx-server` succeeded.',
          zh: '本地 Rust 提交 720c969 現可恢復 active segment 與 checkpoint 的兩個合法 hard-link 發布窗口，同時不放寬一般單連結檔案驗證。刪除前會重新驗證 identity、ownership、mode 與 link count；36 項聚焦 backup-audit 測試通過，`cargo check -p aeronyx-server` 亦成功。',
        }),
      }),
      Object.freeze({
        id: 'node-private-candidate-public-boundary',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Private relay candidates removed from public selection',
          zh: '私密中繼候選已從公開選擇移除',
        }),
        summary: Object.freeze({
          en: 'Public onion-candidate selection now excludes descriptors that did not opt into public discovery, while internal private routing remains available. The change is integrated locally through c105755; the exact private/public candidate endpoint regression passed, and three onion-candidate exclusion telemetry regressions also passed.',
          zh: '公開 onion candidate 選擇現在會排除未選擇公開發現的 descriptor，內部私密路由仍保持可用。此修復已在本地整合至 c105755；精確的私密／公開候選 endpoint 回歸測試通過，另有 3 項 onion candidate 排除 telemetry 回歸通過。',
        }),
      }),
      Object.freeze({
        id: 'node-full-mirror-provenance-recovery',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Full-node mirror recovery and fork preflight verified',
          zh: '全節點鏡像恢復與分叉預檢已驗證',
        }),
        summary: Object.freeze({
          en: 'The local Rust integration line now separates producer-signed provenance from carrier-reported progress and lets a retained mirror resume through an admitted carrier after producer discovery expires. A typed preflight validates author, signature, and common predecessor before any same-page fork mutation, preventing invalid claims from causing quarantine and valid forks from leaving block rows ahead of the durable tip. Directory-replica tests passed 131/131 and the server library compiled successfully through 53d2d70; remote release and fleet rollout remain separate gates.',
          zh: '本地 Rust 整合線現已區分 producer 簽名來源與 carrier 回報進度，並允許已持久化 mirror 在 producer 發現資訊過期後，經合規 carrier 繼續恢復。Typed preflight 會在任何同頁分叉寫入前驗證 author、signature 與共同前序，避免無效宣告造成隔離，也避免有效分叉令 block rows 超前於 durable tip。Directory replica 測試 131/131 通過，server library 已在 53d2d70 編譯成功；遠端發布與 fleet rollout 仍是獨立關卡。',
        }),
      }),
      Object.freeze({
        id: 'node-public-discovery-projection-audit',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Public discovery projections now enforce privacy boundaries',
          zh: '公開發現投影已完成隱私邊界加固',
        }),
        summary: Object.freeze({
          en: 'Public snapshot requests can no longer downgrade descriptor visibility, and public status now removes private or ambiguous candidate, path, health, event, and audit rows using full verified node membership. Three public-projection tests, three existing exclusion regressions, and `cargo check -p aeronyx-server` passed on the local integration line through bee3e8f.',
          zh: '公開 snapshot 請求不再能降低 descriptor 可見性；公開 status 會依完整且已驗證的 node membership，移除私密或具歧義的 candidate、path、health、event 與 audit rows。3 項 public projection 測試、3 項既有排除回歸，以及 `cargo check -p aeronyx-server` 均在本地整合線 bee3e8f 通過。',
        }),
      }),
      // [PARTNER-SEP01-CLIENT-AUDIT 2026-09-02 by Codex] Keep the uncommitted
      // client route-safety work distinct from any shipped or pushed build.
      Object.freeze({
        id: 'client-desktop-and-wallet-route-safety',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'Desktop agent and wallet route safety stays in progress',
          zh: '桌面 agent 與錢包 route 安全仍在進行中',
        }),
        summary: Object.freeze({
          en: 'Uncommitted Sep 1 client changes keep desktop handoff and approval routing route-safe, and bind wallet backup, verify, and delete dialogs to their owning routes under competing overlays. Focused `flutter analyze` reported one `implementation_imports` info only. No new client commit, push, or release was verified; published build remains 1.0.18+14.',
          zh: '未提交的 9 月 1 日客戶端修改讓桌面 handoff 與 approval 路由保持 route-safe，並把錢包備份、驗證與刪除對話框綁定到各自擁有的 route，即使有競爭中的 overlay 也不會誤退。聚焦 `flutter analyze` 只有 1 個 `implementation_imports` info；未核對到新的客戶端提交、推送或發布，正式版本仍為 1.0.18+14。',
        }),
      }),
      Object.freeze({
        id: 'client-wallet-widget-compile-gate',
        area: 'client',
        status: 'next',
        title: Object.freeze({
          en: 'Resolve wallet widget compile blockers next',
          zh: '下一步先解決錢包 widget 編譯阻塞',
        }),
        summary: Object.freeze({
          en: 'Focused widget tests for the model selector and wallet delete flow are currently blocked by unresolved `EthereumService`, `SolanaService`, and `SolanaDerivedKeyMaterial` references in `wallet_import_dialog.dart`. `wallet_unlock_continuity_contract_test.dart` still passed 3/3.',
          zh: 'Model selector 與 wallet delete flow 的聚焦 widget 測試目前被 `wallet_import_dialog.dart` 中未解的 `EthereumService`、`SolanaService` 與 `SolanaDerivedKeyMaterial` 引用阻塞；`wallet_unlock_continuity_contract_test.dart` 仍然 3/3 通過。',
        }),
      }),
      Object.freeze({
        id: 'partner-report-through-september-1',
        area: 'web',
        status: 'complete',
        title: Object.freeze({
          en: 'Partner daily report updated through September 1',
          zh: '合作方開發日報更新至 9 月 1 日',
        }),
        summary: Object.freeze({
          en: 'Added today\'s verified Rust hardening evidence and the explicit client compile gate while keeping local integration distinct from remote release, pushed commits, and shipped builds.',
          zh: '新增今日已驗證的 Rust 加固證據與明確的客戶端編譯關卡，同時將本地整合與遠端發布、已推送提交及正式發布版本清楚區分。',
        }),
      }),
    ]),
  }),
  // [PARTNER-SEP02-TEST-BOUNDARY 2026-09-02 by Codex] Keep September 2 claims
  // tied to rerun Rust tests, remote main, and explicit unpublished gates.
  Object.freeze({
    date: '2026-09-02',
    entries: Object.freeze([
      Object.freeze({
        id: 'chat-dispatch-memchain-optional-fix',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Completed: released online verified-relay source baseline',
          zh: '已完成：已發布線上 verified-relay 源碼基線',
        }),
        summary: Object.freeze({
          en: 'Remote main 1d23f46ab4c497a2b3290b7d32905099a7b28009 is the released source baseline. In the September 2 audit, focused server test `verified_submit_dispatches_and_responds_with_memchain_storage_off` passed, confirming chat dispatch still works with MemChain storage off.',
          zh: 'remote main 1d23f46ab4c497a2b3290b7d32905099a7b28009 是已發布的源碼基線。9 月 2 日核對中，聚焦 server 測試 `verified_submit_dispatches_and_responds_with_memchain_storage_off` 通過，確認在 MemChain 存儲關閉時聊天派發仍可正常運作。',
        }),
      }),
      Object.freeze({
        id: 'unpublished-mailbox-integration-evidence',
        area: 'node',
        status: 'active',
        title: Object.freeze({
          en: 'In progress: M13 integration building blocks and M13C wiring',
          zh: '進行中：M13 整合 building blocks 與 M13C 接線',
        }),
        summary: Object.freeze({
          en: 'Unpublished integration 57dd6b2 has `cargo test -p aeronyx-core` passing at 295/295, a passing server library cargo check, and a passing focused stale-replay regression (`verified_submit_stale_exact_completed_replays_in_process_and_after_restart`). M13A, M13B, and M13A.3 building blocks are integrated; M13C wiring is in progress. Anonymous mailbox is not production wired.',
          zh: '未發布整合版本 57dd6b2 的 `cargo test -p aeronyx-core` 295/295 通過、server library cargo check 通過，聚焦 stale-replay 回歸 `verified_submit_stale_exact_completed_replays_in_process_and_after_restart` 亦已通過。M13A、M13B 與 M13A.3 building blocks 已整合；M13C 接線進行中。匿名郵箱尚未 production wired。',
        }),
      }),
      Object.freeze({
        id: 'berlin-upgrade-still-pending',
        area: 'node',
        status: 'next',
        title: Object.freeze({
          en: 'Next: M13C, routing, review/release, and fleet smoke',
          zh: '下一步：M13C、路由、review/release 與 fleet smoke',
        }),
        summary: Object.freeze({
          en: 'Next are M13C, ticket issuer and exact-target route, S/M/T/R, review/release, then fleet smoke. These steps remain unpublished and separate from the released main baseline.',
          zh: '下一步是 M13C、ticket issuer 與精確目標路由、S/M/T/R、review/release，然後才是 fleet smoke。這些步驟仍未發布，並且與已發布的 main 基線分開。',
        }),
      }),
    ]),
  }),
  // [PARTNER-SEP03-AFTERNOON-EVIDENCE 2026-09-03 by Codex] Keep published,
  // locally verified, and next-gate work separate in partner-facing language.
  Object.freeze({
    date: '2026-09-03',
    entries: Object.freeze([
      Object.freeze({
        id: 'released-online-relay-baseline',
        area: 'node',
        status: 'complete',
        title: Object.freeze({
          en: 'Completed: published online relay and chat baseline',
          zh: '已完成：已發布線上中繼和聊天基線',
        }),
        summary: Object.freeze({
          en: 'Remote main 1d23f46ab4c497a2b3290b7d32905099a7b28009 remains the published baseline. Online relay and chat dispatch continue to work with MemChain storage disabled. Anonymous mailbox production wiring and a new live smoke are not part of this completed item.',
          zh: 'remote main 1d23f46ab4c497a2b3290b7d32905099a7b28009 仍是已發布基線。MemChain 存儲關閉時，線上中繼和聊天派發仍可使用。匿名郵箱 production 接線與新的 live smoke 都不屬於這個已完成項目。',
        }),
      }),
      Object.freeze({
        id: 'unpublished-m13c-terminal-api-wiring',
        area: 'node',
        status: 'active',
        title: Object.freeze({
          en: 'In progress: anonymous mailbox integration at 1a21cdd',
          zh: '進行中：匿名郵箱整合推進至 1a21cdd',
        }),
        summary: Object.freeze({
          en: 'Unpublished integration 1a21cdd9698053ce0683efad79bb85508cce8e2e now includes exact-target source coordination, terminal lifecycle, admission tickets, and bounded journal state. Focused results are source journal 6/6, terminal 6/6, store 28/28, core mailbox 25/25, plus a passing server-library check. Production composition remains unfinished, the feature stays disabled by default, and this commit is not on public main.',
          zh: '未發布整合 1a21cdd9698053ce0683efad79bb85508cce8e2e 現已包含精確目標 source coordination、終端生命週期、admission ticket 與有界 journal state。聚焦結果為 source journal 6/6、terminal 6/6、store 28/28、core mailbox 25/25，另有 server-library check 通過。production composition 尚未完成，功能仍默認關閉，且此提交不在公開 main。',
        }),
      }),
      Object.freeze({
        id: 'client-livekit-reconnect-lifecycle',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'In progress: call startup and reconnect ownership',
          zh: '進行中：通話啟動與重連生命週期',
        }),
        summary: Object.freeze({
          en: 'Local uncommitted client source now lets the LiveKit engine own legitimate reconnects, rebuilds audio state after a full restart, and adds one bounded retry for fast initial transport failures with privacy-safe phase telemetry. Microphone command and UI-state consistency during temporary SDK unavailability remains under review. Dart formatting and a scoped diff check pass; analyze, tests, builds, commit, push, and release have not run.',
          zh: '本地未提交客戶端源碼現由 LiveKit engine 管理合法重連，在完整 restart 後重建音訊狀態，並為快速初始傳輸失敗加入一次有界重試與不含敏感資料的階段遙測。SDK 暫時不可用時的麥克風命令與 UI 狀態一致性仍在審查。Dart 格式化與 scoped diff check 通過；尚未執行 analyze、測試、構建、提交、推送或發布。',
        }),
      }),
      Object.freeze({
        id: 'client-callkit-reset-fence',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'In progress: cold-start call reset race protection',
          zh: '進行中：冷啟動通話 reset 競態防護',
        }),
        summary: Object.freeze({
          en: 'Local uncommitted client source adds an app-lifetime generation fence so a reset call cannot be revived by an in-flight cold-start join. Group-call invite queue expiry is still under review against the call deadline. Formatting and scoped diff checks pass; no analyze, test, build, commit, push, or release is verified.',
          zh: '本地未提交客戶端源碼加入 app-lifetime generation fence，避免已 reset 的通話被尚在執行的冷啟動 join 重新喚起。群組通話邀請佇列的到期行為仍在對照通話 deadline 審查。格式化與 scoped diff check 通過；沒有已驗證的 analyze、測試、構建、提交、推送或發布。',
        }),
      }),
      Object.freeze({
        id: 'partner-daily-september-3-evidence',
        area: 'web',
        status: 'complete',
        title: Object.freeze({
          en: 'Completed: September 3 evidence is visible on entry',
          zh: '已完成：入口首頁展示 9 月 3 日證據',
        }),
        summary: Object.freeze({
          en: 'The first-screen daily module and full calendar now share the same bilingual September 3 evidence. Published, local in-progress, and next-gate work remain visibly separate, with operational and private identifiers excluded.',
          zh: '首屏日報模塊與完整日曆現共用同一份雙語 9 月 3 日證據。已發布、本地進行中與下一步保持清楚分隔，並排除運維與私有識別資訊。',
        }),
      }),
      Object.freeze({
        id: 'anonymous-mailbox-end-to-end-gates',
        area: 'node',
        status: 'next',
        title: Object.freeze({
          en: 'Next: finish mailbox wiring, then review, release, and fleet smoke',
          zh: '下一步：完成郵箱接線，再進行 review、release 與 fleet smoke',
        }),
        summary: Object.freeze({
          en: 'Production startup composition, client descriptor and capability UX, integration review, release, and fleet smoke remain ahead. The cross-entry offline mailbox is not end-to-end wired or released, and ordinary chat must not enable it implicitly.',
          zh: 'production 啟動組合、客戶端 descriptor 與 capability UX、整合 review、release 和 fleet smoke 仍待完成。跨入口離線郵箱尚未端到端接線或發布，普通聊天也不得隱式啟用它。',
        }),
      }),
    ]),
  }),
]);
