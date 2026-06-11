import React, { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { RECIPES, RECIPE_CATS } from '../data/recipes'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl p-5 shadow-sm ${className}`}>{children}</div>
}
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3">{children}</p>
}

const PROTEINS = [
  { food: 'Œufs', qty: '3 œufs', g: '18g', icon: '🥚' },
  { food: 'Poulet', qty: '150g cuit', g: '40g', icon: '🍗' },
  { food: 'Thon en boîte', qty: '1 boîte', g: '30g', icon: '🐟' },
  { food: 'Fromage blanc', qty: '200g', g: '14g', icon: '🥛' },
  { food: 'Steak haché 5%', qty: '150g', g: '35g', icon: '🥩' },
  { food: 'Lentilles cuites', qty: '200g', g: '18g', icon: '🫘' },
  { food: 'Saumon', qty: '130g', g: '28g', icon: '🐠' },
  { food: 'Yaourt grec', qty: '200g', g: '17g', icon: '🫙' },
]

const PRINCIPLES = [
  { icon: '🥩', title: 'Protéines d\'abord', color: '#163B2D', bg: '#DCF5E3', rule: 'À chaque repas, une source de protéines. Pas de calcul, pas de balance. Une priorité.', why: 'Les protéines rassasient, préservent le muscle et demandent plus d\'énergie à digérer. Vise 1,6 à 2g par kilo de poids corporel.' },
  { icon: '💧', title: '2L d\'eau minimum', color: '#1D4ED8', bg: '#EFF6FF', rule: 'Commence ta journée avec un grand verre. Garde une bouteille visible. Bois avant d\'avoir soif.', why: 'Une déshydratation légère (+2%) réduit la concentration et l\'énergie, et déclenche des fringales inutiles.' },
  { icon: '🕐', title: 'Manger lentement', color: '#92400E', bg: '#FEF3C7', rule: 'Pose la fourchette entre chaque bouchée. Mange assis, sans écran si possible. La satiété arrive après 20 min.', why: 'La vitesse est la première cause de suralimentation. Un repas plus lent, c\'est 200 kcal de moins sans y penser.' },
  { icon: '🚫', title: 'Zéro interdiction', color: '#6B7280', bg: '#F9FAFB', rule: 'Aucun aliment n\'est interdit. Un repas plaisir n\'est jamais un problème. Abandonner 3 semaines à cause d\'un repas, ça l\'est.', why: 'La restriction crée des envies compulsives. La régularité à 80% bat la perfection à 100% deux semaines.' },
]

const MEALS = [
  { time: 'Matin', icon: '🌅', ideas: [
    { label: 'Rapide (3 min)', meal: 'Yaourt grec + poignée de noix + café', proteins: '18g prot.' },
    { label: 'Rassasiant', meal: '3 œufs brouillés + pain complet + fruit', proteins: '22g prot.' },
    { label: 'Sans faim', meal: 'Fromage blanc + granola maison + baies', proteins: '15g prot.' },
  ]},
  { time: 'Midi', icon: '☀️', ideas: [
    { label: 'Rapide', meal: 'Thon + riz précuit + légumes surgelés', proteins: '35g prot.' },
    { label: 'Cantine', meal: 'Viande + légumes + féculents. Sauter le dessert sucré', proteins: '30g prot.' },
    { label: 'Sandwich', meal: 'Pain complet + jambon + salade + fromage', proteins: '28g prot.' },
  ]},
  { time: 'Soir', icon: '🌙', ideas: [
    { label: 'Familial', meal: 'Poulet rôti + légumes au four + quinoa', proteins: '40g prot.' },
    { label: 'Express', meal: 'Steak haché + brocoli vapeur + riz', proteins: '38g prot.' },
    { label: 'Légère', meal: 'Omelette 4 œufs + salade + pain de seigle', proteins: '28g prot.' },
  ]},
]

const AVOID = [
  { item: 'Jus de fruits', reason: 'Autant de sucre qu\'un soda, sans les fibres du fruit entier.' },
  { item: 'Produits "light" / "0%"', reason: 'Souvent plus de sucre pour compenser le manque de gras.' },
  { item: 'Sauter le petit-déjeuner sans raison', reason: 'Provoque des compensations l\'après-midi et le soir.' },
  { item: 'Manger debout / en marchant', reason: 'La conscience de ce qu\'on mange diminue, les quantités augmentent.' },
  { item: 'Grignoter par ennui', reason: 'Pose-toi la question : est-ce que j\'ai vraiment faim, ou je m\'occupe ?' },
]

// Removed 'Toutes' — categories only
const RECIPE_CATS_FILTERED = RECIPE_CATS.filter(c => c !== 'Toutes')

const CAT_ICON: Record<string, string> = {
  'Petit-déjeuner': '🍳',
  'Déjeuner rapide': '⚡',
  'Dîner famille': '👨‍👩‍👧',
  'Batch cooking': '🫙',
  'Snacks': '🥜',
}

const DIFF_COLOR: Record<string, string> = {
  'Facile': '#22C55E',
  'Moyen': '#F59E0B',
}

export default function Nutrition() {
  const { user, todayCheckIn } = useApp()
  const [openMeal, setOpenMeal] = useState<string | null>('Matin')
  const [recipeCat, setRecipeCat] = useState('')
  const [recipeSearch, setRecipeSearch] = useState('')
  const [openRecipe, setOpenRecipe] = useState<number | null>(null)

  const filteredRecipes = useMemo(() => {
    let list = RECIPES
    if (recipeCat) list = list.filter(r => r.cat === recipeCat)
    if (recipeSearch.trim()) {
      const q = recipeSearch.toLowerCase()
      list = list.filter(r => r.name.toLowerCase().includes(q) || r.ingredients.some(i => i.toLowerCase().includes(q)))
    }
    return list
  }, [recipeCat, recipeSearch])

  const waterL = todayCheckIn?.waterL ?? 0
  const goalWater = user.goals.waterL
  const waterPct = Math.min((waterL / goalWater) * 100, 100)

  return (
    <div className="min-h-full bg-[#F8F8F5]">
      <div className="max-w-[1100px] mx-auto px-6 py-6">
        <div className="flex gap-6 items-start">

          {/* ── LEFT SIDEBAR ── */}
          <div className="w-96 shrink-0 space-y-4" style={{ position: 'sticky', top: 24, maxHeight: 'calc(100vh - 48px)', overflowY: 'auto' }}>

            {/* Header */}
            <div className="rounded-2xl p-5" style={{ background: '#111827' }}>
              <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-2">DadFit · Nutrition</p>
              <h1 className="text-xl font-black text-white mb-1" style={{ fontFamily: 'Manrope' }}>
                Manger mieux.<br />Pas moins.
              </h1>
              <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
                Aucune restriction. Aucun régime. Une priorité par repas : les protéines d'abord.
              </p>
            </div>

            {/* Hydration */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <Label>Hydratation aujourd'hui</Label>
                <span className="text-sm font-black" style={{ color: waterPct >= 100 ? '#22C55E' : '#9CA3AF' }}>
                  {waterL.toFixed(1)} / {goalWater} L
                </span>
              </div>
              <div className="h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${waterPct}%`, background: 'linear-gradient(90deg, #60A5FA, #22C55E)' }} />
              </div>
              <div className="flex gap-1.5 mt-3">
                {[0.5, 1, 1.5, 2].map(v => (
                  <div key={v} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full h-7 rounded-lg overflow-hidden flex flex-col-reverse" style={{ background: '#F3F4F6' }}>
                      <div style={{ height: `${Math.min(waterL / v, 1) * 100}%`, background: '#60A5FA' }} />
                    </div>
                    <span className="text-[9px] text-[#9CA3AF] font-semibold">{v}L</span>
                  </div>
                ))}
              </div>
              {!todayCheckIn && (
                <p className="text-[10px] text-[#9CA3AF] text-center mt-2">Fais ton check-in du jour pour suivre l'hydratation.</p>
              )}
            </Card>

            {/* 4 principles */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#22C55E] mb-3 px-1">Les 4 règles</p>
              <div className="space-y-2">
                {PRINCIPLES.map((p, i) => (
                  <div key={i} className="rounded-2xl p-3.5" style={{ background: p.bg, border: `1px solid ${p.color}20` }}>
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0">{p.icon}</span>
                      <div>
                        <p className="font-black text-sm mb-0.5" style={{ color: p.color, fontFamily: 'Manrope' }}>{p.title}</p>
                        <p className="text-xs font-semibold text-[#111827] mb-1">{p.rule}</p>
                        <p className="text-[11px] text-[#6B7280] leading-relaxed">{p.why}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Protein sources */}
            <Card>
              <Label>Sources de protéines</Label>
              <p className="text-xs text-[#9CA3AF] mb-3">Une de ces sources à chaque repas.</p>
              <div className="grid grid-cols-2 gap-1.5">
                {PROTEINS.map(p => (
                  <div key={p.food} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: '#F9FAFB' }}>
                    <span className="text-lg shrink-0">{p.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#111827] truncate">{p.food}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{p.qty}</p>
                    </div>
                    <span className="text-xs font-black text-[#22C55E] shrink-0">{p.g}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Meal ideas */}
            <Card>
              <Label>Idées de repas</Label>
              <div className="space-y-2">
                {MEALS.map(m => (
                  <div key={m.time} className="rounded-xl overflow-hidden" style={{ border: '1px solid #F3F4F6' }}>
                    <button
                      onClick={() => setOpenMeal(openMeal === m.time ? null : m.time)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[#FAFAFA]"
                    >
                      <span className="text-lg">{m.icon}</span>
                      <span className="font-black text-sm text-[#111827] flex-1">{m.time}</span>
                      <span className="text-[#9CA3AF] text-xs">{openMeal === m.time ? '▲' : '▼'}</span>
                    </button>
                    {openMeal === m.time && (
                      <div className="px-3 pb-2 space-y-1.5 border-t border-[#F9FAFB]">
                        {m.ideas.map((idea, i) => (
                          <div key={i} className="flex items-start gap-2 pt-1.5">
                            <span className="text-[10px] font-black text-[#22C55E] w-16 shrink-0 mt-0.5">{idea.label}</span>
                            <p className="text-xs text-[#374151] flex-1">{idea.meal}</p>
                            <span className="text-[10px] font-bold text-[#9CA3AF] shrink-0">{idea.proteins}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Avoid */}
            <Card>
              <Label>À surveiller</Label>
              <div className="space-y-1.5">
                {AVOID.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl" style={{ background: '#FEF9C3' }}>
                    <span className="text-xs text-[#D97706] mt-0.5 shrink-0">⚠</span>
                    <div>
                      <p className="text-xs font-bold text-[#92400E]">{a.item}</p>
                      <p className="text-[10px] text-[#92400E] opacity-80 mt-0.5">{a.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Alcohol */}
            <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: '#111827' }}>
              <span className="text-2xl">🍺</span>
              <div>
                <p className="text-sm font-black text-white mb-1">L'alcool, sans interdire</p>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Une bière le vendredi ou un verre au repas de famille, c'est la vie. Le problème, c'est le rituel quotidien.
                </p>
              </div>
            </div>

          </div>

          {/* ── RIGHT MAIN — RECETTES ── */}
          <div className="flex-1 min-w-0">

            {/* Section title */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Recettes · {filteredRecipes.length}</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Simples, rapides, protéinées. Pour les vrais emplois du temps de père.</p>
              </div>
              <span className="text-xs text-[#9CA3AF] font-semibold">{RECIPES.length} recettes</span>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Rechercher une recette ou un ingrédient..."
                value={recipeSearch}
                onChange={e => setRecipeSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-[#F3F4F6] bg-white focus:outline-none focus:border-[#22C55E] text-[#111827] placeholder-[#9CA3AF]"
              />
              {recipeSearch && (
                <button onClick={() => setRecipeSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-xs">✕</button>
              )}
            </div>

            {/* Category pills — no "Toutes" */}
            <div className="flex gap-2 flex-wrap mb-4">
              {RECIPE_CATS_FILTERED.map(c => (
                <button
                  key={c}
                  onClick={() => setRecipeCat(recipeCat === c ? '' : c)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                  style={{
                    background: recipeCat === c ? '#22C55E' : 'white',
                    color: recipeCat === c ? 'white' : '#6B7280',
                    border: `1.5px solid ${recipeCat === c ? '#22C55E' : '#F3F4F6'}`,
                  }}
                >
                  <span>{CAT_ICON[c]}</span>
                  <span>{c}</span>
                </button>
              ))}
            </div>

            {/* Recipe list */}
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12 text-[#9CA3AF] text-sm">Aucune recette trouvée.</div>
            ) : (
              <div className="space-y-2">
                {filteredRecipes.map(r => (
                  <div key={r.id} className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid #F3F4F6' }}>
                    <button
                      onClick={() => setOpenRecipe(openRecipe === r.id ? null : r.id)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-[#FAFAFA] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: '#F9FAFB' }}>
                        {CAT_ICON[r.cat] || '🍽️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm text-[#111827] truncate" style={{ fontFamily: 'Manrope' }}>{r.name}</p>
                        <p className="text-[11px] text-[#9CA3AF] mt-0.5">{r.cat}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs font-black text-[#22C55E]">{r.proteins}</p>
                          <p className="text-[10px] text-[#9CA3AF]">prot.</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-xs font-bold text-[#6B7280]">{r.time}</p>
                          <p className="text-[10px] text-[#9CA3AF]">prep</p>
                        </div>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full"
                          style={{ background: `${DIFF_COLOR[r.diff]}18`, color: DIFF_COLOR[r.diff] }}>
                          {r.diff}
                        </span>
                        <span className="text-[#9CA3AF] text-xs w-4 text-center">{openRecipe === r.id ? '▲' : '▼'}</span>
                      </div>
                    </button>

                    {openRecipe === r.id && (
                      <div className="border-t border-[#F9FAFB] px-4 pb-4 pt-3">
                        <div className="flex gap-3 mb-4 flex-wrap">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: '#F0FDF4', color: '#163B2D' }}>
                            💪 {r.proteins} prot.
                          </div>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: '#F9FAFB', color: '#6B7280' }}>
                            ⏱ {r.time}
                          </div>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: '#F9FAFB', color: '#6B7280' }}>
                            🔥 {r.cal}
                          </div>
                          {r.family && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: '#EFF6FF', color: '#1D4ED8' }}>
                              👨‍👩‍👧 Famille
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider text-[#22C55E] mb-2">Ingrédients</p>
                            <ul className="space-y-1.5">
                              {r.ingredients.map((ing, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#22C55E' }} />
                                  <span className="text-xs text-[#374151]">{ing}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider text-[#22C55E] mb-2">Préparation</p>
                            <ol className="space-y-2">
                              {r.steps.map((step, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-0.5" style={{ background: '#111827' }}>
                                    {i + 1}
                                  </span>
                                  <span className="text-xs text-[#374151] leading-relaxed">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                        {r.tip && (
                          <div className="mt-3 flex items-start gap-2 p-2.5 rounded-xl" style={{ background: '#FEF9C3' }}>
                            <span className="text-sm shrink-0">💡</span>
                            <p className="text-xs text-[#92400E]">{r.tip}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
