// 質問データ定義
const mbtiNicknames = {
    'INTJ': '建築家',
    'INTP': '論理学者',
    'ENTJ': '指揮官',
    'ENTP': '討論者',
    'INFJ': '提唱者',
    'INFP': '仲介者',
    'ENFJ': '主人公',
    'ENFP': '広報運動家',
    'ISTJ': '管理者',
    'ISFJ': '擁護者',
    'ESTJ': '幹部',
    'ESFJ': '領事官',
    'ISTP': '巨匠',
    'ISFP': '冒険家',
    'ESTP': '起業家',
    'ESFP': 'エンターテイナー'
};

const questions = [
    // Layer 2: エネルギー軸 (S/M)
    // reverse が false の場合: 「そう思う」がそのまま高い点数
    // reverse が true の場合: 「そう思う」が低い点数に逆転する
    // dummy が true の場合: どの選択肢を選んでも中間の点数（4点）になる
    { id: 'q1', text: "デートの行き先や食事のメニューは、自分から提案して決める。", layer: 'SM', reverse: false, dummy: false },
    { id: 'q2', text: "グループで意見が割れた時、最終的に「こうしよう」とまとめ役を買って出ることが多い。", layer: 'SM', reverse: false, dummy: false },
    { id: 'q3', text: "相手に「何でもいいよ、任せる」と言われると、煩わしく感じる。", layer: 'SM', reverse: true, dummy: false },
    { id: 'q4', text: "自分のこだわりやマイルールを、パートナーや友人にも尊重してほしい。", layer: 'SM', reverse: false, dummy: false },
    { id: 'q5', text: "喧嘩をした時、時間が問題を解決するだろうと考える", layer: 'SM', reverse: true, dummy: false },
    { id: 'q6', text: "会話の主導権は自分が握り、自分の話を楽しそうに聞いてほしい。", layer: 'SM', reverse: false, dummy: false },
    { id: 'q7', text: "仕事やプロジェクトでは、自分で方針を決めてクリエイティブに働く方が得意だ。", layer: 'SM', reverse: false, dummy: false },
    { id: 'q8', text: "相手に「すごいやつだ」と言われると、謙遜しがちだ。", layer: 'SM', reverse: true, dummy: false },
    { id: 'q9', text: "自分は比較的愛想笑いをよくする方だと感じる。", layer: 'SM', reverse: true, dummy: false },
    { id: 'q10', text: "周囲の空気を読むより、自分の意志を通すことの方が大切だと思う。", layer: 'SM', reverse: false, dummy: false },

    // Layer 3: 愛着スタイル軸 (L/D)
    { id: 'q11', text: "自分はメッセージアプリの返信がマイペースな方だと言われる", layer: 'LD', reverse: true, dummy: false },
    { id: 'q12', text: "「一人で過ごす時間」よりも「誰かと共有する時間」の方が楽しむことができる。", layer: 'LD', reverse: false, dummy: false },
    { id: 'q13', text: "相手に拒絶されるのが怖くて、つい顔色を伺って尽くしすぎてしまう。", layer: 'LD', reverse: false, dummy: false },
    { id: 'q14', text: "深い悩みは誰かと共有するよりも、一人で考察する方が大切だと考える", layer: 'LD', reverse: true, dummy: false },
    { id: 'q15', text: "パートナーとは、隠し事のない「一心同体」のような関係が理想だ。", layer: 'LD', reverse: false, dummy: false },
    { id: 'q16', text: "相手が急に冷たくなったと感じると、必死に繋ぎ止めようとしてしまう。", layer: 'LD', reverse: false, dummy: false },
    { id: 'q17', text: "休みの日は、友達や恋日と遊びに行くよりも、本当は一人でゆっくりと過ごす方が好きだ。", layer: 'LD', reverse: true, dummy: false },
    { id: 'q18', text: "常に「愛されている」という言葉や態度による確認が欲しい。", layer: 'LD', reverse: false, dummy: false },
    { id: 'q19', text: "自分は無人島に一人で漂着しても、長く生きていける自信がある", layer: 'LD', reverse: true, dummy: false }
];

