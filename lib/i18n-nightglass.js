/**
 * ============================================
 * File: lib/i18n-nightglass.js
 * ============================================
 * [NIGHTGLASS-WEB 2026-09-12 by Claude] Copy for the product-led homepage.
 *
 * v2 (2026-09-13): plain-language pass. The first version still leaned on
 * protocol vocabulary ("ciphertext", "relay", "TTL", "signed routing
 * metadata"). This version says the same things the way a person would say
 * them to a friend — sealed, carried, opened — and now also covers the four
 * sections that used to read from lib/i18n (how it works, run a node,
 * roadmap, closing), so the whole homepage speaks one register.
 *
 * Kept separate from lib/i18n.js on purpose: that file is a 7,000-line merge
 * contract shared by every page; these strings belong to one page. Every
 * locale is deep-merged over English, so a missing string can never surface
 * a key or a blank — it falls back to the English sentence.
 *
 * Locales mirror lib/i18n.js SUPPORTED_LOCALES: en, ru, zh-Hant, zh-Hans,
 * ja, ko, es.
 * ============================================
 */

const en = {
  seo: {
    title: 'AeroNyx — Private messages, private AI, private money',
    description:
      'One app for your messages, your AI and your money, on a network that can carry your data but cannot read it. Your keys never leave your phone.',
    ogAlt: 'AeroNyx — private messages, private AI, private money',
    // Meta keywords are English on every locale on purpose: the tag is a
    // crawler hint, not visible copy.
    keywords: [
      'private messenger', 'end-to-end encrypted messaging', 'private AI assistant',
      'confidential AI', 'crypto wallet', 'self-custody wallet', 'privacy network',
      'decentralized nodes', 'AeroNyx',
    ],
  },
  hero: {
    eyebrow: 'Messages · AI · Money — one key, yours',
    title: 'Private by construction.',
    description:
      'One app for your messages, your AI and your money. It runs on a network that can carry your data but cannot read it. Your keys never leave your phone — so nobody in the middle, not us, not a node, not a provider, can see what you say, ask or send.',
    primaryCta: 'Download AeroNyx',
    secondaryCta: 'How it works',
    // Proof-strip labels are set uppercase at 11px in a narrow column — short
    // beats complete, and the live dot already says "live".
    liveLabel: 'Carried, never read',
    liveUnit: 'bytes',
    nodesLabel: 'Independent nodes',
    plaintextLabel: 'Readable by the network',
    plaintextValue: '0 B',
    lensHint: 'Drag the lens',
    lensCaption: 'Left: your phone. Right: what a node on the way sees.',
    sliderLabel: 'Privacy lens: show what the network sees. Use the left and right arrow keys.',
    stamp: 'READABLE BY THE NETWORK: 0 B',
  },
  phone: {
    contact: 'Mika',
    status: 'End-to-end encrypted',
    // A normal evening between two friends, not two node operators: the
    // phone in the hero has to look like something a person would actually
    // have on their screen, and it has to give the wallet receipt a reason
    // to be there.
    m0: 'Home safe — thanks again for dinner.',
    m1: 'Anytime. That place was so good.',
    m2: 'Sending you my half now.',
    received: 'Received',
    receivedAmount: '+0.5 SOL',
    receivedMeta: '0.5000 SOL · 12:41',
    m3: 'perfect, thank you',
    composer: 'Message',
    tabs: ['Chats', 'Channels', 'Nyx', 'Wallet', 'Me'],
    cipherHeader: 'a node on the way · sealed view',
    cipherMeta: '{bytes} B · sealed · sender unknown',
    cipherFooter: 'no words · no names · no address',
  },
  proof: {
    eyebrow: 'Live, from the network itself',
    title: 'Carried. Never read.',
    description:
      'These are totals for the whole network, published by the nodes that run it. There is no per-person data to show, because none exists.',
    traffic: 'Data carried',
    trafficDetail: 'sealed bytes moved through the network',
    packets: 'Packets forwarded',
    packetsDetail: 'passed along, never opened',
    nodes: 'Nodes online',
    nodesDetail: 'run by independent people',
    readiness: 'Private routes',
    readinessDetail: 'two hops, so no single node knows both ends',
    link: 'See the full network status',
  },
  oneKey: {
    eyebrow: 'One key',
    title: 'Messages, AI and money — under one key you hold.',
    description:
      'The same identity signs a message, asks the model and moves money. The network carries all three and can read none of them.',
    panels: [
      {
        name: 'Messages',
        title: 'Chat, groups and calls, sealed end to end.',
        body: 'Text, groups, voice and video. Everything is sealed before it leaves your phone, and the nodes that pass it along cannot open it.',
        chips: ['Sealed by default', 'Groups', 'Voice & video', 'Private routes'],
        cta: 'Privacy Network',
        href: '/privacy-network',
      },
      {
        name: 'Nyx — private AI',
        title: 'An AI that helps without learning about you.',
        body: 'Three modes: fast, deep and confidential. In confidential mode the model runs in a locked compartment that even we cannot look into, and what it remembers about you is sealed with your key.',
        chips: ['Confidential mode', 'Memory you own', 'Works offline'],
        cta: 'MemChain',
        href: '/memchain',
      },
      {
        name: 'Wallet',
        title: 'Your keys never leave your phone.',
        body: 'Solana, Ethereum, BNB Chain, Tron and TAO in one wallet. The keys live in a sealed part of the app that nothing else can reach, and you see exactly what you are signing before you sign it.',
        chips: ['SOL', 'ETH', 'BNB', 'TRX', 'TAO'],
        cta: 'Download',
        href: 'download',
      },
    ],
  },
  ledger: {
    eyebrow: 'Who sees what',
    title: 'Every part sees only what it needs.',
    description:
      'That is the whole design: each layer gets the minimum to do its job, and nothing it could keep or sell.',
    canSee: 'Can see',
    cannotSee: 'Cannot see',
    rows: [
      { surface: 'Your phone', canSee: 'Your messages — before they are sealed', cannotSee: 'Nothing leaves unsealed' },
      { surface: 'Nodes on the way', canSee: 'A sealed envelope, its size, and where to pass it next', cannotSee: 'What is inside, who you are, who you talk to, which sites you visit' },
      { surface: 'This website', canSee: 'Totals for the whole network', cannotSee: 'Anything about one person' },
    ],
  },
  northStar: {
    eyebrow: 'North Star Plan / 北極星計劃',
    title: 'More private. Open source. Global by default.',
    description:
      'The promise behind every AeroNyx product: it has to hold up in public, in real use, anywhere in the world — without ever collecting data about the people using it.',
    signals: [
      { label: '01', title: 'More private', detail: 'Nodes carry sealed data and report only totals. Keeping the network healthy never means watching its users.' },
      { label: '02', title: 'Open source', detail: 'The app, the protocol and the node software are public. Anyone can read them, run them and make them better.' },
      { label: '03', title: 'Global by default', detail: 'Anyone, anywhere, can run a node and join. More nodes in more places make the network stronger and harder to watch.' },
    ],
  },
  howItWorks: {
    eyebrow: 'How it works',
    title: 'Sealed on your phone. Opened on theirs.',
    description: 'Three steps, and nobody in the middle has to be trusted.',
    steps: [
      { title: 'Your phone seals it', body: 'Messages, questions to the AI and payments are locked with keys that only exist on your device.' },
      { title: 'Nodes carry it, unread', body: 'Independent nodes pass the sealed envelope along. They see its size and the next stop — not what is inside, not who you are.' },
      { title: 'Only the other side opens it', body: 'The person you wrote to, or the model in its locked compartment. Nobody else has the key.' },
    ],
    diagram: { you: 'You', node: 'Node', them: 'Them', sealed: 'sealed', carried: 'carried', opened: 'opened' },
    note: 'Two hops by default, so no single node ever knows both where something came from and where it is going.',
    link: 'Read the technical architecture',
  },
  runNode: {
    eyebrow: 'Run a node',
    title: 'Carry what you cannot read.',
    description:
      'Anyone with a server can help carry the network. A node forwards sealed envelopes; it never holds a key, a message or a name.',
    steps: [
      { title: 'Install', body: 'One server, one command, about ten minutes.' },
      { title: 'Carry', body: 'Your node passes sealed envelopes between phones. It cannot open any of them.' },
      { title: 'Watch', body: 'Nodeboard shows your node\'s health and how much it carried — never who.' },
    ],
    card: {
      title: 'Node',
      location: 'Tokyo',
      status: 'Healthy',
      peers: 'peers',
      carried: 'carried today',
      readable: 'readable',
      readableValue: '0 B',
      uptime: 'uptime',
    },
    liveLabel: 'nodes online right now',
    ctaGuide: 'Node guide',
    ctaBoard: 'Open Nodeboard',
  },
  roadmap: {
    eyebrow: 'Where this goes',
    title: 'The plan, in plain words.',
    items: [
      { when: '2026', title: 'Private by default', body: 'Every message and payment takes a two-hop route through independent nodes, and more people run them.' },
      { when: '2028', title: 'Your memory travels with you', body: 'What your AI knows about you lives in a sealed memory you own — and moves with you between tools instead of dying inside each one.' },
      { when: '2030', title: 'Agents on the same terms', body: 'Software that works for you routes, remembers and pays through the same network, under the same rule: nobody in the middle can read it.' },
    ],
    closing: 'Infrastructure that cannot betray its users.',
  },
  // /privacy-network's closing section. The phone is a product preview, and it
  // says so: the toggle is the point — turning it on is what changes "Your IP:
  // visible to every site" into "hidden", which is the whole product in one
  // gesture. Off shows em-dashes rather than zeros, because nothing is being
  // measured then; a zero would read as a broken readout.
  privacyNetwork: {
    eyebrow: 'Privacy Network',
    title: 'Browse without being followed.',
    description:
      'Turn it on and your traffic takes a private route through independent nodes. They hand it along without being able to see the sites you visit — and neither can we.',
    cta: 'Get AeroNyx',
    points: [
      { title: 'Nobody sees where you go', body: 'A node knows the next stop and nothing else: not the site, not the page, not you.' },
      { title: 'Run by independent people', body: 'Anyone can operate a node, and anyone can read the code that runs on it.' },
      { title: 'Only totals are public', body: 'The network publishes what it carried in total. There is no per-person history to publish.' },
      { title: 'Your apps ride along', body: 'The same private route carries your messages, your AI and your wallet.' },
    ],
    phone: {
      appName: 'Privacy Network',
      on: 'Protected',
      off: 'Not protected',
      connect: 'Connect',
      disconnect: 'Disconnect',
      hintOn: 'Tap to disconnect',
      hintOff: 'Tap to connect',
      routeLabel: 'Route',
      routeOn: 'Two hops · Asia',
      routeOff: 'Direct',
      ipLabel: 'Your IP',
      ipOn: 'Hidden',
      ipOff: 'Visible to every site',
      carriedLabel: 'Carried this session',
      carriedValue: '2.1 GB',
      readableLabel: 'Readable by the network',
      readableValue: '0 B',
      note: 'Product preview — try the switch',
    },
  },
  // Shown once, to everyone, before the download list — deliberately NOT
  // geo-targeted. A notice that singles out a jurisdiction and then hands over
  // a way through documents that we knew and helped anyway; a notice everyone
  // sees is the "reasonable notice" measure without that problem. It also
  // costs us no personal data, which matters because ledger.rows tells every
  // visitor this website cannot see anything about one person — a geo check
  // would have made that sentence false.
  downloadNotice: {
    title: 'Before you download',
    body: 'Privacy tools are restricted or regulated in some countries. You are responsible for following the law where you are.',
    neutrality: 'We do not check where you are — everyone sees this notice.',
    link: 'What AeroNyx does not do',
    cta: 'I understand',
  },
  // app.aeronyx.network — one address, two doors: chat in the browser (scan
  // with the app to sign in) and the node dashboard (wallet signature). Both
  // belong on the homepage; the phrasing stays honest that the app comes first.
  browser: {
    heroLink: 'Already have the app? Open it in your browser',
    cta: 'Open in your browser',
    chat: 'Open web chat',
  },
  closing: {
    title: 'Try it in a minute.',
    description: 'Free. Open source. Your keys never leave your phone.',
    proofs: ['Blind by design', 'Open source', 'A real product, today'],
    download: 'Download AeroNyx',
    docs: 'Read the docs',
    talk: 'Talk to us',
  },
};

