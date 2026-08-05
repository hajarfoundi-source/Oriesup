import type { AuthoredTest, TrackContent } from './types';

const courses: TrackContent['courses'] = [
  {
    title: 'Le TCF : format et déroulement de l\'épreuve',
    order: 0,
    sections: [
      {
        heading: 'Qu\'est-ce que le TCF ?',
        content:
          "Le TCF (Test de Connaissance du Français), délivré par France Éducation international, évalue ton niveau de français sur l'échelle du CECR (Cadre européen commun de référence pour les langues), du niveau A1 (débutant) au niveau C2 (maîtrise). Il est reconnu pour les démarches d'études, d'immigration (Canada, Québec) et de naturalisation. Contrairement à un examen classique noté sur 20, le TCF ne se \"réussit\" ni ne se \"rate\" : il place ton niveau réel sur une échelle continue de 100 à 699 points.",
      },
      {
        heading: 'Les trois épreuves obligatoires',
        content:
          "Le TCF \"Tout Public\" comporte trois épreuves obligatoires, toutes sous forme de questionnaires à choix multiples (QCM) passés sur ordinateur : la Compréhension Orale (tu écoutes des documents audio et réponds à des questions), la Maîtrise des Structures de la Langue (grammaire, conjugaison et vocabulaire), et la Compréhension Écrite (tu lis des textes variés et réponds à des questions). Deux épreuves facultatives existent aussi : l'Expression Écrite et l'Expression Orale, notées séparément par un examinateur — nos tests d'entraînement se concentrent sur les trois épreuves obligatoires, qui forment le cœur du test et sont entièrement automatisables.",
      },
      {
        heading: 'Le barème : de 100 à 699 points',
        content:
          "Chaque épreuve est notée indépendamment sur une échelle de 100 à 699, qui correspond directement à un niveau du CECR : 100-199 = A1, 200-299 = A2, 300-399 = B1, 400-499 = B2, 500-599 = C1, 600-699 = C2. Plus les questions auxquelles tu réponds correctement sont difficiles, plus ton score est élevé — ce n'est pas un simple pourcentage de bonnes réponses. Pour la plupart des démarches d'études supérieures en France ou au Canada, un niveau B2 (400+) est généralement demandé ; pour la naturalisation française, le niveau B2 est exigé depuis le 1er janvier 2026.",
      },
      {
        heading: 'Comment progresser efficacement',
        content:
          "Le TCF récompense la rapidité autant que la précision : tu dois lire vite, écouter une seule fois, et ne pas t'attarder sur une question difficile. Pendant tes entraînements, chronomètre-toi systématiquement dans les conditions réelles de l'épreuve. Pour la compréhension orale, entraîne-toi à capter l'information dès la première écoute — pas de deuxième chance le jour J. Pour la compréhension écrite, apprends à repérer rapidement le type de texte (annonce, article, lettre) avant de lire en détail : cela oriente ta lecture. Pour les structures de la langue, révise en priorité les points récurrents : accords, temps du passé, pronoms relatifs, prépositions et expressions figées.",
      },
    ],
  },
  {
    title: 'Stratégies pour la Compréhension Orale',
    order: 1,
    sections: [
      {
        heading: 'Le format de l\'épreuve',
        content:
          "L'épreuve de compréhension orale comporte des documents sonores de complexité croissante : d'abord de très courts dialogues ou annonces suivis d'une seule question, puis des documents plus longs (bulletins d'information, interviews, extraits d'émissions) avec plusieurs questions. Chaque document n'est diffusé qu'une seule fois. Tu dois donc lire la question et les options de réponse avant l'écoute quand c'est possible, pour savoir précisément ce que tu dois repérer.",
      },
      {
        heading: 'Anticiper avant d\'écouter',
        content:
          "Avant chaque écoute, prends deux secondes pour repérer le type de document annoncé (une annonce à la radio ? une conversation entre deux amis ? un bulletin météo ?). Cela active tes attentes sur le vocabulaire probable. Repère aussi les mots-clés de la question : cherche-t-on un lieu, une heure, une raison, une opinion ? Cette anticipation te permet de ne pas te noyer dans les détails inutiles pendant l'écoute.",
      },
      {
        heading: 'Ne pas se bloquer sur un mot inconnu',
        content:
          "Un piège fréquent : buter sur un mot que tu ne comprends pas et perdre le fil du reste du document. Entraîne-toi à laisser filer les mots inconnus et à te concentrer sur le sens général — dans la grande majorité des questions, la bonne réponse se déduit du contexte global, pas d'un mot isolé. Repère aussi les indices non verbaux du sens : le ton (ironique, inquiet, enthousiaste), les hésitations, les reformulations (\"enfin je veux dire...\") qui signalent souvent l'information importante.",
      },
    ],
  },
  {
    title: 'Stratégies pour la Compréhension Écrite',
    order: 2,
    sections: [
      {
        heading: 'Le format de l\'épreuve',
        content:
          "Comme pour l'oral, les textes progressent en difficulté : de courts documents fonctionnels (panneaux, petites annonces, SMS, extraits de courriels) au début, puis des textes plus longs et plus argumentatifs (articles de presse, extraits littéraires) vers la fin. La compréhension écrite est l'épreuve la plus longue du TCF — la gestion du temps y est décisive.",
      },
      {
        heading: 'Lire efficacement sous pression',
        content:
          "Ne lis jamais un texte long mot à mot dès la première fois. Repère d'abord le titre, la source et la structure générale (introduction, exemples, conclusion) pour te faire une idée du sujet. Lis ensuite la question avant de relire le passage concerné : cela te permet une lecture ciblée plutôt qu'une lecture exhaustive, beaucoup plus rapide. Pour les textes courts (annonces, messages), le sens global se déduit souvent d'un seul indice clé (une date, un lieu, un verbe d'action) — entraîne-toi à le repérer immédiatement.",
      },
      {
        heading: 'Les pièges classiques des QCM',
        content:
          "Méfie-toi des réponses qui reprennent des mots exacts du texte mais qui déforment le sens (une simple négation ajoutée, un chiffre légèrement modifié, une confusion entre cause et conséquence). La bonne réponse est presque toujours une reformulation du texte, pas une copie littérale. Élimine d'abord les options manifestement fausses ou hors sujet, puis compare les deux réponses restantes en te demandant laquelle est appuyée par le texte et laquelle relève d'une déduction abusive.",
      },
    ],
  },
  {
    title: 'Maîtrise des Structures de la Langue : grammaire essentielle',
    order: 3,
    sections: [
      {
        heading: 'Le format de l\'épreuve',
        content:
          "Cette épreuve teste ta connaissance de la grammaire, de la conjugaison et du vocabulaire à travers des phrases à trous ou des choix de complétion. C'est l'épreuve la plus courte mais elle demande une préparation grammaticale ciblée : contrairement à l'oral et à l'écrit, il n'y a pas de contexte étendu pour deviner la réponse — il faut connaître la règle.",
      },
      {
        heading: 'Les temps du passé',
        content:
          "Sais-tu distinguer clairement l'usage du passé composé (action ponctuelle et achevée : \"Hier, j'ai visité le musée\"), de l'imparfait (description, habitude, action en cours : \"Quand j'étais petit, je visitais souvent ce musée\") et du plus-que-parfait (action antérieure à une autre action passée : \"J'avais déjà visité le musée quand elle est arrivée\") ? Ces nuances sont fréquemment testées et méritent une révision systématique avant l'épreuve.",
      },
      {
        heading: 'Pronoms, prépositions et accords',
        content:
          "Révise les pronoms relatifs (qui, que, dont, où, lequel), les prépositions figées associées aux verbes courants (\"s'intéresser À\", \"penser À\" mais \"penser DE\" pour une opinion, \"répondre À\"), ainsi que l'accord du participe passé avec l'auxiliaire \"avoir\" quand le complément d'objet direct est placé avant le verbe. Ce sont les points de grammaire les plus rentables à réviser car ils reviennent très régulièrement dans ce type d'épreuve.",
      },
    ],
  },
];

