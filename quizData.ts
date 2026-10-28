export interface QuizOption {
  id: 'A' | 'B' | 'C' | 'D';
  textEs: string;
  textHy: string;
}

export interface QuizQuestion {
  id: number;
  level: number;
  prize: string;
  questionEs: string;
  questionHy: string;
  options: QuizOption[];
  correctIndex: number;
  explanationEs: string;
  explanationHy: string;
  coachTipEs: string;
  coachTipHy: string;
}

export interface FillExerciseItem {
  id: number;
  sentenceEs: string; // contains blank ______
  sentenceHy: string;
  targetWord: string;
  hintEs: string;
  hintHy: string;
}

export interface TrueFalseItem {
  id: number;
  statementEs: string;
  statementHy: string;
  isTrue: boolean;
  explanationEs: string;
  explanationHy: string;
}

export interface SituationItem {
  id: number;
  titleEs: string;
  titleHy: string;
  contextEs: string;
  contextHy: string;
  options: {
    id: string;
    textEs: string;
    textHy: string;
    isCorrect: boolean;
  }[];
  explanationEs: string;
  explanationHy: string;
}

export interface MathProblem {
  id: number;
  titleEs: string;
  titleHy: string;
  storyEs: string;
  storyHy: string;
  questionEs: string;
  questionHy: string;
  options: {
    id: 'A' | 'B' | 'C' | 'D';
    textEs: string;
    textHy: string;
  }[];
  correctIndex: number;
  calculationEs: string;
  calculationHy: string;
}

export interface LogicRiddle {
  id: number;
  titleEs: string;
  titleHy: string;
  storyEs: string;
  storyHy: string;
  cluesEs: string[];
  cluesHy: string[];
  questionEs: string;
  questionHy: string;
  options: {
    id: 'A' | 'B' | 'C' | 'D';
    textEs: string;
    textHy: string;
  }[];
  correctIndex: number;
  solutionEs: string;
  solutionHy: string;
}

export interface StoryQuestion {
  id: number;
  questionEs: string;
  questionHy: string;
  options: {
    id: 'A' | 'B' | 'C' | 'D';
    textEs: string;
    textHy: string;
  }[];
  correctIndex: number;
  answerEs: string;
  answerHy: string;
}

