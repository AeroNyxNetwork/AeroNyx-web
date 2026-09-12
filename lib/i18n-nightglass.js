/**
 * ============================================
 * File: lib/i18n-nightglass.js
 * ============================================
 * [NIGHTGLASS-WEB 2026-09-12 by Claude] Copy for the product-led homepage
 * sections (hero + Product Lens, live proof, One Key, visibility ledger).
 *
 * Kept separate from lib/i18n.js on purpose: that file is a 6,000-line
 * merge contract shared by every page, and these strings belong to one
 * page. Every locale is deep-merged over English, so a missing string can
 * never surface a key or a blank — it falls back to the English sentence.
 *
 * Locales mirror lib/i18n.js SUPPORTED_LOCALES: en, ru, zh-Hant, zh-Hans,
 * ja, ko, es.
 * ============================================
 */

const en = {
  seo: {
    title: 'AeroNyx — Private messages, private AI, private money',
    description:
      'One app for encrypted messaging, confidential AI and a multi-chain wallet, carried by a decentralized network that only ever sees ciphertext. Keys stay on your device. Memory stays yours.',
  },
  hero: {
    eyebrow: 'Messages · AI · Money — one key you hold',
    title: 'Private by construction.',
    description:
      'AeroNyx is one app for encrypted messages, confidential AI and multi-chain money — carried by a decentralized network that only ever sees ciphertext. Keys stay on your device. Memory stays yours. Nobody in the middle can read a thing.',
    primaryCta: 'Download AeroNyx',
    secondaryCta: 'How it works',
    liveLabel: 'Live — carried without being read',
    liveUnit: 'bytes',
    nodesLabel: 'independent nodes reporting',
    plaintextLabel: 'plaintext recoverable by the network',
    plaintextValue: '0 B',
    lensHint: 'Drag the lens',
    lensCaption: 'Left: your phone. Right: what a relay node actually holds.',
    sliderLabel: 'Privacy lens: reveal what the network sees. Use the left and right arrow keys.',
    stamp: 'PLAINTEXT RECOVERED: 0 B',
  },
  phone: {
    contact: 'Mika',
    status: 'End-to-end encrypted',
    m1: 'Hey — is the Tokyo node back up?',
    m2: 'Yes. Back at 11:52 with 14 peers. Relay latency is under 40 ms again.',
    received: 'Received',
    receivedAmount: '+0.5 SOL',
    receivedMeta: '0.5000 SOL · 12:41',
    m3: 'got it, thank you',
    composer: 'Message',
    tabs: ['Chats', 'Channels', 'Nyx', 'Wallet', 'Me'],
    cipherHeader: 'relay node · blob view',
    cipherMeta: '{bytes} B · 2 hops · sender unknown',
    cipherFooter: 'no payload · no destination · no social graph',
  },
  proof: {
    eyebrow: 'Live protocol evidence',
    title: 'Carried. Never read.',
    description:
      'Every number below is aggregate health published by independent nodes. There is no node-level user activity to publish.',
    traffic: 'Encrypted traffic',
    trafficDetail: 'bytes relayed by the network',
    packets: 'Encrypted packets',
    packetsDetail: 'forwarded without inspection',
    nodes: 'Nodes reporting',
    nodesDetail: 'independent operators, signed health',
    readiness: 'Route readiness',
    readinessDetail: 'private two-hop paths',
    link: 'Full protocol status',
  },
  oneKey: {
    eyebrow: 'One key',
    title: 'Messages, AI and money — under one key you hold.',
    description:
      'The same identity signs a message, asks the model, and moves money. The network carries all three and can read none of them.',
    panels: [
      {
        name: 'Encrypted messaging',
        title: 'Chat, groups, calls — sealed end to end.',
        body: 'One-to-one, groups, voice and video, all end-to-end encrypted. Relay nodes forward sealed envelopes and keep no readable copy.',
        chips: ['E2E by default', 'Groups', 'Voice & video', 'Two-hop routes'],
        cta: 'Privacy Network',
        href: '/privacy-network',
      },
      {
        name: 'Nyx — confidential AI',
        title: 'An AI that helps without learning about you.',
        body: 'Fast, deep or confidential: the confidential mode runs inside a trusted enclave, and your memory is sealed with your own key. Nodes sync it; they cannot read it.',
        chips: ['Confidential mode', 'MemChain memory', 'Local-first recall'],
        cta: 'MemChain',
        href: '/memchain',
      },
      {
        name: 'Multi-chain wallet',
        title: 'Your keys, in Rust, on your device.',
        body: 'Solana, Ethereum, BNB Chain, Tron and TAO from one seed. Private keys live in a Rust keystore that never hands them to the app layer, and you sign only what you have read.',
        chips: ['SOL', 'ETH', 'BNB', 'TRX', 'TAO'],
        cta: 'Download',
        href: 'download',
      },
    ],
  },
  ledger: {
    eyebrow: 'Visibility boundary',
    title: 'What each layer can see.',
    description:
      'The protocol is built around one promise: every layer sees the minimum it needs to do its job — and nothing it could sell.',
    canSee: 'Can see',
    cannotSee: 'Cannot see',
  },
};

