import type { User, CheckIn, SessionLog, Milestone } from '../types'

export const mockUser: User = {
  id: 'u1',
  name: 'Thomas',
  goals: { steps: 7000, waterL: 2, bedtime: '23:00' },
  startDate: '2025-04-30',
  weightCurrent: 92.4,
  weightTarget: 84,
  programDays: 90,
}

// 14 days of check-ins, most recent first
const today = new Date()
const dateStr = (offset: number) => {
  const d = new Date(today)
  d.setDate(d.getDate() - offset)
  return d.toISOString().split('T')[0]
}

export const mockCheckIns: CheckIn[] = [
  // Today — not yet done (simulated: no entry for today)
  { id: 'ci1',  userId:'u1', date: dateStr(1),  energy:7, sleptWell:true,  joints:'good',  steps:8200, waterL:1.8, bedtimeOK:true  },
  { id: 'ci2',  userId:'u1', date: dateStr(2),  energy:4, sleptWell:false, joints:'stiff', steps:5100, waterL:1.2, bedtimeOK:false },
  { id: 'ci3',  userId:'u1', date: dateStr(3),  energy:8, sleptWell:true,  joints:'good',  steps:9400, waterL:2.1, bedtimeOK:true  },
  { id: 'ci4',  userId:'u1', date: dateStr(4),  energy:6, sleptWell:true,  joints:'good',  steps:7200, waterL:2.0, bedtimeOK:true  },
  { id: 'ci5',  userId:'u1', date: dateStr(5),  energy:3, sleptWell:false, joints:'stiff', steps:4800, waterL:1.0, bedtimeOK:false },
  { id: 'ci6',  userId:'u1', date: dateStr(6),  energy:7, sleptWell:true,  joints:'good',  steps:8800, waterL:1.9, bedtimeOK:true  },
  { id: 'ci7',  userId:'u1', date: dateStr(7),  energy:9, sleptWell:true,  joints:'good',  steps:10200,waterL:2.2, bedtimeOK:true  },
  { id: 'ci8',  userId:'u1', date: dateStr(8),  energy:5, sleptWell:true,  joints:'good',  steps:6900, waterL:1.7, bedtimeOK:false },
  { id: 'ci9',  userId:'u1', date: dateStr(9),  energy:4, sleptWell:false, joints:'stiff', steps:4200, waterL:1.1, bedtimeOK:false },
  { id: 'ci10', userId:'u1', date: dateStr(10), energy:7, sleptWell:true,  joints:'good',  steps:8100, waterL:2.0, bedtimeOK:true  },
  { id: 'ci11', userId:'u1', date: dateStr(11), energy:6, sleptWell:true,  joints:'good',  steps:7500, waterL:1.8, bedtimeOK:true  },
  { id: 'ci12', userId:'u1', date: dateStr(12), energy:8, sleptWell:true,  joints:'good',  steps:9100, waterL:2.1, bedtimeOK:true  },
  { id: 'ci13', userId:'u1', date: dateStr(13), energy:5, sleptWell:false, joints:'stiff', steps:5600, waterL:1.5, bedtimeOK:false },
  { id: 'ci14', userId:'u1', date: dateStr(14), energy:7, sleptWell:true,  joints:'good',  steps:7800, waterL:1.9, bedtimeOK:true  },
]

const baseExercisesA = [
  { id:'e1', name:'Squats bodyweight',    setsDone:0, setsTarget:3, reps:'15 reps', cues:['Genoux dans l\'axe des orteils','Dos droit, regard devant','Descendez lentement (2s)'] },
  { id:'e2', name:'Pompes (genoux OK)',   setsDone:0, setsTarget:3, reps:'10 reps', cues:['Gainage du ventre actif','Coudes à 45°, pas évasés','Full amplitude si possible'] },
  { id:'e3', name:'Fentes alternées',     setsDone:0, setsTarget:3, reps:'10 reps/côté', cues:['Grand pas en avant','Genou arrière proche du sol','Repoussez fort sur le talon'] },
  { id:'e4', name:'Planche',              setsDone:0, setsTarget:3, reps:'30s',     cues:['Hanches alignées — pas en l\'air','Respiration lente et régulière','Serrez les fesses'] },
]