const ru = {
  seo: {
    title: 'AeroNyx — приватные сообщения, приватный ИИ, приватные деньги',
    description:
      'Одно приложение для ваших сообщений, вашего ИИ и ваших денег — в сети, которая может нести ваши данные, но не может их прочитать. Ключи никогда не покидают ваш телефон.',
    ogAlt: 'AeroNyx — приватные сообщения, приватный ИИ, приватные деньги',
  },
  hero: {
    eyebrow: 'Сообщения · ИИ · Деньги — один ключ, ваш',
    title: 'Приватность по построению.',
    description:
      'Одно приложение для ваших сообщений, вашего ИИ и ваших денег. Оно работает в сети, которая может нести ваши данные, но не может их прочитать. Ключи никогда не покидают ваш телефон — поэтому никто посередине, ни мы, ни узел, ни провайдер, не увидит, что вы пишете, спрашиваете или отправляете.',
    primaryCta: 'Скачать AeroNyx',
    secondaryCta: 'Как это работает',
    liveLabel: 'Передано, не прочитано',
    liveUnit: 'байт',
    nodesLabel: 'Независимые узлы',
    plaintextLabel: 'Доступно сети для чтения',
    plaintextValue: '0 Б',
    lensHint: 'Потяните линзу',
    lensCaption: 'Слева: ваш телефон. Справа: то, что видит узел по пути.',
    sliderLabel: 'Линза приватности: показать, что видит сеть. Используйте стрелки влево и вправо.',
    stamp: 'ЧИТАЕМО ДЛЯ СЕТИ: 0 Б',
  },
  phone: {
    status: 'Сквозное шифрование',
    m0: 'Я дома. Спасибо ещё раз за ужин.',
    m1: 'Да не за что. Место и правда отличное.',
    m2: 'Отправляю свою половину.',
    received: 'Получено',
    m3: 'отлично, спасибо',
    composer: 'Сообщение',
    tabs: ['Чаты', 'Каналы', 'Nyx', 'Кошелёк', 'Я'],
    cipherHeader: 'узел по пути · запечатанный вид',
    cipherMeta: '{bytes} Б · запечатано · отправитель неизвестен',
    cipherFooter: 'ни слов · ни имён · ни адреса',
  },
  proof: {
    eyebrow: 'В реальном времени, от самой сети',
    title: 'Передаём. Не читаем.',
    description:
      'Это итоги всей сети, которые публикуют сами узлы. Данных об отдельном человеке показать нельзя — их просто нет.',
    traffic: 'Передано данных',
    trafficDetail: 'запечатанных байт прошло через сеть',
    packets: 'Переслано пакетов',
    packetsDetail: 'переданы дальше, ни один не вскрыт',
    nodes: 'Узлов онлайн',
    nodesDetail: 'их держат независимые люди',
    readiness: 'Приватные маршруты',
    readinessDetail: 'два хопа: ни один узел не знает оба конца',
    link: 'Полное состояние сети',
  },
  oneKey: {
    eyebrow: 'Один ключ',
    title: 'Сообщения, ИИ и деньги — под одним ключом, который держите вы.',
    description:
      'Одна и та же личность подписывает сообщение, спрашивает модель и переводит деньги. Сеть несёт все три — и не может прочитать ни одно.',
    panels: [
      {
        name: 'Сообщения',
        title: 'Чаты, группы и звонки, запечатанные от края до края.',
        body: 'Текст, группы, голос и видео. Всё запечатывается до того, как покинет ваш телефон, и узлы, которые это передают, не могут это вскрыть.',
        chips: ['Запечатано по умолчанию', 'Группы', 'Голос и видео', 'Приватные маршруты'],
        cta: 'Privacy Network',
      },
      {
        name: 'Nyx — приватный ИИ',
        title: 'ИИ, который помогает, ничего о вас не узнавая.',
        body: 'Три режима: быстрый, глубокий и конфиденциальный. В конфиденциальном режиме модель работает в закрытом отсеке, куда не можем заглянуть даже мы, а то, что она о вас помнит, запечатано вашим ключом.',
        chips: ['Конфиденциальный режим', 'Память — ваша', 'Работает офлайн'],
        cta: 'MemChain',
      },
      {
        name: 'Кошелёк',
        title: 'Ваши ключи никогда не покидают телефон.',
        body: 'Solana, Ethereum, BNB Chain, Tron и TAO в одном кошельке. Ключи живут в запечатанной части приложения, до которой ничто другое не дотянется, и вы видите ровно то, что подписываете, прежде чем подписать.',
        cta: 'Скачать',
      },
    ],
  },
  ledger: {
    eyebrow: 'Кто что видит',
    title: 'Каждая часть видит только то, что ей нужно.',
    description: 'В этом весь замысел: каждый слой получает минимум для своей работы — и ничего, что можно было бы сохранить или продать.',
    canSee: 'Видит',
    cannotSee: 'Не видит',
    rows: [
      { surface: 'Ваш телефон', canSee: 'Ваши сообщения — до того, как они запечатаны', cannotSee: 'Ничто не уходит незапечатанным' },
      { surface: 'Узлы по пути', canSee: 'Запечатанный конверт, его размер и следующую остановку', cannotSee: 'Что внутри, кто вы, с кем говорите, какие сайты открываете' },
      { surface: 'Этот сайт', canSee: 'Итоги по всей сети', cannotSee: 'Что-либо об одном человеке' },
    ],
  },
  northStar: {
    eyebrow: 'План «Полярная звезда» / 北極星計劃',
    title: 'Приватнее. Открытый код. Глобально по умолчанию.',
    description: 'Обещание, стоящее за каждым продуктом AeroNyx: он должен выдерживать публичную проверку, реальное использование и работу в любой точке мира — никогда не собирая данных о людях, которые им пользуются.',
    signals: [
      { label: '01', title: 'Приватнее', detail: 'Узлы несут запечатанные данные и публикуют только итоги. Здоровье сети никогда не означает наблюдение за её пользователями.' },
      { label: '02', title: 'Открытый код', detail: 'Приложение, протокол и ПО узла открыты. Любой может их прочитать, запустить и улучшить.' },
      { label: '03', title: 'Глобально по умолчанию', detail: 'Кто угодно и где угодно может запустить узел и присоединиться. Чем больше узлов в разных местах, тем сеть сильнее и тем труднее за ней следить.' },
    ],
  },
  howItWorks: {
    eyebrow: 'Как это работает',
    title: 'Запечатано на вашем телефоне. Открыто на их.',
    description: 'Три шага, и никому посередине не нужно доверять.',
    steps: [
      { title: 'Ваш телефон запечатывает', body: 'Сообщения, вопросы к ИИ и платежи закрываются ключами, которые существуют только на вашем устройстве.' },
      { title: 'Узлы несут, не читая', body: 'Независимые узлы передают запечатанный конверт дальше. Они видят его размер и следующую остановку — не содержимое и не вас.' },
      { title: 'Открывает только другая сторона', body: 'Человек, которому вы написали, или модель в своём закрытом отсеке. Больше ключа нет ни у кого.' },
    ],
    diagram: { you: 'Вы', node: 'Узел', them: 'Они', sealed: 'запечатано', carried: 'передано', opened: 'открыто' },
    note: 'Два хопа по умолчанию — ни один узел никогда не знает и откуда пришло, и куда идёт.',
    link: 'Техническая архитектура',
  },
  runNode: {
    eyebrow: 'Запустите узел',
    title: 'Несите то, что не можете прочитать.',
    description: 'Помочь сети может любой, у кого есть сервер. Узел пересылает запечатанные конверты; он никогда не хранит ни ключа, ни сообщения, ни имени.',
    steps: [
      { title: 'Установить', body: 'Один сервер, одна команда, около десяти минут.' },
      { title: 'Нести', body: 'Ваш узел передаёт запечатанные конверты между телефонами. Вскрыть он не может ни один.' },
      { title: 'Наблюдать', body: 'Nodeboard показывает здоровье узла и сколько он передал — никогда кому.' },
    ],
    card: { title: 'Узел', location: 'Токио', status: 'В норме', peers: 'пиров', carried: 'передано сегодня', readable: 'читаемо', readableValue: '0 Б', uptime: 'аптайм' },
    liveLabel: 'узлов онлайн прямо сейчас',
    ctaGuide: 'Руководство по узлу',
    ctaBoard: 'Открыть Nodeboard',
  },
  roadmap: {
    eyebrow: 'Куда это идёт',
    title: 'План, простыми словами.',
    items: [
      { when: '2026', title: 'Приватность по умолчанию', body: 'Каждое сообщение и платёж идут маршрутом в два хопа через независимые узлы, и узлов становится больше.' },
      { when: '2028', title: 'Память путешествует с вами', body: 'То, что ваш ИИ о вас знает, живёт в запечатанной памяти, которой владеете вы, — и переходит с вами между инструментами, а не умирает внутри каждого.' },
      { when: '2030', title: 'Агенты на тех же условиях', body: 'Программы, работающие на вас, маршрутизируют, помнят и платят через ту же сеть — по тому же правилу: никто посередине не может прочитать.' },
    ],
    closing: 'Инфраструктура, которая не может предать своих пользователей.',
  },
  privacyNetwork: {
    eyebrow: 'Сеть приватности',
    title: 'Ходите по сети, не оставляя следов.',
    description:
      'Включите — и трафик пойдёт приватным маршрутом через независимые узлы. Они передают его дальше, не видя, какие сайты вы открываете. Мы тоже не видим.',
    cta: 'Получить AeroNyx',
    points: [
      { title: 'Никто не видит, куда вы заходите', body: 'Узел знает следующий шаг и больше ничего: ни сайт, ни страницу, ни вас.' },
      { title: 'Держат независимые люди', body: 'Узел может запустить кто угодно, а код, который на нём работает, может прочитать любой.' },
      { title: 'Публичны только итоги', body: 'Сеть публикует, сколько передала всего. Истории по каждому человеку просто нет.' },
      { title: 'Приложения едут тем же маршрутом', body: 'Тот же приватный маршрут несёт сообщения, ИИ и кошелёк.' },
    ],
    phone: {
      appName: 'Сеть приватности',
      on: 'Защищено',
      off: 'Не защищено',
      connect: 'Подключить',
      disconnect: 'Отключить',
      hintOn: 'Нажмите, чтобы отключить',
      hintOff: 'Нажмите, чтобы подключить',
      routeLabel: 'Маршрут',
      routeOn: 'Два хопа · Азия',
      routeOff: 'Напрямую',
      ipLabel: 'Ваш IP',
      ipOn: 'Скрыт',
      ipOff: 'Виден каждому сайту',
      carriedLabel: 'Передано за сессию',
      carriedValue: '2,1 ГБ',
      readableLabel: 'Доступно сети для чтения',
      readableValue: '0 Б',
      note: 'Превью продукта — попробуйте переключатель',
    },
  },
  downloadNotice: {
    title: 'Перед загрузкой',
    body: 'В некоторых странах инструменты приватности ограничены или регулируются. Вы сами отвечаете за соблюдение закона там, где находитесь.',
    neutrality: 'Мы не определяем, где вы находитесь, — это уведомление видят все.',
    link: 'Чего AeroNyx не делает',
    cta: 'Понятно',
  },
  browser: {
    heroLink: 'Уже есть приложение? Откройте его в браузере',
    cta: 'Открыть в браузере',
    chat: 'Открыть веб-чат',
  },
  closing: {
    title: 'Попробуйте за минуту.',
    description: 'Бесплатно. Открытый код. Ключи никогда не покидают ваш телефон.',
    proofs: ['Слепая по замыслу', 'Открытый код', 'Настоящий продукт, уже сегодня'],
    download: 'Скачать AeroNyx',
    docs: 'Документация',
    talk: 'Написать нам',
  },
};

