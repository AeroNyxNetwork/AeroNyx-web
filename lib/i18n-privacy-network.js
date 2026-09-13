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
    description:
      'A private route through independent nodes. They carry your traffic without being able to see the sites you visit, and neither can we. Open source.',
  },
  how: {
    eyebrow: 'How it works',
    title: 'Two hops, and nobody sees both ends.',
    description:
      'Your traffic leaves your device sealed and makes two stops before it reaches the site. No single node ever knows both who you are and where you are going.',
    steps: [
      { title: 'Your device seals it', body: 'Before anything leaves, it is locked with keys that exist only on your device.' },
      { title: 'The first node knows you, not the site', body: 'It sees a sealed envelope arriving from your connection, and where to hand it next. Nothing about the destination.' },
      { title: 'The second node knows the site, not you', body: 'It passes the traffic on to where it is going, with no idea who it came from.' },
    ],
    note: 'That split is the whole point. Linking the two ends would take both nodes working together, and they are run by different people in different places.',
    diagram: { you: 'You', node: 'Node', them: 'Site', sealed: 'sealed', carried: 'carried', opened: 'delivered' },
  },
  vs: {
    eyebrow: 'Not a VPN',
    title: 'A VPN asks you to trust one company. This one cannot ask.',
    description:
      'With a VPN, everything you do crosses servers a single company owns, and your privacy is whatever their policy happens to say today.',
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
        'Independent people run the nodes. Nobody owns the path.',
        'No single node sees both who you are and where you go.',
        'You are trusting the design, and anyone can read it.',
      ],
    },
  },
  limits: {
    eyebrow: 'What it does not do',
    title: 'The honest edges.',
    description: 'A privacy network is not magic, and a product that pretends otherwise has not earned your trust.',
    items: [
      { title: 'It does not hide you from sites you log into', body: 'If you sign in somewhere, that site knows who you are. Hiding the route does not hide the account.' },
      { title: 'It does not defeat someone watching the whole internet', body: 'Two hops raise the cost of following traffic enormously. They do not make it impossible for an observer who can see everything at once.' },
      { title: 'It does not make anything legal that was not', body: 'You remain responsible for what you do, and for the law where you live.' },
    ],
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Straight answers.',
    items: [
      {
        q: 'Can AeroNyx see the sites I visit?',
        a: 'No. Traffic is sealed on your device, and the nodes carrying it only know the next stop. We do not run a server that sees your browsing, and there is no log to hand over, because there is nothing to log.',
      },
      {
        q: 'Who runs the nodes?',
        a: 'Independent people, anywhere in the world. Anyone with a server can run one, the software is open source, and no single operator ever sees enough to identify anyone.',
      },
      {
        q: 'Is it slower than a normal connection?',
        a: 'A little. Traffic takes two hops instead of going straight out, which adds some delay. In exchange, no single point along the way can build a picture of you.',
      },
      {
        q: 'What do the public numbers mean?',
        a: 'They are totals for the whole network: bytes carried, packets forwarded, nodes online. There is nothing per-person in them, because nothing per-person is collected.',
      },
    ],
  },
};