// 20 MILLIONAIRE QUESTIONS
export const millionaireQuestions: QuizQuestion[] = [
  {
    id: 1,
    level: 1,
    prize: "100 €",
    questionEs: "¿Qué haces si tu compañero está libre cerca de la portería?",
    questionHy: "Ի՞նչ ես անում, եթե թիմակիցդ ազատ է դարպասի մոտ։",
    options: [
      { id: 'A', textEs: "Le paso el balón", textHy: "Փոխանցում եմ գնդակը" },
      { id: 'B', textEs: "Salgo del campo", textHy: "Դուրս եմ գալիս դաշտից" },
      { id: 'C', textEs: "Me quedo parado", textHy: "Կանգնում եմ անշարժ" },
      { id: 'D', textEs: "Corro hacia mi portería", textHy: "Վազում եմ դեպի իմ դարպասը" }
    ],
    correctIndex: 0,
    explanationEs: "El fútbol es un juego de equipo. Si tu compañero está libre cerca de la portería contraria, pasarle el balón es la mejor opción para marcar un gol.",
    explanationHy: "Ֆուտբոլը թիմային խաղ է։ Եթե թիմակիցդ մրցակցի դարպասի մոտ ազատ է, նրան գնդակը փոխանցելը գոլ խփելու լավագույն միջոցն է։",
    coachTipEs: "«¡Mira siempre quién está mejor posicionado para marcar!»",
    coachTipHy: "«Միշտ նայիր, թե ով է գտնվում գոլ խփելու համար առավել հարմար դիրքում»"
  },
  {
    id: 2,
    level: 2,
    prize: "200 €",
    questionEs: "El entrenador grita: «¡Presiona al rival!». ¿Qué significa?",
    questionHy: "Մարզիչը գոռում է. «Սեղմի՛ր մրցակցին»։ Ի՞նչ է դա նշանակում։",
    options: [
      { id: 'A', textEs: "Dejarlo correr libremente", textHy: "Թողնել, որ ազատ վազի" },
      { id: 'B', textEs: "Acercarse y dificultar su juego", textHy: "Մոտենալ և դժվարացնել նրա խաղը" },
      { id: 'C', textEs: "Salir del campo", textHy: "Դուրս գալ դաշտից" },
      { id: 'D', textEs: "Esperar al portero", textHy: "Սպասել դարպասապահին" }
    ],
    correctIndex: 1,
    explanationEs: "«Presionar» en fútbol significa aproximarse rápidamente al adversario que tiene el balón para obligarlo a equivocarse o recuperar la posesión.",
    explanationHy: "Ֆուտբոլում «սեղմել/մամլել» (presionar) նշանակում է արագ մոտենալ գնդակով մրցակցին, որպեսզի սխալվի կամ գնդակը խլվի։",
    coachTipEs: "«¡No le des tiempo para pensar ni espacio para controlar!»",
    coachTipHy: "«Մի՛ տուր նրան մտածելու ժամանակ և կառավարելու տարածություն»"
  },
  {
    id: 3,
    level: 3,
    prize: "300 €",
    questionEs: "¿Cómo se dice «Փոխանցի՛ր ինձ գնդակը» en español?",
    questionHy: "Ինչպե՞ս իսպաներեն ասել «Փոխանցի՛ր ինձ գնդակը»։",
    options: [
      { id: 'A', textEs: "¡Corre más rápido!", textHy: "Վազի՛ր ավելի արագ" },
      { id: 'B', textEs: "¡Tira a puerta!", textHy: "Հարվածի՛ր դարպասին" },
      { id: 'C', textEs: "¡Pásame el balón!", textHy: "Փոխանցի՛ր ինձ գնդակը" },
      { id: 'D', textEs: "¡Defiende!", textHy: "Պաշտպանվի՛ր" }
    ],
    correctIndex: 2,
    explanationEs: "«¡Pásame el balón!» o «¡Pásamela!» es la orden exacta para pedir un pase.",
    explanationHy: "«¡Pásame el balón!» նշանակում է «Փոխանցի՛ր ինձ գնդակը»։",
    coachTipEs: "«Pasa + me = pásame (pasa a mí). El balón es el objeto.»",
    coachTipHy: "«Pasa (փոխանցիր) + me (ինձ) = Pásame el balón»"
  },
  {
    id: 4,
    level: 4,
    prize: "500 €",
    questionEs: "¿Qué haces si un rival corre hacia tu portería con el balón?",
    questionHy: "Ի՞նչ ես անում, եթե մրցակիցը գնդակով վազում է դեպի քո դարպասը։",
    options: [
      { id: 'A', textEs: "Me siento en el suelo", textHy: "Նստում եմ գետնին" },
      { id: 'B', textEs: "Dejo de correr", textHy: "Դադարում եմ վազել" },
      { id: 'C', textEs: "Le doy la espalda", textHy: "Մեջքով շրջվում եմ" },
      { id: 'D', textEs: "Intento cerrarle el paso", textHy: "Փորձում եմ փակել նրա ճանապարհը" }
    ],
    correctIndex: 3,
    explanationEs: "Como defensor, debes cortar las líneas de avance e intentar tapar el ángulo de disparo hacia la portería.",
    explanationHy: "Որպես պաշտպան՝ դու պետք է կանխես նրա առաջխաղացումը և փակես հարվածի ճանապարհը դեպի քո դարպաս։",
    coachTipEs: "«Ponte entre el atacante y tu portería, aguanta sin hacer falta.»",
    coachTipHy: "«Կանգնիր հարձակվողի և քո դարպասի միջև, պահիր դիրքդ»"
  },
  {
    id: 5,
    level: 5,
    prize: "1.000 € ★",
    questionEs: "¿Qué significa «¡Desmárcate!»?",
    questionHy: "Ի՞նչ է նշանակում «¡Desmárcate!»։",
    options: [
      { id: 'A', textEs: "Busca un espacio libre", textHy: "Գտի՛ր ազատ տարածք" },
      { id: 'B', textEs: "Quédate quieto", textHy: "Մնա՛ անշարժ" },
      { id: 'C', textEs: "Sal del campo", textHy: "Դո՛ւրս արի դաշտից" },
      { id: 'D', textEs: "Cambia de camiseta", textHy: "Փոխի՛ր մարզաշապիկդ" }
    ],
    correctIndex: 0,
    explanationEs: "«Desmarcarse» es el movimiento que hace un jugador para librarse de la marca de un adversario y situarse en una posición ventajosa.",
    explanationHy: "«Desmarcarse» նշանակում է ազատվել մրցակցի հսկողությունից և դուրս գալ ազատ տարածություն՝ փոխանցում ստանալու համար։",
    coachTipEs: "«¡Muévete a la espalda del defensor o al espacio libre!»",
    coachTipHy: "«Տեղաշարժվիր պաշտպանի թիկունքով կամ դեպի ազատ տարածություն»"
  },
  {
    id: 6,
    level: 6,
    prize: "2.000 €",
    questionEs: "¿Qué debe hacer un portero cuando un rival dispara a puerta?",
    questionHy: "Ի՞նչ պետք է անի դարպասապահը, երբ մրցակիցը հարվածում է դարպասին։",
    options: [
      { id: 'A', textEs: "Cerrar los ojos", textHy: "Փակել աչքերը" },
      { id: 'B', textEs: "Intentar parar el balón", textHy: "Փորձել կանգնեցնել գնդակը" },
      { id: 'C', textEs: "Salir corriendo del campo", textHy: "Վազելով դուրս գալ դաշտից" },
      { id: 'D', textEs: "Dar la espalda al balón", textHy: "Մեջքով շրջվել գնդակին" }
    ],
    correctIndex: 1,
    explanationEs: "La función primordial del guardameta (portero) es impedir que el balón cruce la línea de gol atajando o desviando el disparo.",
    explanationHy: "Դարպասապահի առաջնային խնդիրն է թույլ չտալ, որ գնդակը հատի դարպասային գիծը՝ որսալով կամ հետ մղելով այն։",
    coachTipEs: "«Mantente bien apoyado y atento a la trayectoria del balón.»",
    coachTipHy: "«Ուշադիր եղիր գնդակի հետագծին և կայուն կանգնիր ոտքերիդ վրա»"
  },
  {
    id: 7,
    level: 7,
    prize: "4.000 €",
    questionEs: "¿Qué significa «¡Cubre al delantero!»?",
    questionHy: "Ի՞նչ է նշանակում «¡Cubre al delantero!»։",
    options: [
      { id: 'A', textEs: "Pásale el balón", textHy: "Գնդակը փոխանցիր նրան" },
      { id: 'B', textEs: "Deja que marque", textHy: "Թող գոլ խփի" },
      { id: 'C', textEs: "Vigila y marca al atacante", textHy: "Հսկիր հարձակվողին" },
      { id: 'D', textEs: "Corre al banquillo", textHy: "Վազիր նստարանների մոտ" }
    ],
    correctIndex: 2,
    explanationEs: "«Cubrir» o «marcar» a un delantero rival significa situarse cerca de él para evitar que reciba la pelota y cree peligro.",
    explanationHy: "«Cubrir» նշանակում է անհատապես հսկել հարձակվողին, թույլ չտալ նրան ազատորեն ընդունել գնդակը։",
    coachTipEs: "«No dejes que gire de cara a nuestra portería.»",
    coachTipHy: "«Թույլ մի տուր, որ նա շրջվի դեմքով դեպի մեր դարպասը»"
  },
  {
    id: 8,
    level: 8,
    prize: "8.000 €",
    questionEs: "¿Qué dices cuando quieres recibir un pase?",
    questionHy: "Ի՞նչ ես ասում, երբ ցանկանում ես փոխանցում ստանալ։",
    options: [
      { id: 'A', textEs: "¡Estoy cansado!", textHy: "Հոգնած եմ" },
      { id: 'B', textEs: "¡Tengo hambre!", textHy: "Սոված եմ" },
      { id: 'C', textEs: "¡Hasta mañana!", textHy: "Մինչ վաղը" },
      { id: 'D', textEs: "¡Estoy libre, pásamela!", textHy: "Ազատ եմ, փոխանցի՛ր ինձ" }
    ],
    correctIndex: 3,
    explanationEs: "La comunicación en el campo es vital: avisar a tu compañero con voz clara de que estás desmarcado facilita una jugada rápida.",
    explanationHy: "Դաշտում ձայնով շփումը կարևոր է. թիմակցիդ հստակ տեղեկացնելը («Ազատ եմ, փոխանցի՛ր ինձ»), արագացնում է գրոհը։",
    coachTipEs: "«¡Grita fuerte y con convicción para que tu compañero te oiga!»",
    coachTipHy: "«Բարձր ու վստահ ձայն տուր, որպեսզի թիմակիցդ լսի քեզ»"
  },
  {
    id: 9,
    level: 9,
    prize: "16.000 €",
    questionEs: "¿Qué significa «¡Tira a puerta!»?",
    questionHy: "Ի՞նչ է նշանակում «¡Tira a puerta!»։",
    options: [
      { id: 'A', textEs: "Dispara hacia la portería", textHy: "Հարվածիր դեպի դարպասը" },
      { id: 'B', textEs: "Corre hacia atrás", textHy: "Վազիր հետ" },
      { id: 'C', textEs: "Pasa al portero", textHy: "Փոխանցիր դարպասապահին" },
      { id: 'D', textEs: "Sal del campo", textHy: "Դուրս արի դաշտից" }
    ],
    correctIndex: 0,
    explanationEs: "«Tirar a puerta» o «disparar a portería» significa chutar el balón con la intención de conseguir un gol.",
    explanationHy: "«Tirar a puerta» նշանակում է ուժեղ հարվածել դեպի դարպասը՝ գոլ խփելու նպատակով։",
    coachTipEs: "«Si tienes hueco y ángulo limpio, ¡chuta a portería sin dudar!»",
    coachTipHy: "«Եթե տեսնում ես դարպասի անկյունը, մի՛ վարանիր, հարվածի՛ր»"
  },
  {
    id: 10,
    level: 10,
    prize: "32.000 € ★",
    questionEs: "¿Qué haces si tu compañero pierde el balón?",
    questionHy: "Ի՞նչ ես անում, եթե թիմակիցդ կորցնում է գնդակը։",
    options: [
      { id: 'A', textEs: "Me río de él", textHy: "Ծիծաղում եմ նրա վրա" },
      { id: 'B', textEs: "Intento ayudar a recuperarlo", textHy: "Փորձում եմ օգնել վերադարձնել գնդակը" },
      { id: 'C', textEs: "Dejo de jugar", textHy: "Դադարում եմ խաղալ" },
      { id: 'D', textEs: "Me voy al vestuario", textHy: "Գնում եմ հանդերձարան" }
    ],
    correctIndex: 1,
    explanationEs: "En el fútbol de equipo, todos defienden y todos atacan. Cuando se pierde el balón, la reacción inmediata es presionar juntos para recuperarlo.",
    explanationHy: "Թիմային ֆուտբոլում բոլորն են պաշտպանվում։ Երբ գնդակը կորչում է, անմիջապես պետք է օգնել թիմին այն հետ նվաճելու։",
    coachTipEs: "«¡Solidaridad! Tras pérdida, transición defensiva inmediata.»",
    coachTipHy: "«Համախմբվածություն. գնդակը կորցնելուց հետո անմիջապես անցիր պաշտպանության»"
  },
  {
    id: 11,
    level: 11,
    prize: "64.000 €",
    questionEs: "¿Qué significa «¡Mantén tu posición!»?",
    questionHy: "Ի՞նչ է նշանակում «¡Mantén tu posición!»։",
    options: [
      { id: 'A', textEs: "Cambia de equipo", textHy: "Փոխիր թիմդ" },
      { id: 'B', textEs: "Corre sin parar", textHy: "Վազիր անդադար" },
      { id: 'C', textEs: "Conserva tu posición", textHy: "Պահպանիր դիրքդ" },
      { id: 'D', textEs: "Ve al banquillo", textHy: "Գնա նստարանին" }
    ],
    correctIndex: 2,
    explanationEs: "Mantener la posición táctica evita descompensar las líneas del equipo y dejar huecos que el rival pueda aprovechar.",
    explanationHy: "Դիրքը պահպանելը կարևոր է, որպեսզի թիմի կառուցվածքը չխախտվի և մրցակիցը չօգտվի դատարկ տարածություններից։",
    coachTipEs: "«No persigas el balón a lo loco; respeta tu zona táctica.»",
    coachTipHy: "«Անտեղի մի վազիր գնդակի հետևից, հարգիր քո խաղային գոտին»"
  },
  {
    id: 12,
    level: 12,
    prize: "125.000 €",
    questionEs: "¿Qué dices si necesitas ayuda en defensa?",
    questionHy: "Ի՞նչ ես ասում, եթե պաշտպանությունում օգնության կարիք ունես։",
    options: [
      { id: 'A', textEs: "¡Quiero descansar!", textHy: "Ուզում եմ հանգստանալ" },
      { id: 'B', textEs: "¡Tengo sed!", textHy: "Ծարավ եմ" },
      { id: 'C', textEs: "¡Vamos a celebrar!", textHy: "Եկեք տոնենք" },
      { id: 'D', textEs: "¡Ayúdame a defender!", textHy: "Օգնի՛ր ինձ պաշտպանվել" }
    ],
    correctIndex: 3,
    explanationEs: "Pedir apoyo («¡Ayúdame a defender!» o «¡Dos contra uno!») permite hacer coberturas y doblar la marca ante un delantero peligroso.",
    explanationHy: "Օգնություն կանչելը («Օգնի՛ր ինձ պաշտպանվել») հնարավորություն է տալիս երկուսով փակել վտանգավոր մրցակցին։",
    coachTipEs: "«El verbo 'ayudar' en imperativo con pronombre es: ayúdame.»",
    coachTipHy: "«Իսպաներեն հրամայականը՝ Ayúdame (օգնիր ինձ) + a defender (պաշտպանվել)»"
  },
  {
    id: 13,
    level: 13,
    prize: "250.000 €",
    questionEs: "¿Qué significa «¡Abre el campo!»?",
    questionHy: "Ի՞նչ է նշանակում «¡Abre el campo!»։",
    options: [
      { id: 'A', textEs: "Ocupa más espacio a lo ancho", textHy: "Օգտագործիր դաշտի լայնությունը" },
      { id: 'B', textEs: "Cierra la puerta", textHy: "Փակիր դուռը" },
      { id: 'C', textEs: "Acércate al árbitro", textHy: "Մոտեցիր մրցավարին" },
      { id: 'D', textEs: "Sal del estadio", textHy: "Դուրս արի մարզադաշտից" }
    ],
    correctIndex: 0,
    explanationEs: "Abrir el campo significa que los extremos y laterales se pegan a las líneas de banda para ensanchar el terreno y generar espacios por dentro.",
    explanationHy: "«Դաշտը բացել» նշանակում է օգտագործել դաշտի ողջ լայնությունը՝ եզրերով տարածվելով, ինչը մեծացնում է ազատ տարածությունները կենտրոնում։",
    coachTipEs: "«¡A las bandas! Más anchura crea más huecos entre los defensores.»",
    coachTipHy: "«Դեպի եզրե՛ր։ Լայն խաղը բացում է մրցակցի պաշտպանությունը»"
  },
  {
    id: 14,
    level: 14,
    prize: "500.000 € ★",
    questionEs: "¿Qué haces si un compañero se lesiona?",
    questionHy: "Ի՞նչ ես անում, եթե թիմակիցդ վնասվածք է ստանում։",
    options: [
      { id: 'A', textEs: "Lo ignoras", textHy: "Անտեսում ես նրան" },
      { id: 'B', textEs: "Avisas al árbitro y pides ayuda", textHy: "Տեղեկացնում ես մրցավարին և օգնություն խնդրում" },
      { id: 'C', textEs: "Le dices que corra más", textHy: "Ասում ես ավելի արագ վազի" },
      { id: 'D', textEs: "Lo obligas a jugar", textHy: "Ստիպում ես խաղալ" }
    ],
    correctIndex: 1,
    explanationEs: "El juego limpio (Fair Play) y la salud de los compañeros siempre están por encima del resultado: se detiene el juego y se llama a las asistencias médicas.",
    explanationHy: "Արդար խաղն ու առողջությունն առաջին տեղում են. անհրաժեշտ է զգուշացնել մրցավարին և կանչել բժշկական օգնություն։",
    coachTipEs: "«El juego limpio y la salud de cualquier jugador son lo primero.»",
    coachTipHy: "«Արդար խաղն ու ֆուտբոլիստի առողջությունը ամենակարևորն են»"
  },
  {
    id: 15,
    level: 15,
    prize: "600.000 €",
    questionEs: "¿Qué significa «¡Vuelve a defender!»?",
    questionHy: "Ի՞նչ է նշանակում «¡Vuelve a defender!»։",
    options: [
      { id: 'A', textEs: "Marca un gol", textHy: "Գոլ խփիր" },
      { id: 'B', textEs: "Quédate arriba", textHy: "Մնա առջևում" },
      { id: 'C', textEs: "Regresa para ayudar en defensa", textHy: "Վերադարձիր պաշտպանություն օգնելու" },
      { id: 'D', textEs: "Espera el descanso", textHy: "Սպասիր ընդմիջմանը" }
    ],
    correctIndex: 2,
    explanationEs: "«Volver» o «replegar» es el retroceso defensivo hacia tu propio campo para reorganizar la línea defensiva tras un ataque rival.",
    explanationHy: "«Vuelve a defender» նշանակում է արագ ետ վերադառնալ սեփական կիսադաշտ՝ պաշտպանվելուն օգնելու համար։",
    coachTipEs: "«¡Repliegue rápido! Baja a tapar la espalda de tus compañeros.»",
    coachTipHy: "«Արագ ետ քաշվիր՝ թիմակիցներիդ թիկունքը ապահովելու համար»"
  },
  {
    id: 16,
    level: 16,
    prize: "700.000 €",
    questionEs: "¿Qué debe hacer un jugador antes de recibir el balón?",
    questionHy: "Ի՞նչ պետք է անի խաղացողը գնդակը ստանալուց առաջ։",
    options: [
      { id: 'A', textEs: "Cerrar los ojos", textHy: "Փակել աչքերը" },
      { id: 'B', textEs: "Mirar solo al suelo", textHy: "Նայել միայն գետնին" },
      { id: 'C', textEs: "Ignorar a los rivales", textHy: "Անտեսել մրցակիցներին" },
      { id: 'D', textEs: "Observar el espacio y a los compañeros", textHy: "Դիտարկել տարածքն ու թիմակիցներին" }
    ],
    correctIndex: 3,
    explanationEs: "Escanear el campo antes de controlar el balón te permite saber qué harás (pasar, regatear o tirar) antes de que te presione el rival.",
    explanationHy: "Նախքան գնդակ ստանալը դաշտը դիտարկելը (սկանավորելը) հնարավորություն է տալիս նախապես որոշել հաջորդ քայլը։",
    coachTipEs: "«Gira la cabeza antes del control: visión periférica.»",
    coachTipHy: "«Գլուխդ շրջիր մինչև ընդունելը. ծայրամասային տեսողություն»"
  },
  {
    id: 17,
    level: 17,
    prize: "800.000 €",
    questionEs: "¿Qué dices para animar a un compañero que ha fallado un gol?",
    questionHy: "Ի՞նչ ես ասում թիմակցիդ ոգևորելու համար, եթե նա գոլ չի խփել։",
    options: [
      { id: 'A', textEs: "¡No pasa nada, sigue intentándolo!", textHy: "Ոչինչ, շարունակի՛ր փորձել" },
      { id: 'B', textEs: "¡Nunca vas a marcar!", textHy: "Դու երբեք գոլ չես խփի" },
      { id: 'C', textEs: "¡Juegas muy mal!", textHy: "Դու շատ վատ ես խաղում" },
      { id: 'D', textEs: "¡Sal del campo!", textHy: "Դուրս արի դաշտից" }
    ],
    correctIndex: 0,
    explanationEs: "Un buen compañero siempre apoya y motiva. Errar ocasiones es parte del juego, lo fundamental es no bajar los brazos y seguir intentando.",
    explanationHy: "Լավ թիմակիցը միշտ ոգևորում է. «Ոչինչ, շարունակի՛ր փորձել»։ Սխալներ լինում են բոլորի մոտ, կարևորը չհանձնվելն է։",
    coachTipEs: "«El compañerismo positivo multiplica el rendimiento del equipo.»",
    coachTipHy: "«Դրական աջակցությունը բարձրացնում է ողջ թիմի ոգին»"
  },
  {
    id: 18,
    level: 18,
    prize: "900.000 €",
    questionEs: "¿Qué significa «¡Cambia de banda!»?",
    questionHy: "Ի՞նչ է նշանակում «¡Cambia de banda!»։",
    options: [
      { id: 'A', textEs: "Cambia las botas", textHy: "Փոխիր խաղակոշիկները" },
      { id: 'B', textEs: "Lleva el juego hacia la otra banda", textHy: "Խաղը տեղափոխիր մյուս եզր" },
      { id: 'C', textEs: "Cambia de entrenador", textHy: "Փոխիր մարզչին" },
      { id: 'D', textEs: "Sal a descansar", textHy: "Դուրս արի հանգստանալու" }
    ],
    correctIndex: 1,
    explanationEs: "Cambiar de banda consiste en enviar un pase largo o cruzado al lado opuesto del campo, donde suele haber más espacio desguarnecido.",
    explanationHy: "«Խաղը տեղափոխել մյուս եզր» նշանակում է գնդակն ուղղել հակառակ եզր, որտեղ սովորաբար ավելի շատ ազատ տարածք կա։",
    coachTipEs: "«Si un lado está muy congestionado de rivales, cambia el juego al lado débil.»",
    coachTipHy: "«Եթե մի եզրը խիտ է մրցակիցներով, խաղը տեղափոխիր մյուս եզր»"
  },
  {
    id: 19,
    level: 19,
    prize: "950.000 €",
    questionEs: "Tu entrenador te pregunta: «¿Puedes jugar de lateral?». ¿Qué respondes si puedes?",
    questionHy: "Մարզիչը հարցնում է՝ «Կարո՞ղ ես խաղալ եզրային պաշտպանի դիրքում»։ Ի՞նչ ես պատասխանում, եթե կարող ես։",
    options: [
      { id: 'A', textEs: "No tengo balón", textHy: "Գնդակ չունեմ" },
      { id: 'B', textEs: "No quiero entrenar", textHy: "Չեմ ուզում մարզվել" },
      { id: 'C', textEs: "Sí, puedo jugar de lateral", textHy: "Այո, կարող եմ խաղալ եզրային պաշտպանի դիրքում" },
      { id: 'D', textEs: "Me gusta el estadio", textHy: "Ինձ դուր է գալիս մարզադաշտը" }
    ],
    correctIndex: 2,
    explanationEs: "«Sí, puedo jugar de lateral» responde afirmativamente y con precisión gramatical a la pregunta del entrenador.",
    explanationHy: "«Sí, puedo jugar de lateral» հստակ և ճիշտ պատասխանն է մարզչի հարցին։",
    coachTipEs: "«Lateral es el defensa de banda (izquierdo o derecho).»",
    coachTipHy: "«Lateral = եզրային պաշտպան (ձախ կամ աջ)»"
  },
  {
    id: 20,
    level: 20,
    prize: "1.000.000 € 🏆",
    questionEs: "Tu equipo pierde 2-1 y quedan dos minutos. ¿Qué dices?",
    questionHy: "Քո թիմը պարտվում է 2-1 հաշվով, և մնացել է երկու րոպե։ Ի՞նչ ես ասում։",
    options: [
      { id: 'A', textEs: "¡Ya hemos perdido!", textHy: "Մենք արդեն պարտվել ենք" },
      { id: 'B', textEs: "¡Dejad de correr!", textHy: "Դադարեք վազել" },
      { id: 'C', textEs: "¡No quiero seguir!", textHy: "Չեմ ուզում շարունակել" },
      { id: 'D', textEs: "¡Vamos, todavía podemos empatar!", textHy: "Առա՛ջ, դեռ կարող ենք հավասարեցնել հաշիվը" }
    ],
    correctIndex: 3,
    explanationEs: "¡Mentalidad ganadora hasta el último segundo! En fútbol los partidos se juegan hasta el pitido final del árbitro.",
    explanationHy: "Հաղթողի մտածելակերպ մինչև վերջին վայրկյանը. «Առա՛ջ, դեռ կարող ենք հավասարեցնել հաշիվը»։ Խաղն ավարտվում է միայն սուլիչից հետո։",
    coachTipEs: "«¡Hasta el minuto 90 y el descuento! ¡Hasta el final, todo es posible!»",
    coachTipHy: "«Մինչև վերջին վայրկյանը հավատացեք, ամեն ինչ հնարավոր է»"
  }
];

