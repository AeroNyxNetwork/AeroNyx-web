/**
 * ============================================================================
 * File: lib/i18n-memchain.js
 * ============================================================================
 * [NYXI-WEB 2026-10-06 by Claude] Copy that /memchain adds on top of its own
 * lib/i18n `memchainPage` narrative, which stays: MemChain is the serious,
 * node-blind memory protocol, and Nyxi (小霓) is its first application.
 *
 *   app / demo / points — the "Built on MemChain: Nyxi" section. Points and
 *     demo come from the owner's own description of Nyxi's memory
 *     (2026-10-06, zh-Hant source).
 *   boundaryTitle / boundaryTee — the privacy-boundary title and second
 *     paragraph, which were built on that same choice ("the brain you choose").
 *   labDescription / pillarsDescription — replacements for the two
 *     memchainPage sentences that promised user-chosen AI models. As of
 *     2026-10-05 memory runs through one TEE-hosted model and the user cannot
 *     switch providers; the page also drops the matching lab axis (id 'brain'), the
 *     third pillar and the "AI model choice" comparison row.
 *
 * lib/i18n is not edited. Same deep-merge contract as the other copy files.
 * ============================================================================
 */

import { mergeLocaleCopy } from './i18n-nightglass';

const en = {
  app: {
    eyebrow: 'Built on MemChain',
    title: 'Nyxi: MemChain’s first application.',
    description: 'Everything above is the engine. Nyxi is what it feels like: an AI that remembers you for life — what you told her, the people you care about, your plans and promises — so you never have to say it twice.',
    cta: 'Talk to Nyxi',
    bubble: 'You told me about that last week.',
  },
  labDescription: 'Tap each axis to see the core MemChain advantage: the server cannot read memory, recall feels instant, offline memory works, and retrieval does not spend a model call.',
  pillarsDescription: 'MemChain is built around precise claims the product can defend: node-blind storage and local-first recall.',
  boundaryTitle: 'The node is blind.',
  boundaryTee: 'When memories are distilled, or used to answer you, the relevant text is processed by the AI model running in a TEE.',
  demo: {
    eyebrow: 'See it',
    title: 'Ask her about your own life.',
    description: 'Three questions, three things most assistants get wrong.',
    exchanges: [
      { you: 'When was my last dentist visit?', nyxi: 'September 18. You had a filling done.', note: 'Remembers when' },
      { you: 'What’s my favorite color?', nyxi: 'You haven’t told me. You did say your mom loves purple.', note: 'Says when she doesn’t know' },
      { you: 'Forget the dentist thing.', nyxi: 'Done. It’s gone, and I won’t bring it up.', note: 'Forgets when you say so' },
    ],
    you: 'You',
    example: 'Example conversation',
  },
  points: {
    eyebrow: 'How her memory works',
    title: 'Yours to keep, to see, and to erase.',
    items: [
      { title: 'You decide', body: 'Memory is off by default. The first time you chat, Nyxi asks: “Want me to remember what you tell me?” Only a yes turns it on.' },
      { title: 'Kept on your phone', body: 'What she remembers is encrypted and stored on your device, not in a cloud database. Backup nodes only get encrypted data they cannot read.' },
      { title: 'See it, change it', body: 'Open the memory page any time to see what she has kept and what your life profile says — and edit it.' },
      { title: 'Forget means forget', body: 'Tell her “forget this” and every trace of it is removed. She won’t bring it up again.' },
      { title: 'Says when she doesn’t know', body: 'She answers only from what she really remembers. If you never told her, she says so instead of making it up — and she won’t pin someone else’s fact on you.' },
      { title: 'Remembers when', body: 'Ask “what did I say last Wednesday?” or “when was my last dentist visit?” and she finds it by time.' },
      { title: 'In your language', body: 'She remembers in whatever language you speak — Chinese, English, Japanese, Korean, Spanish, Russian and more — and can find it again.' },
      { title: 'One memory, shared', body: 'Nyxi and your personal secretaries share one memory of you: what you tell Nyxi, your secretary knows too. Each secretary’s private chats with you stay with that secretary.' },
    ],
    membership: 'Free users can try memory first. Upgrade to membership and Nyxi keeps remembering — and catches up on what you talked about in between.',
  },
};