const ru = {
  seo: {
    title: 'AeroNyx Сеть приватности — ходите по сети, не оставляя следов',
    description:
      'Приватный маршрут через независимые узлы. Они несут ваш трафик, не видя, какие сайты вы открываете. Мы тоже не видим. Открытый код.',
  },
  how: {
    eyebrow: 'Как это работает',
    title: 'Два хопа, и никто не видит оба конца.',
    description:
      'Трафик уходит с вашего устройства запечатанным и делает две остановки, прежде чем дойти до сайта. Ни один узел не знает одновременно, кто вы и куда идёте.',
    steps: [
      { title: 'Устройство запечатывает', body: 'Прежде чем что-то уйдёт, оно закрывается ключами, которые существуют только на вашем устройстве.' },
      { title: 'Первый узел знает вас, но не сайт', body: 'Он видит запечатанный конверт с вашего соединения и следующую остановку. О адресате — ничего.' },
      { title: 'Второй узел знает сайт, но не вас', body: 'Он передаёт трафик туда, куда тот идёт, не имея понятия, от кого он пришёл.' },
    ],
    note: 'В этом разделении весь смысл: чтобы связать оба конца, узлам пришлось бы действовать заодно, а держат их разные люди в разных местах.',
    diagram: { you: 'Вы', node: 'Узел', them: 'Сайт', sealed: 'запечатано', carried: 'передано', opened: 'доставлено' },
  },
  vs: {
    eyebrow: 'Это не VPN',
    title: 'VPN просит доверять одной компании. Здесь просить не о чем.',
    description: 'В VPN всё, что вы делаете, проходит через серверы одной компании, а ваша приватность равна тому, что сегодня написано у неё в правилах.',
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
        'Узлы держат независимые люди. Путь не принадлежит никому.',
        'Ни один узел не видит одновременно, кто вы и куда идёте.',
        'Вы доверяете конструкции, и её может прочитать любой.',
      ],
    },
  },
  limits: {
    eyebrow: 'Чего она не делает',
    title: 'Честные границы.',
    description: 'Сеть приватности — не волшебство, и продукт, который делает вид, что это не так, доверия не заслуживает.',
    items: [
      { title: 'Не прячет вас от сайтов, куда вы входите', body: 'Если вы где-то авторизовались, этот сайт знает, кто вы. Скрытый маршрут не скрывает аккаунт.' },
      { title: 'Не спасает от наблюдателя за всем интернетом', body: 'Два хопа делают слежку за трафиком несоизмеримо дороже. Но не делают её невозможной для того, кто видит всё сразу.' },
      { title: 'Не делает законным то, что им не было', body: 'Вы по-прежнему отвечаете за свои действия и за закон там, где живёте.' },
    ],
  },
  faq: {
    eyebrow: 'Вопросы',
    title: 'Прямые ответы.',
    items: [
      { q: 'Видит ли AeroNyx, какие сайты я открываю?', a: 'Нет. Трафик запечатывается на вашем устройстве, а узлы знают только следующую остановку. У нас нет сервера, который видел бы ваш браузинг, и нет журнала, который можно было бы выдать, — потому что записывать нечего.' },
      { q: 'Кто держит узлы?', a: 'Независимые люди по всему миру. Узел может запустить любой, у кого есть сервер; код открыт, и ни один оператор не видит достаточно, чтобы кого-то опознать.' },
      { q: 'Это медленнее обычного соединения?', a: 'Немного. Трафик идёт двумя хопами вместо прямого выхода, и это добавляет задержку. Взамен ни одна точка на пути не может составить ваш портрет.' },
      { q: 'Что означают публичные цифры?', a: 'Это итоги по всей сети: переданные байты, пересланные пакеты, узлы онлайн. Ничего персонального в них нет, потому что персональное не собирается.' },
    ],
  },
};

const zhHant = {
  seo: {
    title: 'AeroNyx 隱私網路 — 上網，不留下足跡',
    description: '一條經過獨立節點的私密路線。它們承載你的流量，卻看不到你開了哪些網站——我們也看不到。開源。',
  },
  how: {
    eyebrow: '它是怎麼做到的',
    title: '走兩跳，沒有人同時看到兩端。',
    description: '流量離開你的裝置時已經密封，要經過兩站才抵達網站。沒有任何一個節點會同時知道你是誰、以及你要去哪。',
    steps: [
      { title: '你的裝置把它密封', body: '在任何東西離開之前，就用只存在於你裝置上的金鑰鎖起來。' },
      { title: '第一個節點認得你，但不知道網站', body: '它看到一個從你的連線來的密封信封，以及下一站在哪。關於目的地，它一無所知。' },
      { title: '第二個節點知道網站，但不認識你', body: '它把流量送到該去的地方，完全不知道這是誰寄的。' },
    ],
    note: '這個切分就是重點所在：要把兩端連起來，得兩個節點聯手才行——而它們由不同地方的不同人運行。',
    diagram: { you: '你', node: '節點', them: '網站', sealed: '密封', carried: '傳遞', opened: '送達' },
  },
  vs: {
    eyebrow: '這不是 VPN',
    title: 'VPN 要你信任一家公司。這個沒有資格要你信任。',
    description: '用 VPN 時，你做的每件事都經過同一家公司擁有的伺服器，而你的隱私就等於他們今天的政策怎麼寫。',
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
        '節點由獨立的人運行，這條路徑不屬於任何人。',
        '沒有任何單一節點同時看到你是誰、你去哪裡。',
        '你信任的是這個設計，而任何人都能讀它。',
      ],
    },
  },
  limits: {
    eyebrow: '它做不到什麼',
    title: '誠實的邊界。',
    description: '隱私網路不是魔法。一個假裝自己是魔法的產品，不值得你的信任。',
    items: [
      { title: '它不會讓你對登入的網站匿名', body: '你在哪裡登入，那個網站就知道你是誰。藏起路線，藏不住帳號。' },
      { title: '它擋不住能看到整個網際網路的人', body: '兩跳讓追蹤流量的代價高出非常多，但對一個能同時看到所有東西的觀察者，它做不到「不可能」。' },
      { title: '它不會讓原本不合法的事變合法', body: '你依然要為自己的行為，以及你所在地的法律負責。' },
    ],
  },
  faq: {
    eyebrow: '常見問題',
    title: '直接的回答。',
    items: [
      { q: 'AeroNyx 看得到我造訪哪些網站嗎？', a: '看不到。流量在你的裝置上就已密封，承載它的節點只知道下一站。我們沒有任何一台伺服器看得到你的瀏覽行為，也沒有日誌可以交出去——因為根本沒有東西可記。' },
      { q: '節點是誰在運行？', a: '世界各地獨立的人。任何人有一台伺服器就能運行，軟體是開源的，而且沒有任何一個運營者能看到足以辨識任何人的資訊。' },
      { q: '會比一般連線慢嗎？', a: '會慢一點。流量走兩跳而不是直接出去，這會增加一些延遲。換來的是：路上沒有任何一個點能拼湊出你的樣子。' },
      { q: '那些公開數字代表什麼？', a: '整個網路的總數：承載的位元組、轉發的封包、在線的節點。裡面沒有任何跟個人有關的東西，因為那些根本沒有被收集。' },
    ],
  },
};