const zhHant = {
  seo: {
    title: 'AeroNyx — 私密訊息、私密 AI、私密資產',
    description: '一個 App，裝下你的訊息、你的 AI、你的資產，跑在一個能替你傳送、卻讀不到內容的網路上。金鑰從不離開你的手機。',
    ogAlt: 'AeroNyx — 私密訊息、私密 AI、私密資產',
  },
  hero: {
    eyebrow: '訊息 · AI · 資產 — 一把金鑰，只屬於你',
    title: '隱私，由架構保證。',
    description: '一個 App，裝下你的訊息、你的 AI、你的資產。它跑在一個能替你傳送、卻讀不到內容的網路上。金鑰從不離開你的手機——所以中間的任何人，不管是我們、某個節點還是服務商，都看不到你說了什麼、問了什麼、轉了什麼。',
    primaryCta: '下載 AeroNyx',
    secondaryCta: '它是怎麼做到的',
    liveLabel: '已承載，從未被讀取',
    liveUnit: '位元組',
    nodesLabel: '獨立節點',
    plaintextLabel: '網路讀得到的內容',
    plaintextValue: '0 B',
    lensHint: '拖動鏡頭',
    lensCaption: '左：你的手機。右：沿途節點看到的東西。',
    sliderLabel: '隱私鏡頭：顯示網路看到的內容。使用左右方向鍵。',
    stamp: '網路可讀取：0 B',
  },
  phone: {
    status: '端到端加密',
    m0: '到家了，晚餐再次謝謝你。',
    m1: '不客氣，那家真的好吃。',
    m2: '我把我那一半轉給你。',
    received: '已收到',
    m3: '收到了，謝謝',
    composer: '訊息',
    tabs: ['聊天', '頻道', 'Nyx', '錢包', '我'],
    cipherHeader: '沿途節點 · 密封視圖',
    cipherMeta: '{bytes} B · 已密封 · 發送者未知',
    cipherFooter: '沒有文字 · 沒有名字 · 沒有地址',
  },
  proof: {
    eyebrow: '即時，來自網路本身',
    title: '只承載，不閱讀。',
    description: '這些是整個網路的總數，由運行節點的人自己發布。沒有任何一個人的資料可以顯示，因為根本不存在。',
    traffic: '承載的資料',
    trafficDetail: '流經網路的密封位元組',
    packets: '轉發的封包',
    packetsDetail: '一路傳遞，從未打開',
    nodes: '在線節點',
    nodesDetail: '由獨立的人運行',
    readiness: '私密路由',
    readinessDetail: '兩跳，沒有任何節點同時知道兩端',
    link: '查看完整網路狀態',
  },
  oneKey: {
    eyebrow: '一把金鑰',
    title: '訊息、AI 與資產，都在你持有的同一把金鑰之下。',
    description: '同一個身份簽署訊息、向模型提問、轉移資產。網路承載這三者，卻一個都讀不到。',
    panels: [
      {
        name: '訊息',
        title: '聊天、群組、通話，端到端密封。',
        body: '文字、群組、語音與視訊。所有內容在離開手機之前就已密封，沿途傳遞的節點打不開。',
        chips: ['預設密封', '群組', '語音與視訊', '私密路由'],
        cta: '隱私網路',
      },
      {
        name: 'Nyx — 私密 AI',
        title: '會幫你，卻不會認識你的 AI。',
        body: '三種模式：快速、深度、機密。機密模式下，模型在一個連我們都看不進去的封閉隔間裡運行，它記住的關於你的一切，都用你的金鑰密封。',
        chips: ['機密模式', '記憶歸你所有', '離線可用'],
        cta: 'MemChain',
      },
      {
        name: '錢包',
        title: '你的金鑰從不離開手機。',
        body: 'Solana、Ethereum、BNB Chain、Tron 與 TAO 在同一個錢包裡。金鑰放在 App 裡一塊誰也碰不到的密封區域，而你在簽署之前，會看到自己到底在簽什麼。',
        cta: '下載',
      },
    ],
  },
  ledger: {
    eyebrow: '誰看得到什麼',
    title: '每一環只看到它需要的。',
    description: '整個設計就是這一句：每一層只拿到完成工作所需的最少資訊，沒有任何可以留存或販賣的東西。',
    canSee: '看得到',
    cannotSee: '看不到',
    rows: [
      { surface: '你的手機', canSee: '你的訊息——在密封之前', cannotSee: '沒有任何東西未密封就離開' },
      { surface: '沿途的節點', canSee: '一個密封的信封、它的大小、下一站在哪', cannotSee: '裡面是什麼、你是誰、你和誰聊天、你上哪些網站' },
      { surface: '這個網站', canSee: '整個網路的總數', cannotSee: '關於任何一個人的任何事' },
    ],
  },
  northStar: {
    eyebrow: '北極星計劃 / North Star Plan',
    title: '更私密。開源。天生全球化。',
    description: '每一個 AeroNyx 產品背後的承諾：它必須經得起公開檢驗、真實使用，在世界任何角落都站得住——而且永遠不收集使用它的人的資料。',
    signals: [
      { label: '01', title: '更私密', detail: '節點承載密封的資料，只公布總數。維持網路健康，從不意味著監視它的使用者。' },
      { label: '02', title: '開源', detail: 'App、協議與節點軟體全部公開。任何人都能閱讀、運行並改進。' },
      { label: '03', title: '天生全球化', detail: '任何人在任何地方都能運行節點加入。更多地方有更多節點，網路就更強、更難被監視。' },
    ],
  },
  howItWorks: {
    eyebrow: '它是怎麼做到的',
    title: '在你的手機密封，在對方的手機打開。',
    description: '三步，中間沒有任何人需要被信任。',
    steps: [
      { title: '你的手機把它密封', body: '訊息、對 AI 的提問、付款，都用只存在於你裝置上的金鑰鎖起來。' },
      { title: '節點負責傳遞，不讀內容', body: '獨立節點把密封的信封往下傳。它們看得到大小和下一站——看不到裡面是什麼，也不知道你是誰。' },
      { title: '只有另一端能打開', body: '你寫信給的那個人，或是封閉隔間裡的模型。金鑰沒有別人有。' },
    ],
    diagram: { you: '你', node: '節點', them: '對方', sealed: '密封', carried: '傳遞', opened: '打開' },
    note: '預設走兩跳，所以沒有任何一個節點會同時知道東西從哪來、往哪去。',
    link: '閱讀技術架構',
  },
  runNode: {
    eyebrow: '運行一個節點',
    title: '承載你讀不到的東西。',
    description: '只要有一台伺服器，任何人都能幫這個網路傳遞。節點只轉發密封的信封；它從不持有金鑰、訊息或名字。',
    steps: [
      { title: '安裝', body: '一台伺服器，一條指令，大約十分鐘。' },
      { title: '傳遞', body: '你的節點在手機之間傳遞密封的信封。它打不開任何一個。' },
      { title: '觀察', body: 'Nodeboard 顯示節點的健康狀況和傳了多少——從不顯示是誰的。' },
    ],
    card: { title: '節點', location: '東京', status: '健康', peers: '個對等節點', carried: '今日承載', readable: '可讀取', readableValue: '0 B', uptime: '在線率' },
    liveLabel: '個節點此刻在線',
    ctaGuide: '節點指南',
    ctaBoard: '打開 Nodeboard',
  },
  roadmap: {
    eyebrow: '接下來',
    title: '計畫，用白話說。',
    items: [
      { when: '2026', title: '預設就私密', body: '每則訊息、每筆付款都經由獨立節點走兩跳路由，而運行節點的人越來越多。' },
      { when: '2028', title: '記憶跟著你走', body: '你的 AI 對你的了解，存放在一份你自己擁有的密封記憶裡——跟著你在不同工具之間移動，而不是死在每一個工具裡。' },
      { when: '2030', title: '代理人也遵守同樣的規則', body: '替你工作的軟體，透過同一個網路傳遞、記憶、付款，遵守同一條規則：中間的任何人都讀不到。' },
    ],
    closing: '無法背叛使用者的基礎設施。',
  },
  privacyNetwork: {
    eyebrow: '隱私網路',
    title: '上網，不留下足跡。',
    description:
      '打開它，你的流量就會走一條經過獨立節點的私密路線。它們負責傳遞，卻看不到你開了哪些網站——我們也看不到。',
    cta: '取得 AeroNyx',
    points: [
      { title: '沒有人看得到你去了哪', body: '節點只知道下一站，其他一概不知：不知道網站、不知道頁面、也不知道你是誰。' },
      { title: '由獨立的人運行', body: '任何人都能運行節點，節點上跑的程式碼也任何人都能讀。' },
      { title: '只有總數是公開的', body: '網路公布的是總共傳了多少。關於個人的紀錄根本不存在，也就無從公布。' },
      { title: '你的 App 一起走這條路', body: '同一條私密路線，載著你的訊息、你的 AI、你的錢包。' },
    ],
    phone: {
      appName: '隱私網路',
      on: '已保護',
      off: '未保護',
      connect: '連線',
      disconnect: '中斷連線',
      hintOn: '點一下中斷',
      hintOff: '點一下連線',
      routeLabel: '路線',
      routeOn: '兩跳 · 亞洲',
      routeOff: '直連',
      ipLabel: '你的 IP',
      ipOn: '已隱藏',
      ipOff: '每個網站都看得到',
      carriedLabel: '本次連線已傳輸',
      carriedValue: '2.1 GB',
      readableLabel: '網路讀得到的內容',
      readableValue: '0 B',
      note: '產品預覽 — 試試這個開關',
    },
  },
  downloadNotice: {
    title: '下載前請先看一下',
    body: '隱私工具在部分國家受到限制或監管。你有責任遵守所在地的法律。',
    neutrality: '我們不會偵測你在哪裡——這則提示對每個人都顯示。',
    link: 'AeroNyx 做不到什麼',
    cta: '我明白',
  },
  browser: {
    heroLink: '已經裝了 App？在瀏覽器裡開啟',
    cta: '在瀏覽器裡開啟',
    chat: '開啟網頁版聊天',
  },
  closing: {
    title: '一分鐘就能試。',
    description: '免費。開源。金鑰從不離開你的手機。',
    proofs: ['設計上就是盲的', '開源', '今天就能用的真產品'],
    download: '下載 AeroNyx',
    docs: '閱讀文件',
    talk: '聯絡我們',
  },
};