// PARTE 2: EJERCICIOS VARIADOS
export const fillInBlanksData: FillExerciseItem[] = [
  {
    id: 1,
    sentenceEs: "¡______ el balón a tu compañero!",
    sentenceHy: "Փոխանցի՛ր գնդակը թիմակցիդ։",
    targetWord: "pasa",
    hintEs: "Verbo pasar en imperativo (tú)",
    hintHy: "«Փոխանցի՛ր» գործողությունը"
  },
  {
    id: 2,
    sentenceEs: "¡______ más rápido!",
    sentenceHy: "Վազի՛ր ավելի արագ։",
    targetWord: "corre",
    hintEs: "Verbo correr en imperativo (tú)",
    hintHy: "«Վազի՛ր» գործողությունը"
  },
  {
    id: 3,
    sentenceEs: "¡______ a puerta!",
    sentenceHy: "Հարվածի՛ր դարպասին։",
    targetWord: "tira",
    hintEs: "Verbo tirar (disparar)",
    hintHy: "«Հարվածի՛ր» գործողությունը"
  },
  {
    id: 4,
    sentenceEs: "¡______ al delantero rival!",
    sentenceHy: "Հսկի՛ր մրցակցի հարձակվողին։",
    targetWord: "cubre",
    hintEs: "Verbo cubrir (marcar de cerca)",
    hintHy: "«Հսկի՛ր / փակի՛ր» գործողությունը"
  },
  {
    id: 5,
    sentenceEs: "¡______ a defender!",
    sentenceHy: "Վերադարձի՛ր պաշտպանվելու։",
    targetWord: "vuelve",
    hintEs: "Verbo volver (regresar al campo propio)",
    hintHy: "«Վերադարձի՛ր» գործողությունը"
  },
  {
    id: 6,
    sentenceEs: "¡______ el segundo palo!",
    sentenceHy: "Պաշտպանի՛ր երկրորդ դարպասաձողը։",
    targetWord: "defiende",
    hintEs: "Verbo defender la zona lejana de la portería",
    hintHy: "«Պաշտպանի՛ր» գործողությունը"
  },
  {
    id: 7,
    sentenceEs: "¡______ antes de pasar!",
    sentenceHy: "Նայի՛ր մինչև փոխանցելը։",
    targetWord: "mira",
    hintEs: "Verbo mirar (observar a los compañeros)",
    hintHy: "«Նայի՛ր» գործողությունը"
  },
  {
    id: 8,
    sentenceEs: "¡______ el momento adecuado!",
    sentenceHy: "Սպասի՛ր հարմար պահին։",
    targetWord: "espera",
    hintEs: "Verbo esperar con paciencia táctica",
    hintHy: "«Սպասի՛ր» գործողությունը"
  }
];