const zhHant = {
  app: {
    eyebrow: '建在 MemChain 上',
    title: '小霓：MemChain 的第一個應用。',
    description: '上面講的是引擎；小霓是它用起來的樣子——一輩子記得你的 AI。你說過的事、在意的人、計畫和約定，她都記得，下次再聊不用重講一遍。',
    cta: '找小霓聊聊',
    bubble: '這件事你上週跟我說過。',
  },
  labDescription: '點選每個軸，看 MemChain 的核心優勢：伺服器讀不到記憶、找回幾乎即時、離線也能用、檢索不花一次模型呼叫。',
  pillarsDescription: 'MemChain 圍繞產品守得住的精確主張而建：節點盲存儲、本地優先找回。',
  boundaryTitle: '節點是盲的。',
  boundaryTee: '提煉記憶，或用記憶回答你時，相關內容會交給在 TEE 中運行的 AI 模型處理。',
  demo: {
    eyebrow: '看看實際的樣子',
    title: '問她你自己的事。',
    description: '三個問題，三件大多數 AI 都做不好的事。',
    exchanges: [
      { you: '我上次看牙是哪天？', nyxi: '9 月 18 日，你說補了一顆牙。', note: '記得什麼時候說過什麼' },
      { you: '我喜歡什麼顏色？', nyxi: '你沒跟我說過。不過你說過媽媽喜歡紫色。', note: '不知道就說不知道' },
      { you: '忘掉看牙那件事。', nyxi: '好，已經忘了，之後不會再提。', note: '說忘就忘' },
    ],
    you: '你',
    example: '對話示範',
  },
  points: {
    eyebrow: '她的記憶怎麼運作',
    title: '你的記憶，你留著、你看得到、你刪得掉。',
    items: [
      { title: '由你決定要不要記', body: '記憶預設是關的。第一次聊天時，小霓會問你：「想讓我記住你跟我說過的事嗎？」你同意了才會開始記。' },
      { title: '記憶存在你自己的手機上', body: '記住的內容加密保存在你的裝置上，不是存在雲端資料庫。備份節點只拿得到加密過的資料，讀不到內容。' },
      { title: '你看得到，也改得了', body: '你可以隨時打開記憶頁，看小霓記了什麼、你的「人生檔案」寫了什麼，也可以修改。' },
      { title: '說忘就忘', body: '跟小霓說「忘掉這件事」，相關的記憶會從頭到尾刪掉，之後她不會再提起。' },
      { title: '不知道就說不知道', body: '小霓只根據她真的記得的事回答。沒告訴過她的事，她會老實說不記得，不會編；也不會把別人的事安到你身上。' },
      { title: '記得什麼時候說過什麼', body: '問「我上週三說了什麼」「我上次看牙是哪天」，她能依照時間，找回你說過的話。' },
      { title: '你說哪種語言，她就用哪種語言記', body: '中文、英文、日文、韓文、西班牙文、俄文等多種語言都能記，也找得到。' },
      { title: '一份記憶，大家共用', body: '小霓和你的專屬秘書共用同一份關於你的記憶：你跟小霓說過的事，你的秘書也知道。每位秘書和你的私人對話，只有她自己看得到。' },
    ],
    membership: '免費用戶可以先試用記憶功能；用完後升級會員，小霓會繼續記住你，還會把這段期間的對話補記起來。',
  },
};