// 画像の定義 (仮の共通画像をFallbackとして設定可能)
const fallbackImg = 'Images/INTJ.png'; // 仮の添付画像
const mbtiImages = {
    'INTJ': 'Images/INTJ.png',
    'INTP': 'Images/INTP.png',
    'ENTJ': 'Images/ENTJ.png',
    'ENTP': 'Images/ENTP.png',
    'INFJ': 'Images/INFJ.png',
    'INFP': 'Images/INFP.png',
    'ENFJ': 'Images/ENFJ.png',
    'ENFP': 'Images/ENFP.png',
    'ISTJ': 'Images/ISTJ.png',
    'ISFJ': 'Images/ISFJ.png',
    'ESTJ': 'Images/ESTJ.png',
    'ESFJ': 'Images/ESFJ.png',
    'ISTP': 'Images/ISTP.png',
    'ISFP': 'Images/ISFP.png',
    'ESTP': 'Images/ESTP.png',
    'ESFP': 'Images/ESFP.png'
};

// 状態管理
let currentType = "";
let answers = {};
let currentPageIndex = 0;
const questionsPerPage = 5;

// クラス・属性の定義
const classAttributes = {
    'SL': {
        suffix: 'SL', name: '情熱のXX', color: 'var(--acc-sl)', glitchColor1: '#FF4B2B', glitchColor2: '#FFA07A', auraRGB: '255, 75, 43',
        description: `
            <h3 class="detail-subtitle">「世界を動かし、愛を抱きしめる太陽」</h3>
            <div class="detail-section">
                <h4>1. 基本情報</h4>
                <p>SL型は、周囲を巻き込む圧倒的な<strong>「推進力」</strong>と、誰一人取り残さない<strong>「共感性」</strong>を兼ね備えたタイプです。あなたは自分が主導権を握ることで、チームやコミュニティに活気をもたらすことに深い喜びを感じます。</p>
                <p>「自分が動けば、世界はもっと楽しくなる」という確信を持って行動することで、あなたの周囲には自然と人が集まり、不可能と思える状況すらも好転させていく特別な磁力が宿っています。</p>
            </div>
            <div class="detail-section">
                <h4>2. キャリアパス</h4>
                <p>目標達成への執着心と対人スキルの高さを活かせる環境で、最も輝きを放ちます。</p>
                <p>適職例： プロデューサー、起業家、広報ディレクター、営業リーダー、教育者。<br>組織の「顔」としてフロントに立ち、ビジョンを語ることで、関わる人々のモチベーションを最大化させます。あなたは「人を動かす天才」としての資質を持っており、大きなプロジェクトの舵取りを任されるほど、その才能は研ぎ澄まされていくでしょう。</p>
            </div>
            <div class="detail-section">
                <h4>3. 社会的役割</h4>
                <p>停滞した空気を一変させる<strong>「ゲームチェンジャー」</strong>です。<br>困難な壁に直面したとき、理論だけでは動かない人の心を「熱意」で動かせるのがあなたの最大の強みです。社会において、バラバラな個性を一つの大きな目的に向かって束ねる「接着剤」でありながら、先頭を走る「旗振り役」としての重責を担います。あなたが自信を持って決断を下す姿は、多くの人に安心感と勇気を与えています。</p>
            </div>
            <div class="detail-section">
                <h4>4. 恋愛・人間関係</h4>
                <p>「愛し、愛されること」を人生の燃料とする、極めて情熱的なロマンチストです。<br>単に一緒にいるだけでなく、心の奥底で深く繋がっている実感を求めます。あなたは相手の喜びを自分のことのように感じ、惜しみない愛情を注ぐことができます。</p>
            </div>
            <div class="detail-section">
                <h4>5. 意外な側面：光が落とす「影」の正体</h4>
                <p>あなたには、周囲の人を引き込み、一瞬で場を活気づける唯一無二の才能があります。しかしその強い光は、時に意図せず、あなた自身も気づかない「影」を周囲に落としてしまうことがあるでしょう。</p>
                <p>それは、あなたの純粋な情熱が、いつの間にか「相手を自分の理想通りに動かしたい」という無意識の支配にすり替わってしまう時です。自分の注いだ愛や熱量に対して期待通りの反応が返ってこないと、あなたは反射的に傷つき、その繊細さを理由に相手を静かに追い詰め、繋ぎ止めようとしてしまうことがあります。</p>
                <p>「深い絆」という言葉の裏側で、相手の境界線を踏み越え、自分の色で塗りつぶしてはいないでしょうか。その圧倒的なエネルギーを「支配」ではなく、相手を「解き放つ」ために使えたとき、あなたは本当の意味で、人々に希望を与える不変の太陽になれるはずです。</p>
            </div>
        `
    },
    'SD': {
        suffix: 'SD', name: '孤高のXX', color: 'var(--acc-sd)', glitchColor1: '#00D2FF', glitchColor2: '#3A7BD5', auraRGB: '0, 210, 255',
        description: `
            <h3 class="detail-subtitle">「己の道を切り拓き、静寂を支配する王」</h3>
            <div class="detail-section">
                <h4>1. 基本情報：圧倒的な個の力</h4>
                <p>あなたは、集団のノイズに惑わされることなく、自らの意志で最適解を導き出す<strong>「不変の軸」</strong>の持ち主です。周囲に依存せず、独りで完結できる強靭な精神構造を持っており、主導権を握る対象は「他人」ではなく「運命そのもの」です。</p>
                <p>「私が決めれば、道は開かれる」という静かな確信が、あなたの脳を常に最も効率的で鋭利な状態に保っています。</p>
            </div>
            <div class="detail-section">
                <h4>2. キャリアパス：領域を支配するスペシャリスト</h4>
                <p>独自のロジックと集中力で、誰も到達できないクオリティを叩き出す<strong>「卓越した開拓者」</strong>としての資質があります。</p>
                <p>適職例： 専門職リーダー、戦略コンサルタント、高度技術者、クリエイティブディレクター。<br>馴れ合いを必要とせず、結果だけで周囲を黙らせる圧倒的な実力主義の世界で最も輝きます。難問であるほど、あなたの脳は「聖域」としての静寂の中で、0.1秒で真実を見抜く直感力を研ぎ澄ませていくでしょう。</p>
            </div>
            <div class="detail-section">
                <h4>3. 社会的役割：妥協なきクオリティの番人</h4>
                <p>社会におけるあなたの役割は、甘えや妥協を排除し、基準を極限まで引き上げる<strong>「規律の体現者」</strong>です。<br>組織の中にいても、あなたの魂は常に独立しており、全体が停滞した際に「あるべき姿」を冷徹かつ正確に提示します。あなたが独りで立ち、自らの道を行く背中は、多くの人に「真の自立」とは何かを教える、静かながらも強烈な影響力を持っています。</p>
            </div>
            <div class="detail-section">
                <h4>4. 恋愛・人間関係：沈黙を共有する深い信頼</h4>
                <p>馴れ合いや表面的なお世辞を嫌い、互いの領域を尊重し合える<strong>「高潔な関係」</strong>を重んじます。<br>言葉による愛情表現は少なくても、一度認めた相手には、自らの行動と成果をもって「究極の忠誠」を誓います。あなたにとっての愛とは、べたべたと触れ合うことではなく、同じ高みを目指して並走する、知的な共鳴に近いものです。その深い信頼は、安易な絆よりも遥かに強固で揺るぎないものとなります。</p>
            </div>
            <div class="detail-section">
                <h4>5. 意外な側面：光に潜む「影」の正体</h4>
                <p>あなたは自らの力で運命を支配し、孤独を味方につける唯一無二の強さを持っています。しかしその気高さは、時に意図せず、周囲との間に凍てつくような「絶壁」を作ってしまうこともあるでしょう。</p>
                <p>それは、あなたの基準があまりに高すぎるがゆえに、他者の「弱さ」や「迷い」を無能さとして切り捨ててしまう時です。<br>独りで完結できてしまう強さが、いつの間にか他者への拒絶に変わり、気づけば自分だけの城に閉じこもって、周囲を寄せ付けない孤独な静寂を自ら作り出していることがあります。「理解されない」という感覚を、いつの間にか自分を特別視するための盾として正当化してはいないでしょうか。</p>
            </div>
        `
    },
    'ML': {
        suffix: 'ML', name: '献身のXX', color: 'var(--acc-ml)', glitchColor1: '#A8FF78', glitchColor2: '#78ffd6', auraRGB: '168, 255, 120',
        description: `
            <h3 class="detail-subtitle">「調和を育み、絆を守り抜く聖域」</h3>
            <div class="detail-section">
                <h4>1. 基本情報：世界を癒やす共鳴力</h4>
                <p>あなたは、周囲の感情の機微を誰よりも早く察知し、さざ波立つ場を平穏へと導く<strong>「静かなる癒やし手」</strong>です。自分を前面に出すことよりも、誰かの力になり、強い絆を育むことに至上の価値を見出します。</p>
                <p>「私の優しさが、世界を少しずつ優しく変えていく」という確信が、あなたの内側から枯れることのない慈愛と、どんな困難にも折れないしなやかな強さを引き出しています。</p>
            </div>
            <div class="detail-section">
                <h4>2. キャリアパス：組織の精神的インフラ</h4>
                <p>人々の潜在的なニーズを汲み取り、先回りしてサポートする<strong>「究極のバックアップ・スペシャリスト」</strong>として、比類なき価値を発揮します。</p>
                <p>適職例： カスタマーサクセス、カウンセラー、チームマネージャー、医療・福祉職、秘書。<br>数値や効率だけでは測れない「心の充足」を職場にもたらすあなたは、どんなチームにおいても「最も失いたくない守護神」として重宝されます。あなたがそこにいるだけで、メンバーのパフォーマンスは最大化され、組織全体の生命力が高まっていくのです。</p>
            </div>
            <div class="detail-section">
                <h4>3. 社会的役割：絆を編み上げる結節点</h4>
                <p>社会におけるあなたの役割は、バラバラな個人を一つの「家族」のような温かい共同体へと変える<strong>「結節点（ハブ）」</strong>です。<br>利己的な争いが絶えない世の中で、無償の献身を体現するあなたの姿は、人々に忘れていた信頼の尊さを思い出させます。あなたがそっと誰かの背中に手を添えるとき、それは単なる助けを超えて、社会のひずみを修復する「再生の儀式」となっているのです。</p>
            </div>
            <div class="detail-section">
                <h4>4. 恋愛・人間関係：魂を包み込む無償の愛</h4>
                <p>相手の幸せを自分の喜びとして受け止めることができる、深く豊かな<strong>「愛の器」</strong>の持ち主です。<br>派手な自己主張はせずとも、相手の小さな変化に気づき、寄り添い続けるあなたの姿に、パートナーは究極の安らぎを感じます。あなたとの関係の中で、相手は「ありのままの自分でいいのだ」という確信を得ることができ、その深い安心感が二人の絆を永遠のものへと昇華させます。</p>
            </div>
            <div class="detail-section">
                <h4>5. 意外な側面：光に潜む「影」の正体</h4>
                <p>あなたは誰かを支え、愛を与えることで自らも輝く唯一無二の光を持っています。しかしその献身性は、時に意図せず、あなた自身の心を摩耗させる「影」を作り出してしまうことがあるでしょう。</p>
                <p>それは、あなたの優しさがいつの間にか「自分を犠牲にしなければ必要とされない」という強い強迫観念にすり替わってしまう時です。<br>誰かの役に立ちたいという純粋な願いが、気づけば「繋がりを失う恐怖」への防衛反応となり、相手に依存させたり、自分の感情を殺してまで尽くしすぎてしまうことがあります。「愛すること」が、いつの間にか自分を消し去るための口実になってはいないでしょうか。</p>
            </div>
        `
    },
    'MD': {
        suffix: 'MD', name: '淡白なXX', color: 'var(--acc-md)', glitchColor1: '#8E2DE2', glitchColor2: '#4A00E0', auraRGB: '142, 45, 226',
        description: `
            <h3 class="detail-subtitle">「空気を読み、宇宙の真理を眺める観測者」</h3>
            <div class="detail-section">
                <h4>1. 基本情報：静寂なる洞察力</h4>
                <p>あなたは、喧騒の中でも常に一歩引いた視点から世界を眺める、冷静沈着な<strong>「精神の自由人」</strong>です。何事にも過度に執着せず、淡々と事実を見つめるその姿勢は、周囲が感情に流される場面でも、あなただけが「真実」にアクセスし続けることを可能にします。</p>
                <p>「私は常に自由であり、すべてを俯瞰している」という確信が、あなたの脳にクリエイティブな余白を作り出し、どんな難局でもパニックに陥らない強靭な知性を育んでいます。</p>
            </div>
            <div class="detail-section">
                <h4>2. キャリアパス：公平無私なバランサー</h4>
                <p>主観を排し、多角的な視点からリスクや最適解を導き出す<strong>「知的な防波堤」</strong>として、組織の安全を守ります。</p>
                <p>適職例： アナリスト、監査役、システムアーキテクト、研究者、危機管理スペシャリスト。<br>野心や権力争いから距離を置き、ただ「正しい解決策」を提示するあなたの存在は、混乱したプロジェクトにおける唯一の羅針盤となります。あなたが冷静に状況を分析し、一言を発するたびに、周囲の無駄な焦りは消え、物事は最も効率的なルートへと収束していきます。</p>
            </div>
            <div class="detail-section">
                <h4>3. 社会的役割：秩序を維持する守護者</h4>
                <p>社会におけるあなたの役割は、熱狂や偏見にブレーキをかけ、公平な均衡を保つ<strong>「中立の審判者」</strong>です。<br>誰もが感情的になり、視野が狭まっているとき、あなたのドライな客観性は「共通の正解」を見つけるための唯一の光となります。あなたが静かに状況を見守る姿は、周囲に「ここだけは安全だ」という無言の安心感を与え、極限状態における崩壊を防ぐ最後の砦となっています。</p>
            </div>
            <div class="detail-section">
                <h4>4. 恋愛・人間関係：究極の寛容さを秘めた隠れ家</h4>
                <p>独りの時間を尊び、相手の自由も尊重する、執着のない<strong>「広大な受容体」</strong>です。<br>一見すると淡白に映るかもしれませんが、その本質は「どんなあなたでも、ただそこにいていい」という究極の肯定にあります。束縛も干渉もしないあなたの隣は、安らぎを求める人にとって、誰にも邪魔されない最高の隠れ家となります。その穏やかな関係は、時間の経過とともに「言葉を超えた深い相互理解」へと熟成されていきます。</p>
            </div>
            <div class="detail-section">
                <h4>5. 意外な側面：光に潜む「影」の正体</h4>
                <p>あなたは高い視座から世界を捉え、感情の老化とは無縁の自由な精神を持っています。しかしその「宇宙的視点」は、時に意図せず、周囲からあなたを隔絶させてしまう「影」を作ることもあります。</p>
                <p>それは、あなたの「執着のなさ」が、いつの間にか「他者への無関心」や「逃避」という仮面を被ってしまう時です。<br>波風を立てたくないという思いが強すぎるあまり、直視すべき問題や感情から目を背け、「自分には関係ない」と心のシャッターを下ろしてはいないでしょうか。一線を引くことで自分を守っているつもりが、気づけば誰の手も届かない深い孤独の深淵に、自ら沈み込んでしまうことがあります。</p>
            </div>
        `
    }
};

