export interface WarmupItem {
  icon: string
  duration: string
  name: string
  desc: string
}

export interface WorkoutExercise {
  id: string
  name: string
  icon: string            // emoji for thumbnail
  dadReason: string
  sets: number
  reps: string
  rest: string
  keyTip: string
  videoSearch: string
  easier?: string
  harder?: string
}

export interface WorkoutSession {
  id: string
  week: number
  sessionOfWeek: number
  type: 'A' | 'B' | 'C' | 'D'
  missionName: string
  duration: string
  difficulty: 1 | 2 | 3 | 4 | 5
  weekGoal: string
  focus: string           // e.g. "Corps entier"
  warmup: WarmupItem[]
  exercises: WorkoutExercise[]
  cooldown: string[]
  coachNote: string
}

// ─── SEMAINE 1 · Reprendre le contrôle de son énergie ─────────────────────────

const W1A: WorkoutSession = {
  id: 'w1a', week: 1, sessionOfWeek: 1, type: 'A',
  missionName: 'Mission 1 — Remise en route',
  duration: '20 min', difficulty: 1, focus: 'Corps entier',
  weekGoal: 'Reprendre le contrôle de son énergie',
  warmup: [
    { icon: '🚶', duration: '1 min',  name: 'Marche sur place, genoux hauts',       desc: 'Genoux à hauteur de hanches. Bras relâchés.' },
    { icon: '🔄', duration: '30 s',   name: 'Rotations de hanches (cercles larges)', desc: '30 s de chaque côté.' },
    { icon: '💫', duration: '30 s',   name: 'Rotations d\'épaules',                  desc: '10 vers l\'avant, 10 vers l\'arrière.' },
  ],
  exercises: [
    {
      id: 'w1a-1', name: 'Squat poids du corps', icon: '🦵',
      dadReason: 'Chaque fois que tu te lèves d\'une chaise ou portes quelque chose, tu fais ce mouvement. Le renforcer protège tes genoux et ton dos.',
      sets: 3, reps: '10 répétitions', rest: '60 s',
      keyTip: 'Dos droit, regard devant — ne pas regarder le sol.',
      videoSearch: 'squat poids du corps débutant technique',
      easier: 'Descendre seulement à mi-chemin (45°)',
      harder: 'Descendre plus profond, cuisses parallèles au sol',
    },
    {
      id: 'w1a-2', name: 'Pompes contre le mur', icon: '💪',
      dadReason: 'Pousser une porte lourde, soulever des bagages, porter son enfant. La version mur est parfaite pour commencer sans risque.',
      sets: 3, reps: '10 répétitions', rest: '60 s',
      keyTip: 'Corps droit de la tête aux pieds — ne pas plier à la taille.',
      videoSearch: 'pompes mur débutant tutorial',
      easier: 'Rester plus près du mur',
      harder: 'Mains sur une table (inclinaison plus grande)',
    },
    {
      id: 'w1a-3', name: 'Pont fessier', icon: '🔥',
      dadReason: 'Les fessiers s\'endorment après des heures assis. C\'est la principale cause de mal de dos. Cet exercice les réveille en douceur.',
      sets: 3, reps: '12 répétitions · tenir 2 s', rest: '45 s',
      keyTip: 'Serrer les fessiers fort en haut et tenir 2 secondes — ne pas aller vite.',
      videoSearch: 'glute bridge pont fessier débutant',
      easier: 'Amplitude réduite (ne pas monter aussi haut)',
      harder: 'Tenir 5 secondes en haut',
    },
  ],
  cooldown: [
    'Étirement cuisses : assis, genou plié, tirer le pied vers les fesses — 30 s de chaque côté',
    'Chat-vache : à 4 pattes, dos rond puis dos creux — 10 fois lentement',
    '3 grandes respirations profondes',
  ],
  coachNote: 'Si tu lis ça après ta première séance : bravo. Pas pour ce que tu as fait physiquement — pour ce que tu viens de décider. 80% des gens ne commencent jamais. Toi, tu viens de commencer.',
}

const W1B: WorkoutSession = {
  id: 'w1b', week: 1, sessionOfWeek: 2, type: 'B',
  missionName: 'Mission 2 — Réveiller les jambes',
  duration: '20 min', difficulty: 1, focus: 'Bas du corps',
  weekGoal: 'Reprendre le contrôle de son énergie',
  warmup: [
    { icon: '🦵', duration: '30 s/côté', name: 'Balancement de jambes avant-arrière', desc: 'Tenir un mur, balancer doucement.' },
    { icon: '🔄', duration: '30 s',      name: 'Cercles de chevilles',                desc: '10 de chaque côté par cheville.' },
    { icon: '🚶', duration: '1 min',     name: 'Marche genou haut',                  desc: 'Genoux à hauteur de hanche, bras actifs.' },
  ],
  exercises: [
    {
      id: 'w1b-1', name: 'Fente arrière', icon: '🦵',
      dadReason: 'La fente ARRIÈRE est beaucoup plus sûre pour les genoux. Elle travaille cuisses et fessiers sans pression sur les articulations.',
      sets: 3, reps: '8 rép. de chaque jambe', rest: '60 s',
      keyTip: 'Grand pas en ARRIÈRE — le genou avant ne dépasse jamais la pointe du pied.',
      videoSearch: 'reverse lunge fente arrière débutant genoux',
      easier: 'Tenir une chaise pour l\'équilibre',
      harder: 'Tempo lent — 3 secondes pour descendre',
    },
    {
      id: 'w1b-2', name: 'Wall sit (chaise au mur)', icon: '🧱',
      dadReason: 'Renforce les cuisses sans impact sur les articulations. Idéal pour les genoux sensibles. Les skieurs s\'entraînent comme ça.',
      sets: 3, reps: '20 à 30 secondes', rest: '60 s',
      keyTip: 'Dos plaqué contre le mur, cuisses parallèles au sol, pieds à plat.',
      videoSearch: 'wall sit exercise tutorial quads',
      easier: 'Angle à 45° (ne pas descendre aussi bas)',
      harder: 'Tenir 45 secondes',
    },
    {
      id: 'w1b-3', name: 'Montée sur la marche', icon: '⬆️',
      dadReason: 'Monter un escalier, sortir d\'une voiture, se hisser — c\'est ça le step-up. Un exercice 100% fonctionnel.',
      sets: 3, reps: '10 rép. de chaque jambe', rest: '60 s',
      keyTip: 'Poser tout le pied sur la marche et pousser sur le TALON (pas la pointe) pour monter.',
      videoSearch: 'step up exercise chair bodyweight tutorial',
      easier: 'Marche basse (15-20 cm)',
      harder: 'Contrôler la descente en 3 secondes',
    },
    {
      id: 'w1b-4', name: 'Montées de mollets', icon: '🦶',
      dadReason: 'Des mollets solides améliorent la circulation et réduisent la fatigue des jambes lors des longues journées debout.',
      sets: 3, reps: '15 répétitions', rest: '30 s',
      keyTip: 'Monter en pleine amplitude — descendre lentement en 2 secondes.',
      videoSearch: 'calf raises standing tutorial mollets',
      easier: 'Tenir un mur pour l\'équilibre',
      harder: 'Sur une jambe à la fois',
    },
  ],
  cooldown: [
    'Étirement ischios : assis, jambe tendue, pencher doucement en avant — 45 s/côté',
    'Étirement hanches (hip flexor) : grand pas, genou arrière au sol — 30 s/côté',
    'Marche lente 2 minutes pour récupérer',
  ],
  coachNote: 'Légère courbature demain ou après-demain : normal. Les muscles se reconstruisent. Attends 48h avant la prochaine séance.',
}

const W1C: WorkoutSession = {
  id: 'w1c', week: 1, sessionOfWeek: 3, type: 'C',
  missionName: 'Mission 3 — Ouvrir le haut du corps',
  duration: '20 min', difficulty: 1, focus: 'Haut du corps',
  weekGoal: 'Reprendre le contrôle de son énergie',
  warmup: [
    { icon: '💫', duration: '1 min',    name: 'Grands cercles de bras',           desc: '10 vers l\'avant, 10 vers l\'arrière.' },
    { icon: '🔄', duration: '30 s/côté', name: 'Rotations thoraciques à 4 pattes', desc: 'Main derrière la tête, ouvrir vers le plafond.' },
    { icon: '🤸', duration: '20 s/côté', name: 'Étirement épaules',               desc: 'Bras croisé devant la poitrine.' },
  ],
  exercises: [
    {
      id: 'w1c-1', name: 'Pompes sur une table', icon: '💪',
      dadReason: 'Plus facile que les pompes au sol, plus efficace que les pompes au mur. La hauteur permet de trouver le bon niveau pour toi.',
      sets: 3, reps: '10 répétitions', rest: '60 s',
      keyTip: 'Coudes à 45° du corps — ni collés au corps ni évasés à 90°.',
      videoSearch: 'incline push ups table tutorial form chest',
      easier: 'Prendre une table plus haute',
      harder: 'Prendre une table plus basse',
    },
    {
      id: 'w1c-2', name: 'Superman (renforcement dos)', icon: '🦸',
      dadReason: 'Le bas du dos s\'affaiblit avec les années de bureau. Le superman renforce toute la chaîne postérieure en douceur.',
      sets: 3, reps: '10 répétitions', rest: '45 s',
      keyTip: 'Soulever bras ET jambes ensemble, serrer les fessiers, tenir 2 secondes.',
      videoSearch: 'superman exercise back extension tutorial',
      easier: 'Soulever les bras seuls d\'abord',
      harder: 'Superman alterné (bras droit + jambe gauche)',
    },
    {
      id: 'w1c-3', name: 'Planche sur les genoux', icon: '🛡️',
      dadReason: 'Un ventre gainé protège le dos et améliore la posture. La version sur genoux est parfaite pour construire la base sans risque.',
      sets: 3, reps: '20 secondes', rest: '60 s',
      keyTip: 'Corps aligné tête-épaules-genoux. Serrer le ventre et les fessiers.',
      videoSearch: 'planche sur genoux tutorial gainage débutant',
      easier: 'Tenir 10-15 secondes seulement',
      harder: 'Planche sur les pieds (jambes tendues)',
    },
    {
      id: 'w1c-4', name: 'World\'s greatest stretch', icon: '🌍',
      dadReason: 'Hanches, dos, épaules, thorax — tout en un mouvement. Si tu ne fais qu\'un seul étirement du programme, c\'est celui-là.',
      sets: 2, reps: '5 rép. de chaque côté', rest: '30 s',
      keyTip: 'Fente basse → main au sol → bras vers le plafond. Lentement.',
      videoSearch: "world's greatest stretch tutorial mobility hip",
      easier: 'Amplitude réduite si manque de souplesse',
      harder: 'Extension de jambe arrière à chaque répétition',
    },
  ],
  cooldown: [
    'Étirement poitrine dans l\'encadrement d\'une porte — 45 s',
    'Child\'s pose : fesses sur les talons, bras tendus devant — 1 minute',
    'Respiration lente : 4 s inspiration, 6 s expiration — 5 fois',
  ],
  coachNote: 'Semaine 1 terminée. 3 séances. C\'est plus que ce que la plupart font en un mois. Note comment tu te sens ce soir — compare avec la semaine prochaine. La différence va te surprendre.',
}

// ─── SEMAINE 2 · Retrouver du souffle et de la mobilité ─────────────────────