const zhHans = {
  app: {
    eyebrow: '建在 MemChain 上',
    title: '小霓：MemChain 的第一个应用。',
    description: '上面讲的是引擎；小霓是它用起来的样子——一辈子记得你的 AI。你说过的事、在意的人、计划和约定，她都记得，下次再聊不用重讲一遍。',
    cta: '找小霓聊聊',
    bubble: '这件事你上周跟我说过。',
  },
  labDescription: '点选每个轴，看 MemChain 的核心优势：服务器读不到记忆、找回几乎即时、离线也能用、检索不花一次模型调用。',
  pillarsDescription: 'MemChain 围绕产品守得住的精确主张而建：节点盲存储、本地优先找回。',
  boundaryTitle: '节点是盲的。',
  boundaryTee: '提炼记忆，或用记忆回答你时，相关内容会交给在 TEE 中运行的 AI 模型处理。',
  demo: {
    eyebrow: '看看实际的样子',
    title: '问她你自己的事。',
    description: '三个问题，三件大多数 AI 都做不好的事。',
    exchanges: [
      { you: '我上次看牙是哪天？', nyxi: '9 月 18 日，你说补了一颗牙。', note: '记得什么时候说过什么' },
      { you: '我喜欢什么颜色？', nyxi: '你没跟我说过。不过你说过妈妈喜欢紫色。', note: '不知道就说不知道' },
      { you: '忘掉看牙那件事。', nyxi: '好，已经忘了，之后不会再提。', note: '说忘就忘' },
    ],
    you: '你',
    example: '对话示范',
  },
  points: {
    eyebrow: '她的记忆怎么运作',
    title: '你的记忆，你留着、你看得到、你删得掉。',
    items: [
      { title: '由你决定要不要记', body: '记忆默认是关的。第一次聊天时，小霓会问你：「想让我记住你跟我说过的事吗？」你同意了才会开始记。' },
      { title: '记忆存在你自己的手机上', body: '记住的内容加密保存在你的设备上，不是存在云端数据库。备份节点只拿得到加密过的数据，读不到内容。' },
      { title: '你看得到，也改得了', body: '你可以随时打开记忆页，看小霓记了什么、你的「人生档案」写了什么，也可以修改。' },
      { title: '说忘就忘', body: '跟小霓说「忘掉这件事」，相关的记忆会从头到尾删掉，之后她不会再提起。' },
      { title: '不知道就说不知道', body: '小霓只根据她真的记得的事回答。没告诉过她的事，她会老实说不记得，不会编；也不会把别人的事安到你身上。' },
      { title: '记得什么时候说过什么', body: '问「我上周三说了什么」「我上次看牙是哪天」，她能按照时间，找回你说过的话。' },
      { title: '你说哪种语言，她就用哪种语言记', body: '中文、英文、日文、韩文、西班牙文、俄文等多种语言都能记，也找得到。' },
      { title: '一份记忆，大家共用', body: '小霓和你的专属秘书共用同一份关于你的记忆：你跟小霓说过的事，你的秘书也知道。每位秘书和你的私人对话，只有她自己看得到。' },
    ],
    membership: '免费用户可以先试用记忆功能；用完后升级会员，小霓会继续记住你，还会把这段期间的对话补记起来。',
  },
};

const ja = {
  app: {
    eyebrow: 'MemChain の上に',
    title: 'Nyxi：MemChain 最初のアプリケーション。',
    description: 'ここまでがエンジン。Nyxi はそれを使った姿です。一生あなたを覚えている AI。話したこと、大切な人、計画や約束を覚えているので、同じ説明は二度といりません。',
    cta: 'Nyxi と話す',
    bubble: 'それ、先週話してくれたよね。',
  },
  labDescription: '各軸をタップして、MemChain の核となる強みを確認：サーバーは記憶を読めない、想起はほぼ瞬時、オフラインでも動く、検索にモデル呼び出しを使わない。',
  pillarsDescription: 'MemChain は、製品が守り抜ける正確な主張の上に作られています。ノードブラインドな保存と、ローカル優先の想起です。',
  boundaryTitle: 'ノードは盲目です。',
  boundaryTee: '記憶の抽出や、記憶を使った回答の際、関連する内容は TEE の中で動く AI モデルが処理します。',
  demo: {
    eyebrow: '実際の様子',
    title: '自分のことを聞いてみる。',
    description: '三つの質問。たいていの AI が苦手な三つのこと。',
    exchanges: [
      { you: '最後に歯医者に行ったのはいつ？', nyxi: '9 月 18 日。虫歯を一本治療したって言ってたよ。', note: 'いつ話したかを覚えている' },
      { you: '私の好きな色は？', nyxi: 'まだ聞いてないよ。お母さんが紫を好きだとは聞いたけど。', note: '知らないことは知らないと言う' },
      { you: '歯医者の話は忘れて。', nyxi: 'わかった、忘れたよ。もう話題にしない。', note: '忘れてと言えば忘れる' },
    ],
    you: 'あなた',
    example: '会話の例',
  },
  points: {
    eyebrow: '記憶のしくみ',
    title: '残すのも、見るのも、消すのもあなた。',
    items: [
      { title: '覚えるかはあなたが決める', body: '記憶は最初はオフです。初めての会話で Nyxi が「話してくれたこと、覚えておいていい？」と聞き、同意したときだけ始まります。' },
      { title: '記憶はあなたのスマホに', body: '覚えた内容は暗号化してあなたの端末に保存され、クラウドのデータベースには置かれません。バックアップノードが受け取るのは、読めない暗号化データだけです。' },
      { title: '見られて、直せる', body: '記憶ページでいつでも、Nyxi が覚えていることや「人生プロフィール」の内容を確認し、修正できます。' },
      { title: '忘れてと言えば忘れる', body: '「これは忘れて」と言えば、関連する記憶は最初から最後まで削除され、二度と話題にしません。' },
      { title: '知らないことは知らないと言う', body: '本当に覚えていることだけをもとに答えます。聞いていないことは正直に覚えていないと言い、作り話はしません。他人のことをあなたのことと取り違えることもありません。' },
      { title: 'いつ話したかを覚えている', body: '「先週の水曜に何て言った？」「最後に歯医者に行ったのはいつ？」と聞けば、時間をたどって見つけます。' },
      { title: '話す言語のまま覚える', body: '日本語、中国語、英語、韓国語、スペイン語、ロシア語など、多くの言語で覚えて、見つけられます。' },
      { title: 'ひとつの記憶をみんなで', body: 'Nyxi とあなたの専属秘書は、あなたについての同じ記憶を共有します。Nyxi に話したことは秘書も知っています。秘書とあなたの個別の会話は、その秘書だけのものです。' },
    ],
    membership: '無料ユーザーは記憶機能をまず試せます。その後メンバーになれば、Nyxi は覚え続け、その間の会話もさかのぼって覚えます。',
  },
};