const zhHans = {
  seo: {
    title: 'AeroNyx 隐私网络 — 上网，不留下足迹',
    description: '一条经过独立节点的私密路线。它们承载你的流量，却看不到你开了哪些网站——我们也看不到。开源。',
  },
  how: {
    eyebrow: '它是怎么做到的',
    title: '走两跳，没有人同时看到两端。',
    description: '流量离开你的设备时已经密封，要经过两站才抵达网站。没有任何一个节点会同时知道你是谁、以及你要去哪。',
    steps: [
      { title: '你的设备把它密封', body: '在任何东西离开之前，就用只存在于你设备上的密钥锁起来。' },
      { title: '第一个节点认得你，但不知道网站', body: '它看到一个从你的连接来的密封信封，以及下一站在哪。关于目的地，它一无所知。' },
      { title: '第二个节点知道网站，但不认识你', body: '它把流量送到该去的地方，完全不知道这是谁寄的。' },
    ],
    note: '这个切分就是重点所在：要把两端连起来，得两个节点联手才行——而它们由不同地方的不同人运行。',
    diagram: { you: '你', node: '节点', them: '网站', sealed: '密封', carried: '传递', opened: '送达' },
  },
  vs: {
    eyebrow: '这不是 VPN',
    title: 'VPN 要你信任一家公司。这个没有资格要你信任。',
    description: '用 VPN 时，你做的每件事都经过同一家公司拥有的服务器，而你的隐私就等于他们今天的政策怎么写。',
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
        '节点由独立的人运行，这条路径不属于任何人。',
        '没有任何单一节点同时看到你是谁、你去哪里。',
        '你信任的是这个设计，而任何人都能读它。',
      ],
    },
  },
  limits: {
    eyebrow: '它做不到什么',
    title: '诚实的边界。',
    description: '隐私网络不是魔法。一个假装自己是魔法的产品，不值得你的信任。',
    items: [
      { title: '它不会让你对登录的网站匿名', body: '你在哪里登录，那个网站就知道你是谁。藏起路线，藏不住账号。' },
      { title: '它挡不住能看到整个互联网的人', body: '两跳让追踪流量的代价高出非常多，但对一个能同时看到所有东西的观察者，它做不到「不可能」。' },
      { title: '它不会让原本不合法的事变合法', body: '你依然要为自己的行为，以及你所在地的法律负责。' },
    ],
  },
  faq: {
    eyebrow: '常见问题',
    title: '直接的回答。',
    items: [
      { q: 'AeroNyx 看得到我访问哪些网站吗？', a: '看不到。流量在你的设备上就已密封，承载它的节点只知道下一站。我们没有任何一台服务器看得到你的浏览行为，也没有日志可以交出去——因为根本没有东西可记。' },
      { q: '节点是谁在运行？', a: '世界各地独立的人。任何人有一台服务器就能运行，软件是开源的，而且没有任何一个运营者能看到足以辨识任何人的信息。' },
      { q: '会比一般连接慢吗？', a: '会慢一点。流量走两跳而不是直接出去，这会增加一些延迟。换来的是：路上没有任何一个点能拼凑出你的样子。' },
      { q: '那些公开数字代表什么？', a: '整个网络的总数：承载的字节、转发的数据包、在线的节点。里面没有任何跟个人有关的东西，因为那些根本没有被收集。' },
    ],
  },
};

