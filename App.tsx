import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Volume2,
  VolumeX,
  HelpCircle,
  Users,
  PhoneCall,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Calculator,
  Compass,
  FileCheck,
  ChevronRight,
  Sparkles,
  Play,
  Lightbulb,
  Check,
  X,
  Languages
} from 'lucide-react';
import { sounds } from './audio.ts';
import {
  millionaireQuestions,
  fillInBlanksData,
  trueFalseData,
  situationsData,
  mathProblemsData,
  logicPuzzlesData,
  storyParagraphs,
  storyQuestionsData,
  QuizQuestion,
  MathProblem
} from './quizData.ts';

type ActiveTab = 'quiz' | 'exercises' | 'math' | 'logic' | 'story' | 'answers';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('quiz');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Global toggle for translation preference (can still click individual)
  const [alwaysShowTranslations, setAlwaysShowTranslations] = useState(false);

  // MILLIONAIRE QUIZ STATE
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [history, setHistory] = useState<{ qId: number; selected: number; correct: number }[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // Lifelines
  const [lifeline5050Used, setLifeline5050Used] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [lifelineCoachUsed, setLifelineCoachUsed] = useState(false);
  const [coachModalOpen, setCoachModalOpen] = useState(false);
  const [lifelineCrowdUsed, setLifelineCrowdUsed] = useState(false);
  const [crowdModalOpen, setCrowdModalOpen] = useState(false);
  const [crowdStats, setCrowdStats] = useState<number[]>([]);

  // Individual translations visibility set: "q-{id}", "q-{id}-opt-{optId}"
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (key: string) => {
    setRevealedTranslations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    sounds.playSelect();
  };

  const isTranslated = (key: string) => {
    if (alwaysShowTranslations) return true;
    return !!revealedTranslations[key];
  };

  // Sound toggle
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
  };

  const currentQ: QuizQuestion = millionaireQuestions[currentQIndex] || millionaireQuestions[0];

  // Lifeline handlers
  const use5050 = () => {
    if (lifeline5050Used || isAnswerConfirmed) return;
    sounds.playLifeline();
    setLifeline5050Used(true);

    const wrongIndices = [0, 1, 2, 3].filter(idx => idx !== currentQ.correctIndex);
    // shuffle and pick 2 to eliminate
    const shuffledWrong = [...wrongIndices].sort(() => 0.5 - Math.random());
    setEliminatedOptions(shuffledWrong.slice(0, 2));
  };

  const useCoach = () => {
    if (lifelineCoachUsed || isAnswerConfirmed) return;
    sounds.playLifeline();
    setLifelineCoachUsed(true);
    setCoachModalOpen(true);
  };

  const useCrowd = () => {
    if (lifelineCrowdUsed || isAnswerConfirmed) return;
    sounds.playLifeline();
    setLifelineCrowdUsed(true);

    // generate realistic percentages skewed towards correct answer
    const correctIdx = currentQ.correctIndex;
    const stats = [0, 0, 0, 0];
    const highPercent = Math.floor(Math.random() * 25) + 55; // 55% - 80%
    stats[correctIdx] = highPercent;
    let remaining = 100 - highPercent;
    const otherIdxs = [0, 1, 2, 3].filter(i => i !== correctIdx);
    otherIdxs.forEach((idx, i) => {
      if (i === otherIdxs.length - 1) {
        stats[idx] = remaining;
      } else {
        const share = Math.floor(Math.random() * (remaining - 5));
        stats[idx] = share;
        remaining -= share;
      }
    });

    setCrowdStats(stats);
    setCrowdModalOpen(true);
  };

  // Option select
  const handleSelectOption = (idx: number) => {
    if (isAnswerConfirmed || eliminatedOptions.includes(idx)) return;
    setSelectedOption(idx);
    sounds.playSelect();
  };

  // Confirm and evaluate answer
  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswerConfirmed) return;
    setIsAnswerConfirmed(true);

    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      sounds.playCorrect();
      setScore(prev => prev + 50000);
      setCorrectCount(prev => prev + 1);
    } else {
      sounds.playWrong();
    }

    setHistory(prev => [
      ...prev,
      { qId: currentQ.id, selected: selectedOption, correct: currentQ.correctIndex }
    ]);
  };

  // Proceed to next question (CRUCIAL REQUIREMENT: if wrong, still continue playing!)
  const handleNextQuestion = () => {
    if (currentQIndex < millionaireQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerConfirmed(false);
      setEliminatedOptions([]);
    } else {
      setQuizFinished(true);
      sounds.playWhistle();
    }
  };

  const restartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerConfirmed(false);
    setScore(0);
    setCorrectCount(0);
    setHistory([]);
    setQuizFinished(false);
    setLifeline5050Used(false);
    setLifelineCoachUsed(false);
    setLifelineCrowdUsed(false);
    setEliminatedOptions([]);
    sounds.playWhistle();
  };

  // EXERCISES STATE (PART 2)
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [fillFeedback, setFillFeedback] = useState<Record<number, boolean | null>>({});

  const handleFillWord = (itemId: number, word: string) => {
    setFillAnswers(prev => ({ ...prev, [itemId]: word }));
    const item = fillInBlanksData.find(d => d.id === itemId);
    if (item) {
      const correct = word.toLowerCase() === item.targetWord.toLowerCase();
      setFillFeedback(prev => ({ ...prev, [itemId]: correct }));
      if (correct) sounds.playCorrect();
      else sounds.playWrong();
    }
  };

  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean>>({});
  const handleTfClick = (itemId: number, chosen: boolean) => {
    setTfAnswers(prev => ({ ...prev, [itemId]: chosen }));
    const item = trueFalseData.find(d => d.id === itemId);
    if (item) {
      if (chosen === item.isTrue) sounds.playCorrect();
      else sounds.playWrong();
    }
  };

  const [situationAnswers, setSituationAnswers] = useState<Record<number, string>>({});
  const handleSituationChoose = (sitId: number, optId: string) => {
    setSituationAnswers(prev => ({ ...prev, [sitId]: optId }));
    const sit = situationsData.find(s => s.id === sitId);
    const opt = sit?.options.find(o => o.id === optId);
    if (opt?.isCorrect) sounds.playCorrect();
    else sounds.playWrong();
  };

  // MATH STATE (PART 3)
  const [mathAnswers, setMathAnswers] = useState<Record<number, number>>({});
  const handleMathSelect = (mathId: number, optIdx: number) => {
    setMathAnswers(prev => ({ ...prev, [mathId]: optIdx }));
    const prob = mathProblemsData.find(p => p.id === mathId);
    if (prob && optIdx === prob.correctIndex) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
    }
  };

  // LOGIC STATE (PART 4)
  const [logicAnswers, setLogicAnswers] = useState<Record<number, number>>({});
  const handleLogicSelect = (riddleId: number, optIdx: number) => {
    setLogicAnswers(prev => ({ ...prev, [riddleId]: optIdx }));
    const rid = logicPuzzlesData.find(r => r.id === riddleId);
    if (rid && optIdx === rid.correctIndex) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
    }
  };

  // STORY STATE (PART 5)
  const [storyAnswers, setStoryAnswers] = useState<Record<number, number>>({});
  const handleStorySelect = (qId: number, optIdx: number) => {
    setStoryAnswers(prev => ({ ...prev, [qId]: optIdx }));
    const q = storyQuestionsData.find(sq => sq.id === qId);
    if (q && optIdx === q.correctIndex) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
    }
  };

  // Search filter for Answer Key
  const [answerKeySearch, setAnswerKeySearch] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-xl">
              ⚽
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  FÚTBOL QUIZ MILLONARIO
                </span>
                <span className="text-xs uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Nivel A1–A2
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Ֆուտբոլային Վիկտորինա · Español & Հայերեն
              </p>
            </div>
          </div>

          {/* Quick controls: Sound, Translation helper */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAlwaysShowTranslations(!alwaysShowTranslations)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                alwaysShowTranslations
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Ցուցադրել բոլոր թարգմանությունները / Mostrar siempre armenio"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>{alwaysShowTranslations ? 'Հայերենը՝ բացված' : 'Սեղմիր թարգմանելու համար'}</span>
            </button>

            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border text-xs transition ${
                soundEnabled
                  ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  : 'bg-rose-950/40 text-rose-300 border-rose-800'
              }`}
              title={soundEnabled ? 'Անջատել ձայնը / Silenciar' : 'Միացնել ձայնը / Activar sonido'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto no-scrollbar border-t border-slate-800/80 py-1.5">
          {[
            { id: 'quiz', label: 'Parte 1: Quiz Millonario', arm: '1. Վիկտորինա (20)', icon: Trophy },
            { id: 'exercises', label: 'Parte 2: Ejercicios', arm: '2. Վարժություններ', icon: Compass },
            { id: 'math', label: 'Parte 3: Matemáticas', arm: '3. Մաթեմատիկա', icon: Calculator },
            { id: 'logic', label: 'Parte 4: Lógica', arm: '4. Տրամաբանություն', icon: Sparkles },
            { id: 'story', label: 'Parte 5: Lectura', arm: '5. Ընթերցանություն', icon: BookOpen },
            { id: 'answers', label: 'Clave de Respuestas', arm: 'Պատասխաններ', icon: FileCheck },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as ActiveTab);
                  sounds.playSelect();
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  active
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] opacity-75 ${active ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                  ({tab.arm})
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6">

        {/* ============================================================== */}
        {/* TAB 1: QUIZ MILLONARIO (PARTE 1) */}
        {/* ============================================================== */}
        {activeTab === 'quiz' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT / CENTER: QUIZ ARENA */}
            <div className="lg:col-span-8 flex flex-col gap-4">

              {/* STADIUM TOP BAR */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-sm">
                    {currentQ.level}/20
                  </div>
                  <div>
                    <div className="text-xs uppercase text-slate-400 font-semibold tracking-wider">
                      Pregunta por / Պարգևավճար
                    </div>
                    <div className="text-lg font-black text-amber-400 tracking-tight">
                      {currentQ.prize}
                    </div>
                  </div>
                </div>

                {/* Score & Progress */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-slate-400 block">Aciertos / Գոլեր</span>
                    <span className="font-bold text-emerald-400 text-sm">{correctCount} / {history.length}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block">Bote / Հաշիվ</span>
                    <span className="font-bold text-amber-300 text-sm">{score.toLocaleString()} €</span>
                  </div>
                </div>

                {/* LIFELINES (Comodines) */}
                <div className="flex items-center gap-2">
                  {/* 50:50 */}
                  <button
                    onClick={use5050}
                    disabled={lifeline5050Used || isAnswerConfirmed}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                      lifeline5050Used
                        ? 'opacity-30 border-slate-800 bg-slate-900 text-slate-600 line-through cursor-not-allowed'
                        : 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50'
                    }`}
                    title="50:50 - Elimina dos respuestas incorrectas"
                  >
                    <span>50:50</span>
                  </button>

                  {/* Coach call */}
                  <button
                    onClick={useCoach}
                    disabled={lifelineCoachUsed || isAnswerConfirmed}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition border ${
                      lifelineCoachUsed
                        ? 'opacity-30 border-slate-800 bg-slate-900 text-slate-600 line-through cursor-not-allowed'
                        : 'border-yellow-500/40 bg-yellow-950/40 text-yellow-300 hover:bg-yellow-900/50'
                    }`}
                    title="Llamada al entrenador / Մարզչի խորհուրդը"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Míster</span>
                  </button>

                  {/* Crowd Poll */}
                  <button
                    onClick={useCrowd}
                    disabled={lifelineCrowdUsed || isAnswerConfirmed}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition border ${
                      lifelineCrowdUsed
                        ? 'opacity-30 border-slate-800 bg-slate-900 text-slate-600 line-through cursor-not-allowed'
                        : 'border-purple-500/40 bg-purple-950/40 text-purple-300 hover:bg-purple-900/50'
                    }`}
                    title="Pregunta al estadio / Երկրպագուներ"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Estadio</span>
                  </button>
                </div>
              </div>

              {!quizFinished ? (
                <>
                  {/* QUESTION BOX */}
                  <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400/80">
                        Pregunta #{currentQ.id} · Nivel {currentQ.level}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => sounds.speakSpanish(currentQ.questionEs)}
                          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
                          title="Լսել իսպաներենով / Escuchar en español"
                        >
                          <Volume2 className="w-4 h-4 text-sky-400" />
                        </button>
                        <button
                          onClick={() => toggleTranslation(`q-${currentQ.id}`)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition border ${
                            isTranslated(`q-${currentQ.id}`)
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                          }`}
                        >
                          <Languages className="w-3.5 h-3.5" />
                          <span>{isTranslated(`q-${currentQ.id}`) ? 'Հայերեն ✓' : 'Թարգմանել'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Spanish Question (Clickable to reveal translation) */}
                    <div
                      onClick={() => toggleTranslation(`q-${currentQ.id}`)}
                      className="cursor-pointer group/q"
                      title="Սեղմիր հայերեն թարգմանությունը տեսնելու համար / Clic para ver traducción"
                    >
                      <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                        {currentQ.questionEs}
                      </h2>
                    </div>

                    {/* Armenian Question Translation */}
                    {isTranslated(`q-${currentQ.id}`) && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 text-amber-300/90 font-medium text-base animate-fadeIn flex items-start gap-2">
                        <span className="text-xs font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 mt-0.5 shrink-0">
                          HY
                        </span>
                        <span>{currentQ.questionHy}</span>
                      </div>
                    )}
                  </div>

                  {/* 4 ANSWER OPTIONS (A, B, C, D) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {currentQ.options.map((option, idx) => {
                      const isEliminated = eliminatedOptions.includes(idx);
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === currentQ.correctIndex;
                      const optKey = `q-${currentQ.id}-opt-${option.id}`;
                      const showOptArm = isTranslated(optKey);

                      let containerStyle =
                        'border-slate-800 bg-slate-900/90 text-slate-200 hover:border-amber-500/50 hover:bg-slate-850';
                      let letterStyle = 'bg-slate-800 text-amber-400 border-slate-700';

                      if (isEliminated) {
                        containerStyle = 'opacity-20 border-slate-900 bg-slate-950 pointer-events-none';
                        letterStyle = 'bg-slate-900 text-slate-600 border-slate-900';
                      } else if (isAnswerConfirmed) {
                        if (isCorrect) {
                          containerStyle =
                            'border-emerald-500 bg-emerald-950/60 text-emerald-100 ring-2 ring-emerald-500/40';
                          letterStyle = 'bg-emerald-600 text-white border-emerald-400';
                        } else if (isSelected) {
                          containerStyle =
                            'border-rose-500 bg-rose-950/60 text-rose-100 ring-2 ring-rose-500/40';
                          letterStyle = 'bg-rose-600 text-white border-rose-400';
                        }
                      } else if (isSelected) {
                        containerStyle =
                          'border-amber-400 bg-amber-950/40 text-amber-100 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/10';
                        letterStyle = 'bg-amber-500 text-slate-950 border-amber-300 font-black';
                      }

                      return (
                        <div
                          key={option.id}
                          className={`relative rounded-xl border p-3.5 transition-all duration-200 flex flex-col justify-between ${containerStyle}`}
                        >
                          {/* Top row: Option letter + Spanish text + Translation toggle */}
                          <div className="flex items-start gap-3">
                            {/* Letter badge */}
                            <button
                              type="button"
                              onClick={() => handleSelectOption(idx)}
                              disabled={isAnswerConfirmed || isEliminated}
                              className={`w-7 h-7 rounded-lg border font-black text-xs flex items-center justify-center shrink-0 transition ${letterStyle}`}
                            >
                              {option.id}
                            </button>

                            {/* Main clickable answer body */}
                            <div
                              onClick={() => handleSelectOption(idx)}
                              className="flex-1 cursor-pointer select-none"
                            >
                              <p className="text-sm md:text-base font-semibold leading-snug">
                                {option.textEs}
                              </p>
                            </div>

                            {/* Audio pronunciation */}
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                sounds.speakSpanish(option.textEs);
                              }}
                              className="p-1 rounded text-slate-400 hover:text-slate-200 transition"
                              title="Լսել իսպաներեն / Escuchar"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-slate-400 hover:text-sky-400" />
                            </button>

                            {/* Individual Armenian translate trigger */}
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                toggleTranslation(optKey);
                              }}
                              className={`px-2 py-0.5 rounded text-[11px] font-bold tracking-wide border transition shrink-0 ${
                                showOptArm
                                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                                  : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700'
                              }`}
                              title="Թարգմանել առանձին / Traducir esta opción"
                            >
                              ՀԱՅ
                            </button>
                          </div>

                          {/* Armenian translation for this specific option (revealed individually on click) */}
                          {showOptArm && !isEliminated && (
                            <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-xs md:text-sm text-amber-300/95 font-medium flex items-center gap-1.5 pl-10">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                              <span>{option.textHy}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* BOTTOM ACTION BAR */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        Սեղմիր <strong>ՀԱՅ</strong> կոճակին՝ ցանկացած պատասխան առանձին թարգմանելու համար։
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {!isAnswerConfirmed ? (
                        <button
                          onClick={handleConfirmAnswer}
                          disabled={selectedOption === null}
                          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-lg ${
                            selectedOption !== null
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:brightness-110 shadow-amber-500/20 active:scale-95'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          Հաստատել պատասխանը / Confirmar
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 flex items-center gap-2 animate-bounce-subtle"
                        >
                          <span>Շարունակել խաղալ / Siguiente</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* POST-ANSWER FEEDBACK CARD (Crucial: Shows coach tactial note & continues even if wrong) */}
                  {isAnswerConfirmed && (
                    <div
                      className={`rounded-2xl p-4 md:p-5 border transition-all ${
                        selectedOption === currentQ.correctIndex
                          ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100'
                          : 'bg-rose-950/40 border-rose-500/60 text-rose-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {selectedOption === currentQ.correctIndex ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-bold text-base">
                              {selectedOption === currentQ.correctIndex
                                ? '¡GOLAZO! Respuesta correcta — Ճիշտ պատասխան'
                                : '¡Ánimo! El partido continúa — Ոչինչ, խաղը շարունակվում է'}
                            </h4>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700">
                              Ճիշտ տարբերակ՝ {currentQ.options[currentQ.correctIndex].id}) {currentQ.options[currentQ.correctIndex].textEs}
                            </span>
                          </div>

                          {/* Bilingual tactical explanation */}
                          <p className="text-sm text-slate-200 leading-relaxed">
                            {currentQ.explanationEs}
                          </p>
                          <p className="text-xs md:text-sm text-amber-300 font-medium pt-1 border-t border-slate-800/60">
                            {currentQ.explanationHy}
                          </p>

                          <div className="pt-2 flex justify-end">
                            <button
                              onClick={handleNextQuestion}
                              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center gap-1.5 shadow"
                            >
                              <span>Առա՛ջ դեպի հաջորդ հարցը (Pregunta {currentQIndex + 2 <= 20 ? currentQIndex + 2 : 20})</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* FINISHED GAME OVERVIEW */
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
                  <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-4xl shadow-lg shadow-amber-500/20">
                    🏆
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-amber-300">
                      ¡Fin del Partido! / Խաղն ավարտվեց
                    </h2>
                    <p className="text-slate-300 text-sm mt-1">
                      Դուք անցաք բոլոր 20 ֆուտբոլային հարցերը։
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-lg mx-auto">
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <span className="text-xs text-slate-400 block">Գոլեր (Aciertos)</span>
                      <span className="text-xl font-black text-emerald-400">
                        {correctCount} / 20
                      </span>
                    </div>
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <span className="text-xs text-slate-400 block">Պարգևավճար (Bote)</span>
                      <span className="text-xl font-black text-amber-400">
                        {score.toLocaleString()} €
                      </span>
                    </div>
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 col-span-2 md:col-span-1">
                      <span className="text-xs text-slate-400 block">Ճշգրտություն (Tasa)</span>
                      <span className="text-xl font-black text-cyan-400">
                        {Math.round((correctCount / 20) * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <button
                      onClick={restartQuiz}
                      className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 flex items-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Խաղալ նորից / Jugar de nuevo</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('answers')}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 border border-slate-700 flex items-center gap-2"
                    >
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      <span>Տեսնել բոլոր պատասխանները</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: PRIZE LADDER (Escalera de premios) */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Escalera de Premios / Գումարային Սանդուղք</span>
                  </h3>
                  <span className="text-[11px] text-amber-400 font-semibold">20 Tiers</span>
                </div>

                {/* Ladder Items (descending order 20 down to 1) */}
                <div className="space-y-1">
                  {[...millionaireQuestions].reverse().map(q => {
                    const isCurrent = q.id === currentQ.id && !quizFinished;
                    const isPassed = q.id < currentQ.id || (quizFinished && q.id <= 20);
                    const isMilestone = [5, 10, 14, 20].includes(q.id);

                    let itemStyle = 'text-slate-400 hover:text-slate-200';
                    let badgeStyle = 'text-slate-500';

                    if (isCurrent) {
                      itemStyle =
                        'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30 scale-[1.02]';
                      badgeStyle = 'text-slate-950 font-extrabold';
                    } else if (isPassed) {
                      itemStyle = 'text-emerald-400 font-medium bg-emerald-950/20';
                      badgeStyle = 'text-emerald-500 font-bold';
                    } else if (isMilestone) {
                      itemStyle = 'text-amber-300 font-bold';
                    }

                    return (
                      <div
                        key={q.id}
                        className={`flex items-center justify-between px-3 py-1 rounded-lg text-xs transition duration-150 ${itemStyle}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-5 text-right font-mono ${badgeStyle}`}>{q.id}</span>
                          <span className="truncate max-w-[150px] sm:max-w-none text-[11px]">
                            {isMilestone ? `★ ${q.prize}` : q.prize}
                          </span>
                        </div>
                        {isPassed && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        {isCurrent && <span className="text-[10px] uppercase font-black tracking-widest">AQUÍ</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Motivational banner */}
              <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="text-amber-400 font-bold block">💡 Կանոններ</span>
                <p>
                  Սխալ պատասխանելու դեպքում խաղը <strong>ՉԻ ավարտվում</strong>. դուք կարող եք շարունակել մինչև վերջին 20-րդ հարցը և սովորել բոլոր արտահայտությունները։
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: EJERCICIOS VARIADOS (PARTE 2) */}
        {/* ============================================================== */}
        {activeTab === 'exercises' && (
          <div className="space-y-8">
            {/* Header info */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
                <span>⚽</span>
                <span>PARTE 2. Ejercicios variados — Տարբեր վարժություններ</span>
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Մարզչի հրահանգներ, ճիշտ թե սխալ պնդումներ և խաղային իրավիճակներ։
              </p>
            </div>

            {/* EJERCICIO 1: COMPLETA LAS INSTRUCCIONES */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-5">
              <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-base text-slate-100">
                    Ejercicio 1. Completa las instrucciones del entrenador
                  </h3>
                  <p className="text-xs text-amber-300">
                    Լրացրո՛ւ մարզչի հրահանգները համապատասխան բառերով։
                  </p>
                </div>
                <div className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg text-slate-300 font-mono">
                  Palabras: pasa · corre · defiende · tira · mira · vuelve · cubre · espera
                </div>
              </div>

              {/* Sentences grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fillInBlanksData.map(item => {
                  const currentWord = fillAnswers[item.id] || '';
                  const isCorrect = fillFeedback[item.id];
                  const wordPool = ['pasa', 'corre', 'tira', 'cubre', 'vuelve', 'defiende', 'mira', 'espera'];

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border transition ${
                        isCorrect === true
                          ? 'bg-emerald-950/30 border-emerald-500/50'
                          : isCorrect === false
                          ? 'bg-rose-950/30 border-rose-500/50'
                          : 'bg-slate-950/60 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-amber-400">#{item.id}</span>
                        <button
                          onClick={() => sounds.speakSpanish(item.sentenceEs.replace('______', item.targetWord))}
                          className="p-1 text-slate-400 hover:text-sky-400 transition"
                          title="Լսել / Escuchar"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Spanish sentence with blank filled */}
                      <p className="font-semibold text-sm md:text-base text-white">
                        {item.sentenceEs.split('______')[0]}
                        <span
                          className={`inline-block px-2 py-0.5 mx-1 font-bold rounded border ${
                            isCorrect === true
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                              : isCorrect === false
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                              : 'bg-slate-800 text-amber-300 border-slate-700'
                          }`}
                        >
                          {currentWord || '______'}
                        </span>
                        {item.sentenceEs.split('______')[1]}
                      </p>

                      {/* Armenian sentence */}
                      <p className="text-xs text-amber-200/80 mt-1.5 flex items-center gap-1.5">
                        <Languages className="w-3 h-3 text-amber-400" />
                        <span>{item.sentenceHy}</span>
                      </p>

                      {/* Quick clickable buttons for options */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {wordPool.map(w => (
                          <button
                            key={w}
                            onClick={() => handleFillWord(item.id, w)}
                            className={`px-2 py-0.5 text-xs rounded-md border font-medium transition ${
                              currentWord === w
                                ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                            }`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>

                      {isCorrect !== undefined && (
                        <div className="mt-2 text-xs font-semibold flex items-center gap-1">
                          {isCorrect ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> ¡Correcto!
                            </span>
                          ) : (
                            <span className="text-rose-400 flex items-center gap-1">
                              <X className="w-3.5 h-3.5" /> Ճիշտ բառն է՝ «{item.targetWord}»
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* EJERCICIO 2: VERDADERO O FALSO */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-slate-100">
                  Ejercicio 2. Verdadero o falso — Ճի՞շտ, թե՞ սխալ
                </h3>
                <p className="text-xs text-amber-300">
                  Կարդա՛ պնդումը և որոշի՛ր՝ այն ճիշտ է (Verdadero), թե սխալ (Falso)։
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trueFalseData.map(tf => {
                  const chosen = tfAnswers[tf.id];
                  const hasAnswered = chosen !== undefined;
                  const isUserCorrect = hasAnswered && chosen === tf.isTrue;

                  return (
                    <div
                      key={tf.id}
                      className={`p-4 rounded-xl border transition ${
                        hasAnswered
                          ? isUserCorrect
                            ? 'bg-emerald-950/20 border-emerald-500/50'
                            : 'bg-rose-950/20 border-rose-500/50'
                          : 'bg-slate-950/60 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-amber-400">#{tf.id}</span>
                        <button
                          onClick={() => sounds.speakSpanish(tf.statementEs)}
                          className="p-1 text-slate-400 hover:text-sky-400 transition"
                          title="Լսել / Escuchar"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-sm font-semibold text-white leading-snug">
                        {tf.statementEs}
                      </p>
                      <p className="text-xs text-amber-200/90 mt-1 font-medium">
                        {tf.statementHy}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => handleTfClick(tf.id, true)}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold border transition ${
                            chosen === true
                              ? tf.isTrue
                                ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-500/30'
                                : 'bg-rose-600 text-white border-rose-500'
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          Verdadero (Ճիշտ է)
                        </button>
                        <button
                          onClick={() => handleTfClick(tf.id, false)}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold border transition ${
                            chosen === false
                              ? !tf.isTrue
                                ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-500/30'
                                : 'bg-rose-600 text-white border-rose-500'
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          Falso (Սխալ է)
                        </button>
                      </div>

                      {hasAnswered && (
                        <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-xs space-y-0.5">
                          <p className="text-slate-300">{tf.explanationEs}</p>
                          <p className="text-amber-300/80">{tf.explanationHy}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* EJERCICIO 3: ¿QUÉ DIRÍAS EN ESTA SITUACIÓN? */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-slate-100">
                  Ejercicio 3. ¿Qué dirías en esta situación? — Ի՞նչ կասեիր այս իրավիճակում
                </h3>
                <p className="text-xs text-amber-300">
                  Կարդա՛ իրավիճակը և ընտրի՛ր իսպաներեն ամենահարմար արտահայտությունը։
                </p>
              </div>

              <div className="space-y-4">
                {situationsData.map(sit => {
                  const userChoice = situationAnswers[sit.id];
                  return (
                    <div
                      key={sit.id}
                      className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm text-amber-400">
                            {sit.titleEs} · {sit.titleHy}
                          </h4>
                          <p className="text-sm text-slate-200 mt-1 font-medium">{sit.contextEs}</p>
                          <p className="text-xs text-amber-200/80 mt-0.5">{sit.contextHy}</p>
                        </div>
                        <button
                          onClick={() => sounds.speakSpanish(sit.contextEs)}
                          className="p-1 text-slate-400 hover:text-sky-400 transition"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                        {sit.options.map(opt => {
                          const isSelected = userChoice === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleSituationChoose(sit.id, opt.id)}
                              className={`p-3 rounded-lg border text-left transition ${
                                isSelected
                                  ? opt.isCorrect
                                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/20'
                                    : 'bg-rose-950/50 border-rose-500 text-rose-200 ring-2 ring-rose-500/20'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                              }`}
                            >
                              <div className="font-semibold text-xs md:text-sm">{opt.textEs}</div>
                              <div className="text-[11px] text-amber-300/80 mt-1">{opt.textHy}</div>
                            </button>
                          );
                        })}
                      </div>

                      {userChoice && (
                        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-0.5">
                          <p className="text-slate-300">{sit.explanationEs}</p>
                          <p className="text-amber-300">{sit.explanationHy}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: MATEMÁTICAS DE FÚTBOL (PARTE 3) */}
        {/* ============================================================== */}
        {activeTab === 'math' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
                <span>🔢</span>
                <span>PARTE 3. Matemáticas de fútbol — Ֆուտբոլային մաթեմատիկա</span>
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                10 խնդիրներ՝ գոլեր, մարզաշապիկներ, ժամանակ, միավորներ, պտույտներ և տուգանայիններ։
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mathProblemsData.map((prob: MathProblem) => {
                const userChoice = mathAnswers[prob.id];
                const hasAnswered = userChoice !== undefined;
                const isCorrect = hasAnswered && userChoice === prob.correctIndex;

                return (
                  <div
                    key={prob.id}
                    className={`rounded-2xl border p-5 shadow-lg transition flex flex-col justify-between ${
                      hasAnswered
                        ? isCorrect
                          ? 'bg-slate-900 border-emerald-500/60 ring-1 ring-emerald-500/30'
                          : 'bg-slate-900 border-rose-500/60 ring-1 ring-rose-500/30'
                        : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-3">
                        <span className="text-xs font-bold text-amber-400">
                          {prob.titleEs} · {prob.titleHy}
                        </span>
                        <button
                          onClick={() => sounds.speakSpanish(prob.storyEs + ' ' + prob.questionEs)}
                          className="p-1 text-slate-400 hover:text-sky-400"
                          title="Լսել / Escuchar"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Story */}
                      <p className="text-sm text-slate-200 font-medium leading-relaxed">
                        {prob.storyEs}
                      </p>
                      <p className="text-xs text-amber-200/90 mt-1 font-normal">
                        {prob.storyHy}
                      </p>

                      {/* Question */}
                      <div className="mt-3 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                        <p className="text-sm font-bold text-amber-300">
                          {prob.questionEs}
                        </p>
                        <p className="text-xs text-amber-200/70 mt-0.5">
                          {prob.questionHy}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {prob.options.map((opt, oIdx) => {
                          const isOptionCorrect = oIdx === prob.correctIndex;
                          const isSelected = userChoice === oIdx;

                          let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750';
                          if (hasAnswered) {
                            if (isOptionCorrect) {
                              btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                            } else if (isSelected) {
                              btnStyle = 'bg-rose-600 text-white border-rose-400';
                            } else {
                              btnStyle = 'opacity-40 bg-slate-900 border-slate-800 text-slate-500';
                            }
                          }

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleMathSelect(prob.id, oIdx)}
                              className={`p-2 rounded-lg border text-xs text-left transition flex items-center justify-between ${btnStyle}`}
                            >
                              <div>
                                <span className="font-black mr-1.5">{opt.id})</span>
                                <span>{opt.textEs}</span>
                                <span className="block text-[10px] opacity-80">{opt.textHy}</span>
                              </div>
                              {hasAnswered && isOptionCorrect && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Calculation step */}
                    {hasAnswered && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs">
                        <div className="font-semibold text-emerald-400">
                          Հաշվարկը / Cálculo:
                        </div>
                        <p className="text-slate-300 font-mono mt-0.5">{prob.calculationEs}</p>
                        <p className="text-amber-300/80">{prob.calculationHy}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: LÓGICA FUTBOLÍSTICA (PARTE 4) */}
        {/* ============================================================== */}
        {activeTab === 'logic' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
                <span>🧠</span>
                <span>PARTE 4. Lógica futbolística — Ֆուտբոլային տրամաբանություն</span>
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                3 տրամաբանական գլուխկոտրուկներ. ո՞վ խփեց գոլը, դիրքերի բաշխում և վազքի արդյունքներ։
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {logicPuzzlesData.map(riddle => {
                const userChoice = logicAnswers[riddle.id];
                const hasAnswered = userChoice !== undefined;
                const isCorrect = hasAnswered && userChoice === riddle.correctIndex;

                return (
                  <div
                    key={riddle.id}
                    className={`bg-slate-900 rounded-2xl border p-5 shadow-xl flex flex-col justify-between transition ${
                      hasAnswered
                        ? isCorrect
                          ? 'border-emerald-500/60 ring-1 ring-emerald-500/30'
                          : 'border-rose-500/60 ring-1 ring-rose-500/30'
                        : 'border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="border-b border-slate-800 pb-2 mb-3 flex items-center justify-between">
                        <h3 className="font-bold text-sm text-amber-400">
                          {riddle.titleEs}
                        </h3>
                        <span className="text-xs text-slate-400">#{riddle.id}</span>
                      </div>

                      {/* Story in Spanish and Armenian */}
                      <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                        {riddle.storyEs}
                      </div>
                      <div className="text-xs text-amber-300/80 leading-relaxed whitespace-pre-line bg-slate-950/40 p-3 rounded-xl border border-slate-800/40 mt-2">
                        {riddle.storyHy}
                      </div>

                      {/* Question */}
                      <div className="mt-3 font-bold text-sm text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{riddle.questionEs} ({riddle.questionHy})</span>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 mt-3">
                        {riddle.options.map((opt, oIdx) => {
                          const isOptionCorrect = oIdx === riddle.correctIndex;
                          const isSelected = userChoice === oIdx;

                          let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750';
                          if (hasAnswered) {
                            if (isOptionCorrect) {
                              btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                            } else if (isSelected) {
                              btnStyle = 'bg-rose-600 text-white border-rose-400';
                            } else {
                              btnStyle = 'opacity-40 bg-slate-900 border-slate-800 text-slate-500';
                            }
                          }

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleLogicSelect(riddle.id, oIdx)}
                              className={`w-full p-2.5 rounded-lg border text-xs text-left transition flex items-center justify-between ${btnStyle}`}
                            >
                              <div>
                                <span className="font-black mr-2">{opt.id})</span>
                                <span>{opt.textEs}</span>
                                <span className="text-[11px] opacity-80 ml-2">({opt.textHy})</span>
                              </div>
                              {hasAnswered && isOptionCorrect && <Check className="w-3.5 h-3.5 text-white" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Solution explanation */}
                    {hasAnswered && (
                      <div className="mt-4 pt-3 border-t border-slate-800 text-xs space-y-1">
                        <span className="font-bold text-amber-400 block">Լուծման տրամաբանությունը / Deducción:</span>
                        <p className="text-slate-300 whitespace-pre-line">{riddle.solutionEs}</p>
                        <p className="text-amber-300/80 whitespace-pre-line pt-1 border-t border-slate-800/40">
                          {riddle.solutionHy}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: COMPRENSIÓN LECTORA (PARTE 5) */}
        {/* ============================================================== */}
        {activeTab === 'story' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
                    <span>📖</span>
                    <span>PARTE 5. Comprensión lectora — Էնրիկեի Խաղը</span>
                  </h2>
                  <p className="text-slate-400 text-xs md:text-sm mt-1">
                    «El partido de Enrique» · Կարդա՛ պատմությունը և պատասխանի՛ր 10 հարցերին։
                  </p>
                </div>
                <button
                  onClick={() => {
                    const fullText = storyParagraphs.map(p => p.textEs).join(' ');
                    sounds.speakSpanish(fullText);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center gap-1.5 shadow"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Լսել ամբողջ պատմությունը</span>
                </button>
              </div>
            </div>

            {/* BILINGUAL STORY READER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                <h3 className="font-extrabold text-base text-white">
                  El partido de Enrique
                </h3>
                <span className="text-xs text-slate-400">
                  Սեղմիր ցանկացած պարբերության վրա՝ հայերեն տեսնելու համար
                </span>
              </div>

              <div className="space-y-3">
                {storyParagraphs.map(p => {
                  const pKey = `story-p-${p.id}`;
                  const showArm = isTranslated(pKey);

                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleTranslation(pKey)}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm md:text-base text-slate-100 font-medium leading-relaxed">
                          {p.speaker && (
                            <strong className="text-amber-400 mr-1.5">[{p.speaker}]:</strong>
                          )}
                          {p.textEs}
                        </p>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            sounds.speakSpanish(p.textEs);
                          }}
                          className="p-1 text-slate-400 hover:text-sky-400 shrink-0"
                          title="Լսել / Escuchar"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {showArm && (
                        <p className="text-xs md:text-sm text-amber-300/90 pt-1.5 border-t border-slate-800/60 font-normal leading-relaxed">
                          {p.textHy}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 10 COMPREHENSION QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-white">
                  Preguntas de comprensión lectora (1–10)
                </h3>
                <p className="text-xs text-amber-300">
                  Ստուգի՛ր քո ուշադրությունը պատմության նկատմամբ։
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {storyQuestionsData.map(sq => {
                  const userChoice = storyAnswers[sq.id];
                  const hasAnswered = userChoice !== undefined;
                  const isCorrect = hasAnswered && userChoice === sq.correctIndex;

                  return (
                    <div
                      key={sq.id}
                      className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                        hasAnswered
                          ? isCorrect
                            ? 'bg-slate-950/70 border-emerald-500/60'
                            : 'bg-slate-950/70 border-rose-500/60'
                          : 'bg-slate-950/50 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold text-amber-400">Հարց #{sq.id}</span>
                          <button
                            onClick={() => sounds.speakSpanish(sq.questionEs)}
                            className="p-1 text-slate-400 hover:text-sky-400"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="font-semibold text-sm text-white">
                          {sq.questionEs}
                        </p>
                        <p className="text-xs text-amber-200/80 mt-0.5">
                          {sq.questionHy}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-3">
                          {sq.options.map((opt, oIdx) => {
                            const isOptionCorrect = oIdx === sq.correctIndex;
                            const isSelected = userChoice === oIdx;

                            let btnStyle = 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750';
                            if (hasAnswered) {
                              if (isOptionCorrect) {
                                btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                              } else if (isSelected) {
                                btnStyle = 'bg-rose-600 text-white border-rose-400';
                              } else {
                                btnStyle = 'opacity-40 bg-slate-900 border-slate-800 text-slate-500';
                              }
                            }

                            return (
                              <button
                                key={opt.id}
                                onClick={() => handleStorySelect(sq.id, oIdx)}
                                className={`p-2 rounded-lg border text-xs text-left transition flex items-center justify-between ${btnStyle}`}
                              >
                                <div>
                                  <span className="font-bold mr-1">{opt.id})</span>
                                  <span>{opt.textEs}</span>
                                  <span className="block text-[10px] opacity-80">{opt.textHy}</span>
                                </div>
                                {hasAnswered && isOptionCorrect && <Check className="w-3.5 h-3.5 text-white" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {hasAnswered && (
                        <div className="mt-3 pt-2 border-t border-slate-800/80 text-xs">
                          <p className="text-emerald-400 font-semibold">{sq.answerEs}</p>
                          <p className="text-amber-300/80">{sq.answerHy}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: CLAVE DE RESPUESTAS (ՊԱՏԱՍԽԱՆՆԵՐԻ ԲԱՆԱԼԻ) */}
        {/* ============================================================== */}
        {activeTab === 'answers' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-amber-400" />
                  <span>Clave de respuestas — Պատասխանների բանալի</span>
                </h2>
                <p className="text-slate-400 text-xs md:text-sm mt-1">
                  Բոլոր 20 վիկտորինայի հարցերի, մաթեմատիկայի, տրամաբանության և վարժությունների ամբողջական բացատրությունները։
                </p>
              </div>

              <input
                type="text"
                placeholder="Փնտրել բառ կամ հարց / Buscar..."
                value={answerKeySearch}
                onChange={e => setAnswerKeySearch(e.target.value)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* SECTION 1: QUIZ 20 QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-extrabold text-base text-amber-400 border-b border-slate-800 pb-2">
                Parte 1: 20 Preguntas del Quiz Millonario
              </h3>

              <div className="space-y-3">
                {millionaireQuestions
                  .filter(q =>
                    answerKeySearch === '' ||
                    q.questionEs.toLowerCase().includes(answerKeySearch.toLowerCase()) ||
                    q.questionHy.toLowerCase().includes(answerKeySearch.toLowerCase())
                  )
                  .map(q => {
                    const correctOpt = q.options[q.correctIndex];
                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-amber-400">
                            #{q.id} · {q.prize}
                          </span>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                            Ճիշտ պատասխան՝ {correctOpt.id}
                          </span>
                        </div>

                        <p className="text-sm font-bold text-slate-100">{q.questionEs}</p>
                        <p className="text-xs text-amber-300 font-medium">{q.questionHy}</p>

                        <div className="pt-1.5 text-xs text-emerald-300 font-semibold">
                          ✅ {correctOpt.id}) {correctOpt.textEs} — {correctOpt.textHy}
                        </div>

                        <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                          💡 <strong>Բացատրություն:</strong> {q.explanationEs} / {q.explanationHy}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* SECTION 2: EXERCISES ANSWERS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exercise 1 & 2 answers */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
                <h3 className="font-extrabold text-base text-amber-400 border-b border-slate-800 pb-2">
                  Parte 2. Ejercicio 1 (Բառերը)
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {fillInBlanksData.map(f => (
                    <li key={f.id} className="p-2 rounded bg-slate-950/60 border border-slate-800">
                      <strong>{f.id}.</strong> {f.sentenceEs.replace('______', `[${f.targetWord.toUpperCase()}]`)}
                      <span className="block text-amber-300/80 text-[11px] mt-0.5">
                        {f.sentenceHy}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exercise 2 answers (Verdadero / Falso) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
                <h3 className="font-extrabold text-base text-amber-400 border-b border-slate-800 pb-2">
                  Parte 2. Ejercicio 2 (Ճի՞շտ, թե՞ սխալ)
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {trueFalseData.map(tf => (
                    <li key={tf.id} className="p-2 rounded bg-slate-950/60 border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span><strong>{tf.id}.</strong> {tf.statementEs}</span>
                        <span className={`font-bold ml-2 shrink-0 ${tf.isTrue ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {tf.isTrue ? 'VERDADERO (ՃԻՇՏ)' : 'FALSO (ՍԽԱԼ)'}
                        </span>
                      </div>
                      <span className="block text-amber-300/80 text-[11px] mt-0.5">
                        {tf.statementHy}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SECTION 3: MATH PROBLEMS ANSWERS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <h3 className="font-extrabold text-base text-amber-400 border-b border-slate-800 pb-2">
                Parte 3. Matemáticas de fútbol (10 Խնդիրների պատասխանները)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {mathProblemsData.map(mp => (
                  <div key={mp.id} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="font-bold text-amber-300">{mp.titleEs}:</span>
                    <span className="font-bold text-emerald-400 ml-2">
                      {mp.options[mp.correctIndex].id}) {mp.options[mp.correctIndex].textEs}
                    </span>
                    <p className="text-slate-400 mt-1 font-mono">{mp.calculationEs}</p>
                    <p className="text-amber-300/80 text-[11px]">{mp.calculationHy}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: LOGIC ANSWERS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <h3 className="font-extrabold text-base text-amber-400 border-b border-slate-800 pb-2">
                Parte 4. Lógica futbolística (Տրամաբանական լուծումներ)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {logicPuzzlesData.map(lp => (
                  <div key={lp.id} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-300 block">{lp.titleEs}</span>
                    <span className="font-bold text-emerald-400 block">
                      Պատասխան՝ {lp.options[lp.correctIndex].id}) {lp.options[lp.correctIndex].textEs} ({lp.options[lp.correctIndex].textHy})
                    </span>
                    <p className="text-slate-400 text-[11px] pt-1">{lp.solutionEs}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        <p>
          ⚽ Ֆուտբոլային Վիկտորինա · Nivel A1–A2 · Español y Armenio · 12–14 años
        </p>
        <p className="text-[11px] text-slate-600 mt-0.5">
          «Кто хочет стать миллионером» ոճի կրթական խաղ՝ հայերեն առանձին թարգմանություններով
        </p>
      </footer>

      {/* MODAL: COACH CALL (Míster) */}
      {coachModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-2xl">
                👨‍💼
              </div>
              <div>
                <h3 className="font-black text-base text-yellow-400">
                  Llamada al Entrenador / Մարզչի Զանգը
                </h3>
                <p className="text-xs text-slate-400">Consejo táctico directo del banquillo</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <p className="text-sm font-semibold text-slate-100 italic">
                {currentQ.coachTipEs}
              </p>
              <p className="text-xs font-medium text-amber-300 border-t border-slate-800/60 pt-2">
                {currentQ.coachTipHy}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setCoachModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-yellow-500 text-slate-950 font-bold text-xs hover:bg-yellow-400 transition"
              >
                ¡Gracias, Míster! / Շնորհակալություն
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: STADIUM CROWD POLL */}
      {crowdModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-2xl">
                👥
              </div>
              <div>
                <h3 className="font-black text-base text-purple-400">
                  Opinión del Estadio / Երկրպագուների կարծիքը
                </h3>
                <p className="text-xs text-slate-400">Votación en vivo de las gradas (100%)</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {['A', 'B', 'C', 'D'].map((letter, i) => {
                const percent = crowdStats[i] || 0;
                return (
                  <div key={letter} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300">Opción {letter}</span>
                      <span className="text-purple-300">{percent}%</span>
                    </div>
                    <div className="h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCrowdModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-purple-500 text-slate-950 font-bold text-xs hover:bg-purple-400 transition"
              >
                Ընդունել կարծիքը / Volver al juego
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