export const trueFalseData: TrueFalseItem[] = [
  {
    id: 1,
    statementEs: "El portero puede usar las manos dentro de su propia área de penalti, según las reglas.",
    statementHy: "Դարպասապահը կարող է ձեռքերով խաղալ իր տուգանային հրապարակում՝ կանոնների համաձայն։",
    isTrue: true,
    explanationEs: "¡Correcto! Dentro del área penal reglamentaria, el portero es el único jugador autorizado a atrapar el balón con las manos.",
    explanationHy: "Ճիշտ է։ Տուգանային հրապարակի ներսում դարպասապահը կարող է ձեռքերով կանգնեցնել գնդակը։"
  },
  {
    id: 2,
    statementEs: "Un equipo empieza un partido normal con quince jugadores en el campo.",
    statementHy: "Սովորական խաղում թիմը խաղը սկսում է տասնհինգ խաղացողով։",
    isTrue: false,
    explanationEs: "¡Falso! En el fútbol reglamentario juegan 11 jugadores por equipo (incluido el portero), no 15.",
    explanationHy: "Սխալ է։ Ֆուտբոլային խաղը յուրաքանչյուր թիմից սկսում է 11 խաղացողով (ներառյալ դարպասապահը), ոչ թե 15:"
  },
  {
    id: 3,
    statementEs: "Un defensa ayuda a proteger su portería.",
    statementHy: "Պաշտպանն օգնում է պաշտպանել սեփական դարպասը։",
    isTrue: true,
    explanationEs: "¡Verdadero! La misión principal de los defensas (centrales y laterales) es neutralizar los ataques rivales.",
    explanationHy: "Ճիշտ է։ Պաշտպանների հիմնական նպատակն է պաշտպանել սեփական դարպասը մրցակցի գրոհներից։"
  },
  {
    id: 4,
    statementEs: "Una tarjeta roja significa expulsión.",
    statementHy: "Կարմիր քարտը նշանակում է հեռացում։",
    isTrue: true,
    explanationEs: "¡Verdadero! Cuando el árbitro muestra tarjeta roja directa o doble amarilla, el jugador debe abandonar el terreno de juego.",
    explanationHy: "Ճիշտ է։ Կարմիր քարտը նշանակում է խաղադաշտից հեռացում մինչև խաղի ավարտը։"
  },
  {
    id: 5,
    statementEs: "Un delantero juega siempre de portero.",
    statementHy: "Հարձակվողը միշտ խաղում է դարպասապահի դիրքում։",
    isTrue: false,
    explanationEs: "¡Falso! El delantero juega en la línea ofensiva para marcar goles; el portero defiende los tres palos.",
    explanationHy: "Սխալ է։ Հարձակվողը գրոհում է և գոլեր խփում, իսկ դարպասապահը պաշտպանում է դարպասը։"
  },
  {
    id: 6,
    statementEs: "Un partido de fútbol puede terminar en empate.",
    statementHy: "Ֆուտբոլային խաղը կարող է ավարտվել ոչ-ոքի։",
    isTrue: true,
    explanationEs: "¡Verdadero! En la fase regular de liga, si ambos equipos marcan el mismo número de goles, el resultado es empate (reparto de 1 punto).",
    explanationHy: "Ճիշտ է։ Ֆուտբոլային հանդիպումը կարող է ավարտվել հավասար հաշվով՝ ոչ-ոքի։"
  },
  {
    id: 7,
    statementEs: "Un córner se ejecuta desde el centro del campo.",
    statementHy: "Անկյունային հարվածը կատարվում է դաշտի կենտրոնից։",
    isTrue: false,
    explanationEs: "¡Falso! El córner (saque de esquina) se lanza desde el cuadrante de la esquina más cercana por donde salió el balón.",
    explanationHy: "Սխալ է։ Անկյունային հարվածը (córner) կատարվում է դաշտի անկյունից, ոչ թե կենտրոնից։"
  },
  {
    id: 8,
    statementEs: "El árbitro controla el cumplimiento de las reglas.",
    statementHy: "Մրցավարը հետևում է կանոնների պահպանմանը։",
    isTrue: true,
    explanationEs: "¡Verdadero! El árbitro principal y sus asistentes hacen cumplir las Reglas de Juego de la IFAB.",
    explanationHy: "Ճիշտ է։ Մրցավարն է պատասխանատու խաղի կանոնների խստիվ պահպանման համար։"
  }
];

