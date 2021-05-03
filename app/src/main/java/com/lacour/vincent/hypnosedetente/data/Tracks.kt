package com.lacour.vincent.hypnosedetente.data

import com.lacour.vincent.hypnosedetente.R
import com.lacour.vincent.hypnosedetente.model.Sample

data class Tracks(
        val samples: List<Sample> = listOf(
                Sample(
                        "Bien dormir",
                        "Bien dormir",
                        "bien_dormir",
                        "bien-dormir.mp3",
                        "Voici un texte composé par Patricia d'Angeli, puis enregistré également " +
                                "par elle (l'ambiance musicale est d'Olivier Lockert). Comme son titre l'indique, cet " +
                                "enregistrement est destiné à vous accompagner durant votre endormissement, soit pour " +
                                "vous aider à vous endormir, soit pour faire en sorte que votre nuit se passe bien. Vous " +
                                "avez juste à poser les écouteurs ou le casque de votre smartphone sur vos oreilles, et laisser faire. Pas " +
                                "besoin d'écouter vraiment ou de chercher à comprendre, juste vous laisser bercer. L'accompagnement " +
                                "musical est minimal et, comme la voix, s'en ira progressivement afin de ne pas troubler votre sommeil.",
                        R.drawable.bien_dormir,
                        19
                ),
                Sample(
                        "S'endormir",
                        "S'endormir en auto-hypnose",
                        "s_endormir",
                        "s-endormir.mp3",
                        "Le premier protocole du livre \"Auto-hypnose pour débutants\" : comment trouver " +
                                "le sommeil. Ecoutez au casque, afin de profiter au mieux de l'accompagnement musical. Pour cette séance, " +
                                "une induction hypnotique a été utilisée parmi celles présentées dans le livre. Bien sûr, lorsque vous pratiquez " +
                                "de manière autonome, vous pouvez utiliser votre méthode préférée. De même, lorsque vous pratiquez en solo, " +
                                "vous n’avez pas besoin de parler ou de mentaliser les paroles. Il suffit de penser à ce que vous voulez, " +
                                "comme une intention. Avec la pratique, tout s’automatise et seule votre intention dirige la séance.",
                        R.drawable.s_endormir,
                        30
                ),
                Sample(
                        "Préventif",
                        "Système immunitaire préventif",
                        "preventif",
                        "preventif.mp3",
                        "Cette induction a été conçue, à l'origine, pour aider lors de l'épidémie de grippe H1N1 de l'hiver 2009. " +
                                "Cette enregistrement est à écouter avant l'enregistrement \"Curatif\" afin de bien comprendre l'esprit dans " +
                                "lequel vous mettre. Le texte est explicatif, avec de nombreuses métaphores. Le tout est dit assez rapidement, " +
                                "de manière à exciter, stimuler, vos processus psychophysiologiques. Texte et musique d'Olivier Lockert.",
                        R.drawable.preventif,
                        27
                ),
                Sample(
                        "Curatif",
                        "Système immunitaire curatif",
                        "curatif",
                        "curatif.mp3",
                        "Cet accompagnement est curatif. C'est-à-dire que vous n'en avez " +
                                "besoin que si vous êtes malade. Le texte est dit lentement et la musique est hypnotique. " +
                                "Même si beaucoup de choses sont encore expliquées, le texte n'est pas pour votre esprit conscient, " +
                                "fermez les yeux et passez un bon moment, sans chercher à comprendre, ni même " +
                                "à écouter. S'il vous arrive de ne plus entendre, comme si vous pensiez à autre " +
                                "chose ou comme si vous aviez dormi : c'est parfait !",
                        R.drawable.curatif,
                        36
                ),
                Sample(
                        "Renforcement",
                        "Renforcer son système immunitaire",
                        "renforcement",
                        "renforcement.mp3",
                        "Voici un exercice sur le thème \"Stimulez votre système immunitaire\". Il s'agit ici " +
                                "de libérer un éventuel blocage émotionnel, dans les cas où tout semble correct au niveau " +
                                "du corps, et pourtant, vous n'allez pas mieux. Vous pouvez aussi écouter cette séance à titre " +
                                "préventif, avec l'idée suivante en tête : \"Cher Inconscient, si quelque chose devait me " +
                                "stresser ou me bloquer, de là à fragiliser mon immunité, dis-le moi avant ou fais ce qu'il " +
                                "faut pour que tout se passe bien\". Texte et voix d'Olivier Lockert.",
                        R.drawable.renforcement,
                        21
                ),
                Sample(
                        "Ressourcement",
                        "Bulle de ressourcement thérapeutique",
                        "ressourcement",
                        "ressourcement.mp3",
                        "L'idée est de se reconnecter aux forces vitales, puis de plonger dans un espace de ressourcement, afin de renforcer " +
                                "et d'accélérer la guérison du corps. Le fond sonore est lancinant, onirique, afin de vous bercer. " +
                                "Rien à faire, rien à penser, juste vous laisser faire. Allongez-vous ou installez-vous confortablement, et laissez aller. " +
                                "Dans les situations les plus difficiles, utilisez cette induction au moins une fois par jour. Vous pouvez vous endormir pendant l'accompagnement, " +
                                "car l'action consciente, volontaire, est inutile.",
                        R.drawable.ressourcement,
                        30
                ),
                Sample(
                        "Adaptation aux virus",
                        "Adaptation aux virus",
                        "adaptation_aux_virus",
                        "adaptation-aux-virus.mp3",
                        "Une expérience d'auto-hypnose pour accélérer en vous l'adaptation à un nouveau virus. " +
                                "Que vous preniez cette idée comme une réalité concrète ou une métaphore, peu importe, si cela " +
                                "peut vous aider, à un niveau ou un autre. Il s'agit de soutien psychologique, qui peut venir en aide " +
                                "ou en complément de tout l'aspect sanitaire donc continuez bien à vous protéger, " +
                                "à prendre soin de vous. Vous pouvez renouveler cette expérience chaque jour, pendant " +
                                "quelques temps, si vous en avez l'envie ou si cela vous fait du bien.",
                        R.drawable.adaptation_aux_virus,
                        24
                ),
                Sample(
                        "Retrouver le moral",
                        "Retrouver le moral",
                        "retrouver_le_moral",
                        "retrouver-le-moral.mp3",
                        "Après une introduction sautillante, cette séance vous montre ce que vous pouvez " +
                                "faire par vous-même en auto-hypnose. L'accompagnement débute par une sorte de \"ré-énergétisation\" physique " +
                                "et psychologique. Ensuite, vous apprendrez à créer un un point d'ancrage qui vous permettra de " +
                                "retrouver la forme, l'énergie, quand vous en aurez besoin (en dehors de cette séance d'hypnose). " +
                                "Exercice à pratiquer régulièrement pour bien le comprendre. Retenez qu'un ancrage ne s'use que si on ne s'en " +
                                "sert pas : plus vous pratiquerez, mieux votre ancrage fonctionnera !",
                        R.drawable.retrouver_le_moral,
                        16
                ),
                Sample(
                        "Joie de vivre",
                        "Retrouver sa joie de vivre",
                        "joie_de_vivre",
                        "joie-de-vivre.mp3",
                        "Alexandre Lockert, psychologue, psychothérapeute et hypnothérapeute (IFHE, Paris) vous emmène aujourd'hui " +
                                "dans une séance d'hypnose où vous aurez juste à vous laisser bercer. Objectif : solliciter votre esprit le plus " +
                                "profond afin qu'il (r)éveille en vous votre joie de vivre." +
                                "\n\nCrédits audio : « Compass » de Some Where at Sea, « Tides » de Some Where at Sea, « Pilgrim » de Some Where " +
                                "at Sea.",
                        R.drawable.joie_de_vivre,
                        23
                ),
                Sample(
                        "Confiance en soi",
                        "Confiance en soi",
                        "confiance_en_soi",
                        "confiance-en-soi.mp3",
                        "Le texte de cette séance est d'Olivier Lockert et il est dit " +
                                "par Patricia d'Angeli. Il s'agit d'un protocole détaillé, par explications, " +
                                "suggestions et métaphores pour (re)trouver la confiance en vous. Vous n'aurez pas " +
                                "forcément besoin de l'écouter souvent : la première fois peut être la bonne ! La séance " +
                                "est conçue comme un accompagnement unique.",
                        R.drawable.confiance_en_soi,
                        39
                ),
                Sample(
                        "Estime de soi",
                        "Estime de soi",
                        "estime_de_soi",
                        "estime-de-soi.mp3",
                        "Voici un accompagnement très complémentaire à celui sur la " +
                                "Confiance en Soi. Le texte est de Patricia d'Angeli, qui souhaite vous faire découvrir ici le travail sur votre Critique intérieur, à " +
                                "l'origine de vos soucis d'estime de vous. Rien d'autre à faire que de vous laisser " +
                                "guider et suivre le protocole qui vous sera enseigné. Si cela va trop vite la première " +
                                "fois, pas de souci : laissez passer un jour ou deux, et réécoutez l'enregistrement. " +
                                "La seconde fois, vous y arriverez beaucoup mieux.",
                        R.drawable.estime_de_soi,
                        25
                ),
                Sample(
                        "Retrouver sa confiance",
                        "Retrouver sa confiance en soi",
                        "retrouver_sa_confiance",
                        "retrouver-sa-confiance.mp3",
                        "Alexandre Lockert, psychologue, psychothérapeute et hypnothérapeute (IFHE, Paris) vous " +
                                "propose une séance d'hypnose pour vous connecter au meilleur de vous-même et nettoyer ce qui " +
                                "vous empêche de vous sentir serein par rapport à vous-même." +
                                "\n\nCrédits audio : « The Long Wait » de Dear Gravity, « Lucid Dreaming » de Dear " +
                                "Gravity, « December » de Dear Gravity, « Pacing » de Dear Gravity.",
                        R.drawable.retrouver_sa_confiance,
                        29
                ),
                Sample(
                        "Calmer l'anxiété",
                        "Calmer l'anxiété",
                        "calmer_l_anxiete",
                        "calmer-l-anxiete.mp3",
                        "Patricia d'Angeli vous propose ici un accompagnement à sa " +
                                "manière : un voyage vers votre Enfant Intérieur, source des émotions qui assaillent les personnes souffrant " +
                                "d'anxiété, de crises d'angoisse, ou qui vivent des peurs sans fondement concret. Vous apprendrez à entrer en vous-même " +
                                "et à dialoguer avec certaines facettes de votre esprit inconscient. Ce travail intérieur pourra être repris " +
                                "régulièrement, jusqu'à ce que vous ayez l'automatisme de pensée qui vous permettra de ressentir ce dont a besoin votre esprit " +
                                "profond. La musique est d'Olivier Lockert.",
                        R.drawable.calmer_l_anxiete,
                        27
                ),
                Sample(
                        "Pensées négatives",
                        "Stopper ses pensées négatives",
                        "pensees_negatives",
                        "pensees-negatives.mp3",
                        "Alexandre Lockert, psychologue, psychothérapeute et hypnothérapeute (IFHE, Paris) " +
                                "vous accompagne dans un voyage hypnotique intérieur, aux sources de vos pensées négatives : " +
                                "dévalorisation personnelle, auto-critique ou critique des autres, perfectionnisme exagéré, " +
                                "mauvaise estime de soi. La technique choisie est celle du \"Soin du Critique\", " +
                                "en Thérapie Symbolique Avancée (Patricia d'Angeli), apparentée à l'Hypnose Humaniste." +
                                "\n\nCrédits audio : « Ember » de Michael-FK, « Lucid Dreaming » de Dear Gravity, « Pacing » " +
                                "de Dear Gravity, « The Veil » de Dear Gravity, « Longitude Travel » de Itai " +
                                "Argaman, « My Own Safe Haven » de Will van de Crommert.",
                        R.drawable.pensees_negatives,
                        36
                ),
                Sample(
                        "Transformer vos peurs",
                        "Transformer vos peurs",
                        "transformer_vos_peurs",
                        "transformer-vos-peurs.mp3",
                        "Patricia d'Angeli vous conduit dans cette séance d’hypnose, en forme de quête intérieure, " +
                                "afin de vous aider à transformer vos peurs ou angoisses en une force créatrice. Cet accompagnement " +
                                "vous sera également utile en cas de maladie, en complément de votre suivi médical, afin d’activer " +
                                "en vous vos ressources profondes. Le travail symbolique a l'avantage de permettre un travail important " +
                                "sans avoir besoin de revivre quoi que ce soit de pénible.",
                        R.drawable.transformer_vos_peurs,
                        26
                ),
                Sample(
                        "Addictions",
                        "Se libérer de ses addictions",
                        "addictions",
                        "addictions.mp3",
                        "Olivier Lockert vous propose une seances sur les addictions. Il faudra simplement " +
                                "choisir en pensée le sujet sur lequel vous souhaitez travailler : faciliter l'arrêt du " +
                                "tabac, diminuer les boissons alcoolisées, les grignotages, les visites sur internet, les " +
                                "heures de jeu vidéo, l'argent perdu en loteries et jeux de hasard, etc. Comme expliqué dans " +
                                "le livre \"Auto-hypnose pour Débutants\", il y a de multiples causes possibles à une " +
                                "addiction - et certaines causes ne sont pas psychologiques du tout ! Les addictions graves " +
                                "peuvent nécessiter un suivi médical. L'Hypnose ne prend en charge que l'aspect " +
                                "psychologique. Un bon hypnothérapeute vous enverra éventuellement vérifier auprès d'un " +
                                "médecin si tout va bien \"côté physique\" (selon le type d'addiction). Texte " +
                                "et voix d'Olivier Lockert.",
                        R.drawable.addictions,
                        33
                ),
                Sample(
                        "Gérer le stress",
                        "Gérer le stress",
                        "gerer_le_stress",
                        "gerer-le-stress.mp3",
                        "Vous serez guidé par la voix de Patricia d'Angeli, " +
                                "durant ce que l'on appelle un cycle ultradien, qui correspond à l'activation d'une " +
                                "phase naturelle de régénération physique et psychologique. Cet enregistrement est " +
                                "à utiliser à la maison, en soutien pour les moments difficiles. Si vous avez un examen " +
                                "ou un rendez-vous important, une compétition sportive ou tout autre évènement " +
                                "stressant ponctuel, utilisez l'enregistrement suivant pour réactiver dans l'urgence " +
                                "les bienfaits de cette séance.",
                        R.drawable.gerer_le_stress,
                        22
                ),
                Sample(
                        "Gérer la douleur",
                        "Gérer la douleur",
                        "gerer_la_douleur",
                        "gerer-la-douleur.mp3",
                        "Notez que cette séance d’auto-hypnose ne remplace absolument pas le travail de " +
                                "votre médecin. Il s’agit de vous aider à rester zen pendant l’intervention et à " +
                                "gérer la douleur le mieux possible, en plus de ce que vous donnera le professionnel " +
                                "médical qui vous accompagnera. Il s’agit de soutien psychologique. " +
                                "Extrait des exercices du livre \"Auto-hypnose pour Débutants\" : la préparation à une " +
                                "intervention médicale\". Texte et voix d'Olivier Lockert.",
                        R.drawable.gerer_la_douleur,
                        27
                ),
                Sample(
                        "Rééducation physique",
                        "Rééducation physique",
                        "reeducation_physique",
                        "reeducation-physique.mp3",
                        "Dernière variante du protocole d'apprentissage rapide, cette fois-ci pour aider " +
                                "ou soutenir une rééducation physique, que ce soit suite à une maladie ou à un accident : " +
                                "le fait de \"faire les mouvements\", d'abord mentalement, aide considérablement à mieux " +
                                "les réussir ensuite physiquement, avec votre kiné, rééducateur. Nous aurons donc " +
                                "une partie \"visualisation\" (pas obligé de \"voir\" pour ça, rassurez-vous) mais aussi " +
                                "une bonne partie d'activation de vos ressources profondes. Bien entendu, l'hypnose " +
                                "ne dispense pas d'un suivi médical, si vous en avez besoin. Mais elle vous permet " +
                                "d'obtenir de meilleurs résultats, plus vite, ce qui est motivant et vous aide à " +
                                "continuer avec le moral. Texte et voix d'Olivier Lockert.",
                        R.drawable.reeducation_physique,
                        37
                ),
                Sample(
                        "Surmonter sa tristesse",
                        "Surmonter sa tristesse",
                        "surmonter_sa_tristesse",
                        "surmonter-sa-tristesse.mp3",
                        "Alexandre Lockert, psychologue, psychothérapeute et hypnothérapeute (IFHE, Paris) " +
                                "vous accompagne dans une véritable transformation intérieure, à la source indéfinie de " +
                                "la tristesse que vous ressentez, afin de la métamorphoser et remettre ainsi la lumière au " +
                                "coeur de votre vie." +
                                "\n\nCrédits audio : « Cold in your bones » de Kyle Preston, « Exploration » de Kyle Preston, " +
                                "« Dark tension » de Kyle Preston, « Foreboding » de Kyle Preston, « Dont wake me up » de " +
                                "Josh Leake.",
                        R.drawable.surmonter_sa_tristesse,
                        22
                ),
                Sample(
                        "Faire son deuil",
                        "Faire son deuil",
                        "faire_son_deuil",
                        "faire-son-deuil.mp3",
                        "Alexandre Lockert, psychologue, psychothérapeute et hypnothérapeute (IFHE, Paris) " +
                                "vous aide aujourd'hui à surmonter la perte d'un proche (décès, divorce, rupture amicale), " +
                                "quand vous avez de la difficulté à faire votre deuil par vous-même." +
                                "\n\nCrédits audio : « Cast Riddance » de Dear Gravity, « Cold » de Borrtex, « Eternity » de " +
                                "Borrtex, « Rising Storm » de CK Martin, « Impavid » de Charlie Ryan, « Seven Years » de " +
                                "Josh Leake.",
                        R.drawable.faire_son_deuil,
                        35
                ),
                Sample(
                        "Soigner son passé",
                        "Soigner son passé",
                        "soigner_son_passe",
                        "soigner-son-passe.mp3",
                        "Souvent, nos soucis viennent d'un passé douloureux, que l'on peut travailler en thérapie " +
                                "personnelle. Ce travail peut être long et difficile. Surtout, il confronte à nouveau avec des expériences que l'on préfèrerait oublier. " +
                                "Cet accompagnement, sur vos Chemins de Lumière, est une régression symbolique vers vos racines transgénérationnelles " +
                                "(parents, grand-parents, etc). Le côté symbolique a l'avantage de permettre un travail sur le passé sans avoir besoin " +
                                "de revivre des souvenirs douloureux. De plus, par nature, les symboles incluent davantage d'élements que des souvenirs " +
                                "concrets - sans que l'on sache.",
                        R.drawable.soigner_son_passe,
                        23
                ),
                Sample(
                        "Intuition",
                        "Développer son intuition",
                        "intuition",
                        "intuition.mp3",
                        "Le domaine de l'intuition est bien plus vaste qu'il n'y parait à première vue. " +
                                "Les personnes en meilleure santé vivent et se nourrissent intuitivement mieux que les autres. Elles ne le font " +
                                "pas exprès. Prenons l'exemple d'une personne à qui tout réussi, qui a de la chance : elle semble savoir " +
                                "à chaque fois quoi faire, et pourtant ce n'est ni conscient, ni volontaire… C'est cela, " +
                                "l'intuition : le ressenti profond qui guide vos pas, souvent même sans que vous ne le sachiez. C'est ce qu'il y a de " +
                                "plus important pour vivre bien et en bonne santé, pour réussir sa vie et suivre le chemin qui a du coeur. Texte co-écrit par " +
                                "Patricia d'Angeli et Olivier Lockert. Le fond musical est d'Olivier Lockert.",
                        R.drawable.intuition,
                        32
                ),
                Sample(
                        "Prise de décision",
                        "Prise de décision",
                        "prise_de_decision",
                        "prise-de-decision.mp3",
                        "Cette séance peut vous aider pour les situations de conflit, les dilemmes, ainsi que " +
                                "pour renforcer votre conviction et votre stabilité intérieure, en cas de prise de position " +
                                "décisive pour le futur. La technique choisie (\"Reconstruction Hypnotique\", en " +
                                "Nouvelle Hypnose) permet de stimuler la synthèse de votre Inconscient. Elle passe par " +
                                "une métaphore polymorphique, afin de s'adapter au plus grand nombre. Texte et " +
                                "voix d'Olivier Lockert." +
                                "\n\nCrédits audio : « Solitude » de Michelle Nobler, « The Rain » de Sid Acharya, " +
                                "« The Sky » de Sid Acharya, « Things We Would 'nt Say » de Mickael FK, « Faith » de " +
                                "Mickael FK, « Incandescent With Passion » de CK Martin.",
                        R.drawable.prise_de_decision,
                        42
                ),
                Sample(
                        "Immersion sensorielle",
                        "Immersion sensorielle",
                        "immersion_sensorielle",
                        "immersion-sensorielle.mp3",
                        "Cette séance vient en conclusion de la préparation progressive à l’auto-hypnose. C’est l’étape " +
                                "juste avant de passer aux inductions hypnotiques. Cette séance est un exemple d’application. En " +
                                "apprenant l’auto-hypnose, vous utiliserez vos propres pensées, vos phrases personnelles, différentes " +
                                "des miennes. Ce sera à la fois plus simple pour vous et plus adapté, car tout viendra de vous. " +
                                "Texte d'Olivier Lockert.",
                        R.drawable.immersion_sensorielle,
                        24
                ),
                Sample(
                        "Nouveau départ",
                        "Prendre un nouveau départ",
                        "nouveau_depart",
                        "nouveau-depart.mp3",
                        "Alexandre Lockert, psychologue, psychothérapeute et hypnothérapeute (IFHE, Paris) " +
                                "vous aide à vous libérer des restes du passé et à épurer votre environnement pour mieux " +
                                "vous propulser dans un avenir meilleur. La technique choisie est celle de l'Eclosion, " +
                                "en Hypnose Humaniste. La musique crescendo au final apaisée est de Pascal Lengagne.",
                        R.drawable.nouveau_depart,
                        32
                ),
                Sample(
                        "Réussir sa vie",
                        "Réussir sa vie",
                        "reussir_sa_vie",
                        "reussir-sa-vie.mp3",
                        "Cet accompagnement en Hypnose Humaniste vous propose de travailler sur ce qui bloque éventuellement en vous, " +
                                "afin que vous soyez pleinement ouvert au monde et connecté à vous-même, intuitif et capable de marcher " +
                                "chaque jour sur votre meilleur chemin de vie. Texte et musique d'Olivier Lockert.",
                        R.drawable.reussir_sa_vie,
                        36
                ),
                Sample(
                        "Magie intérieure",
                        "Activer votre magie intérieure",
                        "magie_interieur",
                        "magie-interieur.mp3",
                        "Cet accompagnement d'Olivier Lockert vous aidera à activer vos " +
                                "ressources profondes et inconscientes. Vous pourrez demander l'aide de votre esprit " +
                                "profond pour résoudre des problèmes pour lesquels vous n'avez pas de solution, ou pour " +
                                "améliorer votre quotidien, même si tout va déjà très bien. Le texte et la musique sont d'Olivier Lockert.",
                        R.drawable.magie_interieur,
                        41
                ),
                Sample(
                        "Bain d'Hypnose",
                        "Bain d'Hypnose",
                        "bain_d_hypnose",
                        "bain-d-hypnose.mp3",
                        "Cet enregistrement vous permet de vous ressourcer, en vous laissant " +
                                "simplement \"baigner dans l'hypnose\", comme on le faisait il y a des millénaires dans les " +
                                "fameux Temples d'Aesclapios, à l'époque antique. Vous pouvez utiliser cette séance dans les " +
                                "moments de stress, pour retrouver votre énergie, dans les périodes de fatigue ou pour " +
                                "une convalescence. Ecoutez la séance de préférence avec un casque audio, afin de profiter au " +
                                "mieux de l'accompagnement musical. Le texte est d’Olivier Lockert et la musique a été composée " +
                                "par Pascal Lengagne.",
                        R.drawable.bain_d_hypnose,
                        40
                ),
                Sample(
                        "Voyage en imagination",
                        "Voyage en imagination",
                        "voyage_en_imagination",
                        "voyage-en-imagination.mp3",
                        "Besoin de prendre l'air, de vous aérer ou de changer un peu d'horizon ? Voici ce qui " +
                                "va vous aider à retrouver un peu d'énergie et de bonne humeur. Cette séance n'est pas à " +
                                "proprement parler \"thérapeutique\", elle n'inclut ni techniques de langage, ni protocole " +
                                "thérapeutique. C'est une métaphore, structurée sur plusieurs niveaux de symboles, que vous " +
                                "reconnaitrez facilement. Vous n'avez rien à faire d'autre que profiter du moment, vous " +
                                "laisser porter, que vous restiez conscient ou non. Bon voyage !" +
                                "\n\nCrédits audio : « Regenerate-iii » de E-J-R-M, « Dream » de Tom Goldstein, « Daydreamer » " +
                                "de Tom Goldstein, « Patrick Day » de Tom Goldstein, « Morning Sunshine » de Tom " +
                                "Goldstein, « Hills & Valley » de Marshall Usinger, « She », Josh Lake.",
                        R.drawable.voyage_en_imagination,
                        35
                ),
                Sample(
                        "Auto-Hypnose",
                        "Auto-Hypnose",
                        "auto_hypnose",
                        "auto-hypnose.mp3",
                        "Cet enregistrement peut vous aider avant " +
                                "une thérapie ou avant une formation en hypnose ou auto-hypnose. " +
                                "Le texte est en \"tu\", car c'est ainsi que vous aurez à vous parler ensuite, " +
                                "lorsque vous pratiquerez tout seul. En fait, pas besoin de parler vraiment, ni même " +
                                "de penser exactement à ces phrases, il suffit d'avoir l'intention que les choses se " +
                                "fassent - et cela fonctionnera tout seul. Se tutoyer soi-même (ou parler à l'Inconscient) " +
                                "permet la dissociation, à la base de l'état d'hypnose.",
                        R.drawable.auto_hypnose,
                        21
                ),
                Sample(
                        "L\'Inconscient",
                        "Contacter son inconscient",
                        "l_inconscient",
                        "l-inconscient.mp3",
                        "Voici les bases, en hypnose, pour contacter et converser avec votre Inconscient : vous apprendrez à établir " +
                                "un signaling, d'abord sans signification particulière, puis en stipulant les signes oui et non, " +
                                "ce qui vous permettra d'obtenir des réponses directes de votre Inconscient. Dans la seconde partie de l'accompagnement, " +
                                "vous apprendrez à interagir symboliquement avec votre Inconscient.",
                        R.drawable.l_inconscient,
                        45
                ),
                Sample(
                        "Créateur de réalité",
                        "Créateur de réalité",
                        "createur_de_realite",
                        "createur-de-realite.mp3",
                        "Vous souhaitez en savoir plus sur l'art de créer votre réalité ? Quoi que vous ayez, quoi que " +
                                "vous recherchiez, il est facile de comprendre qu'en devenant \"créateur\" de votre vie, vous pourrez " +
                                "trouver une solution. Si vous avez su générer les problèmes de votre vie, en apprenant à créer votre réalité, " +
                                "vous vous fabriquerez une existence meilleure. Créer sa réalité est la base de toutes choses. " +
                                "La technique, aussi puissante soit-elle, ne fonctionne que grâce à vous. C'est en vous forgeant " +
                                "vous-même que vous réussirez à faire naître la vie de vos rêves. C'est probablement la chose la plus " +
                                "difficile, travailler sur soi, mais c'est aussi la plus belle de toute l'existence.",
                        R.drawable.createur_de_realite,
                        47
                ),
                Sample(
                        "Expansion",
                        "Expansion de conscience",
                        "expansion",
                        "expansion.mp3",
                        "Cette enregistrement est un exemple d'induction hypnotique d'Hypnose Humaniste. L'induction est suivie d'un " +
                                "exemple d'intervention thérapeutique symbolique simple. Il est conçu pour plaire aux personnes plutôt \"cerveau droit\" (intuitives, fantaisistes, créatives). " +
                                "Il est possible que vous entriez dans une transe normale, dissociée conscient/inconscient. " +
                                "Pour éviter cela, il faut réellement vous accrocher ici et maintenant, quitte à ne pas entrer en transe au début. " +
                                "Il est plus facile de se laisser emporter par l'Inconscient que de gagner en conscience !",
                        R.drawable.expansion,
                        24
                ),
                Sample(
                        "Histoire de la vie",
                        "Histoire de la vie (récit)",
                        "histoire_de_la_vie",
                        "histoire-de-la-vie.mp3",
                        "Olivier Lockert vous présente la structure existentielle, la vaste vision de la " +
                                "Vie de l’Hypnose Humaniste. Cette présentation a pris les formes d’une histoire, comme un " +
                                "conte, afin de conserver la liberté de penser en termes philosophiques et psychologiques, " +
                                "plutôt que seulement appuyé sur des bases concrètes et vérifiables. Si vous recherchez " +
                                "seulement l’aspect thérapeutique de l’Hypnose Humaniste, vous ne serez probablement pas " +
                                "intéressé par ce récit. Texte d'Olivier Lockert et voix de Patricia d'Angeli.",
                        R.drawable.histoire_de_la_vie,
                        46
                ),
                Sample(
                        "La Conscience",
                        "La Conscience (récit)",
                        "la_conscience",
                        "la-conscience.mp3",
                        "Olivier Lockert vous présente la version audio de son article sur \"La Conscience: " +
                                "elle existe et ça se voit !\". Si vous recherchez seulement l’aspect thérapeutique " +
                                "de l’Hypnose Humaniste, vous ne serez probablement pas intéressé par ce récit. Texte et " +
                                "voix d'Olivier Lockert.",
                        R.drawable.la_conscience,
                        40
                ),
        )
)