const ru = {
  seo: {
    title: 'AeroNyx — приватные сообщения, приватный ИИ, приватные деньги',
    description:
      'Одно приложение для зашифрованных сообщений, конфиденциального ИИ и мультичейн-кошелька — на децентрализованной сети, которая видит только шифртекст. Ключи остаются на устройстве. Память остаётся вашей.',
  },
  hero: {
    eyebrow: 'Сообщения · ИИ · Деньги — один ключ, который держите вы',
    title: 'Приватность по построению.',
    description:
      'AeroNyx — одно приложение для зашифрованных сообщений, конфиденциального ИИ и мультичейн-активов. Его несёт децентрализованная сеть, которая видит только шифртекст. Ключи остаются на устройстве. Память остаётся вашей. Никто посередине не прочитает ни слова.',
    primaryCta: 'Скачать AeroNyx',
    secondaryCta: 'Как это работает',
    liveLabel: 'В реальном времени — передано, не прочитано',
    liveUnit: 'байт',
    nodesLabel: 'независимых узлов отчитываются',
    plaintextLabel: 'открытого текста доступно сети',
    plaintextValue: '0 Б',
    lensHint: 'Потяните линзу',
    lensCaption: 'Слева: ваш телефон. Справа: то, что на самом деле хранит релей-узел.',
    sliderLabel: 'Линза приватности: показать, что видит сеть. Используйте стрелки влево и вправо.',
    stamp: 'ВОССТАНОВЛЕНО ОТКРЫТОГО ТЕКСТА: 0 Б',
  },
  phone: {
    status: 'Сквозное шифрование',
    m1: 'Привет — токийский узел снова в сети?',
    m2: 'Да. Вернулся в 11:52, 14 пиров. Задержка релея снова ниже 40 мс.',
    received: 'Получено',
    m3: 'принято, спасибо',
    composer: 'Сообщение',
    tabs: ['Чаты', 'Каналы', 'Nyx', 'Кошелёк', 'Я'],
    cipherHeader: 'релей-узел · вид блоба',
    cipherMeta: '{bytes} Б · 2 хопа · отправитель неизвестен',
    cipherFooter: 'нет содержимого · нет адресата · нет графа связей',
  },
  proof: {
    eyebrow: 'Живые данные протокола',
    title: 'Передаём. Не читаем.',
    description:
      'Каждое число ниже — агрегированное состояние, публикуемое независимыми узлами. Пользовательской активности на уровне узла попросту не существует.',
    traffic: 'Зашифрованный трафик',
    trafficDetail: 'байт передано сетью',
    packets: 'Зашифрованные пакеты',
    packetsDetail: 'переданы без просмотра',
    nodes: 'Узлов отчитываются',
    nodesDetail: 'независимые операторы, подписанное состояние',
    readiness: 'Готовность маршрутов',
    readinessDetail: 'приватные пути в два хопа',
    link: 'Полный статус протокола',
  },
  oneKey: {
    eyebrow: 'Один ключ',
    title: 'Сообщения, ИИ и деньги — под одним ключом, который держите вы.',
    description:
      'Одна и та же личность подписывает сообщение, спрашивает модель и переводит деньги. Сеть несёт все три — и не может прочитать ни одно.',
    panels: [
      {
        name: 'Зашифрованные сообщения',
        title: 'Чаты, группы, звонки — запечатаны от края до края.',
        body: 'Личные чаты, группы, голос и видео — всё со сквозным шифрованием. Релей-узлы пересылают запечатанные конверты и не хранят читаемых копий.',
        chips: ['E2E по умолчанию', 'Группы', 'Голос и видео', 'Маршруты в два хопа'],
        cta: 'Privacy Network',
      },
      {
        name: 'Nyx — конфиденциальный ИИ',
        title: 'ИИ, который помогает, ничего о вас не узнавая.',
        body: 'Быстрый, глубокий или конфиденциальный: конфиденциальный режим работает внутри доверенной среды, а память запечатана вашим ключом. Узлы синхронизируют её, но прочитать не могут.',
        chips: ['Конфиденциальный режим', 'Память MemChain', 'Локальный поиск'],
        cta: 'MemChain',
      },
      {
        name: 'Мультичейн-кошелёк',
        title: 'Ваши ключи — в Rust, на вашем устройстве.',
        body: 'Solana, Ethereum, BNB Chain, Tron и TAO из одного сида. Приватные ключи живут в Rust-хранилище, которое не отдаёт их прикладному слою, а подписываете вы только то, что прочитали.',
        cta: 'Скачать',
      },
    ],
  },
  ledger: {
    eyebrow: 'Граница видимости',
    title: 'Что видит каждый слой.',
    description:
      'Протокол построен вокруг одного обещания: каждый слой видит минимум, необходимый для работы, — и ничего, что можно было бы продать.',
    canSee: 'Видит',
    cannotSee: 'Не видит',
  },
};