const zhHans = {
  seo: {
    title: 'AeroNyx — 私密消息、私密 AI、私密资产',
    description: '一个 App，装下你的消息、你的 AI、你的资产，跑在一个能替你传送、却读不到内容的网络上。密钥从不离开你的手机。',
    ogAlt: 'AeroNyx — 私密消息、私密 AI、私密资产',
  },
  hero: {
    eyebrow: '消息 · AI · 资产 — 一把密钥，只属于你',
    title: '隐私，由架构保证。',
    description: '一个 App，装下你的消息、你的 AI、你的资产。它跑在一个能替你传送、却读不到内容的网络上。密钥从不离开你的手机——所以中间的任何人，不管是我们、某个节点还是服务商，都看不到你说了什么、问了什么、转了什么。',
    primaryCta: '下载 AeroNyx',
    secondaryCta: '它是怎么做到的',
    liveLabel: '已承载，从未被读取',
    liveUnit: '字节',
    nodesLabel: '独立节点',
    plaintextLabel: '网络读得到的内容',
    plaintextValue: '0 B',
    lensHint: '拖动镜头',
    lensCaption: '左：你的手机。右：沿途节点看到的东西。',
    sliderLabel: '隐私镜头：显示网络看到的内容。使用左右方向键。',
    stamp: '网络可读取：0 B',
  },
  phone: {
    status: '端到端加密',
    m0: '到家了，晚餐再次谢谢你。',
    m1: '不客气，那家真的好吃。',
    m2: '我把我那一半转给你。',
    received: '已收到',
    m3: '收到了，谢谢',
    composer: '消息',
    tabs: ['聊天', '频道', 'Nyx', '钱包', '我'],
    cipherHeader: '沿途节点 · 密封视图',
    cipherMeta: '{bytes} B · 已密封 · 发送者未知',
    cipherFooter: '没有文字 · 没有名字 · 没有地址',
  },
  proof: {
    eyebrow: '实时，来自网络本身',
    title: '只承载，不阅读。',
    description: '这些是整个网络的总数，由运行节点的人自己发布。没有任何一个人的数据可以显示，因为根本不存在。',
    traffic: '承载的数据',
    trafficDetail: '流经网络的密封字节',
    packets: '转发的数据包',
    packetsDetail: '一路传递，从未打开',
    nodes: '在线节点',
    nodesDetail: '由独立的人运行',
    readiness: '私密路由',
    readinessDetail: '两跳，没有任何节点同时知道两端',
    link: '查看完整网络状态',
  },
  oneKey: {
    eyebrow: '一把密钥',
    title: '消息、AI 与资产，都在你持有的同一把密钥之下。',
    description: '同一个身份签署消息、向模型提问、转移资产。网络承载这三者，却一个都读不到。',
    panels: [
      {
        name: '消息',
        title: '聊天、群组、通话，端到端密封。',
        body: '文字、群组、语音与视频。所有内容在离开手机之前就已密封，沿途传递的节点打不开。',
        chips: ['默认密封', '群组', '语音与视频', '私密路由'],
        cta: '隐私网络',
      },
      {
        name: 'Nyx — 私密 AI',
        title: '会帮你，却不会认识你的 AI。',
        body: '三种模式：快速、深度、机密。机密模式下，模型在一个连我们都看不进去的封闭隔间里运行，它记住的关于你的一切，都用你的密钥密封。',
        chips: ['机密模式', '记忆归你所有', '离线可用'],
        cta: 'MemChain',
      },
      {
        name: '钱包',
        title: '你的密钥从不离开手机。',
        body: 'Solana、Ethereum、BNB Chain、Tron 与 TAO 在同一个钱包里。密钥放在 App 里一块谁也碰不到的密封区域，而你在签署之前，会看到自己到底在签什么。',
        cta: '下载',
      },
    ],
  },
  ledger: {
    eyebrow: '谁看得到什么',
    title: '每一环只看到它需要的。',
    description: '整个设计就是这一句：每一层只拿到完成工作所需的最少信息，没有任何可以留存或贩卖的东西。',
    canSee: '看得到',
    cannotSee: '看不到',
    rows: [
      { surface: '你的手机', canSee: '你的消息——在密封之前', cannotSee: '没有任何东西未密封就离开' },
      { surface: '沿途的节点', canSee: '一个密封的信封、它的大小、下一站在哪', cannotSee: '里面是什么、你是谁、你和谁聊天、你上哪些网站' },
      { surface: '这个网站', canSee: '整个网络的总数', cannotSee: '关于任何一个人的任何事' },
    ],
  },
  northStar: {
    eyebrow: '北极星计划 / North Star Plan',
    title: '更私密。开源。天生全球化。',
    description: '每一个 AeroNyx 产品背后的承诺：它必须经得起公开检验、真实使用，在世界任何角落都站得住——而且永远不收集使用它的人的数据。',
    signals: [
      { label: '01', title: '更私密', detail: '节点承载密封的数据，只公布总数。维持网络健康，从不意味着监视它的用户。' },
      { label: '02', title: '开源', detail: 'App、协议与节点软件全部公开。任何人都能阅读、运行并改进。' },
      { label: '03', title: '天生全球化', detail: '任何人在任何地方都能运行节点加入。更多地方有更多节点，网络就更强、更难被监视。' },
    ],
  },
  howItWorks: {
    eyebrow: '它是怎么做到的',
    title: '在你的手机密封，在对方的手机打开。',
    description: '三步，中间没有任何人需要被信任。',
    steps: [
      { title: '你的手机把它密封', body: '消息、对 AI 的提问、付款，都用只存在于你设备上的密钥锁起来。' },
      { title: '节点负责传递，不读内容', body: '独立节点把密封的信封往下传。它们看得到大小和下一站——看不到里面是什么，也不知道你是谁。' },
      { title: '只有另一端能打开', body: '你写信给的那个人，或是封闭隔间里的模型。密钥没有别人有。' },
    ],
    diagram: { you: '你', node: '节点', them: '对方', sealed: '密封', carried: '传递', opened: '打开' },
    note: '默认走两跳，所以没有任何一个节点会同时知道东西从哪来、往哪去。',
    link: '阅读技术架构',
  },
  runNode: {
    eyebrow: '运行一个节点',
    title: '承载你读不到的东西。',
    description: '只要有一台服务器，任何人都能帮这个网络传递。节点只转发密封的信封；它从不持有密钥、消息或名字。',
    steps: [
      { title: '安装', body: '一台服务器，一条命令，大约十分钟。' },
      { title: '传递', body: '你的节点在手机之间传递密封的信封。它打不开任何一个。' },
      { title: '观察', body: 'Nodeboard 显示节点的健康状况和传了多少——从不显示是谁的。' },
    ],
    card: { title: '节点', location: '东京', status: '健康', peers: '个对等节点', carried: '今日承载', readable: '可读取', readableValue: '0 B', uptime: '在线率' },
    liveLabel: '个节点此刻在线',
    ctaGuide: '节点指南',
    ctaBoard: '打开 Nodeboard',
  },
  roadmap: {
    eyebrow: '接下来',
    title: '计划，用白话说。',
    items: [
      { when: '2026', title: '默认就私密', body: '每条消息、每笔付款都经由独立节点走两跳路由，而运行节点的人越来越多。' },
      { when: '2028', title: '记忆跟着你走', body: '你的 AI 对你的了解，存放在一份你自己拥有的密封记忆里——跟着你在不同工具之间移动，而不是死在每一个工具里。' },
      { when: '2030', title: '代理也遵守同样的规则', body: '替你工作的软件，通过同一个网络传递、记忆、付款，遵守同一条规则：中间的任何人都读不到。' },
    ],
    closing: '无法背叛用户的基础设施。',
  },
  privacyNetwork: {
    eyebrow: '隐私网络',
    title: '上网，不留下足迹。',
    description:
      '打开它，你的流量就会走一条经过独立节点的私密路线。它们负责传递，却看不到你开了哪些网站——我们也看不到。',
    cta: '获取 AeroNyx',
    points: [
      { title: '没有人看得到你去了哪', body: '节点只知道下一站，其他一概不知：不知道网站、不知道页面、也不知道你是谁。' },
      { title: '由独立的人运行', body: '任何人都能运行节点，节点上跑的代码也任何人都能读。' },
      { title: '只有总数是公开的', body: '网络公布的是总共传了多少。关于个人的记录根本不存在，也就无从公布。' },
      { title: '你的 App 一起走这条路', body: '同一条私密路线，载着你的消息、你的 AI、你的钱包。' },
    ],
    phone: {
      appName: '隐私网络',
      on: '已保护',
      off: '未保护',
      connect: '连接',
      disconnect: '断开连接',
      hintOn: '点一下断开',
      hintOff: '点一下连接',
      routeLabel: '路线',
      routeOn: '两跳 · 亚洲',
      routeOff: '直连',
      ipLabel: '你的 IP',
      ipOn: '已隐藏',
      ipOff: '每个网站都看得到',
      carriedLabel: '本次连接已传输',
      carriedValue: '2.1 GB',
      readableLabel: '网络读得到的内容',
      readableValue: '0 B',
      note: '产品预览 — 试试这个开关',
    },
  },
  downloadNotice: {
    title: '下载前请先看一下',
    body: '隐私工具在部分国家受到限制或监管。你有责任遵守所在地的法律。',
    neutrality: '我们不会检测你在哪里——这条提示对每个人都显示。',
    link: 'AeroNyx 做不到什么',
    cta: '我明白',
  },
  browser: {
    heroLink: '已经装了 App？在浏览器里打开',
    cta: '在浏览器里打开',
    chat: '打开网页版聊天',
  },
  closing: {
    title: '一分钟就能试。',
    description: '免费。开源。密钥从不离开你的手机。',
    proofs: ['设计上就是盲的', '开源', '今天就能用的真产品'],
    download: '下载 AeroNyx',
    docs: '阅读文档',
    talk: '联系我们',
  },
};