const test1: AuthoredTest = {
  title: 'Test blanc TCF n°1',
  order: 0,
  sections: [
    {
      key: 'co',
      title: 'Compréhension Orale',
      type: 'listening',
      graded: true,
      durationSeconds: 15 * 60,
      audioNote: true,
      instructions:
        "Écoute chaque document (une seule lecture) puis réponds à la question. Le texte que tu entendras est affiché après l'écoute pour te permettre de vérifier ta compréhension a posteriori — pendant le test, essaie de répondre sans le relire.",
      questions: [
        {
          id: 'tcf1-co-1', type: 'mcq',
          passage: "Bonjour, ici la gare de Lyon. Le train à destination de Marseille, prévu à 14h20, partira finalement du quai 12 au lieu du quai 8.",
          prompt: 'Qu\'est-ce qui a changé pour ce train ?', options: ['L\'heure de départ', 'Le quai de départ', 'La destination', 'Le prix du billet'], correctIndex: 1,
        },
        {
          id: 'tcf1-co-2', type: 'mcq',
          passage: "— Tu viens au cinéma ce soir ? — Ah non, désolé, je suis crevé, je préfère rester à la maison et me coucher tôt.",
          prompt: 'Pourquoi la personne refuse-t-elle ?', options: ['Elle n\'aime pas le film', 'Elle est fatiguée', 'Elle n\'a pas d\'argent', 'Elle a déjà vu le film'], correctIndex: 1,
        },
        {
          id: 'tcf1-co-3', type: 'mcq',
          passage: "Attention, le magasin fermera exceptionnellement à 18 heures aujourd'hui pour cause d'inventaire. Merci de finaliser vos achats avant cette heure.",
          prompt: 'Que doivent faire les clients ?', options: ['Revenir demain', 'Terminer leurs achats avant 18h', 'Aller à un autre magasin', 'Attendre la fin de l\'inventaire'], correctIndex: 1,
        },
        {
          id: 'tcf1-co-4', type: 'mcq',
          passage: "Je voulais te dire... enfin, je ne sais pas comment le prendre, mais j'ai été prise pour le poste à Lyon. Je pars dans un mois.",
          prompt: 'Quel est le ton de la personne qui parle ?', options: ['Très en colère', 'Hésitante, partagée', 'Complètement indifférente', 'Franchement déçue'], correctIndex: 1,
        },
        {
          id: 'tcf1-co-5', type: 'mcq',
          passage: "Pour venir chez moi, prends la première à droite après la boulangerie, puis c'est le deuxième immeuble à gauche, juste en face de la pharmacie.",
          prompt: 'Que se trouve juste en face de l\'immeuble ?', options: ['Une boulangerie', 'Une pharmacie', 'Une école', 'Un parc'], correctIndex: 1,
        },
        {
          id: 'tcf1-co-6', type: 'mcq',
          passage: "Mesdames et messieurs, en raison d'un incident technique, notre vol présente actuellement un retard estimé à quarante-cinq minutes. Nous vous prions de nous excuser pour la gêne occasionnée.",
          prompt: 'Que doivent faire les passagers, d\'après ce message ?', options: ['Changer de vol', 'Patienter, le vol est retardé', 'Récupérer leurs bagages', 'Se présenter à un autre comptoir'], correctIndex: 1,
        },
        {
          id: 'tcf1-co-7', type: 'mcq',
          passage: "— Ce restaurant est vraiment excellent, mais un peu cher pour ce que c'est, tu ne trouves pas ? — Un peu, oui, mais le cadre justifie le prix je trouve.",
          prompt: 'Sur quoi les deux personnes sont-elles d\'accord ?', options: ['Le restaurant est bon marché', 'Le restaurant est un peu cher', 'Le service est mauvais', 'Il faut réserver à l\'avance'], correctIndex: 1,
        },
        {
          id: 'tcf1-co-8', type: 'mcq',
          passage: "N'oublie pas d'apporter ton passeport ET ta carte d'étudiant pour l'inscription, sinon le dossier ne pourra pas être validé aujourd'hui.",
          prompt: 'Que risque-t-il de se passer sans ces deux documents ?', options: ['Rien, ce n\'est pas grave', 'L\'inscription ne sera pas validée', 'Il faudra payer une amende', 'Le rendez-vous sera annulé'], correctIndex: 1,
        },
        {
          id: 'tcf1-co-9', type: 'mcq',
          passage:
            "Bulletin météo : aujourd'hui, un temps globalement ensoleillé sur l'ensemble du pays, avec toutefois des nuages en fin d'après-midi sur les régions côtières. Les températures resteront douces pour la saison, autour de 22 degrés. Demain, en revanche, un net rafraîchissement est attendu, accompagné de pluies éparses dès le matin.",
          prompt: 'Quel temps est annoncé pour demain ?', options: ['Ensoleillé et chaud', 'Nuageux uniquement sur la côte', 'Plus frais et pluvieux', 'Identique à aujourd\'hui'], correctIndex: 2,
        },
        {
          id: 'tcf1-co-10', type: 'mcq',
          passage:
            "Bulletin météo : aujourd'hui, un temps globalement ensoleillé sur l'ensemble du pays, avec toutefois des nuages en fin d'après-midi sur les régions côtières. Les températures resteront douces pour la saison, autour de 22 degrés. Demain, en revanche, un net rafraîchissement est attendu, accompagné de pluies éparses dès le matin.",
          prompt: 'Où les nuages sont-ils attendus aujourd\'hui ?', options: ['Partout dans le pays', 'Uniquement sur les régions côtières', 'Uniquement en montagne', 'Nulle part, le ciel reste dégagé'], correctIndex: 1,
        },
        {
          id: 'tcf1-co-11', type: 'mcq',
          passage:
            "Et pour clore cette interview, Sarah, un dernier conseil pour les jeunes qui veulent se lancer dans l'entrepreneuriat ? — Je dirais : ne cherchez pas à tout maîtriser avant de commencer. On apprend énormément en avançant, et attendre d'être \"prêt\" est souvent la meilleure excuse pour ne jamais se lancer. Mes deux premières années ont été pleines d'erreurs, mais chacune m'a appris quelque chose d'essentiel.",
          prompt: 'Quel est le conseil principal de Sarah ?', options: ['Bien se former avant de commencer', 'Se lancer sans attendre d\'être parfaitement prêt', 'Éviter à tout prix de faire des erreurs', 'Travailler seul plutôt qu\'en équipe'], correctIndex: 1,
        },
        {
          id: 'tcf1-co-12', type: 'mcq',
          passage:
            "Et pour clore cette interview, Sarah, un dernier conseil pour les jeunes qui veulent se lancer dans l'entrepreneuriat ? — Je dirais : ne cherchez pas à tout maîtriser avant de commencer. On apprend énormément en avançant, et attendre d'être \"prêt\" est souvent la meilleure excuse pour ne jamais se lancer. Mes deux premières années ont été pleines d'erreurs, mais chacune m'a appris quelque chose d'essentiel.",
          prompt: 'Comment Sarah décrit-elle ses deux premières années ?', options: ['Très faciles', 'Sans aucune difficulté', 'Riches en erreurs formatrices', 'Une perte de temps totale'], correctIndex: 2,
        },
        {
          id: 'tcf1-co-13', type: 'mcq',
          passage:
            "Aujourd'hui dans notre émission consacrée aux transports urbains, on parle du succès inattendu des vélos en libre-service dans les grandes villes marocaines. En seulement deux ans, le nombre d'abonnés a triplé, porté surtout par les étudiants et les jeunes actifs qui cherchent à éviter les embouteillages. Les autorités locales envisagent désormais de doubler le nombre de stations d'ici la fin de l'année prochaine.",
          prompt: 'Qui utilise principalement les vélos en libre-service, d\'après ce document ?', options: ['Les touristes étrangers', 'Les retraités', 'Les étudiants et jeunes actifs', 'Les familles avec enfants'], correctIndex: 2,
        },
        {
          id: 'tcf1-co-14', type: 'mcq',
          passage:
            "Aujourd'hui dans notre émission consacrée aux transports urbains, on parle du succès inattendu des vélos en libre-service dans les grandes villes marocaines. En seulement deux ans, le nombre d'abonnés a triplé, porté surtout par les étudiants et les jeunes actifs qui cherchent à éviter les embouteillages. Les autorités locales envisagent désormais de doubler le nombre de stations d'ici la fin de l'année prochaine.",
          prompt: 'Que prévoient de faire les autorités locales ?', options: ['Supprimer le service', 'Augmenter le prix des abonnements', 'Doubler le nombre de stations', 'Réduire le nombre de vélos'], correctIndex: 2,
        },
        {
          id: 'tcf1-co-15', type: 'mcq',
          passage:
            "Aujourd'hui dans notre émission consacrée aux transports urbains, on parle du succès inattendu des vélos en libre-service dans les grandes villes marocaines. En seulement deux ans, le nombre d'abonnés a triplé, porté surtout par les étudiants et les jeunes actifs qui cherchent à éviter les embouteillages. Les autorités locales envisagent désormais de doubler le nombre de stations d'ici la fin de l'année prochaine.",
          prompt: 'Comment le succès de ce service est-il qualifié au début du document ?', options: ['Prévisible', 'Inattendu', 'Décevant', 'Modeste'], correctIndex: 1,
        },
        {
          id: 'tcf1-co-16', type: 'mcq',
          passage:
            "Aujourd'hui dans notre émission consacrée aux transports urbains, on parle du succès inattendu des vélos en libre-service dans les grandes villes marocaines. En seulement deux ans, le nombre d'abonnés a triplé, porté surtout par les étudiants et les jeunes actifs qui cherchent à éviter les embouteillages. Les autorités locales envisagent désormais de doubler le nombre de stations d'ici la fin de l'année prochaine.",
          prompt: 'En combien de temps le nombre d\'abonnés a-t-il triplé ?', options: ['Un an', 'Deux ans', 'Cinq ans', 'Ce n\'est pas précisé'], correctIndex: 1,
        },
      ],
    },
    {
      key: 'ce',
      title: 'Compréhension Écrite',
      type: 'reading',
      graded: true,
      durationSeconds: 22 * 60,
      instructions: 'Lis chaque texte puis réponds à la question associée.',
      questions: [
        {
          id: 'tcf1-ce-1', type: 'mcq', passage: "AVIS : L'ascenseur est en panne jusqu'à nouvel ordre. Merci d'emprunter les escaliers.",
          prompt: 'Que doivent faire les habitants de l\'immeuble ?', options: ['Prendre l\'ascenseur avec précaution', 'Utiliser les escaliers', 'Attendre dans le hall', 'Appeler le gardien'], correctIndex: 1,
        },
        {
          id: 'tcf1-ce-2', type: 'mcq', passage: "Salut ! Je serai en retard ce soir, la réunion traîne. Commence à dîner sans moi, ne m'attends pas :)",
          prompt: 'Que demande la personne qui écrit ?', options: ['De l\'attendre pour dîner', 'De ne pas l\'attendre pour dîner', 'D\'annuler le dîner', 'De la rejoindre à la réunion'], correctIndex: 1,
        },
        {
          id: 'tcf1-ce-3', type: 'mcq', passage: "À VENDRE : vélo d'occasion, bon état général, quelques rayures. Prix à débattre. Contacter au 06 XX XX XX XX après 18h.",
          prompt: 'Que peut-on dire du prix indiqué ?', options: ['Il est fixe, non négociable', 'Il peut être discuté', 'Il n\'est pas indiqué', 'Il est très élevé'], correctIndex: 1,
        },
        {
          id: 'tcf1-ce-4', type: 'mcq', passage: "Chère Madame, suite à notre entretien téléphonique, veuillez trouver ci-joint le devis demandé. Restant à votre disposition, cordialement.",
          prompt: 'Quel type de document accompagne ce message ?', options: ['Une facture déjà payée', 'Un devis', 'Un contrat signé', 'Une lettre de réclamation'], correctIndex: 1,
        },
        {
          id: 'tcf1-ce-5', type: 'mcq', passage: "RAPPEL : votre abonnement à la salle de sport expire dans 5 jours. Renouvelez-le en ligne pour continuer à bénéficier de vos avantages.",
          prompt: 'Pourquoi ce message a-t-il été envoyé ?', options: ['Pour annoncer une promotion', 'Pour rappeler une expiration prochaine', 'Pour confirmer une résiliation', 'Pour inviter à un événement'], correctIndex: 1,
        },
        {
          id: 'tcf1-ce-6', type: 'mcq', passage: "Recette rapide : faites revenir les oignons 5 minutes, ajoutez les tomates, puis laissez mijoter à feu doux pendant 20 minutes.",
          prompt: 'Que faut-il faire après avoir ajouté les tomates ?', options: ['Éteindre le feu immédiatement', 'Laisser mijoter à feu doux', 'Ajouter les oignons', 'Servir directement'], correctIndex: 1,
        },
        {
          id: 'tcf1-ce-7', type: 'mcq', passage: "Le musée sera fermé le 1er mai, comme chaque année. Réouverture normale dès le lendemain, aux horaires habituels.",
          prompt: 'Quand le musée rouvrira-t-il ?', options: ['Le 1er mai', 'Le 2 mai', 'Il reste fermé toute la semaine', 'La date n\'est pas précisée'], correctIndex: 1,
        },
        {
          id: 'tcf1-ce-8', type: 'mcq', passage: "Merci de ne pas stationner devant ce portail, même pour quelques minutes : il s'agit d'un accès pompiers.",
          prompt: 'Pourquoi ne faut-il pas stationner ici ?', options: ['C\'est une place réservée aux handicapés', 'C\'est un accès pour les pompiers', 'C\'est une zone piétonne', 'C\'est un parking payant'], correctIndex: 1,
        },
        {
          id: 'tcf1-ce-9', type: 'mcq',
          passage:
            "Le télétravail, longtemps perçu comme un simple avantage ponctuel, s'est imposé durablement dans de nombreuses entreprises marocaines. Si les employés apprécient majoritairement la flexibilité qu'il offre, certains managers s'inquiètent d'une possible baisse de la cohésion d'équipe. Plusieurs sociétés ont donc adopté un modèle hybride, alternant jours de présence au bureau et jours à domicile, afin de concilier les deux impératifs.",
          prompt: 'Quel modèle plusieurs entreprises ont-elles adopté ?', options: ['Le télétravail à 100%', 'Le retour complet au bureau', 'Un modèle hybride', 'Aucun changement par rapport à avant'], correctIndex: 2,
        },
        {
          id: 'tcf1-ce-10', type: 'mcq',
          passage:
            "Le télétravail, longtemps perçu comme un simple avantage ponctuel, s'est imposé durablement dans de nombreuses entreprises marocaines. Si les employés apprécient majoritairement la flexibilité qu'il offre, certains managers s'inquiètent d'une possible baisse de la cohésion d'équipe. Plusieurs sociétés ont donc adopté un modèle hybride, alternant jours de présence au bureau et jours à domicile, afin de concilier les deux impératifs.",
          prompt: 'Quelle est l\'inquiétude de certains managers ?', options: ['La baisse de la productivité', 'Le coût des équipements', 'La baisse de la cohésion d\'équipe', 'La difficulté à recruter'], correctIndex: 2,
        },
        {
          id: 'tcf1-ce-11', type: 'mcq',
          passage:
            "Le télétravail, longtemps perçu comme un simple avantage ponctuel, s'est imposé durablement dans de nombreuses entreprises marocaines. Si les employés apprécient majoritairement la flexibilité qu'il offre, certains managers s'inquiètent d'une possible baisse de la cohésion d'équipe. Plusieurs sociétés ont donc adopté un modèle hybride, alternant jours de présence au bureau et jours à domicile, afin de concilier les deux impératifs.",
          prompt: 'Comment le télétravail est-il aujourd\'hui perçu, selon le texte ?', options: ['Comme une mode passagère', 'Comme un simple avantage ponctuel toujours', 'Comme durablement installé', 'Comme un échec généralisé'], correctIndex: 2,
        },
        {
          id: 'tcf1-ce-12', type: 'mcq',
          passage:
            "Le télétravail, longtemps perçu comme un simple avantage ponctuel, s'est imposé durablement dans de nombreuses entreprises marocaines. Si les employés apprécient majoritairement la flexibilité qu'il offre, certains managers s'inquiètent d'une possible baisse de la cohésion d'équipe. Plusieurs sociétés ont donc adopté un modèle hybride, alternant jours de présence au bureau et jours à domicile, afin de concilier les deux impératifs.",
          prompt: 'Que valorisent majoritairement les employés dans le télétravail ?', options: ['Le salaire plus élevé', 'La flexibilité', 'La proximité avec les collègues', 'Les équipements fournis'], correctIndex: 1,
        },
        {
          id: 'tcf1-ce-13', type: 'mcq',
          passage:
            "Longtemps considérée comme une contrainte, la lecture à voix haute revient en force dans certaines écoles primaires, où des enseignants l'utilisent désormais comme un outil ludique de cohésion de classe plutôt que comme un exercice de contrôle. Les premiers résultats, encore informels, suggèrent une amélioration notable de la confiance en soi des élèves les plus timides, qui trouvent dans cet exercice collectif un cadre bienveillant pour s'exprimer sans crainte du jugement.",
          prompt: 'Comment la lecture à voix haute est-elle désormais utilisée dans certaines écoles ?', options: ['Comme un exercice de contrôle strict', 'Comme un outil ludique de cohésion', 'Elle a été totalement supprimée', 'Uniquement pour les meilleurs élèves'], correctIndex: 1,
        },
        {
          id: 'tcf1-ce-14', type: 'mcq',
          passage:
            "Longtemps considérée comme une contrainte, la lecture à voix haute revient en force dans certaines écoles primaires, où des enseignants l'utilisent désormais comme un outil ludique de cohésion de classe plutôt que comme un exercice de contrôle. Les premiers résultats, encore informels, suggèrent une amélioration notable de la confiance en soi des élèves les plus timides, qui trouvent dans cet exercice collectif un cadre bienveillant pour s'exprimer sans crainte du jugement.",
          prompt: 'Qui semble bénéficier le plus de cette pratique, d\'après le texte ?', options: ['Les élèves les plus bavards', 'Les enseignants', 'Les élèves les plus timides', 'Les parents d\'élèves'], correctIndex: 2,
        },
        {
          id: 'tcf1-ce-15', type: 'mcq',
          passage:
            "Longtemps considérée comme une contrainte, la lecture à voix haute revient en force dans certaines écoles primaires, où des enseignants l'utilisent désormais comme un outil ludique de cohésion de classe plutôt que comme un exercice de contrôle. Les premiers résultats, encore informels, suggèrent une amélioration notable de la confiance en soi des élèves les plus timides, qui trouvent dans cet exercice collectif un cadre bienveillant pour s'exprimer sans crainte du jugement.",
          prompt: 'Comment qualifier les résultats évoqués dans le texte ?', options: ['Officiels et définitifs', 'Encore informels', 'Négatifs', 'Inexistants'], correctIndex: 1,
        },
        {
          id: 'tcf1-ce-16', type: 'mcq',
          passage:
            "Longtemps considérée comme une contrainte, la lecture à voix haute revient en force dans certaines écoles primaires, où des enseignants l'utilisent désormais comme un outil ludique de cohésion de classe plutôt que comme un exercice de contrôle. Les premiers résultats, encore informels, suggèrent une amélioration notable de la confiance en soi des élèves les plus timides, qui trouvent dans cet exercice collectif un cadre bienveillant pour s'exprimer sans crainte du jugement.",
          prompt: 'Comment la lecture à voix haute était-elle perçue auparavant, selon le texte ?', options: ['Comme un jeu', 'Comme une contrainte', 'Comme inutile', 'Comme une récompense'], correctIndex: 1,
        },
      ],
    },
    {
      key: 'structures',
      title: 'Maîtrise des Structures de la Langue',
      type: 'grammar',
      graded: true,
      durationSeconds: 10 * 60,
      instructions: 'Choisis la réponse qui complète correctement la phrase.',
      questions: [
        { id: 'tcf1-st-1', type: 'mcq', prompt: "Quand j'étais enfant, je ___ souvent chez mes grands-parents.", options: ['suis allé', 'allais', 'irai', 'allé'], correctIndex: 1 },
        { id: 'tcf1-st-2', type: 'mcq', prompt: "Il a fini son travail avant que je ___.", options: ['arrive', 'arrivais', 'suis arrivé', 'arriverai'], correctIndex: 0 },
        { id: 'tcf1-st-3', type: 'mcq', prompt: "C'est la ville ___ je suis né.", options: ['que', 'qui', 'où', 'dont'], correctIndex: 2 },
        { id: 'tcf1-st-4', type: 'mcq', prompt: "Elle s'intéresse beaucoup ___ la musique classique.", options: ['de', 'à', 'pour', 'avec'], correctIndex: 1 },
        { id: 'tcf1-st-5', type: 'mcq', prompt: "Les documents ___ elle a besoin sont sur le bureau.", options: ['que', 'qui', 'dont', 'où'], correctIndex: 2 },
        { id: 'tcf1-st-6', type: 'mcq', prompt: "Si j'avais su, je ne ___ pas venu.", options: ['serais', 'suis', 'étais', 'sois'], correctIndex: 0 },
        { id: 'tcf1-st-7', type: 'mcq', prompt: "Les lettres qu'elle ___ hier sont déjà parties.", options: ['a écrit', 'a écrites', 'a écrite', 'écrivait'], correctIndex: 1 },
        { id: 'tcf1-st-8', type: 'mcq', prompt: "Il faut que tu ___ à l'heure demain.", options: ['es', 'sois', 'seras', 'était'], correctIndex: 1 },
        { id: 'tcf1-st-9', type: 'mcq', prompt: "Ce n'est pas la peine ___ tu m'accompagnes.", options: ['que', 'pour que', 'à ce que', 'de'], correctIndex: 0 },
        { id: 'tcf1-st-10', type: 'mcq', prompt: "Je pense ___ lui téléphoner dès que possible.", options: ['à', 'de', 'pour', '(rien)'], correctIndex: 0 },
        { id: 'tcf1-st-11', type: 'mcq', prompt: "Malgré ___ efforts, il n'a pas réussi.", options: ['son', 'ses', 'sa', 'leur'], correctIndex: 1 },
        { id: 'tcf1-st-12', type: 'mcq', prompt: "Elle a répondu ___ toutes mes questions sans hésiter.", options: ['à', 'de', 'sur', 'pour'], correctIndex: 0 },
      ],
    },
  ],
};

