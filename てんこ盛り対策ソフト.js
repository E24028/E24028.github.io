    // --- グローバル変数 & フォールバックデータ定義 ---
    let soundEnabled = true;
    let stats = {
      tested: 0,
      correct: 0,
      highscore: 0
    };

    // 公民甲の定義問題
    const civicsQuestions = [
      {
        q: "国家が国民に強制する力であり、国内のルール統一や秩序確保、公的サービス提供に不可欠なものは何か？",
        choices: ["基本的人権", "国家権力", "立憲主義", "法の支配"],
        ans: 1,
        detail: "スライド2 p.2「国家権力＝国家が国民に強制する力」より。"
      },
      {
        q: "すべての国民が決定に参加するべきだという政治制度や考え方を何というか？",
        choices: ["民主主義", "全体主義", "立憲主義", "人権保障"],
        ans: 0,
        detail: "スライド2 p.3「民主主義：すべての国民が決定に参加するべきだという考え」より。"
      },
      {
        q: "多数決の限界（独裁の発生、少数の権利侵害など）を防ぐため、憲法で国家権力を制限する考え方を何というか？",
        choices: ["法の支配", "法治主義", "国家主義", "立憲主義"],
        ans: 3,
        detail: "スライド2 p.4「立憲主義＝憲法によって、国家権力の濫用を防ぐ考え方」より。"
      },
      {
        q: "18世紀後半（アメリカ独立宣言、フランス人権宣言）に主に確立された、近代人権の根幹となる2つの権利は何か？",
        choices: ["自由権・社会権", "平等権・社会権", "自由権・平等権", "参政権・請求権"],
        ans: 2,
        detail: "スライド2 p.6「18世紀後半：アメリカ独立宣言、フランス人権宣言 ⇒ 自由権や平等権の確立」より。"
      },
      {
        q: "20世紀前半に制定されたドイツの憲法で、世界で初めて「社会権」を保障した画期的な憲法は何か？",
        choices: ["大日本帝国憲法", "ワイマール憲法", "フランス人権宣言", "アメリカ合衆国憲法"],
        ans: 1,
        detail: "スライド2 p.6「20世紀前半：ワイマール憲法 ⇒ 社会権の確立」より。"
      },
      {
        q: "平等・明確なルールに基づいて権力を行使する「法の支配」の対義語で、権力者の都合のいい法や意向で支配することを何というか？",
        choices: ["法治主義", "立憲主義", "民主主義", "人の支配"],
        ans: 3,
        detail: "スライド2 p.7「人の支配：権力者に都合の良い法によって権力行使」より。"
      }
    ];

    // 物理のスライド問題
    const physicsQuestions = [
      {
        q: "「速さは変化せず、向きだけが変化する運動」の例として最も適しているものはどれか？",
        choices: ["一定速度で回る観覧車", "まっすぐ離着陸する飛行機", "ジェットコースター", "転がるボウリングの玉"],
        ans: 0,
        detail: "スライド2 p.1「②向きだけが変化する運動：例)観覧車」より。"
      },
      {
        q: "一定時間内の動きを平均的に捉え、一定の速さで動き続けたとみなした速さを何というか？",
        choices: ["瞬間の速さ", "平均の速さ", "初速度", "合成速度"],
        ans: 1,
        detail: "スライド2 p.3「平均の速さ：物体がある時間の間、一定の速さで動き続けたとみなした速さ」より。"
      },
      {
        q: "速度と速さの違いについて、正しい説明はどれか？",
        choices: ["速度は速さと同じ意味である", "速度は向きを考慮せず、速さは向きを考慮する", "速度は大きさのほかに運動の「向き」も含み、符号(+,-)等で表す", "速さには単位があるが速度にはない"],
        ans: 2,
        detail: "スライド2 p.4「向きは正負の符号で表す。速さ: 12 m/s, 速度: -12 m/s」より。"
      },
      {
        q: "台車やボールに一定の力が運動の向きにはたらき続けるとき、その運動の様子はどうなるか？",
        choices: ["だんだん遅くなる", "等速直線運動を続ける", "速さがしだいに増していく（加速する）", "向きが急に変わる"],
        ans: 2,
        detail: "スライド2 p.5「台車には運動の向きに力がはたらき続けている。速さがしだいに増していく！」より。"
      },
      {
        q: "斜面を下る運動において、斜面を急にすると「時間と速さの関係(v-t)」グラフの傾きはどうなるか？",
        choices: ["傾きが大きくなる", "傾きが小さくなる", "傾きは変化しない", "曲線になる"],
        ans: 0,
        detail: "スライド2 p.7「(a)時間と速さの関係：斜面が急なときは傾きが大きい」より。"
      }
    ];

    // --- Web Audio API を使ったゲーム効果音シンセサイザー ---
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function initAudio() {
      if (!audioCtx) {
        audioCtx = new AudioCtx();
      }
    }

    function playSound(type) {
      if (!soundEnabled) return;
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'correct') {
        // ピキーン！
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.15); // C6
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'incorrect') {
        // ブブー
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(130, now + 0.3);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'levelUp') {
        // トゥルルルン！
        const freqs = [261.63, 329.63, 392.00, 523.25];
        freqs.forEach((f, i) => {
          const singleOsc = audioCtx.createOscillator();
          const singleGain = audioCtx.createGain();
          singleOsc.connect(singleGain);
          singleGain.connect(audioCtx.destination);
          
          singleOsc.type = 'triangle';
          singleOsc.frequency.setValueAtTime(f, now + i * 0.08);
          singleGain.gain.setValueAtTime(0.15, now + i * 0.08);
          singleGain.gain.linearRampToValueAtTime(0.01, now + i * 0.08 + 0.3);
          
          singleOsc.start(now + i * 0.08);
          singleOsc.stop(now + i * 0.08 + 0.3);
        });
      }
    }

    function toggleSound() {
      soundEnabled = !soundEnabled;
      const onIcon = document.getElementById('soundOnIcon');
      const offIcon = document.getElementById('soundOffIcon');
      if (soundEnabled) {
        onIcon.classList.remove('hidden');
        offIcon.classList.add('hidden');
        initAudio();
      } else {
        onIcon.classList.add('hidden');
        offIcon.classList.remove('hidden');
      }
    }

    // --- 音声合成 (読み上げ) ---
    function speakText(text) {
      if (!soundEnabled) return;
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ja-JP';
        u.rate = 1.0;
        window.speechSynthesis.speak(u);
      }
    }

    // --- タブ切り替え ---
    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.getElementById('tab-' + tabId).classList.remove('hidden');

      // ナビゲーションアクティブ管理
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.className = 'tab-btn px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 text-slate-200 hover:bg-slate-800';
      });
      document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
        btn.classList.replace('text-indigo-400', 'text-slate-400');
        btn.classList.replace('text-white', 'text-slate-400');
      });

      const deskBtn = document.getElementById('btn-' + tabId);
      const mobBtn = document.getElementById('m-btn-' + tabId);

      if (deskBtn) {
        if (tabId === 'test') {
          deskBtn.className = 'tab-btn px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 bg-brand-600 hover:bg-brand-500 text-white shadow-sm';
        } else {
          deskBtn.className = 'tab-btn px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 bg-slate-800 text-white shadow-sm';
        }
      }
      if (mobBtn) {
        mobBtn.classList.replace('text-slate-400', 'text-indigo-400');
      }

      // 物理タブの場合、シミュレーションのリセット
      if (tabId === 'physics') {
        setTimeout(() => {
          resetPhysicsSimulation();
        }, 100);
      }
    }

    // --- ローカルストレージデータの読み出し ---
    function loadStats() {
      const stored = localStorage.getItem('tenkomori_stats');
      if (stored) {
        stats = JSON.parse(stored);
      }
      updateStatsUI();
    }

    function saveStats() {
      localStorage.setItem('tenkomori_stats', JSON.stringify(stats));
      updateStatsUI();
    }

    function updateStatsUI() {
      document.getElementById('stat-kanji-count').innerText = data.length;
      document.getElementById('stat-tested-count').innerText = stats.tested;
      const rate = stats.tested > 0 ? Math.round((stats.correct / stats.tested) * 100) : 0;
      document.getElementById('stat-correct-rate').innerText = rate + '%';
      document.getElementById('stat-highscore').innerText = stats.highscore > 0 ? stats.highscore + '点' : 'なし';
    }


    // ================= 漢字コンクール 処理 =================

    function initKanji() {
      document.getElementById('kanjiTotalCount').innerText = data.length;

      // フィルタ用に級のセレクトボックスを初期化
      const grades = [...new Set(data.map(item => {
        // e.g. "準2-13-11" -> "準2" もしくは "-13" までのセグメント
        const match = item.grade.match(/^([^-]+-[^-]+)/);
        return match ? match[1] : item.grade.split('-')[0];
      }))].sort();

      const select = document.getElementById('kanjiGradeFilter');
      grades.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g;
        opt.innerText = g + ' 級/回グループ';
        select.appendChild(opt);
      });

      renderKanjiList(data);
      updateStatsUI();
    }

    function renderKanjiList(items) {
      const listEl = document.getElementById('kanjiList');
      listEl.innerHTML = '';
      document.getElementById('kanjiFilteredCount').innerText = items.length;

      items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = "bg-white p-3 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-brand-500 hover:shadow transition flex justify-between items-center";
        card.onclick = () => loadSingleKanjiToPractice(item);

        card.innerHTML = `
          <div class="flex-1 min-w-0">
            <span class="inline-block bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded mb-1">${item.grade}</span>
            <p class="text-xs font-medium text-slate-800 truncate">${item.q}</p>
          </div>
          <div class="text-right ml-2 flex-shrink-0">
            <span class="block text-xs font-bold text-slate-400">答え</span>
            <span class="block text-sm font-black text-slate-800">${item.s}</span>
          </div>
        `;
        listEl.appendChild(card);
      });
    }

    function filterKanji() {
      const query = document.getElementById('kanjiSearch').value.trim();
      const gradeVal = document.getElementById('kanjiGradeFilter').value;

      let filtered = data;

      if (gradeVal !== 'all') {
        filtered = filtered.filter(item => item.grade.startsWith(gradeVal));
      }

      if (query) {
        filtered = filtered.filter(item => {
          return item.q.includes(query) || item.d.includes(query) || item.s.includes(query);
        });
      }

      renderKanjiList(filtered);
    }

    // 単体の漢字を特訓パネルにロード
    function loadSingleKanjiToPractice(item) {
      document.getElementById('kanjiPlaceholder').classList.add('hidden');
      document.getElementById('kanjiQuizArea').classList.remove('hidden');

      // 単発練習モードの表示設定
      document.getElementById('kanjiQuizProgress').innerText = "個別トレーニング";
      document.getElementById('kanjiQuizGrade').innerText = item.grade;
      document.getElementById('kanjiQuizQuestion').innerText = item.q;
      document.getElementById('kanjiQuizHint').innerText = "ヒント (読み): " + item.d;
      document.getElementById('kanjiQuizHint').classList.remove('hidden');

      // 入力フォームクリア
      document.getElementById('kanjiAnswerInput').value = '';
      document.getElementById('kanjiAnswerInput').focus();
      document.getElementById('kanjiFeedback').classList.add('hidden');

      // 判定用の回答を保存
      currentKanjiQuizItem = item;
      currentKanjiPracticeType = 'write'; // 個別は基本書き取り判定
      isContinuousQuiz = false;
    }


    // --- 漢字特訓テストセッション ---
    let kanjiSessionQuestions = [];
    let kanjiSessionIndex = 0;
    let currentKanjiQuizItem = null;
    let currentKanjiPracticeType = 'write'; // 'write' or 'read'
    let isContinuousQuiz = false;

    function startKanjiPractice(type) {
      currentKanjiPracticeType = type;
      isContinuousQuiz = true;

      // ランダムに10個抽出
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      kanjiSessionQuestions = shuffled.slice(0, 10);
      kanjiSessionIndex = 0;

      document.getElementById('kanjiPlaceholder').classList.add('hidden');
      document.getElementById('kanjiQuizArea').classList.remove('hidden');

      loadKanjiSessionQuestion();
    }

    function loadKanjiSessionQuestion() {
      currentKanjiQuizItem = kanjiSessionQuestions[kanjiSessionIndex];

      document.getElementById('kanjiQuizProgress').innerText = `問題 ${kanjiSessionIndex + 1} / ${kanjiSessionQuestions.length}`;
      document.getElementById('kanjiQuizGrade').innerText = currentKanjiQuizItem.grade;

      // クイズ形式による表示切り替え
      if (currentKanjiPracticeType === 'write') {
        // 書き取りクイズ: ヒントに「読み」を表示
        document.getElementById('kanjiQuizQuestion').innerText = currentKanjiQuizItem.q;
        document.getElementById('kanjiQuizHint').innerText = "ヒント (読み): " + currentKanjiQuizItem.d;
        document.getElementById('kanjiQuizHint').classList.remove('hidden');
        document.getElementById('kanjiInputLabel').innerText = "カタカナ部分に当てはまる漢字を入力してください";
      } else {
        // 読みクイズ: ヒントに「漢字」を表示して、読みを当てさせる
        // 例: 「（ 信仰 ）している」のように文章自体に漢字をいれたものを出す
        const solvedSentence = currentKanjiQuizItem.q.replace(/（\s*）|（　　）/, `（ ${currentKanjiQuizItem.s} ）`);
        document.getElementById('kanjiQuizQuestion').innerText = solvedSentence;
        document.getElementById('kanjiQuizHint').innerText = "ヒント: 送り仮名に注意して「読み」を入力";
        document.getElementById('kanjiQuizHint').classList.remove('hidden');
        document.getElementById('kanjiInputLabel').innerText = "（　）内の漢字の「よみがな」を全角カタカナで入力してください";
      }

      document.getElementById('kanjiAnswerInput').value = '';
      document.getElementById('kanjiAnswerInput').focus();
      document.getElementById('kanjiFeedback').classList.add('hidden');
    }

    function submitKanjiAnswer() {
      const userAns = document.getElementById('kanjiAnswerInput').value.trim();
      if (!userAns) return;

      let isCorrect = false;
      const feedbackEl = document.getElementById('kanjiFeedback');
      const fIcon = document.getElementById('kanjiFeedbackIcon');
      const fTitle = document.getElementById('kanjiFeedbackTitle');
      const fDetail = document.getElementById('kanjiFeedbackDetail');

      stats.tested++;

      if (currentKanjiPracticeType === 'write') {
        // 書き取り: 漢字を照合
        if (userAns === currentKanjiQuizItem.s) {
          isCorrect = true;
        }
      } else {
        // 読み: カタカナを照合 (平仮名入力でも許容するための簡易カタカナ変換)
        const katakanaAns = toDoubleByteKatakana(userAns);
        if (katakanaAns === currentKanjiQuizItem.d) {
          isCorrect = true;
        }
      }

      if (isCorrect) {
        playSound('correct');
        stats.correct++;
        feedbackEl.className = "p-4 rounded-xl flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-900";
        fIcon.className = "p-2 rounded-full bg-emerald-100 text-emerald-600";
        fIcon.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`;
        fTitle.innerText = "正解！";
        fDetail.innerText = `完璧です。 【 漢字: ${currentKanjiQuizItem.s} | 読み: ${currentKanjiQuizItem.d} 】`;
        // 読み上げ
        speakText(currentKanjiQuizItem.s);
      } else {
        playSound('incorrect');
        feedbackEl.className = "p-4 rounded-xl flex items-center justify-between bg-rose-50 border border-rose-200 text-rose-900";
        fIcon.className = "p-2 rounded-full bg-rose-100 text-rose-600";
        fIcon.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>`;
        fTitle.innerText = "不正解...";
        fDetail.innerText = `正しい解答: 【 漢字: ${currentKanjiQuizItem.s} | 読み: ${currentKanjiQuizItem.d} 】`;
      }

      feedbackEl.classList.remove('hidden');
      saveStats();
    }

    function nextKanjiQuestion() {
      if (!isContinuousQuiz) {
        // 個別練習はそのまま閉じる
        document.getElementById('kanjiQuizArea').classList.add('hidden');
        document.getElementById('kanjiPlaceholder').classList.remove('hidden');
        return;
      }

      kanjiSessionIndex++;
      if (kanjiSessionIndex < kanjiSessionQuestions.length) {
        loadKanjiSessionQuestion();
      } else {
        // 10問終了
        playSound('levelUp');
        document.getElementById('kanjiQuizArea').classList.add('hidden');
        const ph = document.getElementById('kanjiPlaceholder');
        ph.classList.remove('hidden');
        ph.innerHTML = `
          <div class="bg-indigo-50 text-indigo-500 p-6 rounded-full">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-bold text-slate-800">10問特訓が完了しました！</h4>
            <p class="text-sm text-slate-400 max-w-sm mt-1">素晴らしい取り組みです。さらに特訓を重ねるか、公民・物理の学習に進みましょう。</p>
          </div>
          <div class="flex space-x-2">
            <button onclick="startKanjiPractice('write')" class="bg-brand-500 hover:bg-brand-600 text-white text-xs px-4 py-2 rounded-lg font-bold transition">書き取り練習を再開</button>
            <button onclick="startKanjiPractice('read')" class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-4 py-2 rounded-lg font-bold transition">読み練習を再開</button>
          </div>
        `;
      }
    }

    // ひらがな->カタカナ全角変換
    function toDoubleByteKatakana(str) {
      return str.replace(/[\u3041-\u3096]/g, function(match) {
        const chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
      });
    }


    // ================= 公民甲（憲法・政治） 処理 =================

    let civicsIndex = 0;
    let civicsScore = 0;

    function startCivicsQuiz() {
      civicsIndex = 0;
      civicsScore = 0;
      document.getElementById('civicsPlaceholder').classList.add('hidden');
      document.getElementById('civicsQuizContainer').classList.remove('hidden');
      loadCivicsQuestion();
    }

    function loadCivicsQuestion() {
      const q = civicsQuestions[civicsIndex];
      document.getElementById('civicsProgress').innerText = `問題 ${civicsIndex + 1} / ${civicsQuestions.length}`;
      document.getElementById('civicsQuestionText').innerText = q.q;

      const choicesBox = document.getElementById('civicsChoices');
      choicesBox.innerHTML = '';

      q.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = "w-full bg-white hover:bg-slate-50 text-slate-800 font-semibold p-4 rounded-xl border border-slate-200 text-left transition duration-150 flex items-center justify-between";
        btn.onclick = () => submitCivicsAnswer(idx);
        btn.innerHTML = `
          <span>${choice}</span>
          <span class="text-xs text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded">選択肢 ${idx + 1}</span>
        `;
        choicesBox.appendChild(btn);
      });

      document.getElementById('civicsFeedback').classList.add('hidden');
    }

    function submitCivicsAnswer(choiceIdx) {
      const q = civicsQuestions[civicsIndex];
      stats.tested++;

      const feedbackEl = document.getElementById('civicsFeedback');
      const fIcon = document.getElementById('civicsFeedbackIcon');
      const fTitle = document.getElementById('civicsFeedbackTitle');
      const fDetail = document.getElementById('civicsFeedbackDetail');

      const isCorrect = (choiceIdx === q.ans);

      // ボタン選択を無効化
      document.querySelectorAll('#civicsChoices button').forEach(btn => btn.disabled = true);

      if (isCorrect) {
        playSound('correct');
        stats.correct++;
        civicsScore++;
        feedbackEl.className = "p-4 rounded-xl flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-900";
        fIcon.className = "p-2 rounded-full bg-emerald-100 text-emerald-600";
        fIcon.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`;
        fTitle.innerText = "正解！";
      } else {
        playSound('incorrect');
        feedbackEl.className = "p-4 rounded-xl flex items-center justify-between bg-rose-50 border border-rose-200 text-rose-900";
        fIcon.className = "p-2 rounded-full bg-rose-100 text-rose-600";
        fIcon.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>`;
        fTitle.innerText = "不正解...";
      }

      fDetail.innerText = q.detail;
      feedbackEl.classList.remove('hidden');
      saveStats();
    }

    function nextCivicsQuestion() {
      civicsIndex++;
      if (civicsIndex < civicsQuestions.length) {
        loadCivicsQuestion();
      } else {
        playSound('levelUp');
        document.getElementById('civicsQuizContainer').classList.add('hidden');
        const ph = document.getElementById('civicsPlaceholder');
        ph.classList.remove('hidden');
        ph.innerHTML = `
          <svg class="w-12 h-12 mb-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h4 class="font-bold text-slate-800">公民テスト終了！</h4>
          <p class="text-sm text-slate-500 mt-1">あなたの得点: ${civicsScore} / ${civicsQuestions.length} 問中</p>
          <button onclick="startCivicsQuiz()" class="mt-4 bg-brand-500 hover:bg-brand-600 text-white text-xs px-4 py-2 rounded-lg font-bold transition">もう一度挑戦</button>
        `;
      }
    }


    // ================= 物理（力と運動） シミュレータ & クイズ 処理 =================

    let simAnimationId = null;
    let simStartTime = 0;
    let simTime = 0;
    let simActive = false;

    // 物体の運動物理変数
    let objectPos = 0; // m
    let objectSpeed = 0; // m/s
    let objectAccel = 0; // m/s^2

    // グラフ用データバッファ
    let vtData = [];
    let xtData = [];

    function drawRamp(ctx, incline) {
      const w = ctx.canvas.width;
      const h = ctx.canvas.height;
      ctx.clearRect(0, 0, w, h);

      // グリッド線
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }
      for (let j = 0; j < h; j += 40) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(w, j);
        ctx.stroke();
      }

      // 地面・斜面の描画
      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 4;
      ctx.fillStyle = '#1e1b4b';

      if (incline === 'flat') {
        // 平坦
        ctx.moveTo(0, h - 40);
        ctx.lineTo(w, h - 40);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
      } else if (incline === 'gentle') {
        // なだらか
        ctx.moveTo(0, 60);
        ctx.lineTo(w - 60, h - 40);
        ctx.lineTo(w, h - 40);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
      } else {
        // 急勾配
        ctx.moveTo(0, 20);
        ctx.lineTo(w - 100, h - 40);
        ctx.lineTo(w, h - 40);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    function resetPhysicsSimulation() {
      if (simAnimationId) {
        cancelAnimationFrame(simAnimationId);
      }
      simActive = false;
      simTime = 0;
      simStartTime = 0;

      const incline = document.getElementById('simIncline').value;
      if (incline === 'flat') {
        objectPos = 10;
        objectSpeed = 50; // ピクセル等価
        objectAccel = 0;
      } else if (incline === 'gentle') {
        objectPos = 10;
        objectSpeed = 5;
        objectAccel = 15;
      } else {
        objectPos = 10;
        objectSpeed = 5;
        objectAccel = 45;
      }

      vtData = [];
      xtData = [];

      const canvas = document.getElementById('simCanvas');
      if (canvas) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        const ctx = canvas.getContext('2d');
        drawRamp(ctx, incline);
        drawObject(ctx, objectPos, incline);
      }

      updateHUD(0, 0, 0);
      drawGraphs();
    }

    function startPhysicsSimulation() {
      if (simActive) return;
      simActive = true;
      simStartTime = performance.now();
      simLoop();
    }

    function simLoop() {
      if (!simActive) return;
      const now = performance.now();
      const dt = (now - simStartTime) / 1000;
      simStartTime = now;

      simTime += dt;

      // 物理演算
      objectSpeed += objectAccel * dt;
      objectPos += objectSpeed * dt;

      const canvas = document.getElementById('simCanvas');
      const ctx = canvas.getContext('2d');
      const incline = document.getElementById('simIncline').value;

      // 限界突破でループさせる、もしくは停止
      const w = canvas.width;
      if (objectPos > w - 40) {
        objectPos = 10;
        if (incline === 'flat') {
          objectSpeed = 50;
        } else if (incline === 'gentle') {
          objectSpeed = 5;
        } else {
          objectSpeed = 5;
        }
        vtData = [];
        xtData = [];
      }

      drawRamp(ctx, incline);
      drawObject(ctx, objectPos, incline);

      // HUD更新
      // スケール変換してリアルな数値に見せる (1px = 0.05mと仮定)
      const realDist = (objectPos * 0.05).toFixed(2);
      const realSpeed = (objectSpeed * 0.05).toFixed(2);
      updateHUD(simTime, realDist, realSpeed);

      // グラフデータに蓄積
      vtData.push({ t: simTime, v: parseFloat(realSpeed) });
      xtData.push({ t: simTime, x: parseFloat(realDist) });
      if (vtData.length > 80) {
        vtData.shift();
        xtData.shift();
      }

      drawGraphs();

      simAnimationId = requestAnimationFrame(simLoop);
    }

    function drawObject(ctx, pos, incline) {
      const type = document.getElementById('simObjectType').value;
      const h = ctx.canvas.height;
      const w = ctx.canvas.width;

      // 斜面の角度算出
      let y = h - 40;
      let angle = 0;

      if (incline === 'gentle') {
        const rampW = w - 60;
        const rampH = (h - 40) - 60;
        angle = Math.atan2(rampH, rampW);
        if (pos < rampW) {
          y = 60 + (pos / rampW) * rampH;
        }
      } else if (incline === 'steep') {
        const rampW = w - 100;
        const rampH = (h - 40) - 20;
        angle = Math.atan2(rampH, rampW);
        if (pos < rampW) {
          y = 20 + (pos / rampW) * rampH;
        }
      }

      ctx.save();
      ctx.translate(pos, y);
      ctx.rotate(angle);

      if (type === 'ball') {
        // ボール
        ctx.beginPath();
        ctx.arc(0, -12, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        // 転がり模様
        ctx.beginPath();
        ctx.moveTo(0, -24);
        ctx.lineTo(0, 0);
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // 台車
        ctx.fillStyle = '#10b981';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        // 本体
        ctx.fillRect(-20, -18, 40, 12);
        ctx.strokeRect(-20, -18, 40, 12);
        // 車輪
        ctx.beginPath();
        ctx.arc(-10, -4, 4, 0, Math.PI * 2);
        ctx.arc(10, -4, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#475569';
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    }

    function updateHUD(t, d, s) {
      document.getElementById('hudTime').innerText = parseFloat(t).toFixed(2);
      document.getElementById('hudDistance').innerText = d;
      document.getElementById('hudSpeed').innerText = s;
    }

    function drawGraphs() {
      // v-t グラフ
      const cvsVt = document.getElementById('graphVt');
      if (cvsVt) {
        cvsVt.width = cvsVt.parentElement.clientWidth;
        cvsVt.height = cvsVt.parentElement.clientHeight;
        const ctx = cvsVt.getContext('2d');
        ctx.clearRect(0, 0, cvsVt.width, cvsVt.height);
        
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        vtData.forEach((d, idx) => {
          const x = (idx / 80) * cvsVt.width;
          // 最大15m/sを限界値としてスケール
          const y = cvsVt.height - (d.v / 15) * cvsVt.height;
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }

      // x-t グラフ
      const cvsXt = document.getElementById('graphXt');
      if (cvsXt) {
        cvsXt.width = cvsXt.parentElement.clientWidth;
        cvsXt.height = cvsXt.parentElement.clientHeight;
        const ctx = cvsXt.getContext('2d');
        ctx.clearRect(0, 0, cvsXt.width, cvsXt.height);
        
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        xtData.forEach((d, idx) => {
          const x = (idx / 80) * cvsXt.width;
          // 最大25mを限界値としてスケール
          const y = cvsXt.height - (d.x / 25) * cvsXt.height;
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }
    }


    // --- 物理クイズセクション ---
    let physicsIndex = 0;
    let physicsScore = 0;

    function startPhysicsQuiz() {
      physicsIndex = 0;
      physicsScore = 0;
      document.getElementById('physicsPlaceholder').classList.add('hidden');
      document.getElementById('physicsQuizContainer').classList.remove('hidden');
      loadPhysicsQuestion();
    }

    function loadPhysicsQuestion() {
      const q = physicsQuestions[physicsIndex];
      document.getElementById('physicsProgress').innerText = `問題 ${physicsIndex + 1} / ${physicsQuestions.length}`;
      document.getElementById('physicsQuestionText').innerText = q.q;

      const choicesBox = document.getElementById('physicsChoices');
      choicesBox.innerHTML = '';

      q.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = "w-full bg-white hover:bg-slate-50 text-slate-800 font-semibold p-4 rounded-xl border border-slate-200 text-left transition duration-150 flex items-center justify-between";
        btn.onclick = () => submitPhysicsAnswer(idx);
        btn.innerHTML = `
          <span>${choice}</span>
          <span class="text-xs text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded">選択肢 ${idx + 1}</span>
        `;
        choicesBox.appendChild(btn);
      });

      document.getElementById('physicsFeedback').classList.add('hidden');
    }

    function submitPhysicsAnswer(choiceIdx) {
      const q = physicsQuestions[physicsIndex];
      stats.tested++;

      const feedbackEl = document.getElementById('physicsFeedback');
      const fIcon = document.getElementById('physicsFeedbackIcon');
      const fTitle = document.getElementById('physicsFeedbackTitle');
      const fDetail = document.getElementById('physicsFeedbackDetail');

      const isCorrect = (choiceIdx === q.ans);

      document.querySelectorAll('#physicsChoices button').forEach(btn => btn.disabled = true);

      if (isCorrect) {
        playSound('correct');
        stats.correct++;
        physicsScore++;
        feedbackEl.className = "p-4 rounded-xl flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-900";
        fIcon.className = "p-2 rounded-full bg-emerald-100 text-emerald-600";
        fIcon.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`;
        fTitle.innerText = "正解！";
      } else {
        playSound('incorrect');
        feedbackEl.className = "p-4 rounded-xl flex items-center justify-between bg-rose-50 border border-rose-200 text-rose-900";
        fIcon.className = "p-2 rounded-full bg-rose-100 text-rose-600";
        fIcon.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>`;
        fTitle.innerText = "不正解...";
      }

      fDetail.innerText = q.detail;
      feedbackEl.classList.remove('hidden');
      saveStats();
    }

    function nextPhysicsQuestion() {
      physicsIndex++;
      if (physicsIndex < physicsQuestions.length) {
        loadPhysicsQuestion();
      } else {
        playSound('levelUp');
        document.getElementById('physicsQuizContainer').classList.add('hidden');
        const ph = document.getElementById('physicsPlaceholder');
        ph.classList.remove('hidden');
        ph.innerHTML = `
          <svg class="w-12 h-12 mb-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h4 class="font-bold text-slate-800">物理テスト終了！</h4>
          <p class="text-sm text-slate-500 mt-1">あなたの得点: ${physicsScore} / ${physicsQuestions.length} 問中</p>
          <button onclick="startPhysicsQuiz()" class="mt-4 bg-brand-500 hover:bg-brand-600 text-white text-xs px-4 py-2 rounded-lg font-bold transition">もう一度挑戦</button>
        `;
      }
    }


    // ================= てんこ盛り総合模擬試験 処理 =================

    let fullTestQuestions = [];
    let fullTestIndex = 0;
    let fullTestTimerInterval = null;
    let fullTestSecondsLeft = 900; // 15分
    let fullTestScores = {
      kanji: { correct: 0, total: 5 },
      civics: { correct: 0, total: 5 },
      physics: { correct: 0, total: 5 }
    };
    let currentFullTestStartTime = 0;

    function startFullTest() {
      // 問題抽出
      // 1. 漢字5問
      const shuffledKanji = [...data].sort(() => 0.5 - Math.random()).slice(0, 5).map(item => {
        return {
          type: 'kanji',
          item: item,
          q: item.q,
          s: item.s,
          d: item.d,
          grade: item.grade
        };
      });

      // 2. 公民5問
      const shuffledCivics = [...civicsQuestions].sort(() => 0.5 - Math.random()).slice(0, 5).map(item => {
        return {
          type: 'civics',
          item: item,
          q: item.q,
          choices: item.choices,
          ans: item.ans,
          detail: item.detail
        };
      });

      // 3. 物理5問
      const shuffledPhysics = [...physicsQuestions].sort(() => 0.5 - Math.random()).slice(0, 5).map(item => {
        return {
          type: 'physics',
          item: item,
          q: item.q,
          choices: item.choices,
          ans: item.ans,
          detail: item.detail
        };
      });

      // マージしてシャッフル
      fullTestQuestions = [...shuffledKanji, ...shuffledCivics, ...shuffledPhysics].sort(() => 0.5 - Math.random());
      
      fullTestIndex = 0;
      fullTestSecondsLeft = 900;
      fullTestScores = {
        kanji: { correct: 0, total: 5 },
        civics: { correct: 0, total: 5 },
        physics: { correct: 0, total: 5 }
      };

      document.getElementById('fullTestPlaceholder').classList.add('hidden');
      document.getElementById('fullTestReport').classList.add('hidden');
      document.getElementById('fullTestContainer').classList.remove('hidden');

      // タイマースタート
      currentFullTestStartTime = Date.now();
      if (fullTestTimerInterval) clearInterval(fullTestTimerInterval);
      fullTestTimerInterval = setInterval(updateFullTestTimer, 1000);

      loadFullTestQuestion();
    }

    function updateFullTestTimer() {
      fullTestSecondsLeft--;
      if (fullTestSecondsLeft <= 0) {
        clearInterval(fullTestTimerInterval);
        finishFullTest();
        return;
      }

      const m = Math.floor(fullTestSecondsLeft / 60).toString().padStart(2, '0');
      const s = (fullTestSecondsLeft % 60).toString().padStart(2, '0');
      document.getElementById('fullTestTimer').innerText = `${m}:${s}`;
    }

    function loadFullTestQuestion() {
      const q = fullTestQuestions[fullTestIndex];
      const progressBar = document.getElementById('fullTestProgressBar');
      progressBar.style.width = `${(fullTestIndex / fullTestQuestions.length) * 100}%`;

      document.getElementById('fullTestProgress').innerText = `問題 ${fullTestIndex + 1} / ${fullTestQuestions.length}`;

      const badge = document.getElementById('fullTestSubjectBadge');
      const answerArea = document.getElementById('fullTestAnswerArea');
      answerArea.innerHTML = '';

      if (q.type === 'kanji') {
        badge.className = "text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700";
        badge.innerText = `漢字コンクール [${q.grade}]`;
        document.getElementById('fullTestQuestionText').innerText = q.q;

        // 書き取り記述形式
        const inputDiv = document.createElement('div');
        inputDiv.className = "space-y-3";
        inputDiv.innerHTML = `
          <label class="block text-xs font-bold text-slate-500">（　）に当てはまる「漢字」を入力してください</label>
          <div class="flex space-x-2">
            <input type="text" id="fullTestKanjiInput" onkeydown="if(event.key==='Enter') submitFullTestAnswer()" class="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-lg focus:outline-none focus:border-indigo-500" placeholder="答えの漢字を入力..." autocomplete="off">
            <button onclick="submitFullTestAnswer()" class="bg-indigo-600 hover:bg-indigo-500 text-white px-6 rounded-xl font-bold transition">確定</button>
          </div>
          <p class="text-xs text-rose-500 font-bold mt-1">読みのヒント: ${q.d}</p>
        `;
        answerArea.appendChild(inputDiv);
        setTimeout(() => document.getElementById('fullTestKanjiInput').focus(), 50);

      } else {
        if (q.type === 'civics') {
          badge.className = "text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700";
          badge.innerText = "公民甲 (政治・憲法)";
        } else {
          badge.className = "text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700";
          badge.innerText = "物理 (力と運動)";
        }
        document.getElementById('fullTestQuestionText').innerText = q.q;

        // 4択形式
        const grid = document.createElement('div');
        grid.className = "grid grid-cols-1 sm:grid-cols-2 gap-3";
        q.choices.forEach((choice, idx) => {
          const btn = document.createElement('button');
          btn.className = "w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold p-4 rounded-xl border border-slate-200 text-left transition flex justify-between items-center";
          btn.onclick = () => submitFullTestChoice(idx);
          btn.innerHTML = `
            <span>${choice}</span>
            <span class="text-xs text-slate-400 font-mono bg-white px-1.5 py-0.5 rounded">${idx + 1}</span>
          `;
          grid.appendChild(btn);
        });
        answerArea.appendChild(grid);
      }
    }

    // 選択肢系解答
    function submitFullTestChoice(choiceIdx) {
      const q = fullTestQuestions[fullTestIndex];
      const isCorrect = (choiceIdx === q.ans);
      
      stats.tested++;

      if (isCorrect) {
        playSound('correct');
        stats.correct++;
        fullTestScores[q.type].correct++;
      } else {
        playSound('incorrect');
      }

      nextFullTestQuestion();
    }

    // 漢字記述系解答
    function submitFullTestAnswer() {
      const q = fullTestQuestions[fullTestIndex];
      const userAns = document.getElementById('fullTestKanjiInput').value.trim();
      if (!userAns) return;

      const isCorrect = (userAns === q.s);
      
      stats.tested++;

      if (isCorrect) {
        playSound('correct');
        stats.correct++;
        fullTestScores.kanji.correct++;
      } else {
        playSound('incorrect');
      }

      nextFullTestQuestion();
    }

    function nextFullTestQuestion() {
      fullTestIndex++;
      saveStats();

      if (fullTestIndex < fullTestQuestions.length) {
        loadFullTestQuestion();
      } else {
        finishFullTest();
      }
    }

    function finishFullTest() {
      if (fullTestTimerInterval) clearInterval(fullTestTimerInterval);
      playSound('levelUp');

      document.getElementById('fullTestContainer').classList.add('hidden');
      const report = document.getElementById('fullTestReport');
      report.classList.remove('hidden');

      // スコア合算
      const totalCorrect = fullTestScores.kanji.correct + fullTestScores.civics.correct + fullTestScores.physics.correct;
      document.getElementById('reportScore').innerText = totalCorrect;

      // 所要時間
      const totalTimeSec = Math.floor((Date.now() - currentFullTestStartTime) / 1000);
      const m = Math.floor(totalTimeSec / 60).toString().padStart(2, '0');
      const s = (totalTimeSec % 60).toString().padStart(2, '0');
      document.getElementById('reportTime').innerText = `${m}:${s}`;

      // ランク判定
      let rank = "D";
      let advice = "";
      if (totalCorrect === 15) {
        rank = "S";
        advice = "完璧です！全ての範囲において素晴らしい理解度。試験対策は万全です。本番もこの調子でいきましょう！";
      } else if (totalCorrect >= 12) {
        rank = "A";
        advice = "優秀な成績です！いくつかの小さなミスがありましたが、全体の理解度は極めて高いです。間違えた問題を見直しておきましょう。";
      } else if (totalCorrect >= 9) {
        rank = "B";
        advice = "標準的な理解度です。間違えた部分にまだ苦手が隠れている可能性があります。各タブのエクスプローラーやシミュレーターを使って再復習しましょう！";
      } else if (totalCorrect >= 5) {
        rank = "C";
        advice = "基礎知識の確認が必要です。特に「漢字の書き込み」や「物理のスライド定義」をもう一度読み直して定着を図りましょう。";
      } else {
        rank = "D";
        advice = "要注意！まずは各分野の解説カードやタイムライン、スライドをじっくり見直し、基礎を一問一答で固めることを推奨します。";
      }

      document.getElementById('reportRank').innerText = rank;
      document.getElementById('reportAdvice').innerText = advice;

      // 最高得点更新
      if (totalCorrect > stats.highscore) {
        stats.highscore = totalCorrect;
        saveStats();
      }

      // 分野別ブレイクダウン
      const kanjiPct = (fullTestScores.kanji.correct / 5) * 100;
      const civicsPct = (fullTestScores.civics.correct / 5) * 100;
      const physicsPct = (fullTestScores.physics.correct / 5) * 100;

      document.getElementById('breakdownKanji').innerText = `${fullTestScores.kanji.correct} / 5 (${kanjiPct}%)`;
      document.getElementById('breakdownKanjiBar').style.width = `${kanjiPct}%`;

      document.getElementById('breakdownCivics').innerText = `${fullTestScores.civics.correct} / 5 (${civicsPct}%)`;
      document.getElementById('breakdownCivicsBar').style.width = `${civicsPct}%`;

      document.getElementById('breakdownPhysics').innerText = `${fullTestScores.physics.correct} / 5 (${physicsPct}%)`;
      document.getElementById('breakdownPhysicsBar').style.width = `${physicsPct}%`;
    }


    // --- 起動初期化 ---
    window.onload = function() {
      initKanji();
      loadStats();
      resetPhysicsSimulation();
      // デフォルト表示
      switchTab('dashboard');
    };