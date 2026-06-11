export interface Recipe {
  id: number
  name: string
  cat: string
  time: string
  proteins: string
  diff: 'Facile' | 'Moyen'
  cal: string
  ingredients: string[]
  steps: string[]
  tip?: string
  family?: boolean
}

export const RECIPE_CATS = ['Toutes', 'Petit-déjeuner', 'Déjeuner rapide', 'Dîner famille', 'Batch cooking', 'Snacks']

export const RECIPES: Recipe[] = [
  // ─── PETIT-DÉJEUNER — 300-400 kcal · 18g+ prot ─────────────────────────────
  {
    id: 1, cat: 'Petit-déjeuner', name: 'Omelette 3 œufs express', time: '5 min', proteins: '19g', diff: 'Facile', cal: '210 kcal',
    ingredients: ['3 œufs entiers', 'Sel, poivre, herbes de Provence', '1cc huile d\'olive'],
    steps: ['Battre les œufs avec sel + poivre.', 'Poêle anti-adhésive feu moyen + huile.', 'Verser. Attendre que les bords prennent.', 'Plier en deux. Servir.'],
    tip: 'Ajouter légumes cuits de la veille (épinards, courgette) sans calories supplémentaires.',
  },
  {
    id: 2, cat: 'Petit-déjeuner', name: 'Bowl fromage blanc fruits & amandes', time: '3 min', proteins: '20g', diff: 'Facile', cal: '255 kcal',
    ingredients: ['200g fromage blanc 0%', '150g fruits rouges (surgelés OK)', '15g amandes effilées', '1cc miel'],
    steps: ['Fromage blanc dans le bol.', 'Fruits rouges + amandes + miel dessus.'],
    tip: 'Fruits rouges surgelés = moins cher, même valeur nutritionnelle. Toujours en avoir au congélo.',
  },
  {
    id: 3, cat: 'Petit-déjeuner', name: 'Porridge avoine cannelle', time: '5 min', proteins: '14g', diff: 'Facile', cal: '320 kcal',
    ingredients: ['60g flocons d\'avoine', '250ml lait demi-écrémé', '1/2 banane', 'Cannelle', 'Pincée de sel'],
    steps: ['Chauffer lait + flocons + sel 3 min à feu moyen en remuant.', 'Verser dans le bol.', 'Banane en rondelles + cannelle.'],
    tip: 'Overnight oats : flocons + lait au frigo la veille. Zéro cuisson le matin. Prêt en 30 secondes.',
  },
  {
    id: 4, cat: 'Petit-déjeuner', name: 'Tartines seigle saumon concombre', time: '4 min', proteins: '22g', diff: 'Facile', cal: '275 kcal',
    ingredients: ['2 tranches pain de seigle', '80g saumon fumé', '2cs fromage frais allégé', '1/4 concombre', 'Poivre, aneth'],
    steps: ['Tartiner le fromage frais.', 'Saumon fumé + concombre en rondelles.', 'Poivre + aneth.'],
    tip: 'Version enfants : jambon blanc à la place du saumon. Même principe, même efficacité.',
    family: true,
  },
  {
    id: 5, cat: 'Petit-déjeuner', name: 'Yaourt grec granola', time: '2 min', proteins: '18g', diff: 'Facile', cal: '290 kcal',
    ingredients: ['200g yaourt grec 0%', '30g granola (lire étiquette : max 10g sucre/100g)', '1 kiwi ou orange'],
    steps: ['Yaourt dans le bol.', 'Granola dessus.', 'Fruit à côté ou en morceaux.'],
    tip: 'Beaucoup de granolas sont des confiseries déguisées. Vérifier : max 10g sucre pour 100g.',
  },
  {
    id: 6, cat: 'Petit-déjeuner', name: 'Œufs brouillés aux épinards', time: '7 min', proteins: '22g', diff: 'Facile', cal: '220 kcal',
    ingredients: ['3 œufs', '80g épinards frais ou surgelés', 'Ail en poudre', '1cc beurre', 'Sel, poivre'],
    steps: ['Faire tomber les épinards avec ail 2 min.', 'Ajouter beurre, verser œufs battus.', 'Feu DOUX. Remuer sans arrêt à la spatule jusqu\'à consistance crémeuse.', 'Servir immédiatement.'],
    tip: 'Feu fort = caoutchouc. Feu doux + spatule non-stop = crémeux. Une seule règle.',
  },
  {
    id: 7, cat: 'Petit-déjeuner', name: 'Toast complet œuf poché avocat', time: '8 min', proteins: '16g', diff: 'Moyen', cal: '335 kcal',
    ingredients: ['1 tranche pain complet', '2 œufs', '60g avocat (1/2)', 'Jus de citron', 'Piment d\'Espelette', 'Vinaigre blanc'],
    steps: ['Eau frémissante + trait de vinaigre blanc.', 'Tourbillon dans l\'eau, casser l\'œuf au centre.', 'Pocher 3 min. Égoutter sur papier.', 'Écraser avocat + citron sur le pain toasté.', 'Poser l\'œuf, piment.'],
    tip: 'Un seul œuf poché suffit si l\'appétit est faible. Garder le 2e pour un snack.',
  },
  {
    id: 8, cat: 'Petit-déjeuner', name: 'Pancakes avoine-banane (famille ×8)', time: '12 min', proteins: '14g/2 pcs', diff: 'Facile', cal: '270 kcal/2 pcs',
    ingredients: ['1 banane mûre', '2 œufs', '50g flocons d\'avoine', 'Cannelle', '1cc miel'],
    steps: ['Écraser la banane. Mélanger avec œufs + flocons + cannelle.', 'Poêle anti-adhésive feu moyen — pas de matière grasse.', 'Petits cercles de pâte. 2-3 min par face.', 'Servir avec miel ou fruits.'],
    tip: 'Toute la famille mange ça. Préparer ×2 la pâte. Les enfants les adorent.',
    family: true,
  },
  {
    id: 9, cat: 'Petit-déjeuner', name: 'Cottage cheese tomates basilic', time: '3 min', proteins: '18g', diff: 'Facile', cal: '160 kcal',
    ingredients: ['150g cottage cheese', '1 poignée tomates cerises', 'Basilic frais ou séché', 'Sel, poivre', '1cc huile d\'olive (optionnel)'],
    steps: ['Cottage cheese dans le bol.', 'Tomates cerises coupées en deux.', 'Basilic + assaisonnement.'],
    tip: 'Petit-déjeuner salé = rassasie plus longtemps que le sucré. Essayer une semaine et observer.',
  },
  {
    id: 10, cat: 'Petit-déjeuner', name: 'Smoothie banane-beurre de cacahuète', time: '3 min', proteins: '18g', diff: 'Facile', cal: '315 kcal',
    ingredients: ['1 banane congelée', '250ml lait demi-écrémé', '1cs beurre de cacahuète naturel (sans sucre ajouté)', '1cs flocons d\'avoine'],
    steps: ['Tout dans le blender.', 'Mixer 30 secondes. Boire immédiatement.'],
    tip: 'Congeler des bananes mûres en avance. Vérifier beurre de cacahuète : ingrédient unique = cacahuètes.',
  },

  // ─── DÉJEUNER RAPIDE — 400-500 kcal · 30g+ prot ────────────────────────────
  {
    id: 11, cat: 'Déjeuner rapide', name: 'Bowl thon riz brocoli', time: '10 min', proteins: '36g', diff: 'Facile', cal: '405 kcal',
    ingredients: ['1 boîte thon au naturel (120g égoutté)', '150g riz brun cuit', '150g brocoli (surgelé OK)', '1cs sauce soja', '1cc huile de sésame', '1/2 citron'],
    steps: ['Chauffer brocoli surgelé 4 min vapeur ou micro-ondes.', 'Assembler riz + thon égoutté + brocoli.', 'Sauce soja + sésame + citron par-dessus.'],
    tip: 'Riz brun cuit en avance au frigo (batch cooking dimanche) = ce repas prend 3 min.',
  },
  {
    id: 12, cat: 'Déjeuner rapide', name: 'Wrap poulet-crudités houmous', time: '5 min', proteins: '38g', diff: 'Facile', cal: '385 kcal',
    ingredients: ['1 tortilla de blé complet', '150g poulet cuit émincé', '2cs houmous', 'Salade iceberg', '1/2 tomate', '1/4 concombre', 'Paprika fumé'],
    steps: ['Tartiner houmous sur la tortilla.', 'Poulet + crudités dessus.', 'Paprika + poivre. Rouler serré.'],
    tip: 'Utiliser restes de poulet du dîner. Zéro cuisson. Emporter au travail dans du film alimentaire.',
  },
  {
    id: 13, cat: 'Déjeuner rapide', name: 'Salade niçoise express', time: '8 min', proteins: '34g', diff: 'Facile', cal: '375 kcal',
    ingredients: ['2 œufs durs (batch)', '1 boîte thon au naturel', '150g haricots verts (surgelés OK)', '10 tomates cerises', '6 olives noires', '1cs huile d\'olive + 1cc moutarde + citron'],
    steps: ['Haricots verts vapeur 5 min.', 'Couper les œufs en deux.', 'Assembler tout. Vinaigrette maison.'],
    tip: 'Préparer la vinaigrette en flacon (huile + moutarde + citron + sel) : dure 1 semaine au frigo.',
  },
  {
    id: 14, cat: 'Déjeuner rapide', name: 'Steak haché patate douce', time: '20 min', proteins: '40g', diff: 'Facile', cal: '445 kcal',
    ingredients: ['200g steak haché 5%mg', '200g patate douce', 'Thym, ail en poudre, paprika', '1cc huile d\'olive'],
    steps: ['Patate douce en cubes : four 200°C 15 min ou micro-ondes 7 min.', 'Griller le steak 3-4 min par face.', 'Assaisonner les patates avec huile + épices.'],
    tip: 'Faire plusieurs steaks d\'un coup. Se conservent 3 jours au frigo. Réchauffer 2 min micro-ondes.',
  },
  {
    id: 15, cat: 'Déjeuner rapide', name: 'Omelette légumes du frigo', time: '8 min', proteins: '24g', diff: 'Facile', cal: '265 kcal',
    ingredients: ['3 œufs', 'Légumes de la veille (courgette, poivron, épinards…)', '20g fromage râpé allégé', 'Sel, poivre, herbes'],
    steps: ['Faire sauter les légumes 2 min s\'ils sont crus.', 'Œufs battus + assaisonnement.', 'Verser sur les légumes feu moyen.', 'Fromage. Plier quand bords pris.'],
    tip: 'Meilleure recette anti-gaspillage du programme. N\'importe quel légume du frigo fonctionne.',
  },
  {
    id: 16, cat: 'Déjeuner rapide', name: 'Salade pois chiches féta', time: '5 min', proteins: '20g', diff: 'Facile', cal: '365 kcal',
    ingredients: ['1 boîte pois chiches (240g égoutté)', '60g féta émiettée', '10 tomates cerises', '1/4 concombre', '6 olives', 'Origan, 1cs huile olive, citron'],
    steps: ['Rincer les pois chiches.', 'Mélanger tous les ingrédients.', 'Assaisonnement généreux.'],
    tip: 'Se prépare en 3 min, se conserve 2 jours. Parfait à emporter au bureau.',
  },
  {
    id: 17, cat: 'Déjeuner rapide', name: 'Bowl saumon fumé riz concombre', time: '5 min', proteins: '30g', diff: 'Facile', cal: '395 kcal',
    ingredients: ['100g saumon fumé', '150g riz cuit', '1/2 concombre en dés', '1/2 avocat', '1cs sauce soja', '1cc graines de sésame'],
    steps: ['Riz dans le bol.', 'Saumon + concombre + avocat dessus.', 'Sauce soja + sésame.'],
    tip: 'Préparer le matin dans une boîte hermétique. Emporter au travail. Manger froid.',
  },
  {
    id: 18, cat: 'Déjeuner rapide', name: 'Soupe lentilles corail curry', time: '18 min', proteins: '20g', diff: 'Facile', cal: '305 kcal',
    ingredients: ['200g lentilles corail', '1 carotte', '1 oignon', '1cs curry doux', '500ml bouillon de légumes', '50ml lait de coco allégé', 'Cumin'],
    steps: ['Faire revenir oignon + carotte 3 min.', 'Ajouter lentilles + épices + bouillon.', 'Cuire 15 min.', 'Mixer. Ajouter lait de coco.'],
    tip: 'Faire ×4 et congeler. Repas chaud en 3 min micro-ondes n\'importe quel jour de la semaine.',
  },
  {
    id: 19, cat: 'Déjeuner rapide', name: 'Pasta dinde sauce tomate', time: '15 min', proteins: '40g', diff: 'Facile', cal: '475 kcal',
    ingredients: ['120g penne complètes', '200g dinde hachée', '200ml coulis de tomates', '2 gousses d\'ail', 'Herbes italiennes', '10g parmesan'],
    steps: ['Cuire les pâtes al dente.', 'Faire revenir ail + dinde hachée 5 min.', 'Ajouter coulis + herbes, mijoter 5 min.', 'Mélanger avec les pâtes. Parmesan.'],
    tip: 'Dinde 5% vs bœuf 20% = même protéines, -40% calories. Goût identique dans une sauce.',
  },
  {
    id: 20, cat: 'Déjeuner rapide', name: 'Quesadilla poulet poivron', time: '8 min', proteins: '38g', diff: 'Facile', cal: '395 kcal',
    ingredients: ['2 tortillas de blé', '150g poulet cuit émincé', '50g fromage râpé allégé', '1/2 poivron grillé', '1cs yaourt grec (sauce)'],
    steps: ['Tortilla sur poêle chaude.', 'Poulet + poivron + fromage.', '2e tortilla dessus. 2 min par face feu moyen.', 'Couper en quartiers. Yaourt grec en sauce.'],
    tip: 'Préparer les poivrons grillés en batch. 1 bocal suffit pour la semaine.',
  },
  {
    id: 21, cat: 'Déjeuner rapide', name: 'Salade de pâtes complètes thon olives', time: '10 min', proteins: '32g', diff: 'Facile', cal: '420 kcal',
    ingredients: ['120g penne complètes cuites', '1 boîte thon au naturel', '10 tomates cerises', 'Olives noires', '1cs huile olive + 1cc moutarde + citron'],
    steps: ['Cuire les pâtes, rincer eau froide.', 'Mélanger thon égoutté + tomates + olives.', 'Vinaigrette, ajuster sel et poivre.'],
    tip: 'Servir froid → préparer à l\'avance, parfait pour le bureau ou le déjeuner rapide.',
  },
  {
    id: 22, cat: 'Déjeuner rapide', name: 'Tartines seigle sardines tomates', time: '3 min', proteins: '28g', diff: 'Facile', cal: '315 kcal',
    ingredients: ['2 tranches pain de seigle', '1 boîte sardines à l\'huile d\'olive (100g)', 'Tomates cerises', 'Citron', 'Persil, poivre'],
    steps: ['Égoutter légèrement (garder un peu d\'huile).', 'Écraser sur le pain de seigle.', 'Tomates + citron + persil.'],
    tip: 'Sardines = poisson gras pas cher, 28g de protéines, oméga-3. Sous-utilisées par les pères actifs.',
  },

  // ─── DÎNER FAMILLE — 400-520 kcal · 35g+ prot · pour 4 personnes ───────────
  {
    id: 23, cat: 'Dîner famille', name: 'Poulet rôti légumes four (×4)', time: '35 min', proteins: '42g/pers', diff: 'Facile', cal: '475 kcal/pers',
    ingredients: ['4 cuisses de poulet', '400g patates douces', '2 courgettes', '2 carottes', 'Ail, thym, romarin', '2cs huile d\'olive', 'Sel, poivre'],
    steps: ['Préchauffer four 200°C.', 'Légumes en morceaux + huile + herbes sur une plaque.', 'Cuisses assaisonnées dessus.', 'Four 30-35 min. Arroser à mi-cuisson.'],
    tip: 'Faire 2 cuisses en plus → restes pour wraps du lendemain. 5 min de travail, repas bonus.',
    family: true,
  },
  {
    id: 24, cat: 'Dîner famille', name: 'Saumon papillote brocoli vapeur (×4)', time: '20 min', proteins: '38g/pers', diff: 'Facile', cal: '415 kcal/pers',
    ingredients: ['4 pavés de saumon 130g chacun', '400g brocoli', '300g carottes', 'Citron, aneth', '4cc huile d\'olive', 'Sel, poivre'],
    steps: ['Four 200°C.', 'Chaque pavé sur papier sulfurisé + huile + citron + aneth. Fermer en papillote.', 'Four 15 min.', 'Légumes vapeur en parallèle 8 min.'],
    tip: 'En papillote = pas d\'odeur forte. Les enfants acceptent mieux le poisson présenté comme ça.',
    family: true,
  },
  {
    id: 25, cat: 'Dîner famille', name: 'Bœuf haché sauce légumes tomate (×4)', time: '20 min', proteins: '36g/pers', diff: 'Facile', cal: '425 kcal/pers',
    ingredients: ['600g bœuf haché 5%mg', '2 courgettes', '1 poivron', '1 oignon', '400ml coulis de tomates', 'Ail, thym, herbes de Provence'],
    steps: ['Faire revenir oignon + ail 2 min.', 'Ajouter bœuf, émietter, cuire 5 min.', 'Légumes en dés + coulis + herbes.', 'Mijoter 12 min.', 'Servir avec riz brun.'],
    tip: 'Les enfants voient la sauce tomate. Les légumes passent sans résistance.',
    family: true,
  },
  {
    id: 26, cat: 'Dîner famille', name: 'Poulet basquaise simplifié (×4)', time: '30 min', proteins: '44g/pers', diff: 'Facile', cal: '435 kcal/pers',
    ingredients: ['4 filets de poulet', '3 poivrons (rouge, vert, jaune)', '1 boîte tomates pelées 400g', '1 oignon', 'Ail, piment doux, thym', '1cs huile d\'olive'],
    steps: ['Faire dorer poulet 4 min par face. Réserver.', 'Faire revenir oignon + ail + poivrons 5 min.', 'Ajouter tomates + épices + poulet.', 'Couvrir, mijoter 20 min.'],
    tip: 'Meilleur réchauffé. Préparer le dimanche, manger lundi soir.',
    family: true,
  },
  {
    id: 27, cat: 'Dîner famille', name: 'Hachis parmentier allégé (×4)', time: '40 min', proteins: '34g/pers', diff: 'Moyen', cal: '450 kcal/pers',
    ingredients: ['500g bœuf haché 5%mg', '500g patates douces + 200g pommes de terre', '1 oignon', '200ml coulis de tomates', '50g emmental râpé', 'Muscade, sel, poivre'],
    steps: ['Cuire et écraser les légumes racines avec sel + muscade.', 'Faire revenir oignon + bœuf + coulis, 10 min.', 'Bœuf dans le plat, purée par-dessus.', 'Fromage râpé. Four 200°C 15 min.'],
    tip: '50% patate douce = moins de glucides rapides, plus de fibres, même gourmandise.',
    family: true,
  },
  {
    id: 28, cat: 'Dîner famille', name: 'Merlan citron haricots plats (×4)', time: '15 min', proteins: '36g/pers', diff: 'Facile', cal: '355 kcal/pers',
    ingredients: ['4 filets de merlan 130g chacun', '500g haricots plats surgelés', '2 citrons', 'Persil frais', '1cs huile d\'olive', 'Sel, poivre'],
    steps: ['Haricots plats vapeur 6 min.', 'Poêle chaude + huile. Merlan 3 min par face.', 'Citron pressé en fin de cuisson.', 'Persil + sel.'],
    tip: 'Merlan = poisson blanc maigre, pas cher, cuisson rapide. Idéal en semaine chargée.',
    family: true,
  },
  {
    id: 29, cat: 'Dîner famille', name: 'Poêlée dinde courgettes champignons (×4)', time: '20 min', proteins: '40g/pers', diff: 'Facile', cal: '375 kcal/pers',
    ingredients: ['600g escalopes de dinde en lanières', '300g champignons de Paris', '2 courgettes', '2 gousses d\'ail', '1cs crème fraîche légère 15%', 'Persil, sel, poivre'],
    steps: ['Dorer la dinde à feu vif 5 min. Réserver.', 'Sauter champignons + courgettes + ail 5 min.', 'Remettre la dinde. Crème fraîche. 3 min feu doux.'],
    tip: 'Dinde maigre + légumes à volume = plat rassasiant à 375 kcal. Très bon ratio.',
    family: true,
  },
  {
    id: 30, cat: 'Dîner famille', name: 'Gratin chou-fleur jambon (×4)', time: '35 min', proteins: '32g/pers', diff: 'Facile', cal: '385 kcal/pers',
    ingredients: ['1 chou-fleur entier', '200g jambon blanc en dés', '200ml béchamel allégée', '50g emmental râpé', 'Noix de muscade'],
    steps: ['Chou-fleur en bouquets, vapeur 8 min.', 'Mélanger avec jambon + béchamel.', 'Plat à gratin. Fromage dessus.', 'Four 200°C 20 min.'],
    tip: 'Les enfants adorent. Le chou-fleur disparaît sous le fromage fondu.',
    family: true,
  },
  {
    id: 31, cat: 'Dîner famille', name: 'Poulet citron thym pommes de terre (×4)', time: '40 min', proteins: '46g/pers', diff: 'Facile', cal: '485 kcal/pers',
    ingredients: ['4 filets de poulet', '500g petites pommes de terre', '2 citrons', '4 branches thym', '2cs huile d\'olive', 'Ail en chemise', 'Sel, poivre'],
    steps: ['Four 200°C.', 'Pommes de terre en deux + huile + ail sur plaque.', 'Poulet assaisonné + tranches de citron + thym.', 'Four 35 min.'],
    tip: '5 min de prep, 35 min sans surveillance. Plat complet sur une plaque.',
    family: true,
  },
  {
    id: 32, cat: 'Dîner famille', name: 'Cabillaud épinards crème (×4)', time: '15 min', proteins: '38g/pers', diff: 'Facile', cal: '345 kcal/pers',
    ingredients: ['4 filets cabillaud 130g chacun', '400g épinards surgelés', '100ml crème légère 5%', '2 gousses d\'ail', 'Muscade', 'Sel, poivre'],
    steps: ['Épinards + ail 5 min. Ajouter crème + muscade.', 'Cabillaud vapeur ou poêle 4-5 min par face.', 'Servir poisson sur lit d\'épinards crémés.'],
    tip: 'Cabillaud + épinards = un des meilleurs rapports protéines/calories du rayon poissons.',
    family: true,
  },
  {
    id: 33, cat: 'Dîner famille', name: 'Ratatouille poulet four (×4)', time: '35 min', proteins: '38g/pers', diff: 'Facile', cal: '395 kcal/pers',
    ingredients: ['4 filets de poulet', '1 aubergine', '2 courgettes', '2 poivrons', '400g tomates pelées', 'Ail, basilic, herbes de Provence', '1cs huile d\'olive'],
    steps: ['Faire dorer le poulet 4 min par face. Réserver.', 'Faire revenir légumes en dés 5 min.', 'Ajouter tomates + herbes. Mijoter 15 min.', 'Remettre le poulet 5 min.'],
    tip: 'Légumes du soleil = fibres + eau = satiété maximale pour peu de calories.',
    family: true,
  },
  {
    id: 34, cat: 'Dîner famille', name: 'Tacos maison bœuf (×4)', time: '20 min', proteins: '36g/pers', diff: 'Facile', cal: '455 kcal/pers',
    ingredients: ['500g bœuf haché 5%mg', '8 tortillas de blé', '1 poivron', '1 oignon', 'Cumin, paprika, ail', 'Salade, tomates', 'Yaourt grec (sauce)'],
    steps: ['Faire revenir oignon + poivron 3 min.', 'Ajouter bœuf + épices. Cuire 5 min.', 'Réchauffer les tortillas.', 'Chacun assemble son taco.'],
    tip: '"Chacun fait le sien" = les enfants adorent. Yaourt grec remplace la crème fraîche (-60% calories).',
    family: true,
  },

  // ─── BATCH COOKING — préparer dimanche, utiliser toute la semaine ───────────
  {
    id: 35, cat: 'Batch cooking', name: 'Riz brun batch (×5 portions)', time: '25 min', proteins: '4g/portion', diff: 'Facile', cal: '195 kcal/portion',
    ingredients: ['400g riz brun', '800ml eau', 'Sel', 'Bouillon cube (optionnel)'],
    steps: ['Rincer le riz.', 'Eau à ébullition + riz + sel.', 'Feu doux couvert 20 min.', 'Reposer 5 min. Égrainer.', 'Répartir en 5 boîtes hermétiques.'],
    tip: '5 jours de base glucidique prête en 25 min. Investissement le plus rentable du dimanche.',
  },
  {
    id: 36, cat: 'Batch cooking', name: 'Blancs de poulet four ×6', time: '25 min', proteins: '34g/portion', diff: 'Facile', cal: '180 kcal/portion',
    ingredients: ['6 filets de poulet', '2cs huile d\'olive', 'Ail en poudre, paprika fumé, thym', 'Sel, poivre'],
    steps: ['Four 200°C.', 'Enduire chaque filet d\'huile + épices.', 'Four 20 min sans retourner.', 'Refroidir complètement avant de filmer.', 'Frigo jusqu\'à 5 jours.'],
    tip: 'Couper en lanières avant de ranger = utilisable directement dans wrap, bowl ou omelette.',
  },
  {
    id: 37, cat: 'Batch cooking', name: 'Œufs durs batch ×8', time: '12 min', proteins: '6g/œuf', diff: 'Facile', cal: '70 kcal/œuf',
    ingredients: ['8 œufs'],
    steps: ['Œufs dans eau froide, couvrir.', 'Porter à ébullition. Cuire 10 min.', 'Eau froide immédiatement, 5 min.', 'Conserver non épluchés. Frigo 7 jours.'],
    tip: 'Snack toujours disponible. Aucune excuse pour manger n\'importe quoi en rentrant du travail.',
  },
  {
    id: 38, cat: 'Batch cooking', name: 'Lentilles mijotées (×5 portions)', time: '30 min', proteins: '16g/portion', diff: 'Facile', cal: '255 kcal/portion',
    ingredients: ['400g lentilles vertes', '2 carottes', '1 oignon', '2 gousses d\'ail', '1cs cumin', '1cs coriandre moulue', '700ml bouillon de légumes'],
    steps: ['Faire revenir oignon + ail + épices 2 min.', 'Ajouter carottes en dés + lentilles + bouillon.', 'Cuire 25 min feu moyen.', 'Assaisonner.', '5 portions au frigo 4 jours ou congélo.'],
    tip: 'Polyvalent : en soupe, en accompagnement, froid en salade. Base protéine végétale ultra-pratique.',
  },
  {
    id: 39, cat: 'Batch cooking', name: 'Sauce tomate maison (×6 portions)', time: '25 min', proteins: '3g/portion', diff: 'Facile', cal: '85 kcal/portion',
    ingredients: ['2 boîtes tomates pelées 800g chacune', '1 oignon', '4 gousses d\'ail', '2cs huile d\'olive', 'Basilic séché, origan', 'Sel, 1cc sucre'],
    steps: ['Faire revenir oignon + ail 3 min.', 'Ajouter tomates écrasées + herbes + sucre.', 'Mijoter 20 min. Mixer si souhaité.', '6 portions. Congélo en cubes.'],
    tip: 'Se congèle en bac à glaçons → sac congélation. Prêt en 2 min micro-ondes. Base pasta/pizza/lasagnes.',
  },
  {
    id: 40, cat: 'Batch cooking', name: 'Galettes dinde-avoine ×8', time: '20 min', proteins: '22g/2 galettes', diff: 'Facile', cal: '235 kcal/2 galettes',
    ingredients: ['300g dinde hachée', '80g flocons d\'avoine', '2 œufs', '1 oignon finement haché', 'Ail, persil, paprika', 'Sel, poivre'],
    steps: ['Mélanger tous les ingrédients.', 'Former 8 galettes épaisses.', 'Poêle anti-adhésive feu moyen, sans matière grasse.', '4 min par face.', 'Refroidir. Frigo 4 jours ou congélo.'],
    tip: 'Réchauffer four 8 min ou micro-ondes 2 min. Dans un wrap, avec légumes ou en snack.',
  },
  {
    id: 41, cat: 'Batch cooking', name: 'Soupe légumes verts (×6 bols)', time: '25 min', proteins: '6g/bol', diff: 'Facile', cal: '155 kcal/bol',
    ingredients: ['2 poireaux', '400g brocoli', '400g épinards', '2 pommes de terre', '1,5L bouillon de légumes', 'Sel, poivre, muscade'],
    steps: ['Faire suer les poireaux 3 min.', 'Ajouter tous les légumes + bouillon.', 'Cuire 15 min.', 'Mixer finement. Assaisonner.', '6 portions : frigo 5 jours ou congélateur.'],
    tip: 'Starter avant le dîner : 155 kcal de soupe = moins de plat principal mangé. Satiété par le volume.',
  },
  {
    id: 42, cat: 'Batch cooking', name: 'Patates douces rôties batch (×4)', time: '30 min', proteins: '3g/portion', diff: 'Facile', cal: '175 kcal/portion',
    ingredients: ['800g patates douces', '1cs huile d\'olive', 'Cumin, paprika fumé, sel'],
    steps: ['Four 200°C.', 'Cubes 2cm + huile + épices sur plaque.', 'Four 25 min, retourner à mi-cuisson.', 'Refroidir. Boîte au frigo 4 jours.'],
    tip: 'Alternative au riz. Index glycémique plus bas, plus de fibres que la pomme de terre classique.',
  },

  // ─── SNACKS — 100-200 kcal · 8g+ prot ──────────────────────────────────────
  {
    id: 43, cat: 'Snacks', name: 'Fromage blanc miel amandes', time: '2 min', proteins: '14g', diff: 'Facile', cal: '185 kcal',
    ingredients: ['150g fromage blanc 0%', '1cc miel', '10 amandes'],
    steps: ['Fromage blanc dans le bol.', 'Miel + amandes.'],
    tip: '14g de protéines pour 185 kcal. Un des meilleurs ratios protéines/calories des snacks.',
  },
  {
    id: 44, cat: 'Snacks', name: 'Œuf dur sauce soja sésame', time: '1 min', proteins: '12g', diff: 'Facile', cal: '160 kcal',
    ingredients: ['2 œufs durs (batch)', '1cc sauce soja', 'Graines de sésame', 'Piment (optionnel)'],
    steps: ['Couper les œufs en deux.', 'Quelques gouttes de sauce soja.', 'Sésame.'],
    tip: 'Batch = toujours prêts. Le snack le plus efficace du programme.',
  },
  {
    id: 45, cat: 'Snacks', name: 'Cottage cheese tomates cerises', time: '2 min', proteins: '16g', diff: 'Facile', cal: '145 kcal',
    ingredients: ['150g cottage cheese 0%', '1 poignée tomates cerises', 'Sel, poivre, basilic'],
    steps: ['Cottage cheese dans le bol.', 'Tomates cerises coupées en deux.', 'Basilic + assaisonnement.'],
    tip: 'Cottage cheese 0% = protéines élevées, calories basses. Sous-estimé. Essayer au moins une semaine.',
  },
  {
    id: 46, cat: 'Snacks', name: 'Pomme + beurre de cacahuète naturel', time: '1 min', proteins: '5g', diff: 'Facile', cal: '175 kcal',
    ingredients: ['1 pomme', '1cs beurre de cacahuète (100% cacahuètes, sans sucre ajouté)'],
    steps: ['Couper la pomme en tranches.', 'Tremper dans le beurre de cacahuète.'],
    tip: 'Vérifier l\'étiquette : ingrédient unique = cacahuètes. Pas "huile végétale, sucre, sel ajouté".',
  },
  {
    id: 47, cat: 'Snacks', name: 'Yaourt grec 0% nature', time: '0 min', proteins: '17g', diff: 'Facile', cal: '120 kcal',
    ingredients: ['200g yaourt grec 0%', 'Cannelle (optionnel)'],
    steps: ['Ouvrir. Manger. Répéter.'],
    tip: '17g de protéines pour 120 kcal. Meilleur ratio protéines/calories des snacks laitiers.',
  },
  {
    id: 48, cat: 'Snacks', name: 'Mix amandes noix (30g pesés)', time: '0 min', proteins: '6g', diff: 'Facile', cal: '180 kcal',
    ingredients: ['20g amandes brutes', '10g cerneaux de noix'],
    steps: ['Peser 30g précis.', 'Préparer 5 sachets le dimanche.', 'Emporter chaque matin.'],
    tip: 'Peser est essentiel. 30g ≠ une poignée. La densité calorique des oléagineux est très haute.',
  },
  {
    id: 49, cat: 'Snacks', name: 'Galettes de riz purée d\'amande', time: '1 min', proteins: '4g', diff: 'Facile', cal: '130 kcal',
    ingredients: ['2 galettes de riz (sans sel ajouté)', '1cs purée d\'amande complète'],
    steps: ['Tartiner les galettes.', 'Manger.'],
    tip: 'Purée d\'amande complète (avec peau) = plus de fibres que la purée blanche.',
  },
  {
    id: 50, cat: 'Snacks', name: '2 carrés chocolat noir 85%+ & thé', time: '2 min', proteins: '2g', diff: 'Facile', cal: '105 kcal',
    ingredients: ['2 carrés chocolat noir 85%+', '1 tasse thé ou café sans sucre'],
    steps: ['Faire le thé.', 'Manger les 2 carrés lentement en buvant.'],
    tip: 'Croquer lentement + attendre 10 min. L\'envie de sucre passe souvent toute seule.',
  },
]