const test2: AuthoredTest = {
  title: 'Test blanc TCF n°2',
  order: 1,
  sections: [
    {
      key: 'co',
      title: 'Compréhension Orale',
      type: 'listening',
      graded: true,
      durationSeconds: 15 * 60,
      audioNote: true,
      instructions: "Écoute chaque document (une seule lecture) puis réponds à la question.",
      questions: [
        { id: 'tcf2-co-1', type: 'mcq', passage: "Votre attention s'il vous plaît, le vol AT204 à destination de Casablanca embarque maintenant porte 14.", prompt: 'Que doivent faire les passagers du vol AT204 ?', options: ['Attendre encore', 'Se rendre à la porte 14', 'Récupérer leurs bagages', 'Changer de vol'], correctIndex: 1 },
        { id: 'tcf2-co-2', type: 'mcq', passage: "— On se voit toujours samedi pour le déménagement ? — Ah, justement, je voulais t'en parler, j'ai un empêchement, on peut décaler à dimanche ?", prompt: "Que propose la deuxième personne ?", options: ['Annuler le déménagement', 'Le reporter à dimanche', "Le faire seul", "Le faire samedi comme prévu"], correctIndex: 1 },
        { id: 'tcf2-co-3', type: 'mcq', passage: "Suite à des travaux sur la ligne 3, les rames circuleront avec un intervalle de 15 minutes au lieu de 5 minutes habituellement.", prompt: 'Quelle est la conséquence annoncée ?', options: ['La ligne est fermée', 'Les rames passeront moins souvent', 'Les rames passeront plus souvent', 'Le prix du billet augmente'], correctIndex: 1 },
        { id: 'tcf2-co-4', type: 'mcq', passage: "Franchement, ce nouveau restaurant... comment dire... j'y retournerais pas. Le service était lent et les plats fades.", prompt: 'Quel est l\'avis exprimé sur le restaurant ?', options: ['Très positif', 'Négatif', 'Neutre', 'Mitigé mais plutôt bon'], correctIndex: 1 },
        { id: 'tcf2-co-5', type: 'mcq', passage: "Pour activer votre carte, composez le numéro au dos, entrez les 16 chiffres, puis votre date de naissance.", prompt: "Qu'est-ce qui est demandé en dernier ?", options: ['Le numéro de la carte', 'La date de naissance', 'Un code secret', "L'adresse"], correctIndex: 1 },
        { id: 'tcf2-co-6', type: 'mcq', passage: "Le chantier de rénovation de la place centrale devait durer trois mois ; il en est finalement à son huitième mois, sans date de fin annoncée.", prompt: 'Que peut-on dire de ce chantier ?', options: ['Il a été terminé plus tôt que prévu', 'Il prend beaucoup plus de temps que prévu', 'Il n\'a jamais commencé', 'Il a duré exactement trois mois'], correctIndex: 1 },
        { id: 'tcf2-co-7', type: 'mcq', passage: "— Tu as fini le rapport ? — Presque, il me manque juste la conclusion, je te l'envoie avant ce soir sans faute.", prompt: 'Que reste-t-il à faire ?', options: ['Tout le rapport', 'Uniquement la conclusion', "L'introduction", 'Rien, c\'est terminé'], correctIndex: 1 },
        { id: 'tcf2-co-8', type: 'mcq', passage: "En cas d'urgence uniquement, merci de composer le 15. Pour toute autre demande, contactez le secrétariat aux heures d'ouverture.", prompt: 'Quand faut-il composer le 15 ?', options: ['Pour toute question', 'Uniquement en cas d\'urgence', 'Aux heures d\'ouverture', 'Jamais'], correctIndex: 1 },
        {
          id: 'tcf2-co-9', type: 'mcq',
          passage: "Bulletin circulation : sur l'autoroute A3, un accident impliquant deux poids lourds provoque actuellement un bouchon de près de dix kilomètres dans le sens Casablanca-Rabat. Les secours sont sur place et la voie de droite reste fermée. Un itinéraire de délestage par la route nationale est vivement conseillé aux automobilistes jusqu'à la fin des opérations, prévue en milieu d'après-midi.",
          prompt: "Qu'est-ce qui a causé le bouchon ?", options: ['Des travaux routiers', 'Un accident entre deux poids lourds', 'Une manifestation', 'Une inondation'], correctIndex: 1,
        },
        {
          id: 'tcf2-co-10', type: 'mcq',
          passage: "Bulletin circulation : sur l'autoroute A3, un accident impliquant deux poids lourds provoque actuellement un bouchon de près de dix kilomètres dans le sens Casablanca-Rabat. Les secours sont sur place et la voie de droite reste fermée. Un itinéraire de délestage par la route nationale est vivement conseillé aux automobilistes jusqu'à la fin des opérations, prévue en milieu d'après-midi.",
          prompt: "Que conseille-t-on aux automobilistes ?", options: ['De patienter sur l\'autoroute', 'De prendre un itinéraire de délestage par la route nationale', "D'emprunter la voie de droite", "D'annuler leur trajet"], correctIndex: 1,
        },
        {
          id: 'tcf2-co-11', type: 'mcq',
          passage: "Bulletin circulation : sur l'autoroute A3, un accident impliquant deux poids lourds provoque actuellement un bouchon de près de dix kilomètres dans le sens Casablanca-Rabat. Les secours sont sur place et la voie de droite reste fermée. Un itinéraire de délestage par la route nationale est vivement conseillé aux automobilistes jusqu'à la fin des opérations, prévue en milieu d'après-midi.",
          prompt: "Dans quel sens la circulation est-elle affectée ?", options: ['Rabat vers Casablanca uniquement', 'Casablanca vers Rabat', 'Dans les deux sens', "Ce n'est pas précisé"], correctIndex: 1,
        },
        {
          id: 'tcf2-co-12', type: 'mcq',
          passage: "Bulletin circulation : sur l'autoroute A3, un accident impliquant deux poids lourds provoque actuellement un bouchon de près de dix kilomètres dans le sens Casablanca-Rabat. Les secours sont sur place et la voie de droite reste fermée. Un itinéraire de délestage par la route nationale est vivement conseillé aux automobilistes jusqu'à la fin des opérations, prévue en milieu d'après-midi.",
          prompt: "Quand les opérations devraient-elles se terminer ?", options: ['Le matin', 'En milieu d\'après-midi', 'Le soir', 'Le lendemain'], correctIndex: 1,
        },
        {
          id: 'tcf2-co-13', type: 'mcq',
          passage: "Et donc, docteur, concrètement, qu'est-ce qui explique cette recrudescence des allergies printanières ces dernières années ? — Plusieurs facteurs se combinent : le réchauffement climatique allonge la saison pollinique, la pollution urbaine rend les muqueuses plus sensibles, et on observe aussi, tout simplement, un meilleur diagnostic qu'auparavant, ce qui gonfle artificiellement les chiffres. Il ne faut donc pas croire que tout est dû au climat.",
          prompt: "Selon le médecin, quels facteurs expliquent la hausse des allergies ?", options: ['Uniquement le climat', 'Le climat, la pollution et un meilleur diagnostic', 'Uniquement la pollution', 'Une nouvelle maladie'], correctIndex: 1,
        },
        {
          id: 'tcf2-co-14', type: 'mcq',
          passage: "Et donc, docteur, concrètement, qu'est-ce qui explique cette recrudescence des allergies printanières ces dernières années ? — Plusieurs facteurs se combinent : le réchauffement climatique allonge la saison pollinique, la pollution urbaine rend les muqueuses plus sensibles, et on observe aussi, tout simplement, un meilleur diagnostic qu'auparavant, ce qui gonfle artificiellement les chiffres. Il ne faut donc pas croire que tout est dû au climat.",
          prompt: "Que précise le médecin à la fin de son intervention ?", options: ['Que tout est dû au climat', 'Qu\'il ne faut pas tout attribuer au climat', 'Que les allergies vont disparaître', 'Qu\'il n\'y a pas d\'explication'], correctIndex: 1,
        },
        {
          id: 'tcf2-co-15', type: 'mcq',
          passage: "Et donc, docteur, concrètement, qu'est-ce qui explique cette recrudescence des allergies printanières ces dernières années ? — Plusieurs facteurs se combinent : le réchauffement climatique allonge la saison pollinique, la pollution urbaine rend les muqueuses plus sensibles, et on observe aussi, tout simplement, un meilleur diagnostic qu'auparavant, ce qui gonfle artificiellement les chiffres. Il ne faut donc pas croire que tout est dû au climat.",
          prompt: "Quel effet la pollution urbaine a-t-elle, selon le médecin ?", options: ['Elle allonge la saison pollinique', 'Elle rend les muqueuses plus sensibles', 'Elle améliore le diagnostic', 'Elle n\'a aucun effet'], correctIndex: 1,
        },
        {
          id: 'tcf2-co-16', type: 'mcq',
          passage: "Et donc, docteur, concrètement, qu'est-ce qui explique cette recrudescence des allergies printanières ces dernières années ? — Plusieurs facteurs se combinent : le réchauffement climatique allonge la saison pollinique, la pollution urbaine rend les muqueuses plus sensibles, et on observe aussi, tout simplement, un meilleur diagnostic qu'auparavant, ce qui gonfle artificiellement les chiffres. Il ne faut donc pas croire que tout est dû au climat.",
          prompt: "Qu'est-ce qui \"gonfle artificiellement les chiffres\", selon le médecin ?", options: ['Le réchauffement climatique', 'Un meilleur diagnostic qu\'auparavant', 'La pollution', 'Une épidémie'], correctIndex: 1,
        },
      ],
    },
    {
      key: 'ce',
      title: 'Compréhension Écrite',
      type: 'reading',
      graded: true,
      durationSeconds: 22 * 60,
      instructions: 'Lis chaque texte puis réponds à la question associée.',
      questions: [
        { id: 'tcf2-ce-1', type: 'mcq', passage: "FERMÉ POUR CONGÉS ANNUELS du 1er au 15 août. Réouverture le 16 août aux horaires habituels.", prompt: 'Quand le magasin rouvre-t-il ?', options: ['Le 1er août', 'Le 15 août', 'Le 16 août', 'Il ne rouvre pas'], correctIndex: 2 },
        { id: 'tcf2-ce-2', type: 'mcq', passage: "Salut, tu peux récupérer les enfants ce soir ? J'ai une réunion qui se termine tard, je ne pourrai pas être là avant 19h30.", prompt: 'Que demande la personne qui écrit ?', options: ['De venir à la réunion', "D'aller chercher les enfants", 'De rentrer plus tôt', "D'annuler la réunion"], correctIndex: 1 },
        { id: 'tcf2-ce-3', type: 'mcq', passage: "OFFRE D'EMPLOI : recherchons assistant(e) administratif(ve), temps partiel, expérience non exigée, formation assurée en interne.", prompt: "Que peut-on dire des candidats sans expérience ?", options: ['Ils ne peuvent pas postuler', 'Ils peuvent postuler, une formation est prévue', 'Ils doivent se former ailleurs', 'Le poste est réservé aux experts'], correctIndex: 1 },
        { id: 'tcf2-ce-4', type: 'mcq', passage: "Cher client, votre colis a été déposé chez votre voisin du 3ème étage en votre absence. Merci de le récupérer avec une pièce d'identité.", prompt: "Où se trouve le colis ?", options: ['Chez le client', "Chez un voisin", 'Au bureau de poste', 'Il a été retourné'], correctIndex: 1 },
        { id: 'tcf2-ce-5', type: 'mcq', passage: "Attention, chantier en cours : trottoir impraticable entre le n°12 et le n°20 de la rue. Merci d'emprunter le trottoir opposé.", prompt: "Que doivent faire les piétons ?", options: ['Continuer sur le même trottoir', "Traverser sur l'autre trottoir", "Attendre la fin des travaux sur place", "Prendre un bus"], correctIndex: 1 },
        { id: 'tcf2-ce-6', type: 'mcq', passage: "Instructions : mélangez la farine et le sucre, puis incorporez les œufs un à un, en battant bien entre chaque ajout.", prompt: "Comment les œufs doivent-ils être ajoutés ?", options: ['Tous en même temps', 'Un par un, en battant entre chaque', "Avant la farine", "À la fin uniquement"], correctIndex: 1 },
        { id: 'tcf2-ce-7', type: 'mcq', passage: "La bibliothèque municipale sera exceptionnellement ouverte le dimanche 12, à l'occasion de la Journée de la lecture, de 10h à 18h.", prompt: "Pourquoi la bibliothèque est-elle ouverte un dimanche ?", options: ['C'+"'est son horaire habituel", "À l'occasion d'un événement spécial", "Pour des travaux", "Par erreur"], correctIndex: 1 },
        { id: 'tcf2-ce-8', type: 'mcq', passage: "Merci de ne pas jeter les piles usagées à la poubelle : un bac de collecte spécifique est disponible à l'accueil.", prompt: "Où faut-il jeter les piles usagées ?", options: ["Dans la poubelle normale", "Dans un bac de collecte spécifique à l'accueil", "Nulle part, il faut les garder", "Dans la rue"], correctIndex: 1 },
        {
          id: 'tcf2-ce-9', type: 'mcq',
          passage: "L'essor du covoiturage domicile-travail dans les zones périurbaines marocaines reste modeste malgré les incitations mises en place par plusieurs collectivités. Une étude récente pointe un obstacle culturel autant que pratique : beaucoup de salariés interrogés déclarent hésiter à partager un trajet quotidien avec des inconnus, invoquant des questions d'horaires incompatibles mais aussi, plus discrètement, un attachement à l'autonomie que permet la voiture individuelle. Les collectivités qui ont le mieux réussi à développer le covoiturage sont, sans exception, celles qui ont d'abord constitué des petits groupes d'employés d'une même entreprise avant d'ouvrir le dispositif au grand public.",
          prompt: "Quel obstacle l'étude met-elle en avant, en plus des horaires incompatibles ?", options: ['Le prix du carburant', "Un attachement à l'autonomie de la voiture individuelle", 'Le manque de voitures', "L'absence d'applications"], correctIndex: 1,
        },
        {
          id: 'tcf2-ce-10', type: 'mcq',
          passage: "L'essor du covoiturage domicile-travail dans les zones périurbaines marocaines reste modeste malgré les incitations mises en place par plusieurs collectivités. Une étude récente pointe un obstacle culturel autant que pratique : beaucoup de salariés interrogés déclarent hésiter à partager un trajet quotidien avec des inconnus, invoquant des questions d'horaires incompatibles mais aussi, plus discrètement, un attachement à l'autonomie que permet la voiture individuelle. Les collectivités qui ont le mieux réussi à développer le covoiturage sont, sans exception, celles qui ont d'abord constitué des petits groupes d'employés d'une même entreprise avant d'ouvrir le dispositif au grand public.",
          prompt: "Quelles collectivités ont le mieux réussi à développer le covoiturage ?", options: ["Celles qui ont ouvert directement au grand public", "Celles qui ont d'abord formé des petits groupes d'une même entreprise", "Celles qui n'ont rien fait", "Celles qui ont interdit la voiture individuelle"], correctIndex: 1,
        },
        {
          id: 'tcf2-ce-11', type: 'mcq',
          passage: "L'essor du covoiturage domicile-travail dans les zones périurbaines marocaines reste modeste malgré les incitations mises en place par plusieurs collectivités. Une étude récente pointe un obstacle culturel autant que pratique : beaucoup de salariés interrogés déclarent hésiter à partager un trajet quotidien avec des inconnus, invoquant des questions d'horaires incompatibles mais aussi, plus discrètement, un attachement à l'autonomie que permet la voiture individuelle. Les collectivités qui ont le mieux réussi à développer le covoiturage sont, sans exception, celles qui ont d'abord constitué des petits groupes d'employés d'une même entreprise avant d'ouvrir le dispositif au grand public.",
          prompt: "Comment l'essor du covoiturage est-il qualifié dans la première phrase ?", options: ['Spectaculaire', 'Modeste', 'Inexistant', 'En forte hausse'], correctIndex: 1,
        },
        {
          id: 'tcf2-ce-12', type: 'mcq',
          passage: "L'essor du covoiturage domicile-travail dans les zones périurbaines marocaines reste modeste malgré les incitations mises en place par plusieurs collectivités. Une étude récente pointe un obstacle culturel autant que pratique : beaucoup de salariés interrogés déclarent hésiter à partager un trajet quotidien avec des inconnus, invoquant des questions d'horaires incompatibles mais aussi, plus discrètement, un attachement à l'autonomie que permet la voiture individuelle. Les collectivités qui ont le mieux réussi à développer le covoiturage sont, sans exception, celles qui ont d'abord constitué des petits groupes d'employés d'une même entreprise avant d'ouvrir le dispositif au grand public.",
          prompt: "Malgré quoi l'essor du covoiturage reste-t-il modeste ?", options: ["Malgré l'absence d'incitations", "Malgré les incitations des collectivités", "Malgré le prix élevé de l'essence", "Malgré une loi qui l'impose"], correctIndex: 1,
        },
        {
          id: 'tcf2-ce-13', type: 'mcq',
          passage: "Longtemps réservée aux grandes entreprises technologiques, la semaine de quatre jours gagne progressivement de petites structures marocaines, notamment dans les métiers du numérique. Les dirigeants qui l'ont adoptée rapportent des effets contrastés : une nette amélioration du bien-être perçu par les employés, mais aussi, pour certains postes nécessitant une présence continue face aux clients, une réorganisation complexe qui a nécessité plusieurs mois d'ajustement avant de porter ses fruits.",
          prompt: "Qui adopte progressivement la semaine de quatre jours, selon le texte ?", options: ['Uniquement les grandes entreprises technologiques', 'De petites structures, notamment dans le numérique', 'Uniquement les administrations publiques', 'Personne pour l\'instant'], correctIndex: 1,
        },
        {
          id: 'tcf2-ce-14', type: 'mcq',
          passage: "Longtemps réservée aux grandes entreprises technologiques, la semaine de quatre jours gagne progressivement de petites structures marocaines, notamment dans les métiers du numérique. Les dirigeants qui l'ont adoptée rapportent des effets contrastés : une nette amélioration du bien-être perçu par les employés, mais aussi, pour certains postes nécessitant une présence continue face aux clients, une réorganisation complexe qui a nécessité plusieurs mois d'ajustement avant de porter ses fruits.",
          prompt: "Quel effet positif les dirigeants rapportent-ils ?", options: ['Une baisse des coûts', 'Une nette amélioration du bien-être des employés', 'Une hausse immédiate des ventes', 'Moins de clients'], correctIndex: 1,
        },
        {
          id: 'tcf2-ce-15', type: 'mcq',
          passage: "Longtemps réservée aux grandes entreprises technologiques, la semaine de quatre jours gagne progressivement de petites structures marocaines, notamment dans les métiers du numérique. Les dirigeants qui l'ont adoptée rapportent des effets contrastés : une nette amélioration du bien-être perçu par les employés, mais aussi, pour certains postes nécessitant une présence continue face aux clients, une réorganisation complexe qui a nécessité plusieurs mois d'ajustement avant de porter ses fruits.",
          prompt: "Pour quels postes la réorganisation a-t-elle été complexe ?", options: ['Les postes de direction uniquement', 'Les postes nécessitant une présence continue face aux clients', 'Tous les postes sans exception', 'Aucun poste'], correctIndex: 1,
        },
        {
          id: 'tcf2-ce-16', type: 'mcq',
          passage: "Longtemps réservée aux grandes entreprises technologiques, la semaine de quatre jours gagne progressivement de petites structures marocaines, notamment dans les métiers du numérique. Les dirigeants qui l'ont adoptée rapportent des effets contrastés : une nette amélioration du bien-être perçu par les employés, mais aussi, pour certains postes nécessitant une présence continue face aux clients, une réorganisation complexe qui a nécessité plusieurs mois d'ajustement avant de porter ses fruits.",
          prompt: "Combien de temps la réorganisation a-t-elle nécessité avant de porter ses fruits ?", options: ['Quelques jours', 'Plusieurs mois', 'Plusieurs années', "Ce n'est pas précisé"], correctIndex: 1,
        },
      ],
    },
    {
      key: 'structures',
      title: 'Maîtrise des Structures de la Langue',
      type: 'grammar',
      graded: true,
      durationSeconds: 10 * 60,
      instructions: 'Choisis la réponse qui complète correctement la phrase.',
      questions: [
        { id: 'tcf2-st-1', type: 'mcq', prompt: "Dès qu'il ___ chez lui, il m'appellera.", options: ['arrive', 'arrivera', 'est arrivé', 'arrivait'], correctIndex: 1 },
        { id: 'tcf2-st-2', type: 'mcq', prompt: "Je cherche une maison ___ le jardin donne sur la mer.", options: ['que', 'qui', 'dont', 'où'], correctIndex: 2 },
        { id: 'tcf2-st-3', type: 'mcq', prompt: "Elle a fini par s'habituer ___ ce nouveau rythme de travail.", options: ['à', 'de', 'avec', 'pour'], correctIndex: 0 },
        { id: 'tcf2-st-4', type: 'mcq', prompt: "Bien qu'il ___ très fatigué, il a terminé le marathon.", options: ['était', 'soit', 'fût', 'est'], correctIndex: 1 },
        { id: 'tcf2-st-5', type: 'mcq', prompt: "Nous ___ ce projet ensemble depuis trois ans déjà.", options: ['menons', 'menions', 'avons mené', 'mènerons'], correctIndex: 0 },
        { id: 'tcf2-st-6', type: 'mcq', prompt: "C'est le collègue ___ j'ai partagé mon bureau pendant deux ans.", options: ['que', 'qui', 'avec qui', 'dont'], correctIndex: 2 },
        { id: 'tcf2-st-7', type: 'mcq', prompt: "Si tu avais réservé plus tôt, tu ___ une meilleure place.", options: ['aurais eu', 'as eu', 'auras', 'aies'], correctIndex: 0 },
        { id: 'tcf2-st-8', type: 'mcq', prompt: "Les documents ___ tu as besoin sont dans le tiroir du haut.", options: ['que', 'qui', 'dont', 'lesquels'], correctIndex: 2 },
        { id: 'tcf2-st-9', type: 'mcq', prompt: "Elle s'est excusée ___ son retard auprès de toute l'équipe.", options: ['de', 'pour', 'à', 'sur'], correctIndex: 0 },
        { id: 'tcf2-st-10', type: 'mcq', prompt: "Il est essentiel que chacun ___ son avis avant le vote.", options: ['donne', 'donnera', 'a donné', 'donnait'], correctIndex: 0 },
        { id: 'tcf2-st-11', type: 'mcq', prompt: "Les photos que j'___ hier sont déjà en ligne.", options: ['ai pris', 'ai prises', 'ai prise', 'avais pris'], correctIndex: 1 },
        { id: 'tcf2-st-12', type: 'mcq', prompt: "Ils habitent ___ depuis leur mariage.", options: ['ensemble', 'ensembles', "l'un l'autre", 'mutuellement'], correctIndex: 0 },
      ],
    },
  ],
};