const zhHant = {
  seo: {
    title: 'AeroNyx — 私密訊息、私密 AI、私密資產',
    description:
      '一個 App 整合端到端加密通訊、機密 AI 與多鏈錢包，由只看得見密文的去中心化網路承載。金鑰留在你的裝置，記憶屬於你自己。',
  },
  hero: {
    eyebrow: '訊息 · AI · 資產 — 一把只屬於你的金鑰',
    title: '隱私，由架構保證。',
    description:
      'AeroNyx 是一個整合加密訊息、機密 AI 與多鏈資產的 App，由只看得見密文的去中心化網路承載。金鑰留在你的裝置，記憶屬於你自己。中間沒有任何人讀得到內容。',
    primaryCta: '下載 AeroNyx',
    secondaryCta: '運作原理',
    liveLabel: '即時 — 承載但從未被讀取',
    liveUnit: '位元組',
    nodesLabel: '個獨立節點回報中',
    plaintextLabel: '網路可還原的明文',
    plaintextValue: '0 B',
    lensHint: '拖動鏡頭',
    lensCaption: '左：你的手機。右：中繼節點實際持有的內容。',
    sliderLabel: '隱私鏡頭：顯示網路看到的內容。使用左右方向鍵。',
    stamp: '可還原明文：0 B',
  },
  phone: {
    status: '端到端加密',
    m1: '嘿，東京節點恢復了嗎？',
    m2: '恢復了，11:52 上線，14 個對等節點，中繼延遲又回到 40 ms 以內。',
    received: '已收到',
    m3: '收到，謝謝',
    composer: '訊息',
    tabs: ['聊天', '頻道', 'Nyx', '錢包', '我'],
    cipherHeader: '中繼節點 · 資料塊視圖',
    cipherMeta: '{bytes} B · 2 跳 · 發送者未知',
    cipherFooter: '無內容 · 無目的地 · 無社交圖譜',
  },
  proof: {
    eyebrow: '即時協定證據',
    title: '只承載，不閱讀。',
    description: '以下每個數字都是獨立節點發布的整體健康資料。節點層級的用戶活動根本不存在，也無從發布。',
    traffic: '加密流量',
    trafficDetail: '網路中繼的位元組數',
    packets: '加密封包',
    packetsDetail: '未經檢視即轉發',
    nodes: '回報節點',
    nodesDetail: '獨立營運者，簽名健康資料',
    readiness: '路由就緒度',
    readinessDetail: '私密兩跳路徑',
    link: '完整協定狀態',
  },
  oneKey: {
    eyebrow: '一把金鑰',
    title: '訊息、AI 與資產，都在你持有的同一把金鑰之下。',
    description: '同一個身份簽署訊息、向模型提問、轉移資產。網路承載這三者，卻一個都讀不到。',
    panels: [
      {
        name: '加密通訊',
        title: '聊天、群組、通話 — 端到端封存。',
        body: '一對一、群組、語音與視訊，全部端到端加密。中繼節點只轉發密封的信封，不保留任何可讀副本。',
        chips: ['預設 E2E', '群組', '語音與視訊', '兩跳路由'],
        cta: '隱私網路',
      },
      {
        name: 'Nyx — 機密 AI',
        title: '會幫你，卻不會認識你的 AI。',
        body: '快速、深度或機密：機密模式在可信執行環境中運行，你的記憶由你自己的金鑰封存。節點負責同步，卻無法讀取。',
        chips: ['機密模式', 'MemChain 記憶', '本機優先召回'],
        cta: 'MemChain',
      },
      {
        name: '多鏈錢包',
        title: '你的金鑰，以 Rust 實作，留在你的裝置。',
        body: '一組助記詞衍生 Solana、Ethereum、BNB Chain、Tron 與 TAO。私鑰存放在 Rust 金鑰庫中，從不交給應用層，而你只簽署自己讀過的內容。',
        cta: '下載',
      },
    ],
  },
  ledger: {
    eyebrow: '可見性邊界',
    title: '每一層各自看得到什麼。',
    description: '整個協定圍繞一個承諾：每一層只看見完成工作所需的最少資訊，沒有任何可以拿去販賣的東西。',
    canSee: '看得到',
    cannotSee: '看不到',
  },
};