const W2A: WorkoutSession = {
  id: 'w2a', week: 2, sessionOfWeek: 1, type: 'A',
  missionName: 'Mission 4 — On monte la cadence',
  duration: '22 min', difficulty: 2, focus: 'Corps entier',
  weekGoal: 'Retrouver du souffle et de la mobilité',
  warmup: [
    { icon: '🏃', duration: '3 min',    name: 'Marche rapide ou vélo léger',   desc: 'Rythme confortable, légère chaleur.' },
    { icon: '🔄', duration: '30 s',     name: 'Cercles de hanches debout',     desc: '10 dans chaque sens.' },
    { icon: '🔄', duration: '30 s/côté', name: 'Rotations thoraciques',        desc: 'À 4 pattes, 5 de chaque côté.' },
  ],
  exercises: [
    {
      id: 'w2a-1', name: 'Squat lent (tempo 3 secondes)', icon: '🦵',
      dadReason: 'Même mouvement qu\'en semaine 1, mais 3 secondes pour descendre. 2× plus efficace pour les muscles. La lenteur est une arme.',
      sets: 3, reps: '12 rép. · 3 s descente', rest: '60 s',
      keyTip: '3 secondes pour descendre, 1 seconde de pause en bas, puis remonter.',
      videoSearch: 'slow tempo squat bodyweight tutorial eccentric',
      easier: 'Squat normal sans tempo',
      harder: 'Pause 3 secondes en bas',
    },
    {
      id: 'w2a-2', name: 'Pompes au sol (sur genoux)', icon: '💪',
      dadReason: 'Passage du mur/table au sol. Pleine amplitude, vrai travail pectoral. Qualité avant quantité.',
      sets: 3, reps: '8 à 10 répétitions', rest: '60 s',
      keyTip: 'Poitrine qui frôle le sol. Corps rigide — fesses pas en l\'air.',
      videoSearch: 'knee push ups floor tutorial proper form',
      easier: 'Revenir aux pompes sur table',
      harder: '3 pompes sur les pieds, finir sur les genoux',
    },
    {
      id: 'w2a-3', name: 'Fente arrière alternée', icon: '🦵',
      dadReason: 'La version dynamique de la S1. Alterner les jambes développe l\'équilibre en mouvement — essentiel au quotidien.',
      sets: 3, reps: '10 rép. de chaque jambe', rest: '60 s',
      keyTip: 'Torse droit pendant tout le mouvement — ne pas se pencher en avant.',
      videoSearch: 'alternating reverse lunge tutorial form balance',
      easier: 'Fente statique (sans alterner)',
      harder: 'Tempo lent — 3 secondes pour descendre',
    },
    {
      id: 'w2a-4', name: 'Planche sur les mains', icon: '🛡️',
      dadReason: 'Progression depuis la planche sur genoux. Corps droit, soutenu par les bras — gainage total.',
      sets: 3, reps: '20 à 25 secondes', rest: '60 s',
      keyTip: 'Hanches pas trop hautes, pas trop basses — corps en ligne droite.',
      videoSearch: 'plank proper form tutorial core straight',
      easier: 'Planche sur les genoux',
      harder: 'Shoulder tap : toucher l\'épaule opposée',
    },
  ],
  cooldown: [
    'Squat bas tenu : tenir 30 secondes en respirant',
    'Étirement poitrine debout — 30 s de chaque côté',
    'Respiration diaphragmatique — 5 cycles',
  ],
  coachNote: 'La descente lente au squat, c\'est 2× plus difficile qu\'un squat rapide. Si tu l\'as fait, tu as fait l\'équivalent de 24 répétitions en n\'en faisant que 12.',
}

const W2B: WorkoutSession = {
  id: 'w2b', week: 2, sessionOfWeek: 2, type: 'B',
  missionName: 'Mission 5 — Jambes solides',
  duration: '22 min', difficulty: 2, focus: 'Bas du corps',
  weekGoal: 'Retrouver du souffle et de la mobilité',
  warmup: [
    { icon: '🚶', duration: '1 min',  name: 'High knees lents',         desc: 'Genoux à hauteur de hanche, bras actifs.' },
    { icon: '🦵', duration: '15 rép.', name: 'Balancement latéral',     desc: 'Tenir un mur, 15 de chaque côté.' },
    { icon: '🧘', duration: '30 s',   name: 'Squat bas tenu',           desc: 'Descendre et tenir en respirant.' },
  ],
  exercises: [
    {
      id: 'w2b-1', name: 'Squat sumo (pieds écartés)', icon: '🦵',
      dadReason: 'Les adducteurs (intérieurs de cuisses) sont souvent les plus faibles. Ce squat les cible et réduit les risques de blessure au genou.',
      sets: 3, reps: '15 répétitions', rest: '60 s',
      keyTip: 'Pieds plus larges que les épaules, orteils à 45°. Genoux suivent la direction des orteils.',
      videoSearch: 'sumo squat form tutorial inner thighs',
      easier: 'Amplitude réduite',
      harder: 'Tempo 3 secondes à la descente',
    },
    {
      id: 'w2b-2', name: 'Pont fessier avec pause (5 s)', icon: '🔥',
      dadReason: 'Même exercice qu\'en S1, mais pause de 5 secondes en haut. Cette pause force les fessiers à vraiment travailler — et c\'est eux qui protègent ton dos.',
      sets: 4, reps: '10 rép. · pause 5 s en haut', rest: '45 s',
      keyTip: 'Talons proches des fesses, monter haut, SERRER fort, tenir 5 secondes.',
      videoSearch: 'glute bridge hold pause tutorial',
      easier: 'Pause 2 secondes',
      harder: 'Pont sur une jambe',
    },
    {
      id: 'w2b-3', name: 'Dead bug', icon: '⚡',
      dadReason: 'L\'exercice que tous les kinés recommandent. Renforce le transverse abdominal sans pression sur la colonne.',
      sets: 3, reps: '8 rép. de chaque côté', rest: '45 s',
      keyTip: 'Dos PLAQUÉ au sol pendant tout le mouvement — si ça se cambre, recommencer.',
      videoSearch: 'dead bug exercise tutorial core lower back',
      easier: 'Jambes seules (bras restent verticaux)',
      harder: 'Retour lent — 3 secondes',
    },
    {
      id: 'w2b-4', name: 'Wall sit · tenu plus long', icon: '🧱',
      dadReason: 'Reprise de S1, mais plus longtemps. Chaque seconde supplémentaire est une victoire visible.',
      sets: 3, reps: '35 à 45 secondes', rest: '60 s',
      keyTip: 'Dos plaqué, cuisses à 90°, respirer régulièrement.',
      videoSearch: 'wall sit longer hold tutorial quad',
      easier: 'Angle moins profond',
      harder: 'Tenir 60 secondes',
    },
  ],
  cooldown: [
    'Pigeon simplifié : assis, jambe avant croisée — 1 min de chaque côté',
    'Étirement ischios couché : jambe tendue vers le plafond — 45 s/côté',
    'Jambes contre le mur 2 min (récupération veineuse)',
  ],
  coachNote: 'Le dead bug semble facile. Si tu le ressens dans le bas du dos, ton dos se décolle du sol. Place une main sous les lombaires pour contrôler.',
}

const W2C: WorkoutSession = {
  id: 'w2c', week: 2, sessionOfWeek: 3, type: 'C',
  missionName: 'Mission 6 — Équilibrer le haut',
  duration: '22 min', difficulty: 2, focus: 'Haut du corps',
  weekGoal: 'Retrouver du souffle et de la mobilité',
  warmup: [
    { icon: '💫', duration: '1 min',    name: 'Cercles de bras progressifs',   desc: 'Petits puis grands. Avant puis arrière.' },
    { icon: '🐱', duration: '45 s',     name: 'Cat-cow à 4 pattes',            desc: 'Dos rond puis creux. Lentement.' },
    { icon: '🤸', duration: '20 s/côté', name: 'Étirement épaules',            desc: 'Bras croisé devant la poitrine.' },
  ],
  exercises: [
    {
      id: 'w2c-1', name: 'Rangée inversée sous table', icon: '🏋️',
      dadReason: 'Pour chaque pompe, un mouvement de tirage équivalent. Sans ça : voûtement progressif, épaules en avant, douleurs cervicales.',
      sets: 4, reps: '10 répétitions', rest: '60 s',
      keyTip: 'Tirer la poitrine vers la table. Corps rigide, pas de hanches qui tombent.',
      videoSearch: 'inverted row table bodyweight back tutorial',
      easier: 'Genoux pliés pour réduire la charge',
      harder: 'Pieds surélevés sur une chaise',
    },
    {
      id: 'w2c-2', name: 'Pompes sur table (à 45°)', icon: '💪',
      dadReason: 'Haut du corps équilibré : autant de pousser que de tirer. Combiné avec la rangée, on construit des épaules solides.',
      sets: 3, reps: '12 répétitions', rest: '60 s',
      keyTip: 'Coudes à 45° du corps.',
      videoSearch: 'incline push ups table tutorial',
      easier: 'Table plus haute',
      harder: 'Table plus basse',
    },
    {
      id: 'w2c-3', name: 'Planche latérale sur genou', icon: '🛡️',
      dadReason: 'Les obliques stabilisent la colonne lors des rotations — porter un enfant sur un bras, attraper quelque chose sur le côté.',
      sets: 3, reps: '25 secondes de chaque côté', rest: '45 s',
      keyTip: 'Corps en ligne droite, hanches en l\'air — ne pas les laisser descendre.',
      videoSearch: 'side plank knee modified obliques tutorial',
      easier: 'Tenir 15 secondes',
      harder: 'Jambes tendues',
    },
    {
      id: 'w2c-4', name: 'Rotation thoracique', icon: '🔄',
      dadReason: 'Après des années de bureau, le thorax se rigidifie. Cette mobilité réduit les douleurs d\'épaule et améliore la posture.',
      sets: 3, reps: '8 rotations de chaque côté', rest: '30 s',
      keyTip: 'À 4 pattes, main derrière la tête. Ouvrir l\'épaule vers le plafond. Lentement.',
      videoSearch: 'thoracic rotation mobility exercise tutorial',
      easier: 'Amplitude réduite',
      harder: 'Pause 3 s en position ouverte',
    },
  ],
  cooldown: [
    'Étirement triceps — 30 s de chaque côté',
    'Child\'s pose bras sur le côté — 45 s de chaque côté',
    'Respiration complète — 5 grandes respirations',
  ],
  coachNote: 'La rangée sous table est l\'exercice le plus important pour ceux qui travaillent sur ordinateur. 2 semaines = première différence visible dans la posture.',
}

// ─── SEMAINE 3 · Construire de la force utile au quotidien ────────────────────

const W3A: WorkoutSession = {
  id: 'w3a', week: 3, sessionOfWeek: 1, type: 'A',
  missionName: 'Mission 7 — Corps entier, plus d\'intensité',
  duration: '25 min', difficulty: 3, focus: 'Corps entier',
  weekGoal: 'Construire de la force utile au quotidien',
  warmup: [
    { icon: '🏃', duration: '3 min',  name: 'Marche rapide ou vélo léger', desc: 'Jusqu\'à légère chaleur.' },
    { icon: '🚶', duration: '45 s',   name: 'Jumping jacks lents',         desc: 'Sans saut si besoin, juste écarter les pieds.' },
    { icon: '🔄', duration: '30 s',   name: 'Mobilité hanches',             desc: '10 cercles de chaque côté.' },
  ],
  exercises: [
    {
      id: 'w3a-1', name: 'Squat pause longue (5 secondes)', icon: '🦵',
      dadReason: 'La force réelle se construit en position basse. Cette pause transforme un squat ordinaire en exercice de force solide.',
      sets: 4, reps: '10 rép. · pause 5 s en bas', rest: '75 s',
      keyTip: 'Descendre lentement, tenir 5 secondes en bas, remonter normalement.',
      videoSearch: 'pause squat 5 seconds isometric hold tutorial',
      easier: 'Pause 2 secondes',
      harder: 'Pause 8 secondes',
    },
    {
      id: 'w3a-2', name: 'Pompes au sol · volume +', icon: '💪',
      dadReason: 'Semaine 3 : objectif = au moins 3 pompes propres sur les pieds. Choisir selon ta condition du jour.',
      sets: 4, reps: '8 à 10 répétitions', rest: '75 s',
      keyTip: 'Corps droit, amplitude complète : poitrine frôle le sol.',
      videoSearch: 'push ups proper form tutorial beginners floor',
      easier: 'Sur les genoux',
      harder: 'Tempo 3 secondes à la descente',
    },
    {
      id: 'w3a-3', name: 'Fente arrière avec pause (2 s)', icon: '🦵',
      dadReason: 'La pause force les quadriceps et les fessiers à tenir sans aide du rebond. C\'est là que la vraie force se développe.',
      sets: 3, reps: '8 rép. de chaque jambe', rest: '75 s',
      keyTip: 'Pause 2 secondes genou à 90° — tenir sans rebondir, puis remonter.',
      videoSearch: 'pause reverse lunge tutorial quad glute',
      easier: 'Fente arrière normale',
      harder: 'Pause 4 secondes',
    },
    {
      id: 'w3a-4', name: 'Mountain climbers lents', icon: '⚡',
      dadReason: 'Core + légère intensité cardio en un mouvement. 3 minutes de mountain climbers = 10 minutes d\'abdos classiques.',
      sets: 3, reps: '10 rép. de chaque côté', rest: '60 s',
      keyTip: 'Position pompe, ramener le genou vers la poitrine LENTEMENT — 2 secondes par mouvement.',
      videoSearch: 'slow mountain climbers tutorial core controlled',
      easier: 'Mains sur une chaise',
      harder: 'Légèrement plus vite, tout en gardant le contrôle',
    },
  ],
  cooldown: [
    'Forward fold debout : pencher en avant, laisser pendre les bras — 1 minute',
    'Étirement quadriceps — 30 s de chaque côté',
    'Respiration 4-7-8 : inspirer 4 s, tenir 7 s, expirer 8 s — 4 cycles',
  ],
  coachNote: 'Douleur musculaire = normal, le muscle se reconstruit. Douleur articulaire = stopper et récupérer. Apprendre cette différence est l\'une des compétences les plus importantes du programme.',
}