const test3: AuthoredTest = {
  title: 'Test blanc TCF n°3',
  order: 2,
  sections: [
    {
      key: 'co',
      title: 'Compréhension Orale',
      type: 'listening',
      graded: true,
      durationSeconds: 15 * 60,
      audioNote: true,
      instructions: "Écoute chaque document (une seule lecture) puis réponds à la question.",
      questions: [
        { id: 'tcf3-co-1', type: 'mcq', passage: "Rappel : la pharmacie de garde ce week-end se trouve avenue Mohammed VI, ouverte de 20h à 8h.", prompt: 'Quels sont les horaires de la pharmacie de garde ?', options: ['8h à 20h', '20h à 8h', 'Toute la journée', "Fermée le week-end"], correctIndex: 1 },
        { id: 'tcf3-co-2', type: 'mcq', passage: "— Tu as vu mes clés ? — Regarde sur la table de l'entrée, c'est là que je les mets toujours en rentrant.", prompt: 'Où les clés se trouvent-elles probablement ?', options: ['Dans la voiture', "Sur la table de l'entrée", 'Dans un sac', 'Chez un ami'], correctIndex: 1 },
        { id: 'tcf3-co-3', type: 'mcq', passage: "Nouvelle mise à jour disponible : elle corrige un bug d'affichage et améliore la vitesse de chargement de l'application.", prompt: "Qu'apporte cette mise à jour ?", options: ['De nouvelles fonctionnalités uniquement', 'Une correction de bug et une amélioration de vitesse', 'Un changement de design complet', 'Rien de notable'], correctIndex: 1 },
        { id: 'tcf3-co-4', type: 'mcq', passage: "Alors franchement, cette conférence, je m'attendais à mieux, mais bon, les pauses café étaient sympas au moins.", prompt: "Quel est le ton de la personne sur la conférence elle-même ?", options: ['Enthousiaste', "Plutôt déçu", "Neutre", "Très positif"], correctIndex: 1 },
        { id: 'tcf3-co-5', type: 'mcq', passage: "Merci de badger à l'entrée ET à la sortie du parking, sous peine de facturation forfaitaire de la journée complète.", prompt: "Que risque-t-on si on ne badge qu'à l'entrée ?", options: ['Rien du tout', 'Une facturation forfaitaire de la journée', 'Une amende de police', "L'accès sera refusé"], correctIndex: 1 },
        { id: 'tcf3-co-6', type: 'mcq', passage: "Le concert initialement prévu en plein air a été déplacé en intérieur en raison des prévisions météo défavorables.", prompt: "Pourquoi le lieu du concert a-t-il changé ?", options: ["Le lieu était trop petit", "À cause de la météo", "Trop de spectateurs", "L'artiste l'a demandé"], correctIndex: 1 },
        { id: 'tcf3-co-7', type: 'mcq', passage: "— Vous avez de la fièvre depuis combien de temps ? — Ça a commencé hier soir, autour de 38 et demi.", prompt: "Depuis quand la fièvre a-t-elle commencé ?", options: ["Ce matin", "Hier soir", "Il y a une semaine", "Elle n'a pas de fièvre"], correctIndex: 1 },
        { id: 'tcf3-co-8', type: 'mcq', passage: "Les inscriptions à l'atelier de céramique sont limitées à douze places et se font uniquement en ligne à partir de lundi.", prompt: "Comment peut-on s'inscrire à l'atelier ?", options: ['Par téléphone', 'En ligne à partir de lundi', 'Sur place uniquement', "Par courrier"], correctIndex: 1 },
        {
          id: 'tcf3-co-9', type: 'mcq',
          passage: "Le marché de l'occasion pour l'électroménager connaît une croissance notable au Maroc depuis deux ans, portée principalement par de jeunes ménages soucieux de leur budget mais aussi, de plus en plus, par une sensibilité environnementale grandissante. Les plateformes spécialisées rapportent que les appareils les plus recherchés restent les réfrigérateurs et les machines à laver, dont le prix d'achat neuf reste élevé, tandis que les petits appareils électroménagers, moins coûteux à l'état neuf, suscitent un intérêt bien moindre sur le marché de l'occasion.",
          prompt: "Qui porte principalement la croissance de ce marché, selon le texte ?", options: ["Les grandes entreprises", "De jeunes ménages soucieux de leur budget", "Les touristes", "Les revendeurs professionnels uniquement"], correctIndex: 1,
        },
        {
          id: 'tcf3-co-10', type: 'mcq',
          passage: "Le marché de l'occasion pour l'électroménager connaît une croissance notable au Maroc depuis deux ans, portée principalement par de jeunes ménages soucieux de leur budget mais aussi, de plus en plus, par une sensibilité environnementale grandissante. Les plateformes spécialisées rapportent que les appareils les plus recherchés restent les réfrigérateurs et les machines à laver, dont le prix d'achat neuf reste élevé, tandis que les petits appareils électroménagers, moins coûteux à l'état neuf, suscitent un intérêt bien moindre sur le marché de l'occasion.",
          prompt: "Quels appareils sont les plus recherchés d'occasion ?", options: ['Les petits appareils électroménagers', 'Les réfrigérateurs et les machines à laver', 'Les téléviseurs', 'Les ordinateurs'], correctIndex: 1,
        },
        {
          id: 'tcf3-co-11', type: 'mcq',
          passage: "Le marché de l'occasion pour l'électroménager connaît une croissance notable au Maroc depuis deux ans, portée principalement par de jeunes ménages soucieux de leur budget mais aussi, de plus en plus, par une sensibilité environnementale grandissante. Les plateformes spécialisées rapportent que les appareils les plus recherchés restent les réfrigérateurs et les machines à laver, dont le prix d'achat neuf reste élevé, tandis que les petits appareils électroménagers, moins coûteux à l'état neuf, suscitent un intérêt bien moindre sur le marché de l'occasion.",
          prompt: "Pourquoi les petits appareils suscitent-ils moins d'intérêt d'occasion ?", options: ['Ils sont introuvables', "Ils sont peu coûteux à l'état neuf", 'Ils sont de mauvaise qualité', "Ils ne sont plus fabriqués"], correctIndex: 1,
        },
        {
          id: 'tcf3-co-12', type: 'mcq',
          passage: "Le marché de l'occasion pour l'électroménager connaît une croissance notable au Maroc depuis deux ans, portée principalement par de jeunes ménages soucieux de leur budget mais aussi, de plus en plus, par une sensibilité environnementale grandissante. Les plateformes spécialisées rapportent que les appareils les plus recherchés restent les réfrigérateurs et les machines à laver, dont le prix d'achat neuf reste élevé, tandis que les petits appareils électroménagers, moins coûteux à l'état neuf, suscitent un intérêt bien moindre sur le marché de l'occasion.",
          prompt: "Depuis combien de temps ce marché croît-il, selon le texte ?", options: ['Six mois', 'Deux ans', 'Dix ans', "Ce n'est pas précisé"], correctIndex: 1,
        },
        {
          id: 'tcf3-co-13', type: 'mcq',
          passage: "Alors aujourd'hui dans notre chronique cinéma, on s'intéresse à un phénomène curieux : le retour en salle de films sortis il y a vingt ou trente ans, souvent restaurés en très haute définition. Contrairement à ce qu'on pourrait croire, ce ne sont pas seulement les spectateurs nostalgiques qui remplissent ces séances, une bonne partie du public est composée de jeunes qui découvrent ces films pour la première fois sur grand écran, et qui semblent particulièrement sensibles à une expérience qu'ils jugent plus immersive que le visionnage à la maison.",
          prompt: "Quel est le sujet principal de cette chronique ?", options: ['La sortie de nouveaux films', 'Le retour en salle de films anciens restaurés', 'La fermeture des cinémas', "Un festival de cinéma"], correctIndex: 1,
        },
        {
          id: 'tcf3-co-14', type: 'mcq',
          passage: "Alors aujourd'hui dans notre chronique cinéma, on s'intéresse à un phénomène curieux : le retour en salle de films sortis il y a vingt ou trente ans, souvent restaurés en très haute définition. Contrairement à ce qu'on pourrait croire, ce ne sont pas seulement les spectateurs nostalgiques qui remplissent ces séances, une bonne partie du public est composée de jeunes qui découvrent ces films pour la première fois sur grand écran, et qui semblent particulièrement sensibles à une expérience qu'ils jugent plus immersive que le visionnage à la maison.",
          prompt: "Qui compose une bonne partie du public de ces séances, selon le chroniqueur ?", options: ['Uniquement des spectateurs nostalgiques', 'Des jeunes qui découvrent ces films pour la première fois', 'Des professionnels du cinéma', 'Des touristes étrangers'], correctIndex: 1,
        },
        {
          id: 'tcf3-co-15', type: 'mcq',
          passage: "Alors aujourd'hui dans notre chronique cinéma, on s'intéresse à un phénomène curieux : le retour en salle de films sortis il y a vingt ou trente ans, souvent restaurés en très haute définition. Contrairement à ce qu'on pourrait croire, ce ne sont pas seulement les spectateurs nostalgiques qui remplissent ces séances, une bonne partie du public est composée de jeunes qui découvrent ces films pour la première fois sur grand écran, et qui semblent particulièrement sensibles à une expérience qu'ils jugent plus immersive que le visionnage à la maison.",
          prompt: "Que pensent ces jeunes spectateurs de l'expérience en salle, selon le texte ?", options: ["Qu'elle est décevante", "Qu'elle est plus immersive que chez soi", "Qu'elle est identique à la maison", "Qu'elle est trop chère"], correctIndex: 1,
        },
        {
          id: 'tcf3-co-16', type: 'mcq',
          passage: "Alors aujourd'hui dans notre chronique cinéma, on s'intéresse à un phénomène curieux : le retour en salle de films sortis il y a vingt ou trente ans, souvent restaurés en très haute définition. Contrairement à ce qu'on pourrait croire, ce ne sont pas seulement les spectateurs nostalgiques qui remplissent ces séances, une bonne partie du public est composée de jeunes qui découvrent ces films pour la première fois sur grand écran, et qui semblent particulièrement sensibles à une expérience qu'ils jugent plus immersive que le visionnage à la maison.",
          prompt: "Comment ces films anciens sont-ils souvent présentés en salle, selon le texte ?", options: ['Dans leur version originale non modifiée', 'Restaurés en très haute définition', 'En version raccourcie', 'Sous-titrés uniquement'], correctIndex: 1,
        },
      ],
    },
    {
      key: 'ce',
      title: 'Compréhension Écrite',
      type: 'reading',
      graded: true,
      durationSeconds: 22 * 60,
      instructions: 'Lis chaque texte puis réponds à la question associée.',
      questions: [
        { id: 'tcf3-ce-1', type: 'mcq', passage: "PROMOTION : -30% sur tous les articles de sport, ce week-end uniquement, dans la limite des stocks disponibles.", prompt: "Jusqu'à quand la promotion est-elle valable ?", options: ['Toute la semaine', 'Ce week-end uniquement', 'Un mois', "Elle n'a pas de limite"], correctIndex: 1 },
        { id: 'tcf3-ce-2', type: 'mcq', passage: "Bonjour, je confirme notre rendez-vous de jeudi 14h. N'oubliez pas d'apporter votre pièce d'identité et une photo récente.", prompt: "Que faut-il apporter au rendez-vous ?", options: ['Uniquement une photo', 'Une pièce d\'identité et une photo', "Un chèque", "Rien de particulier"], correctIndex: 1 },
        { id: 'tcf3-ce-3', type: 'mcq', passage: "URGENT : fuite d'eau signalée au 2ème étage, coupure d'eau générale prévue de 10h à 12h le temps de la réparation.", prompt: "Pourquoi l'eau sera-t-elle coupée ?", options: ["Pour un nettoyage", "Pour réparer une fuite", "Pour des travaux prévus de longue date", "Sans raison précisée"], correctIndex: 1 },
        { id: 'tcf3-ce-4', type: 'mcq', passage: "Cher voisin, désolé pour le bruit hier soir, c'était l'anniversaire de ma fille, ça ne se reproduira pas. Bien à vous.", prompt: "Que fait la personne qui écrit ce mot ?", options: ["Elle se plaint du bruit", "Elle s'excuse pour le bruit", "Elle invite son voisin", "Elle demande de l'aide"], correctIndex: 1 },
        { id: 'tcf3-ce-5', type: 'mcq', passage: "Ne pas dépasser la dose de deux comprimés par prise, à renouveler au maximum trois fois par jour, espacées de six heures.", prompt: "Combien de temps faut-il attendre entre deux prises ?", options: ['Trois heures', 'Six heures', 'Douze heures', "Il n'y a pas de délai"], correctIndex: 1 },
        { id: 'tcf3-ce-6', type: 'mcq', passage: "Chère équipe, la réunion de ce vendredi est annulée, elle sera reprogrammée la semaine prochaine, jour à confirmer.", prompt: "Que devient la réunion de vendredi ?", options: ["Elle est maintenue", "Elle est annulée puis reprogrammée", "Elle est avancée à jeudi", "Elle est définitivement supprimée"], correctIndex: 1 },
        { id: 'tcf3-ce-7', type: 'mcq', passage: "Merci de retirer vos chaussures avant d'entrer dans la salle de prière ; un espace est prévu à cet effet à l'entrée.", prompt: "Que doit-on faire avant d'entrer ?", options: ['Se laver les mains', 'Retirer ses chaussures', "Payer un droit d'entrée", "Se couvrir la tête"], correctIndex: 1 },
        { id: 'tcf3-ce-8', type: 'mcq', passage: "Devis valable 30 jours à compter de sa date d'émission. Passé ce délai, merci de nous contacter pour une nouvelle estimation.", prompt: "Que faut-il faire après 30 jours ?", options: ["Rien, le devis reste valable", "Contacter l'entreprise pour une nouvelle estimation", "Payer une pénalité", "Le devis est remboursé"], correctIndex: 1 },
        {
          id: 'tcf3-ce-9', type: 'mcq',
          passage: "Le phénomène des \"villages connectés\" gagne du terrain dans plusieurs régions rurales marocaines : grâce au déploiement de la fibre optique, des professionnels auparavant contraints de s'installer en ville pour exercer un métier du numérique choisissent désormais de rester dans leur village d'origine, voire d'y revenir après plusieurs années en milieu urbain. Les élus locaux y voient une opportunité de freiner l'exode rural, même si certains experts tempèrent cet enthousiasme en rappelant que la connexion internet seule ne suffit pas : l'accès aux services de santé et à l'éducation reste un frein bien plus déterminant pour beaucoup de familles.",
          prompt: "Qu'est-ce qui permet à des professionnels de rester en milieu rural, selon le texte ?", options: ["Une nouvelle loi", "Le déploiement de la fibre optique", "Une baisse des loyers en ville", "Un programme de subventions agricoles"], correctIndex: 1,
        },
        {
          id: 'tcf3-ce-10', type: 'mcq',
          passage: "Le phénomène des \"villages connectés\" gagne du terrain dans plusieurs régions rurales marocaines : grâce au déploiement de la fibre optique, des professionnels auparavant contraints de s'installer en ville pour exercer un métier du numérique choisissent désormais de rester dans leur village d'origine, voire d'y revenir après plusieurs années en milieu urbain. Les élus locaux y voient une opportunité de freiner l'exode rural, même si certains experts tempèrent cet enthousiasme en rappelant que la connexion internet seule ne suffit pas : l'accès aux services de santé et à l'éducation reste un frein bien plus déterminant pour beaucoup de familles.",
          prompt: "Que rappellent certains experts, d'après le texte ?", options: ["Que la fibre optique est inutile", "Que l'accès à la santé et à l'éducation reste un frein plus déterminant", "Que l'exode rural est terminé", "Que les villages connectés n'existent pas"], correctIndex: 1,
        },
        {
          id: 'tcf3-ce-11', type: 'mcq',
          passage: "Le phénomène des \"villages connectés\" gagne du terrain dans plusieurs régions rurales marocaines : grâce au déploiement de la fibre optique, des professionnels auparavant contraints de s'installer en ville pour exercer un métier du numérique choisissent désormais de rester dans leur village d'origine, voire d'y revenir après plusieurs années en milieu urbain. Les élus locaux y voient une opportunité de freiner l'exode rural, même si certains experts tempèrent cet enthousiasme en rappelant que la connexion internet seule ne suffit pas : l'accès aux services de santé et à l'éducation reste un frein bien plus déterminant pour beaucoup de familles.",
          prompt: "Comment les élus locaux perçoivent-ils ce phénomène ?", options: ['Comme un danger', 'Comme une opportunité de freiner l\'exode rural', 'Comme sans importance', 'Comme un échec'], correctIndex: 1,
        },
        {
          id: 'tcf3-ce-12', type: 'mcq',
          passage: "Le phénomène des \"villages connectés\" gagne du terrain dans plusieurs régions rurales marocaines : grâce au déploiement de la fibre optique, des professionnels auparavant contraints de s'installer en ville pour exercer un métier du numérique choisissent désormais de rester dans leur village d'origine, voire d'y revenir après plusieurs années en milieu urbain. Les élus locaux y voient une opportunité de freiner l'exode rural, même si certains experts tempèrent cet enthousiasme en rappelant que la connexion internet seule ne suffit pas : l'accès aux services de santé et à l'éducation reste un frein bien plus déterminant pour beaucoup de familles.",
          prompt: "Que faisaient ces professionnels avant ce phénomène ?", options: ["Ils travaillaient déjà depuis leur village", "Ils étaient contraints de s'installer en ville", "Ils ne travaillaient pas dans le numérique", "Ils vivaient à l'étranger"], correctIndex: 1,
        },
        {
          id: 'tcf3-ce-13', type: 'mcq',
          passage: "Une association marocaine de réinsertion propose depuis peu des ateliers de réparation d'objets électroniques ouverts gratuitement au public, animés par des bénévoles souvent retraités de l'industrie. L'objectif affiché est double : réduire les déchets électroniques en prolongeant la durée de vie des appareils, mais aussi transmettre un savoir-faire technique en voie de disparition à une génération plus jeune, peu familière avec la réparation et davantage habituée au remplacement pur et simple.",
          prompt: "Qui anime ces ateliers de réparation ?", options: ['Des étudiants en informatique', 'Des bénévoles souvent retraités de l\'industrie', 'Des employés municipaux', 'Des fabricants d\'électronique'], correctIndex: 1,
        },
        {
          id: 'tcf3-ce-14', type: 'mcq',
          passage: "Une association marocaine de réinsertion propose depuis peu des ateliers de réparation d'objets électroniques ouverts gratuitement au public, animés par des bénévoles souvent retraités de l'industrie. L'objectif affiché est double : réduire les déchets électroniques en prolongeant la durée de vie des appareils, mais aussi transmettre un savoir-faire technique en voie de disparition à une génération plus jeune, peu familière avec la réparation et davantage habituée au remplacement pur et simple.",
          prompt: "Quel est le double objectif de ces ateliers ?", options: ["Gagner de l'argent et former des employés", "Réduire les déchets électroniques et transmettre un savoir-faire", "Vendre des appareils réparés et faire de la publicité", "Recruter des bénévoles et fermer l'association"], correctIndex: 1,
        },
        {
          id: 'tcf3-ce-15', type: 'mcq',
          passage: "Une association marocaine de réinsertion propose depuis peu des ateliers de réparation d'objets électroniques ouverts gratuitement au public, animés par des bénévoles souvent retraités de l'industrie. L'objectif affiché est double : réduire les déchets électroniques en prolongeant la durée de vie des appareils, mais aussi transmettre un savoir-faire technique en voie de disparition à une génération plus jeune, peu familière avec la réparation et davantage habituée au remplacement pur et simple.",
          prompt: "Comment la jeune génération est-elle décrite dans le texte ?", options: ["Très habile en réparation", "Peu familière avec la réparation, plus habituée au remplacement", "Totalement indifférente à l'électronique", "Experte en recyclage"], correctIndex: 1,
        },
        {
          id: 'tcf3-ce-16', type: 'mcq',
          passage: "Une association marocaine de réinsertion propose depuis peu des ateliers de réparation d'objets électroniques ouverts gratuitement au public, animés par des bénévoles souvent retraités de l'industrie. L'objectif affiché est double : réduire les déchets électroniques en prolongeant la durée de vie des appareils, mais aussi transmettre un savoir-faire technique en voie de disparition à une génération plus jeune, peu familière avec la réparation et davantage habituée au remplacement pur et simple.",
          prompt: "Combien coûte la participation à ces ateliers ?", options: ["Un tarif élevé", "C'est gratuit", "Un tarif réduit pour les étudiants", "Ce n'est pas précisé"], correctIndex: 1,
        },
      ],
    },
    {
      key: 'structures',
      title: 'Maîtrise des Structures de la Langue',
      type: 'grammar',
      graded: true,
      durationSeconds: 10 * 60,
      instructions: 'Choisis la réponse qui complète correctement la phrase.',
      questions: [
        { id: 'tcf3-st-1', type: 'mcq', prompt: "Hier, pendant que je ___ la vaisselle, le téléphone a sonné.", options: ['fais', 'faisais', 'ferai', 'ai fait'], correctIndex: 1 },
        { id: 'tcf3-st-2', type: 'mcq', prompt: "Voici le livre ___ je t'ai parlé la semaine dernière.", options: ['que', 'qui', 'dont', 'où'], correctIndex: 2 },
        { id: 'tcf3-st-3', type: 'mcq', prompt: "Elle a peur ___ ne pas réussir son examen.", options: ['de', 'à', 'pour', 'que'], correctIndex: 0 },
        { id: 'tcf3-st-4', type: 'mcq', prompt: "Il faudrait que vous ___ plus attentifs en classe.", options: ['êtes', 'soyez', 'serez', 'étiez'], correctIndex: 1 },
        { id: 'tcf3-st-5', type: 'mcq', prompt: "Nous partirons dès que le soleil ___.", options: ['se lève', 'se lèvera', 's\'est levé', 'se levait'], correctIndex: 1 },
        { id: 'tcf3-st-6', type: 'mcq', prompt: "C'est une région ___ le climat est très humide.", options: ['que', 'qui', 'où', 'dont'], correctIndex: 2 },
        { id: 'tcf3-st-7', type: 'mcq', prompt: "Si nous avions plus de temps, nous ___ visiter le musée aussi.", options: ['pourrions', 'pouvons', 'pourrons', 'avons pu'], correctIndex: 0 },
        { id: 'tcf3-st-8', type: 'mcq', prompt: "Elle tient beaucoup ___ cette vieille photo de famille.", options: ['à', 'de', 'sur', 'pour'], correctIndex: 0 },
        { id: 'tcf3-st-9', type: 'mcq', prompt: "Les valises ___ elle a préparées sont déjà dans la voiture.", options: ['que', 'qui', 'dont', 'où'], correctIndex: 0 },
        { id: 'tcf3-st-10', type: 'mcq', prompt: "Malgré la pluie, ils ___ décidé de sortir quand même.", options: ['ont', 'sont', 'avaient', 'ont eu'], correctIndex: 0 },
        { id: 'tcf3-st-11', type: 'mcq', prompt: "Je doute qu'il ___ raison sur ce point précis.", options: ['a', 'ait', 'aura', 'avait'], correctIndex: 1 },
        { id: 'tcf3-st-12', type: 'mcq', prompt: "Ce sont des jumelles ; on les confond ___.", options: ['souvent', 'l\'une l\'autre', 'mutuellement souvent', 'entre elles souvent'], correctIndex: 0 },
      ],
    },
  ],
};

