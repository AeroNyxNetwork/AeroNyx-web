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
 * Last Modified: v1.7 - Added the verified August 31 release and active-work record.
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
          en: 'Rust privacy-node durability milestone published',
          zh: 'Rust 隱私節點持久性里程碑已發布',
        }),
        summary: Object.freeze({
          en: 'GitHub main advanced to 4e31a05 after a clean integration of Blind Vault recovery, replay-safe relay acknowledgements, managed-volume capacity enforcement, and privacy-safe relay diagnostics. The verified release line passed 270 core tests, focused server suites, and the server compile check.',
          zh: 'GitHub main 已推進至 4e31a05，乾淨整合 Blind Vault 恢復、可安全重放的中繼確認、受管理磁碟容量約束及隱私安全的中繼診斷。經驗證的發布線通過 270 個核心測試、聚焦 server 測試組及 server 編譯檢查。',
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
        id: 'client-meeting-agent-wallet-verification',
        area: 'client',
        status: 'active',
        title: Object.freeze({
          en: 'Client meeting, agent, and wallet work remains active',
          zh: '客戶端會議、Agent 與錢包工作持續進行',
        }),
        summary: Object.freeze({
          en: 'Meeting and screen-sharing, agent authorization, and wallet lifecycle work are present in the current development tree. The next client milestone remains active until its commit, analysis, focused tests, platform builds, and release evidence are verified.',
          zh: '目前開發樹中已有會議與螢幕共享、Agent 授權及錢包生命週期相關工作。下一個客戶端里程碑會在提交、分析、聚焦測試、多平台構建及發布證據完成驗證後轉為已完成。',
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
          en: 'The active work queue covers atomic managed-volume quota enforcement, a compatible blind-route schema ceiling, envelope-bound terminal delivery proof, and side-effect-free rejection of unsafe recovery control files.',
          zh: '目前工作佇列包括原子的受管理磁碟配額約束、相容的盲路由 schema 上限、與 envelope 綁定的 terminal delivery proof，以及對不安全恢復控制檔的零副作用拒絕。',
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
]);