const ja = {
  seo: {
    title: 'AeroNyx プライバシーネットワーク — 足あとを残さずに',
    description: '独立したノードを通るプライベートな経路。あなたの通信を運びながら、どのサイトを見ているかは分かりません。私たちにも分かりません。オープンソース。',
  },
  how: {
    eyebrow: '仕組み',
    title: '2 ホップ。両端を見る人は、どこにもいない。',
    description: '通信は封印された状態で端末を離れ、サイトに届くまでに 2 か所を経由します。あなたが誰で、どこへ向かっているのか——その両方を知るノードはひとつもありません。',
    steps: [
      { title: '端末が封印する', body: '何かが外に出る前に、あなたの端末にしか存在しない鍵でロックされます。' },
      { title: '1 つ目のノードは、あなたを知りサイトを知らない', body: 'あなたの接続から届いた封印済みの封筒と、次の渡し先だけが見えます。宛先については何も。' },
      { title: '2 つ目のノードは、サイトを知りあなたを知らない', body: '通信を行き先へ渡すだけで、誰から来たのかは分かりません。' },
    ],
    note: 'この分割こそが要点です。両端を結ぶには 2 つのノードが手を組む必要があり、それぞれ別の場所の別の人が運用しています。',
    diagram: { you: 'あなた', node: 'ノード', them: 'サイト', sealed: '封印', carried: '運搬', opened: '到達' },
  },
  vs: {
    eyebrow: 'VPN ではありません',
    title: 'VPN は一社を信じろと言う。こちらは、そう言う立場にない。',
    description: 'VPN では、あなたのすることすべてが一社の所有するサーバーを通ります。プライバシーは、その会社の規約が今日どう書かれているか次第です。',
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
        'ノードを運用するのは独立した人たち。経路は誰のものでもありません。',
        'あなたが誰かと、どこへ行くかの両方を見るノードはありません。',
        '信じるのは設計であり、それは誰でも読めます。',
      ],
    },
  },
  limits: {
    eyebrow: 'できないこと',
    title: '正直な限界。',
    description: 'プライバシーネットワークは魔法ではありません。魔法のふりをする製品は、信頼に値しません。',
    items: [
      { title: 'ログインしたサイトからは隠せません', body: 'どこかにサインインすれば、そのサイトはあなたが誰か分かります。経路を隠してもアカウントは隠せません。' },
      { title: 'インターネット全体を見る相手には勝てません', body: '2 ホップは追跡のコストを桁違いに引き上げます。それでも、すべてを同時に見られる観察者にとって不可能にはなりません。' },
      { title: '違法だったことが合法にはなりません', body: '自分の行いと、住んでいる場所の法律に対する責任は変わりません。' },
    ],
  },
  faq: {
    eyebrow: 'よくある質問',
    title: 'まっすぐな答え。',
    items: [
      { q: 'AeroNyx は私が見ているサイトを分かりますか？', a: 'いいえ。通信は端末で封印され、運ぶノードは次の宛先しか知りません。あなたの閲覧が見えるサーバーを私たちは持っておらず、差し出せるログもありません。記録するものが存在しないからです。' },
      { q: 'ノードは誰が運用しているのですか？', a: '世界中の独立した人たちです。サーバーが一台あれば誰でも運用でき、ソフトウェアはオープンソース。どの運用者も、誰かを特定できるだけの情報は見られません。' },
      { q: '普通の接続より遅くなりますか？', a: '少しだけ。直接出ていく代わりに 2 ホップを経由するので、その分の遅延が生まれます。引き換えに、経路上のどの一点もあなたの像を組み立てられません。' },
      { q: '公開されている数字は何を意味しますか？', a: 'ネットワーク全体の合計です。運んだバイト数、転送したパケット数、オンラインのノード数。個人に関するものは含まれません。そもそも集めていないからです。' },
    ],
  },
};

