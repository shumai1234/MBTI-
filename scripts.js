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
    { id: 'q1', text: "デートの行き先や食事のメニューは、自分から提案して決めたい。", layer: 'SM' },
    { id: 'q2', text: "グループで意見が割れた時、最終的に「こうしよう」とまとめ役を買って出ることが多い。", layer: 'SM' },
    { id: 'q3', text: "相手に「何でもいいよ、任せる」と言われると、自分がリードできるので楽だと感じる。", layer: 'SM' },
    { id: 'q4', text: "自分のこだわりやマイルールを、パートナーや友人にも尊重してほしい。", layer: 'SM' },
    { id: 'q5', text: "喧嘩をした時、自分から話し合いの場を設け、解決の主導権を握ろうとする。", layer: 'SM' },
    { id: 'q6', text: "会話の主導権は自分が握り、自分の話を楽しそうに聞いてほしい。", layer: 'SM' },
    { id: 'q7', text: "仕事やプロジェクトでは、指示を待つより自分で方針を決めて進めたい。", layer: 'SM' },
    { id: 'q8', text: "相手に「頼りがいがある」と言われるのが、何よりの褒め言葉だ。", layer: 'SM' },
    { id: 'q9', text: "欲しいものは、手段を選ばず自分から掴み取りに行きたい。", layer: 'SM' },
    { id: 'q10', text: "周囲の空気を読むより、自分の意志を通すことの方が大切だと思う。", layer: 'SM' },

    // Layer 3: 愛着スタイル軸 (L/D)
    { id: 'q11', text: "相手が今何をしているか、誰といるかを常に把握しておきたい。", layer: 'LD' },
    { id: 'q12', text: "「一人で過ごす時間」よりも「誰かと共有する時間」の方が圧倒的に安心する。", layer: 'LD' },
    { id: 'q13', text: "相手に拒絶されるのが怖くて、つい顔色を伺って尽くしすぎてしまう。", layer: 'LD' },
    { id: 'q14', text: "深い悩みは一人で抱えず、誰かに話して共感してもらうことで解消したい。", layer: 'LD' },
    { id: 'q15', text: "パートナーとは、隠し事のない「一心同体」のような関係が理想だ。", layer: 'LD' },
    { id: 'q16', text: "相手が急に冷たくなったと感じると、必死に繋ぎ止めようとしてしまう。", layer: 'LD' },
    { id: 'q17', text: "記念日やイベントは、二人で盛大にお祝いして絆を確かめ合いたい。", layer: 'LD' },
    { id: 'q18', text: "常に「愛されている」という言葉や態度による確認が欲しい。", layer: 'LD' },
    { id: 'q19', text: "孤独を感じやすく、誰にも必要とされていないと感じると耐えられない。", layer: 'LD' }
];

// 状態管理
let currentType = "";
let answers = {};
let currentPageIndex = 0;
const questionsPerPage = 5;

// クラス・属性の定義
const classAttributes = {
    'SL': { suffix: 'SL', name: '情熱のXX', color: 'var(--acc-sl)', glitchColor1: '#FF4B2B', glitchColor2: '#FFA07A' },
    'SD': { suffix: 'SD', name: '孤高のXX', color: 'var(--acc-sd)', glitchColor1: '#00D2FF', glitchColor2: '#3A7BD5' },
    'ML': { suffix: 'ML', name: '献身のXX', color: 'var(--acc-ml)', glitchColor1: '#A8FF78', glitchColor2: '#78ffd6' },
    'MD': { suffix: 'MD', name: '淡白なXX', color: 'var(--acc-md)', glitchColor1: '#8E2DE2', glitchColor2: '#4A00E0' }
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
                <h2 class="class-title" id="res-class">XXXX-XX</h2>
                <div class="attribute-title" id="res-attr">属性のXX</div>
                <div class="detail-box">
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
    const typeInput = document.getElementById('mbti-type').value.trim().toUpperCase();
    if (typeInput.length !== 4) {
        alert("MBTIを正しく入力してください（例: ENFP）");
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
        if (q.layer === 'SM') {
            smScore += answers[q.id];
        } else if (q.layer === 'LD') {
            ldScore += answers[q.id];
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

            finalResult.style.display = 'flex';
        }, 3000); // 3秒間グリッチ

    }, 1500); // 1.5秒間「解析中...」を表示
}

// 初期化実行
document.addEventListener('DOMContentLoaded', init);