const ko = {
  app: {
    eyebrow: 'MemChain 위에서',
    title: 'Nyxi: MemChain의 첫 번째 애플리케이션.',
    description: '위의 내용이 엔진이라면, Nyxi는 그것을 실제로 쓰는 모습이에요. 평생 당신을 기억하는 AI. 당신이 한 말, 아끼는 사람들, 계획과 약속을 기억하니까 두 번 말할 필요가 없어요.',
    cta: 'Nyxi와 대화하기',
    bubble: '그거 지난주에 말해 줬잖아요.',
  },
  labDescription: '각 축을 눌러 MemChain의 핵심 장점을 보세요: 서버는 기억을 읽을 수 없고, 떠올리기는 거의 즉시이며, 오프라인에서도 작동하고, 검색에 모델 호출을 쓰지 않습니다.',
  pillarsDescription: 'MemChain은 제품이 지킬 수 있는 정확한 주장 위에 만들어졌습니다. 노드가 읽을 수 없는 저장, 로컬 우선 떠올리기.',
  boundaryTitle: '노드는 볼 수 없습니다.',
  boundaryTee: '기억을 추출하거나 기억으로 답할 때, 관련 내용은 TEE 안에서 실행되는 AI 모델이 처리합니다.',
  demo: {
    eyebrow: '직접 보기',
    title: '당신 자신에 대해 물어보세요.',
    description: '세 가지 질문, 대부분의 AI가 잘 못하는 세 가지.',
    exchanges: [
      { you: '마지막으로 치과 간 게 언제야?', nyxi: '9월 18일이요. 충치 하나 치료했다고 했어요.', note: '언제 한 말인지 기억해요' },
      { you: '내가 좋아하는 색은?', nyxi: '아직 말해 준 적 없어요. 어머니가 보라색을 좋아한다고는 했어요.', note: '모르면 모른다고 해요' },
      { you: '치과 얘기는 잊어 줘.', nyxi: '네, 잊었어요. 다시 꺼내지 않을게요.', note: '잊으라면 잊어요' },
    ],
    you: '나',
    example: '대화 예시',
  },
  points: {
    eyebrow: '기억이 작동하는 방식',
    title: '남기는 것도, 보는 것도, 지우는 것도 당신.',
    items: [
      { title: '기억할지는 당신이 정해요', body: '기억은 기본적으로 꺼져 있어요. 처음 대화할 때 Nyxi가 “내가 들은 걸 기억해도 될까요?”라고 묻고, 동의해야 시작해요.' },
      { title: '기억은 당신 휴대폰에', body: '기억한 내용은 암호화되어 당신의 기기에 저장되며, 클라우드 데이터베이스에 두지 않아요. 백업 노드는 읽을 수 없는 암호화 데이터만 받아요.' },
      { title: '보고, 고칠 수 있어요', body: '기억 페이지에서 언제든 Nyxi가 기억하는 것과 “인생 프로필” 내용을 확인하고 고칠 수 있어요.' },
      { title: '잊으라면 잊어요', body: '“이건 잊어 줘”라고 하면 관련 기억이 처음부터 끝까지 삭제되고, 다시 꺼내지 않아요.' },
      { title: '모르면 모른다고 해요', body: '정말 기억하는 것만으로 답해요. 들은 적 없는 일은 솔직히 모른다고 하고, 지어내지 않아요. 다른 사람 일을 당신 일로 착각하지도 않아요.' },
      { title: '언제 한 말인지 기억해요', body: '“지난 수요일에 내가 뭐라고 했지?” “마지막으로 치과 간 게 언제야?”라고 물으면 시간을 따라 찾아내요.' },
      { title: '쓰는 언어 그대로 기억해요', body: '한국어, 중국어, 영어, 일본어, 스페인어, 러시아어 등 여러 언어로 기억하고 찾을 수 있어요.' },
      { title: '하나의 기억을 함께', body: 'Nyxi와 당신의 전용 비서는 당신에 대한 같은 기억을 공유해요. Nyxi에게 한 말은 비서도 알아요. 비서와 당신의 개인 대화는 그 비서만 볼 수 있어요.' },
    ],
    membership: '무료 사용자는 기억 기능을 먼저 체험할 수 있어요. 이후 멤버십으로 업그레이드하면 Nyxi가 계속 기억하고, 그 사이의 대화도 다시 기억해 둬요.',
  },
};

