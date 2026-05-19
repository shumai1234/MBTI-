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
                <p>積極的で人懐っこいSL型は、とにかく行動力とコミュ力がバグってる!人が大好きで生粋の<strong>陽キャ傾向</strong>があるらしい。</p>
                <p>自分ならできる!と考える自信家で、基本的には<strong>理想主義者</strong>が多いんだ。ただし、情緒は意外と不安定らしいぞ。</p>
            </div>
            <div class="detail-section">
                <h4>2. おすすめキャリア</h4>
                <p>行動力と高い対人力を生かしたキャリア</p>
                <p>適職例： 起業家、営業、政治家。<br>組織の「顔」として立ち、ビジョンを語ることで、関わる人々の能力を最大化させます。あなたは「ナポレオン」と似た資質を持っているよ。</p>
            </div>
            <div class="detail-section">
                <h4>3. 恋愛・人間関係</h4>
                <p><strong>THEロマンチスト</strong>。<br>単に一緒にいるだけでなく、心の奥底で深く繋がっている実感を求めます。なんならハグだけじゃ足りなくて恋人の体の中に入りたいなんて思ったりしたことはない？</p>
                <p>しかし、その愛情が深まるほど、相手のすべてを理解し、すべてを共有したいという欲求が強まります。つまり<strong>メンヘラ</strong>としての側面もあるんだ。愛が重くて人情に厚いあなたは、優しすぎた、尽くしすぎた故に振られた経験なんてあったりしない？</p>
            </div>
            <div class="detail-section">
                <h4>4. あなたは何者なのか</h4>
                <p>あなたは何事にも興味津々で、人が大好きな優しい人格者です。</p>
                <p>しかし、あなたの純粋な情熱は、時に他人にとっては大きすぎることもあるかもしれません。自分の注いだ愛や熱量に対して期待通りの反応が返ってこないと、あなたは<strong>ひどい不安</strong>に駆られてしまうでしょう。</p>
                <p>そんなあなたは、その圧倒的なエネルギーを、心の底から自分に向き合い、自分自身のために使えたとき、あなたは本当の意味で、人々に希望を与える不変の太陽になれるでしょう。</p>
            </div>
        `
    },
    'SD': {
        suffix: 'SD', name: '孤高のXX', color: 'var(--acc-sd)', glitchColor1: '#00D2FF', glitchColor2: '#3A7BD5', auraRGB: '0, 210, 255',
        description: `
            <h3 class="detail-subtitle">「己の道を究める、職人気質」</h3>
            <div class="detail-section">
                <h4>1. 基本情報：圧倒的な個の力</h4>
                <p>あなたは、<strong>集団が嫌い</strong>です。他人に過度に干渉され、ひどく嫌悪感を感じた経験はないでしょうか？</p>
                <p>しかし、それと同時に実は<strong>自信家</strong>でもあります。人に能力を見せびらかすことはほとんどありませんが、探求心はとても強いタイプです。</p>
            </div>
            <div class="detail-section">
                <h4>2. おすすめキャリア</h4>
                <p>高い好奇心と集中力をいかしたキャリア</p>
                <p>適職例：研究者、経営コンサルタント、投資家。<br>馴れ合いを必要とせず、結果だけで周囲を黙らせる<strong>圧倒的実力主義</strong>の世界で最も輝くのです。</p>
            </div>
            <div class="detail-section">
                <h4>3. 恋愛・人間関係</h4>
                <p>まず初めに、<strong>あなたは恋愛に向いていません</strong>。そもそも1対1での濃密な関係などあまり望みません。しかし、その落ち着いた恋愛のスタイルは若いうちではなく、大人になってから真価を発揮するでしょう。</p>
            </div>
            <div class="detail-section">
                <h4>4. あなたは何者なのか</h4>
                <p>まず、あなたはとても珍しいタイプで、<strong>全人口の7パーセント</strong>しかいません。誇ってください。</p>
                <p>そんなあなたは、いつもどこか自分自身を客観視してしまっている傾向もあります。ここまで聞くと周りから愛されない冷たい人のように思われますが、<strong>実はあなたは周りから最も愛されているタイプの一人</strong>でもあるのです。</p>
                <p>言われてみれば友達からも異性からも頼りにされている気もしませんか？そうです。世の中は少数派のあなたをしっかりと必要としているのですよ。</p>
            </div>
        `
    },
    'ML': {
        suffix: 'ML', name: '献身のXX', color: 'var(--acc-ml)', glitchColor1: '#A8FF78', glitchColor2: '#78ffd6', auraRGB: '168, 255, 120',
        description: `
            <h3 class="detail-subtitle">「愛想笑いの名人」</h3>
            <div class="detail-section">
                <h4>1. 基本情報：思いやりの塊</h4>
                <p>あなたはぶっちゃけ<strong>八方美人</strong>ではありませんか？。</p>
                <p>まず初めに、あなたの優しさは紛れもない本物です。組織には必要不可欠な存在なのです。では、あなたについて以下で詳しく見ていきましょう。</p>
            </div>
            <div class="detail-section">
                <h4>2. おすすめキャリア</h4>
                <p>人の笑顔と調和を作り出す天才</p>
                <p>適職例：カウンセラー、医療・福祉職、お笑い芸人。<br>数値や効率だけでは測れないもの、そう<strong>心を満たす職業</strong>があなたにはぴったりです。形はいろいろ。とにかく、人に喜ばれる感謝される職業が最適です</p>
            </div>
            <div class="detail-section">
                <h4>3. 恋愛・人間関係</h4>
                <p>あなたの恋愛におけるキーワードは、<strong>「パートナーの幸せこそが私の幸せ」</strong>というものです。あなたは、恋愛や人間関係において過度に目立つとはしません。あくまで他者をサポートすることを得意としています</p>
                <p>しかし、その思いが強すぎる結果、恋愛では<strong>いい人どまり</strong>になったり、<strong>浮気をされた</strong>経験を持つ人も少なくないはずです。大丈夫です。いつかあなたを心の底から認めてくれる人は年を重ねれば必ず現れます。</p>
            </div>
            <div class="detail-section">
                <h4>5. あなたは何者なのか</h4>
                <p>あなたは、すべてのタイプの中で<strong>最も善人</strong>だと言えます。しかし、あなた自身はいい人と呼ばれることに本当だろうかと疑問を抱いたりもしていませんか？</p>
                <p>安心してください。あなたは<strong>本当に愛にあふれた情の厚い人物だと証明されています</strong>。あなたは時折、自己肯定感が下がってしまうこともあるそうです。そんな時は、ぜひこの診断に戻ってきてくださいね！</p>
            </div>
        `
    },
    'MD': {
        suffix: 'MD', name: '淡白なXX', color: 'var(--acc-md)', glitchColor1: '#8E2DE2', glitchColor2: '#4A00E0', auraRGB: '142, 45, 226',
        description: `
            <h3 class="detail-subtitle">「自由を愛する現実主義者」</h3>
            <div class="detail-section">
                <h4>1. 基本情報：理想よりも現実</h4>
                <p>あなたは周りを見たとき、周囲の人は生き急いでいるなと感じたことはありませんか？</p>
                <p>あなたは、基本的に冷静でかつ<strong>他者との一定の距離間を保つ</strong>ことを好む傾向があります。そんなあなたについて以下で紐解いていきましょう</p>
            </div>
            <div class="detail-section">
                <h4>2. おすすめキャリア</h4>
                <p>あなたたちは全タイプの中で最も落ち着いた感性を持っています</p>
                <p>適職例： 料理人、芸術家、学校の先生</p>
            </div>
            <div class="detail-section">
                <h4>3. 恋愛・人間関係</h4>
                <p><strong>来るもの拒まず、去る者追わず</strong>という言葉はまさにあなた達のためにある言葉といえるでしょう。</p>
                <p>人間関係においても自立を重視し、交友関係が広いわけではありませんが、一度心を許した相手とは関係性が長く続く傾向もあります。</p>
            </div>
            <div class="detail-section">
                <h4>4. あなたは何者なのか</h4>
                <p>あなた達はとても変わっています。あなたは何者なのかという問いにたいして、「いや、人間だろ」といった面白味のない回答が画面越しにも聞こえてくるほどです。</p>
                <p>しかし、そんな少し変わった思考を持っているあなたたちはなぜか<strong>人を惹きつける魅力</strong>も持ち合わせています。だからこそ、一度その沼にはまった人はあなたから離れられなくなり、密度の濃い関係を築けるのです。</p>
                <p>無理をする必要はありません。気楽さや落ち着きがあなたの最大の魅力であり、武器でもあるのです。</p>
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
                <div id="mbti-error" class="error-message" style="display: none;"></div>
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
                            <label class="circle-label size-lg color-green">
                                <input type="radio" name="${q.id}" value="7">
                                <span class="circle-bg circle-bg-green"></span>
                            </label>
                            <label class="circle-label size-md color-green">
                                <input type="radio" name="${q.id}" value="6">
                                <span class="circle-bg circle-bg-green"></span>
                            </label>
                            <label class="circle-label size-sm color-green">
                                <input type="radio" name="${q.id}" value="5">
                                <span class="circle-bg circle-bg-green"></span>
                            </label>
                            
                            <label class="circle-label size-xs color-gray">
                                <input type="radio" name="${q.id}" value="4">
                                <span class="circle-bg circle-bg-gray"></span>
                            </label>
                            
                            <label class="circle-label size-sm color-purple">
                                <input type="radio" name="${q.id}" value="3">
                                <span class="circle-bg circle-bg-purple"></span>
                            </label>
                            <label class="circle-label size-md color-purple">
                                <input type="radio" name="${q.id}" value="2">
                                <span class="circle-bg circle-bg-purple"></span>
                            </label>
                            <label class="circle-label size-lg color-purple">
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
                
                <!-- SNSシェア用のモックアップ -->
                <div id="share-ui-mockup" class="share-ui-mockup">
                    <h3>この結果をシェアする</h3>
                    <div class="share-card">
                        <img id="share-image" src="" alt="タイプ画像" class="share-type-image">
                        <div class="share-info">
                            <h4 id="share-class" class="share-class-title">XXXX-XX</h4>
                            <p id="share-attr">属性のXX</p>
                        </div>
                    </div>
                    <div class="share-buttons">
                        <button class="share-btn btn-x" id="btn-share-x">X (Twitter)</button>
                        <button class="share-btn btn-insta" id="btn-share-other">Instagram / LINE等</button>
                    </div>
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
    const errorDiv = document.getElementById('mbti-error');

    // エラー表示を一旦隠す
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';

    // 1. 大文字の4文字のみ受付（小文字などが混ざっている場合はエラー）
    if (rawInput !== typeInput || !/^[A-Z]{4}$/.test(rawInput)) {
        showError("大文字の半角英字4文字で入力してください（例: ENFP）");
        return;
    }

    // 2. 定められた16種類のMBTIタイプであるかチェック
    if (!mbtiNicknames[typeInput]) {
        showError("実在する16種類のMBTIタイプのいずれかを入力してください（例: ENFP）");
        return;
    }

    currentType = typeInput;
    showPage(`page-q0`);
    checkPageComplete(); // 初期チェック
}