const test4: AuthoredTest = {
  title: 'Test blanc TCF n°4',
  order: 3,
  sections: [
    {
      key: 'co',
      title: 'Compréhension Orale',
      type: 'listening',
      graded: true,
      durationSeconds: 15 * 60,
      audioNote: true,
      instructions: "Écoute chaque document (une seule lecture) puis réponds à la question.",
      questions: [
        { id: 'tcf4-co-1', type: 'mcq', passage: "Bienvenue à bord, veuillez attacher vos ceintures, nous entamons notre descente vers l'aéroport de Marrakech.", prompt: 'Que fait actuellement l\'avion ?', options: ['Il décolle', 'Il descend vers l\'aéroport', 'Il survole la mer', 'Il est au sol'], correctIndex: 1 },
        { id: 'tcf4-co-2', type: 'mcq', passage: "— On mange chinois ou italien ce soir ? — Honnêtement, ça m'est égal, choisis toi.", prompt: "Quelle est la préférence de la deuxième personne ?", options: ['Chinois uniquement', 'Italien uniquement', 'Aucune préférence particulière', 'Ni l\'un ni l\'autre'], correctIndex: 2 },
        { id: 'tcf4-co-3', type: 'mcq', passage: "Votre commande a bien été expédiée et devrait arriver sous 48 à 72 heures ouvrées.", prompt: "Quand la commande devrait-elle arriver ?", options: ['Le jour même', 'Sous 48 à 72 heures ouvrées', 'Dans un mois', 'Elle n\'a pas encore été expédiée'], correctIndex: 1 },
        { id: 'tcf4-co-4', type: 'mcq', passage: "Ce film, je vous le dis, c'est un chef-d'œuvre, je suis sortie de la salle bouleversée.", prompt: "Quel est l'avis exprimé sur le film ?", options: ['Très négatif', 'Très positif', 'Neutre', 'Mitigé'], correctIndex: 1 },
        { id: 'tcf4-co-5', type: 'mcq', passage: "Merci de vous présenter trente minutes avant le début de l'épreuve, muni de votre convocation et d'une pièce d'identité.", prompt: "Combien de temps avant l'épreuve faut-il se présenter ?", options: ['Dix minutes', 'Trente minutes', 'Une heure', 'Juste à l\'heure'], correctIndex: 1 },
        { id: 'tcf4-co-6', type: 'mcq', passage: "Le loyer de l'appartement inclut les charges mais pas l'électricité, qui est facturée séparément selon la consommation.", prompt: "Qu'est-ce qui n'est pas inclus dans le loyer ?", options: ['Les charges', "L'électricité", 'L\'eau', 'Tout est inclus'], correctIndex: 1 },
        { id: 'tcf4-co-7', type: 'mcq', passage: "— Alors, ce nouvel appartement, il te plaît ? — Beaucoup, surtout la lumière, mais la cuisine est vraiment minuscule.", prompt: "Quel est le point négatif mentionné ?", options: ['La lumière', 'La cuisine trop petite', 'Le prix', 'Le quartier'], correctIndex: 1 },
        { id: 'tcf4-co-8', type: 'mcq', passage: "Les billets pour le match de samedi sont en vente exclusivement sur notre site internet, aucune vente sur place ne sera possible.", prompt: "Où peut-on acheter les billets ?", options: ['Sur place uniquement', 'Sur le site internet uniquement', 'Dans les deux', 'Par téléphone'], correctIndex: 1 },
        {
          id: 'tcf4-co-9', type: 'mcq',
          passage: "Chronique économique : les exportations marocaines de produits agroalimentaires transformés ont progressé de près de 12% sur les neuf premiers mois de l'année, une hausse portée principalement par la demande européenne pour les conserves de fruits et légumes. Les producteurs interrogés restent toutefois prudents quant à la poursuite de cette dynamique, évoquant une forte dépendance aux conditions climatiques locales, qui pourraient, en cas de sécheresse prolongée, inverser rapidement la tendance actuelle.",
          prompt: "De combien les exportations ont-elles progressé ?", options: ['Environ 5%', 'Près de 12%', 'Plus de 30%', 'Elles ont baissé'], correctIndex: 1,
        },
        {
          id: 'tcf4-co-10', type: 'mcq',
          passage: "Chronique économique : les exportations marocaines de produits agroalimentaires transformés ont progressé de près de 12% sur les neuf premiers mois de l'année, une hausse portée principalement par la demande européenne pour les conserves de fruits et légumes. Les producteurs interrogés restent toutefois prudents quant à la poursuite de cette dynamique, évoquant une forte dépendance aux conditions climatiques locales, qui pourraient, en cas de sécheresse prolongée, inverser rapidement la tendance actuelle.",
          prompt: "Qu'est-ce qui explique principalement cette hausse ?", options: ['La demande locale', 'La demande européenne pour les conserves de fruits et légumes', 'Une baisse des taxes', 'Une nouvelle usine'], correctIndex: 1,
        },
        {
          id: 'tcf4-co-11', type: 'mcq',
          passage: "Chronique économique : les exportations marocaines de produits agroalimentaires transformés ont progressé de près de 12% sur les neuf premiers mois de l'année, une hausse portée principalement par la demande européenne pour les conserves de fruits et légumes. Les producteurs interrogés restent toutefois prudents quant à la poursuite de cette dynamique, évoquant une forte dépendance aux conditions climatiques locales, qui pourraient, en cas de sécheresse prolongée, inverser rapidement la tendance actuelle.",
          prompt: "Pourquoi les producteurs restent-ils prudents ?", options: ['Ils manquent de main-d\'œuvre', 'Ils dépendent fortement des conditions climatiques', 'Les prix sont trop élevés', 'La demande européenne a chuté'], correctIndex: 1,
        },
        {
          id: 'tcf4-co-12', type: 'mcq',
          passage: "Chronique économique : les exportations marocaines de produits agroalimentaires transformés ont progressé de près de 12% sur les neuf premiers mois de l'année, une hausse portée principalement par la demande européenne pour les conserves de fruits et légumes. Les producteurs interrogés restent toutefois prudents quant à la poursuite de cette dynamique, évoquant une forte dépendance aux conditions climatiques locales, qui pourraient, en cas de sécheresse prolongée, inverser rapidement la tendance actuelle.",
          prompt: "Sur quelle période cette hausse est-elle mesurée ?", options: ['Les trois derniers mois', 'Les neuf premiers mois de l\'année', 'Les cinq dernières années', 'Un seul mois'], correctIndex: 1,
        },
        {
          id: 'tcf4-co-13', type: 'mcq',
          passage: "Aujourd'hui dans notre magazine consacré à l'architecture, on s'intéresse à la réhabilitation des riads traditionnels dans les médinas marocaines, transformés depuis une quinzaine d'années en maisons d'hôtes ou en résidences privées haut de gamme. Si ce mouvement a permis de sauver de la ruine de nombreux bâtiments historiques menacés d'effondrement, certains habitants historiques des médinas dénoncent une hausse des prix de l'immobilier qui les pousse progressivement à quitter des quartiers qu'ils occupaient depuis des générations.",
          prompt: "Quel est le sujet principal de ce magazine ?", options: ['La construction de nouveaux quartiers', 'La réhabilitation des riads traditionnels dans les médinas', 'Les prix de l\'immobilier en général', 'Le tourisme balnéaire'], correctIndex: 1,
        },
        {
          id: 'tcf4-co-14', type: 'mcq',
          passage: "Aujourd'hui dans notre magazine consacré à l'architecture, on s'intéresse à la réhabilitation des riads traditionnels dans les médinas marocaines, transformés depuis une quinzaine d'années en maisons d'hôtes ou en résidences privées haut de gamme. Si ce mouvement a permis de sauver de la ruine de nombreux bâtiments historiques menacés d'effondrement, certains habitants historiques des médinas dénoncent une hausse des prix de l'immobilier qui les pousse progressivement à quitter des quartiers qu'ils occupaient depuis des générations.",
          prompt: "Quel effet positif ce mouvement a-t-il eu, selon le texte ?", options: ['Il a fait baisser les prix', 'Il a permis de sauver des bâtiments historiques de la ruine', 'Il a créé de nouveaux emplois agricoles', 'Il a réduit le tourisme'], correctIndex: 1,
        },
        {
          id: 'tcf4-co-15', type: 'mcq',
          passage: "Aujourd'hui dans notre magazine consacré à l'architecture, on s'intéresse à la réhabilitation des riads traditionnels dans les médinas marocaines, transformés depuis une quinzaine d'années en maisons d'hôtes ou en résidences privées haut de gamme. Si ce mouvement a permis de sauver de la ruine de nombreux bâtiments historiques menacés d'effondrement, certains habitants historiques des médinas dénoncent une hausse des prix de l'immobilier qui les pousse progressivement à quitter des quartiers qu'ils occupaient depuis des générations.",
          prompt: "Que dénoncent certains habitants historiques ?", options: ['Le bruit des touristes', 'Une hausse des prix de l\'immobilier qui les pousse à partir', 'Le manque de riads', 'La fermeture des médinas'], correctIndex: 1,
        },
        {
          id: 'tcf4-co-16', type: 'mcq',
          passage: "Aujourd'hui dans notre magazine consacré à l'architecture, on s'intéresse à la réhabilitation des riads traditionnels dans les médinas marocaines, transformés depuis une quinzaine d'années en maisons d'hôtes ou en résidences privées haut de gamme. Si ce mouvement a permis de sauver de la ruine de nombreux bâtiments historiques menacés d'effondrement, certains habitants historiques des médinas dénoncent une hausse des prix de l'immobilier qui les pousse progressivement à quitter des quartiers qu'ils occupaient depuis des générations.",
          prompt: "Depuis combien de temps ce mouvement de réhabilitation existe-t-il, selon le texte ?", options: ['Environ deux ans', 'Une quinzaine d\'années', 'Un demi-siècle', "Ce n'est pas précisé"], correctIndex: 1,
        },
      ],
    },
    {
      key: 'ce',
      title: 'Compréhension Écrite',
      type: 'reading',
      graded: true,
      durationSeconds: 22 * 60,
      instructions: 'Lis chaque texte puis réponds à la question associée.',
      questions: [
        { id: 'tcf4-ce-1', type: 'mcq', passage: "SOLDES : jusqu'à -50% sur une sélection d'articles, dans la limite des stocks disponibles, jusqu'au 30 du mois.", prompt: "Jusqu'à quand durent les soldes ?", options: ['Une semaine', 'Jusqu\'au 30 du mois', 'Un an', 'Ce n\'est pas précisé'], correctIndex: 1 },
        { id: 'tcf4-ce-2', type: 'mcq', passage: "Salut, j'ai adoré la soirée hier, merci pour l'invitation ! On se refait ça bientôt ?", prompt: "Que propose la personne qui écrit ?", options: ["De ne plus se revoir", "De refaire une soirée bientôt", "De s'excuser", "D'annuler un projet"], correctIndex: 1 },
        { id: 'tcf4-ce-3', type: 'mcq', passage: "AVIS DE COUPURE : l'eau sera coupée demain de 9h à 13h dans tout le quartier pour travaux de maintenance.", prompt: "Que se passera-t-il demain de 9h à 13h ?", options: ["Une coupure d'électricité", "Une coupure d'eau", "Une fermeture de rue", "Rien de particulier"], correctIndex: 1 },
        { id: 'tcf4-ce-4', type: 'mcq', passage: "Cher client, votre abonnement a été renouvelé automatiquement. Pour le résilier, contactez-nous avant le 5 du mois prochain.", prompt: "Que doit faire le client pour résilier ?", options: ['Rien, c\'est automatique', 'Contacter le service avant le 5 du mois prochain', 'Attendre un an', 'Envoyer un courrier recommandé uniquement'], correctIndex: 1 },
        { id: 'tcf4-ce-5', type: 'mcq', passage: "Conservez ce produit dans un endroit sec et à l'abri de la lumière directe, entre 15 et 25 degrés.", prompt: "Comment ce produit doit-il être conservé ?", options: ['Au réfrigérateur', "Dans un endroit sec, à l'abri de la lumière", 'À l\'extérieur', 'Peu importe'], correctIndex: 1 },
        { id: 'tcf4-ce-6', type: 'mcq', passage: "Chers parents, la sortie scolaire de vendredi est reportée en raison de la météo. Une nouvelle date sera communiquée sous peu.", prompt: "Pourquoi la sortie est-elle reportée ?", options: ["Manque de participants", "À cause de la météo", "Problème de bus", "Grève des enseignants"], correctIndex: 1 },
        { id: 'tcf4-ce-7', type: 'mcq', passage: "Merci de couper votre téléphone ou de le mettre en mode silencieux avant le début de la représentation.", prompt: "Que demande-t-on avant la représentation ?", options: ["D'éteindre les lumières", "De couper ou mettre en silencieux son téléphone", "De prendre des photos", "De s'asseoir rapidement"], correctIndex: 1 },
        { id: 'tcf4-ce-8', type: 'mcq', passage: "Le colis retourné sera remboursé sous 14 jours ouvrés à compter de sa réception par notre entrepôt.", prompt: "Quand le remboursement aura-t-il lieu ?", options: ["Immédiatement", "Sous 14 jours ouvrés après réception par l'entrepôt", "Après un an", "Il n'y a pas de remboursement"], correctIndex: 1 },
        {
          id: 'tcf4-ce-9', type: 'mcq',
          passage: "Plusieurs municipalités marocaines expérimentent depuis peu des \"rues scolaires\" : la circulation automobile y est interdite aux abords des écoles pendant les créneaux d'entrée et de sortie des classes, afin de réduire les risques d'accident et la pollution de l'air respiré par les enfants. Les premiers retours sont globalement positifs auprès des parents, bien que certains commerçants du quartier concerné se plaignent d'une gêne pour leurs livraisons durant ces créneaux, une difficulté que les municipalités promettent de résoudre en ajustant les horaires de restriction.",
          prompt: "Qu'est-ce qu'une \"rue scolaire\", selon le texte ?", options: ["Une rue réservée aux bus scolaires", "Une rue où la circulation est interdite aux abords des écoles à certains horaires", "Une nouvelle école", "Une rue entièrement piétonne en permanence"], correctIndex: 1,
        },
        {
          id: 'tcf4-ce-10', type: 'mcq',
          passage: "Plusieurs municipalités marocaines expérimentent depuis peu des \"rues scolaires\" : la circulation automobile y est interdite aux abords des écoles pendant les créneaux d'entrée et de sortie des classes, afin de réduire les risques d'accident et la pollution de l'air respiré par les enfants. Les premiers retours sont globalement positifs auprès des parents, bien que certains commerçants du quartier concerné se plaignent d'une gêne pour leurs livraisons durant ces créneaux, une difficulté que les municipalités promettent de résoudre en ajustant les horaires de restriction.",
          prompt: "Que se plaignent certains commerçants ?", options: ["Une baisse de leurs ventes", "Une gêne pour leurs livraisons", "Un bruit excessif", "Une hausse des impôts"], correctIndex: 1,
        },
        {
          id: 'tcf4-ce-11', type: 'mcq',
          passage: "Plusieurs municipalités marocaines expérimentent depuis peu des \"rues scolaires\" : la circulation automobile y est interdite aux abords des écoles pendant les créneaux d'entrée et de sortie des classes, afin de réduire les risques d'accident et la pollution de l'air respiré par les enfants. Les premiers retours sont globalement positifs auprès des parents, bien que certains commerçants du quartier concerné se plaignent d'une gêne pour leurs livraisons durant ces créneaux, une difficulté que les municipalités promettent de résoudre en ajustant les horaires de restriction.",
          prompt: "Comment les parents accueillent-ils cette mesure, selon le texte ?", options: ["Très négativement", "Globalement positivement", "Avec indifférence", "Ils l'ignorent"], correctIndex: 1,
        },
        {
          id: 'tcf4-ce-12', type: 'mcq',
          passage: "Plusieurs municipalités marocaines expérimentent depuis peu des \"rues scolaires\" : la circulation automobile y est interdite aux abords des écoles pendant les créneaux d'entrée et de sortie des classes, afin de réduire les risques d'accident et la pollution de l'air respiré par les enfants. Les premiers retours sont globalement positifs auprès des parents, bien que certains commerçants du quartier concerné se plaignent d'une gêne pour leurs livraisons durant ces créneaux, une difficulté que les municipalités promettent de résoudre en ajustant les horaires de restriction.",
          prompt: "Que promettent les municipalités pour résoudre la difficulté des commerçants ?", options: ["Supprimer la mesure", "Ajuster les horaires de restriction", "Fermer les commerces concernés", "Ne rien faire"], correctIndex: 1,
        },
        {
          id: 'tcf4-ce-13', type: 'mcq',
          passage: "Une enquête menée auprès de jeunes diplômés marocains révèle un décalage persistant entre les compétences enseignées à l'université et celles réellement recherchées par les employeurs, en particulier dans les compétences dites \"transversales\" : communication écrite, travail en équipe, gestion de projet. Plusieurs établissements ont commencé à réagir en intégrant des stages obligatoires plus tôt dans le cursus, mais les résultats de cette réforme récente ne pourront être pleinement évalués que dans plusieurs années, une fois que les premières cohortes concernées auront intégré le marché du travail.",
          prompt: "Quel décalage l'enquête révèle-t-elle ?", options: ["Un manque de diplômés", "Un décalage entre compétences enseignées et compétences recherchées", "Un problème de salaire", "Un manque d'universités"], correctIndex: 1,
        },
        {
          id: 'tcf4-ce-14', type: 'mcq',
          passage: "Une enquête menée auprès de jeunes diplômés marocains révèle un décalage persistant entre les compétences enseignées à l'université et celles réellement recherchées par les employeurs, en particulier dans les compétences dites \"transversales\" : communication écrite, travail en équipe, gestion de projet. Plusieurs établissements ont commencé à réagir en intégrant des stages obligatoires plus tôt dans le cursus, mais les résultats de cette réforme récente ne pourront être pleinement évalués que dans plusieurs années, une fois que les premières cohortes concernées auront intégré le marché du travail.",
          prompt: "Quelles compétences sont citées comme exemples de compétences \"transversales\" ?", options: ["Les mathématiques et la physique", "La communication écrite, le travail en équipe, la gestion de projet", "Les langues étrangères uniquement", "L'informatique uniquement"], correctIndex: 1,
        },
        {
          id: 'tcf4-ce-15', type: 'mcq',
          passage: "Une enquête menée auprès de jeunes diplômés marocains révèle un décalage persistant entre les compétences enseignées à l'université et celles réellement recherchées par les employeurs, en particulier dans les compétences dites \"transversales\" : communication écrite, travail en équipe, gestion de projet. Plusieurs établissements ont commencé à réagir en intégrant des stages obligatoires plus tôt dans le cursus, mais les résultats de cette réforme récente ne pourront être pleinement évalués que dans plusieurs années, une fois que les premières cohortes concernées auront intégré le marché du travail.",
          prompt: "Comment plusieurs établissements ont-ils réagi ?", options: ["En supprimant les stages", "En intégrant des stages obligatoires plus tôt dans le cursus", "En fermant certaines filières", "En augmentant les frais de scolarité"], correctIndex: 1,
        },
        {
          id: 'tcf4-ce-16', type: 'mcq',
          passage: "Une enquête menée auprès de jeunes diplômés marocains révèle un décalage persistant entre les compétences enseignées à l'université et celles réellement recherchées par les employeurs, en particulier dans les compétences dites \"transversales\" : communication écrite, travail en équipe, gestion de projet. Plusieurs établissements ont commencé à réagir en intégrant des stages obligatoires plus tôt dans le cursus, mais les résultats de cette réforme récente ne pourront être pleinement évalués que dans plusieurs années, une fois que les premières cohortes concernées auront intégré le marché du travail.",
          prompt: "Quand les résultats de cette réforme pourront-ils être pleinement évalués ?", options: ["Immédiatement", "Dans plusieurs années, une fois les premières cohortes sur le marché du travail", "Ils ne seront jamais évalués", "Dans un mois"], correctIndex: 1,
        },
      ],
    },
    {
      key: 'structures',
      title: 'Maîtrise des Structures de la Langue',
      type: 'grammar',
      graded: true,
      durationSeconds: 10 * 60,
      instructions: 'Choisis la réponse qui complète correctement la phrase.',
      questions: [
        { id: 'tcf4-st-1', type: 'mcq', prompt: "L'année dernière, nous ___ trois mois en Espagne.", options: ['passons', 'passions', 'avons passé', 'passerons'], correctIndex: 2 },
        { id: 'tcf4-st-2', type: 'mcq', prompt: "Voilà la raison ___ il a démissionné.", options: ['que', 'qui', 'pour laquelle', 'où'], correctIndex: 2 },
        { id: 'tcf4-st-3', type: 'mcq', prompt: "Ils sont fiers ___ leur fils, qui vient d'être diplômé.", options: ['de', 'à', 'pour', 'sur'], correctIndex: 0 },
        { id: 'tcf4-st-4', type: 'mcq', prompt: "Il est possible qu'elle ___ déjà au courant de la nouvelle.", options: ['est', 'soit', 'sera', 'était'], correctIndex: 1 },
        { id: 'tcf4-st-5', type: 'mcq', prompt: "Aussitôt qu'elle ___ la lettre, elle m'a appelé en larmes.", options: ['lisait', 'lit', 'avait lu', 'a lu'], correctIndex: 2 },
        { id: 'tcf4-st-6', type: 'mcq', prompt: "C'est un sujet ___ on ne parle jamais dans cette famille.", options: ['que', 'qui', 'dont', 'lequel'], correctIndex: 2 },
        { id: 'tcf4-st-7', type: 'mcq', prompt: "Si elle travaillait un peu plus, elle ___ de meilleurs résultats.", options: ['aurait', 'a', 'aura', 'avait'], correctIndex: 0 },
        { id: 'tcf4-st-8', type: 'mcq', prompt: "Il a renoncé ___ son voyage à cause du mauvais temps.", options: ['à', 'de', 'sur', 'pour'], correctIndex: 0 },
        { id: 'tcf4-st-9', type: 'mcq', prompt: "Les décisions ___ elle a prises n'ont pas plu à tout le monde.", options: ['que', 'qui', 'dont', 'où'], correctIndex: 0 },
        { id: 'tcf4-st-10', type: 'mcq', prompt: "Il vaudrait mieux que tu ___ un peu avant de répondre.", options: ['réfléchis', 'réfléchisses', 'réfléchiras', 'réfléchissais'], correctIndex: 1 },
        { id: 'tcf4-st-11', type: 'mcq', prompt: "La maison ___ ils ont achetée date du siècle dernier.", options: ['que', 'qui', 'dont', 'où'], correctIndex: 0 },
        { id: 'tcf4-st-12', type: 'mcq', prompt: "Ces deux collègues se respectent ___ depuis toujours.", options: ['mutuellement', 'ensemble', 'réciproque', 'entre eux'], correctIndex: 0 },
      ],
    },
  ],
};

export const tcf: TrackContent = { courses, tests: [test1, test2, test3, test4] };
