/**
 * ============================================================================
 * File: lib/i18n-privacy-network.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-13 by Claude] Copy for /privacy-network, in the
 * same plain register as the homepage.
 *
 * It replaces what the page read out of lib/i18n `privacyNetworkPage`, which
 * spoke in protocol terms throughout — "auditable decentralized node
 * boundary", "user-level telemetry", "signed capabilities", "aggregate health
 * evidence". Those sentences are accurate and nobody outside the project can
 * read them. lib/i18n is untouched; other surfaces still use it.
 *
 * The section that matters most here is `limits`. A privacy product that
 * lists only what it protects is not trustworthy, and the claim-safety rules
 * in public/llms.txt say the same thing: never imply that AeroNyx removes
 * every metadata risk or makes unlawful activity lawful. Saying the edges out
 * loud, on the page, is both the honest and the persuasive move.
 *
 * Separate file rather than more of lib/i18n-nightglass.js: that one belongs
 * to the homepage and is already long. Same deep-merge contract, borrowed
 * from it, so a missing string falls back to the English sentence.
 * ============================================================================
 */

import { mergeLocaleCopy } from './i18n-nightglass';

const en = {
  seo: {
    title: 'AeroNyx Privacy Network — browse without being followed',
    description: 'An encrypted tunnel through nodes that anyone can run. Sites see the node, not your IP address. The node software is open source (AGPL-3.0).',
  },
  how: {
    eyebrow: 'The private route',
    title: 'For messages, two hops — and nobody sees both ends.',
    description: 'Turn on the private route for messages and they leave your device sealed, then make two stops before they arrive. No single node knows both who sent a message and who it is for. This route is opt-in today, and the network is still small.',
    steps: [
      { title: 'Your device seals it', body: 'Before anything leaves, it is locked with keys that exist only on your device.' },
      { title: 'The first node knows you, not the recipient', body: 'It sees a sealed envelope arriving from your connection, and where to hand it next. Nothing about who it is for.' },
      { title: 'The second node knows the recipient, not you', body: 'It passes the envelope on to where it is going, with no idea who it came from.' },
    ],
    note: 'Browsing through the VPN works differently: it is one encrypted tunnel to one node, and that node can see where your traffic is going, as with any VPN.',
    diagram: { you: 'You', node: 'Node', them: 'Recipient', sealed: 'sealed', carried: 'carried', opened: 'delivered' },
  },
  vs: {
    eyebrow: 'Not just a VPN',
    title: 'A VPN is a promise. This is also a design you can read.',
    description: 'With a VPN, everything you do crosses servers a single company owns, and your privacy is whatever their policy says today. AeroNyx opens the node software and the protocol design, so you can check more than the policy.',
    them: {
      title: 'A traditional VPN',
      points: [
        'One company owns every server your traffic crosses.',
        'It can see every site you visit, whether or not it writes that down.',
        'You are trusting a promise — and promises change hands.',
      ],
    },
    us: {
      title: 'AeroNyx Privacy Network',
      points: [
        'Anyone can run a node, so no single company has to own the path.',
        'Messages are sealed on your device, so nodes carry them without being able to read them.',
        'The node software and the protocol design are open source. You can read what a node does — and where it stops protecting you.',
      ],
    },
  },
  limits: {
    eyebrow: 'What it does not do',
    title: 'The honest edges.',
    description: 'A privacy network is not magic, and a product that pretends otherwise has not earned your trust.',
    items: [
      { title: 'It does not hide you from sites you log into', body: 'If you sign in somewhere, that site knows who you are. Hiding the route does not hide the account.' },
      { title: 'It is not strong anonymity', body: 'In VPN mode the node you use can see where your traffic is headed, as with any VPN. The two-hop route for messages raises the cost of following traffic, but it does not stop an observer who sees the whole network at once, and the network is still small.' },
      { title: 'It does not make anything legal that was not', body: 'You remain responsible for what you do, and for the law where you live.' },
    ],
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Straight answers.',
    items: [
      { q: 'Can AeroNyx see the sites I visit?', a: 'In VPN mode, the node you connect through can see where your traffic is going, as with any VPN, but not what is inside encrypted connections. The sites you visit see the node, not your IP address. The numbers published on this site are network totals; nothing per person is published. Messages are different: they are sealed on your device, and nodes see only a sealed envelope, its size and the next stop.' },
      { q: 'Who runs the nodes?', a: 'Anyone with a server can run one. The node software is open source (AGPL-3.0), so you can read exactly what a node does.' },
      { q: 'Is it slower than a normal connection?', a: 'A little. Your traffic detours through a node instead of going straight out, which adds some delay.' },
      { q: 'What do the public numbers mean?', a: 'They are totals for the whole network: bytes carried, packets forwarded, nodes online. They contain nothing about any one person.' },
    ],
  },
};