const W3B: WorkoutSession = {
  id: 'w3b', week: 3, sessionOfWeek: 2, type: 'B',
  missionName: 'Mission 8 — Jambes fortes',
  duration: '25 min', difficulty: 3, focus: 'Bas du corps',
  weekGoal: 'Construire de la force utile au quotidien',
  warmup: [
    { icon: '🧘', duration: '30 s',    name: 'Squat bas tenu',              desc: 'Mobilité cheville et hanche.' },
    { icon: '🦵', duration: '1 min',   name: 'Fentes basses dynamiques',    desc: 'Alterner lentement, torse droit.' },
    { icon: '🔄', duration: '10 rép.', name: 'Cercles de genoux',           desc: 'Debout, mains sur les genoux, 10 dans chaque sens.' },
  ],
  exercises: [
    {
      id: 'w3b-1', name: 'Step-up haut + genou levé', icon: '⬆️',
      dadReason: 'Montée + genou levé = tout le bas du corps en action. Fonctionnel, progressif, sans impact articulaire.',
      sets: 4, reps: '8 rép. de chaque côté', rest: '75 s',
      keyTip: 'Monter sur la chaise et lever le genou opposé en haut, avant de redescendre.',
      videoSearch: 'step up high knee tutorial glutes bodyweight',
      easier: 'Step-up normal sans genou levé',
      harder: 'Descente lente contrôlée en 3 secondes',
    },
    {
      id: 'w3b-2', name: 'Pont fessier sur une jambe', icon: '🔥',
      dadReason: 'Les déséquilibres (fessier gauche vs droite) causent des douleurs lombaires latérales. Cet exercice les corrige.',
      sets: 3, reps: '10 rép. de chaque côté', rest: '60 s',
      keyTip: 'Une jambe tendue en l\'air, monter fort avec l\'autre — tenir 2 secondes.',
      videoSearch: 'single leg glute bridge tutorial unilateral',
      easier: 'Pont fessier bilatéral',
      harder: 'Pause 5 secondes en haut',
    },
    {
      id: 'w3b-3', name: 'Fente latérale', icon: '🦵',
      dadReason: 'Mouvement latéral — le plus négligé. Essentiel pour la stabilité genou et les changements de direction.',
      sets: 3, reps: '10 rép. de chaque côté', rest: '60 s',
      keyTip: 'Grand pas sur le côté, plier le genou de la jambe portante, l\'autre reste tendue.',
      videoSearch: 'lateral lunge side lunge tutorial knee friendly',
      easier: 'Amplitude réduite',
      harder: 'Pause 2 secondes en bas',
    },
    {
      id: 'w3b-4', name: 'Wall sit + toucher d\'épaule', icon: '🧱',
      dadReason: 'L\'endurance musculaire des jambes évite la fatigue lors des longues journées debout ou des promenades en famille.',
      sets: 3, reps: '30 s · toucher épaules alternées', rest: '60 s',
      keyTip: 'Rester en wall sit et toucher l\'épaule opposée avec chaque main alternativement.',
      videoSearch: 'wall sit shoulder tap balance stability',
      easier: 'Wall sit seul',
      harder: 'Tenir 45 secondes',
    },
  ],
  cooldown: [
    'Pigeon pose : assis, jambe avant croisée — 1 min de chaque côté',
    'Étirement ischios couché — 45 s de chaque côté',
    'Marche lente 2 minutes',
  ],
  coachNote: 'La fente latérale est souvent la révélation de la semaine 3. Dans 2 semaines, la marche et les escaliers seront différents.',
}

const W3C: WorkoutSession = {
  id: 'w3c', week: 3, sessionOfWeek: 3, type: 'C',
  missionName: 'Mission 9 — Haut du corps, volume +',
  duration: '25 min', difficulty: 3, focus: 'Haut du corps',
  weekGoal: 'Construire de la force utile au quotidien',
  warmup: [
    { icon: '🐛', duration: '5 rép.',  name: 'Inchworm',               desc: 'Mains au sol, marcher jusqu\'en pompe, revenir.' },
    { icon: '💫', duration: '10 rép.', name: 'Pass-through serviette', desc: 'Serviette tendue au-dessus de la tête.' },
    { icon: '🔄', duration: '8 rép./côté', name: 'Rotations thoraciques', desc: 'À 4 pattes, amplitude maximale.' },
  ],
  exercises: [
    {
      id: 'w3c-1', name: 'Pompes lentes (4 s descente)', icon: '💪',
      dadReason: 'Descendre en 4 secondes double la difficulté. Le moyen le plus efficace de progresser sans jamais se blesser.',
      sets: 4, reps: '6 à 8 rép. · 4 s descente', rest: '75 s',
      keyTip: 'Compter 1-2-3-4 à la descente. Poitrine au sol. Remonter normalement.',
      videoSearch: 'slow push ups 4 second eccentric tutorial',
      easier: 'Sur les genoux',
      harder: 'Pause 2 s en bas de la descente',
    },
    {
      id: 'w3c-2', name: 'Rangée inversée · volume +', icon: '🏋️',
      dadReason: 'Un dos fort est invisible dans le miroir mais se ressent partout : moins de fatigue le soir, posture plus droite.',
      sets: 4, reps: '12 répétitions', rest: '60 s',
      keyTip: 'Serrer les omoplates ensemble à chaque tirage. Tenir 1 seconde en haut.',
      videoSearch: 'inverted row high reps bodyweight back',
      easier: 'Genoux pliés',
      harder: 'Pause 3 s en haut',
    },
    {
      id: 'w3c-3', name: 'Planche coudes · temps progressif', icon: '🛡️',
      dadReason: 'Les 20 secondes de S1 deviennent 40 secondes. C\'est la progression la plus visible du programme.',
      sets: 3, reps: '35 à 40 secondes', rest: '60 s',
      keyTip: 'Contracter tout : ventre, fessiers, cuisses. Respirer normalement malgré la tension.',
      videoSearch: 'plank 40 seconds form core tutorial',
      easier: 'Sur les genoux',
      harder: 'Planche RKC : pousser coudes vers les pieds',
    },
    {
      id: 'w3c-4', name: 'Shoulder tap en planche', icon: '⚡',
      dadReason: 'Anti-rotation : garder les hanches stables pendant un mouvement de bras. Protège le bas du dos dans tous les mouvements asymétriques.',
      sets: 3, reps: '8 rép. de chaque côté', rest: '60 s',
      keyTip: 'Hanches qui ne bougent pas — c\'est le challenge. Pieds écartés = plus facile.',
      videoSearch: 'plank shoulder tap anti-rotation tutorial',
      easier: 'Pieds très écartés',
      harder: 'Pieds joints',
    },
  ],
  cooldown: [
    'Étirement poitrine dans l\'encadrement d\'une porte — 1 minute',
    'Lat stretch : bras tendu sur un meuble, s\'affaisser — 45 s de chaque côté',
    'Respiration lente, 5 cycles profonds',
  ],
  coachNote: 'Fin de semaine 3. 9 séances. Un quart du programme. Si tu n\'avais pas fait ça, où en serais-tu maintenant ?',
}

// ─── SEMAINE 4 · Se sentir plus fort, plus léger, plus confiant ───────────────

const W4A: WorkoutSession = {
  id: 'w4a', week: 4, sessionOfWeek: 1, type: 'A',
  missionName: 'Mission 10 — Circuit complet',
  duration: '28 min', difficulty: 4, focus: 'Corps entier',
  weekGoal: 'Se sentir plus fort, plus léger, plus confiant',
  warmup: [
    { icon: '🏃', duration: '3 min', name: 'Marche rapide',         desc: 'Intensité montante.' },
    { icon: '🚶', duration: '1 min', name: 'Jumping jacks lents',   desc: 'Activation générale.' },
    { icon: '🔄', duration: '2 min', name: 'Mobilité complète',     desc: 'Épaules + hanches + chevilles.' },
  ],
  exercises: [
    {
      id: 'w4a-1', name: 'Circuit × 3 rounds', icon: '🔄',
      dadReason: '20 minutes de circuit = bénéfice d\'une heure de salle classique. Format parfait pour les pères qui ont peu de temps.',
      sets: 3, reps: 'Squat ×15 · Pompes ×10 · Fente ×10/côté · Planche ×30 s', rest: '90 s entre rounds',
      keyTip: 'Repos 20 s max entre exercices du round. Qualité de forme même en étant essoufflé.',
      videoSearch: 'full body circuit bodyweight no jumping beginners',
      easier: 'Pompes sur genoux, fentes avec appui',
      harder: 'Repos 10 s entre exercices',
    },
  ],
  cooldown: [
    'Marche lente 3 minutes — récupération active',
    'Étirements globaux : 30 s par zone (cuisses, hanches, poitrine, dos)',
    'Respiration lente 2 minutes',
  ],
  coachNote: 'Circuit training = ton outil pour la vie. 20 minutes. Tout le corps. Note ton nombre de rounds — dans 4 semaines, la même séance sera beaucoup plus facile.',
}

const W4B: WorkoutSession = {
  id: 'w4b', week: 4, sessionOfWeek: 2, type: 'B',
  missionName: 'Mission 11 — Test de force jambes',
  duration: '28 min', difficulty: 4, focus: 'Bas du corps',
  weekGoal: 'Se sentir plus fort, plus léger, plus confiant',
  warmup: [
    { icon: '🧘', duration: '45 s',    name: 'Squat bas tenu',           desc: 'Mobilité complète.' },
    { icon: '🦵', duration: '1 min',   name: 'Fentes basses dynamiques', desc: 'Lent et contrôlé.' },
    { icon: '🦵', duration: '30 s/j.', name: 'Balancement de jambes',    desc: 'Toutes directions.' },
  ],
  exercises: [
    {
      id: 'w4b-1', name: 'Squat pause + remontée forte', icon: '🦵',
      dadReason: 'Descente lente, pause, remontée forte — la force réelle, sans saut, sans impact, très efficace.',
      sets: 4, reps: '10 rép. · 3 s descente · 3 s pause', rest: '90 s',
      keyTip: '3 secondes descente, 3 secondes pause, puis remonter fort.',
      videoSearch: 'pause squat slow eccentric explosive tutorial',
      easier: 'Pause 2 secondes',
      harder: 'Pause 5 secondes',
    },
    {
      id: 'w4b-2', name: 'Step-up · descente contrôlée (3 s)', icon: '⬆️',
      dadReason: 'La descente en 3 secondes développe une force excentrique qui protège les genoux mieux que n\'importe quel exercice.',
      sets: 4, reps: '10 rép./jambe · 3 s descente', rest: '90 s',
      keyTip: 'Monter normalement, descendre en 3 secondes lentement.',
      videoSearch: 'slow step down eccentric quad strengthening',
      easier: 'Step-up normal',
      harder: 'Descente en 5 secondes',
    },
    {
      id: 'w4b-3', name: 'Pont fessier + pulses', icon: '🔥',
      dadReason: 'Pulses = petits mouvements rapides en haut. La brûlure est le signal que le muscle travaille vraiment.',
      sets: 4, reps: '10 rép. + 5 pulses en haut', rest: '60 s',
      keyTip: '10 reps normales, puis 5 petits mouvements rapides en haut sans descendre.',
      videoSearch: 'glute bridge pulses tutorial',
      easier: 'Sans les pulses',
      harder: 'Pied sur une chaise',
    },
    {
      id: 'w4b-4', name: 'Équilibre sur une jambe (30 s)', icon: '⚖️',
      dadReason: 'L\'équilibre diminue avec l\'âge. 30 secondes par jour = protection réelle contre les chutes et blessures.',
      sets: 3, reps: '30 secondes de chaque côté', rest: '30 s',
      keyTip: 'Yeux ouverts, regard fixe sur un point. Bras légèrement écartés.',
      videoSearch: 'single leg balance 30 seconds tutorial',
      easier: 'Tenir une chaise',
      harder: 'Yeux fermés',
    },
  ],
  cooldown: [
    'Pigeon pose long — 1 min 30 de chaque côté',
    'Figure 4 couché — 1 min de chaque côté',
    'Jambes contre le mur 3 minutes',
  ],
  coachNote: 'Tu commences peut-être à ressentir une vraie différence dans les gestes du quotidien. Monter les escaliers plus facilement, moins de fatigue le soir. Ce n\'est pas dans ta tête — c\'est physique.',
}