export const situationsData: SituationItem[] = [
  {
    id: 1,
    titleEs: "Situación 1 — Un pase",
    titleHy: "Իրավիճակ 1 — Փոխանցում",
    contextEs: "Tu compañero tiene el balón y tú estás libre. ¿Qué le gritas?",
    contextHy: "Թիմակիցդ գնդակով է, իսկ դու ազատ ես։ Ի՞նչ կգոռաս։",
    options: [
      { id: '1', textEs: "¡Estoy libre, pásamela!", textHy: "Ազատ եմ, փոխանցի՛ր ինձ", isCorrect: true },
      { id: '2', textEs: "¡Quiero agua!", textHy: "Ջուր եմ ուզում", isCorrect: false },
      { id: '3', textEs: "¡Apaga las luces!", textHy: "Անջատիր լույսերը", isCorrect: false }
    ],
    explanationEs: "Es la frase deportiva exacta para pedir la pelota con rapidez.",
    explanationHy: "Ճշգրիտ սպորտային արտահայտությունն է՝ արագ փոխանցում պահանջելու համար։"
  },
  {
    id: 2,
    titleEs: "Situación 2 — Un rival detrás",
    titleHy: "Իրավիճակ 2 — Մրցակիցը հետևից",
    contextEs: "Ves a un rival que se acerca por detrás de tu compañero. ¿Cómo le avisas?",
    contextHy: "Տեսնում ես, որ մրցակիցը հետևից մոտենում է թիմակցիդ։ Ինչպե՞ս կզգուշացնես։",
    options: [
      { id: '1', textEs: "¡Hombre a la espalda! / ¡Te viene por detrás!", textHy: "Զգուշացի՛ր, հետևիցդ մարդ է գալիս", isCorrect: true },
      { id: '2', textEs: "¡Buenas noches!", textHy: "Բարի գիշեր", isCorrect: false },
      { id: '3', textEs: "¡Vamos a comer!", textHy: "Եկեք հաց ուտենք", isCorrect: false }
    ],
    explanationEs: "«¡Hombre a la espalda!» o «¡Te vienen!» previene que tu compañero sea despojado por sorpresa.",
    explanationHy: "«Hombre a la espalda!» կամ «Te vienen por detrás» զգուշացնում է թիմակցիդ թիկունքից մոտեցող վտանգի մասին։"
  },
  {
    id: 3,
    titleEs: "Situación 3 — El entrenamiento",
    titleHy: "Իրավիճակ 3 — Մարզումը",
    contextEs: "Quieres preguntarle al entrenador si puedes jugar de delantero. ¿Qué le preguntas?",
    contextHy: "Ցանկանում ես մարզչին հարցնել՝ կարո՞ղ ես խաղալ հարձակվողի դիրքում։",
    options: [
      { id: '1', textEs: "Míster, ¿puedo jugar de delantero hoy?", textHy: "Մարզի՛չ, կարո՞ղ եմ այսօր հարձակվողի դիրքում խաղալ", isCorrect: true },
      { id: '2', textEs: "¿A qué hora cenamos?", textHy: "Ժամը քանիսի՞ն ենք ընթրելու", isCorrect: false },
      { id: '3', textEs: "¿Dónde compraste tus botas?", textHy: "Որտեղի՞ց ես գնել խաղակոշիկներդ", isCorrect: false }
    ],
    explanationEs: "«¿Puedo jugar de...?» es la fórmula cortés y correcta para consultar tu posición de juego.",
    explanationHy: "«¿Puedo jugar de...?» հարցական կառուցվածքն է՝ դիրքի վերաբերյալ մարզչին դիմելու համար։"
  },
  {
    id: 4,
    titleEs: "Situación 4 — Un error",
    titleHy: "Իրավիճակ 4 — Չստացված հարված",
    contextEs: "Tu amigo pierde una ocasión clara de gol. ¿Qué le dices para animarlo?",
    contextHy: "Ընկերդ բաց է թողնում գոլ խփելու լավ հնարավորությունը։ Ի՞նչ կասես նրան։",
    options: [
      { id: '1', textEs: "¡No pasa nada, bien intentado, la próxima entra!", textHy: "Ոչինչ, լավ փորձ էր, հաջորդը կխփես", isCorrect: true },
      { id: '2', textEs: "¡Eres el peor del equipo!", textHy: "Դու թիմի ամենավատ խաղացողն ես", isCorrect: false },
      { id: '3', textEs: "¡Vete a tu casa!", textHy: "Գնա տուն", isCorrect: false }
    ],
    explanationEs: "El compañerismo positivo mantiene la moral del equipo alta.",
    explanationHy: "Դրական խոսքերը բարձր են պահում ընկերոջ տրամադրությունն ու վստահությունը։"
  },
  {
    id: 5,
    titleEs: "Situación 5 — Estás cansado",
    titleHy: "Իրավիճակ 5 — Հոգնածություն",
    contextEs: "Estás muy cansado y necesitas descansar. ¿Cómo se lo dices al entrenador?",
    contextHy: "Շատ հոգնած ես և հանգստի կարիք ունես։ Ինչպե՞ս կասես մարզչին։",
    options: [
      { id: '1', textEs: "Míster, estoy muy cansado, ¿puedo pedir el cambio?", textHy: "Մարզի՛չ, շատ հոգնած եմ, կարո՞ղ եմ փոխարինում խնդրել", isCorrect: true },
      { id: '2', textEs: "¡No me hables!", textHy: "Ինձ հետ մի՛ խոսիր", isCorrect: false },
      { id: '3', textEs: "¡El balón es mío!", textHy: "Գնդակն իմն է", isCorrect: false }
    ],
    explanationEs: "Pedir el cambio honestamente cuando estás exhausto ayuda al equipo a mantener intensidad fresca.",
    explanationHy: "Ազնվորեն փոխարինում խնդրելը թիմին օգնում է թարմ ուժերով շարունակել խաղը։"
  }
];