const ru = {
  seo: {
    title: 'AeroNyx Сеть приватности — ходите по сети, не оставляя следов',
    description: 'Зашифрованный туннель через узлы, которые может запустить кто угодно. Сайты видят узел, а не ваш IP-адрес. ПО узлов — с открытым кодом (AGPL-3.0).',
  },
  how: {
    eyebrow: 'Приватный маршрут',
    title: 'Для сообщений — два хопа, и никто не видит оба конца.',
    description: 'Включите приватный маршрут для сообщений — и они уходят с устройства запечатанными и делают две остановки, прежде чем дойти до адресата. Ни один узел не знает одновременно, кто отправил сообщение и кому оно адресовано. Пока этот маршрут включается по желанию, а сеть ещё мала.',
    steps: [
      { title: 'Устройство запечатывает', body: 'Прежде чем что-то уйдёт, оно закрывается ключами, которые существуют только на вашем устройстве.' },
      { title: 'Первый узел знает вас, но не получателя', body: 'Он видит запечатанный конверт с вашего соединения и следующую остановку. О том, кому он адресован, — ничего.' },
      { title: 'Второй узел знает получателя, но не вас', body: 'Он передаёт конверт дальше, не имея понятия, от кого он пришёл.' },
    ],
    note: 'Просмотр сайтов через VPN устроен иначе: это один зашифрованный туннель до одного узла, и, как в любом VPN, этот узел видит, куда идёт ваш трафик.',
    diagram: { you: 'Вы', node: 'Узел', them: 'Получатель', sealed: 'запечатано', carried: 'передано', opened: 'доставлено' },
  },
  vs: {
    eyebrow: 'Не просто VPN',
    title: 'VPN — это обещание. Здесь есть ещё и устройство, которое можно прочитать.',
    description: 'В VPN всё, что вы делаете, проходит через серверы одной компании, а ваша приватность равна тому, что сегодня написано у неё в правилах. AeroNyx открывает ПО узлов и дизайн протокола, чтобы проверять можно было не только правила.',
    them: {
      title: 'Обычный VPN',
      points: [
        'Все серверы на пути трафика принадлежат одной компании.',
        'Она видит каждый сайт, который вы открываете, — записывает она это или нет.',
        'Вы доверяете обещанию, а обещания меняют владельцев.',
      ],
    },
    us: {
      title: 'AeroNyx Сеть приватности',
      points: [
        'Узел может запустить кто угодно, поэтому путь не обязан принадлежать одной компании.',
        'Сообщения запечатываются на вашем устройстве, поэтому узлы передают их, не имея возможности прочитать.',
        'ПО узлов и дизайн протокола открыты. Можно прочитать, что делает узел, — и где он перестаёт вас защищать.',
      ],
    },
  },
  limits: {
    eyebrow: 'Чего она не делает',
    title: 'Честные границы.',
    description: 'Сеть приватности — не волшебство, и продукт, который делает вид, что это не так, доверия не заслуживает.',
    items: [
      { title: 'Не прячет вас от сайтов, куда вы входите', body: 'Если вы где-то авторизовались, этот сайт знает, кто вы. Скрытый маршрут не скрывает аккаунт.' },
      { title: 'Это не сильная анонимность', body: 'В режиме VPN узел, через который вы выходите, видит, куда идёт трафик, как и в любом VPN. Маршрут в два хопа для сообщений делает слежку дороже, но не останавливает наблюдателя, который видит всю сеть сразу, а сеть пока невелика.' },
      { title: 'Не делает законным то, что им не было', body: 'Вы по-прежнему отвечаете за свои действия и за закон там, где живёте.' },
    ],
  },
  faq: {
    eyebrow: 'Вопросы',
    title: 'Прямые ответы.',
    items: [
      { q: 'Видит ли AeroNyx, какие сайты я открываю?', a: 'В режиме VPN узел, через который вы подключены, видит, куда идёт трафик, как и в любом VPN, но не содержимое зашифрованных соединений. Сайты видят узел, а не ваш IP-адрес. Цифры на этом сайте — итоги по всей сети; ничего о конкретных людях не публикуется. С сообщениями иначе: они запечатываются на вашем устройстве, а узлы видят лишь запечатанный конверт, его размер и следующую остановку.' },
      { q: 'Кто держит узлы?', a: 'Узел может запустить любой, у кого есть сервер. ПО узлов открыто (AGPL-3.0), так что можно прочитать, что именно делает узел.' },
      { q: 'Это медленнее обычного соединения?', a: 'Немного. Трафик идёт через узел, а не напрямую, и это добавляет задержку.' },
      { q: 'Что означают публичные цифры?', a: 'Это итоги по всей сети: переданные байты, пересланные пакеты, узлы онлайн. Ничего о конкретных людях в них нет.' },
    ],
  },
};