function showError(message) {
    const errorDiv = document.getElementById('mbti-error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    // エラー時に少し揺れるアニメーションを追加して気付きやすくする
    errorDiv.classList.remove('shake');
    void errorDiv.offsetWidth; // アニメーションのリセット用ハック
    errorDiv.classList.add('shake');
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
            // html2canvas向けに、var()ではなく純粋なHexカラーを直接指定します
            document.getElementById('res-class').style.color = attrData.glitchColor1;

            // 二つ名の同期処理
            const nickname = mbtiNicknames[currentType] || "未知なる者";
            document.getElementById('res-attr').textContent = attrData.name.replace('XX', nickname);

            // 詳細テキストの同期処理 (すでにHTMLとしてフォーマット済み)
            document.getElementById('res-desc').innerHTML = attrData.description;

            // シェアUIの同期処理
            document.getElementById('share-class').textContent = className;
            // ここもhtml2canvasで色が消えないようにHexカラーを使用
            document.getElementById('share-class').style.color = attrData.glitchColor1;
            document.getElementById('share-attr').textContent = attrData.name.replace('XX', nickname);

            // X共有ボタンにイベントをセット
            document.getElementById('btn-share-x').onclick = () => shareOnX(className);

            // その他の共有ボタン(Web Share API)にイベントをセット
            document.getElementById('btn-share-other').onclick = () => shareSite(className);

            // 画像は後でres-imageと一緒にセットする

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
            document.getElementById('share-image').src = imageSrc; // シェア用画像も同期
            document.getElementById('aura-bg').style.background = `radial-gradient(circle at center, rgba(${attrData.auraRGB}, 0.8) 0%, rgba(${attrData.auraRGB}, 0) 70%)`;

            finalResult.style.display = 'flex';
        }, 3000); // 3秒間グリッチ

    }, 1500); // 1.5秒間「解析中...」を表示
}