// 初期化
function init() {
    const app = document.getElementById('app');

    // ページ1: スタート画面
    let html = `
        <div id="page-start" class="page active">
            <h2>基本データの入力</h2>
            <div class="input-group">
                <label for="mbti-type">あなたのMBTI (16タイプ) を入力してください</label>
                <input type="text" id="mbti-type" placeholder="例: ENFP" maxlength="4">
            </div>
            <button class="btn" onclick="startTest()">診断開始</button>
        </div>
    `;

    // 質問ページの生成 (5問ずつ)
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    for (let i = 0; i < totalPages; i++) {
        html += `<div id="page-q${i}" class="page">`;
        html += `<h3>質問 (${i + 1}/${totalPages})</h3>`;

        const startIdx = i * questionsPerPage;
        const endIdx = Math.min(startIdx + questionsPerPage, questions.length);

        for (let j = startIdx; j < endIdx; j++) {
            const q = questions[j];
            // 円形の7段階選択肢を生成
            html += `
                <div class="question-container" id="container-${q.id}">
                    <div class="question-text">${q.text}</div>
                    <div class="options-row">
                        <div class="option-edge-text">そう思う</div>
                        <div class="circles-container">
                            <label class="circle-label size-lg color-green" title="全くそう思う">
                                <input type="radio" name="${q.id}" value="7">
                                <span class="circle-bg circle-bg-green"></span>
                            </label>
                            <label class="circle-label size-md color-green" title="そう思う">
                                <input type="radio" name="${q.id}" value="6">
                                <span class="circle-bg circle-bg-green"></span>
                            </label>
                            <label class="circle-label size-sm color-green" title="ややそう思う">
                                <input type="radio" name="${q.id}" value="5">
                                <span class="circle-bg circle-bg-green"></span>
                            </label>
                            
                            <label class="circle-label size-xs color-gray" title="どちらとも言えない">
                                <input type="radio" name="${q.id}" value="4">
                                <span class="circle-bg circle-bg-gray"></span>
                            </label>
                            
                            <label class="circle-label size-sm color-purple" title="ややそう思わない">
                                <input type="radio" name="${q.id}" value="3">
                                <span class="circle-bg circle-bg-purple"></span>
                            </label>
                            <label class="circle-label size-md color-purple" title="そう思わない">
                                <input type="radio" name="${q.id}" value="2">
                                <span class="circle-bg circle-bg-purple"></span>
                            </label>
                            <label class="circle-label size-lg color-purple" title="全くそう思わない">
                                <input type="radio" name="${q.id}" value="1">
                                <span class="circle-bg circle-bg-purple"></span>
                            </label>
                        </div>
                        <div class="option-edge-text">そう<br>思わない</div>
                    </div>
                </div>
            `;
        }

        html += `<div class="page-controls">`;
        if (i > 0) {
            html += `<button class="btn" onclick="prevPage()">戻る</button>`;
        } else {
            html += `<div></div>`; // レイアウト調整用
        }

        // disabled属性をつけて初期状態は押せないようにする
        if (i === totalPages - 1) {
            html += `<button class="btn btn-next" id="next-btn-${i}" onclick="finishTest()" disabled>結果を見る <span class="arrow">→</span></button>`;
        } else {
            html += `<button class="btn btn-next" id="next-btn-${i}" onclick="nextPage()" disabled>次へ <span class="arrow">→</span></button>`;
        }
        html += `</div></div>`;
    }

    // 結果ページ
    html += `
        <div id="page-result" class="page">
            <div id="calculating">
                <div class="calc-text">解析中...</div>
            </div>
            <div class="glitch-container" id="glitch-text">
                <div class="glitch" data-text="XXXX">XXXX</div>
            </div>
            <div class="result-final" id="final-result">
                <!-- イメージ画像とネオン背景 -->
                <div class="attribute-aura" id="aura-bg">
                    <img id="res-image" src="" alt="タイプ画像" class="type-image">
                </div>
                
                <h2 class="class-title" id="res-class">XXXX-XX</h2>
                <div class="attribute-title" id="res-attr">属性のXX</div>
                <div class="detail-box" id="res-desc">
                    <p>診断結果の詳細は準備中です。</p>
                </div>
                <div style="margin-top:2rem;">
                     <button class="btn" onclick="location.reload()">再診断</button>
                </div>
            </div>
        </div>
    `;

    app.innerHTML = html;

    // イベントリスナーの登録（ラジオボタンの変更検知）
    attachRadioEvents();
}