const zhHant = {
  seo: {
    title: 'AeroNyx 隱私網路 — 上網，不留下足跡',
    description: '一條經過任何人都能運行之節點的加密通道。網站看到的是節點，而不是你的 IP 位址。節點軟體以 AGPL-3.0 開源。',
  },
  how: {
    eyebrow: '私密路線',
    title: '訊息走兩跳，沒有人同時看到兩端。',
    description: '開啟訊息的私密路線後，訊息離開你的裝置時已經密封，要經過兩站才送達。沒有任何一個節點會同時知道是誰寄的、寄給誰。這條路線目前需要自行開啟，網路也還很小。',
    steps: [
      { title: '你的裝置把它密封', body: '在任何東西離開之前，就用只存在於你裝置上的金鑰鎖起來。' },
      { title: '第一個節點認得你，但不知道收件人', body: '它看到一個從你的連線來的密封信封，以及下一站在哪。關於收件人，它一無所知。' },
      { title: '第二個節點知道收件人，但不認識你', body: '它把信封送到該去的地方，完全不知道這是誰寄的。' },
    ],
    note: '透過 VPN 瀏覽網頁的方式不同：那是通往單一節點的一條加密通道，和任何 VPN 一樣，該節點看得到你的流量要去哪。',
    diagram: { you: '你', node: '節點', them: '收件人', sealed: '密封', carried: '傳遞', opened: '送達' },
  },
  vs: {
    eyebrow: '不只是 VPN',
    title: 'VPN 是一個承諾。這裡還有一份你能讀的設計。',
    description: '用 VPN 時，你做的每件事都經過同一家公司擁有的伺服器，而你的隱私就等於他們今天的政策怎麼寫。AeroNyx 公開節點軟體與協議設計，讓你能檢查的不只是政策。',
    them: {
      title: '傳統 VPN',
      points: [
        '流量經過的每一台伺服器，都屬於同一家公司。',
        '不管有沒有寫下來，它看得到你造訪的每一個網站。',
        '你信任的是一個承諾——而承諾是會易主的。',
      ],
    },
    us: {
      title: 'AeroNyx 隱私網路',
      points: [
        '任何人都能運行節點，所以這條路徑不必由某一家公司獨佔。',
        '訊息在你的裝置上就已密封，節點只能傳遞，讀不到內容。',
        '節點軟體與協議設計都是開源的。你可以讀到節點做了什麼——也讀到它在哪裡就不再保護你。',
      ],
    },
  },
  limits: {
    eyebrow: '它做不到什麼',
    title: '誠實的邊界。',
    description: '隱私網路不是魔法。一個假裝自己是魔法的產品，不值得你的信任。',
    items: [
      { title: '它不會讓你對登入的網站匿名', body: '你在哪裡登入，那個網站就知道你是誰。藏起路線，藏不住帳號。' },
      { title: '它不是強匿名', body: '用 VPN 模式時，你所連的節點看得到你的流量要去哪，和任何 VPN 一樣。訊息的兩跳路線大幅提高了追蹤流量的代價，但擋不住能同時看到整個網路的觀察者，而且網路目前還很小。' },
      { title: '它不會讓原本不合法的事變合法', body: '你依然要為自己的行為，以及你所在地的法律負責。' },
    ],
  },
  faq: {
    eyebrow: '常見問題',
    title: '直接的回答。',
    items: [
      { q: 'AeroNyx 看得到我造訪哪些網站嗎？', a: '用 VPN 模式時，你連線的節點看得到流量要去哪，和任何 VPN 一樣，但看不到加密連線裡的內容。你造訪的網站看到的是節點，而不是你的 IP 位址。本網站公布的是整個網路的總數，不公布任何個人的資料。訊息則不同：訊息在你的裝置上就已密封，節點只看到密封的信封、它的大小與下一站。' },
      { q: '節點是誰在運行？', a: '任何有伺服器的人都能運行。節點軟體以 AGPL-3.0 開源，所以你可以讀到節點究竟做了什麼。' },
      { q: '會比一般連線慢嗎？', a: '會慢一點。流量要繞經一個節點，而不是直接出去，這會增加一些延遲。' },
      { q: '那些公開數字代表什麼？', a: '整個網路的總數：承載的位元組、轉發的封包、在線的節點。裡面不包含任何個人的資料。' },
    ],
  },
};