const ja = {
  seo: {
    title: 'AeroNyx — プライベートなメッセージ、AI、資産',
    description: 'メッセージも、AI も、資産も、ひとつのアプリに。運ぶのは、データを届けられても読めないネットワーク。鍵は端末を離れません。',
    ogAlt: 'AeroNyx — プライベートなメッセージ、AI、資産',
  },
  hero: {
    eyebrow: 'メッセージ · AI · 資産 — 鍵はひとつ、あなたのもの',
    title: '設計そのものが、プライバシー。',
    description: 'メッセージも、AI も、資産も、ひとつのアプリに。届けることはできても、読むことはできないネットワークの上で動きます。鍵は端末を離れないので、間に立つ誰も——私たちも、ノードも、プロバイダーも——あなたが何を書き、何を尋ね、何を送ったかを見ることはできません。',
    primaryCta: 'AeroNyx をダウンロード',
    secondaryCta: '仕組みを見る',
    liveLabel: '読まれずに運んだ量',
    liveUnit: 'バイト',
    nodesLabel: '独立ノード',
    plaintextLabel: 'ネットワークに読めるもの',
    plaintextValue: '0 B',
    lensHint: 'レンズをドラッグ',
    lensCaption: '左：あなたの端末。右：途中のノードに見えるもの。',
    sliderLabel: 'プライバシーレンズ：ネットワークに見えるものを表示します。左右の矢印キーで操作できます。',
    stamp: 'ネットワークに読めるのは：0 B',
  },
  phone: {
    status: 'エンドツーエンド暗号化',
    m0: '無事に帰宅。ごはんありがとう。',
    m1: 'こちらこそ。あの店ほんとに良かった。',
    m2: '私の分、いま送るね。',
    received: '受取',
    m3: '受け取った、ありがとう',
    composer: 'メッセージ',
    tabs: ['チャット', 'チャンネル', 'Nyx', 'ウォレット', '自分'],
    cipherHeader: '途中のノード · 封印ビュー',
    cipherMeta: '{bytes} B · 封印済み · 送信者不明',
    cipherFooter: '言葉なし · 名前なし · 宛先なし',
  },
  proof: {
    eyebrow: 'ライブ、ネットワーク自身から',
    title: '運ぶ。読まない。',
    description: 'これはネットワーク全体の合計で、ノードを運用する人たち自身が公開しています。個人単位のデータは表示できません——そもそも存在しないからです。',
    traffic: '運んだデータ',
    trafficDetail: 'ネットワークを通過した封印済みバイト',
    packets: '転送したパケット',
    packetsDetail: '受け渡すだけ、一度も開かない',
    nodes: 'オンラインのノード',
    nodesDetail: '独立した人々が運用',
    readiness: 'プライベート経路',
    readinessDetail: '2 ホップ。両端を知るノードはひとつもない',
    link: 'ネットワークの状態をすべて見る',
  },
  oneKey: {
    eyebrow: 'ひとつの鍵',
    title: 'メッセージも、AI も、資産も。あなたが持つひとつの鍵のもとに。',
    description: '同じアイデンティティがメッセージに署名し、モデルに問い、資産を動かす。ネットワークは三つすべてを運びながら、ひとつも読めません。',
    panels: [
      {
        name: 'メッセージ',
        title: 'チャット、グループ、通話。端から端まで封印。',
        body: 'テキスト、グループ、音声、ビデオ。すべては端末を離れる前に封印され、途中で受け渡すノードには開けません。',
        chips: ['標準で封印', 'グループ', '音声・ビデオ', 'プライベート経路'],
        cta: 'プライバシーネットワーク',
      },
      {
        name: 'Nyx — プライベート AI',
        title: 'あなたを知らないまま、あなたを助ける AI。',
        body: '高速・深層・機密の 3 モード。機密モードでは、モデルは私たちですら覗けない閉じた区画で動き、あなたについて覚えたことはあなたの鍵で封印されます。',
        chips: ['機密モード', '記憶はあなたのもの', 'オフラインで動作'],
        cta: 'MemChain',
      },
      {
        name: 'ウォレット',
        title: 'あなたの鍵は端末を離れない。',
        body: 'Solana、Ethereum、BNB Chain、Tron、TAO をひとつのウォレットに。鍵はアプリの中の、他の何も手が届かない封印された領域に置かれ、署名する前に自分が何に署名するのかを正確に確認できます。',
        cta: 'ダウンロード',
      },
    ],
  },
  ledger: {
    eyebrow: '誰に何が見えるか',
    title: 'どの部分も、必要なものしか見ない。',
    description: '設計はこの一言に尽きます。各レイヤーは仕事に必要な最小限だけを受け取り、保存したり売ったりできるものは何も受け取らない。',
    canSee: '見える',
    cannotSee: '見えない',
    rows: [
      { surface: 'あなたの端末', canSee: 'あなたのメッセージ——封印される前に', cannotSee: '封印されずに外へ出るものはない' },
      { surface: '途中のノード', canSee: '封印された封筒、その大きさ、次の宛先', cannotSee: '中身、あなたが誰か、誰と話すか、どのサイトを見るか' },
      { surface: 'このサイト', canSee: 'ネットワーク全体の合計', cannotSee: '特定の一人に関するすべて' },
    ],
  },
  northStar: {
    eyebrow: 'North Star Plan / 北極星計劃',
    title: 'よりプライベートに。オープンソースで。はじめからグローバルに。',
    description: 'すべての AeroNyx 製品の背後にある約束：公開の検証にも、実際の利用にも、世界のどこでも耐えること——そして、使う人のデータを決して集めないこと。',
    signals: [
      { label: '01', title: 'よりプライベートに', detail: 'ノードは封印されたデータを運び、合計だけを公開します。ネットワークの健全性を保つことが、利用者を監視することを意味してはなりません。' },
      { label: '02', title: 'オープンソース', detail: 'アプリも、プロトコルも、ノードのソフトウェアも公開されています。誰でも読み、動かし、改善できます。' },
      { label: '03', title: 'はじめからグローバルに', detail: '誰でも、どこからでもノードを立てて参加できます。多くの場所に多くのノードがあるほど、ネットワークは強く、監視しにくくなります。' },
    ],
  },
  howItWorks: {
    eyebrow: '仕組み',
    title: 'あなたの端末で封印し、相手の端末で開く。',
    description: '三つのステップ。間にいる誰も信頼する必要はありません。',
    steps: [
      { title: '端末が封印する', body: 'メッセージ、AI への質問、支払いは、あなたの端末にしか存在しない鍵でロックされます。' },
      { title: 'ノードが運ぶ、読まずに', body: '独立したノードが封印された封筒を受け渡します。見えるのは大きさと次の宛先だけ——中身も、あなたが誰かも見えません。' },
      { title: '開けるのは相手だけ', body: 'あなたが書いた相手、または閉じた区画の中のモデル。鍵は他の誰も持っていません。' },
    ],
    diagram: { you: 'あなた', node: 'ノード', them: '相手', sealed: '封印', carried: '運搬', opened: '開封' },
    note: '標準で 2 ホップ。どこから来て、どこへ行くのか、その両方を知るノードはひとつもありません。',
    link: '技術アーキテクチャを読む',
  },
  runNode: {
    eyebrow: 'ノードを運用する',
    title: '読めないものを、運ぶ。',
    description: 'サーバーが一台あれば、誰でもネットワークの運搬を手伝えます。ノードは封印された封筒を転送するだけで、鍵も、メッセージも、名前も、決して持ちません。',
    steps: [
      { title: 'インストール', body: 'サーバー一台、コマンド一つ、約 10 分。' },
      { title: '運ぶ', body: 'あなたのノードは端末の間で封印された封筒を受け渡します。どれひとつ開けられません。' },
      { title: '見守る', body: 'Nodeboard はノードの健全性と、どれだけ運んだかを表示します——誰のものかは決して表示しません。' },
    ],
    card: { title: 'ノード', location: '東京', status: '正常', peers: 'ピア', carried: '本日の運搬量', readable: '読める量', readableValue: '0 B', uptime: '稼働率' },
    liveLabel: 'ノードが今オンライン',
    ctaGuide: 'ノードガイド',
    ctaBoard: 'Nodeboard を開く',
  },
  roadmap: {
    eyebrow: 'この先',
    title: '計画を、ふつうの言葉で。',
    items: [
      { when: '2026', title: '標準でプライベート', body: 'すべてのメッセージと支払いが独立ノードを通る 2 ホップ経路を取り、ノードを運用する人が増えていきます。' },
      { when: '2028', title: '記憶があなたと一緒に移動する', body: 'AI があなたについて知っていることは、あなたが所有する封印された記憶に置かれ、ツールの中で消えるのではなく、ツール間をあなたと共に移動します。' },
      { when: '2030', title: 'エージェントも同じ条件で', body: 'あなたのために働くソフトウェアが、同じネットワークを通じて経路を選び、記憶し、支払う——同じルールのもとで。間にいる誰も読めない。' },
    ],
    closing: '利用者を裏切れないインフラ。',
  },
  privacyNetwork: {
    eyebrow: 'プライバシーネットワーク',
    title: '足あとを残さずに、ネットを使う。',
    description:
      'オンにすると、通信は独立したノードを通るプライベートな経路を進みます。ノードは中継するだけで、あなたがどのサイトを見ているかは分かりません。私たちにも分かりません。',
    cta: 'AeroNyx を入手',
    points: [
      { title: 'どこを見ているかは誰にも見えない', body: 'ノードが知っているのは次の宛先だけ。サイトもページも、あなたが誰かも分かりません。' },
      { title: '独立した人たちが運用', body: '誰でもノードを立てられ、そこで動くコードは誰でも読めます。' },
      { title: '公開されるのは合計だけ', body: 'ネットワークが公開するのは全体で運んだ量。個人ごとの履歴はそもそも存在しません。' },
      { title: 'アプリも同じ経路で', body: '同じプライベートな経路が、メッセージも AI もウォレットも運びます。' },
    ],
    phone: {
      appName: 'プライバシーネットワーク',
      on: '保護中',
      off: '未保護',
      connect: '接続',
      disconnect: '切断',
      hintOn: 'タップで切断',
      hintOff: 'タップで接続',
      routeLabel: '経路',
      routeOn: '2 ホップ · アジア',
      routeOff: '直接',
      ipLabel: 'あなたの IP',
      ipOn: '非公開',
      ipOff: 'すべてのサイトに見えています',
      carriedLabel: 'このセッションの通信量',
      carriedValue: '2.1 GB',
      readableLabel: 'ネットワークに読めるもの',
      readableValue: '0 B',
      note: '製品プレビュー — スイッチを試せます',
    },
  },
  downloadNotice: {
    title: 'ダウンロードの前に',
    body: 'プライバシーツールは、国によっては制限または規制されています。お住まいの地域の法律を守る責任はご自身にあります。',
    neutrality: '私たちはあなたの所在地を調べません。この案内は全員に表示されます。',
    link: 'AeroNyx にできないこと',
    cta: '了解しました',
  },
  browser: {
    heroLink: 'アプリはもうお持ちですか？ブラウザで開く',
    cta: 'ブラウザで開く',
    chat: 'ウェブ版チャットを開く',
  },
  closing: {
    title: '一分で試せます。',
    description: '無料。オープンソース。鍵は端末を離れません。',
    proofs: ['設計から盲目', 'オープンソース', '今日使える本物のプロダクト'],
    download: 'AeroNyx をダウンロード',
    docs: 'ドキュメントを読む',
    talk: 'お問い合わせ',
  },
};