const ko = {
  seo: {
    title: 'AeroNyx 프라이버시 네트워크 — 흔적을 남기지 않고',
    description: '독립 노드를 거치는 프라이빗 경로. 트래픽을 실어 나르면서도 어떤 사이트를 보는지는 알지 못합니다. 우리도 모릅니다. 오픈소스.',
  },
  how: {
    eyebrow: '작동 방식',
    title: '2홉, 그리고 양쪽 끝을 보는 사람은 없습니다.',
    description: '트래픽은 봉인된 채로 기기를 떠나 사이트에 닿기까지 두 곳을 거칩니다. 당신이 누구인지와 어디로 가는지를 동시에 아는 노드는 하나도 없습니다.',
    steps: [
      { title: '기기가 봉인합니다', body: '무엇이든 밖으로 나가기 전에, 당신의 기기에만 존재하는 키로 잠깁니다.' },
      { title: '첫 번째 노드는 당신을 알고 사이트를 모릅니다', body: '당신의 연결에서 온 봉인된 봉투와 다음 목적지만 봅니다. 최종 목적지에 대해서는 아무것도 모릅니다.' },
      { title: '두 번째 노드는 사이트를 알고 당신을 모릅니다', body: '트래픽을 갈 곳으로 넘길 뿐, 누구에게서 왔는지는 알지 못합니다.' },
    ],
    note: '이 분리가 핵심입니다. 양쪽 끝을 이으려면 두 노드가 손을 잡아야 하는데, 이들은 서로 다른 곳의 서로 다른 사람이 운영합니다.',
    diagram: { you: '당신', node: '노드', them: '사이트', sealed: '봉인', carried: '전달', opened: '도착' },
  },
  vs: {
    eyebrow: 'VPN이 아닙니다',
    title: 'VPN은 한 회사를 믿으라고 합니다. 이쪽은 그렇게 말할 자격이 없습니다.',
    description: 'VPN에서는 당신이 하는 모든 일이 한 회사가 소유한 서버를 지나갑니다. 프라이버시는 그 회사의 정책이 오늘 어떻게 쓰여 있는지에 달려 있습니다.',
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
        '노드는 독립적인 사람들이 운영합니다. 경로는 누구의 것도 아닙니다.',
        '당신이 누구인지와 어디로 가는지를 동시에 보는 노드는 없습니다.',
        '당신이 믿는 것은 설계이고, 그것은 누구나 읽을 수 있습니다.',
      ],
    },
  },
  limits: {
    eyebrow: '할 수 없는 것',
    title: '정직한 경계.',
    description: '프라이버시 네트워크는 마법이 아닙니다. 마법인 척하는 제품은 신뢰받을 자격이 없습니다.',
    items: [
      { title: '로그인한 사이트로부터 숨겨주지는 않습니다', body: '어딘가에 로그인하면 그 사이트는 당신이 누구인지 압니다. 경로를 숨겨도 계정은 숨겨지지 않습니다.' },
      { title: '인터넷 전체를 보는 상대는 막지 못합니다', body: '2홉은 트래픽 추적 비용을 엄청나게 올립니다. 그래도 모든 것을 동시에 볼 수 있는 관찰자에게 불가능하게 만들지는 못합니다.' },
      { title: '불법이던 일을 합법으로 만들지 않습니다', body: '당신의 행동과 사는 곳의 법에 대한 책임은 그대로입니다.' },
    ],
  },
  faq: {
    eyebrow: '자주 묻는 질문',
    title: '솔직한 답변.',
    items: [
      { q: 'AeroNyx는 제가 방문하는 사이트를 볼 수 있나요?', a: '아니요. 트래픽은 기기에서 봉인되고, 그것을 나르는 노드는 다음 목적지만 압니다. 당신의 브라우징을 보는 서버를 우리는 운영하지 않으며, 넘겨줄 로그도 없습니다. 기록할 것 자체가 없기 때문입니다.' },
      { q: '노드는 누가 운영하나요?', a: '세계 각지의 독립적인 사람들입니다. 서버 한 대만 있으면 누구나 운영할 수 있고, 소프트웨어는 오픈소스이며, 어떤 운영자도 누군가를 특정할 만큼은 보지 못합니다.' },
      { q: '일반 연결보다 느린가요?', a: '조금 느립니다. 곧바로 나가는 대신 두 번을 거치니 지연이 생깁니다. 대신 경로의 어느 한 지점도 당신의 모습을 조립할 수 없습니다.' },
      { q: '공개된 숫자는 무엇을 뜻하나요?', a: '네트워크 전체의 합계입니다. 전달한 바이트, 전달한 패킷, 온라인 노드 수. 개인에 관한 것은 들어 있지 않습니다. 애초에 수집하지 않기 때문입니다.' },
    ],
  },
};