const zhHans = {
  seo: {
    title: 'AeroNyx 隐私网络 — 上网，不留下足迹',
    description: '一条经过任何人都能运行之节点的加密通道。网站看到的是节点，而不是你的 IP 地址。节点软件以 AGPL-3.0 开源。',
  },
  how: {
    eyebrow: '私密路线',
    title: '消息走两跳，没有人同时看到两端。',
    description: '开启消息的私密路线后，消息离开你的设备时已经密封，要经过两站才送达。没有任何一个节点会同时知道是谁发的、发给谁。这条路线目前需要自行开启，网络也还很小。',
    steps: [
      { title: '你的设备把它密封', body: '在任何东西离开之前，就用只存在于你设备上的密钥锁起来。' },
      { title: '第一个节点认得你，但不知道收件人', body: '它看到一个从你的连接来的密封信封，以及下一站在哪。关于收件人，它一无所知。' },
      { title: '第二个节点知道收件人，但不认识你', body: '它把信封送到该去的地方，完全不知道这是谁发的。' },
    ],
    note: '通过 VPN 浏览网页的方式不同：那是通往单一节点的一条加密通道，和任何 VPN 一样，该节点看得到你的流量要去哪。',
    diagram: { you: '你', node: '节点', them: '收件人', sealed: '密封', carried: '传递', opened: '送达' },
  },
  vs: {
    eyebrow: '不只是 VPN',
    title: 'VPN 是一个承诺。这里还有一份你能读的设计。',
    description: '用 VPN 时，你做的每件事都经过同一家公司拥有的服务器，而你的隐私就等于他们今天的政策怎么写。AeroNyx 公开节点软件与协议设计，让你能检查的不只是政策。',
    them: {
      title: '传统 VPN',
      points: [
        '流量经过的每一台服务器，都属于同一家公司。',
        '不管有没有写下来，它看得到你访问的每一个网站。',
        '你信任的是一个承诺——而承诺是会易主的。',
      ],
    },
    us: {
      title: 'AeroNyx 隐私网络',
      points: [
        '任何人都能运行节点，所以这条路径不必由某一家公司独占。',
        '消息在你的设备上就已密封，节点只能传递，读不到内容。',
        '节点软件与协议设计都是开源的。你可以读到节点做了什么——也读到它在哪里就不再保护你。',
      ],
    },
  },
  limits: {
    eyebrow: '它做不到什么',
    title: '诚实的边界。',
    description: '隐私网络不是魔法。一个假装自己是魔法的产品，不值得你的信任。',
    items: [
      { title: '它不会让你对登录的网站匿名', body: '你在哪里登录，那个网站就知道你是谁。藏起路线，藏不住账号。' },
      { title: '它不是强匿名', body: '用 VPN 模式时，你所连的节点看得到你的流量要去哪，和任何 VPN 一样。消息的两跳路线大幅提高了追踪流量的代价，但挡不住能同时看到整个网络的观察者，而且网络目前还很小。' },
      { title: '它不会让原本不合法的事变合法', body: '你依然要为自己的行为，以及你所在地的法律负责。' },
    ],
  },
  faq: {
    eyebrow: '常见问题',
    title: '直接的回答。',
    items: [
      { q: 'AeroNyx 看得到我访问哪些网站吗？', a: '用 VPN 模式时，你连接的节点看得到流量要去哪，和任何 VPN 一样，但看不到加密连接里的内容。你访问的网站看到的是节点，而不是你的 IP 地址。本网站公布的是整个网络的总数，不公布任何个人的信息。消息则不同：消息在你的设备上就已密封，节点只看到密封的信封、它的大小与下一站。' },
      { q: '节点是谁在运行？', a: '任何有服务器的人都能运行。节点软件以 AGPL-3.0 开源，所以你可以读到节点究竟做了什么。' },
      { q: '会比一般连接慢吗？', a: '会慢一点。流量要绕经一个节点，而不是直接出去，这会增加一些延迟。' },
      { q: '那些公开数字代表什么？', a: '整个网络的总数：承载的字节、转发的数据包、在线的节点。里面不包含任何个人的数据。' },
    ],
  },
};