const ru = {
  app: {
    eyebrow: 'Построено на MemChain',
    title: 'Nyxi — первое приложение MemChain.',
    description: 'Всё выше — это движок. Nyxi — то, каким он ощущается: ИИ, который помнит вас всю жизнь — что вы рассказывали, людей, которые вам дороги, ваши планы и договорённости, — так что ничего не придётся повторять.',
    cta: 'Поговорить с Nyxi',
    bubble: 'Ты рассказывал мне об этом на прошлой неделе.',
  },
  labDescription: 'Нажмите на каждую ось, чтобы увидеть главное преимущество MemChain: сервер не может прочитать память, вспоминание почти мгновенно, память работает офлайн, а поиск не тратит ни одного вызова модели.',
  pillarsDescription: 'MemChain построен на точных утверждениях, которые продукт может отстоять: слепое хранение на узлах и локальный поиск в первую очередь.',
  boundaryTitle: 'Узел слеп.',
  boundaryTee: 'Когда воспоминания извлекаются или используются для ответа, нужный текст обрабатывает модель ИИ, работающая в TEE.',
  demo: {
    eyebrow: 'Как это выглядит',
    title: 'Спросите её о своей жизни.',
    description: 'Три вопроса — три вещи, в которых ошибается большинство ИИ.',
    exchanges: [
      { you: 'Когда я последний раз был у стоматолога?', nyxi: '18 сентября. Тебе поставили пломбу.', note: 'Помнит, когда' },
      { you: 'Какой мой любимый цвет?', nyxi: 'Ты мне не говорил. Зато говорил, что мама любит фиолетовый.', note: 'Говорит, когда не знает' },
      { you: 'Забудь про стоматолога.', nyxi: 'Готово. Забыла и больше не напомню.', note: 'Забывает, когда вы просите' },
    ],
    you: 'Вы',
    example: 'Пример разговора',
  },
  points: {
    eyebrow: 'Как устроена её память',
    title: 'Хранить, смотреть и стирать — решаете вы.',
    items: [
      { title: 'Решаете вы', body: 'Память по умолчанию выключена. В первом разговоре Nyxi спросит: «Можно я буду запоминать, что ты рассказываешь?» Включается только после «да».' },
      { title: 'Хранится на вашем телефоне', body: 'Всё, что она помнит, зашифровано и хранится на вашем устройстве, а не в облачной базе данных. Резервные узлы получают только зашифрованные данные, которые не могут прочитать.' },
      { title: 'Видно и можно править', body: 'На странице памяти в любой момент видно, что она запомнила и что написано в вашем «профиле жизни», — и всё можно изменить.' },
      { title: '«Забудь» значит «забудь»', body: 'Скажите «забудь это» — и всё связанное удаляется целиком. Больше она об этом не вспомнит.' },
      { title: 'Говорит, когда не знает', body: 'Отвечает только по тому, что действительно помнит. Если вы ей не рассказывали, честно скажет, а не выдумает, — и не припишет вам чужое.' },
      { title: 'Помнит, когда', body: 'Спросите «что я говорил в прошлую среду?» или «когда я был у стоматолога?» — она найдёт по времени.' },
      { title: 'На вашем языке', body: 'Запоминает на том языке, на котором вы говорите, — русском, английском, китайском, японском, корейском, испанском и других — и находит снова.' },
      { title: 'Одна память на всех', body: 'Nyxi и ваши личные секретари делят одну память о вас: что вы рассказали Nyxi, знает и секретарь. Личные разговоры каждого секретаря с вами остаются только у него.' },
    ],
    membership: 'Бесплатно память можно попробовать. Потом, с подпиской, Nyxi продолжит помнить — и наверстает всё, о чём вы говорили в промежутке.',
  },
};