const zhHans = {
  seo: {
    title: 'AeroNyx — 私密消息、私密 AI、私密资产',
    description:
      '一个 App 整合端到端加密通讯、机密 AI 与多链钱包，由只看得见密文的去中心化网络承载。密钥留在你的设备，记忆属于你自己。',
  },
  hero: {
    eyebrow: '消息 · AI · 资产 — 一把只属于你的密钥',
    title: '隐私，由架构保证。',
    description:
      'AeroNyx 是一个整合加密消息、机密 AI 与多链资产的 App，由只看得见密文的去中心化网络承载。密钥留在你的设备，记忆属于你自己。中间没有任何人读得到内容。',
    primaryCta: '下载 AeroNyx',
    secondaryCta: '工作原理',
    liveLabel: '实时 — 承载但从未被读取',
    liveUnit: '字节',
    nodesLabel: '个独立节点上报中',
    plaintextLabel: '网络可还原的明文',
    plaintextValue: '0 B',
    lensHint: '拖动镜头',
    lensCaption: '左：你的手机。右：中继节点实际持有的内容。',
    sliderLabel: '隐私镜头：显示网络看到的内容。使用左右方向键。',
    stamp: '可还原明文：0 B',
  },
  phone: {
    status: '端到端加密',
    m1: '嘿，东京节点恢复了吗？',
    m2: '恢复了，11:52 上线，14 个对等节点，中继延迟又回到 40 ms 以内。',
    received: '已收到',
    m3: '收到，谢谢',
    composer: '消息',
    tabs: ['聊天', '频道', 'Nyx', '钱包', '我'],
    cipherHeader: '中继节点 · 数据块视图',
    cipherMeta: '{bytes} B · 2 跳 · 发送者未知',
    cipherFooter: '无内容 · 无目的地 · 无社交图谱',
  },
  proof: {
    eyebrow: '实时协议证据',
    title: '只承载，不阅读。',
    description: '以下每个数字都是独立节点发布的整体健康数据。节点级别的用户活动根本不存在，也无从发布。',
    traffic: '加密流量',
    trafficDetail: '网络中继的字节数',
    packets: '加密数据包',
    packetsDetail: '未经检视即转发',
    nodes: '上报节点',
    nodesDetail: '独立运营者，签名健康数据',
    readiness: '路由就绪度',
    readinessDetail: '私密两跳路径',
    link: '完整协议状态',
  },
  oneKey: {
    eyebrow: '一把密钥',
    title: '消息、AI 与资产，都在你持有的同一把密钥之下。',
    description: '同一个身份签署消息、向模型提问、转移资产。网络承载这三者，却一个都读不到。',
    panels: [
      {
        name: '加密通讯',
        title: '聊天、群组、通话 — 端到端封存。',
        body: '一对一、群组、语音与视频，全部端到端加密。中继节点只转发密封的信封，不保留任何可读副本。',
        chips: ['默认 E2E', '群组', '语音与视频', '两跳路由'],
        cta: '隐私网络',
      },
      {
        name: 'Nyx — 机密 AI',
        title: '会帮你，却不会认识你的 AI。',
        body: '快速、深度或机密：机密模式在可信执行环境中运行，你的记忆由你自己的密钥封存。节点负责同步，却无法读取。',
        chips: ['机密模式', 'MemChain 记忆', '本地优先召回'],
        cta: 'MemChain',
      },
      {
        name: '多链钱包',
        title: '你的密钥，以 Rust 实现，留在你的设备。',
        body: '一组助记词派生 Solana、Ethereum、BNB Chain、Tron 与 TAO。私钥存放在 Rust 密钥库中，从不交给应用层，而你只签署自己读过的内容。',
        cta: '下载',
      },
    ],
  },
  ledger: {
    eyebrow: '可见性边界',
    title: '每一层各自看得到什么。',
    description: '整个协议围绕一个承诺：每一层只看见完成工作所需的最少信息，没有任何可以拿去贩卖的东西。',
    canSee: '看得到',
    cannotSee: '看不到',
  },
};