const baseExercisesB = [
  { id:'e5', name:'Squats sautés',        setsDone:0, setsTarget:4, reps:'12 reps', cues:['Réception souple, ne pas claquer','Sautez haut — pas large','Repos 30s entre séries'] },
  { id:'e6', name:'Burpees',              setsDone:0, setsTarget:4, reps:'8 reps',  cues:['Contrôle > vitesse','Planche correcte avant le saut','Respirez entre chaque rep'] },
  { id:'e7', name:'Pompes diamant',       setsDone:0, setsTarget:4, reps:'10 reps', cues:['Mains proches, index-pouce forment losange','Coudes le long du corps','Descente lente 3s'] },
  { id:'e8', name:'Gainage latéral alt.', setsDone:0, setsTarget:3, reps:'40s/côté',cues:['Hanches levées, corps aligné','Bras tendu ou plié selon niveau','Respiration profonde'] },
]

export const mockSessionLogs: SessionLog[] = [
  { id:'s1',  userId:'u1', date:dateStr(2),  type:'A', exercises:baseExercisesA.map(e=>({...e, setsDone:3})), status:'completed', energyAfter:7, durationMin:18 },
  { id:'s2',  userId:'u1', date:dateStr(4),  type:'B', exercises:baseExercisesB.map(e=>({...e, setsDone:4})), status:'completed', energyAfter:8, durationMin:22 },
  { id:'s3',  userId:'u1', date:dateStr(6),  type:'A', exercises:baseExercisesA.map(e=>({...e, setsDone:2})), status:'partial',   energyAfter:5, durationMin:14 },
  { id:'s4',  userId:'u1', date:dateStr(9),  type:'B', exercises:baseExercisesB.map(e=>({...e, setsDone:4})), status:'completed', energyAfter:9, durationMin:20 },
  { id:'s5',  userId:'u1', date:dateStr(11), type:'A', exercises:baseExercisesA.map(e=>({...e, setsDone:3})), status:'completed', energyAfter:7, durationMin:17 },
  { id:'s6',  userId:'u1', date:dateStr(13), type:'B', exercises:baseExercisesB.map(e=>({...e, setsDone:3})), status:'completed', energyAfter:6, durationMin:19 },
  { id:'s7',  userId:'u1', date:dateStr(16), type:'A', exercises:baseExercisesA.map(e=>({...e, setsDone:3})), status:'completed', energyAfter:8, durationMin:18 },
  { id:'s8',  userId:'u1', date:dateStr(19), type:'B', exercises:baseExercisesB.map(e=>({...e, setsDone:4})), status:'completed', energyAfter:9, durationMin:21 },
  { id:'s9',  userId:'u1', date:dateStr(22), type:'A', exercises:baseExercisesA.map(e=>({...e, setsDone:3})), status:'completed', energyAfter:7, durationMin:18 },
  { id:'s10', userId:'u1', date:dateStr(25), type:'B', exercises:baseExercisesB.map(e=>({...e, setsDone:4})), status:'completed', energyAfter:8, durationMin:20 },
  { id:'s11', userId:'u1', date:dateStr(28), type:'A', exercises:baseExercisesA.map(e=>({...e, setsDone:2})), status:'partial',   energyAfter:5, durationMin:12 },
  { id:'s12', userId:'u1', date:dateStr(32), type:'B', exercises:baseExercisesB.map(e=>({...e, setsDone:4})), status:'completed', energyAfter:9, durationMin:22 },
]

export const mockMilestones: Milestone[] = [
  { id:'m1', triggerSessions:1,  label:'Premier entraînement',  emoji:'🚀', unlocked:true  },
  { id:'m2', triggerSessions:5,  label:'Pris l\'habitude',       emoji:'🔥', unlocked:true  },
  { id:'m3', triggerSessions:10, label:'Routinier',              emoji:'💪', unlocked:true  },
  { id:'m4', triggerSessions:15, label:'Mi-parcours',            emoji:'⚡', unlocked:false },
  { id:'m5', triggerSessions:20, label:'Transformateur',         emoji:'🏆', unlocked:false },
  { id:'m6', triggerSessions:30, label:'Mode de vie',            emoji:'🌟', unlocked:false },
]

export const todaySession: SessionLog = {
  id: 'today',
  userId: 'u1',
  date: dateStr(0),
  type: 'A',
  exercises: baseExercisesA.map(e => ({ ...e })),
  status: 'completed',
}