const ko = {
  seo: {
    title: 'AeroNyx — 프라이빗 메시지, 프라이빗 AI, 프라이빗 자산',
    description: '메시지, AI, 자산을 하나의 앱에. 데이터를 전달할 수는 있지만 읽을 수는 없는 네트워크 위에서 돌아갑니다. 키는 휴대폰을 떠나지 않습니다.',
    ogAlt: 'AeroNyx — 프라이빗 메시지, 프라이빗 AI, 프라이빗 자산',
  },
  hero: {
    eyebrow: '메시지 · AI · 자산 — 하나의 키, 당신의 것',
    title: '설계부터 프라이빗.',
    description: '메시지, AI, 자산을 하나의 앱에. 데이터를 전달할 수는 있지만 읽을 수는 없는 네트워크 위에서 돌아갑니다. 키는 휴대폰을 떠나지 않으니, 중간의 누구도—우리도, 노드도, 사업자도—당신이 무엇을 말하고, 묻고, 보내는지 볼 수 없습니다.',
    primaryCta: 'AeroNyx 다운로드',
    secondaryCta: '작동 방식',
    liveLabel: '읽히지 않고 전달됨',
    liveUnit: '바이트',
    nodesLabel: '독립 노드',
    plaintextLabel: '네트워크가 읽을 수 있는 것',
    plaintextValue: '0 B',
    lensHint: '렌즈를 드래그',
    lensCaption: '왼쪽: 당신의 휴대폰. 오른쪽: 중간 노드가 보는 것.',
    sliderLabel: '프라이버시 렌즈: 네트워크가 보는 것을 표시합니다. 좌우 화살표 키를 사용하세요.',
    stamp: '네트워크가 읽을 수 있는 양: 0 B',
  },
  phone: {
    status: '종단간 암호화',
    m0: '집에 잘 왔어. 저녁 고마웠어.',
    m1: '별말을. 거기 진짜 맛있더라.',
    m2: '내 몫 지금 보낼게.',
    received: '받음',
    m3: '받았어, 고마워',
    composer: '메시지',
    tabs: ['채팅', '채널', 'Nyx', '지갑', '나'],
    cipherHeader: '중간 노드 · 봉인된 화면',
    cipherMeta: '{bytes} B · 봉인됨 · 발신자 불명',
    cipherFooter: '글자 없음 · 이름 없음 · 주소 없음',
  },
  proof: {
    eyebrow: '실시간, 네트워크 스스로 공개',
    title: '전달합니다. 읽지 않습니다.',
    description: '이 숫자는 네트워크 전체의 합계이며, 노드를 운영하는 사람들이 직접 공개합니다. 개인 단위의 데이터는 보여줄 수 없습니다. 애초에 존재하지 않으니까요.',
    traffic: '전달한 데이터',
    trafficDetail: '네트워크를 지나간 봉인된 바이트',
    packets: '전달한 패킷',
    packetsDetail: '넘겨줄 뿐, 한 번도 열지 않음',
    nodes: '온라인 노드',
    nodesDetail: '독립적인 사람들이 운영',
    readiness: '프라이빗 경로',
    readinessDetail: '2홉이라 양쪽 끝을 모두 아는 노드가 없음',
    link: '전체 네트워크 상태 보기',
  },
  oneKey: {
    eyebrow: '하나의 키',
    title: '메시지, AI, 자산 — 당신이 쥔 하나의 키 아래에.',
    description: '같은 신원이 메시지에 서명하고, 모델에 묻고, 자산을 옮깁니다. 네트워크는 셋 모두를 전달하지만 어느 것도 읽지 못합니다.',
    panels: [
      {
        name: '메시지',
        title: '채팅, 그룹, 통화. 끝에서 끝까지 봉인.',
        body: '문자, 그룹, 음성, 영상. 모든 것이 휴대폰을 떠나기 전에 봉인되고, 중간에서 넘겨주는 노드는 열 수 없습니다.',
        chips: ['기본 봉인', '그룹', '음성·영상', '프라이빗 경로'],
        cta: '프라이버시 네트워크',
      },
      {
        name: 'Nyx — 프라이빗 AI',
        title: '당신을 알지 못한 채 당신을 돕는 AI.',
        body: '빠름, 깊음, 기밀의 세 가지 모드. 기밀 모드에서는 모델이 우리조차 들여다볼 수 없는 잠긴 칸 안에서 동작하고, 당신에 대해 기억하는 것은 당신의 키로 봉인됩니다.',
        chips: ['기밀 모드', '당신이 소유한 기억', '오프라인 동작'],
        cta: 'MemChain',
      },
      {
        name: '지갑',
        title: '당신의 키는 휴대폰을 떠나지 않습니다.',
        body: 'Solana, Ethereum, BNB Chain, Tron, TAO를 하나의 지갑에. 키는 앱 안의 아무것도 닿을 수 없는 봉인된 영역에 있고, 서명하기 전에 무엇에 서명하는지 정확히 볼 수 있습니다.',
        cta: '다운로드',
      },
    ],
  },
  ledger: {
    eyebrow: '누가 무엇을 보는가',
    title: '모든 부분은 필요한 것만 봅니다.',
    description: '설계의 전부입니다. 각 계층은 일에 필요한 최소한만 받고, 보관하거나 팔 수 있는 것은 아무것도 받지 않습니다.',
    canSee: '볼 수 있음',
    cannotSee: '볼 수 없음',
    rows: [
      { surface: '당신의 휴대폰', canSee: '당신의 메시지 — 봉인되기 전에', cannotSee: '봉인되지 않은 채 나가는 것은 없음' },
      { surface: '중간의 노드', canSee: '봉인된 봉투, 그 크기, 다음 목적지', cannotSee: '내용, 당신이 누구인지, 누구와 대화하는지, 어떤 사이트를 보는지' },
      { surface: '이 웹사이트', canSee: '네트워크 전체의 합계', cannotSee: '한 사람에 관한 어떤 것도' },
    ],
  },
  northStar: {
    eyebrow: 'North Star Plan / 北極星計劃',
    title: '더 프라이빗하게. 오픈소스로. 처음부터 글로벌하게.',
    description: '모든 AeroNyx 제품 뒤에 있는 약속: 공개 검증에도, 실제 사용에도, 세계 어디에서도 버텨야 한다는 것 — 그리고 사용하는 사람의 데이터를 결코 수집하지 않는다는 것.',
    signals: [
      { label: '01', title: '더 프라이빗하게', detail: '노드는 봉인된 데이터를 전달하고 합계만 공개합니다. 네트워크를 건강하게 유지하는 일이 사용자를 감시하는 일이 되어서는 안 됩니다.' },
      { label: '02', title: '오픈소스', detail: '앱, 프로토콜, 노드 소프트웨어가 모두 공개되어 있습니다. 누구나 읽고, 실행하고, 개선할 수 있습니다.' },
      { label: '03', title: '처음부터 글로벌하게', detail: '누구나 어디서든 노드를 운영하고 참여할 수 있습니다. 더 많은 곳에 더 많은 노드가 있을수록 네트워크는 더 강해지고 감시하기 어려워집니다.' },
    ],
  },
  howItWorks: {
    eyebrow: '작동 방식',
    title: '당신의 휴대폰에서 봉인하고, 상대의 휴대폰에서 엽니다.',
    description: '세 단계. 중간의 누구도 신뢰할 필요가 없습니다.',
    steps: [
      { title: '휴대폰이 봉인합니다', body: '메시지, AI에게 하는 질문, 결제는 당신의 기기에만 존재하는 키로 잠깁니다.' },
      { title: '노드가 읽지 않고 전달합니다', body: '독립 노드들이 봉인된 봉투를 넘겨줍니다. 크기와 다음 목적지만 볼 뿐, 내용도 당신이 누구인지도 보지 못합니다.' },
      { title: '상대만 열 수 있습니다', body: '당신이 쓴 상대, 또는 잠긴 칸 안의 모델. 다른 누구도 키를 갖고 있지 않습니다.' },
    ],
    diagram: { you: '당신', node: '노드', them: '상대', sealed: '봉인', carried: '전달', opened: '열림' },
    note: '기본이 2홉이라, 어디서 왔고 어디로 가는지를 모두 아는 노드는 하나도 없습니다.',
    link: '기술 아키텍처 읽기',
  },
  runNode: {
    eyebrow: '노드 운영하기',
    title: '읽을 수 없는 것을 전달하세요.',
    description: '서버 한 대만 있으면 누구나 네트워크를 도울 수 있습니다. 노드는 봉인된 봉투를 전달할 뿐, 키도 메시지도 이름도 절대 갖지 않습니다.',
    steps: [
      { title: '설치', body: '서버 한 대, 명령 한 줄, 약 10분.' },
      { title: '전달', body: '당신의 노드가 휴대폰 사이에서 봉인된 봉투를 넘겨줍니다. 어느 것도 열 수 없습니다.' },
      { title: '지켜보기', body: 'Nodeboard가 노드의 상태와 얼마나 전달했는지를 보여줍니다 — 누구의 것인지는 절대 보여주지 않습니다.' },
    ],
    card: { title: '노드', location: '도쿄', status: '정상', peers: '피어', carried: '오늘 전달량', readable: '읽을 수 있는 양', readableValue: '0 B', uptime: '가동률' },
    liveLabel: '개 노드가 지금 온라인',
    ctaGuide: '노드 가이드',
    ctaBoard: 'Nodeboard 열기',
  },
  roadmap: {
    eyebrow: '앞으로',
    title: '계획을, 쉬운 말로.',
    items: [
      { when: '2026', title: '기본이 프라이빗', body: '모든 메시지와 결제가 독립 노드를 지나는 2홉 경로를 타고, 노드를 운영하는 사람이 늘어납니다.' },
      { when: '2028', title: '기억이 당신과 함께 이동', body: 'AI가 당신에 대해 아는 것은 당신이 소유한 봉인된 기억에 담기고, 도구마다 사라지는 대신 도구 사이를 당신과 함께 이동합니다.' },
      { when: '2030', title: '에이전트도 같은 조건으로', body: '당신을 위해 일하는 소프트웨어가 같은 네트워크를 통해 경로를 잡고, 기억하고, 지불합니다. 같은 규칙 아래에서: 중간의 누구도 읽을 수 없습니다.' },
    ],
    closing: '사용자를 배신할 수 없는 인프라.',
  },
  privacyNetwork: {
    eyebrow: '프라이버시 네트워크',
    title: '흔적을 남기지 않고 인터넷을 씁니다.',
    description:
      '켜면 트래픽이 독립 노드를 거치는 프라이빗 경로로 흐릅니다. 노드는 전달만 할 뿐, 당신이 어떤 사이트를 보는지 알지 못합니다. 우리도 모릅니다.',
    cta: 'AeroNyx 받기',
    points: [
      { title: '어디에 가는지 아무도 못 봅니다', body: '노드가 아는 것은 다음 목적지뿐입니다. 사이트도, 페이지도, 당신이 누구인지도 모릅니다.' },
      { title: '독립적인 사람들이 운영합니다', body: '누구나 노드를 운영할 수 있고, 그 위에서 도는 코드는 누구나 읽을 수 있습니다.' },
      { title: '공개되는 것은 합계뿐', body: '네트워크는 전체로 얼마나 전달했는지를 공개합니다. 개인별 기록은 애초에 없습니다.' },
      { title: '앱도 같은 길로', body: '같은 프라이빗 경로가 메시지도, AI도, 지갑도 실어 나릅니다.' },
    ],
    phone: {
      appName: '프라이버시 네트워크',
      on: '보호됨',
      off: '보호되지 않음',
      connect: '연결',
      disconnect: '연결 해제',
      hintOn: '탭하여 연결 해제',
      hintOff: '탭하여 연결',
      routeLabel: '경로',
      routeOn: '2홉 · 아시아',
      routeOff: '직접 연결',
      ipLabel: '내 IP',
      ipOn: '숨김',
      ipOff: '모든 사이트에 노출',
      carriedLabel: '이번 세션 전송량',
      carriedValue: '2.1 GB',
      readableLabel: '네트워크가 읽을 수 있는 것',
      readableValue: '0 B',
      note: '제품 미리보기 — 스위치를 눌러보세요',
    },
  },
  downloadNotice: {
    title: '다운로드하기 전에',
    body: '프라이버시 도구는 일부 국가에서 제한되거나 규제됩니다. 계신 곳의 법을 지키는 책임은 본인에게 있습니다.',
    neutrality: '우리는 당신이 어디에 있는지 확인하지 않습니다. 이 안내는 모두에게 표시됩니다.',
    link: 'AeroNyx가 하지 못하는 것',
    cta: '이해했습니다',
  },
  browser: {
    heroLink: '앱이 이미 있나요? 브라우저에서 열기',
    cta: '브라우저에서 열기',
    chat: '웹 채팅 열기',
  },
  closing: {
    title: '1분이면 써볼 수 있습니다.',
    description: '무료. 오픈소스. 키는 휴대폰을 떠나지 않습니다.',
    proofs: ['설계부터 눈먼 네트워크', '오픈소스', '오늘 쓸 수 있는 진짜 제품'],
    download: 'AeroNyx 다운로드',
    docs: '문서 읽기',
    talk: '문의하기',
  },
};