const ja = {
  seo: {
    title: 'AeroNyx — プライベートなメッセージ、AI、資産',
    description:
      '端末を離れない鍵で、暗号化メッセージ・機密 AI・マルチチェーンウォレットをひとつのアプリに。ネットワークが見るのは暗号文だけです。',
  },
  hero: {
    eyebrow: 'メッセージ · AI · 資産 — あなただけが持つ一つの鍵',
    title: '設計そのものが、プライバシー。',
    description:
      'AeroNyx は、暗号化メッセージ・機密 AI・マルチチェーン資産をひとつにしたアプリです。運ぶのは暗号文しか見えない分散ネットワーク。鍵は端末に、記憶はあなたのもとに。途中の誰にも中身は読めません。',
    primaryCta: 'AeroNyx をダウンロード',
    secondaryCta: '仕組みを見る',
    liveLabel: 'ライブ — 読まれずに運ばれたデータ',
    liveUnit: 'バイト',
    nodesLabel: 'の独立ノードが報告中',
    plaintextLabel: 'ネットワークが復元できる平文',
    plaintextValue: '0 B',
    lensHint: 'レンズをドラッグ',
    lensCaption: '左：あなたの端末。右：中継ノードが実際に持っているもの。',
    sliderLabel: 'プライバシーレンズ：ネットワークに見えるものを表示します。左右の矢印キーで操作できます。',
    stamp: '復元された平文：0 B',
  },
  phone: {
    status: 'エンドツーエンド暗号化',
    m1: 'ねえ、東京ノードは復旧した？',
    m2: 'うん。11:52 に復旧、ピアは 14。中継レイテンシも 40 ms 以下に戻ったよ。',
    received: '受取',
    m3: '了解、ありがとう',
    composer: 'メッセージ',
    tabs: ['チャット', 'チャンネル', 'Nyx', 'ウォレット', '自分'],
    cipherHeader: '中継ノード · ブロブ表示',
    cipherMeta: '{bytes} B · 2 ホップ · 送信者不明',
    cipherFooter: '本文なし · 宛先なし · 関係グラフなし',
  },
  proof: {
    eyebrow: 'ライブのプロトコル証拠',
    title: '運ぶ。読まない。',
    description:
      '以下の数値はすべて、独立ノードが公開する集計ヘルスです。公開できるようなノード単位のユーザー活動は、そもそも存在しません。',
    traffic: '暗号化トラフィック',
    trafficDetail: 'ネットワークが中継したバイト数',
    packets: '暗号化パケット',
    packetsDetail: '検査せずに転送',
    nodes: '報告ノード',
    nodesDetail: '独立オペレーター、署名付きヘルス',
    readiness: '経路の準備状況',
    readinessDetail: 'プライベートな 2 ホップ経路',
    link: 'プロトコル状況の詳細',
  },
  oneKey: {
    eyebrow: 'ひとつの鍵',
    title: 'メッセージも、AI も、資産も。あなたが持つひとつの鍵のもとに。',
    description:
      '同じアイデンティティがメッセージに署名し、モデルに問い、資産を動かす。ネットワークは三つすべてを運びながら、ひとつも読めません。',
    panels: [
      {
        name: '暗号化メッセージ',
        title: 'チャット、グループ、通話 — 端から端まで封印。',
        body: '1 対 1、グループ、音声・ビデオ通話まで、すべてエンドツーエンド暗号化。中継ノードは封印された封筒を転送するだけで、読める複製を残しません。',
        chips: ['E2E が標準', 'グループ', '音声・ビデオ', '2 ホップ経路'],
        cta: 'プライバシーネットワーク',
      },
      {
        name: 'Nyx — 機密 AI',
        title: 'あなたを知らないまま、あなたを助ける AI。',
        body: '高速・深層・機密の 3 モード。機密モードは信頼できる実行環境で動き、記憶はあなた自身の鍵で封印されます。ノードは同期はできても、読むことはできません。',
        chips: ['機密モード', 'MemChain メモリ', 'ローカル優先の想起'],
        cta: 'MemChain',
      },
      {
        name: 'マルチチェーンウォレット',
        title: 'あなたの鍵は、Rust の中、端末の中。',
        body: 'ひとつのシードから Solana、Ethereum、BNB Chain、Tron、TAO。秘密鍵はアプリ層に渡されない Rust キーストアに置かれ、署名するのは読んだものだけ。',
        cta: 'ダウンロード',
      },
    ],
  },
  ledger: {
    eyebrow: '可視性の境界',
    title: '各レイヤーに見えるもの。',
    description: 'プロトコルはひとつの約束の上に立っています。各レイヤーは仕事に必要な最小限だけを見る — 売れるものは何もない。',
    canSee: '見える',
    cannotSee: '見えない',
  },
};