const ja = {
  seo: {
    title: 'AeroNyx プライバシーネットワーク — 足あとを残さずに',
    description: '誰でも運用できるノードを通る暗号化トンネル。サイトに見えるのはノードで、あなたの IP アドレスではありません。ノードのソフトウェアは AGPL-3.0 のオープンソース。',
  },
  how: {
    eyebrow: 'プライベート経路',
    title: 'メッセージは 2 ホップ。両端を見る人は、どこにもいない。',
    description: 'メッセージのプライベート経路をオンにすると、メッセージは封印された状態で端末を離れ、届くまでに 2 か所を経由します。誰が送り、誰宛てなのか——その両方を知るノードはひとつもありません。この経路は現時点では自分でオンにする設定で、ネットワークもまだ小さいものです。',
    steps: [
      { title: '端末が封印する', body: '何かが外に出る前に、あなたの端末にしか存在しない鍵でロックされます。' },
      { title: '1 つ目のノードは、あなたを知り受取人を知らない', body: 'あなたの接続から届いた封印済みの封筒と、次の渡し先だけが見えます。誰宛てなのかについては何も。' },
      { title: '2 つ目のノードは、受取人を知りあなたを知らない', body: '封筒を行き先へ渡すだけで、誰から来たのかは分かりません。' },
    ],
    note: 'VPN でのブラウジングは仕組みが異なります。1 つのノードへの暗号化トンネルで、他の VPN と同じく、そのノードは通信の行き先を見ることができます。',
    diagram: { you: 'あなた', node: 'ノード', them: '受取人', sealed: '封印', carried: '運搬', opened: '到達' },
  },
  vs: {
    eyebrow: 'ただの VPN ではありません',
    title: 'VPN は約束。こちらは、読める設計でもある。',
    description: 'VPN では、あなたのすることすべてが一社の所有するサーバーを通ります。プライバシーは、その会社の規約が今日どう書かれているか次第です。AeroNyx はノードのソフトウェアとプロトコル設計を公開するので、規約以外も確かめられます。',
    them: {
      title: '従来の VPN',
      points: [
        '通信が通るサーバーはすべて一社のものです。',
        '記録するかどうかに関わらず、訪問したサイトはすべて見えています。',
        '信じているのは約束であり、約束は持ち主が変わります。',
      ],
    },
    us: {
      title: 'AeroNyx プライバシーネットワーク',
      points: [
        '誰でもノードを運用できるので、経路を一社が握る必要はありません。',
        'メッセージは端末で封印されるため、ノードは中身を読めないまま運びます。',
        'ノードのソフトウェアとプロトコル設計はオープンソース。ノードが何をするか——そして、どこから先は守れないか——を読めます。',
      ],
    },
  },
  limits: {
    eyebrow: 'できないこと',
    title: '正直な限界。',
    description: 'プライバシーネットワークは魔法ではありません。魔法のふりをする製品は、信頼に値しません。',
    items: [
      { title: 'ログインしたサイトからは隠せません', body: 'どこかにサインインすれば、そのサイトはあなたが誰か分かります。経路を隠してもアカウントは隠せません。' },
      { title: '強い匿名性ではありません', body: 'VPN モードでは、接続先のノードが通信の行き先を見られます。他の VPN と同じです。メッセージの 2 ホップ経路は追跡のコストを大きく引き上げますが、ネットワーク全体を同時に見られる観察者までは止められず、ネットワークもまだ小さいものです。' },
      { title: '違法だったことが合法にはなりません', body: '自分の行いと、住んでいる場所の法律に対する責任は変わりません。' },
    ],
  },
  faq: {
    eyebrow: 'よくある質問',
    title: 'まっすぐな答え。',
    items: [
      { q: 'AeroNyx は私が見ているサイトを分かりますか？', a: 'VPN モードでは、接続したノードが通信の行き先を見られます。他の VPN と同じですが、暗号化された接続の中身は見えません。サイトに見えるのはノードで、あなたの IP アドレスではありません。このサイトで公開しているのはネットワーク全体の合計で、個人に関する情報は公開していません。メッセージは別です。端末で封印され、ノードに見えるのは封印された封筒、その大きさ、次の宛先だけです。' },
      { q: 'ノードは誰が運用しているのですか？', a: 'サーバーを持つ人なら誰でも運用できます。ノードのソフトウェアは AGPL-3.0 のオープンソースなので、ノードが何をするのか正確に読めます。' },
      { q: '普通の接続より遅くなりますか？', a: '少しだけ。直接出ていく代わりにノードを経由するので、その分の遅延が生まれます。' },
      { q: '公開されている数字は何を意味しますか？', a: 'ネットワーク全体の合計です。運んだバイト数、転送したパケット数、オンラインのノード数。個人に関する情報は含まれません。' },
    ],
  },
};