// ラジオボタンを選択したときのアクション
function attachRadioEvents() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const currentContainer = e.target.closest('.question-container');
            const nextContainer = currentContainer.nextElementSibling;

            // 次の質問欄へ自動で少しスクロール
            if (nextContainer && nextContainer.classList.contains('question-container')) {
                setTimeout(() => {
                    nextContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300); // 選択内容が見えてから300ms後にスクロール
            }

            // ページ内のすべての質問が回答されたかチェック
            checkPageComplete();
        });
    });
}

// 必須入力のチェック
function checkPageComplete() {
    const startIdx = currentPageIndex * questionsPerPage;
    const endIdx = Math.min(startIdx + questionsPerPage, questions.length);
    let allAnswered = true;

    for (let j = startIdx; j < endIdx; j++) {
        const qId = questions[j].id;
        if (!document.querySelector(`input[name="${qId}"]:checked`)) {
            allAnswered = false;
            break;
        }
    }

    // 「次へ」ボタンの有効化/無効化
    const nextBtn = document.getElementById(`next-btn-${currentPageIndex}`);
    if (nextBtn) {
        nextBtn.disabled = !allAnswered;
        // 答えていない間は disabled 状態になるので、CSSで🚫マークにする
    }
}

// 診断開始
function startTest() {
    const rawInput = document.getElementById('mbti-type').value.trim();
    const typeInput = rawInput.toUpperCase();

    // 1. 大文字の4文字のみ受付（小文字などが混ざっている場合はエラー）
    if (rawInput !== typeInput || !/^[A-Z]{4}$/.test(rawInput)) {
        alert("大文字の半角英字4文字で入力してください（例: ENFP）");
        return;
    }

    // 2. 定められた16種類のMBTIタイプであるかチェック
    // （mbtiNicknames に定義されている16個のキーに存在するか）
    if (!mbtiNicknames[typeInput]) {
        alert("実在する16種類のMBTIタイプのいずれかを入力してください（例: ENFP）");
        return;
    }

    currentType = typeInput;
    showPage(`page-q0`);
    checkPageComplete(); // 初期チェック
}