const W4C: WorkoutSession = {
  id: 'w4c', week: 4, sessionOfWeek: 3, type: 'C',
  missionName: 'Mission 12 — Récupération active',
  duration: '22 min', difficulty: 2, focus: 'Mobilité',
  weekGoal: 'Se sentir plus fort, plus léger, plus confiant',
  warmup: [
    { icon: '🚶', duration: '5 min', name: 'Marche douce', desc: 'Dehors si possible.' },
  ],
  exercises: [
    {
      id: 'w4c-1', name: 'Mobilité des hanches 90/90', icon: '🧘',
      dadReason: 'La mobilité des hanches détermine la qualité de tes mouvements jusqu\'à 70 ans. Investir maintenant = marcher sans douleur dans 30 ans.',
      sets: 3, reps: '45 s de chaque côté', rest: '30 s',
      keyTip: 'Assis, deux genoux à 90°. Pencher doucement sur la jambe avant. Respirer vers la tension.',
      videoSearch: '90 90 hip stretch tutorial mobility',
      easier: 'Amplitude réduite',
      harder: 'Rotation du torse en position',
    },
    {
      id: 'w4c-2', name: 'Dead bug version lente', icon: '⚡',
      dadReason: 'Ce mouvement en S4 est très différent de la S2 — le corps a appris à maintenir. Gainage profond qui protège le dos.',
      sets: 3, reps: '10 rép./côté · 3 s par mouvement', rest: '45 s',
      keyTip: 'Expirer fort AVANT de bouger. Dos plaqué. Revenir en 3 secondes.',
      videoSearch: 'dead bug slow deep core tutorial',
      easier: 'Jambes seules',
      harder: 'Jambe tendue plus proche du sol',
    },
    {
      id: 'w4c-3', name: 'World\'s greatest stretch × 10', icon: '🌍',
      dadReason: 'Compare avec la S1. La différence de fluidité et de mobilité est la mesure la plus concrète de ta progression.',
      sets: 2, reps: '10 rép. de chaque côté', rest: '30 s',
      keyTip: 'Fente basse → main au sol → bras vers le plafond. Lentement, ressentir chaque position.',
      videoSearch: "world's greatest stretch tutorial progression",
      easier: 'Amplitude réduite',
      harder: 'Pause 3 s à chaque position',
    },
    {
      id: 'w4c-4', name: 'Respiration et relaxation', icon: '🧘',
      dadReason: 'Le corps se reconstruit pendant le repos. Cette séquence active le mode récupération du système nerveux.',
      sets: 1, reps: '5 minutes · 1 respiration toutes les 8 s', rest: 'aucun',
      keyTip: 'Allongé sur le dos. Yeux fermés. Relâcher consciemment chaque partie du corps.',
      videoSearch: 'body scan relaxation breathing recovery workout',
      easier: 'Juste rester allongé à respirer',
      harder: 'Respiration 4-7-8 : inspirer 4 s, tenir 7 s, expirer 8 s',
    },
  ],
  cooldown: [
    'Full body stretch séquence — 5 minutes de la tête aux pieds',
  ],
  coachNote: '12 séances. 1 mois. 78% des gens abandonnent avant ça. Toi, tu es là. La vraie question maintenant : est-ce que tu continues les 60 prochaines séances ?',
}

// ─── SEMAINE 5 · Ancrer la régularité, passer à 4 jours ──────────────────────

const W5A: WorkoutSession = {
  id: 'w5a', week: 5, sessionOfWeek: 1, type: 'A',
  missionName: 'Mission 13 — Jambes niveau 2',
  duration: '28 min', difficulty: 3, focus: 'Bas du corps',
  weekGoal: 'Ancrer la régularité, passer à 4 jours',
  warmup: [
    { icon: '🏃', duration: '3 min', name: 'Marche rapide montante',           desc: 'Rythme progressif.' },
    { icon: '🧘', duration: '30 s',   name: 'Squat bas tenu',                   desc: 'Mobilité cheville et hanche.' },
    { icon: '🦵', duration: '10 rép.', name: 'Leg swing avant-arrière',         desc: 'Tenir un mur, 10 de chaque côté.' },
  ],
  exercises: [
    {
      id: 'w5a-1', name: 'Goblet squat (mains jointes à la poitrine)', icon: '🦵',
      dadReason: 'Les mains à la poitrine forcent le torse droit — un squat plus propre, plus efficace, sans matériel.',
      sets: 4, reps: '12 répétitions · 3 s descente', rest: '75 s',
      keyTip: 'Mains jointes sous le menton, coudes vers l\'intérieur. Dos verticalement droit.',
      videoSearch: 'goblet squat bodyweight hands clasped tutorial',
      easier: 'Squat tempo normal',
      harder: 'Pause 3 s en bas',
    },
    {
      id: 'w5a-2', name: 'Fente bulgare simplifiée', icon: '🦵',
      dadReason: 'La version la plus efficace de la fente — pied arrière sur une chaise. 1 exercice = 80% d\'un travail jambes complet.',
      sets: 3, reps: '8 rép. de chaque jambe', rest: '90 s',
      keyTip: 'Pied avant loin de la chaise. Genou avant ne dépasse pas la pointe du pied.',
      videoSearch: 'split squat rear foot elevated chair beginner',
      easier: 'Tenir un mur pour l\'équilibre',
      harder: 'Tempo 3 s descente',
    },
    {
      id: 'w5a-3', name: 'Soulevé de terre jambe unique (SL RDL)', icon: '⚖️',
      dadReason: 'Le mouvement qui prévient les torticolis lombaires. Renforce tout le dos de la jambe en un seul mouvement.',
      sets: 3, reps: '8 rép. de chaque côté', rest: '75 s',
      keyTip: 'Pencher en avant sur une jambe, dos droit, jambe arrière monte pendant que tu descends.',
      videoSearch: 'single leg romanian deadlift bodyweight tutorial',
      easier: 'Tenir un mur et amplitude réduite',
      harder: 'Pause 2 s en bas',
    },
    {
      id: 'w5a-4', name: 'Nordic curl excentrique simplifié', icon: '🦵',
      dadReason: 'Les ischio-jambiers faibles causent 40% des douleurs lombaires. Cette descente lente les renforce sans matériel.',
      sets: 3, reps: '5 répétitions · 5 s descente très lente', rest: '90 s',
      keyTip: 'Pieds bloqués sous un meuble. Descendre en 5 secondes contrôlées. Utiliser les mains pour remonter.',
      videoSearch: 'nordic hamstring curl beginner progression',
      easier: 'Descendre seulement au tiers (45°)',
      harder: 'Descendre en 8 secondes',
    },
  ],
  cooldown: [
    'Pigeon pose — 1 min 30 de chaque côté',
    'Étirement ischio couché — 45 s de chaque côté',
    'Marche lente 2 min pour faire circuler le sang',
  ],
  coachNote: 'La fente bulgare va t\'étonner. C\'est souvent la séance où les pères réalisent que leur côté gauche est plus faible que le droit — ou l\'inverse. Note-le.',
}

const W5B: WorkoutSession = {
  id: 'w5b', week: 5, sessionOfWeek: 2, type: 'B',
  missionName: 'Mission 14 — Haut du corps niveau 2',
  duration: '28 min', difficulty: 3, focus: 'Haut du corps',
  weekGoal: 'Ancrer la régularité, passer à 4 jours',
  warmup: [
    { icon: '💫', duration: '1 min',    name: 'Cercles de bras progressifs',   desc: 'Du plus petit au plus grand.' },
    { icon: '🐛', duration: '5 rép.',   name: 'Inchworm',                      desc: 'Mains au sol, marcher jusqu\'en position pompe, revenir.' },
    { icon: '🔄', duration: '8 rép./c.', name: 'Rotations thoraciques',        desc: 'Amplitude maximale.' },
  ],
  exercises: [
    {
      id: 'w5b-1', name: 'Pompes avec rotation', icon: '💪',
      dadReason: 'Pompe + rotation du torse = poitrine + épaule + obliques. Trois groupes musculaires, un mouvement. Efficacité maximale.',
      sets: 4, reps: '8 rép. (rotation alternée en haut)', rest: '75 s',
      keyTip: 'En haut de la pompe, tourner en T — bras vers le plafond. Alterner gauche/droite.',
      videoSearch: 'push up with rotation T form tutorial',
      easier: 'Sur les genoux',
      harder: 'Pause 2 s en position T',
    },
    {
      id: 'w5b-2', name: 'Dips sur chaise (triceps)', icon: '💪',
      dadReason: 'Les triceps représentent 60% du volume du bras. Ils soutiennent aussi tous les mouvements de poussée au quotidien.',
      sets: 3, reps: '10 à 12 répétitions', rest: '75 s',
      keyTip: 'Mains sur le bord de la chaise, jambes tendues. Descendre en contrôlant, coudes vers l\'arrière.',
      videoSearch: 'tricep dips chair tutorial form',
      easier: 'Genoux pliés à 90°',
      harder: 'Jambes surélevées sur une deuxième chaise',
    },
    {
      id: 'w5b-3', name: 'Pike push-up', icon: '💪',
      dadReason: 'Épaules solides = moins de douleur cervicale, meilleure posture. Le pike push-up cible les deltoïdes sans equipment.',
      sets: 3, reps: '8 à 10 répétitions', rest: '75 s',
      keyTip: 'Position en V renversé (hanches hautes). Descendre la tête vers le sol entre les mains.',
      videoSearch: 'pike push up shoulders tutorial',
      easier: 'Position moins haute (hanches pas aussi hautes)',
      harder: 'Pieds sur une chaise',
    },
    {
      id: 'w5b-4', name: 'Rangée inversée pause longue', icon: '🏋️',
      dadReason: 'Pause en haut = temps sous tension. Les muscles dos travaillent 2× plus longtemps à chaque répétition.',
      sets: 4, reps: '10 rép. · pause 3 s en haut', rest: '75 s',
      keyTip: 'Tirer la poitrine vers la table. En haut : serrer les omoplates et tenir 3 secondes.',
      videoSearch: 'inverted row pause hold back tutorial',
      easier: 'Genoux pliés',
      harder: 'Pieds surélevés',
    },
  ],
  cooldown: [
    'Étirement épaules et triceps — 30 s de chaque côté',
    'Étirement pectoraux dans l\'encadrement d\'une porte — 1 minute',
    'Respiration lente 5 cycles',
  ],
  coachNote: 'Le pike push-up est difficile la première fois. Si tu peux faire 5 répétitions propres, c\'est déjà très bien. Dans 3 semaines, tu en feras 10.',
}

