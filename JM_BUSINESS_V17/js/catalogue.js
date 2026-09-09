// ============================================================
// JM BUSINESS — CATALOGUE V5
// ============================================================
// Modifie ce fichier pour ajouter, modifier, masquer ou supprimer
// des SERVICES et des PRODUITS.
// Les prix sont en Franc CFA (FCFA).
// Pour une prestation à prix variable, utilise priceText.
// ============================================================

const SERVICES = [
  {
    icon: "▣",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=500&q=80",
    name: "Impression Noir & Blanc",
    price: 50,
    unit: "/ page",
    desc: "Documents nets et lisibles pour vos dossiers du quotidien.",
    active: true
  },
  {
    icon: "✣",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=500&q=80",
    name: "Impression Couleur",
    price: 100,
    unit: "/ page",
    desc: "Donnez de l’impact à vos supports et présentations.",
    active: true
  },
  {
    icon: "▢",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80",
    name: "Photocopie Noir & Blanc",
    price: 25,
    unit: "/ page",
    desc: "Reproductions rapides, avec tarif préférentiel dès 10 copies.",
    active: true
  },
  {
    icon: "▤",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=500&q=80",
    name: "Photocopie Couleur",
    price: 50,
    unit: "/ page",
    desc: "Copies couleur soignées pour vos supports importants.",
    active: true
  },
  {
    icon: "⌗",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=500&q=80",
    name: "Scan",
    price: 200,
    unit: "/ page",
    desc: "Numérisez vos documents simplement et rapidement.",
    active: true
  },
  {
    id: 6,
    icon: "▣",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=500&q=80",
    name: "Reliure",
    price: 500,
    unit: "à partir de",
    desc: "Reliez vos documents proprement pour une présentation professionnelle.",
    active: true
  },
  {
    id: 7,
    icon: "▤",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=500&q=80",
    name: "Plastification",
    price: 500,
    unit: "à partir de",
    desc: "Protégez vos documents contre l’usure et l’humidité.",
    active: true
  },
  {
    icon: "✎",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=500&q=80",
    name: "Conception d’Affiche & Logo",
    priceText: "Sur devis",
    unit: "",
    desc: "Création graphique professionnelle adaptée à votre identité et à votre communication.",
    active: true
  },
  {
    icon: "▤",
    image: "https://images.pexels.com/photos/8489961/pexels-photo-8489961.jpeg?auto=compress&cs=tinysrgb&w=900",
    name: "Conception & Impression Carte de visite",
    price: 10000,
    unit: "/ 100 cartes",
    desc: "Conception et impression de 100 cartes de visite professionnelles.",
    active: true
  },
  {
    icon: "▦",
    image: "https://images.pexels.com/photos/8490069/pexels-photo-8490069.jpeg?auto=compress&cs=tinysrgb&w=900",
    priceText: "5 000 – 7 500",
    unit: " / 10 pièces",
    name: "Conception & Impression Badge",
    desc: "Badges personnalisés, avec tarif selon les dimensions choisies.",
    active: true
  },
  {
    icon: "★",
    image: "https://images.pexels.com/photos/19875323/pexels-photo-19875323.jpeg?auto=compress&cs=tinysrgb&w=900",
    name: "Impression sur Textile & Objets",
    priceText: "Sur devis",
    unit: "",
    desc: "Personnalisation de polos, T-shirts, combinaisons, gilets, tasses, assiettes, pierres tombales et casquettes.",
    active: true
  },
  {
    icon: "◉",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    name: "Photo Portrait",
    priceText: "6 500 A4 • 13 000 A3",
    unit: "autres formats sur devis",
    desc: "Conception et impression de portraits photo, du A4 au grand format A0.",
    active: true
  },
  {
    icon: "▱",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=500&q=80",
    name: "Bâche, Banderole & Supports grand format",
    priceText: "Sur devis",
    unit: "",
    desc: "Conception et impression de bâches, banderoles, microperforés, kakemonos et Roll Up.",
    active: true
  },
  {
    icon: "◫",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=500&q=80",
    name: "Cachet numérique",
    price: 7500,
    unit: "à partir de",
    desc: "Conception de cachets numériques professionnels, personnalisés selon votre identité visuelle et prêts à l’emploi.",
    active: true
  },
  {
    icon: "◎",
    image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=500&q=80",
    name: "Photo d’identité",
    price: 1000,
    unit: "/ 8 photos",
    desc: "Photos d’identité prêtes à l’emploi, avec cadrage et impression soignés.",
    active: true
  }
];