// PARTE 3: MATEMÁTICAS DE FÚTBOL (10 PROBLEMAS)
export const mathProblemsData: MathProblem[] = [
  {
    id: 1,
    titleEs: "Problema 1 — Los goles de Marcos",
    titleHy: "Խնդիր 1 — Մարկոսի գոլերը",
    storyEs: "Marcos marca 3 goles el lunes, 2 el miércoles y 4 el sábado.",
    storyHy: "Մարկոսը երկուշաբթի խփում է 3 գոլ, չորեքշաբթի՝ 2, իսկ շաբաթ օրը՝ 4։",
    questionEs: "¿Cuántos goles marca en total?",
    questionHy: "Քանի՞ գոլ է նա խփում ընդհանուր։",
    options: [
      { id: 'A', textEs: "7 goles", textHy: "7 գոլ" },
      { id: 'B', textEs: "8 goles", textHy: "8 գոլ" },
      { id: 'C', textEs: "9 goles", textHy: "9 գոլ" },
      { id: 'D', textEs: "10 goles", textHy: "10 գոլ" }
    ],
    correctIndex: 2,
    calculationEs: "3 + 2 + 4 = 9 goles en total.",
    calculationHy: "3 + 2 + 4 = 9 գոլ ընդհանուր։"
  },
  {
    id: 2,
    titleEs: "Problema 2 — Las camisetas",
    titleHy: "Խնդիր 2 — Մարզաշապիկները",
    storyEs: "Un equipo tiene 24 camisetas. El entrenador reparte 11 a los jugadores titulares y 7 a los suplentes.",
    storyHy: "Թիմն ունի 24 մարզաշապիկ։ Մարզիչը 11-ը տալիս է հիմնական կազմի խաղացողներին, իսկ 7-ը՝ պահեստայիններին։",
    questionEs: "¿Cuántas camisetas quedan?",
    questionHy: "Քանի՞ մարզաշապիկ է մնում։",
    options: [
      { id: 'A', textEs: "6 camisetas", textHy: "6 մարզաշապիկ" },
      { id: 'B', textEs: "5 camisetas", textHy: "5 մարզաշապիկ" },
      { id: 'C', textEs: "7 camisetas", textHy: "7 մարզաշապիկ" },
      { id: 'D', textEs: "8 camisetas", textHy: "8 մարզաշապիկ" }
    ],
    correctIndex: 0,
    calculationEs: "Total repartidas = 11 + 7 = 18 camisetas. Quedan = 24 - 18 = 6 camisetas.",
    calculationHy: "Բաշխված = 11 + 7 = 18: Մնում է = 24 - 18 = 6 մարզաշապիկ։"
  },
  {
    id: 3,
    titleEs: "Problema 3 — El entrenamiento",
    titleHy: "Խնդիր 3 — Մարզումը",
    storyEs: "El entrenamiento empieza a las 16:20 y dura una hora y treinta minutos.",
    storyHy: "Մարզումը սկսվում է ժամը 16:20-ին և տևում մեկ ժամ երեսուն րոպե։",
    questionEs: "¿A qué hora termina?",
    questionHy: "Ժամը քանիսի՞ն է ավարտվում։",
    options: [
      { id: 'A', textEs: "17:30", textHy: "17:30" },
      { id: 'B', textEs: "17:40", textHy: "17:40" },
      { id: 'C', textEs: "18:00", textHy: "18:00" },
      { id: 'D', textEs: "17:50", textHy: "17:50" }
    ],
    correctIndex: 3,
    calculationEs: "16:20 + 1 hora = 17:20. 17:20 + 30 minutos = 17:50.",
    calculationHy: "16:20 + 1 ժամ = 17:20: 17:20 + 30 րոպե = 17:50:"
  },
  {
    id: 4,
    titleEs: "Problema 4 — Los balones",
    titleHy: "Խնդիր 4 — Գնդակները",
    storyEs: "Hay 36 balones. El entrenador los reparte por igual entre 4 grupos.",
    storyHy: "Կա 36 գնդակ։ Մարզիչը դրանք հավասար բաժանում է 4 խմբերի միջև։",
    questionEs: "¿Cuántos balones recibe cada grupo?",
    questionHy: "Քանի՞ գնդակ է ստանում յուրաքանչյուր խումբ։",
    options: [
      { id: 'A', textEs: "8 balones", textHy: "8 գնդակ" },
      { id: 'B', textEs: "9 balones", textHy: "9 գնդակ" },
      { id: 'C', textEs: "10 balones", textHy: "10 գնդակ" },
      { id: 'D', textEs: "12 balones", textHy: "12 գնդակ" }
    ],
    correctIndex: 1,
    calculationEs: "36 / 4 = 9 balones por grupo.",
    calculationHy: "36 / 4 = 9 գնդակ յուրաքանչյուր խմբին։"
  },
  {
    id: 5,
    titleEs: "Problema 5 — El campeonato",
    titleHy: "Խնդիր 5 — Առաջնությունը",
    storyEs: "El equipo de Lucas juega 8 partidos. Gana 5, empata 2 y pierde el resto.",
    storyHy: "Լուկասի թիմը խաղում է 8 հանդիպում։ Հաղթում է 5-ում, ոչ-ոքի խաղում 2-ում և պարտվում մնացածում։",
    questionEs: "¿Cuántos partidos pierde?",
    questionHy: "Քանի՞ խաղում է պարտվում։",
    options: [
      { id: 'A', textEs: "1 partido", textHy: "1 խաղ" },
      { id: 'B', textEs: "2 partidos", textHy: "2 խաղ" },
      { id: 'C', textEs: "3 partidos", textHy: "3 խաղ" },
      { id: 'D', textEs: "4 partidos", textHy: "4 խաղ" }
    ],
    correctIndex: 0,
    calculationEs: "Total de partidos = 8. Partidos no perdidos = 5 + 2 = 7. Partidos perdidos = 8 - 7 = 1 partido.",
    calculationHy: "Ընդհանուր խաղեր = 8: Հաղթանակ + ոչ-ոքի = 5 + 2 = 7: Պարտված = 8 - 7 = 1 խաղ։"
  },
  {
    id: 6,
    titleEs: "Problema 6 — Los puntos",
    titleHy: "Խնդիր 6 — Միավորները",
    storyEs: "En una liga, una victoria vale 3 puntos y un empate vale 1 punto. Un equipo gana 4 partidos y empata 3.",
    storyHy: "Առաջնությունում հաղթանակը տալիս է 3 միավոր, իսկ ոչ-ոքին՝ 1 միավոր։ Թիմը հաղթում է 4 խաղում և 3 խաղ ավարտում ոչ-ոքի։",
    questionEs: "¿Cuántos puntos consigue?",
    questionHy: "Քանի՞ միավոր է վաստակում։",
    options: [
      { id: 'A', textEs: "12 puntos", textHy: "12 միավոր" },
      { id: 'B', textEs: "13 puntos", textHy: "13 միավոր" },
      { id: 'C', textEs: "14 puntos", textHy: "14 միավոր" },
      { id: 'D', textEs: "15 puntos", textHy: "15 միավոր" }
    ],
    correctIndex: 3,
    calculationEs: "Puntos por victorias = 4 * 3 = 12 puntos. Puntos por empates = 3 * 1 = 3 puntos. Total = 12 + 3 = 15 puntos.",
    calculationHy: "Հաղթանակներից = 4 * 3 = 12: Ոչ-ոքիներից = 3 * 1 = 3: Ընդամենը = 12 + 3 = 15 միավոր։"
  },
  {
    id: 7,
    titleEs: "Problema 7 — Los pases",
    titleHy: "Խնդիր 7 — Փոխանցումները",
    storyEs: "Durante un ejercicio, Daniel hace 12 pases, Pablo hace 15 y Enrique hace 9.",
    storyHy: "Վարժության ընթացքում Դանիելը կատարում է 12 փոխանցում, Պաբլոն՝ 15, իսկ Էնրիկեն՝ 9։",
    questionEs: "¿Cuántos pases hacen entre los tres?",
    questionHy: "Քանի՞ փոխանցում են կատարում երեքով միասին։",
    options: [
      { id: 'A', textEs: "34 pases", textHy: "34 փոխանցում" },
      { id: 'B', textEs: "36 pases", textHy: "36 փոխանցում" },
      { id: 'C', textEs: "38 pases", textHy: "38 փոխանցում" },
      { id: 'D', textEs: "40 pases", textHy: "40 փոխանցում" }
    ],
    correctIndex: 1,
    calculationEs: "12 + 15 + 9 = 36 pases en total.",
    calculationHy: "12 + 15 + 9 = 36 փոխանցում միասին։"
  },
  {
    id: 8,
    titleEs: "Problema 8 — Las vueltas al campo",
    titleHy: "Խնդիր 8 — Պտույտները դաշտի շուրջ",
    storyEs: "Cada vuelta al campo de entrenamiento mide 400 metros. Los jugadores dan 5 vueltas.",
    storyHy: "Մարզադաշտի շուրջ յուրաքանչյուր պտույտը 400 մետր է։ Խաղացողները կատարում են 5 պտույտ։",
    questionEs: "¿Cuántos metros recorren?",
    questionHy: "Քանի՞ մետր են վազում։",
    options: [
      { id: 'A', textEs: "1.600 m", textHy: "1.600 մ" },
      { id: 'B', textEs: "1.800 m", textHy: "1.800 մ" },
      { id: 'C', textEs: "2.000 m", textHy: "2.000 մ" },
      { id: 'D', textEs: "2.400 m", textHy: "2.400 մ" }
    ],
    correctIndex: 2,
    calculationEs: "400 m * 5 = 2.000 metros (2 kilómetros).",
    calculationHy: "400 մ * 5 = 2.000 մետր (2 կիլոմետր)։"
  },
  {
    id: 9,
    titleEs: "Problema 9 — Los penaltis",
    titleHy: "Խնդիր 9 — 11-մետրանոցները",
    storyEs: "En un entrenamiento, cada jugador tira 5 penaltis. Participan 6 jugadores.",
    storyHy: "Մարզման ընթացքում յուրաքանչյուր խաղացող կատարում է 5 հատ 11-մետրանոց հարված։ Մասնակցում է 6 խաղացող։",
    questionEs: "¿Cuántos penaltis tiran en total?",
    questionHy: "Քանի՞ 11-մետրանոց են հարվածում ընդհանուր։",
    options: [
      { id: 'A', textEs: "30 penaltis", textHy: "30 տուգանային" },
      { id: 'B', textEs: "25 penaltis", textHy: "25 տուգանային" },
      { id: 'C', textEs: "35 penaltis", textHy: "35 տուգանային" },
      { id: 'D', textEs: "40 penaltis", textHy: "40 տուգանային" }
    ],
    correctIndex: 0,
    calculationEs: "5 penaltis * 6 jugadores = 30 penaltis en total.",
    calculationHy: "5 հարված * 6 խաղացող = 30 հարված ընդամենը։"
  },
  {
    id: 10,
    titleEs: "Problema 10 — Los goles del torneo",
    titleHy: "Խնդիր 10 — Մրցաշարի գոլերը",
    storyEs: "En un torneo, el equipo de Enrique marca 4 goles en el primer partido, 2 en el segundo y 3 en el tercero. Recibe 5 goles en total.",
    storyHy: "Մրցաշարի ընթացքում Էնրիկեի թիմն առաջին խաղում խփում է 4 գոլ, երկրորդում՝ 2, երրորդում՝ 3։ Ընդհանուր բաց է թողնում 5 գոլ։",
    questionEs: "¿Cuál es su diferencia de goles?",
    questionHy: "Ո՞րն է գոլերի տարբերությունը։",
    options: [
      { id: 'A', textEs: "+2", textHy: "+2" },
      { id: 'B', textEs: "+3", textHy: "+3" },
      { id: 'C', textEs: "+5", textHy: "+5" },
      { id: 'D', textEs: "+4", textHy: "+4" }
    ],
    correctIndex: 3,
    calculationEs: "Goles a favor = 4 + 2 + 3 = 9. Goles en contra = 5. Diferencia = 9 - 5 = +4.",
    calculationHy: "Խփած գոլեր = 4 + 2 + 3 = 9: Բաց թողած գոլեր = 5: Տարբերությունը = 9 - 5 = +4:"
  }
];