const ko = {
  seo: {
    title: 'AeroNyx — 프라이빗 메시지, 프라이빗 AI, 프라이빗 자산',
    description:
      '기기를 떠나지 않는 키로 암호화 메시지, 기밀 AI, 멀티체인 지갑을 하나의 앱에. 네트워크가 보는 것은 암호문뿐입니다.',
  },
  hero: {
    eyebrow: '메시지 · AI · 자산 — 오직 당신이 쥔 하나의 키',
    title: '설계부터 프라이빗.',
    description:
      'AeroNyx는 암호화 메시지, 기밀 AI, 멀티체인 자산을 하나로 묶은 앱입니다. 암호문만 볼 수 있는 탈중앙 네트워크가 이를 전달합니다. 키는 기기에, 기억은 당신에게. 중간의 누구도 내용을 읽을 수 없습니다.',
    primaryCta: 'AeroNyx 다운로드',
    secondaryCta: '작동 방식',
    liveLabel: '실시간 — 읽히지 않고 전달된 데이터',
    liveUnit: '바이트',
    nodesLabel: '개의 독립 노드가 보고 중',
    plaintextLabel: '네트워크가 복원할 수 있는 평문',
    plaintextValue: '0 B',
    lensHint: '렌즈를 드래그',
    lensCaption: '왼쪽: 당신의 휴대폰. 오른쪽: 중계 노드가 실제로 가진 것.',
    sliderLabel: '프라이버시 렌즈: 네트워크가 보는 것을 표시합니다. 좌우 화살표 키를 사용하세요.',
    stamp: '복원된 평문: 0 B',
  },
  phone: {
    status: '종단간 암호화',
    m1: '저기, 도쿄 노드 다시 올라왔어?',
    m2: '응. 11:52에 복구됐고 피어 14개. 중계 지연도 다시 40 ms 아래야.',
    received: '받음',
    m3: '알겠어, 고마워',
    composer: '메시지',
    tabs: ['채팅', '채널', 'Nyx', '지갑', '나'],
    cipherHeader: '중계 노드 · 블롭 보기',
    cipherMeta: '{bytes} B · 2홉 · 발신자 불명',
    cipherFooter: '본문 없음 · 목적지 없음 · 관계 그래프 없음',
  },
  proof: {
    eyebrow: '실시간 프로토콜 증거',
    title: '전달합니다. 읽지 않습니다.',
    description:
      '아래의 모든 숫자는 독립 노드가 공개하는 집계 상태입니다. 공개할 만한 노드 단위의 사용자 활동은 애초에 존재하지 않습니다.',
    traffic: '암호화 트래픽',
    trafficDetail: '네트워크가 중계한 바이트',
    packets: '암호화 패킷',
    packetsDetail: '검사 없이 전달',
    nodes: '보고 노드',
    nodesDetail: '독립 운영자, 서명된 상태',
    readiness: '경로 준비 상태',
    readinessDetail: '프라이빗 2홉 경로',
    link: '전체 프로토콜 상태',
  },
  oneKey: {
    eyebrow: '하나의 키',
    title: '메시지, AI, 자산 — 당신이 쥔 하나의 키 아래에.',
    description:
      '같은 신원이 메시지에 서명하고, 모델에 묻고, 자산을 옮깁니다. 네트워크는 셋 모두를 전달하지만 어느 것도 읽지 못합니다.',
    panels: [
      {
        name: '암호화 메시징',
        title: '채팅, 그룹, 통화 — 끝에서 끝까지 봉인.',
        body: '1:1, 그룹, 음성·영상 통화까지 모두 종단간 암호화. 중계 노드는 봉인된 봉투만 전달하며 읽을 수 있는 사본을 남기지 않습니다.',
        chips: ['기본 E2E', '그룹', '음성·영상', '2홉 경로'],
        cta: '프라이버시 네트워크',
      },
      {
        name: 'Nyx — 기밀 AI',
        title: '당신을 알지 못한 채 당신을 돕는 AI.',
        body: '빠름, 깊음, 기밀 세 가지 모드. 기밀 모드는 신뢰 실행 환경 안에서 동작하고, 기억은 당신의 키로 봉인됩니다. 노드는 동기화할 뿐 읽을 수 없습니다.',
        chips: ['기밀 모드', 'MemChain 메모리', '로컬 우선 회상'],
        cta: 'MemChain',
      },
      {
        name: '멀티체인 지갑',
        title: '당신의 키는 Rust 안에, 당신의 기기 안에.',
        body: '하나의 시드에서 Solana, Ethereum, BNB Chain, Tron, TAO. 개인키는 앱 계층에 넘겨지지 않는 Rust 키스토어에 보관되며, 읽은 것에만 서명합니다.',
        cta: '다운로드',
      },
    ],
  },
  ledger: {
    eyebrow: '가시성 경계',
    title: '각 계층이 볼 수 있는 것.',
    description: '프로토콜은 하나의 약속 위에 서 있습니다. 각 계층은 일에 필요한 최소한만 보며, 팔 수 있는 것은 아무것도 없습니다.',
    canSee: '볼 수 있음',
    cannotSee: '볼 수 없음',
  },
};