const W5C: WorkoutSession = {
  id: 'w5c', week: 5, sessionOfWeek: 3, type: 'C',
  missionName: 'Mission 15 — Corps entier fonctionnel',
  duration: '30 min', difficulty: 3, focus: 'Corps entier',
  weekGoal: 'Ancrer la régularité, passer à 4 jours',
  warmup: [
    { icon: '🏃', duration: '3 min',  name: 'Marche rapide',             desc: 'Jusqu\'à légère transpiration.' },
    { icon: '🔄', duration: '1 min',  name: 'Hip circles debout',        desc: '10 dans chaque sens.' },
    { icon: '💫', duration: '30 s',   name: 'Bras en croix — rotations', desc: 'Épaules et thorax.' },
  ],
  exercises: [
    {
      id: 'w5c-1', name: 'Squat + extension des bras en haut', icon: '🦵',
      dadReason: 'En montant, lever les bras active les épaules et oblige à s\'élever plus. Exercice de posture autant que de force.',
      sets: 4, reps: '15 répétitions', rest: '60 s',
      keyTip: 'Bras tendus vers le ciel au sommet. Regarder vers le haut une seconde.',
      videoSearch: 'squat overhead reach bodyweight functional',
      easier: 'Sans extension des bras',
      harder: 'Tempo 3 s descente',
    },
    {
      id: 'w5c-2', name: 'Fente arrière + rotation thoracique', icon: '🦵',
      dadReason: 'La rotation pendant la fente reproduit les mouvements naturels du sport et de la vie. Hanches et mobilité thoracique ensemble.',
      sets: 3, reps: '8 rép. de chaque côté', rest: '60 s',
      keyTip: 'Dans la fente basse, tourner le torse vers la jambe avant. Bras en croix.',
      videoSearch: 'reverse lunge with thoracic rotation tutorial',
      easier: 'Fente sans rotation',
      harder: 'Tenir 2 s en rotation',
    },
    {
      id: 'w5c-3', name: 'Mountain climbers contrôlés · volume +', icon: '⚡',
      dadReason: 'Cardio + core en même temps. À 40-50 ans c\'est la meilleure façon d\'améliorer l\'endurance sans impact articulaire.',
      sets: 4, reps: '15 rép. de chaque côté', rest: '60 s',
      keyTip: '2 secondes par genou. Hanches stables, pas de balancement latéral.',
      videoSearch: 'slow mountain climbers core tutorial volume',
      easier: 'Mains sur une chaise',
      harder: 'Légèrement plus rapide (1 s/genou)',
    },
    {
      id: 'w5c-4', name: 'Planche + élévation de jambe alternée', icon: '🛡️',
      dadReason: 'Ajouter une élévation de jambe en planche active les fessiers ET les obliques. Le gainage devient complet.',
      sets: 3, reps: '8 rép. de chaque jambe', rest: '60 s',
      keyTip: 'Lever la jambe de 15-20 cm, tenir 2 s. Hanches ne tournent pas.',
      videoSearch: 'plank leg raise alternating core glute',
      easier: 'Planche sur les genoux',
      harder: 'Ajouter shoulder tap entre chaque élévation',
    },
  ],
  cooldown: [
    'Étirement complet corps entier : 30 s par zone',
    'Child\'s pose bras tendus — 1 minute',
    'Respiration profonde 3 minutes',
  ],
  coachNote: 'Les exercices composés de cette séance (fente + rotation, squat + bras) sont ceux qui te suivront toute ta vie. Plus fonctionnels que n\'importe quelle machine de salle.',
}

const W5D: WorkoutSession = {
  id: 'w5d', week: 5, sessionOfWeek: 4, type: 'D',
  missionName: 'Mission 16 — Core profond + mobilité',
  duration: '22 min', difficulty: 2, focus: 'Mobilité',
  weekGoal: 'Ancrer la régularité, passer à 4 jours',
  warmup: [
    { icon: '🚶', duration: '5 min', name: 'Marche douce', desc: 'Dehors si possible. Respiration nasale.' },
  ],
  exercises: [
    {
      id: 'w5d-1', name: 'Dead bug progressif', icon: '⚡',
      dadReason: 'Chaque semaine, le dead bug révèle un peu plus de force abdominale profonde. Le transverse travaille, invisible mais essentiel.',
      sets: 3, reps: '10 rép./côté · jambe tendue', rest: '45 s',
      keyTip: 'Jambe tendue quasi au sol (sans y toucher). Dos plaqué tout le long.',
      videoSearch: 'dead bug full extension core advanced',
      easier: 'Jambe moins proche du sol',
      harder: 'Pause 2 s en extension',
    },
    {
      id: 'w5d-2', name: 'Bird dog lent avec pause', icon: '⚡',
      dadReason: 'Stabilité lombaire en mouvement. Essentiel pour porter les bagages, jouer avec les enfants, jardiner.',
      sets: 3, reps: '8 rép./côté · pause 5 s', rest: '45 s',
      keyTip: 'Étirer au maximum bras et jambe opposés. Pause 5 secondes. Dos plat comme une table.',
      videoSearch: 'bird dog slow pause 5 seconds stability',
      easier: 'Pause 2 secondes',
      harder: 'Cercle lent avec le bras ou la jambe',
    },
    {
      id: 'w5d-3', name: 'World\'s greatest stretch × 10 · amplitude max', icon: '🌍',
      dadReason: 'Semaine 5 : compare avec la S1. La mobilité n\'est pas un talent, c\'est une compétence qui s\'entraîne.',
      sets: 2, reps: '10 rép. de chaque côté', rest: '30 s',
      keyTip: 'Fente basse → main sol → bras plafond → extension jambe arrière. Chaque position = point de progression.',
      videoSearch: "world's greatest stretch full version advanced",
      easier: 'Sans l\'extension de jambe arrière',
      harder: 'Ajouter rotation du torse en position ouverte',
    },
    {
      id: 'w5d-4', name: '90/90 hip flow dynamique', icon: '🧘',
      dadReason: 'Passer d\'une position 90/90 à l\'autre = mobilité de hanche active. Ce que la plupart des 40-50 ans n\'ont plus.',
      sets: 3, reps: '10 transitions lentes', rest: '30 s',
      keyTip: 'Assis, passer d\'un côté à l\'autre en contrôlant. Pas de rebond, mouvement conscient.',
      videoSearch: '90 90 hip flow transitions mobility tutorial',
      easier: 'Rester statique sur un côté 45 s',
      harder: 'Ajouter lean avant sur chaque position',
    },
  ],
  cooldown: [
    'Respiration 4-7-8 : 5 cycles complets',
    'Body scan couché : relâcher chaque partie du corps consciemment — 3 minutes',
  ],
  coachNote: '4 jours cette semaine. Ce n\'est pas plus difficile — c\'est juste plus régulier. Et la régularité bat l\'intensité sur 60 jours, chaque fois.',
}

// ─── SEMAINE 6 · Construire la résistance qui change le quotidien ─────────────

const W6A: WorkoutSession = {
  id: 'w6a', week: 6, sessionOfWeek: 1, type: 'A',
  missionName: 'Mission 17 — Jambes : endurance et puissance',
  duration: '30 min', difficulty: 3, focus: 'Bas du corps',
  weekGoal: 'Construire la résistance qui change le quotidien',
  warmup: [
    { icon: '🧘', duration: '30 s',    name: 'Squat bas tenu',               desc: 'Cheville et hanche.' },
    { icon: '🦵', duration: '1 min',   name: 'Fentes basses dynamiques',     desc: 'Alterner lentement.' },
    { icon: '🔄', duration: '10 rép.', name: 'Hip circles à 4 pattes',       desc: 'Hanche en cercle complet.' },
  ],
  exercises: [
    {
      id: 'w6a-1', name: 'Squat sumo · tempo long', icon: '🦵',
      dadReason: 'Adducteurs et fessiers ensemble. Réduit les risques de blessure genou et améliore la posture debout.',
      sets: 4, reps: '15 rép. · 4 s descente · 2 s pause', rest: '75 s',
      keyTip: '4 secondes pour descendre. 2 secondes de pause. Genoux suivent les orteils.',
      videoSearch: 'sumo squat slow eccentric hold tutorial',
      easier: 'Tempo 2 s sans pause',
      harder: 'Pause 4 s',
    },
    {
      id: 'w6a-2', name: 'Fente bulgare + enchaîné step-up', icon: '🦵',
      dadReason: 'Combiner deux exercices sur la même jambe = économie de temps + brûlure musculaire maximale.',
      sets: 3, reps: '6 fentes + 6 step-up · même jambe · repos · autre côté', rest: '90 s',
      keyTip: 'Faire toutes les répétitions d\'un côté avant de changer.',
      videoSearch: 'split squat step up superset leg workout',
      easier: 'Séparer les deux exercices',
      harder: 'Tempo lent sur les deux',
    },
    {
      id: 'w6a-3', name: 'Montées de mollets sur une jambe', icon: '🦶',
      dadReason: 'Les mollets sont difficiles à développer avec deux jambes — une jambe force chacune à faire 100% du travail.',
      sets: 3, reps: '12 rép. de chaque côté', rest: '60 s',
      keyTip: 'Monter en pleine amplitude, descendre en 3 secondes. Se tenir légèrement à un mur.',
      videoSearch: 'single leg calf raise slow eccentric',
      easier: 'Deux jambes',
      harder: 'Sur une marche (amplitude plus grande)',
    },
    {
      id: 'w6a-4', name: 'Équilibre dynamique · Y-balance', icon: '⚖️',
      dadReason: 'Se tenir sur une jambe en 3 directions = stabilité articulaire réelle. Prévient les entorses et améliore la proprioception.',
      sets: 3, reps: '5 reaches de chaque direction · chaque jambe', rest: '45 s',
      keyTip: 'Sur une jambe, toucher le sol le plus loin possible dans 3 directions (avant, diagonal gauche, diagonal droit).',
      videoSearch: 'Y balance test single leg reach stability',
      easier: 'Balance statique',
      harder: 'Yeux fermés',
    },
  ],
  cooldown: [
    'Pigeon pose long — 2 min de chaque côté',
    'Figure 4 couché — 1 min 30 de chaque côté',
    'Jambes contre le mur 3 minutes',
  ],
  coachNote: 'La fente bulgare enchaînée au step-up est difficile. Si les 6+6 sont trop, commencer par 4+4. L\'important c\'est de finir les 3 rounds.',
}