const PRODUCTS = [
  {
    id: 1,
    name: "Papier Rame A4",
    category: "Papeterie",
    price: 3500,
    desc: "Papier A4 pour impressions, photocopies et travaux de bureau.",
    image: "assets/produits_reels/hp-papier-a4-blanc-premium-80g-ramette-500-feuilles_49404-00J.jpg",
    details: "Rame de papier A4 adaptée aux impressions, photocopies et documents administratifs.",
    unitLabel: "500 feuilles",
    usage: "Idéal pour bureaux, écoles, administrations et impressions quotidiennes.",
    active: true
  },
  {
    id: 2,
    name: "Chemise cartonnée",
    category: "Fournitures de bureau",
    price: 200,
    desc: "Chemise cartonnée pratique pour classer et protéger vos documents.",
    image: "assets/produits_reels/chemise-cartonnee-a4.jfif",
    details: "Chemise cartonnée pour classer, transporter et protéger vos documents.",
    unitLabel: "1 pièce",
    usage: "Pratique pour dossiers, archives et présentations.",
    active: true
  },
  {
    id: 3,
    name: "Sous-chemise",
    category: "Fournitures de bureau",
    price: 100,
    desc: "Sous-chemise simple pour organiser vos dossiers et documents.",
    image: "assets/produits_reels/Sous-chemise.jpg",
    details: "Sous-chemise légère pour organiser vos documents à l’intérieur d’un dossier.",
    unitLabel: "1 pièce",
    usage: "Solution simple pour trier et séparer les documents.",
    active: true
  },
  {
    id: 4,
    name: "Papier ministre",
    category: "Papeterie",
    price: 50,
    desc: "Feuille de papier ministre pour vos courriers et documents administratifs.",
    image: "assets/produits_reels/Papier-ministre-60-g-400-feuilles.jpg",
    details: "Papier de format ministre destiné aux courriers, dossiers et documents administratifs.",
    unitLabel: "1 feuille",
    usage: "Convient aux besoins administratifs et professionnels.",
    active: true
  },
  {
    id: 5,
    name: "Enveloppe A4",
    category: "Papeterie",
    price: 250,
    desc: "Enveloppe grand format adaptée aux documents A4 et courriers professionnels.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
    details: "Enveloppe grand format pour protéger et remettre vos documents sans les plier.",
    unitLabel: "1 pièce",
    usage: "Adaptée aux documents A4, dossiers et correspondances.",
    active: true
  },
  {
    id: 6,
    name: "Pack stylos Schneider",
    category: "Fournitures de bureau",
    price: 1500,
    desc: "Un assortiment de stylos fiables pour le bureau et la maison.",
    image: "assets/produits_reels/PACK STYLOS SCHNEIDER.webp",
    details: "Assortiment de stylos pratiques pour l’écriture quotidienne au bureau ou à la maison.",
    unitLabel: "1 pack",
    usage: "Un choix pratique pour les fournitures courantes.",
    active: true
  },
  {
    id: 7,
    name: "Clé USB 32 Go",
    category: "Informatique",
    price: 6500,
    desc: "Transportez vos documents essentiels avec un format compact.",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
    details: "Clé USB compacte pour stocker et transférer vos documents, photos et fichiers.",
    unitLabel: "32 Go",
    usage: "Compatible avec les usages courants sur ordinateur et autres appareils USB.",
    active: true
  },
  {
    id: 8,
    name: "Calculatrice de bureau",
    category: "Informatique",
    price: 4500,
    desc: "Une calculatrice pratique pour les opérations du quotidien.",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80",
    details: "Calculatrice de bureau simple et pratique pour les opérations quotidiennes.",
    unitLabel: "1 pièce",
    usage: "Utile au bureau, en commerce, à l’école et pour les calculs courants.",
    active: true
  }
];