const es = {
  seo: {
    title: 'AeroNyx — Mensajes privados, IA privada, dinero privado',
    description:
      'Una app para mensajería cifrada, IA confidencial y una cartera multicadena, transportada por una red descentralizada que solo ve texto cifrado. Las claves se quedan en tu dispositivo. La memoria sigue siendo tuya.',
  },
  hero: {
    eyebrow: 'Mensajes · IA · Dinero — una sola clave que solo tú tienes',
    title: 'Privado por construcción.',
    description:
      'AeroNyx es una sola app para mensajes cifrados, IA confidencial y activos multicadena, transportada por una red descentralizada que solo ve texto cifrado. Las claves se quedan en tu dispositivo. La memoria sigue siendo tuya. Nadie en el medio puede leer nada.',
    primaryCta: 'Descargar AeroNyx',
    secondaryCta: 'Cómo funciona',
    liveLabel: 'En vivo — transportado sin ser leído',
    liveUnit: 'bytes',
    nodesLabel: 'nodos independientes reportando',
    plaintextLabel: 'texto en claro recuperable por la red',
    plaintextValue: '0 B',
    lensHint: 'Arrastra la lente',
    lensCaption: 'Izquierda: tu teléfono. Derecha: lo que un nodo relé realmente guarda.',
    sliderLabel: 'Lente de privacidad: muestra lo que ve la red. Usa las flechas izquierda y derecha.',
    stamp: 'TEXTO EN CLARO RECUPERADO: 0 B',
  },
  phone: {
    status: 'Cifrado de extremo a extremo',
    m1: 'Oye, ¿ya volvió el nodo de Tokio?',
    m2: 'Sí. Volvió a las 11:52 con 14 pares. La latencia del relé bajó otra vez de 40 ms.',
    received: 'Recibido',
    m3: 'listo, gracias',
    composer: 'Mensaje',
    tabs: ['Chats', 'Canales', 'Nyx', 'Cartera', 'Yo'],
    cipherHeader: 'nodo relé · vista de blob',
    cipherMeta: '{bytes} B · 2 saltos · remitente desconocido',
    cipherFooter: 'sin contenido · sin destino · sin grafo social',
  },
  proof: {
    eyebrow: 'Evidencia del protocolo en vivo',
    title: 'Transportado. Nunca leído.',
    description:
      'Cada cifra de abajo es salud agregada publicada por nodos independientes. No existe actividad de usuario a nivel de nodo que se pueda publicar.',
    traffic: 'Tráfico cifrado',
    trafficDetail: 'bytes retransmitidos por la red',
    packets: 'Paquetes cifrados',
    packetsDetail: 'reenviados sin inspección',
    nodes: 'Nodos reportando',
    nodesDetail: 'operadores independientes, salud firmada',
    readiness: 'Rutas listas',
    readinessDetail: 'caminos privados de dos saltos',
    link: 'Estado completo del protocolo',
  },
  oneKey: {
    eyebrow: 'Una sola clave',
    title: 'Mensajes, IA y dinero, bajo una sola clave que tú tienes.',
    description:
      'La misma identidad firma un mensaje, pregunta al modelo y mueve dinero. La red transporta las tres cosas y no puede leer ninguna.',
    panels: [
      {
        name: 'Mensajería cifrada',
        title: 'Chats, grupos, llamadas: sellados de extremo a extremo.',
        body: 'Uno a uno, grupos, voz y vídeo, todo cifrado de extremo a extremo. Los nodos relé reenvían sobres sellados y no guardan ninguna copia legible.',
        chips: ['E2E por defecto', 'Grupos', 'Voz y vídeo', 'Rutas de dos saltos'],
        cta: 'Privacy Network',
      },
      {
        name: 'Nyx — IA confidencial',
        title: 'Una IA que te ayuda sin aprender nada sobre ti.',
        body: 'Rápida, profunda o confidencial: el modo confidencial se ejecuta dentro de un enclave de confianza y tu memoria queda sellada con tu propia clave. Los nodos la sincronizan; no pueden leerla.',
        chips: ['Modo confidencial', 'Memoria MemChain', 'Recuperación local primero'],
        cta: 'MemChain',
      },
      {
        name: 'Cartera multicadena',
        title: 'Tus claves, en Rust, en tu dispositivo.',
        body: 'Solana, Ethereum, BNB Chain, Tron y TAO desde una sola semilla. Las claves privadas viven en un almacén de claves en Rust que nunca las entrega a la capa de la app, y solo firmas lo que has leído.',
        cta: 'Descargar',
      },
    ],
  },
  ledger: {
    eyebrow: 'Límite de visibilidad',
    title: 'Lo que cada capa puede ver.',
    description:
      'El protocolo se construye sobre una promesa: cada capa ve lo mínimo que necesita para hacer su trabajo, y nada que pudiera vender.',
    canSee: 'Puede ver',
    cannotSee: 'No puede ver',
  },
};

const locales = { en, ru, 'zh-Hant': zhHant, 'zh-Hans': zhHans, ja, ko, es };

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

/** Deep merge: arrays merge by index so a locale can override one panel field. */
function merge(base, override) {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base;
    return base.map((item, i) => (override[i] === undefined ? item : merge(item, override[i])));
  }
  if (isPlainObject(base)) {
    const out = { ...base };
    if (isPlainObject(override)) {
      Object.keys(override).forEach((key) => {
        out[key] = key in base ? merge(base[key], override[key]) : override[key];
      });
    }
    return out;
  }
  return override;
}

export function getNightglassCopy(locale) {
  return merge(en, locales[locale] || null);
}

export default getNightglassCopy;