const W6B: WorkoutSession = {
  id: 'w6b', week: 6, sessionOfWeek: 2, type: 'B',
  missionName: 'Mission 18 — Haut du corps : force réelle',
  duration: '30 min', difficulty: 4, focus: 'Haut du corps',
  weekGoal: 'Construire la résistance qui change le quotidien',
  warmup: [
    { icon: '💫', duration: '1 min',    name: 'Grands cercles de bras',     desc: 'Avant puis arrière.' },
    { icon: '🐛', duration: '5 rép.',   name: 'Inchworm + pompe',           desc: 'Marcher jusqu\'en pompe, faire 1 pompe, revenir.' },
    { icon: '🔄', duration: '10 rép./c.', name: 'Rotations thoraciques',   desc: 'Amplitude maximale.' },
  ],
  exercises: [
    {
      id: 'w6b-1', name: 'Close-grip push-up (mains rapprochées)', icon: '💪',
      dadReason: 'Mains rapprochées = 70% triceps. Des triceps forts protègent les coudes lors des activités du quotidien.',
      sets: 4, reps: '8 à 10 répétitions', rest: '75 s',
      keyTip: 'Mains à largeur d\'épaules (pas plus larges). Coudes collés au corps pendant la descente.',
      videoSearch: 'close grip push ups triceps form tutorial',
      easier: 'Sur les genoux',
      harder: 'Tempo 4 s descente',
    },
    {
      id: 'w6b-2', name: 'Archer push-up (vers un côté)', icon: '💪',
      dadReason: 'Progressif vers le 1 bras. Chaque côté porte ~70% du poids. Force réelle, asymétrique, fonctionnelle.',
      sets: 3, reps: '6 rép. de chaque côté', rest: '90 s',
      keyTip: 'Bras large tendu sur le côté pendant que l\'autre bras fait la pompe. Corps légèrement incliné.',
      videoSearch: 'archer push up one arm progression tutorial',
      easier: 'Pompes normales',
      harder: 'Main tendue plus haute (sur une brique/livre)',
    },
    {
      id: 'w6b-3', name: 'Rangée inversée · wide grip', icon: '🏋️',
      dadReason: 'Prise large = grand dorsal + deltoïde postérieur. La partie du dos la plus importante pour la posture longue durée.',
      sets: 4, reps: '10 rép. · pause 2 s en haut', rest: '75 s',
      keyTip: 'Mains plus larges que les épaules. Tirer les coudes DEHORS, pas vers le corps.',
      videoSearch: 'wide grip inverted row back posture tutorial',
      easier: 'Genoux pliés',
      harder: 'Pieds surélevés',
    },
    {
      id: 'w6b-4', name: 'Dips + pike push-up en superset', icon: '💪',
      dadReason: 'Triceps puis épaules sans repos = efficacité maximale. 2 exercices = 1 séance de salle complète pour le haut.',
      sets: 3, reps: '8 dips + 6 pike push-ups · sans repos entre les deux', rest: '90 s',
      keyTip: 'Enchaîner immédiatement sans pause. Prendre le repos entre les rounds.',
      videoSearch: 'tricep dips pike push up superset upper body',
      easier: 'Séparer et faire chaque exercice avec repos',
      harder: '10 dips + 8 pike push-ups',
    },
  ],
  cooldown: [
    'Étirement triceps — 45 s de chaque côté',
    'Child\'s pose bras sur le côté — 45 s de chaque côté',
    'Respiration lente 5 cycles',
  ],
  coachNote: 'L\'archer push-up est l\'exercice de la semaine 6. Il te fait travailler d\'une façon que les pompes normales ne peuvent pas. 3 semaines pour sentir la différence.',
}

const W6C: WorkoutSession = {
  id: 'w6c', week: 6, sessionOfWeek: 3, type: 'C',
  missionName: 'Mission 19 — Résistance cardio · circuits',
  duration: '30 min', difficulty: 4, focus: 'Corps entier',
  weekGoal: 'Construire la résistance qui change le quotidien',
  warmup: [
    { icon: '🏃', duration: '5 min', name: 'Marche rapide progressive', desc: 'Intensité croissante. Finir presque en jogging.' },
    { icon: '🔄', duration: '1 min', name: 'Mobilité complète',         desc: 'Épaules + hanches + chevilles rapide.' },
  ],
  exercises: [
    {
      id: 'w6c-1', name: 'Circuit AMRAP 20 minutes', icon: '🔄',
      dadReason: 'AMRAP = as many rounds as possible. Tu competes contre toi-même. Note tes rounds — dans 2 semaines, tu en feras plus.',
      sets: 1, reps: 'Squat ×20 · Pompes ×12 · Fente arrière ×12/côté · Mountain climbers ×20/côté · Planche ×30 s', rest: 'Repos 90 s toutes les 2 rounds',
      keyTip: 'Rythme soutenable. Pas de course. Note le nombre de rounds complets à la fin.',
      videoSearch: 'AMRAP circuit bodyweight no jump 20 minutes',
      easier: 'Réduire les répétitions de 25%',
      harder: 'Réduire le repos à 60 s',
    },
  ],
  cooldown: [
    'Marche lente 5 minutes — récupération active importante',
    'Étirements complets : 30 s par zone musculaire',
    'Allongé, jambes au mur 3 minutes',
  ],
  coachNote: 'L\'AMRAP révèle ton niveau réel. 3 rounds = très bien. 4 rounds = excellent. 5+ rounds = tu n\'as probablement pas assez travaillé. Honnêteté avec soi-même d\'abord.',
}

const W6D: WorkoutSession = {
  id: 'w6d', week: 6, sessionOfWeek: 4, type: 'D',
  missionName: 'Mission 20 — Récupération active · semaine 6',
  duration: '20 min', difficulty: 1, focus: 'Mobilité',
  weekGoal: 'Construire la résistance qui change le quotidien',
  warmup: [
    { icon: '🚶', duration: '5 min', name: 'Marche douce à l\'extérieur', desc: 'Idéalement pieds nus dans l\'herbe.' },
  ],
  exercises: [
    {
      id: 'w6d-1', name: 'Foam roll simulation (massage au sol)', icon: '🧘',
      dadReason: 'Masser les muscles au sol avec le poids du corps brise les adhérences musculaires qui causent la raideur matinale.',
      sets: 1, reps: '60 s par zone : mollets · ischio · fessiers · dos',
      rest: 'aucun',
      keyTip: 'Trouver un point douloureux, s\'y arrêter 10 secondes, puis continuer.',
      videoSearch: 'self massage floor techniques no foam roller',
      easier: 'Étirements simples à la place',
      harder: 'Ajouter un livre sous une zone pour plus de pression',
    },
    {
      id: 'w6d-2', name: 'Étirement global séquence · 10 postures', icon: '🌍',
      dadReason: 'La mobilité gagne sur le long terme. 1 jour de récup par semaine = 3× moins de blessures sur 60 jours.',
      sets: 1, reps: '45 s par posture · enchaîner sans pause', rest: 'aucun',
      keyTip: 'Respirer dans chaque tension. Ne pas forcer. Laisser le poids du corps faire le travail.',
      videoSearch: 'full body stretching routine 10 minutes recovery',
      easier: 'Tenir 30 s par posture',
      harder: 'Tenir 60 s',
    },
    {
      id: 'w6d-3', name: 'Respiration Wim Hof allégée', icon: '🧘',
      dadReason: 'La respiration contrôlée active la récupération du système nerveux. Moins de cortisol = meilleur sommeil = meilleure récupération.',
      sets: 3, reps: '30 respirations profondes + rétention d\'air', rest: 'Naturel entre les rounds',
      keyTip: '30 respirations rapides profondes → expirer → tenir le vide → inspirer → tenir 15 s.',
      videoSearch: 'Wim Hof breathing beginner 3 rounds tutorial',
      easier: 'Juste 10 respirations profondes et lentes',
      harder: 'Tenir le vide plus longtemps',
    },
  ],
  cooldown: [
    'Allongé 5 minutes · body scan complet',
  ],
  coachNote: 'Cette séance semble facile. Elle l\'est. C\'est le but. Le corps a besoin d\'un jour léger pour intégrer le travail des 3 autres jours. La récupération n\'est pas de la paresse.',
}

// ─── SEMAINE 7 · Sentir la différence dans chaque geste du quotidien ──────────

const W7A: WorkoutSession = {
  id: 'w7a', week: 7, sessionOfWeek: 1, type: 'A',
  missionName: 'Mission 21 — Force jambes avancée',
  duration: '32 min', difficulty: 4, focus: 'Bas du corps',
  weekGoal: 'Sentir la différence dans chaque geste du quotidien',
  warmup: [
    { icon: '🏃', duration: '3 min',  name: 'Marche rapide',             desc: 'Intensité soutenue.' },
    { icon: '🧘', duration: '45 s',   name: 'Deep squat hold',           desc: 'Mobilité cheville et hanche maximale.' },
    { icon: '🦵', duration: '8 rép./c.', name: 'Leg swing multidirectionnel', desc: 'Avant, arrière et latéral. Chaque jambe.' },
  ],
  exercises: [
    {
      id: 'w7a-1', name: 'Fente bulgare · volume maximum', icon: '🦵',
      dadReason: 'Semaine 7 : même exercice que S5, mais 4 séries et amplitude complète. La progression est le moteur du changement.',
      sets: 4, reps: '10 rép. de chaque jambe · 3 s descente', rest: '90 s',
      keyTip: 'Aller jusqu\'au genou arrière à 2-3 cm du sol. Contrôle total.',
      videoSearch: 'bulgarian split squat 4 sets progression',
      easier: 'Tenir une chaise',
      harder: 'Pause 2 s en bas',
    },
    {
      id: 'w7a-2', name: 'SL RDL · tempo + volume', icon: '⚖️',
      dadReason: 'La progression naturelle : même mouvement, plus de séries, plus lent. Le corps s\'adapte si on lui donne plus.',
      sets: 4, reps: '10 rép./côté · 3 s descente', rest: '75 s',
      keyTip: 'La jambe d\'appui reste légèrement fléchie. Dos droit. Sentir l\'ischio s\'allonger.',
      videoSearch: 'single leg RDL slow eccentric hamstring',
      easier: 'Tenir un mur',
      harder: 'Pause 2 s en bas',
    },
    {
      id: 'w7a-3', name: 'Nordic curl · descente plus profonde', icon: '🦵',
      dadReason: 'Progression sur S5 : descendre plus loin. Les ischio-jambiers forts réduisent le risque de déchirure musculaire de 51%.',
      sets: 3, reps: '6 rép. · 6 s descente', rest: '90 s',
      keyTip: 'Pieds bloqués. 6 secondes pour descendre. Corps droit. Mains pour remonter.',
      videoSearch: 'nordic curl progression deeper eccentric',
      easier: 'Descente 4 s',
      harder: 'Descente 8 s',
    },
    {
      id: 'w7a-4', name: 'Wall sit · position courte pulsée', icon: '🧱',
      dadReason: 'Pulses en position wall sit = quadriceps en contraction isométrique + dynamique. Brûlure intense, bénéfice réel.',
      sets: 3, reps: '30 s tenu + 10 pulses', rest: '60 s',
      keyTip: 'Tenir 30 secondes, puis 10 petits mouvements de 5 cm sans remonter.',
      videoSearch: 'wall sit pulses quad endurance advanced',
      easier: 'Wall sit seul 30 s',
      harder: '45 s + 15 pulses',
    },
  ],
  cooldown: [
    'Pigeon pose avancé — 2 min de chaque côté',
    'Étirement ischios debout penché en avant — 1 min',
    'Massage mollets au sol 1 min chaque jambe',
  ],
  coachNote: 'À la fin de cette séance, tu dois sentir tes ischio-jambiers. Si tu ne les sens pas, tu n\'allais pas assez loin dans les nordic curls.',
}

const W7B: WorkoutSession = {
  id: 'w7b', week: 7, sessionOfWeek: 2, type: 'B',
  missionName: 'Mission 22 — Force haut du corps avancée',
  duration: '32 min', difficulty: 4, focus: 'Haut du corps',
  weekGoal: 'Sentir la différence dans chaque geste du quotidien',
  warmup: [
    { icon: '💫', duration: '1 min',  name: 'Grands cercles avant et arrière', desc: 'Bras tendus, amplitude max.' },
    { icon: '🐛', duration: '8 rép.', name: 'Inchworm + pompe + rotation',     desc: 'Pompe en bas + T rotation en haut.' },
    { icon: '🔄', duration: '10/c.',  name: 'Rotations thoraciques',           desc: 'À 4 pattes.' },
  ],
  exercises: [
    {
      id: 'w7b-1', name: 'Archer push-up · volume progressif', icon: '💪',
      dadReason: 'Semaine 7 : même exercice que S6, mais 4 séries. La force unilatérale est la force réelle.',
      sets: 4, reps: '8 rép. de chaque côté', rest: '90 s',
      keyTip: 'Bras tendu large, descendre en controˆle. Ne pas se laisser tomber.',
      videoSearch: 'archer push up volume progression one arm',
      easier: 'Pompes normales',
      harder: 'Tempo 4 s descente',
    },
    {
      id: 'w7b-2', name: 'Decline push-up (pieds sur chaise)', icon: '💪',
      dadReason: 'Pieds surélevés = 60% du poids sur les épaules et la partie haute des pectoraux. Posture debout fortement améliorée.',
      sets: 3, reps: '8 à 10 répétitions', rest: '75 s',
      keyTip: 'Pieds sur une chaise stable. Corps droit. Descendre lentement.',
      videoSearch: 'decline push up feet on chair upper chest shoulders',
      easier: 'Pompes normales',
      harder: 'Tempo 3 s + pause 1 s en bas',
    },
    {
      id: 'w7b-3', name: 'Rangée inversée unilaterale (1 bras)', icon: '🏋️',
      dadReason: 'Un bras = chaque côté travaille indépendamment. Révèle et corrige les déséquilibres dos gauche/droit.',
      sets: 3, reps: '8 rép. de chaque bras', rest: '75 s',
      keyTip: 'Saisir le bord de la table avec un bras. Corps droit. Tirer fort.',
      videoSearch: 'one arm inverted row bodyweight back unilateral',
      easier: 'Rangée inversée normale deux bras',
      harder: 'Pause 3 s en haut',
    },
    {
      id: 'w7b-4', name: 'Planche dynamique complète', icon: '🛡️',
      dadReason: 'Planche avec mouvement = gainage actif. Le corps ne bouge jamais en position statique dans la vraie vie.',
      sets: 3, reps: '10 shoulder taps + 6 leg raises + 30 s tenue finale', rest: '75 s',
      keyTip: 'Enchaîner les 3 sans repos. Finir par tenir 30 secondes maximum.',
      videoSearch: 'plank complex shoulder tap leg raise hold',
      easier: 'Séparer les 3 exercices',
      harder: 'Ajouter 5 mountain climbers au milieu',
    },
  ],
  cooldown: [
    'Étirement poitrine dans porte — 1 minute',
    'Lat stretch bras sur meuble — 45 s de chaque côté',
    'Rotation thoracique couché — 45 s de chaque côté',
  ],
  coachNote: 'La rangée à un bras va surprendre. Même si tu penses que tes deux côtés sont égaux — ils ne le sont probablement pas. C\'est normal. Note la différence.',
}

