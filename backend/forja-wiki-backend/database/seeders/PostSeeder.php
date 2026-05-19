<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\TipusEina;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $proteccio = TipusEina::where('nom', 'Proteccio')->first();
        $armes = TipusEina::where('nom', 'Armes')->first();
        $agricoles = TipusEina::where('nom', 'Eines agricoles')->first();
        $estris = TipusEina::where('nom', 'Estris varis')->first();
        $materials = TipusEina::where('nom', 'Materials')->first();
        $tecniques = TipusEina::where('nom', 'Tecniques')->first();

        Post::insert([
            [
                'titol' => 'Espasa de doble tall',
                'descripcio' => 'Espasa de doble tall forjada artesanalment en acer d’alta qualitat, concebuda per oferir un equilibri perfecte entre capacitat ofensiva, durabilitat i maniobrabilitat en combat. La seva elaboració segueix els mètodes tradicionals de la forja medieval, on el metall és escalfat en una farga alimentada amb carbó fins a assolir temperatures extremes que permeten modelar-lo amb precisió. El procés de fabricació inclou diverses fases de martelleig repetit, plegat de l’acer i refinament de la fulla per eliminar impureses internes i millorar la seva estructura molecular.
                
                Aquesta espasa ha estat dissenyada amb un doble tall esmolat que permet tant estocades ràpides com talls amplis i contundents, adaptant-se a diferents estils de combat, des del duel individual fins a la batalla campal. El seu centre de gravetat ha estat acuradament calibrat per garantir una manipulació fluida, reduint la fatiga del portador durant combats prolongats.
                
                Un dels elements més destacats de la seva construcció és el procés de trempat, en què la fulla roent és refredada ràpidament en un medi controlat, normalment oli o aigua, per augmentar-ne la duresa i la resistència estructural. Posteriorment, es realitza el revingut, una tècnica que redueix la fragilitat del metall i assegura un equilibri òptim entre flexibilitat i fermesa.

                El mànec està reforçat amb fusta dura recoberta de cuir treballat manualment per oferir una subjecció segura i ergonòmica, mentre que la guarda metàl·lica protegeix la mà del combatent davant impactes directes. El pom posterior no només equilibra el pes de la fulla, sinó que també pot ser utilitzat com a element ofensiu en situacions extremes.

                Aquesta espasa és pròpia de guerrers entrenats i cavallers experimentats, sent un símbol tant de prestigi com de destresa marcial. La seva presència evoca l’esperit de l’Edat Mitjana, on l’art de la guerra i la forja eren disciplines profundament connectades, i cada arma era considerada una peça única, gairebé viva, forjada amb dedicació i coneixement ancestral.',
                'epoca' => '400',
                'imatge' => 'posts/espasa.png',
                'user_id' => 1,
                'tipus_eina_id' => $armes->id,
            ],
            [
                'titol' => 'Trident de pesca',
                'descripcio' => 'Eina de pesca d’origen antic, composta per un mànec llarg de fusta resistent i tres puntes metàl·liques afilades, forjades amb precisió per maximitzar la penetració i la retenció del peix en aigües poc profundes. El seu disseny sorgeix de la necessitat de les primeres comunitats costaneres i fluvials de capturar aliments de manera eficient, aprofitant la mobilitat i la força de l’usuari per atrapar preses en entorns aquàtics on altres mètodes resultaven menys efectius.

                Les tres puntes del trident han estat acuradament esmolades i disposades en forma simètrica, permetent augmentar la probabilitat d’impacte en un sol moviment. Aquesta configuració no només facilita la captura de peixos de mida petita i mitjana, sinó que també resulta útil per immobilitzar criatures més grans en aigües tèrboles o en moviment constant. El disseny trifurcat és fruit d’una observació directa de la natura i d’una evolució progressiva de les eines de caça aquàtica utilitzades per civilitzacions antigues.

                El mànec, habitualment construït amb fustes lleugeres però resistents a la humitat, ha estat tractat per evitar la degradació causada per l’aigua salada o dolça. En moltes cultures antigues, aquest mànec era reforçat amb cordes vegetals o fibres naturals per millorar-ne la subjecció, especialment durant la pesca nocturna o en condicions adverses. La longitud del trident permet mantenir una distància segura respecte a l’aigua, reduint el risc i augmentant la precisió dels moviments.

                El procés de fabricació de les puntes metàl·liques implica la forja en foc obert, on el metall és escalfat i modelat fins aconseguir una forma allargada i penetrant. Posteriorment, s’esmola cada punta amb pedra o eines abrasives fins obtenir un tall suficientment fi per travessar escates i teixits amb eficàcia. En alguns casos, les puntes podien ser lleugerament corbades cap a l’interior per evitar que la presa s’escapés després de ser perforada.

                Més enllà del seu ús pràctic, el trident també ha estat un símbol cultural en diverses civilitzacions antigues, associat sovint a deïtats marines o figures vinculades al domini dels oceans i rius. Aquesta càrrega simbòlica reforça la seva importància no només com a eina de subsistència, sinó també com a objecte de respecte dins de les comunitats que depenien del mar i dels recursos aquàtics per sobreviure.

                L’ús del trident requereix habilitat, coordinació i una comprensió profunda del comportament dels peixos i del moviment de l’aigua, convertint-lo en una extensió del cos del pescador més que en una simple eina. Amb el pas del temps, aquesta eina ha evolucionat, però la seva essència continua essent fidel als seus orígens: la captura eficient i precisa en entorns aquàtics.',
                'epoca' => '-500',
                'imatge' => 'posts/trident.jpg',
                'user_id' => 2,
                'tipus_eina_id' => $armes->id,
            ],
            [
                'titol' => 'Escut metàl·lic reforçat',
                'descripcio' => 'Escut de guerra d’origen medieval, elaborat en ferro forjat i reforçat amb estructures metàl·liques addicionals als laterals i al centre per augmentar la seva resistència davant impactes contundents. La seva construcció respon a la necessitat dels guerrers de disposar d’un element de defensa fiable en el camp de batalla, capaç d’absorbir i redirigir la força de cops provinents d’espases, destrals, llances i altres armes de l’època.

                El procés de fabricació d’aquest escut comença amb la selecció de planxes de ferro d’alta densitat, que són escalfades en una farga fins assolir un estat mal·leable. Un cop el metall es troba en condicions òptimes, és martellejat i corbat amb precisió per donar-li una forma lleugerament convexa, dissenyada per dispersar l’energia dels impactes i evitar que la força es concentri en un únic punt. Aquesta curvatura també contribueix a desviar els atacs laterals, augmentant la supervivència del portador en combat.

                Els reforços metàl·lics, situats estratègicament al centre i al perímetre de l’escut, tenen la funció de consolidar-ne l’estructura i evitar deformacions després d’impactes repetits. Aquests elements poden adoptar la forma de nervadures, creus metàl·liques o bandes de ferro que distribueixen la pressió de manera uniforme. En molts casos, aquests reforços també complien una funció simbòlica, representant la identitat del llinatge, l’ordre militar o el regne al qual pertanyia el guerrer.

                La part posterior de l’escut està equipada amb un sistema de subjecció format per corretges de cuir reforçat, ajustades manualment per garantir una adherència ferma a l’avantbraç. Aquest sistema permet al portador mantenir el control de l’escut fins i tot en situacions de combat intens, facilitant moviments ràpids de bloqueig, empenta i reposicionament. La ergonomia del disseny busca reduir la fatiga del braç durant llargues jornades de batalla o entrenament.

                El ferro utilitzat en la seva fabricació ha estat tractat mitjançant processos de trempat i revingut, amb l’objectiu d’aconseguir un equilibri entre duresa i flexibilitat estructural. Aquesta combinació permet que l’escut pugui absorbir grans quantitats d’energia sense fracturar-se, mantenint la seva integritat fins i tot després de múltiples enfrontaments. En alguns casos, la superfície exterior podia ser recoberta amb capes de pintura, cuir o altres materials per prevenir la corrosió i millorar la seva aparença.

                Aquest tipus d’escut era àmpliament utilitzat durant l’Edat Mitjana per cavallers, soldats d’infanteria i guàrdies de fortaleses, convertint-se en un element essencial dins de les tàctiques defensives de formacions militars. La seva presència al camp de batalla no només representava protecció física, sinó també disciplina, estratègia i cohesió entre els combatents.

                Amb el temps, l’escut metàl·lic reforçat es va convertir en un símbol de resistència i supervivència, associat a la perseverança dels guerrers que depenien de la seva solidesa per mantenir-se vius enmig del caos de la guerra medieval.',
                'epoca' => '400',
                'imatge' => 'posts/escut.png',
                'user_id' => 2,
                'tipus_eina_id' => $proteccio->id,
            ],
            [
                'titol' => 'Armadura completa',
                'descripcio' => 'Conjunt de protecció corporal d’alta complexitat tècnica, format per múltiples peces de metall articulades entre si, dissenyat per oferir una cobertura integral del cos del guerrer sense comprometre excessivament la mobilitat en combat. Aquesta armadura representa l’evolució culminant de la protecció personal durant l’Edat Mitjana, fruit de segles d’experimentació en la forja, l’enginyeria militar i l’experiència directa al camp de batalla.

                La seva construcció es basa en la combinació de plaques d’acer o ferro temperat, modelades individualment per adaptar-se a les diferents zones anatòmiques del cos humà. Cada peça és forjada, corbada i ajustada amb precisió artesanal, buscant una encaix perfecta entre segments que permeti el moviment fluid de braços, cames, espatlles i articulacions principals. Aquest sistema articulat és essencial per garantir que el portador pugui combatre, muntar a cavall o desplaçar-se sense perdre eficàcia operativa.

                El procés de fabricació d’una armadura completa és llarg i extremadament meticulós. Els mestres armers seleccionen el metall segons la seva qualitat i resistència, sotmetent-lo a repetits processos de calefacció i martelleig per augmentar-ne la densitat estructural. Posteriorment, les peces són ajustades directament sobre maniquins de fusta o sobre el propi usuari, assegurant una adaptació anatòmica precisa. Aquest nivell de personalització converteix cada armadura en una peça única, gairebé irrepetible.

                Les zones més vulnerables del cos, com el pit, les espatlles, els genolls i el casc, estan reforçades amb capes addicionals de metall o amb plaques més gruixudes, dissenyades per resistir impactes directes d’armes contundents com espases, llances o martells de guerra. Les articulacions, en canvi, utilitzen sistemes de làmines superposades o segments mòbils que permeten flexió sense exposar punts febles.

                A l’interior, l’armadura incorpora un sistema de folrat en cuir i teixits encoixinats que compleixen una doble funció: d’una banda, absorbir part de l’impacte dels cops rebuts; de l’altra, evitar el contacte directe del metall amb la pell, reduint fregaments, lesions i la incomoditat durant períodes prolongats d’ús. Aquest interior també ajuda a distribuir el pes de manera més uniforme sobre el cos del portador.

                Malgrat la seva aparença robusta i pesada, una armadura ben dissenyada permet una sorprenent llibertat de moviment, especialment quan és fabricada a mida per a un cavaller entrenat. No obstant això, el seu ús requereix un alt nivell de preparació física, ja que el pes global pot ser considerable i la seva eficàcia depèn en gran mesura de la resistència i habilitat del guerrer.

                Més enllà de la seva funció defensiva, l’armadura completa també actua com a símbol de poder, estatus i autoritat dins la societat medieval. Sovint decorada amb gravats, escuts heràldics o elements ornamentals, reflecteix la identitat del seu portador i la seva posició dins de l’ordre militar o nobiliari.

                Aquesta peça representa no només una eina de guerra, sinó també el resultat d’un coneixement artesanal avançat, on la metal·lúrgia, l’enginyeria i l’art convergeixen per crear una de les formes de protecció més sofisticades de l’època medieval.',
                'epoca' => '400',
                'imatge' => 'posts/armadura.png',
                'user_id' => 2,
                'tipus_eina_id' => $proteccio->id,
            ],
            [
                'titol' => 'Falç agrícola',
                'descripcio' => 'Eina agrícola tradicional de fulla corba, forjada en metall resistent i muntada sobre un mànec curt de fusta, dissenyada específicament per a la sega manual de cereals, herba i altres cultius baixos. La seva forma característica semicircular permet realitzar talls continus i eficients amb un moviment de balanceig, optimitzant l’esforç del treballador i facilitant la recol·lecció en camps extensos.

                L’origen de la falç es remunta a les primeres societats agrícoles, on la necessitat de recol·lectar grans quantitats de vegetació comestible va impulsar el desenvolupament d’eines cada vegada més eficients. Amb el temps, el seu disseny ha estat perfeccionat per diferents cultures, mantenint sempre la seva essència funcional: una fulla afilada, lleugerament corbada, capaç de tallar tiges amb precisió i rapidesa.

                El procés de fabricació de la fulla implica la forja del metall a altes temperatures, seguida d’un modelatge acurat per aconseguir la curvatura ideal. Posteriorment, la vora tallant és esmolada fins assolir un grau de precisió elevat, suficient per tallar vegetació densa amb un mínim esforç. En molts casos, la fulla es sotmet a processos de trempat per augmentar-ne la duresa i la durabilitat, evitant que s’embussi o es deformi amb l’ús continuat.

                El mànec, generalment de fusta robusta però lleugera, està dissenyat per oferir una subjecció còmoda i estable. La seva longitud curta permet un control directe de l’eina, facilitant moviments repetitius i precisos durant llargues jornades de treball agrícola. En algunes variants tradicionals, el mànec pot incloure petites corbes o textures per millorar l’adherència de la mà.

                L’ús de la falç requereix tècnica i coordinació, ja que el moviment de sega implica un ritme constant i una postura adequada per maximitzar l’eficiència i reduir la fatiga. Els agricultors experimentats desenvolupen una gran habilitat en el seu maneig, aconseguint tallar grans superfícies de cultiu amb rapidesa i regularitat.

                A més de la seva funció pràctica, la falç ha tingut un fort valor simbòlic al llarg de la història, representant el treball agrícola, la collita i la relació directa entre l’ésser humà i la terra. Ha estat una eina essencial en economies rurals i comunitats tradicionals, on la supervivència depenia directament de l’eficiència en la recol·lecció dels aliments.

                Amb el pas del temps, tot i la introducció de maquinària moderna, la falç continua essent utilitzada en contextos rurals i agrícoles específics, mantenint viu un sistema de treball manual que connecta amb les pràctiques agrícoles més antigues de la humanitat.',
                'epoca' => '1600',
                'imatge' => 'posts/falc.jpg',
                'user_id' => 3,
                'tipus_eina_id' => $agricoles->id,
            ],
            [
                'titol' => 'Aixada de ferro',
                'descripcio' => 'Eina agrícola robusta i essencial, formada per una fulla ampla de ferro forjat unida perpendicularment a un mànec llarg de fusta resistent, dissenyada per excavar, remoure i preparar el sòl abans de la sembra. La seva estructura senzilla però eficaç l’ha convertit en una de les eines més utilitzades en l’agricultura tradicional al llarg de la història, especialment en entorns rurals on el treball manual de la terra és fonamental per a la producció d’aliments.

                La fulla de l’aixada es fabrica mitjançant processos de forja en calent, on el metall és escalfat fins a tornar-se mal·leable i posteriorment modelat amb martellades precises per aconseguir una superfície plana i resistent. Aquesta fulla pot presentar lleugeres variacions en forma i gruix segons el seu ús específic, ja sigui per llaurar terres dures, trencar terrenys compactats o eliminar males herbes. El procés de trempat posterior li confereix una major duresa i resistència al desgast, permetent un ús prolongat en condicions exigents.

                El mànec, habitualment elaborat amb fusta dura com el roure o el freixe, està dissenyat per suportar grans esforços mecànics. La seva longitud permet al treballador adoptar una postura eficient, utilitzant el pes del propi cos per aplicar força sobre el sòl. En alguns models tradicionals, el mànec pot estar lleugerament corbat o reforçat per millorar la comoditat i reduir l’impacte repetitiu sobre els braços i les espatlles.

                L’aixada és una eina fonamental en la preparació del terreny agrícola, ja que permet airejar la terra, trencar crostes superficials, eliminar arrels no desitjades i facilitar la infiltració d’aigua i nutrients. El seu ús requereix tècnica i resistència física, especialment en terrenys durs o poc treballats, on cada cop de fulla ha de ser precís i eficient.

                Històricament, aquesta eina ha estat indispensable en l’evolució de les societats agrícoles, permetent el desenvolupament de cultius més extensos i productius. Ha estat utilitzada tant en petites hortes familiars com en grans explotacions agrícoles, mantenint sempre el seu paper com a instrument bàsic de treball de la terra.

                Més enllà de la seva funcionalitat, l’aixada també simbolitza l’esforç humà, la connexió amb la natura i la transformació del paisatge mitjançant el treball constant. És una eina que representa la base de l’agricultura tradicional i el fonament de moltes civilitzacions que han depès del conreu per a la seva supervivència.',
                'epoca' => '800',
                'imatge' => 'posts/aixada.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $agricoles->id,
            ],
            [
                'titol' => 'Ganivet de cuina forjat',
                'descripcio' => 'Eina de tall artesanal d’alta precisió, elaborada mitjançant tècniques tradicionals de forja combinades amb acabats moderns, destinada a l’ús culinari professional i domèstic d’alt nivell. La seva fulla està fabricada en acer d’alta qualitat, seleccionat per la seva capacitat de mantenir un tall esmolat durant períodes prolongats, així com per la seva resistència a la corrosió i a l’ús intensiu en entorns de cuina exigents.

                El procés de fabricació comença amb la selecció del bloc d’acer, que és escalfat a altes temperatures fins assolir un estat mal·leable. A partir d’aquí, el metall és forjat i modelat amb cops precisos per donar forma a una fulla equilibrada, on es combina funcionalitat i ergonomia. Aquest procés artesanal permet controlar la densitat del metall i reduir imperfeccions internes, aconseguint una estructura més homogènia i duradora.

                Posteriorment, la fulla passa per processos de trempat i revingut, que li confereixen una duresa òptima sense sacrificar flexibilitat. Aquest equilibri és essencial per evitar que el ganivet es trenqui o perdi el fil durant tasques de tall intensives. La vora és afilada amb gran precisió fins assolir un tall extremadament fi, capaç de realitzar talls nets sobre carn, peix, verdures i altres ingredients culinaris.

                El disseny del ganivet està pensat per oferir una ergonomia excel·lent. El seu equilibri entre fulla i mànec permet un control precís durant l’ús, reduint la fatiga de la mà i millorant la seguretat en el tall. El mànec, sovint fabricat en fusta tractada, resines o materials compostos, està dissenyat per oferir una subjecció ferma i còmoda fins i tot en condicions d’humitat pròpies de la cuina.

                Aquest tipus de ganivet és especialment valorat en la cuina professional, on la precisió i la rapidesa són essencials. Xefs i cuiners el consideren una extensió de la seva pròpia mà, utilitzant-lo per tècniques de tall avançades que requereixen control absolut i sensibilitat en el moviment.

                A més de la seva funcionalitat, el ganivet de cuina forjat també representa una fusió entre tradició artesanal i tecnologia moderna. La seva elaboració reflecteix el coneixement acumulat durant segles de treball del metall, adaptat a les necessitats contemporànies de la gastronomia.

                Amb el seu ús continuat, aquest ganivet esdevé una eina personalitzada, ja que s’adapta progressivament a l’estil de tall del seu usuari, convertint-se en una peça indispensable dins de qualsevol entorn culinari professional o domèstic avançat.',
                'epoca' => '-1000',
                'imatge' => 'posts/ganivet.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $estris->id,
            ],
            [
                'titol' => 'Ferradures',
                'descripcio' => 'Peça metàl·lica corbada, fabricada habitualment en ferro forjat o acer, dissenyada específicament per protegir i reforçar les peülles dels cavalls davant el desgast provocat pel contacte continu amb superfícies dures, pedregoses o irregulars. La ferradura representa una de les innovacions més importants en la relació entre l’ésser humà i el cavall, ja que permet estendre la seva utilitat en àmbits com el transport, l’agricultura i les activitats militars.

                El procés de fabricació de les ferradures es realitza mitjançant la forja del metall en calent, on el material és escalfat fins a tornar-se mal·leable i posteriorment modelat sobre encluses especialitzades per obtenir la forma corbada característica que s’adapta a la peülla. Cada ferradura pot variar lleugerament en mida i forma segons l’anatomia del cavall, ja que un ajust precís és essencial per garantir comoditat i funcionalitat.

                Un cop forjada, la peça és refredada i posteriorment polida per eliminar irregularitats que puguin causar fricció o danys a la peülla. En alguns casos, s’hi afegeixen claus o forats específics que permeten fixar-la de manera segura a la peülla del cavall, assegurant que es mantingui estable fins i tot durant desplaçaments prolongats o terrenys difícils.

                La funció principal de la ferradura és protegir la peülla natural del desgast excessiu, especialment en cavalls que treballen habitualment sobre superfícies artificials com camins empedrats o carreteres. A més, també contribueix a millorar l’estabilitat i l’adherència del cavall, reduint el risc de lesions i augmentant la seva eficiència en el moviment.

                El ferratge és un procés que requereix habilitat i coneixement especialitzat, realitzat per ferrers professionals que estudien l’anatomia i el comportament del cavall per adaptar cada ferradura de manera individualitzada. Aquest treball inclou la neteja i preparació de la peülla, l’ajust de la peça metàl·lica i la seva fixació acurada, assegurant el benestar de l’animal.

                Històricament, la introducció de les ferradures va suposar una gran revolució en el transport i la mobilitat, permetent que els cavalls fossin utilitzats de manera més intensiva i eficient en diferents civilitzacions. La seva presència va tenir un impacte directe en el desenvolupament econòmic i militar de moltes societats tradicionals.

                Més enllà de la seva funció pràctica, la ferradura també ha adquirit un fort simbolisme cultural associat a la bona sort i la protecció, convertint-se en un element present en tradicions i creences populars en diverses cultures.',
                'epoca' => '-500',
                'imatge' => 'posts/ferradura.png',
                'user_id' => 3,
                'tipus_eina_id' => $estris->id,
            ],
            [
                'titol' => 'Lingot de ferro',
                'descripcio' => 'Bloc sòlid de ferro refinat, obtingut a través de processos metal·lúrgics de fosa i solidificació, utilitzat com a matèria primera essencial en la forja i la fabricació d’eines, armes i estructures metàl·liques. Aquest tipus de peça representa un dels elements fonamentals de la cadena productiva del metall, ja que constitueix l’estat intermedi entre el mineral extret de la terra i els objectes acabats destinats a l’ús pràctic o industrial.

                El procés d’elaboració del lingot de ferro comença amb l’extracció del mineral de ferro, que és posteriorment sotmès a processos de reducció en alts forns a temperatures extremadament elevades. Durant aquesta fase, el mineral és separat de les seves impureses mitjançant la combinació de calor intens i agents reductors com el carboni, donant lloc a ferro fos en estat líquid. Aquest metall líquid és abocat en motlles específics on es deixa refredar i solidificar fins adquirir la seva forma característica de bloc compacte.

                Un cop solidificat, el lingot presenta una estructura densa i homogènia que facilita el seu transport, emmagatzematge i posterior manipulació en tallers de forja o instal·lacions industrials. La seva forma estàndard permet optimitzar el procés de reescalfament, ja que es pot tornar a portar fàcilment a l’estat mal·leable necessari per a la seva transformació en productes finals.

                El ferro contingut en els lingots pot variar en puresa i composició depenent del procés de refinament utilitzat. En aplicacions més avançades, el material pot ser aliat amb altres elements com el carboni, el níquel o el crom per millorar les seves propietats mecàniques, com la resistència, la duresa o la resistència a la corrosió.

                En el context de la forja tradicional, el lingot de ferro és escalfat en fargues fins assolir temperatures que permeten la seva deformació mitjançant cops de martell i l’ús d’eines especialitzades. Aquest procés transforma el bloc inicial en una gran varietat d’objectes útils, des d’eines agrícoles fins a armes i components estructurals.

                Històricament, la producció i manipulació del ferro ha estat un dels pilars fonamentals del desenvolupament tecnològic de les civilitzacions, marcant l’inici de l’Edat del Ferro i permetent avenços significatius en l’agricultura, la guerra i la construcció. El lingot, com a forma bàsica del metall, simbolitza aquest punt d’origen de la transformació industrial.

                Actualment, el lingot de ferro continua essent una peça clau en la indústria metal·lúrgica moderna, servint com a base per a processos de fabricació massiva i producció de materials d’enginyeria avançada.',
                'epoca' => '-4000',
                'imatge' => 'posts/lingot.png',
                'user_id' => 3,
                'tipus_eina_id' => $materials->id,
            ],
            [
                'titol' => 'Carbó vegetal per forja',
                'descripcio' => 'Combustible tradicional d’origen orgànic, obtingut mitjançant la carbonització lenta de fusta en absència quasi total d’oxigen, utilitzat històricament com a font principal d’energia tèrmica en processos de forja i treball del metall. Aquest material és essencial en les fargues tradicionals, ja que permet assolir temperatures elevades i constants necessàries per escalfar el ferro fins al seu estat mal·leable.

                El procés d’obtenció del carbó vegetal comença amb la selecció de fustes adequades, generalment de boscos densos i de creixement lent, que són apilades i sotmeses a una combustió controlada en forns tancats, piles cobertes de terra o estructures similars. Durant aquest procés, la fusta es descompon tèrmicament, eliminant la major part de la seva humitat i compostos volàtils, i deixant com a residu un material ric en carboni amb una alta capacitat calorífica.

                Aquest tipus de combustible es caracteritza per la seva capacitat de cremar de manera intensa i relativament neta, generant una flama estable i una brasa persistent que pot mantenir-se durant llargues sessions de treball. Aquesta propietat el converteix en un element ideal per a les forges, on la constància de la temperatura és fonamental per al bon desenvolupament de la forja del metall.

                En l’àmbit de la metal·lúrgia tradicional, el carbó vegetal s’utilitza per escalfar lingots, peces metàl·liques i eines fins assolir el punt de deformació necessari per ser treballats amb martell i enclusa. La seva eficiència tèrmica permet concentrar la calor en punts específics, optimitzant el consum de combustible i facilitant el control del procés de forja.

                A més de la seva funció pràctica, el carbó vegetal també ha estat històricament un recurs estratègic, ja que la seva producció requeria grans quantitats de fusta i coneixements especialitzats. Les comunitats que dominaven la seva fabricació disposaven d’un avantatge significatiu en la producció d’eines i armes, contribuint al desenvolupament tecnològic i econòmic de diverses civilitzacions.

                El seu ús a les fargues tradicionals està íntimament lligat a la figura del ferrer, que depèn del control del foc i de la temperatura per transformar el metall en objectes útils. La qualitat del carbó vegetal influeix directament en el resultat final de la forja, afectant la duresa, la resistència i la qualitat estructural de les peces fabricades.

                Encara avui, el carbó vegetal continua essent utilitzat en determinats processos artesanals i recreacions històriques, mantenint viu el coneixement ancestral de les tècniques de treball del metall en forja tradicional.',
                'epoca' => '-8000',
                'imatge' => 'posts/carbo.jpg',
                'user_id' => 2,
                'tipus_eina_id' => $materials->id,
            ],
            [
                'titol' => 'Tècnica del trempat',
                'descripcio' => 'Procés metal·lúrgic fonamental consistent en el refredament ràpid d’un metall prèviament escalfat a alta temperatura, amb l’objectiu d’alterar la seva estructura interna i augmentar significativament la seva duresa i resistència mecànica. Aquesta tècnica és una de les fases més importants en la fabricació d’eines, armes i components metàl·lics que requereixen un equilibri precís entre fermesa i durabilitat.

                El procés de trempat s’inicia amb l’escalfament del metall fins a assolir una temperatura crítica, en la qual la seva estructura cristal·lina esdevé mal·leable i apta per a la transformació. Aquest escalfament es realitza habitualment en forges o forns especialitzats, utilitzant combustibles d’alta eficiència tèrmica com el carbó vegetal o altres fonts de calor controlada. Un cop el metall ha arribat al punt òptim, es procedeix immediatament a la fase de refredament.

                El refredament ràpid es duu a terme submergint la peça en un medi líquid, que pot ser aigua, oli o altres substàncies específiques segons les propietats desitjades. Aquest canvi brusc de temperatura provoca una transformació en l’estructura interna del metall, augmentant la seva duresa superficial i la seva capacitat de resistir deformacions o impactes. No obstant això, aquest procés també pot incrementar la fragilitat si no es controla adequadament.

                Per aquest motiu, el trempat sovint es complementa amb altres tècniques com el revingut, que consisteix en un escalfament posterior a menor temperatura per reduir tensions internes i millorar la tenacitat del material. Aquesta combinació permet obtenir metalls amb propietats equilibrades, aptes per a usos exigents en el camp de la forja i la metal·lúrgia.

                Històricament, la tècnica del trempat ha estat essencial en el desenvolupament de civilitzacions avançades, ja que va permetre la producció d’armes més resistents, eines més eficients i estructures metàl·liques més duradores. El coneixement d’aquest procés era considerat un saber especialitzat, transmès entre artesans i ferrers al llarg de generacions.

                El domini del trempat requereix una gran experiència, ja que factors com la temperatura exacta, el tipus de metall i el medi de refredament influeixen directament en el resultat final. Un error en qualsevol d’aquestes variables pot comprometre la integritat de la peça, provocant esquerdes, deformacions o pèrdua de funcionalitat.

                En l’actualitat, aquesta tècnica continua sent utilitzada tant en la indústria moderna com en la forja artesanal, mantenint-se com un pilar fonamental en la ciència dels materials i en la producció de components metàl·lics d’alta resistència.',
                'epoca' => '-1000',
                'imatge' => 'posts/trempat.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $tecniques->id,
            ],
            [
                'titol' => 'Tècnica del martelleig',
                'descripcio' => 'Procés tradicional de conformació del metall basat en l’aplicació de cops repetits i controlats amb un martell sobre una peça prèviament escalfada o en estat mal·leable, amb l’objectiu de modificar-ne la forma, l’estructura i les propietats mecàniques. Aquesta tècnica és una de les bases fonamentals de la forja artesanal i ha estat utilitzada durant segles en la creació d’eines, armes i objectes metàl·lics de tota mena.

                El martelleig es realitza habitualment quan el metall es troba a altes temperatures, moment en què la seva estructura interna permet la deformació sense fractura. El ferrer o artesà utilitza diferents tipus de martells segons la fase del procés, variant el pes, la forma del cap i la intensitat dels cops per aconseguir resultats específics. Els cops poden ser forts i profunds per modificar la forma general de la peça, o més lleugers i precisos per ajustar detalls i acabats.

                Durant el procés, el metall és sovint recolzat sobre una enclusa, una superfície massissa que permet transmetre l’energia dels impactes i controlar la direcció de la deformació. La combinació entre el martell, l’enclusa i la peça escalfada crea un sistema de treball altament eficient que permet transformar blocs de metall en objectes funcionals amb gran precisió artesanal.

                El martelleig no només serveix per donar forma al metall, sinó que també contribueix a millorar-ne les propietats internes. Els impactes repetits ajuden a compactar l’estructura del material, reduint impureses i alineant les fibres del metall, cosa que pot augmentar la seva resistència i durabilitat. Aquest efecte és especialment important en metalls treballats manualment, on la qualitat final depèn en gran mesura de la tècnica emprada.

                Aquesta tècnica requereix una gran habilitat, coordinació i experiència, ja que el control de la força i la precisió dels cops és essencial per evitar deformacions indesitjades o danys a la peça. Els mestres ferrers desenvolupen una sensibilitat especial que els permet “llegir” el metall i ajustar el seu treball en funció del comportament del material durant la forja.

                Històricament, el martelleig ha estat una de les tècniques més importants dins de la metal·lúrgia tradicional, utilitzada en la fabricació d’espases, escuts, eines agrícoles i estructures metàl·liques. La seva importància és tal que ha esdevingut un símbol del treball artesanal i de la transformació del metall mitjançant l’esforç humà directe.

                Encara avui, aquesta tècnica continua essent utilitzada en la forja artesanal i en determinats processos industrials, mantenint viu el coneixement ancestral de la manipulació del metall a través del foc i la força manual.',
                'epoca' => '-1000',
                'imatge' => 'posts/martelleig.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $tecniques->id,
            ],
            [
                'titol' => 'Llança de cavalleria',
                'descripcio' => 'Arma ofensiva de gran longitud utilitzada principalment per unitats de cavalleria durant l’Edat Mitjana i èpoques posteriors, dissenyada per aprofitar la velocitat del cavall i la força de l’impacte en càrrega. La seva estructura consisteix en un llarg eix de fusta resistent, habitualment de freixe o roure, amb una punta metàl·lica forjada a l’extrem superior, afilada per penetrar armadures lleugeres i escuts enemics.

                El procés de fabricació de la llança requereix una selecció acurada de la fusta, que ha de ser flexible però alhora capaç de suportar fortes tensions durant la càrrega. Un cop tallat i polit el mànec, es reforça amb anelles metàl·liques en punts estratègics per evitar fractures durant l’impacte. La punta, elaborada en ferro o acer, és forjada i esmolada fins aconseguir una forma allargada i penetrant.

                Aquesta arma era especialment efectiva en formacions de cavalleria pesada, on diversos cavallers carregaven de manera coordinada contra les línies enemigues, aprofitant la inèrcia del moviment per augmentar la força de penetració. El seu ús requeria una gran habilitat per mantenir l’equilibri i dirigir el cop amb precisió en moviment.

                A més de la seva funció militar, la llança també simbolitzava estatus i poder dins de les societats feudals, essent un element habitual en torneigs i cerimònies cavalleresques. Amb el temps, va evolucionar en diverses variants adaptades a diferents tàctiques de combat.',
                'epoca' => '1000',
                'imatge' => 'posts/llanca.jpg',
                'user_id' => 2,
                'tipus_eina_id' => $armes->id,
            ],

            [
                'titol' => 'Casco tancat medieval',
                'descripcio' => 'Element de protecció cranial utilitzat per guerrers i cavallers medievals, fabricat en acer reforçat i dissenyat per cobrir completament el cap, incloent la cara, amb obertures estratègiques per a la respiració i la visió. Aquest tipus de casc representa una evolució avançada dels sistemes de protecció personal, pensat per oferir la màxima seguretat en combat cos a cos.

                La seva fabricació implica la conformació de làmines d’acer escalfades que són modelades fins aconseguir una estructura arrodonida i resistent. Les unions entre peces són reforçades amb reblons i soldadures artesanals que asseguren la integritat estructural davant impactes directes. L’interior es folra amb cuir i materials encoixinats per absorbir cops i millorar la comoditat.

                El disseny del casc inclou ranures per a la visió lateral i frontal, així com perforacions per facilitar la respiració durant esforços prolongats. Alguns models incorporen viseres mòbils que es poden aixecar o abaixar segons la necessitat tàctica del combat.

                Aquest tipus de protecció era essencial en camps de batalla intensos, ja que reduïa significativament lesions mortals al cap, una de les zones més vulnerables del cos humà. També era un símbol de rang i prestigi dins de l’estructura militar medieval.',
                'epoca' => '1200',
                'imatge' => 'posts/casco.jpg',
                'user_id' => 3,
                'tipus_eina_id' => $proteccio->id,
            ],

            [
                'titol' => 'Arada de fusta reforçada',
                'descripcio' => 'Eina agrícola fonamental utilitzada per llaurar la terra i preparar els camps per al cultiu, formada per una estructura principal de fusta robusta reforçada amb peces metàl·liques en les zones de major desgast. L’arada és un dels instruments més importants en el desenvolupament de l’agricultura tradicional, ja que permet obrir solcs profunds al sòl i millorar-ne l’aireació.

                La seva construcció combina fusta dura per al cos principal i ferro forjat per a la punta i la fulla de tall, que són les parts en contacte directe amb la terra. Aquest disseny permet augmentar la durabilitat de l’eina i reduir el desgast provocat per l’ús continuat en terrenys durs o pedregosos.

                L’arada és generalment estirada per animals de càrrega com bous o cavalls, i el seu ús requereix coordinació entre l’agricultor i l’animal per mantenir una trajectòria constant i eficient. La profunditat del solc pot ajustar-se segons la inclinació i el pes aplicat sobre l’eina.

                Històricament, aquesta eina va ser clau en la transformació de les societats agrícoles, permetent augmentar la producció d’aliments i facilitar l’expansió de poblacions establertes en zones rurals.',
                'epoca' => '1800',
                'imatge' => 'posts/arada.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $agricoles->id,
            ],

            [
                'titol' => 'Martell de forja pesat',
                'descripcio' => 'Eina essencial del ferrer, utilitzada per donar forma al metall incandescent sobre l’enclusa mitjançant cops contundents i controlats. El martell de forja pesat està dissenyat amb un cap metàl·lic massís i un mànec llarg de fusta reforçada que permet aprofitar la inèrcia del moviment per generar una força d’impacte elevada.

                El procés de fabricació del martell implica la forja de l’acer fins aconseguir una peça compacta i resistent, capaç de suportar temperatures elevades i impactes repetits sense deformar-se. El mànec és acuradament ajustat per garantir un equilibri òptim i reduir la fatiga del treballador durant sessions prolongades de forja.

                Aquesta eina és fonamental en la creació d’armes, eines agrícoles i components metàl·lics, ja que permet modelar el metall mentre es troba en estat mal·leable. El control del cop és essencial per aconseguir precisió en la forma final de la peça.

                En la tradició de la forja, el martell simbolitza la força, la disciplina i la transformació del metall brut en objectes útils i duradors.',
                'epoca' => '-1000',
                'imatge' => 'posts/martell_forja.jpg',
                'user_id' => 2,
                'tipus_eina_id' => $estris->id,
            ],

            [
                'titol' => 'Enclusa de ferrer',
                'descripcio' => 'Bloc metàl·lic massís utilitzat com a superfície de suport en el procés de forja, dissenyat per resistir impactes repetits de martells i permetre la conformació precisa del metall calent. L’enclusa és una peça central en qualsevol taller de ferreria tradicional, ja que actua com a base estable per al treball del metall.

                Fabricada en acer o ferro colat d’alta densitat, la seva estructura està pensada per absorbir i redistribuir l’energia dels cops, evitant deformacions i garantint una superfície de treball consistent. Inclou diferents zones i formes, com la banya corbada, utilitzada per donar formes arrodonides al metall.

                El seu pes considerable li confereix estabilitat durant el treball, evitant moviments indesitjats fins i tot sota impactes forts. Sovint es fixa sobre un suport de fusta massissa per optimitzar l’alçada de treball del ferrer.

                L’enclusa ha estat un símbol icònic de la metal·lúrgia tradicional, representant el centre del procés de transformació del metall en eines i objectes funcionals.',
                'epoca' => '-2000',
                'imatge' => 'posts/enclusa.jpg',
                'user_id' => 3,
                'tipus_eina_id' => $estris->id,
            ],

            [
                'titol' => 'Tècnica del revingut',
                'descripcio' => 'Procés tèrmic aplicat al metall després del trempat, consistent en un escalfament controlat a temperatures moderades per reduir la fragilitat i alleujar les tensions internes generades durant el refredament ràpid. Aquesta tècnica és essencial per equilibrar la duresa i la tenacitat dels metalls treballats.

                El procediment consisteix a escalfar la peça trempada fins a una temperatura inferior al punt crític, mantenint-la durant un període determinat abans de deixar-la refredar lentament. Aquest procés permet ajustar les propietats mecàniques del metall segons el seu ús final.

                El revingut és especialment important en la fabricació d’armes i eines, on un excés de duresa podria provocar fractures, mentre que una flexibilitat adequada assegura una millor resistència a l’impacte.

                El control precís de la temperatura és fonamental, ja que petites variacions poden alterar significativament les propietats finals del material. Aquesta tècnica complementa el trempat i forma part del conjunt de coneixements bàsics de la metal·lúrgia tradicional.',
                'epoca' => '200',
                'imatge' => 'posts/revingut.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $tecniques->id,
            ],
        ]);
    }
}