const ko = {
  seo: {
    title: 'AeroNyx 프라이버시 네트워크 — 흔적을 남기지 않고',
    description: '누구나 운영할 수 있는 노드를 거치는 암호화 터널. 사이트에는 당신의 IP 주소 대신 노드가 보입니다. 노드 소프트웨어는 AGPL-3.0 오픈소스입니다.',
  },
  how: {
    eyebrow: '프라이빗 경로',
    title: '메시지는 2홉, 그리고 양쪽 끝을 보는 사람은 없습니다.',
    description: '메시지용 프라이빗 경로를 켜면 메시지는 봉인된 채로 기기를 떠나 도착하기까지 두 곳을 거칩니다. 누가 보냈는지와 누구에게 가는지를 동시에 아는 노드는 하나도 없습니다. 이 경로는 현재 직접 켜야 하는 옵션이며, 네트워크도 아직 작습니다.',
    steps: [
      { title: '기기가 봉인합니다', body: '무엇이든 밖으로 나가기 전에, 당신의 기기에만 존재하는 키로 잠깁니다.' },
      { title: '첫 번째 노드는 당신을 알고 수신자를 모릅니다', body: '당신의 연결에서 온 봉인된 봉투와 다음 목적지만 봅니다. 누구에게 가는지에 대해서는 아무것도 모릅니다.' },
      { title: '두 번째 노드는 수신자를 알고 당신을 모릅니다', body: '봉투를 갈 곳으로 넘길 뿐, 누구에게서 왔는지는 알지 못합니다.' },
    ],
    note: 'VPN으로 웹을 이용하는 방식은 다릅니다. 하나의 노드로 이어지는 암호화 터널이며, 다른 VPN과 마찬가지로 그 노드는 트래픽이 어디로 가는지 볼 수 있습니다.',
    diagram: { you: '당신', node: '노드', them: '수신자', sealed: '봉인', carried: '전달', opened: '도착' },
  },
  vs: {
    eyebrow: 'VPN만이 아닙니다',
    title: 'VPN은 약속입니다. 이쪽은 읽을 수 있는 설계이기도 합니다.',
    description: 'VPN에서는 당신이 하는 모든 일이 한 회사가 소유한 서버를 지나갑니다. 프라이버시는 그 회사의 정책이 오늘 어떻게 쓰여 있는지에 달려 있습니다. AeroNyx는 노드 소프트웨어와 프로토콜 설계를 공개하므로, 정책 말고도 확인할 수 있습니다.',
    them: {
      title: '전통적인 VPN',
      points: [
        '트래픽이 지나는 모든 서버가 한 회사 소유입니다.',
        '기록하든 하지 않든, 당신이 방문한 모든 사이트를 볼 수 있습니다.',
        '당신이 믿는 것은 약속이고, 약속은 주인이 바뀝니다.',
      ],
    },
    us: {
      title: 'AeroNyx 프라이버시 네트워크',
      points: [
        '누구나 노드를 운영할 수 있어, 경로를 한 회사가 소유할 필요가 없습니다.',
        '메시지는 기기에서 봉인되므로 노드는 읽지 못한 채 전달만 합니다.',
        '노드 소프트웨어와 프로토콜 설계는 오픈소스입니다. 노드가 무엇을 하는지, 그리고 어디까지만 보호하는지 읽어볼 수 있습니다.',
      ],
    },
  },
  limits: {
    eyebrow: '할 수 없는 것',
    title: '정직한 경계.',
    description: '프라이버시 네트워크는 마법이 아닙니다. 마법인 척하는 제품은 신뢰받을 자격이 없습니다.',
    items: [
      { title: '로그인한 사이트로부터 숨겨주지는 않습니다', body: '어딘가에 로그인하면 그 사이트는 당신이 누구인지 압니다. 경로를 숨겨도 계정은 숨겨지지 않습니다.' },
      { title: '강력한 익명성은 아닙니다', body: 'VPN 모드에서는 연결한 노드가 트래픽이 어디로 가는지 볼 수 있습니다. 다른 VPN과 같습니다. 메시지의 2홉 경로는 추적 비용을 크게 올리지만, 네트워크 전체를 동시에 보는 관찰자까지 막지는 못하며 네트워크도 아직 작습니다.' },
      { title: '불법이던 일을 합법으로 만들지 않습니다', body: '당신의 행동과 사는 곳의 법에 대한 책임은 그대로입니다.' },
    ],
  },
  faq: {
    eyebrow: '자주 묻는 질문',
    title: '솔직한 답변.',
    items: [
      { q: 'AeroNyx는 제가 방문하는 사이트를 볼 수 있나요?', a: 'VPN 모드에서는 연결한 노드가 트래픽의 목적지를 볼 수 있습니다. 다른 VPN과 같지만 암호화된 연결의 내용은 볼 수 없습니다. 사이트에는 당신의 IP 주소 대신 노드가 보입니다. 이 사이트에 공개된 숫자는 네트워크 전체 합계이며, 개인에 관한 정보는 공개하지 않습니다. 메시지는 다릅니다. 기기에서 봉인되고, 노드는 봉인된 봉투와 그 크기, 다음 목적지만 봅니다.' },
      { q: '노드는 누가 운영하나요?', a: '서버가 있는 사람이라면 누구나 운영할 수 있습니다. 노드 소프트웨어는 AGPL-3.0 오픈소스이므로 노드가 정확히 무엇을 하는지 읽어볼 수 있습니다.' },
      { q: '일반 연결보다 느린가요?', a: '조금 느립니다. 곧바로 나가는 대신 노드를 거치므로 지연이 생깁니다.' },
      { q: '공개된 숫자는 무엇을 뜻하나요?', a: '네트워크 전체의 합계입니다. 전달한 바이트, 전달한 패킷, 온라인 노드 수. 개인에 관한 정보는 들어 있지 않습니다.' },
    ],
  },
};