const es = {
  app: {
    eyebrow: 'Construida sobre MemChain',
    title: 'Nyxi: la primera aplicación de MemChain.',
    description: 'Todo lo anterior es el motor. Nyxi es cómo se siente: una IA que te recuerda toda la vida —lo que le contaste, las personas que te importan, tus planes y promesas—, para que nunca tengas que repetirlo.',
    cta: 'Habla con Nyxi',
    bubble: 'Eso me lo contaste la semana pasada.',
  },
  labDescription: 'Toca cada eje para ver la ventaja central de MemChain: el servidor no puede leer la memoria, recordar es casi instantáneo, la memoria funciona sin conexión y la búsqueda no gasta una llamada a un modelo.',
  pillarsDescription: 'MemChain se basa en afirmaciones precisas que el producto puede defender: almacenamiento ciego en los nodos y recuperación local primero.',
  boundaryTitle: 'El nodo es ciego.',
  boundaryTee: 'Cuando se extraen recuerdos, o se usan para responderte, el texto relevante lo procesa el modelo de IA que se ejecuta en un TEE.',
  demo: {
    eyebrow: 'Míralo',
    title: 'Pregúntale por tu propia vida.',
    description: 'Tres preguntas, tres cosas en las que la mayoría de las IA fallan.',
    exchanges: [
      { you: '¿Cuándo fui al dentista la última vez?', nyxi: 'El 18 de septiembre. Te hicieron un empaste.', note: 'Recuerda cuándo' },
      { you: '¿Cuál es mi color favorito?', nyxi: 'No me lo has dicho. Sí me dijiste que a tu madre le encanta el morado.', note: 'Dice cuándo no lo sabe' },
      { you: 'Olvida lo del dentista.', nyxi: 'Hecho. Ya lo olvidé y no volveré a sacarlo.', note: 'Olvida cuando se lo pides' },
    ],
    you: 'Tú',
    example: 'Conversación de ejemplo',
  },
  points: {
    eyebrow: 'Cómo funciona su memoria',
    title: 'Tuya para guardarla, verla y borrarla.',
    items: [
      { title: 'Tú decides', body: 'La memoria viene apagada. La primera vez que hablas, Nyxi te pregunta: «¿Quieres que recuerde lo que me cuentas?». Solo un sí la enciende.' },
      { title: 'Guardada en tu teléfono', body: 'Lo que recuerda se cifra y se guarda en tu dispositivo, no en una base de datos en la nube. Los nodos de respaldo solo reciben datos cifrados que no pueden leer.' },
      { title: 'Puedes verla y cambiarla', body: 'Abre la página de memoria cuando quieras para ver lo que ha guardado y lo que dice tu perfil de vida, y edítalo.' },
      { title: 'Olvidar es olvidar', body: 'Dile «olvida esto» y todo rastro se elimina de principio a fin. No volverá a mencionarlo.' },
      { title: 'Dice cuándo no lo sabe', body: 'Solo responde con lo que de verdad recuerda. Si nunca se lo contaste, te lo dice en vez de inventarlo, y no te atribuye lo de otra persona.' },
      { title: 'Recuerda cuándo', body: 'Pregunta «¿qué dije el miércoles pasado?» o «¿cuándo fui al dentista?» y lo encuentra por fecha.' },
      { title: 'En tu idioma', body: 'Recuerda en el idioma en que hablas —español, inglés, chino, japonés, coreano, ruso y más— y puede volver a encontrarlo.' },
      { title: 'Una sola memoria, compartida', body: 'Nyxi y tus secretarias personales comparten una misma memoria sobre ti: lo que le cuentas a Nyxi, tu secretaria también lo sabe. Las conversaciones privadas de cada secretaria contigo solo las ve ella.' },
    ],
    membership: 'Los usuarios gratuitos pueden probar la memoria. Después, con la membresía, Nyxi sigue recordándote y se pone al día con lo que hablaron mientras tanto.',
  },
};

const locales = { en, ru, 'zh-Hant': zhHant, 'zh-Hans': zhHans, ja, ko, es };

export function getMemchainCopy(locale) {
  return mergeLocaleCopy(en, locales[locale] || null);
}

export default getMemchainCopy;