const es = {
  seo: {
    title: 'AeroNyx — Mensajes privados, IA privada, dinero privado',
    description: 'Una app para tus mensajes, tu IA y tu dinero, sobre una red que puede llevar tus datos pero no puede leerlos. Tus claves nunca salen de tu teléfono.',
    ogAlt: 'AeroNyx — mensajes privados, IA privada, dinero privado',
  },
  hero: {
    eyebrow: 'Mensajes · IA · Dinero — una sola clave, la tuya',
    title: 'Privado por construcción.',
    description: 'Una app para tus mensajes, tu IA y tu dinero. Funciona sobre una red que puede llevar tus datos pero no puede leerlos. Tus claves nunca salen de tu teléfono, así que nadie en el medio —ni nosotros, ni un nodo, ni un proveedor— puede ver lo que dices, preguntas o envías.',
    primaryCta: 'Descargar AeroNyx',
    secondaryCta: 'Cómo funciona',
    liveLabel: 'Llevado, nunca leído',
    liveUnit: 'bytes',
    nodesLabel: 'Nodos independientes',
    plaintextLabel: 'Legible por la red',
    plaintextValue: '0 B',
    lensHint: 'Arrastra la lente',
    lensCaption: 'Izquierda: tu teléfono. Derecha: lo que ve un nodo en el camino.',
    sliderLabel: 'Lente de privacidad: muestra lo que ve la red. Usa las flechas izquierda y derecha.',
    stamp: 'LEGIBLE POR LA RED: 0 B',
  },
  phone: {
    status: 'Cifrado de extremo a extremo',
    m0: 'Ya en casa. Gracias otra vez por la cena.',
    m1: 'Cuando quieras. Ese sitio estaba buenísimo.',
    m2: 'Te mando mi parte ahora.',
    received: 'Recibido',
    m3: 'perfecto, gracias',
    composer: 'Mensaje',
    tabs: ['Chats', 'Canales', 'Nyx', 'Cartera', 'Yo'],
    cipherHeader: 'un nodo en el camino · vista sellada',
    cipherMeta: '{bytes} B · sellado · remitente desconocido',
    cipherFooter: 'sin palabras · sin nombres · sin dirección',
  },
  proof: {
    eyebrow: 'En vivo, desde la propia red',
    title: 'Transportado. Nunca leído.',
    description: 'Son totales de toda la red, publicados por los nodos que la hacen funcionar. No hay datos por persona que mostrar, porque no existen.',
    traffic: 'Datos transportados',
    trafficDetail: 'bytes sellados que pasaron por la red',
    packets: 'Paquetes reenviados',
    packetsDetail: 'pasados de mano en mano, nunca abiertos',
    nodes: 'Nodos en línea',
    nodesDetail: 'operados por personas independientes',
    readiness: 'Rutas privadas',
    readinessDetail: 'dos saltos: ningún nodo conoce ambos extremos',
    link: 'Ver el estado completo de la red',
  },
  oneKey: {
    eyebrow: 'Una sola clave',
    title: 'Mensajes, IA y dinero, bajo una sola clave que tú tienes.',
    description: 'La misma identidad firma un mensaje, pregunta al modelo y mueve dinero. La red transporta las tres cosas y no puede leer ninguna.',
    panels: [
      {
        name: 'Mensajes',
        title: 'Chats, grupos y llamadas, sellados de extremo a extremo.',
        body: 'Texto, grupos, voz y vídeo. Todo se sella antes de salir de tu teléfono, y los nodos que lo pasan no pueden abrirlo.',
        chips: ['Sellado por defecto', 'Grupos', 'Voz y vídeo', 'Rutas privadas'],
        cta: 'Privacy Network',
      },
      {
        name: 'Nyx — IA privada',
        title: 'Una IA que te ayuda sin aprender nada sobre ti.',
        body: 'Tres modos: rápido, profundo y confidencial. En modo confidencial el modelo corre en un compartimento cerrado que ni nosotros podemos mirar, y lo que recuerda de ti queda sellado con tu clave.',
        chips: ['Modo confidencial', 'Memoria que es tuya', 'Funciona sin conexión'],
        cta: 'MemChain',
      },
      {
        name: 'Cartera',
        title: 'Tus claves nunca salen de tu teléfono.',
        body: 'Solana, Ethereum, BNB Chain, Tron y TAO en una sola cartera. Las claves viven en una parte sellada de la app a la que nada más puede llegar, y ves exactamente qué firmas antes de firmarlo.',
        cta: 'Descargar',
      },
    ],
  },
  ledger: {
    eyebrow: 'Quién ve qué',
    title: 'Cada parte ve solo lo que necesita.',
    description: 'Ese es todo el diseño: cada capa recibe lo mínimo para hacer su trabajo, y nada que pudiera guardar o vender.',
    canSee: 'Puede ver',
    cannotSee: 'No puede ver',
    rows: [
      { surface: 'Tu teléfono', canSee: 'Tus mensajes, antes de sellarse', cannotSee: 'Nada sale sin sellar' },
      { surface: 'Los nodos del camino', canSee: 'Un sobre sellado, su tamaño y la siguiente parada', cannotSee: 'Qué hay dentro, quién eres, con quién hablas, qué sitios visitas' },
      { surface: 'Este sitio web', canSee: 'Totales de toda la red', cannotSee: 'Nada sobre una persona' },
    ],
  },
  northStar: {
    eyebrow: 'Plan Estrella Polar / 北極星計劃',
    title: 'Más privado. Código abierto. Global por defecto.',
    description: 'La promesa detrás de cada producto de AeroNyx: tiene que aguantar en público, en uso real y en cualquier lugar del mundo, sin recopilar nunca datos sobre las personas que lo usan.',
    signals: [
      { label: '01', title: 'Más privado', detail: 'Los nodos llevan datos sellados y publican solo totales. Mantener sana la red nunca significa vigilar a sus usuarios.' },
      { label: '02', title: 'Código abierto', detail: 'La app, el protocolo y el software del nodo son públicos. Cualquiera puede leerlos, ejecutarlos y mejorarlos.' },
      { label: '03', title: 'Global por defecto', detail: 'Cualquiera, en cualquier lugar, puede operar un nodo y unirse. Más nodos en más lugares hacen la red más fuerte y más difícil de vigilar.' },
    ],
  },
  howItWorks: {
    eyebrow: 'Cómo funciona',
    title: 'Sellado en tu teléfono. Abierto en el suyo.',
    description: 'Tres pasos, y nadie en el medio tiene que ser de confianza.',
    steps: [
      { title: 'Tu teléfono lo sella', body: 'Los mensajes, las preguntas a la IA y los pagos se cierran con claves que solo existen en tu dispositivo.' },
      { title: 'Los nodos lo llevan sin leerlo', body: 'Nodos independientes pasan el sobre sellado. Ven su tamaño y la siguiente parada, no lo que hay dentro ni quién eres.' },
      { title: 'Solo el otro lado lo abre', body: 'La persona a la que escribiste, o el modelo en su compartimento cerrado. Nadie más tiene la clave.' },
    ],
    diagram: { you: 'Tú', node: 'Nodo', them: 'Ellos', sealed: 'sellado', carried: 'llevado', opened: 'abierto' },
    note: 'Dos saltos por defecto, así que ningún nodo sabe nunca a la vez de dónde viene algo y adónde va.',
    link: 'Leer la arquitectura técnica',
  },
  runNode: {
    eyebrow: 'Opera un nodo',
    title: 'Lleva lo que no puedes leer.',
    description: 'Cualquiera con un servidor puede ayudar a llevar la red. Un nodo reenvía sobres sellados; nunca guarda una clave, un mensaje ni un nombre.',
    steps: [
      { title: 'Instala', body: 'Un servidor, un comando, unos diez minutos.' },
      { title: 'Lleva', body: 'Tu nodo pasa sobres sellados entre teléfonos. No puede abrir ninguno.' },
      { title: 'Observa', body: 'Nodeboard muestra la salud de tu nodo y cuánto llevó, nunca de quién.' },
    ],
    card: { title: 'Nodo', location: 'Tokio', status: 'Sano', peers: 'pares', carried: 'llevado hoy', readable: 'legible', readableValue: '0 B', uptime: 'disponibilidad' },
    liveLabel: 'nodos en línea ahora mismo',
    ctaGuide: 'Guía del nodo',
    ctaBoard: 'Abrir Nodeboard',
  },
  roadmap: {
    eyebrow: 'Hacia dónde va esto',
    title: 'El plan, en palabras sencillas.',
    items: [
      { when: '2026', title: 'Privado por defecto', body: 'Cada mensaje y cada pago toma una ruta de dos saltos por nodos independientes, y más gente los opera.' },
      { when: '2028', title: 'Tu memoria viaja contigo', body: 'Lo que tu IA sabe de ti vive en una memoria sellada que es tuya, y se mueve contigo entre herramientas en vez de morir dentro de cada una.' },
      { when: '2030', title: 'Agentes con las mismas reglas', body: 'El software que trabaja para ti enruta, recuerda y paga por la misma red, bajo la misma regla: nadie en el medio puede leerlo.' },
    ],
    closing: 'Infraestructura que no puede traicionar a sus usuarios.',
  },
  privacyNetwork: {
    eyebrow: 'Privacy Network',
    title: 'Navega sin que te sigan.',
    description:
      'Actívala y tu tráfico toma una ruta privada por nodos independientes. Ellos lo pasan sin poder ver qué sitios visitas, y nosotros tampoco.',
    cta: 'Consigue AeroNyx',
    points: [
      { title: 'Nadie ve adónde vas', body: 'Un nodo conoce la siguiente parada y nada más: ni el sitio, ni la página, ni a ti.' },
      { title: 'Operada por gente independiente', body: 'Cualquiera puede tener un nodo, y cualquiera puede leer el código que corre en él.' },
      { title: 'Solo los totales son públicos', body: 'La red publica cuánto llevó en total. No hay historial por persona que publicar.' },
      { title: 'Tus apps van por el mismo camino', body: 'La misma ruta privada lleva tus mensajes, tu IA y tu cartera.' },
    ],
    phone: {
      appName: 'Privacy Network',
      on: 'Protegido',
      off: 'Sin protección',
      connect: 'Conectar',
      disconnect: 'Desconectar',
      hintOn: 'Toca para desconectar',
      hintOff: 'Toca para conectar',
      routeLabel: 'Ruta',
      routeOn: 'Dos saltos · Asia',
      routeOff: 'Directa',
      ipLabel: 'Tu IP',
      ipOn: 'Oculta',
      ipOff: 'Visible para cada sitio',
      carriedLabel: 'Llevado en esta sesión',
      carriedValue: '2,1 GB',
      readableLabel: 'Legible por la red',
      readableValue: '0 B',
      note: 'Vista previa del producto — prueba el interruptor',
    },
  },
  downloadNotice: {
    title: 'Antes de descargar',
    body: 'Las herramientas de privacidad están restringidas o reguladas en algunos países. Eres responsable de cumplir la ley donde estés.',
    neutrality: 'No comprobamos dónde estás: este aviso lo ve todo el mundo.',
    link: 'Lo que AeroNyx no hace',
    cta: 'Entendido',
  },
  browser: {
    heroLink: '¿Ya tienes la app? Ábrela en tu navegador',
    cta: 'Abrir en el navegador',
    chat: 'Abrir el chat web',
  },
  closing: {
    title: 'Pruébalo en un minuto.',
    description: 'Gratis. Código abierto. Tus claves nunca salen de tu teléfono.',
    proofs: ['Ciega por diseño', 'Código abierto', 'Un producto real, hoy'],
    download: 'Descargar AeroNyx',
    docs: 'Leer la documentación',
    talk: 'Habla con nosotros',
  },
};

const locales = { en, ru, 'zh-Hant': zhHant, 'zh-Hans': zhHans, ja, ko, es };

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Deep merge: arrays merge by index so a locale can override one panel field.
 * Exported as `mergeLocaleCopy` because lib/i18n-privacy-network.js needs the
 * identical fallback contract — a missing string must surface the English
 * sentence, never a key and never a blank.
 */
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

export const mergeLocaleCopy = merge;

export function getNightglassCopy(locale) {
  return merge(en, locales[locale] || null);
}

export default getNightglassCopy;