// 初期化実行
document.addEventListener('DOMContentLoaded', init);

// X(Twitter)共有機能
function shareOnX(resultType) {
    const text = `私の診断結果は「${resultType}」でした！\n16type++ - 16タイプのその先へ。`;
    const url = "https://shumai1234.github.io/MBTI-/"; // サイトのURL
    const hashtags = "16typePlusPlus,自己分析,MBTI,16タイププラス";

    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;

    window.open(xUrl, '_blank');
}

// Instagram・LINEなどその他の共有機能 (Web Share API)
async function shareSite(resultType) {
    if (navigator.share) {
        try {
            await navigator.share({
                title: '16type++',
                text: `私の診断結果は「${resultType}」でした！\n16type++ - 16タイプのその先へ。`, // 共有時のテキスト
                url: 'https://shumai1234.github.io/MBTI-/',
            });
        } catch (error) {
            console.log('共有に失敗しました', error);
        }
    } else {
        // Web Share API非対応ブラウザ（PCなど）の場合は、html2canvasで画像をダウンロードする
        downloadResultImage(resultType);
    }
}

// PCなどで画像をダウンロードする機能
function downloadResultImage(resultType) {
    // シェア用のカード部分（画像やタイプ名が表示されている四角い枠）を画像化します
    const targetElement = document.querySelector('.share-card');

    // もしhtml2canvasが読み込まれていない場合はエラーを出す
    if (typeof html2canvas === 'undefined') {
        alert('画像生成の準備ができませんでした。少し待ってから再試行してください。');
        return;
    }

    // html2canvasを使って対象要素を画像（Canvas）に変換する
    html2canvas(targetElement, {
        backgroundColor: '#0A0A0A', // 背景を暗く設定して透明になるのを防ぐ
        scale: 2, // 高画質化
        useCORS: true // 外部サーバー(GitHub Pages等)で公開した際に画像が真っ白になる現象を防止
    }).then(canvas => {
        // 画像のURLを取得して、ダウンロードさせる
        const link = document.createElement('a');
        link.download = `16type_result_${resultType}.png`;
        link.href = canvas.toDataURL('image/png');

        // 疑似的にリンクをクリックしてダウンロードを発火
        link.click();
    }).catch(error => {
        console.error('画像の保存に失敗しました', error);
        alert('画像の保存時にエラーが発生しました。');
    });
}