const W7C: WorkoutSession = {
  id: 'w7c', week: 7, sessionOfWeek: 3, type: 'C',
  missionName: 'Mission 23 — Corps entier · puissance contrôlée',
  duration: '32 min', difficulty: 4, focus: 'Corps entier',
  weekGoal: 'Sentir la différence dans chaque geste du quotidien',
  warmup: [
    { icon: '🏃', duration: '4 min', name: 'Marche active avec bras',  desc: 'Bras qui balancent fort.' },
    { icon: '🔄', duration: '1 min', name: 'Mobilité complète rapide', desc: 'Tout le corps en 1 minute.' },
  ],
  exercises: [
    {
      id: 'w7c-1', name: 'Squat tempo long + remontée forte', icon: '🦵',
      dadReason: 'La remontée forte sans saut développe la puissance musculaire — ce qui te permet de te lever vite d\'un fauteuil ou de sprinter pour attraper un bus.',
      sets: 4, reps: '10 rép. · 4 s descente · 3 s pause · remontée forte', rest: '90 s',
      keyTip: '4 s down, 3 s hold, fast up. Corps sous tension pendant 7 secondes par rep.',
      videoSearch: 'slow squat explosive concentric pause squat power',
      easier: 'Pas de remontée explosive',
      harder: 'Pause 5 s',
    },
    {
      id: 'w7c-2', name: 'Fente arrière + genou levé haut', icon: '🦵',
      dadReason: 'Fente + genou levé = force + coordination + équilibre dynamique. Exactement ce qu\'il faut pour les sports de loisir.',
      sets: 4, reps: '10 rép./côté', rest: '75 s',
      keyTip: 'Fente arrière, puis en remontant lever le genou avant haut vers la poitrine.',
      videoSearch: 'reverse lunge knee drive balance coordination',
      easier: 'Fente sans genou levé',
      harder: 'Tempo 3 s descente',
    },
    {
      id: 'w7c-3', name: 'Mountain climbers · 30 s ON / 15 s OFF × 5', icon: '⚡',
      dadReason: 'Intervals courts = cardio efficace pour un cœur sain. 5 rounds de 30 secondes = bénéfice cardiovasculaire de 20 minutes.',
      sets: 5, reps: '30 s actif · 15 s repos', rest: 'Inclus dans les répétitions',
      keyTip: 'Rythme soutenu mais contrôlé. Hanches stables. Ne pas sauter.',
      videoSearch: 'mountain climbers interval 30 on 15 off cardio',
      easier: 'Rythme lent 2 s/genou',
      harder: 'Réduire repos à 10 s',
    },
    {
      id: 'w7c-4', name: 'Planche + élévation jambe + shoulder tap', icon: '🛡️',
      dadReason: 'Triple challenge en un : gainage, fessiers, anti-rotation. En semaine 7, ce combo est accessible — en S1, il était impossible.',
      sets: 3, reps: '10 shoulder taps + 10 leg raises de chaque côté', rest: '75 s',
      keyTip: 'Alterner : shoulder tap gauche → droit → leg raise gauche → droit. Lentement.',
      videoSearch: 'plank complex leg raise shoulder tap tutorial',
      easier: 'Un seul type de mouvement à la fois',
      harder: 'Ajouter 5 mountain climbers entre chaque répétition',
    },
  ],
  cooldown: [
    'Étirements globaux — 5 minutes',
    'Marche lente — 3 minutes',
    'Respiration lente — 5 cycles',
  ],
  coachNote: 'Semaine 7. Le squat tempo + remontée forte est un exercice qui t\'accompagnera toute ta vie. Discret, pas impressionnant en apparence — mais profondément efficace.',
}

const W7D: WorkoutSession = {
  id: 'w7d', week: 7, sessionOfWeek: 4, type: 'D',
  missionName: 'Mission 24 — Équilibre + proprioception',
  duration: '22 min', difficulty: 2, focus: 'Mobilité',
  weekGoal: 'Sentir la différence dans chaque geste du quotidien',
  warmup: [
    { icon: '🚶', duration: '5 min', name: 'Marche heel-to-toe', desc: 'Talon d\'un pied contre la pointe de l\'autre. Équilibre.' },
  ],
  exercises: [
    {
      id: 'w7d-1', name: 'Équilibre sur une jambe · variations', icon: '⚖️',
      dadReason: 'L\'équilibre se dégrade de 30% entre 40 et 60 ans. Entraîner maintenant = marcher sans problème jusqu\'à 80 ans.',
      sets: 3, reps: '30 s yeux ouverts + 20 s yeux fermés · chaque jambe', rest: '30 s',
      keyTip: 'Yeux ouverts : regard fixe. Yeux fermés : bras légèrement écartés. Si tu tombes, tu travailles bien.',
      videoSearch: 'balance training eyes closed proprioception 40s',
      easier: 'Yeux ouverts seulement',
      harder: 'Debout sur un coussin ou serviette roulée',
    },
    {
      id: 'w7d-2', name: 'Heel-to-toe walk lent (20 m)', icon: '🦶',
      dadReason: 'Le test d\'équilibre que les neurologues utilisent. Simple, révélateur, entraînable.',
      sets: 3, reps: '20 mètres aller-retour · talon contre orteils', rest: '30 s',
      keyTip: 'Bras écartés. Regarder au loin, pas ses pieds. Avancer lentement.',
      videoSearch: 'heel to toe walking balance coordination test',
      easier: 'Bras contre le mur',
      harder: 'Yeux fermés (très difficile)',
    },
    {
      id: 'w7d-3', name: 'Deep squat + proprioception (yeux fermés)', icon: '🧘',
      dadReason: 'Sentir l\'équilibre sans les yeux force le système nerveux à s\'adapter. C\'est ça la proprioception.',
      sets: 3, reps: '30 s en squat bas · yeux fermés', rest: '30 s',
      keyTip: 'Descendre en squat bas, fermer les yeux, respirer. Sentir chaque micro-ajustement.',
      videoSearch: 'deep squat hold balance proprioception',
      easier: 'Yeux ouverts',
      harder: 'Tête tournée d\'un côté',
    },
    {
      id: 'w7d-4', name: 'Hip flow 90/90 + mobilité complète', icon: '🧘',
      dadReason: 'La récup active préserve la mobilité acquise sur la semaine. Sans ça, la rigidité reprend en 48h.',
      sets: 2, reps: '10 transitions · 5 postures · 45 s chacune', rest: '30 s',
      keyTip: 'Fluidité avant profondeur. Les transitions lisses signalent une hanche mobile.',
      videoSearch: '90 90 hip flow full mobility sequence',
      easier: 'Postures statiques seulement',
      harder: 'Lean forward sur chaque position',
    },
  ],
  cooldown: [
    'Body scan allongé — 5 minutes',
    'Respiration carrée : 4 s inspirer, 4 s tenir, 4 s expirer, 4 s vide — 5 cycles',
  ],
  coachNote: 'L\'équilibre yeux fermés sur une jambe — si tu peux tenir 20 secondes, tu as un âge biologique inférieur à la moyenne. Note ton record. Il va augmenter.',
}

// ─── SEMAINE 8 · Mesurer jusqu'où tu es allé en 60 jours ─────────────────────

const W8A: WorkoutSession = {
  id: 'w8a', week: 8, sessionOfWeek: 1, type: 'A',
  missionName: 'Mission 25 — Test de performance jambes',
  duration: '30 min', difficulty: 5, focus: 'Bas du corps',
  weekGoal: 'Mesurer jusqu\'où tu es allé en 60 jours',
  warmup: [
    { icon: '🏃', duration: '5 min',  name: 'Marche active progressive', desc: 'Finir proche du jogging.' },
    { icon: '🧘', duration: '1 min',  name: 'Squat bas · mobilité totale', desc: 'Préparer les articulations.' },
    { icon: '🦵', duration: '10 rép./c.', name: 'Fentes basses dynamiques', desc: 'Activer tout le bas du corps.' },
  ],
  exercises: [
    {
      id: 'w8a-1', name: 'MAX squats propres en 5 minutes', icon: '🦵',
      dadReason: 'Compare avec le jour 1. C\'est la mesure la plus honnête de ta progression. Pas ce que tu vois dans le miroir — ce que tu fais.',
      sets: 1, reps: 'Maximum de répétitions propres en 5 minutes', rest: 'Repos naturel entre séries de reps',
      keyTip: 'Forme impeccable avant tout. Un squat mal fait ne compte pas. Note le chiffre final.',
      videoSearch: 'squat endurance test max reps 5 minutes',
      easier: 'Prendre plus de pause',
      harder: 'Squat lent (3 s descente) pour chaque répétition',
    },
    {
      id: 'w8a-2', name: 'Fente bulgare · max reps', icon: '🦵',
      dadReason: 'Max reps = test de ton niveau actuel. Pas de performance sans mesure.',
      sets: 2, reps: 'Max reps de chaque jambe (note le chiffre)', rest: '2 minutes entre les côtés',
      keyTip: 'S\'arrêter quand la forme se dégrade. Mieux vaut 8 reps propres que 15 mauvaises.',
      videoSearch: 'split squat max reps test',
      easier: 'Tenir une chaise',
      harder: 'Sans aide',
    },
    {
      id: 'w8a-3', name: 'Nordic curl · max descentes propres', icon: '🦵',
      dadReason: 'Compare avec S5. Si tu descends plus loin et plus lentement qu\'il y a 3 semaines — tu as progressé.',
      sets: 2, reps: 'Max reps de chaque côté · 5 s descente minimum', rest: '90 s',
      keyTip: 'Note la profondeur atteinte. Utiliser les mains pour remonter.',
      videoSearch: 'nordic curl test progression',
      easier: 'Descente 3 s',
      harder: 'Descente 8 s',
    },
    {
      id: 'w8a-4', name: 'Équilibre final · yeux fermés · planche', icon: '⚖️',
      dadReason: 'Deux tests finaux : équilibre sur une jambe yeux fermés + planche maximum. Ces deux mesures ont une corrélation forte avec l\'âge biologique.',
      sets: 1, reps: 'Équilibre YF : max secondes chaque jambe · Planche : max secondes', rest: '2 min entre les deux',
      keyTip: 'Note tes records. Compare avec S1 et S4.',
      videoSearch: 'balance test one leg closed eyes plank max hold',
      easier: 'Yeux ouverts pour l\'équilibre',
      harder: 'Ajouter shoulder tap pendant la planche',
    },
  ],
  cooldown: [
    'Pigeon pose — 2 min de chaque côté',
    'Jambes contre le mur — 5 minutes',
    'Respiration lente — 5 cycles',
  ],
  coachNote: 'Note tous tes résultats d\'aujourd\'hui. Squats max, nordic curl profondeur, équilibre secondes, planche secondes. Ce sont tes nouvelles bases.',
}