const es = {
  seo: {
    title: 'AeroNyx Privacy Network — navega sin que te sigan',
    description:
      'Una ruta privada por nodos independientes. Llevan tu tráfico sin poder ver qué sitios visitas, y nosotros tampoco. Código abierto.',
  },
  how: {
    eyebrow: 'Cómo funciona',
    title: 'Dos saltos, y nadie ve los dos extremos.',
    description:
      'Tu tráfico sale sellado de tu dispositivo y hace dos paradas antes de llegar al sitio. Ningún nodo sabe a la vez quién eres y adónde vas.',
    steps: [
      { title: 'Tu dispositivo lo sella', body: 'Antes de que salga nada, se cierra con claves que solo existen en tu dispositivo.' },
      { title: 'El primer nodo te conoce a ti, no al sitio', body: 'Ve un sobre sellado que llega de tu conexión y a quién pasárselo. Nada sobre el destino.' },
      { title: 'El segundo nodo conoce el sitio, no a ti', body: 'Entrega el tráfico donde va, sin idea de quién lo envió.' },
    ],
    note: 'Esa separación es todo el punto: unir los dos extremos exigiría que ambos nodos actuaran juntos, y los operan personas distintas en lugares distintos.',
    diagram: { you: 'Tú', node: 'Nodo', them: 'Sitio', sealed: 'sellado', carried: 'llevado', opened: 'entregado' },
  },
  vs: {
    eyebrow: 'No es una VPN',
    title: 'Una VPN te pide confiar en una empresa. Esta no está en posición de pedirlo.',
    description: 'Con una VPN, todo lo que haces cruza servidores que una sola empresa posee, y tu privacidad es lo que su política diga hoy.',
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
        'Los nodos los operan personas independientes. Nadie es dueño del camino.',
        'Ningún nodo ve a la vez quién eres y adónde vas.',
        'Confías en el diseño, y cualquiera puede leerlo.',
      ],
    },
  },
  limits: {
    eyebrow: 'Lo que no hace',
    title: 'Los límites, dichos en voz alta.',
    description: 'Una red de privacidad no es magia, y un producto que finge lo contrario no se ha ganado tu confianza.',
    items: [
      { title: 'No te oculta de los sitios donde inicias sesión', body: 'Si entras con tu cuenta, ese sitio sabe quién eres. Ocultar la ruta no oculta la cuenta.' },
      { title: 'No vence a quien observa todo internet', body: 'Dos saltos encarecen enormemente seguir el tráfico. No lo vuelven imposible para quien puede verlo todo a la vez.' },
      { title: 'No vuelve legal lo que no lo era', body: 'Sigues siendo responsable de lo que haces y de la ley donde vives.' },
    ],
  },
  faq: {
    eyebrow: 'Preguntas',
    title: 'Respuestas directas.',
    items: [
      { q: '¿Puede AeroNyx ver los sitios que visito?', a: 'No. El tráfico se sella en tu dispositivo y los nodos que lo llevan solo conocen la siguiente parada. No tenemos ningún servidor que vea tu navegación, ni registro que entregar, porque no hay nada que registrar.' },
      { q: '¿Quién opera los nodos?', a: 'Personas independientes, en cualquier parte del mundo. Cualquiera con un servidor puede operar uno, el software es de código abierto, y ningún operador ve lo suficiente para identificar a nadie.' },
      { q: '¿Es más lenta que una conexión normal?', a: 'Un poco. El tráfico da dos saltos en vez de salir directo, lo que añade algo de latencia. A cambio, ningún punto del camino puede componer un retrato tuyo.' },
      { q: '¿Qué significan las cifras públicas?', a: 'Son totales de toda la red: bytes llevados, paquetes reenviados, nodos en línea. No hay nada por persona, porque nada por persona se recoge.' },
    ],
  },
};

const locales = { en, ru, 'zh-Hant': zhHant, 'zh-Hans': zhHans, ja, ko, es };

export function getPrivacyNetworkCopy(locale) {
  return mergeLocaleCopy(en, locales[locale] || null);
}

export default getPrivacyNetworkCopy;