const es = {
  seo: {
    title: 'AeroNyx Privacy Network — navega sin que te sigan',
    description: 'Un túnel cifrado por nodos que cualquiera puede operar. Los sitios ven el nodo, no tu dirección IP. El software del nodo es de código abierto (AGPL-3.0).',
  },
  how: {
    eyebrow: 'La ruta privada',
    title: 'Para los mensajes, dos saltos, y nadie ve los dos extremos.',
    description: 'Si activas la ruta privada para mensajes, salen sellados de tu dispositivo y hacen dos paradas antes de llegar. Ningún nodo sabe a la vez quién envió un mensaje y para quién es. Hoy esta ruta es opcional y la red todavía es pequeña.',
    steps: [
      { title: 'Tu dispositivo lo sella', body: 'Antes de que salga nada, se cierra con claves que solo existen en tu dispositivo.' },
      { title: 'El primer nodo te conoce a ti, no al destinatario', body: 'Ve un sobre sellado que llega de tu conexión y a quién pasárselo. Nada sobre para quién es.' },
      { title: 'El segundo nodo conoce al destinatario, no a ti', body: 'Entrega el sobre donde va, sin idea de quién lo envió.' },
    ],
    note: 'Navegar con la VPN funciona distinto: es un único túnel cifrado hacia un nodo, y ese nodo puede ver adónde va tu tráfico, como en cualquier VPN.',
    diagram: { you: 'Tú', node: 'Nodo', them: 'Destinatario', sealed: 'sellado', carried: 'llevado', opened: 'entregado' },
  },
  vs: {
    eyebrow: 'No es solo una VPN',
    title: 'Una VPN es una promesa. Esto además es un diseño que puedes leer.',
    description: 'Con una VPN, todo lo que haces cruza servidores que una sola empresa posee, y tu privacidad es lo que su política diga hoy. AeroNyx abre el software de los nodos y el diseño del protocolo, para que puedas comprobar más que la política.',
    them: {
      title: 'Una VPN tradicional',
      points: [
        'Una sola empresa posee cada servidor que cruza tu tráfico.',
        'Puede ver cada sitio que visitas, lo anote o no.',
        'Confías en una promesa, y las promesas cambian de dueño.',
      ],
    },
    us: {
      title: 'AeroNyx Privacy Network',
      points: [
        'Cualquiera puede operar un nodo, así que ninguna empresa tiene por qué ser dueña del camino.',
        'Los mensajes se sellan en tu dispositivo, así que los nodos los llevan sin poder leerlos.',
        'El software de los nodos y el diseño del protocolo son de código abierto. Puedes leer qué hace un nodo, y dónde deja de protegerte.',
      ],
    },
  },
  limits: {
    eyebrow: 'Lo que no hace',
    title: 'Los límites, dichos en voz alta.',
    description: 'Una red de privacidad no es magia, y un producto que finge lo contrario no se ha ganado tu confianza.',
    items: [
      { title: 'No te oculta de los sitios donde inicias sesión', body: 'Si entras con tu cuenta, ese sitio sabe quién eres. Ocultar la ruta no oculta la cuenta.' },
      { title: 'No es anonimato fuerte', body: 'En modo VPN, el nodo que usas puede ver adónde va tu tráfico, como en cualquier VPN. La ruta de dos saltos para mensajes encarece mucho seguir el tráfico, pero no frena a un observador que vea toda la red a la vez, y la red aún es pequeña.' },
      { title: 'No vuelve legal lo que no lo era', body: 'Sigues siendo responsable de lo que haces y de la ley donde vives.' },
    ],
  },
  faq: {
    eyebrow: 'Preguntas',
    title: 'Respuestas directas.',
    items: [
      { q: '¿Puede AeroNyx ver los sitios que visito?', a: 'En modo VPN, el nodo por el que te conectas puede ver adónde va tu tráfico, como en cualquier VPN, pero no lo que hay dentro de las conexiones cifradas. Los sitios ven el nodo, no tu dirección IP. Las cifras publicadas en este sitio son totales de la red; no se publica nada por persona. Con los mensajes es distinto: se sellan en tu dispositivo y los nodos solo ven un sobre sellado, su tamaño y la siguiente parada.' },
      { q: '¿Quién opera los nodos?', a: 'Cualquiera con un servidor puede operar uno. El software del nodo es de código abierto (AGPL-3.0), así que puedes leer exactamente qué hace un nodo.' },
      { q: '¿Es más lenta que una conexión normal?', a: 'Un poco. Tu tráfico da un rodeo por un nodo en vez de salir directo, lo que añade algo de latencia.' },
      { q: '¿Qué significan las cifras públicas?', a: 'Son totales de toda la red: bytes llevados, paquetes reenviados, nodos en línea. No contienen nada sobre ninguna persona.' },
    ],
  },
};

const locales = { en, ru, 'zh-Hant': zhHant, 'zh-Hans': zhHans, ja, ko, es };

export function getPrivacyNetworkCopy(locale) {
  return mergeLocaleCopy(en, locales[locale] || null);
}

export default getPrivacyNetworkCopy;