// ページ遷移
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function getSelectedAnswers(pageIndex) {
    const startIdx = pageIndex * questionsPerPage;
    const endIdx = Math.min(startIdx + questionsPerPage, questions.length);
    let allAnswered = true;

    for (let j = startIdx; j < endIdx; j++) {
        const qId = questions[j].id;
        const selected = document.querySelector(`input[name="${qId}"]:checked`);
        if (selected) {
            answers[qId] = parseInt(selected.value);
        } else {
            allAnswered = false;
        }
    }
    return allAnswered;
}

function nextPage() {
    if (!getSelectedAnswers(currentPageIndex)) {
        return;
    }
    currentPageIndex++;
    showPage(`page-q${currentPageIndex}`);
    checkPageComplete();
    window.scrollTo(0, 0);
}

function prevPage() {
    currentPageIndex--;
    showPage(`page-q${currentPageIndex}`);
    checkPageComplete();
    window.scrollTo(0, 0);
}

// 結果の計算と表示
function finishTest() {
    if (!getSelectedAnswers(currentPageIndex)) {
        return;
    }

    // スコア計算
    let smScore = 0; // S/M スコア (高いほどS)
    let ldScore = 0; // L/D スコア (高いほどL)

    questions.forEach(q => {
        // reverseがtrueなら点数を反転 (1〜7の反転は、8から引くことで計算可能。例: 8 - 7 = 1)
        let score = q.reverse ? (8 - answers[q.id]) : answers[q.id];

        // dummyがtrueなら、どの選択肢を選んでも中間の点数（4点）にする
        if (q.dummy) {
            score = 4;
        }

        if (q.layer === 'SM') {
            smScore += score;
        } else if (q.layer === 'LD') {
            ldScore += score;
        }
    });

    // 平均値に基づいて分類 (1〜7の7段階評価なので、中央値は4)
    const smThreshold = (10 * 4); // 10問 * 中間値4 = 40
    const ldThreshold = (9 * 4);  // 9問 * 中間値4 = 36

    const isS = smScore >= smThreshold;
    const isL = ldScore >= ldThreshold;

    let resultKey = '';
    resultKey += isS ? 'S' : 'M';
    resultKey += isL ? 'L' : 'D';

    showResultEffect(resultKey);
}