// PARTE 4: LÓGICA FUTBOLÍSTICA (3 EJERCICIOS)
export const logicPuzzlesData: LogicRiddle[] = [
  {
    id: 1,
    titleEs: "Ejercicio 1 — ¿Quién marcó el gol?",
    titleHy: "Վարժություն 1 — Ո՞վ խփեց գոլը",
    storyEs: "Tres jugadores hablan después de un partido:\n• Carlos: «Yo no marqué el gol».\n• Pablo: «Enrique marcó el gol».\n• Enrique: «Pablo está mintiendo».\n\nSabemos que solo uno dice la verdad y que solo uno de los tres marcó el gol.",
    storyHy: "Երեք խաղացող խոսում են խաղից հետո.\n• Կառլոս. «Ես գոլ չեմ խփել»:\n• Պաբլո. «Էնրիկեն խփեց գոլը»:\n• Էնրիկե. «Պաբլոն ստում է»:\n\nԳիտենք, որ միայն մեկն է ճշմարտությունն ասում, և երեքից միայն մեկն է գոլ խփել։",
    cluesEs: [
      "Solo un jugador dice la verdad (1 verdad, 2 mentiras).",
      "Solo un jugador marcó el gol."
    ],
    cluesHy: [
      "Միայն մեկն է ասում ճշմարտությունը (1 ճիշտ, 2 սուտ):",
      "Միայն մեկն է գոլ խփել:"
    ],
    questionEs: "¿Quién marcó el gol?",
    questionHy: "Ո՞վ խփեց գոլը։",
    options: [
      { id: 'A', textEs: "Carlos", textHy: "Կառլոսը" },
      { id: 'B', textEs: "Pablo", textHy: "Պաբլոն" },
      { id: 'C', textEs: "Enrique", textHy: "Էնրիկեն" },
      { id: 'D', textEs: "No se puede saber", textHy: "Հնարավոր չէ իմանալ" }
    ],
    correctIndex: 0,
    solutionEs: "Si Carlos marcó el gol:\n- Carlos miente («Yo no marqué» -> Falso).\n- Pablo miente («Enrique marcó» -> Falso).\n- Enrique dice la verdad («Pablo miente» -> Verdadero).\n¡Cumple exactamente la condición de que solo 1 dice la verdad! Por tanto, el gol lo marcó Carlos.",
    solutionHy: "Եթե գոլը խփել է Կառլոսը.\n- Կառլոսը ստում է («Ես չեմ խփել» -> Սուտ):\n- Պաբլոն ստում է («Էնրիկեն խփեց» -> Սուտ):\n- Էնրիկեն ասում է ճշմարտությունը («Պաբլոն ստում է» -> Ճիշտ):\nՃիշտ 1 հոգի ասում է ճշմարտությունը։ Հետևաբար, գոլը խփել է Կառլոսը:"
  },
  {
    id: 2,
    titleEs: "Ejercicio 2 — Las posiciones",
    titleHy: "Վարժություն 2 — Դիրքերը",
    storyEs: "Enrique, David y Lucas juegan en tres posiciones diferentes: portero, defensa y delantero.\n\nPistas:\n• Enrique no es portero.\n• David no es delantero.\n• Lucas es portero.",
    storyHy: "Էնրիկեն, Դավիթը և Լուկասը խաղում են երեք տարբեր դիրքերում՝ դարպասապահ, պաշտպան և հարձակվող։\n\nՀուշումներ.\n• Էնրիկեն դարպասապահ չէ:\n• Դավիթը հարձակվող չէ:\n• Լուկասը դարպասապահ է:",
    cluesEs: [
      "Lucas es el portero.",
      "Quedan dos posiciones: defensa y delantero para Enrique y David.",
      "David no es delantero."
    ],
    cluesHy: [
      "Լուկասը դարպասապահն է:",
      "Մնում է երկու դիրք՝ պաշտպան և հարձակվող՝ Էնրիկեի և Դավիթի համար:",
      "Դավիթը հարձակվող չէ:"
    ],
    questionEs: "¿Quién es el delantero?",
    questionHy: "Ո՞վ է հարձակվողը։",
    options: [
      { id: 'A', textEs: "Enrique", textHy: "Էնրիկեն" },
      { id: 'B', textEs: "David", textHy: "Դավիթը" },
      { id: 'C', textEs: "Lucas", textHy: "Լուկասը" },
      { id: 'D', textEs: "Ninguno", textHy: "Ոչ ոք" }
    ],
    correctIndex: 0,
    solutionEs: "Lucas es el portero. Quedan las posiciones de defensa y delantero. Como David NO es delantero, David tiene que ser el defensa. Por eliminación, ¡Enrique es el delantero!",
    solutionHy: "Լուկասը դարպասապահ է: Մնացին պաշտպանն ու հարձակվողը: Քանի որ Դավիթը հարձակվող չէ, Դավիթը պաշտպանն է: Ուրեմն հարձակվողը Էնրիկեն է:"
  },
  {
    id: 3,
    titleEs: "Ejercicio 3 — La carrera",
    titleHy: "Վարժություն 3 — Վազքը",
    storyEs: "Cuatro jugadores terminan una carrera: Marcos, Pablo, Daniel y Carlos.\n\nPistas:\n• Marcos llega antes que Pablo.\n• Daniel llega después de Pablo.\n• Carlos llega antes que Marcos.",
    storyHy: "Չորս խաղացող ավարտում են վազքը՝ Մարկոսը, Պաբլոն, Դանիելը և Կառլոսը։\n\nՀուշումներ.\n• Մարկոսը հասնում է Պաբլոյից շուտ:\n• Դանիելը հասնում է Պաբլոյից հետո:\n• Կառլոսը հասնում է Մարկոսից շուտ:",
    cluesEs: [
      "Marcos > Pablo",
      "Pablo > Daniel (por lo tanto Marcos > Pablo > Daniel)",
      "Carlos > Marcos"
    ],
    cluesHy: [
      "Մարկոսը առաջ է Պաբլոյից:",
      "Պաբլոն առաջ է Դանիելից (Մարկոս > Պաբլո > Դանիել):",
      "Կառլոսն առաջ է Մարկոսից:"
    ],
    questionEs: "¿Quién llega primero?",
    questionHy: "Ո՞վ է հասնում առաջինը։",
    options: [
      { id: 'A', textEs: "Pablo", textHy: "Պաբլոն" },
      { id: 'B', textEs: "Daniel", textHy: "Դանիելը" },
      { id: 'C', textEs: "Carlos", textHy: "Կառլոսը" },
      { id: 'D', textEs: "Marcos", textHy: "Մարկոսը" }
    ],
    correctIndex: 2,
    solutionEs: "El orden completo de llegada es: 1º Carlos, 2º Marcos, 3º Pablo, 4º Daniel. Por tanto, Carlos llega en primer lugar.",
    solutionHy: "Վազքի հաջորդականությունն է՝ 1-ին Կառլոս, 2-րդ Մարկոս, 3-րդ Պաբլո, 4-րդ Դանիել: Առաջինը հասնում է Կառլոսը:"
  }
];

// PARTE 5: COMPRENSIÓN LECTORA — EL PARTIDO DE ENRIQUE
export interface StoryParagraph {
  id: number;
  speaker?: string;
  textEs: string;
  textHy: string;
}

export const storyParagraphs: StoryParagraph[] = [
  {
    id: 1,
    textEs: "Enrique tiene trece años y juega en un equipo de fútbol de Madrid. Su posición favorita es la de extremo derecho porque le gusta correr rápido y ayudar a sus compañeros.",
    textHy: "Էնրիկեն տասներեք տարեկան է և խաղում է Մադրիդի ֆուտբոլային թիմերից մեկում։ Նրա նախընտրած դիրքն աջ եզրային հարձակվողն է, քանի որ նա սիրում է արագ վազել և օգնել իր թիմակիցներին։"
  },
  {
    id: 2,
    textEs: "Un sábado, su equipo tiene un partido muy importante. Durante la primera parte, el equipo rival marca un gol. Enrique está un poco nervioso, pero su entrenador le dice:",
    textHy: "Մի շաբաթ օր նրա թիմը շատ կարևոր խաղ ունի։ Առաջին խաղակեսում մրցակից թիմը գոլ է խփում։ Էնրիկեն մի փոքր անհանգստացած է, բայց մարզիչն ասում է նրան."
  },
  {
    id: 3,
    speaker: "Entrenador",
    textEs: "—¡Tranquilo, Enrique! Todavía podemos ganar. Tienes que mirar a tus compañeros y pasar el balón cuando estén libres.",
    textHy: "—Հանգի՛ստ, Էնրիկե։ Մենք դեռ կարող ենք հաղթել։ Պետք է նայես թիմակիցներիդ և փոխանցես գնդակը, երբ նրանք ազատ են։"
  },
  {
    id: 4,
    textEs: "En la segunda parte, Enrique recibe un pase de Pablo. Corre por la banda derecha, ve a Carlos cerca de la portería y le pasa el balón. Carlos marca un gol.",
    textHy: "Երկրորդ խաղակեսում Էնրիկեն փոխանցում է ստանում Պաբլոյից։ Նա վազում է աջ եզրով, տեսնում է Կառլոսին դարպասի մոտ և գնդակը փոխանցում նրան։ Կառլոսը գոլ է խփում։"
  },
  {
    id: 5,
    textEs: "Faltan cinco minutos para terminar el partido. Enrique recupera el balón, supera a un defensa y marca el segundo gol.",
    textHy: "Հանդիպման ավարտին մնում է հինգ րոպե։ Էնրիկեն հետ է վերցնում գնդակը, շրջանցում պաշտպանին և խփում երկրորդ գոլը։"
  },
  {
    id: 6,
    textEs: "El partido termina 2-1. Todos sus compañeros están muy contentos.",
    textHy: "Հանդիպումն ավարտվում է 2-1 հաշվով։ Բոլոր թիմակիցները շատ ուրախ են։"
  },
  {
    id: 7,
    speaker: "Entrenador",
    textEs: "Después del encuentro, el entrenador dice: —Hoy habéis demostrado que el fútbol no consiste solo en marcar goles, sino también en trabajar en equipo.",
    textHy: "Խաղից հետո մարզիչն ասում է. —Այսօր դուք ապացուցեցիք, որ ֆուտբոլը միայն գոլեր խփելը չէ, այլ նաև թիմային համատեղ աշխատանքը։"
  }
];