const W8B: WorkoutSession = {
  id: 'w8b', week: 8, sessionOfWeek: 2, type: 'B',
  missionName: 'Mission 26 — Test de performance haut du corps',
  duration: '30 min', difficulty: 5, focus: 'Haut du corps',
  weekGoal: 'Mesurer jusqu\'où tu es allé en 60 jours',
  warmup: [
    { icon: '💫', duration: '1 min',  name: 'Grands cercles de bras', desc: 'Avant et arrière, maximum.' },
    { icon: '🐛', duration: '5 rép.', name: 'Inchworm complet',       desc: 'Avec pompe et rotation en bas.' },
    { icon: '🔄', duration: '10/c.',  name: 'Rotations thoraciques',  desc: 'Amplitude maximale.' },
  ],
  exercises: [
    {
      id: 'w8b-1', name: 'MAX pompes propres · test final', icon: '💪',
      dadReason: 'Le test de force haut du corps le plus fiable. Corrélé à la santé cardiovasculaire, à la masse musculaire, à la mortalité. C\'est sérieux.',
      sets: 1, reps: 'Maximum de pompes propres sans pause', rest: 'Ce test ne dure pas — tout donner',
      keyTip: 'Corps droit. Amplitude complète (poitrine sol). S\'arrêter dès que la forme casse. Note le chiffre.',
      videoSearch: 'push up max test proper form measure',
      easier: 'Sur les genoux',
      harder: 'Sur les pieds uniquement',
    },
    {
      id: 'w8b-2', name: 'MAX rangées inversées', icon: '🏋️',
      dadReason: 'Équilibre push/pull. Idéalement le nombre de rangées = 80% du nombre de pompes. Si c\'est moins : le dos était négligé.',
      sets: 1, reps: 'Maximum de rangées propres sans pause', rest: 'Note le chiffre',
      keyTip: 'Poitrine jusqu\'à la table. Corps droit.',
      videoSearch: 'inverted row max reps test',
      easier: 'Genoux pliés',
      harder: 'Pieds surélevés',
    },
    {
      id: 'w8b-3', name: 'Planche · temps maximum absolu', icon: '🛡️',
      dadReason: 'Compare avec S1. Le temps de planche maximum est un indicateur de force du core et de santé globale.',
      sets: 1, reps: 'Tenir jusqu\'à l\'échec · forme propre uniquement', rest: 'Note le temps',
      keyTip: 'Corps parfaitement droit. Respirer. S\'arrêter quand les hanches tombent.',
      videoSearch: 'plank max hold test core strength',
      easier: 'Sur les genoux',
      harder: 'Planche coudes',
    },
    {
      id: 'w8b-4', name: 'Dips · max reps', icon: '💪',
      dadReason: 'Triceps = force fonctionnelle pour se lever d\'un fauteuil, se redresser, pousser. Test complet.',
      sets: 2, reps: 'Maximum · forme propre', rest: '2 minutes entre les sets',
      keyTip: 'Descendre jusqu\'aux bras à 90°. Remonter complètement.',
      videoSearch: 'tricep dips max reps test performance',
      easier: 'Genoux pliés',
      harder: 'Jambes surélevées',
    },
  ],
  cooldown: [
    'Étirements complets haut du corps — 5 minutes',
    'Respiration lente — 5 cycles profonds',
  ],
  coachNote: 'Pompes max S1 vs aujourd\'hui. Si tu as progressé de +5, c\'est excellent. +10 ou plus, c\'est remarquable. Quel que soit le chiffre : tu es en meilleure forme qu\'il y a 8 semaines.',
}

const W8C: WorkoutSession = {
  id: 'w8c', week: 8, sessionOfWeek: 3, type: 'C',
  missionName: 'Mission 27 — Circuit performance finale',
  duration: '32 min', difficulty: 5, focus: 'Corps entier',
  weekGoal: 'Mesurer jusqu\'où tu es allé en 60 jours',
  warmup: [
    { icon: '🏃', duration: '5 min', name: 'Marche rapide → jogging léger', desc: 'Dernière montée en chauffe du programme.' },
    { icon: '🔄', duration: '2 min', name: 'Mobilité complète',              desc: 'Tout le corps.' },
  ],
  exercises: [
    {
      id: 'w8c-1', name: 'AMRAP final · 25 minutes', icon: '🔄',
      dadReason: 'Le même circuit qu\'en S6, 2 semaines plus tard. Compare les rounds. Chaque round supplémentaire = ton progrès visible.',
      sets: 1, reps: 'Squat ×20 · Pompes ×12 · Fente arrière ×12/c. · Mountain climbers ×20/c. · Planche ×30 s', rest: 'Repos 90 s toutes les 2 rounds',
      keyTip: 'Note les rounds. Compare avec S6. La différence, c\'est toi.',
      videoSearch: 'AMRAP circuit bodyweight 25 minutes performance test',
      easier: 'Réduire les répétitions',
      harder: 'Réduire le repos à 60 s',
    },
  ],
  cooldown: [
    'Marche lente 5 minutes — récupération active',
    'Étirements globaux complets — 10 minutes',
    'Allongé, body scan — 5 minutes',
  ],
  coachNote: 'S6 : X rounds. Aujourd\'hui : X+? rounds. La différence entre ces deux chiffres s\'appelle la progression. Elle est réelle, physique, mesurable. Elle t\'appartient.',
}

const W8D: WorkoutSession = {
  id: 'w8d', week: 8, sessionOfWeek: 4, type: 'D',
  missionName: 'Mission 28 — Bilan 60 jours',
  duration: '20 min', difficulty: 1, focus: 'Mobilité',
  weekGoal: 'Mesurer jusqu\'où tu es allé en 60 jours',
  warmup: [
    { icon: '🚶', duration: '10 min', name: 'Marche dehors', desc: 'Dernière marche du programme. Profiter.' },
  ],
  exercises: [
    {
      id: 'w8d-1', name: 'World\'s greatest stretch · bilan', icon: '🌍',
      dadReason: 'Compare avec le jour 1. La fluidité, la profondeur, l\'absence de raideur — c\'est la différence la plus visible de 60 jours de travail.',
      sets: 2, reps: '10 rép. de chaque côté · amplitude maximum', rest: '30 s',
      keyTip: 'Remarquer la différence avec le premier jour. Ce n\'est plus le même corps.',
      videoSearch: "world's greatest stretch flexibility test",
      easier: 'Amplitude réduite',
      harder: 'Pause 5 s à chaque position',
    },
    {
      id: 'w8d-2', name: 'Mobilité complète tête-aux-pieds', icon: '🧘',
      dadReason: '60 jours de programme méritent 20 minutes de reconnaissance. Chaque articulation mérite un passage.',
      sets: 1, reps: '60 s par zone : chevilles · genoux · hanches · dos · épaules · cou', rest: 'aucun',
      keyTip: 'Respirer dans chaque tension. Dernier passage.',
      videoSearch: 'full body mobility sequence head to toe',
      easier: 'Rester moins longtemps',
      harder: 'Ajouter une zone supplémentaire',
    },
    {
      id: 'w8d-3', name: 'Respiration finale · rituel de fin', icon: '🧘',
      dadReason: 'Le corps et le cerveau ont besoin d\'un signal de fin. Ce rituel marque la transition entre le programme et la vie active qui commence.',
      sets: 1, reps: '10 respirations profondes · allongé · yeux fermés', rest: 'aucun',
      keyTip: 'À chaque expiration, relâcher un peu plus. Sur la dernière : sourire.',
      videoSearch: 'breathing ritual end workout mindfulness',
      easier: '5 respirations',
      harder: '20 respirations avec rétention',
    },
  ],
  cooldown: [
    'Rester allongé 5 minutes. Sans téléphone.',
  ],
  coachNote: '28 missions. 60 jours. 4 semaines de 3 séances, 4 semaines de 4 séances. Ce que tu voulais prouver — tu l\'as prouvé. La question maintenant : qu\'est-ce que tu construis ensuite ?',
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export const SESSIONS_BY_WEEK: Record<number, WorkoutSession[]> = {
  1: [W1A, W1B, W1C],
  2: [W2A, W2B, W2C],
  3: [W3A, W3B, W3C],
  4: [W4A, W4B, W4C],
  5: [W5A, W5B, W5C, W5D],
  6: [W6A, W6B, W6C, W6D],
  7: [W7A, W7B, W7C, W7D],
  8: [W8A, W8B, W8C, W8D],
}

export const WEEK_GOALS: Record<number, string> = {
  1: 'Reprendre le contrôle de son énergie',
  2: 'Retrouver du souffle et de la mobilité',
  3: 'Construire de la force utile au quotidien',
  4: 'Se sentir plus fort, plus léger, plus confiant',
  5: 'Ancrer la régularité, passer à 4 jours',
  6: 'Construire la résistance qui change le quotidien',
  7: 'Sentir la différence dans chaque geste du quotidien',
  8: 'Mesurer jusqu\'où tu es allé en 60 jours',
}

export const DIFFICULTY_LABEL: Record<number, string> = {
  1: 'Très facile', 2: 'Facile', 3: 'Modéré', 4: 'Difficile', 5: 'Intense',
}

export const DIFFICULTY_COLOR: Record<number, string> = {
  1: '#22C55E', 2: '#84CC16', 3: '#F59E0B', 4: '#EF4444', 5: '#7C3AED',
}

// Gradient per exercise category (for thumbnails)
export const EXERCISE_GRADIENTS: Record<string, string> = {
  '🦵': 'linear-gradient(135deg, #1e3a5f, #2563eb)',
  '💪': 'linear-gradient(135deg, #163b2d, #22c55e)',
  '🔥': 'linear-gradient(135deg, #7c2d12, #ef4444)',
  '⚡': 'linear-gradient(135deg, #44338a, #8b5cf6)',
  '🏋️': 'linear-gradient(135deg, #1c1917, #57534e)',
  '🛡️': 'linear-gradient(135deg, #0c4a6e, #0ea5e9)',
  '🔄': 'linear-gradient(135deg, #134e4a, #0d9488)',
  '⬆️': 'linear-gradient(135deg, #1e3a5f, #3b82f6)',
  '🦸': 'linear-gradient(135deg, #3b0764, #a855f7)',
  '🌍': 'linear-gradient(135deg, #14532d, #16a34a)',
  '🧱': 'linear-gradient(135deg, #292524, #78716c)',
  '🦶': 'linear-gradient(135deg, #1e3a5f, #06b6d4)',
  '⚖️': 'linear-gradient(135deg, #44338a, #6366f1)',
  '🧘': 'linear-gradient(135deg, #134e4a, #6ee7b7)',
}

export const ALL_SESSIONS: WorkoutSession[] = [1, 2, 3, 4, 5, 6, 7, 8].flatMap(w => SESSIONS_BY_WEEK[w] ?? [])

export interface DadFitModule {
  id: number; name: string; milestone: string
  weeksRange: [number, number]; color: string; promise: string; available: boolean
}

export const MODULES: DadFitModule[] = [
  { id: 1, name: 'Reprendre confiance',           milestone: 'J30',  weeksRange: [1, 4],  color: '#22C55E', promise: "Retrouver l'énergie. Reprendre le contrôle.",   available: true  },
  { id: 2, name: 'Redevenir actif avec ta famille', milestone: 'J90',  weeksRange: [5, 8],  color: '#60A5FA', promise: "Bouger avec tes enfants. Être le papa qui joue.", available: true  },
  { id: 3, name: 'Devenir physiquement solide',   milestone: 'J180', weeksRange: [9, 20], color: '#F59E0B', promise: "Construire une vraie force. Porter sans effort.",  available: false },
  { id: 4, name: 'Transmettre',                   milestone: 'J365', weeksRange: [21, 52],color: '#A78BFA', promise: "Montrer l'exemple. Devenir une référence.",        available: false },
]