// 演出効果
function showResultEffect(resultKey) {
    showPage('page-result');
    window.scrollTo(0, 0);

    const calcDiv = document.getElementById('calculating');
    const glitchContainer = document.getElementById('glitch-text');
    const initialGlitch = glitchContainer.querySelector('.glitch');
    const finalResult = document.getElementById('final-result');

    const attrData = classAttributes[resultKey];

    // 1. 最初は入力されたMBTIを表示
    initialGlitch.textContent = currentType;
    initialGlitch.setAttribute('data-text', currentType);

    // 2. CSS変数をJavaScriptから更新してグリッチの色を変える
    document.documentElement.style.setProperty('--glitch-color1', attrData.glitchColor1);
    document.documentElement.style.setProperty('--glitch-color2', attrData.glitchColor2);

    setTimeout(() => {
        calcDiv.style.display = 'none';
        glitchContainer.style.display = 'block';

        // グリッチ演出後、最終結果表示
        setTimeout(() => {
            glitchContainer.style.display = 'none';

            // 値のセット
            const className = `${currentType}-${attrData.suffix}`;
            document.getElementById('res-class').textContent = className;
            document.getElementById('res-class').style.color = attrData.color;

            // 二つ名の同期処理
            const nickname = mbtiNicknames[currentType] || "未知なる者";
            document.getElementById('res-attr').textContent = attrData.name.replace('XX', nickname);

            // 詳細テキストの同期処理 (すでにHTMLとしてフォーマット済み)
            document.getElementById('res-desc').innerHTML = attrData.description;

            // スクロール時のフェードインアニメーション処理をセットアップ
            const detailSections = document.querySelectorAll('#res-desc .detail-section');
            detailSections.forEach(section => {
                section.classList.add('fade-in'); // 初期状態のフェードインクラスを付与
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    // 要素が画面に少し（10%）見えたら visible クラスを付与
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1 
            });

            // 全セクションを監視対象に追加
            detailSections.forEach(section => observer.observe(section));

            // 画像とオーラ背景のセット
            const imageSrc = mbtiImages[currentType] || fallbackImg;
            document.getElementById('res-image').src = imageSrc;
            document.getElementById('aura-bg').style.background = `radial-gradient(circle at center, rgba(${attrData.auraRGB}, 0.8) 0%, rgba(${attrData.auraRGB}, 0) 70%)`;

            finalResult.style.display = 'flex';
        }, 3000); // 3秒間グリッチ

    }, 1500); // 1.5秒間「解析中...」を表示
}

// 初期化実行
document.addEventListener('DOMContentLoaded', init);