export const storyQuestionsData: StoryQuestion[] = [
  {
    id: 1,
    questionEs: "¿Cuántos años tiene Enrique?",
    questionHy: "Քանի՞ տարեկան է Էնրիկեն։",
    options: [
      { id: 'A', textEs: "Doce años", textHy: "12 տարեկան" },
      { id: 'B', textEs: "Trece años", textHy: "13 տարեկան" },
      { id: 'C', textEs: "Catorce años", textHy: "14 տարեկան" },
      { id: 'D', textEs: "Quince años", textHy: "15 տարեկան" }
    ],
    correctIndex: 1,
    answerEs: "Enrique tiene trece (13) años.",
    answerHy: "Էնրիկեն տասներեք տարեկան է։"
  },
  {
    id: 2,
    questionEs: "¿En qué posición prefiere jugar?",
    questionHy: "Ո՞ր դիրքում է նախընտրում խաղալ։",
    options: [
      { id: 'A', textEs: "De portero", textHy: "Դարպասապահ" },
      { id: 'B', textEs: "De defensa central", textHy: "Կենտրոնական պաշտպան" },
      { id: 'C', textEs: "De extremo derecho", textHy: "Աջ եզրային հարձակվող" },
      { id: 'D', textEs: "De árbitro", textHy: "Մրցավար" }
    ],
    correctIndex: 2,
    answerEs: "Su posición favorita es de extremo derecho.",
    answerHy: "Նրա սիրելի դիրքն աջ եզրային հարձակվողն է (extremo derecho)։"
  },
  {
    id: 3,
    questionEs: "¿Quién marca el primer gol del partido?",
    questionHy: "Ո՞վ է խփում խաղի առաջին գոլը։",
    options: [
      { id: 'A', textEs: "El equipo rival", textHy: "Մրցակից թիմը" },
      { id: 'B', textEs: "Enrique", textHy: "Էնրիկեն" },
      { id: 'C', textEs: "Carlos", textHy: "Կառլոսը" },
      { id: 'D', textEs: "Pablo", textHy: "Պաբլոն" }
    ],
    correctIndex: 0,
    answerEs: "Durante la primera parte, el equipo rival marca un gol.",
    answerHy: "Առաջին խաղակեսում գոլը խփում է մրցակից թիմը։"
  },
  {
    id: 4,
    questionEs: "¿Qué consejo le da el entrenador a Enrique?",
    questionHy: "Ի՞նչ խորհուրդ է տալիս մարզիչը Էնրիկեին։",
    options: [
      { id: 'A', textEs: "Que no corra más", textHy: "Որ այլևս չվազի" },
      { id: 'B', textEs: "Que mire a sus compañeros y pase el balón si están libres", textHy: "Նայել թիմակիցներին և փոխանցել երբ ազատ են" },
      { id: 'C', textEs: "Que se vaya al vestuario", textHy: "Որ գնա հանդերձարան" },
      { id: 'D', textEs: "Que juegue de portero", textHy: "Որ դառնա դարպասապահ" }
    ],
    correctIndex: 1,
    answerEs: "Le dice: «Tienes que mirar a tus compañeros y pasar el balón cuando estén libres».",
    answerHy: "Մարզիչն ասում է. «Պետք է նայես թիմակիցներիդ և փոխանցես գնդակը, երբ նրանք ազատ են»։"
  },
  {
    id: 5,
    questionEs: "¿Quién le pasa el balón a Enrique en la segunda parte?",
    questionHy: "Ո՞վ է երկրորդ խաղակեսում գնդակը փոխանցում Էնրիկեին։",
    options: [
      { id: 'A', textEs: "El árbitro", textHy: "Մրցավարը" },
      { id: 'B', textEs: "Carlos", textHy: "Կառլոսը" },
      { id: 'C', textEs: "Pablo", textHy: "Պաբլոն" },
      { id: 'D', textEs: "El portero rival", textHy: "Մրցակցի դարպասապահը" }
    ],
    correctIndex: 2,
    answerEs: "Enrique recibe un pase de Pablo.",
    answerHy: "Էնրիկեն փոխանցում է ստանում Պաբլոյից։"
  },
  {
    id: 6,
    questionEs: "¿Quién marca el primer gol del equipo de Enrique?",
    questionHy: "Ո՞վ է խփում Էնրիկեի թիմի առաջին գոլը։",
    options: [
      { id: 'A', textEs: "Carlos", textHy: "Կառլոսը" },
      { id: 'B', textEs: "Enrique", textHy: "Էնրիկեն" },
      { id: 'C', textEs: "Pablo", textHy: "Պաբլոն" },
      { id: 'D', textEs: "David", textHy: "Դավիթը" }
    ],
    correctIndex: 0,
    answerEs: "Carlos marca el gol tras el pase de Enrique.",
    answerHy: "Կառլոսը գոլ է խփում Էնրիկեի փոխանցումից հետո։"
  },
  {
    id: 7,
    questionEs: "¿Cuántos minutos faltan cuando Enrique marca?",
    questionHy: "Քանի՞ րոպե է մնացած լինում, երբ Էնրիկեն գոլ է խփում։",
    options: [
      { id: 'A', textEs: "Diez minutos", textHy: "10 րոպե" },
      { id: 'B', textEs: "Cinco minutos", textHy: "5 րոպե" },
      { id: 'C', textEs: "Dos minutos", textHy: "2 րոպե" },
      { id: 'D', textEs: "Un minuto", textHy: "1 րոպե" }
    ],
    correctIndex: 1,
    answerEs: "Faltan cinco minutos para terminar el partido.",
    answerHy: "Հանդիպման ավարտին մնացել էր հինգ րոպե։"
  },
  {
    id: 8,
    questionEs: "¿Cuál es el resultado final?",
    questionHy: "Ինչպիսի՞ն է վերջնական հաշիվը։",
    options: [
      { id: 'A', textEs: "Empate 1-1", textHy: "Ոչ-ոքի 1-1" },
      { id: 'B', textEs: "Victoria 2-1", textHy: "Հաղթանակ 2-1" },
      { id: 'C', textEs: "Derrota 0-2", textHy: "Պարտություն 0-2" },
      { id: 'D', textEs: "Victoria 3-0", textHy: "Հաղթանակ 3-0" }
    ],
    correctIndex: 1,
    answerEs: "El partido termina 2-1 a favor del equipo de Enrique.",
    answerHy: "Խաղն ավարտվում է 2-1 հաշվով՝ Էնրիկեի թիմի հաղթանակով։"
  },
  {
    id: 9,
    questionEs: "¿Qué aprende el equipo al final?",
    questionHy: "Ի՞նչ է սովորում թիմը վերջում։",
    options: [
      { id: 'A', textEs: "Que el fútbol consiste también en trabajar en equipo", textHy: "Որ ֆուտբոլը նաև թիմային աշխատանք է" },
      { id: 'B', textEs: "Que solo importa correr rápido", textHy: "Որ կարևոր է միայն արագ վազելը" },
      { id: 'C', textEs: "Que hay que discutir con el árbitro", textHy: "Որ պետք է վիճել մրցավարի հետ" },
      { id: 'D', textEs: "Que no hay que celebrar", textHy: "Որ պետք չէ տոնել" }
    ],
    correctIndex: 0,
    answerEs: "«El fútbol no consiste solo en marcar goles, sino también en trabajar en equipo».",
    answerHy: "«Ֆուտբոլը միայն գոլեր խփելը չէ, այլ նաև թիմային համատեղ աշխատանքը»։"
  },
  {
    id: 10,
    questionEs: "¿Qué habrías hecho tú si estuvieras en el lugar de Enrique?",
    questionHy: "Դու ի՞նչ կանեիր, եթե լինեիր Էնրիկեի փոխարեն։",
    options: [
      { id: 'A', textEs: "Habría seguido el consejo del míster y jugado en equipo", textHy: "Կլսեի մարզչի խորհուրդը և կխաղայի թիմի համար" },
      { id: 'B', textEs: "Habría dejado de jugar al recibir el primer gol", textHy: "Կդադարեի խաղալ առաջին գոլը բաց թողնելուց հետո" },
      { id: 'C', textEs: "Habría intentado regatear a todos yo solo", textHy: "Միայնակ կփորձեի անցնել բոլորին" },
      { id: 'D', textEs: "Habría salido del campo enfadado", textHy: "Բարկացած դուրս կգայի դաշտից" }
    ],
    correctIndex: 0,
    answerEs: "Escuchar al entrenador y apoyar al equipo es siempre la actitud correcta de un auténtico futbolista.",
    answerHy: "Մարզչին լսելն ու թիմին աջակցելը իսկական ֆուտբոլիստի լավագույն որոշումն է։"
  }
];
