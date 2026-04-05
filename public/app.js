const SK='spiral-tracker-data',SYNC_KEY='spiral-sync-cfg';
const EM=['📻','☀️','🏖️','💜','🎨','🏗️','📋','🎯','💰','🏠','🚐','📱','🎓','🤝','📊','🌍','❤️','⭐','🔧','📝'];
const CL=['#E85D3A','#2E8B57','#3A7BD5','#8B5CF6','#D97706','#0F766E','#DC2626','#7C3AED','#0891B2','#BE185D','#65A30D','#CA8A04'];
const SC=['#6366F1','#EC4899','#14B8A6','#F97316','#8B5CF6','#EF4444','#0891B2','#65A30D','#D97706','#3B82F6'];
const DAYS=['mon','tue','wed','thu','fri'];
const DAY_NAMES={mon:'Monday',tue:'Tuesday',wed:'Wednesday',thu:'Thursday',fri:'Friday',sat:'Saturday',sun:'Sunday'};
const ROTA_DAYS=['mon','tue','wed','thu','fri','sat','sun'];
const STAFF_EMOJIS=['🎤','🎨','🏃','🎵','🧑‍🍳','🌱','🎭','🎯','🏊','🚴','🎪','🎮','📚','💃','🧶','🎹','🖌️','⚽','🎲','🎬'];
const LOC_EMOJIS=['🏠','🏢','🎪','🏊','🎳','🌳','🏫','⛪','🏛️','🎭','🏟️','🚴','🏖️','🎨','🍳','🎵','📍','🌿','🏘️','☕'];
const FLAG_INFO={E:'Epilepsy',M:'Mobility',Di:'Diabetes',DS:'Down\'s',['V/H']:'Visual/Hearing',H:'Heart',A:'Asthma',WO:'Walk Off',WD:'Walk Difficulty',Ag:'Aggression',SH:'Self-Harm',T:'Toileting'};
const FLAG_COLORS={E:'su-flag-E',M:'su-flag-M',Di:'su-flag-Di',DS:'su-flag-DS',['V/H']:'su-flag-VH',H:'su-flag-H',A:'su-flag-A',WO:'su-flag-WO',WD:'su-flag-WD',Ag:'su-flag-Ag',SH:'su-flag-SH',T:'su-flag-T'};

const DEF_SUS=[
{id:'su000',name:'Aaran Reed',flags:[],dob:'1985-10-21',pc:'bn7 1EN',em:'simms@simmscare.co.uk',cn:'heather simms',cm:'07869802098',co:'supported accomodation',ec1:'heather simms',ep1:'07788942300',med:'learning disability, anxiety',beh:'is vulnerable so tries to please',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'dr annis',surg:'foundry care lewes'},
{id:'su001',name:'Aaron Natha Gregory',flags:['M','V/H','H','WD','Ag','SH'],dob:'2000-07-02',pc:'bn2 3FP',ph:'07496 627841',cn:'Maureen Prescott',co:'Spinc',ec1:'Maureen Prescott',ep1:'01273 693650',med:'Tetralogy of Fallot, Schevermann\'s Kyphosis,Sleep apnea, Autism, cognitive delay mild',beh:'Reactive attachement disorder',diet:'currently trying to lose weight for heart operation',allg:'Vancdomycin (type of antibiotic)',ma:'medical',gp:'Dr Bird',surg:'Beaconsfield Medical Practice'},
{id:'su002',name:'Aaron Natha-Gregory',flags:['M','V/H','H','WO','WD','Ag','SH'],dob:'2000-07-02',pc:'bn2 3fp',em:'angdavidmanoj@gmail.com',cn:'Maureen prescott',co:'concord house`',ec1:'maureen prescott',ep1:'01273693650',med:'tetralogy of fallot, schevermanns kyphoonsis, sleep apnea, autism, congnative delay mild',beh:'reactive attachment disorder',diet:'currently trying to lose weight for hear operation',allg:'vancomycin (type of antibiotic)',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'dr bird',surg:'beaconsfield medical centre'},
{id:'su003',name:'Adam Green',flags:[],dob:'1964-09-30',pc:'BN2 0HD',ph:'07504 550192',em:'twg.green@btinternet.com',cn:'Any support worker',co:'Grace Eyre',ec1:'Grace Eyre Staff',ep1:'01273 973695',med:'Aspergers Syndrome',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Montpellier Surgery'},
{id:'su004',name:'Alan Groves',flags:['E','Di','V/H','WO'],dob:'07799 7578',pc:'BN2 4BL',ph:'Kathleen Groves',cn:'Kathleen Groves',cm:'07799 757805',ec1:'Kathleen Groves',ep1:'07799 757805',med:'Autistic spectrum condition, epilepsy',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'dr tomson',surg:'Church Surgery'},
{id:'su005',name:'Alan Steel',flags:['M','WD','Ag','T'],dob:'1952-06-05',pc:'BN3 6FA',ph:'01273 323814',em:'lyndhurstcarehomes@hotmail.com',cn:'DINO COELHO',cm:'07759 955140',co:'lyndhurst rest home',ec1:'8 Lyndhurst Road',ep1:'01273 323814',med:'learning disabilities, obesity, aneamia, catheter, underactive thyroid',beh:'I can become agitated',diet:'Low Fat',allg:'None Known',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'James Wilding',surg:'Charter Medical Centre'},
{id:'su006',name:'Alex Moore',flags:['V/H','A','WD'],dob:'1994-05-23',pc:'BN25 2JA',ph:'01323 899663',cn:'Tony Ramsay',cm:'07887793088',co:'Southdown Housing Association',ec1:'Tia Cuenot',ep1:'01323 899663',med:'High functioning autism - partially sighted',diet:'Vegetarian',allg:'Penicillin',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Seaford medical practice'},
{id:'su007',name:'Alfie Freeland',flags:['T'],dob:'1994-01-20',pc:'bn19gf',ph:'07762890624',em:'jatkey@grace-eyre.org',cn:'Jack Atkey',cm:'0762890624',co:'Grace Eyre',ec1:'Jo Freeland',ep1:'07866613969',med:'Autism/Learning disability',beh:'none',allg:'Not Known',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Carden Surgery County Oak Medical Centre'},
{id:'su008',name:'Andre Audibert',flags:['WO','Ag','T'],dob:'2002-10-17',pc:'bn1 8lb',ph:'0754 694014',cn:'mrs Marcia Audibert',cm:'7546984023',ec1:'Bernie Audibert',ep1:'07714 422353',med:'Autism ADHD Reynauds, Hayfever, Travel sickness',beh:'does not like being told off or no. 3/9/25 he was aggressive to his parents and ',diet:'VEGAN fOOD',allg:'Dairy Intolerance, alcohol sanitisers and soaps',surg:'Preston Park Surgery'},
{id:'su009',name:'Andrew Bryant',flags:['A'],dob:'1964-05-01',pc:'TN2 3TN',ph:'01892 538096',cn:'Jamie Wallis',cm:'7873178036',co:'LMW Support Services',ec1:'Lynne weatherly',ep1:'07873 178036',med:'Learning disability',beh:'no',diet:'no',allg:'asthma',gp:'Dr Blaber',surg:'Greggswo9od Surgery'},
{id:'su010',name:'Ann Ellis',flags:['Di','V/H','WO'],dob:'1958-12-20',pc:'BN43 5YE',ph:'01273 461407',co:'Grace Eyre',ec1:'ON CALL STAFF',ep1:'7584706015',med:'Type 2 Diabetes, learning disability',beh:'IMPATIENT',diet:'NO MAYONAISE',ma:'Supervision (Medication administered by yourself, signed and supervised by Spira',surg:'Shoreham Health Centre'},
{id:'su011',name:'ANNA JULIET Senker',flags:['M','V/H','WO'],dob:'1969-01-17',pc:'BN1 5DB',ph:'01273557709',cn:'Corinne Haydon-Laurelut',cm:'07593 448764',co:'Sussex Tikvah - Grace Eyre Foundation',ec1:'Corinne Haydon-Laurelut',ep1:'01273 507709 / 07593 448764',med:'Autistic spectrum condition',diet:'Jewish - doesn\'t eat pork or seafood',allg:'AMOXIL',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Gayton',surg:'Montpellier Surgery'},
{id:'su012',name:'Anthony (Tony) Miller',flags:['E','M','V/H','H','WD','T'],dob:'1954-06-18',pc:'BN2 0AQ',ph:'07544 543037',cn:'Grace Eyre Staff',cm:'07512 323771',co:'Grace Eyre',ec1:'Grace Eyre Duty Manager',ep1:'07584 706015',med:'Learning disability, glaucoma, epilepsy (currently well managed), high blood pressure, high cholesterol RIGHT LOWER LEG FRACTURE 2013 METAL PLATE FITT',diet:'Healthy, well-balanced diet',allg:'Penicillin',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Samantha Barker',surg:'Ardingly Court Surgery'},
{id:'su013',name:'ARRAN REED',flags:[],dob:'1985-10-21',pc:'BN7 2SP',ph:'01273474553',em:'SIMS@SIMS.CARE.CO.UK',cn:'HEATHER SIMMS',cm:'07788942300',co:'SUPPORTED ACCOMODATION',ec1:'HEATHER SIMS',ep1:'07788942300',med:'LEARNING DISABILITY AND ANXIETY',surg:'FOUNDRY HEALTHCARE LEWES'},
{id:'su014',name:'Axel Bewley',flags:[]},
{id:'su015',name:'Ben Pierre',flags:['DS','V/H'],dob:'1972-12-07',pc:'BN1 9JE',ph:'07905 746017',cn:'Cathy Pierre',cm:'07905 746017',ec1:'Cathy Pierre',ep1:'07905 746017',med:'Down\'s syndrome, hearing impairment,,THYROID',gp:'Dr. Winter',surg:'The Avenue Surgery'},
{id:'su016',name:'Brenda Warren',flags:['M','V/H','A'],dob:'1938-12-16',pc:'BN10 7JT',ph:'07922 371530',em:'mseporter@yahoo.co.uk',cn:'Michelle Porter',cm:'07801 835165',ec1:'Michelle Porter',ep1:'07801 835165',med:'none',gp:'Dr Starling',surg:'Havens Health'},
{id:'su017',name:'Brian McGarva',flags:['M','Di','DS','V/H','H','A','WD','Ag'],dob:'1975-07-31',pc:'BN3 4GJ',ph:'07770 018632',cn:'Kieron Ferguson',cm:'07909 224344',co:'Grace Eyre Foundation',ec1:'Out of hours staff duty phone',ep1:'07584 706015',med:'Down\'s syndrome, learning difficulties, diabetes (type 2), sleep apnoea, heart condition, asthma, hearing impairment, severe psoriasis',beh:'Anxiety, agitation, shouting and gesticulating. Problems with boundaries, some s',diet:'Brian follows a 2 week alternating menu planner (diabetic).',allg:'Ginger',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Wish Park Surgery'},
{id:'su018',name:'CAROL WOOLVEN',flags:['V/H','Ag','SH','T'],dob:'1960-11-10',pc:'BN3 6NR',ph:'01273 503586',em:'acornhove17@hotmail.com',cn:'SARA BOULT',cm:'07807805080',co:'ACORN HOVE',ec1:'PAULINE - SISTER',ep1:'07522577477',med:'MENTAL ILLNESS, ANXIETY, DEPRESSION',beh:'CAN SHOUT, SWEAR IF FRUSTRATED',surg:'CHARTER MEDICAL CENTRE'},
{id:'su019',name:'Cassandra (Cassie) Roache',flags:['E','V/H','WO','Ag','SH','T'],dob:'1989-09-29',pc:'BN3 2DB',cn:'Jennifer Garner',co:'Achieve Together',ec1:'Jennifer Garner',ep1:'01273 733757',med:'Autism, learning difficulties, epilepsy (mild)',beh:'Challenging behaviour',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Ahmad',surg:'Trinity Medical Centre'},
{id:'su020',name:'Cassius Lewis',flags:['V/H','WO','SH'],dob:'2005-08-14',pc:'BN2 4LE',ph:'07365988459',em:'GILL.IVES@HOTMAIL.CO.UK',cn:'Gill Ives',cm:'7365988459',ec1:'GILLIAN IVES',ep1:'07365988459',med:'AUTISM, GLOBAL DEVELOPMENT DISORDER, QUESTION DEPRESSION',beh:'TIREDNESS CAN CAUSE DISTRESS, NONE SERIOUS',diet:'NONE DISLIKES TOMATOES',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'ON CALL GP',surg:'ALLIED SURGERY'},
{id:'su021',name:'Charlie Kinsella',flags:['E'],dob:'1995-08-28',pc:'BN23 6PA',ph:'07784690772',cn:'Grace Herbert',co:'Care Sante',ec1:'Jane Kinsella',ep1:'07548648777',med:'Autism and Epilepsy',beh:'Anxiety',diet:'Vegetarian',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',surg:'Princes park health Centre'},
{id:'su022',name:'Charlotte Findlay',flags:[],dob:'1974-03-14',pc:'BN3 2PE',cn:'Cossie findlay',cm:'07850 050085',ec1:'Cossie Findlay',ep1:'07850 050085',med:'Learning difficulty',surg:'The Brunswick Surgery'},
{id:'su023',name:'Chris Da Costa',flags:[],dob:'1973-11-06',pc:'BN1 7AZ',ph:'07557 081912',cn:'Julie Griffin',cm:'07557 081912',co:'Brighton & Hove City Council',ec1:'Burwash Lodge Staff',ep1:'07557 081912',med:'Depression & anxiety learning difficulties, AUTISTIC TRAITS',beh:'gets anxious if not told what is happening',diet:'LIKES FULL ENGLISH IN THE MORNING',gp:'Dr. S Howard',surg:'Park Crescent Health Centre'},
{id:'su024',name:'christine samuel',flags:[],dob:'1900-01-12',pc:'bn24 9hy',ph:'01903530143',em:'Chrissysamuel11',cn:'andrea morris',cm:'07918878729',co:'west sussex shared lives',ec1:'andra morris',ep1:'07918878129',med:'learning dissability',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'dr arnold',surg:'Broadwater Medical Centre'},
{id:'su025',name:'Christopher Horseman',flags:[],dob:'1967-12-20',pc:'BN1 7AZ',ph:'01273 295108',em:'burwashlodgeldasteam@brighton-hove.gov.uk',cn:'Burwash Lodge',cm:'07557 081912',co:'Burwash LODGE',ec1:'Joan Horseman',ep1:'07719 015935',med:'Learning Disabilities',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr Garewal',surg:'Stanford Medical Centre'},
{id:'su026',name:'Christopher Skilton',flags:['H'],dob:'1951-05-05',pc:'tn2 3TN',ph:'01892 537076',cn:'LMW Support Services',cm:'7873178036',co:'LMV Support Services',ec1:'Lynne Weatherly',ep1:'07873 178036',med:'lEANING DISABILITY. ANGINA',beh:'no',diet:'no',allg:'Oranges',gp:'Dr Blaber',surg:'Greggswo9od Surgery'},
{id:'su027',name:'Claire Winterbottom',flags:['M','V/H','WO','Ag'],dob:'1945-11-26',pc:'bn42 4AA',ph:'07825629689',cn:'grace eyre foundation',cm:'07825629689',ec1:'kim Sawyer',ep1:'07825629589',med:'Autistic',beh:'Doesnt like to be crowded',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Manor practice'},
{id:'su028',name:'Cossima Paradine',flags:['M'],dob:'1989-12-15',pc:'BN3 1AU',ph:'07761 465158',cn:'Claire Paradine',cm:'07761 465158',co:'Parent',ec1:'Annie Nortcliff',ep1:'07590 363893',med:'PDD-Nos',beh:'Repetitive Behaviour, Anxiety',diet:'Can get constipated if too much processed food and not enoug',surg:'Charter Medical Centre'},
{id:'su029',name:'Daniel Harris',flags:['E','WO'],dob:'1990-09-21',pc:'BN15 9TD',cn:'Jocelyn Harris',cm:'07824 513524',co:'PARENT JO',ec1:'Jocelyn Harris',ep1:'07824 513524',med:'Complex learning difficulties, global development delay, ADHD, autistic tendencies',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Ball Tree Surgery'},
{id:'su030',name:'DANNY WOOD',flags:['M','Di','V/H','H','WD'],dob:'1973-06-02',pc:'BN3 6NR',ph:'01273 503586',em:'acornhove17@hotmail.com',cn:'SARA BOULT',cm:'07807 805080',co:'ACORN HOVE',ec1:'JOHN - DAD',ep1:'07785535230',med:'STROKE, SCHIZOPHRENIA, DIABETES',beh:'NONE',diet:'RISK OF CHOCKING',allg:'PENICILLIN, PAROXETINE, BEE STINGS',surg:'CHARTER MEDICAL CENTRE'},
{id:'su031',name:'David Charles Barker',flags:['M','Di','WD'],dob:'1950-04-28',pc:'BN16 3BW',ph:'077668832359',cn:'Grace Finneran',cm:'770634996',co:'Grace Eyre',ec1:'Grace Finneran',ep1:'0776 334996',med:'Diabeties, Leaning disability',beh:'learning disability',diet:'Diabetic Type 2',allg:'Avoids Nuts',gp:'Dr Miller',surg:'Fitzan Medical Group'},
{id:'su032',name:'David Kevin Forbes',flags:['M','V/H','WD'],dob:'1969-06-16',pc:'tn4 0pz',ph:'07521 189174',cn:'Sally Forbes',ec1:'sally rforms',ep1:'07718179502',med:'High Blood pressure, cellulitis, learning disabilities',allg:'hayfever',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'james fearnley',surg:'sst andrews med centre'},
{id:'su033',name:'David Passco',flags:['H'],dob:'1961-09-25',pc:'BN1 5LG',ph:'07748 598241',cn:'Clem Bowley',cm:'07748 598241',ec1:'Mrs Clem Bowley',ep1:'07748 598236',med:'Learning disability, atrial fibrillation, previous kidney stones',allg:'Cardiac drug: Amiodarone.',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Gail Gilbert',surg:'Portslade Medical Centre'},
{id:'su034',name:'Dean EDWARDS',flags:[],dob:'1998-06-10',pc:'RH16 3QE',ph:'07500791760',em:'deansnowy25@gmail.com',cn:'Tina EDWARDS',cm:'07500791760',ec1:'07500 791760',ep1:'7513130757.0',med:'Learning delay',beh:'Can get angry if someone else is bad to me.like starts a fight.',gp:'Any doctor',surg:'Newtons health clinic',pn:'Dean',comm:'Try to talk to others,but find it hard.best with my mum with'},
{id:'su035',name:'Deborah Hartin',flags:['M','V/H','WD'],dob:'1959-08-28',pc:'BN1 9GF',ph:'07788 425815',em:'bpearson@grace-eyre.org',cn:'Barry Pearson',cm:'07919497433',co:'Grace Eyre',ec1:'Paul Barker',ep1:'07725602093',med:'Learning Disability and PKU',beh:'/',allg:'Metal Jewellery',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'On duty GP',surg:'Carden Surgery'},
{id:'su036',name:'Debra Jones',flags:['M','V/H'],dob:'1964-11-19',pc:'BN2 0AQ',ph:'07921491361',cn:'Mantel House',cm:'07841 067281',co:'Grace Eyre',ec1:'The Reach',ep1:'01273 222000',med:'Hearing Impairment, Austistic, Slight arthritus in right hip.',beh:'Needs reassurance, Especially with her health',diet:'Drinks mint/peppermint tea with stomach issues, when applica',gp:'Dr Waistey',surg:'Pavilion Surgery'},
{id:'su037',name:'Deirdre Waller',flags:['E','M','V/H','WD'],dob:'1950-03-14',pc:'BN3 8BS',ph:'01273 201900',em:'deirdrewaller@outlook.com',cn:'Terri Thompson',cm:'07508 528444',co:'Frances Taylor Foundation',ec1:'Terri Thompson',ep1:'07508 528444',med:'Learning disability',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',gp:'Dr. Attler',surg:'Hove Medical Centre'},
{id:'su038',name:'DENVER RANSOM',flags:[],dob:'2003-11-29',pc:'TN40 1HD',ph:'07463837515',em:'rSILLYSOD@AOL.COM',cn:'STEPHEN ROY RANSOM',cm:'07463837515',ec1:'STEPHEN RANSOM (DAD)',ep1:'07463837515',med:'LEARNING DIFFICULTIES, ANXIETY',beh:'NON VERBAL',diet:'VEGATARIAN',surg:'SIDLEY SURGERY'},
{id:'su039',name:'Diane Wellington',flags:['DS','H','A'],dob:'1987-08-08',pc:'bn14 9hy',ph:'01903530143',cn:'andrea morris',cm:'07917878729',co:'shared lives west sussex',ec1:'andrea morris',ep1:'07917878729',med:'downs syndrone',beh:'none',allg:'penicillin and fabric plasters',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr Arnold',surg:'Boulivard water med centre'},
{id:'su040',name:'Diane Wyatt',flags:['E','M','WD'],dob:'1960-08-10',pc:'BN2 0AQ',ph:'01273 205044',cn:'Dawn Revell',cm:'07780 661136',ec1:'Dawn Revell',ep1:'07780 661136',med:'Learning disability',ma:'Supervision (Medication administered by yourself, signed and supervised by Spira',gp:'Sean Mitchell',surg:'Ardingly Court'},
{id:'su041',name:'Donald Gray',flags:['Di','V/H'],dob:'1952-03-28',pc:'BN3 6HQ',ph:'01273 205044',cn:'EZDRA HARRIS',co:'Achieve Together',ec1:'Manager',ep1:'01273 205044',med:'Deaf, No speech, Autistic Learning difficulties',diet:'None - Can eat fast - please observe',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr Byatt',surg:'Benfield Valley Hub'},
{id:'su042',name:'EDWARD BUCKLEY',flags:['V/H','WO'],dob:'2002-07-19',pc:'BN3 2DB',ph:'01273733757',cn:'JENNIFER GARNER',co:'CLOVERDALE HOUSE',ec1:'ANY CLOVERDALE STAFF',ep1:'01273 733757',med:'AUTISM, DEVELPMENTAL DELAY, IMPAIRED VISION',beh:'SOCIALLY INAPPROPRIATE BEHAVIOUR, LACK OF BOUNDARIES',diet:'NONE',allg:'NONE KNOWN',gp:'C BEECHAM',surg:'TRINITY MEDICAL CENTRE'},
{id:'su043',name:'ELAINE PARKES',flags:['M','V/H','WD','Ag'],dob:'1973-06-02',pc:'BN3 6NR',ph:'01273 503586',em:'acornhove17@hotmail.com',cn:'SARA BOULT',cm:'07807 805080',co:'ACORN HOVE',ec1:'DONNA - SISTER IN LAW',ep1:'07849 9790778',med:'SIGNIFICANT LD, SCHIZAFFECTIVE DISORDER',beh:'VERBALLY ABUSIVE, CAN HIT OUT, Will seek lots of attention',gp:'DR CONDON',surg:'CHARTER MEDICAL CENTRE'},
{id:'su044',name:'Elliot Duffield',flags:['DS','WO'],dob:'1994-05-06',pc:'BN42 4YF',ph:'07513 452617',cn:'Susan Mulvoy',co:'Shared Lives',ec1:'07931 852507 (Parent: Sat, Sun, Mon',med:'Downs Syndrome and Autism',beh:'Very shy initially. Will "freeze"/withdraw if unsure/upset. Dislikes: "full on" ',diet:'Prefers healthy options.',ma:'No',gp:'G.P.',surg:'Adur Health Partnership'},
{id:'su045',name:'Ellis Gallon',flags:['Ag'],dob:'1999-05-06',pc:'BN26SX',ph:'01273302062',cn:'Venkat',co:'Mencap',ec1:'07815995017',ep1:'1273302062.0',med:'Autistic and PDA',beh:'Direct commands will take me off on base line',gp:'Woodingdean gp',surg:'Woodingdean health center',pn:'Ellis',comm:'I will communicate verbally'},
{id:'su046',name:'EMILY Elizabeth Taylor',flags:['E','M','WO','WD','T'],dob:'1996-12-18',pc:'BN15 9DD',ph:'07398212626',em:'jet26@btinternet.com',cn:'Jane Elizabeth Taylor',cm:'07944606171',ec1:'Melvyn Taylor',ep1:'07944606151',med:'Epilepsy, Headaches, Partial Agenesis of the corpus callosus, tiredness and sometimes out of breath, high blood pressure',beh:'Younger than her years',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Not known',surg:'Ball Tree Surgery'},
{id:'su047',name:'EMILY SIAN PERRY',flags:['E','M','H','WO','Ag','SH'],dob:'2003-04-01',pc:'BN1 5LE',cn:'MRS PERRY',ec1:'CLAIRE PERRY',ep1:'07956628977',med:'UBEROUS SCLEROSIS. COMPLEX EPILEPSY, ADHD AND AUTISM',beh:'SEE CARE PLAN',gp:'DR MEARLE',surg:'BEACONSFILED MEDICAL PRACTICE'},
{id:'su048',name:'Faye Cooper',flags:['A'],dob:'1988-04-19',pc:'BN43 6GQ',cn:'Julie Starkey',ec1:'Julie Starkey',ep1:'07884 161716',med:'Learning difficulties',surg:'Stanford Road Practice'},
{id:'su049',name:'FRANCESCA DUNN',flags:['M','WD','T'],dob:'1987-07-30',pc:'BN1 5BA',ph:'01273552069',cn:'MARICEL LOPEZ',cm:'07706184000',co:'ACHIEVE TOGETHER',ec1:'MARICEL LOPEZ',ep1:'07706184000',med:'GLUTARIC ACIDEMIA TYPE 2',diet:'ALL MEDICATIONS AND NUTRITION ARE FED THROUGH A PEG',allg:'PENILILLIN, FOOD COLOURING, ONLY VANILLA FLAVOUR FOR DAY FEE',gp:'DR GAYTON',surg:'MONPEKIER SURGERY'},
{id:'su050',name:'FREDERICK WAITMORE',flags:['DS','V/H','WO','SH','T'],dob:'2003-01-03',pc:'BN10 7SN',cn:'JIM WEST',cm:'07789374502',co:'AVICENNA SUPPORTED LIVING',ec1:'BARNEY WHITMORE',ep1:'07870976754',med:'DOWNS SYNDROME AND AUTISM',beh:'ANXIOUS, MAY SIT ON FLOOR AND REFUSE TO MOVE',diet:'NONE -1-1 MONITORING',surg:'ANCHOR HEALTHCARE CENTRE'},
{id:'su051',name:'Frederick Whitmore',flags:['DS','V/H','WO','T'],dob:'2003-01-03',pc:'BN10 8SZ',ph:'01323048300',em:'manager@avicenna.support',cn:'Jim West',cm:'07789374502',co:'Avicenna Supported Living Ltd',ec1:'Barney Whitmore (brother)',ep1:'7870976754.0',med:'Downs Syndrome. Possible ASD',beh:'Sitting on floor, refusing to walk. Throwing small objects, cups, plates, etc.',gp:'Duty',surg:'Anchor Healthcare Centre',pn:'Freddie',comm:'Using an iPad and Now & Next boards'},
{id:'su052',name:'GARETH SENIOR',flags:['DS','H'],dob:'1984-10-09',pc:'TN4 0EU',ph:'01892512803',em:'GARETHSERVICE@GMAIL.COM',cn:'JAMIE WALLIS',cm:'07873178036',co:'LMW SUPPORT SERVICES',ec1:'LISA TILL',ep1:'07873178036',med:'DOWNS SYNDROME',allg:'HAYFEVER',gp:'DR BRUCE',surg:'ST ANDRES MEDICAL CENTRE'},
{id:'su053',name:'GARY MICHAEL WHELAN',flags:['M','V/H','A','WD','T'],dob:'1966-07-27',pc:'BN1 6HD',cn:'DAVID JONES',cm:'17848456293',co:'GRACE EYRE',ec1:'DAVID JONES',ep1:'07848456293',med:'NEUTROPERNIA, ASTHMA, AUTISM,DEAF, LEARNING DISABILITY, NO SPEECH',beh:'IF ANGRY MAY BREAK SMALL THINGS, IF MORE ANGRY MAY BREAK LARGER ITEMS AND IF REA',diet:'PLAIN BURGERS NO SAUCES, TACTILE FOOD, ONLY EATS CARROTS',allg:'POLLEN/HAYFEVER',gp:'DR GREAVES',surg:'PRESTON PARK'},
{id:'su054',name:'Gemma Jeeves',flags:['E'],dob:'1995-08-08',pc:'BN3 5PA',ph:'07531 104997',em:'devans@grace-eyre.org',cn:'Danielle Evans',cm:'07531 104997',co:'Grace Eyre',ec1:'Danielle Evans',ep1:'07531 104997',med:'Learning Disabilities',ma:'Supervision (Medication administered by yourself, signed and supervised by Spira',surg:'Wish Park Surgery'},
{id:'su055',name:'Gemma Price',flags:['M','DS','V/H','H','WD'],dob:'1979-04-21',pc:'BN42 4YF',ph:'07931 852507',em:'sue.mulvoy7@ntlworld.com',cn:'Sue Mulvoy',cm:'07931 852507',ec1:'Sue Mulvoy',ep1:'07931 852507',med:'Down Syndrome',beh:'Very Nervous',diet:'Cut food up, soft food only.',allg:'Prawns',gp:'Dr Cressy',surg:'Adur Health Partnership, Manor Practice'},
{id:'su056',name:'Hakim Pagsolingan',flags:['M','DS','WO','WD'],dob:'2000-07-11',pc:'BN41 1XU',ph:'01273 640266',em:'hywel.davies@ahievetogether.co.uk',cn:'Hywel Davies',co:'Achieve Together',ec1:'Hywel Davies',ep1:'01273 640266',med:'Down Syndrome, Mild Learning Disability',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Duty GP',surg:'Portslade Health Centre'},
{id:'su057',name:'Harriet Eve Bell',flags:['E','V/H'],dob:'1995-03-30',pc:'BN41 1DG',ph:'07775 939865',em:'perfume n@hotmail.co.uk',cn:'Darren Austin - Manager',cm:'07708 640459',co:'Venture - People',ec1:'Kathryn Bell (Mum)',ep1:'07786 074303',med:'Psychosis, Epilepsy, ASC, Depression, Anxiety, Learning difficulties',beh:'Pseudo seizures, paranoid delusions',diet:'none',allg:'Zinc',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',surg:'Portslade Health Centre'},
{id:'su058',name:'HENRY CLARIDGE',flags:['H'],dob:'1948-11-04',pc:'BN14 9HY',ph:'01903530143',cn:'ANDREA MORRIS',cm:'07917878729',co:'WEST SUSSEX SHARE IVES',ec1:'ANDREA MORRIS',ep1:'07918878729',med:'NONE NOTED',allg:'NONE NOTED',gp:'DR ARNOLD',surg:'BROADWATER MEDICAL CENTRE'},
{id:'su059',name:'IAN CHRISTOPLER JORDAN',flags:['E','T'],dob:'1965-03-07',pc:'BN2 3TN',ph:'01892619660',cn:'TINA ALLEN',cm:'07873178076',co:'LMW SUPPORT SERVICE',ec1:'LMW SUPPORT',ep1:'07873178076',med:'LEARNING DISABILITY, EPILEPSY AND BOWEL CANCER SURVIVOR',diet:'LOW CARB',gp:'DR BLABER',surg:'THE MEDICAL CENTRE'},
{id:'su060',name:'IAN METHERELL',flags:['M','V/H','WO','WD','T'],dob:'1948-04-26',pc:'BN1 8NA',ph:'01273553783',cn:'PAULA RIBEIRO',cm:'07508004889',co:'ACHIEVE TOGETHER',ec1:'PAULA RIBEIRO',ep1:'01273553783',med:'DIABETES TPE 2, HAEMOCHRAMATOSIS, WILLIAM SYNDROME, DIVERTICULITIS, GEOGRAPHIC TONGUE, ARTHRITIS',diet:'SMALL SOFT FOOD, HIGH RISK OF CHOKING, NO SPICY FOOD',surg:'CARDEN SURGERY'},
{id:'su061',name:'Isaac Oliviero',flags:['T'],dob:'2004-01-14',pc:'BN2 9SJ',cn:'Nicola Gibson',cm:'07703 777628',ec1:'Nicola Gibson',ep1:'07703 777628',med:'Autism, ring chromosome 18',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Park Crescent Surgery'},
{id:'su062',name:'Jack Surgeon',flags:['Ag','SH','T'],dob:'1993-11-22',pc:'BN1 8OJ',ph:'01273 101717',em:'solway@arundelcareservices.co.uk',cn:'Miss Lauren Balker-Smith',cm:'07377 513185',co:'Arundel Care Services',ec1:'Lauren Balker-Smith',ep1:'07377 513185',med:'Autism, learning disabilities, P.I.C.A.',beh:'Stripping, biting hands, hitting self/others/throwing things',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',surg:'Wardene Surgery'},
{id:'su063',name:'JAMES EDWARD HEFFERNAN',flags:['M','V/H','A','WD','T'],dob:'1987-05-15',pc:'B78 3XP',ph:'07973266859',em:'DEBBIEKIRKBY27@HOTMAIL.CO.UK',cn:'DEBBIE HERRERNAN',cm:'07973266859',ec1:'DEBBIE HERRERNAN',ep1:'07973266859',med:'DEAF, LEARNING DISABILITY, BLIND IN LEFT EYE, CEREBRALPULSY',surg:'STONYDELPH HEALTH CENTRE'},
{id:'su064',name:'James Mangold',flags:['E'],dob:'1984-07-16',pc:'BN14 8AH',cn:'shaun',cm:'7888250339',co:'Southdown Housing',ec1:'Lauren Mulholland',ep1:'07796 208007',med:'Epilepsy, IBS',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',gp:'Dr. Kamar',surg:'Worthing Medical Group'},
{id:'su065',name:'Jamie McKendrick',flags:['V/H','WO'],dob:'1992-06-16',pc:'BN3 1DN',ph:'07923 492953',co:'Richard McKendric',ec1:'Richard McKendrick',ep1:'07709 245567',med:'Autistic spectrum condition',gp:'Dr. Condon',surg:'Charter'},
{id:'su066',name:'Janet Hymas',flags:['M','V/H','WO','SH','T'],dob:'1946-06-27',pc:'BN10 7DJ',cn:'Sue Evans',cm:'07793 932827',co:'Grace Eyre',ec1:'Sue Evans',ep1:'07793 932827',med:'Learning disability',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Havens Health'},
{id:'su067',name:'Jared Harrison',flags:[],dob:'1999-09-17',pc:'BN1 5LP',ph:'7432734124',cn:'Heidi',co:'Arundel Care Services',med:'Autism Spectrum condition',diet:'Vegeterian'},
{id:'su068',name:'Jasmin Eyres',flags:['M','V/H','WD','T'],pc:'BN3 3GW',ph:'07443 433754',ec1:'Angela Hutchings',ep1:'07443 433754',med:'Chromosomal disorder IP36, global development delay',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Benfield Valley Health Hub'},
{id:'su069',name:'Jaycee Taylor',flags:['E','WO','Ag'],dob:'2007-01-04',pc:'BN10 8SZ',ph:'01273048300',em:'manager@avicenna.support',cn:'Jim West',cm:'07789374502',co:'Avicenna Supported Living Ltd',ec1:'Dean Taylor (dad)',ep1:'7907761769.0',med:'Learning Disability, Autism, Fragile XE and epilepsy',beh:'I can become aggressive, both verbally and physically, but this is usually when ',pn:'Jaycee',comm:'I can understand you, but I have a speech impediment, so wil'},
{id:'su070',name:'Jaydon ( Stacey) Towers',flags:['WO','Ag','SH'],dob:'1999-12-13',pc:'BN3 5DE',ph:'07440432713',em:'19stacey@gmail.com',cn:'Hove lagoon',cm:'07757109175',co:'Olut services Ltd',ec1:'Kelly Towers',ep1:'7950266094.0',med:'Autism with obsessional traits',beh:'I can become dysregulated when people speak to me in certain ways. Tones of voic',diet:'No dietary',allg:'No',gp:'Any Dr',surg:'Trinity medical centre',pn:'Stacey',comm:'I talk and communicate my needs in this way.'},
{id:'su071',name:'JAYDON (AKA STACEY) TOWERS',flags:['WO','Ag','SH'],dob:'1999-12-13',pc:'BN3 5DE',ph:'07440 432713 (STACEY MOBILE)',cn:'KELLY TOWERS (MUM)',cm:'07950266094',ec1:'KELLY TOWERS',ep1:'07950266094',med:'AIUTISM WITH SEVERE OBSESSIONAL TRAITS',beh:'BEHAVIOURS ASSOCIATED WITH DIAGNOSIS',surg:'TRINITY MEDICAL CENTRE'},
{id:'su072',name:'Jaydon Towers',flags:['WO','Ag','SH'],dob:'1999-02-13',pc:'BN3 5DE',ph:'01273 770400',em:'info@olutservices.co.uk',cn:'Miss Kelly Towers',cm:'07950 266094',ec1:'Miss Kelly Towers',ep1:'07950 266094',med:'Learning disability, autism spectrum disorder, anxiety, OCD with obsessional features and panic disorder',beh:'Obsessive behaviour, challenging behaviour',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Trinity Medical Centre'},
{id:'su073',name:'Jodie Upton',flags:[],em:'bpearson@grace-eyre.org',cm:'07919 497433',ec1:'Barry Pearson',ep1:'07919 497433',med:'Learning disability, possible autism, anxiety',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Carden & New Larchwood Surgery'},
{id:'su074',name:'John Payne',flags:['E'],dob:'1960-06-27',pc:'BN3 8GZ',cn:'Joyce Payne',cm:'07765 547994',ec1:'Joyce Payne',ep1:'07765 547994',med:'Learning disability, epilepsy',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Hove Medical Centre'},
{id:'su075',name:'Jonny Schachter',flags:['V/H'],dob:'3/24/0057',pc:'BN1 5DB',ph:'07904 803529',cn:'Tikvah staff',cm:'07593 448764',co:'Tikvah - Grace Eyre',ec1:'Hayden Laurelut',ep1:'07593 448764',med:'Learning disability, gout,autism spectrum disorder, schizophenia',beh:'can get anxious and pacing and inpatient',diet:'doesn\'t eat seafood',allg:'Calamari, tetrazine',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Gaetan',surg:'Montpellier Surgery'},
{id:'su076',name:'Jordon Blackwell',flags:['M','V/H','H','A','WO','WD'],dob:'1988-07-18',pc:'BN25 1FG',ph:'07484 132511',cn:'Susan Blackwell',cm:'7971293375',ec1:'susan Blackwell',ep1:'7713730957',med:'Poland syndrome, dextrocardia, autistic spectrum condition',ma:'Supervision (Medication administered by yourself, signed and supervised by Spira',gp:'Dr. Herridge',surg:'Seaford Medical Practice'},
{id:'su077',name:'Judith Cole',flags:['M','H','WD','T'],dob:'1942-04-10',pc:'BN42 4TR',em:'7932902271',cn:'Sue James',cm:'07932 902271',ec1:'Sue James',ep1:'07932 902271',med:'Heart failure, kidney disease, learning difficulty',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Jo',surg:'Northborne Medical Centre'},
{id:'su078',name:'KEITH FOX',flags:[],dob:'1959-11-24',pc:'BN2 3NB',ph:'07932017180',cn:'MARTIN FOX',ec1:'MARTIN FOX',ep1:'07305801064',med:'HIATUS HERNIA',gp:'DR SHAHEEN',surg:'STANFORD SURGERY'},
{id:'su079',name:'KELVIN LINDSEY',flags:['H','A','WO','Ag','T'],dob:'1973-06-02',pc:'BN3 6NR',ph:'01273 503586',em:'acornhove17@hotmail.com',cn:'SARA BOULT',cm:'07807 805080',co:'ACORN HOVE',ec1:'NONE',med:'SEVERE LD',beh:'CAN DISPLAY CHALLENGING BEHAVIOUR',allg:'TRIMETHOPRIM - UNKOWN REACTION',surg:'CHARTER MEDICAL CENTRE'},
{id:'su080',name:'KENNETH LINDSEY',flags:['E','H','WO'],dob:'1973-06-02',pc:'BN3 6NR',ph:'01273 503586',em:'acornhove17@hotmail.com',cn:'SARA BOULT',cm:'07807 805080',co:'ACORN HOVE',ec1:'NONE ON FORM',ep1:'01273  503586',med:'MILD LD, EPILEPSY',beh:'MINIMAL',surg:'CHARTER MEDICAL CENTRE'},
{id:'su081',name:'Kevin Sweeney',flags:['M','V/H'],dob:'1960-10-17',pc:'BN42 4YF',cn:'SUE mULVOY',cm:'7931852507',co:'SHARE LIVES',ec1:'SUE mulvoy',ep1:'7931852507',med:'Learning disability',ma:'Supervision (Medication administered by yourself, signed and supervised by Spira',surg:'adur heath partnership'},
{id:'su082',name:'Kristen Grbec',flags:['M','WD'],dob:'1955-11-05',pc:'BN1 5LG',ph:'07748598241',cn:'Clem Bowley',cm:'7748598241',ec1:'Clem Bowley',ep1:'7748598241',med:'learning difficulties, kidney transplant, polycystic liver',diet:'low sugar, low dairy lots of water due to kidney transplant',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Shah',surg:'Carden Surgery'},
{id:'su083',name:'Kyle Brooker',flags:['E','M','V/H','H','WD'],dob:'2004-03-06',pc:'BN2 6SJ',ph:'07914 023378',em:'nikki11@hotmail.co.uk',cn:'Nichola Brooker',cm:'07742 760435',ec1:'Nichola Brooker',ep1:'07914 023378',med:'Learning difficulties, Chromosome deletion',beh:'Non verbal until he settles or feels like speaking',diet:'Fussy eater, Sensory problem, cannot swallow tables',surg:'Wellsbourne Surgery'},
{id:'su084',name:'Lawna James',flags:['Di','V/H','A','WO','Ag','T'],dob:'1969-01-01',pc:'BN3 7QB',ph:'07879856824',cn:'Jacqueline Adderton',cm:'07879 856824',co:'grace eyre',ec1:'Jacqueline Adderton',ep1:'07879 856824',med:'Learning disability, hearing impairment, ibuprofen allergy, asthma',diet:'Minimum caffeine intake',allg:'Ibuprofen',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Allen',surg:'Beaconsfield Medical Centre'},
{id:'su085',name:'Lee Constable',flags:['V/H','WO','Ag'],dob:'1983-06-18',pc:'BN2 7GJ',em:'lconstable@zoho.com',cn:'Jason Roberts',cm:'07907 986880 / 07703 113781',co:'Tamarisk Housing Supported Living Ltd.',ec1:'Jason Roberts',ep1:'07907 986880 /07703 113781',med:'Learning disability, hearing impairment',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',surg:'Saltdean & Rottingdean Medical Practice'},
{id:'su086',name:'Lee Michael Douglas',flags:['V/H'],dob:'1982-09-01',pc:'bn21 2uu',ph:'01323301824',cn:'Lubna Douglas / Robin Blunden',cm:'07980 689252',co:'Eastbourne community support',ec1:'Lubna Douglas',ep1:'07980 689252',med:'high blood pressure, high cholestral',beh:'Previous history of panic attacks',diet:'No butter, support in choosing healthier food options and NO',allg:'Penicillin / Dust mites / Dust',ma:'Supervision (Medication administered by yourself, signed and supervised by Spira',gp:'kirti mahajan',surg:'park practice'},
{id:'su087',name:'Levi Michael Asagba',flags:['M','WD'],dob:'1997-11-18',pc:'BN3 8GS',cn:'Lynne Asagba',cm:'07814 796553',ec1:'Lynne Asagba',ep1:'07814 796553',med:'Autism, learning disability, ADHD, Tourettes, Expressive Language Delay',beh:'Bouncy, flappy, impulsive',diet:'Gluten and dairy free',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',gp:'Dr. Mahony',surg:'Hove Medical Centre'},
{id:'su088',name:'Lily Freeland',flags:[],dob:'1996-09-03',pc:'BN19GF',ph:'07788425815',em:'jatkey@grace-eyre.org',cn:'Jack Atkey',cm:'07762890624',co:'Grace Eyre',ec1:'Jo Freeland',ep1:'07866613969',med:'Autism/Learning Disability',beh:'Lilly has been hitting her Housemate recently but isn\'t a know behaviour.',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Carden Surgery County Oak Medical Centre'},
{id:'su089',name:'LISA TUNBRIDGE',flags:['E','Di','DS'],dob:'1973-06-02',pc:'BN3 6NR',ph:'01273 503586',cn:'SARA BOULT',cm:'07807 805080',co:'ACORN HOVE',ec1:'EILEEN - SISTER',ep1:'07817716681',med:'DOWNS SYNDRONE',beh:'MINIMAL',surg:'CHARTER MEDICAL CENTRE'},
{id:'su090',name:'Lorraine Makhoul',flags:['M','V/H','WD','Ag','T'],dob:'1959-11-03',pc:'BN1 6HB',ph:'07512 140515',cn:'Adult Social Care',co:'Brighton & Hove Learning Disability Serv',ec1:'Learning Disability Service',ep1:'01273 295550',med:'paralysis down left side body, arm leg, Spatic down one side, special needs',diet:'No spicy food',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Cathy Burgess',surg:'Pavilion Surgery'},
{id:'su091',name:'LUCY GIBSON',flags:['M','WD','T'],dob:'1992-05-08',pc:'BN3 8LQ',ph:'01273091581',cn:'JOSEPH PAGE',co:'GRACE EYRE',ec1:'JOSEPH PAGE',ep1:'07706335016',med:'MICROCEPHALY GLOBAL DELAY SYNDROME, RHETTS DISEASES AND LEARNING DIFFICULTIES',beh:'WHEN ANXIOUS OR UNWELL CAN CRY HYSTERICALLY, PUSH EVERYTHING AWAY FROM ME INCLUD',gp:'DR MANNY',surg:'HOVE MEDICAL CENTRE'},
{id:'su092',name:'Luke David Southby',flags:['M','DS','V/H','H','WD'],dob:'1984-02-06',pc:'BN3 5SN',cn:'David Southby',cm:'07986 349776',ec1:'David Southby',ep1:'07986 349776',med:'Down\'s syndrome, hearing impairment, gout, dyspraxia, low immunity',gp:'Dr. Howard',surg:'Trinity Medical Centre'},
{id:'su093',name:'Margaret Ann Kelly',flags:['M','V/H','WD'],dob:'1964-03-25',pc:'BN10 7JT',cn:'Michelle Porter',cm:'07801 835165',ec1:'Anthony (Brother)',ep1:'07794 167128',med:'Learning disability, one leg shorter than the other, controlled rheumatoid arthritis',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Starling',surg:'Meridian Surgery'},
{id:'su094',name:'MARIA ANN SMITH',flags:['E','M','V/H','H','A','WD','Ag'],dob:'1973-06-02',pc:'BN3 6NR',ph:'01273 503586',em:'acornhove17@hotmail.com',cn:'SARA BOULT',cm:'07807 805080',co:'ACORN HOVE',ec1:'NONE',ep1:'NONE',med:'EPILEPSY, MILD LD, ASTHMA',beh:'CAN BE VERBALLY ABUSIVE',diet:'HIGH RISK OF CHOKING',allg:'NUTS & BERRIES ..LOW RISK TO NUTS',surg:'CHARTER MEDICAL CENTRE'},
{id:'su095',name:'Maria Borrer',flags:['E','M','V/H','A','WD','SH'],dob:'1963-10-05',pc:'BN2 ODJ',ph:'01273671395',em:'mariaborrer@outlook.com',cn:'Grace Eyre',cm:'07584706015',co:'Grace eyre',ec1:'01273201906',ep1:'07584706015',med:'Occasional dizzy spells, Asthma, Depression, Epilepsy as child, Meningitis as child',beh:'none',diet:'none',allg:'paracetamol',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr Barker',surg:'Ardingly Court'},
{id:'su096',name:'MARK LEYH',flags:['V/H','SH'],dob:'1970-07-02',pc:'BN3 5PA',cn:'GRACE EYRE',cm:'074455063343',co:'GRACE EYRE',ec1:'PATRICIA LEYH',ep1:'01273691034',med:'LEARNING DISABILITIES',surg:'WISH PARK'},
{id:'su097',name:'Martin Gilbert',flags:['M','V/H','A','WD','T'],dob:'1952-07-05',pc:'BN1 5DB',cn:'Corinne Haydon‐Laurelut',cm:'07593 448784',co:'Tikvah - Grace Eyre',ec1:'Gary Wilkinson',ep1:'07593 448784',med:'Learning disability, asthma',diet:'Not too many colas',allg:'Menthol',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Gaetan',surg:'Montpellier Surgery'},
{id:'su098',name:'Maxine Hue-Sang',flags:['M','V/H','WD','T'],dob:'1970-05-03',pc:'BN9 0NQ',ph:'01273 514007',cn:'Webb House/Fitzroy Philippa',co:'Webb House',ep1:'01273 514007',med:'Spina Bifida, Hydracephalus, multiple VP shunts insertions, hypertension, learning disabilities, Neurotic bladder with botox',diet:'no bacon or liver',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',gp:'DR Gupta',surg:'Quayside Medical Centre'},
{id:'su099',name:'Michael Townsend',flags:['M','Di','V/H','WD','T'],dob:'1965-12-13',pc:'BN2 4FH',cn:'Julie Townsend',cm:'07795 647400',ec1:'Julie Christer',ep1:'07795 647400',med:'Type 2 diabetes, occasional non-epileptic seizures',diet:'Low sugar, no artificial sweeteners',gp:'Dr Mitchell',surg:'Church Surgery'},
{id:'su100',name:'Mousumi Meergans',flags:['M','A','WD','T'],dob:'1982-08-26',pc:'RH15 8PE',ph:'07527812014',em:'mousumimeergans1982@gmail.com',cn:'Bryn Collier',ec1:'Bryn Collier',ep1:'7807003304.0',med:'Scoliosis urostomy bag (Stoma bag) Learning Disability Asthma High blood Presure',surg:'The Brow Medical Centre',pn:'Mousumi',comm:'with pictures and need extra time to process information'},
{id:'su101',name:'Nina Attar',flags:['M','Ag','SH'],dob:'1998-10-11',pc:'BN1 3AS',cn:'Eleanor Rowland',cm:'07512 325230',co:'Grace Eyre',ec1:'Joesph Page',ep1:'07706 335016',med:'Autism, learning disability, pathological demand avoidance.',beh:'Challenging Behaviours- requires Grace Eyre Support Worker to be present at all ',diet:'None- However has an unhealthy relationship with food and fl',gp:'Unknown',surg:'Trinity Medical Centre'},
{id:'su102',name:'Ollie Moorhouse',flags:[]},
{id:'su103',name:'Omar El-Jishi',flags:['Di','V/H','H','Ag','T'],dob:'1980-08-17',pc:'BN2 0HD',ph:'07385 256395',em:'omareljishi22@gmail.com',cn:'Grace Eyre',cm:'07512 323771',co:'Grace Eyre',ec1:'Mantell House Staff',ep1:'01273 973693',med:'Learning disability, schizoaffective disorder, type 2 diabetes, left axis deviation with atrial flutter, high blood pressure',beh:'Past verbal threats when mentally unstable but no recent events.',diet:'Low fat , well balanced',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Pavilion Surgery'},
{id:'su104',name:'Patrick Coles',flags:['DS','V/H','T'],dob:'1964-03-17',pc:'BN1 5LG',ph:'07748598241',cn:'Clem Bowley',ec1:'Clementina Bowley',ep1:'07748 598241',med:'Down\'s syndrome, hypothyroidism, piles',diet:'LOW SUGAR, LOW DAIRY',ma:'Supervision (Medication administered by yourself, signed and supervised by Spira',surg:'CARDEN SURGERY'},
{id:'su105',name:'Paul Anthony Frowde',flags:['M','V/H','T'],dob:'1945-11-17',pc:'BN2 8FH',ph:'07597 752660',em:'paulfro@btinternet.com',cn:'Jane Frowde',cm:'07849 636283',ec1:'Jane Frowde',ep1:'07849 636283',med:'Learning disability, registered blind, GLAUCOMA',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',gp:'Dr. Skinner',surg:'Saltdean Grand Ocean'},
{id:'su106',name:'Paul Openshaw',flags:['DS','H','Ag'],dob:'1970-08-24',pc:'BN2 5QQ',cn:'Kerry Jackson',cm:'07429 426481',ec1:'Kerry Jackson',ep1:'07429 426481',med:'Down\'s syndrome, borderline diabetic',beh:'Mood swings',diet:'Controlled diet due to borderline diabetes',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Beasley',surg:'Wellsbourne'},
{id:'su107',name:'PAUL SULLIVAN',flags:['DS','V/H','A'],dob:'1980-02-17',pc:'TN4 0RD',ph:'01892670991',cn:'SHELLEY WALLIS',cm:'07538276818',co:'LMW SUPPORT',ec1:'ON CALL',ep1:'07873178036',med:'DOWNS SYNDROME',diet:'LOW FAT, LOW SUGAR, NO ALCHOL',allg:'ORANGES',surg:'ST ANDREWS MEDICAL CENTRE'},
{id:'su108',name:'Pauline French',flags:['E','M','V/H','WD','T'],dob:'1978-02-12',pc:'BN1 9GF',ph:'07788 425815',cn:'Barry Pearson',cm:'07919 497433',co:'Grace Eyre Foundation',ec1:'Barry Pearson',ep1:'07919 497433',med:'Epilepsy,LEARNING DISSABILITY, CRADLE CAP, CEREBRAL PAUSY',allg:'PENECILLIN',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Carden & New Larchwood Surgery'},
{id:'su109',name:'PETER WHITTINGTON',flags:['M','A','WD','SH'],dob:'1970-12-18',pc:'BN3 5PA',ph:'07455063343',cn:'LAUREN HILL',cm:'07455063343',co:'GRACE EYRE',ec1:'LAUREN HILL',ep1:'07455063343',med:'LEARNING DISABILITY & ASTHMA',diet:'NO BANANA OR BAKED BEANS.. CAUSE UPSET STOMACH',gp:'DR THOMPSON',surg:'PORTSLADE HEALTH CENTRE'},
{id:'su110',name:'Phoebe Elwick',flags:['E','M','V/H','WO','WD','Ag','SH','T'],dob:'2000-08-12',pc:'BN1 8UJ',ph:'01273 101717',em:'solway@arundelcareservices.co.uk',cn:'Lauren Balker-Smith',cm:'07377 513185',co:'Arundel Care Services',ec1:'Lauren Balker-Smith',ep1:'07377 513185',med:'SYNGAP1 gene, severe ID, micro-deletion, atypical absence epilepsy',beh:'Shouting, not listening (overwhelmed), hitting out, running away',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',surg:'Preston Park Surgery'},
{id:'su111',name:'RAINNA CRUDGE',flags:['M','DS','WD','Ag'],dob:'1973-06-02',pc:'BN3 6NR',ph:'01273 503586',em:'acornhove17@hotmail.com',cn:'SARA BOULT',cm:'07807 805080',co:'ACORN HOVE',ec1:'ALFIE - BROTHER',ep1:'07983162945',med:'DOWN SYNDROME',beh:'CAN BE VERBALLY ABUSIVE AND HIT OUT',allg:'NONE KNOWN',surg:'CHARTER MEDICAL CENTRE'},
{id:'su112',name:'REGINALD DAY',flags:['V/H','H','T'],dob:'1953-01-11',pc:'BN3 6FA',ph:'01273323814',cn:'DINO COELHO',cm:'07949233980',co:'LYNDHURST GROUP HOME',ec1:'JOHN PALMER',ep1:'01273 323814 8AM - 9 PM',med:'LEARNING DISABILITY, HYPERTENSION, ODEMA IN BOTH LEGS, BLEPHARITIS (LEFT EYE), HEARING LOSS (BOTH EARS)',beh:'CAN ACT OUT IF ANXIOUS (UNKNOWN PEOPLE OR PLACES)',diet:'REMIND TO CHOP & CHEW FOOD.  AVOID LARGE PIECES OF MEAT',gp:'DR QUINN',surg:'CHARTER MEDICAL CENTRE'},
{id:'su113',name:'Robert Moss',flags:[],dob:'1974-05-25',pc:'BN3 1FP',ph:'07535752166 sallyann  carer',em:'Sallyannsmith946@gmail.com',cn:'Sallyann smith',cm:'07535752166',co:'Shared lives',ec1:'Sallyann 07535752166',ep1:'Shared lives duty 01273 295550',med:'Learning disabilities',diet:'None dosent like spicy food',allg:'Not known',ma:'Supervision (Medication administered by yourself, signed and supervised by Spira',gp:'Dr Alderman',surg:'Links road surgery'},
{id:'su114',name:'Robert Stapleton',flags:['E','M','Di','WD'],dob:'1959-02-03',pc:'BN2 0BW',ph:'07871 262197',em:'kagriffiths@googlemail.com',cn:'Karen Griffiths',ec1:'Karen Griffiths',ep1:'07871 262197',med:'Learning Disability, Epilepsy, Diabetic Type 2',beh:'Gets very emotional and tearful',diet:'Careful with sugary products, no grapefruit',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'St Peters Medical Set'},
{id:'su115',name:'Robin Fox',flags:['Di','V/H','T'],dob:'2051-02-22',pc:'BN3 6HQ',ph:'01273 205044',cn:'Ste Bradfield',co:'Achieve together',ec1:'Ste broadfield',ep1:'01273 205044',med:'Deaf, Prostate cancer, Diabetes type 2',beh:'No',diet:'No',allg:'No',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr Baiyat',surg:'WellBN Benfield valley'},
{id:'su116',name:'ROSEMARY DOWELL',flags:['M','Di','V/H','Ag','T'],dob:'1973-06-02',pc:'BN3 6NR',ph:'01273 503586',cn:'SARA BOULT',cm:'07807 805080',co:'ACORN HOVE',ec1:'NONE',ep1:'NONE',med:'CROHNS, MDERATE LD, DIABETIES',beh:'CAN SHOW SIGNS SUCH AS THROWING OBJECTS',diet:'MEANT TO FOLLOW SENSIBLE DIET -- BUT REFUSES TO',allg:'NONE',surg:'CHARTER MEDICAL CENTRE'},
{id:'su117',name:'Roy Norman',flags:[],dob:'1969-07-17',pc:'BN3 7JF',ph:'07915 600740',cn:'Ann Mundroina',cm:'07915 600740',co:'Grace Eyre',ec1:'Ann Mundroina',ep1:'07915 600740',med:'Learning disability, anxiety',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',surg:'Manor Practice'},
{id:'su118',name:'Ryan James Crickmore',flags:['M','DS','A','WD'],dob:'1990-12-03',pc:'BN42 4NX',ph:'07857 554034',em:'steamtrainrunnin@gmail.com',cn:'Mr James Crickmore',cm:'07747 761603',ec1:'James Crickmore',ep1:'07568 637341',med:'Down\'s Syndrome',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr Brown',surg:'Portslade Health Centre'},
{id:'su119',name:'Sam Archer',flags:[],dob:'1982-05-10',pc:'BN7 2SP',ph:'07788 942300',em:'simms@simmscare.co.uk',cn:'Nigel & Heather Simms',co:'Simms Care',ec1:'Nigel Simms',ep1:'07453 312666',med:'Paranoid Schizophrenia & Learning Difficutlies',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr Lamb',surg:'Foundry Health Care'},
{id:'su120',name:'Sara Baker',flags:['DS','WO'],dob:'1991-05-16',pc:'BN7 2JN',ph:'01273 474321',cn:'Mrs Jennifer Baker',cm:'07713 255096',ec1:'Vic Baker',ep1:'07973 147467',med:'Down\'s Syndrome, reduced kidney function (catheterized)',beh:'Tendency to wander, more needy than initially appears',gp:'Dr Price',surg:'Foundry Healthcare'},
{id:'su121',name:'Sarah Jane Himpson',flags:['M','V/H','H','A','WD'],dob:'1987-07-13',pc:'BN2 8QL',ph:'07853 048461',cn:'Tracey Spencer',cm:'07863 201838',ec1:'Tracey Spencer',ep1:'07863 201838',med:'Sarah has a learning disability and anxiety.\n\nWears pads and manages herself.  \n\nHas hip & back pain sometimes, which may cause mobility problems.\n\nHa',beh:'Anxiety',diet:'None and not vegetarian, either',allg:'Hayfever',surg:'The Saltdean and Rottingdean Medical Cen'},
{id:'su122',name:'Sharon Louise Brown',flags:['DS','H'],dob:'1969-08-09',pc:'BN2 6NF',cn:'Patricia Ann Brown',cm:'7906426265',ec1:'Patricia Brown',ep1:'01273 708964',med:'Down\'s Syndrome',allg:'Fish',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Sidcar',surg:'St. Peter\'s Medical Centre'},
{id:'su123',name:'Sheila Buckman',flags:['V/H','A'],dob:'1951-01-30',pc:'BN1 9ED',med:'Learning disability, hearing impairment',beh:'Problems registering people\'s personal space.',ma:'Supervision (Medication administered by yourself, signed and supervised by Spira',gp:'Dr. Mervyn-Thomas',surg:'New Larchwood Surgery'},
{id:'su124',name:'Sophie Smith',flags:['Ag','T'],dob:'1989-09-22',pc:'BN3 2DB',ph:'01273 733757',em:'jennifer.garner@achievetogether.co.uk',cn:'Susan Skilton',cm:'07712809714',co:'Achieve Together',ec1:'none',ep1:'none',med:'learning disability',beh:'none',diet:'none',allg:'none',gp:'DR BEECHAM',surg:'TRINITY'},
{id:'su125',name:'Stephen Ingle',flags:['E'],dob:'1963-11-11',pc:'BN42 4TR',cn:'Sue James',ec1:'Sue James',ep1:'07932 902271',med:'Learning disability, epilepsy',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Jo',surg:'Northborne Medical Centre'},
{id:'su126',name:'Susan Attwood',flags:['Di'],dob:'1951-11-14',pc:'BN1 7AY',ph:'01273 261312,07585 047562',cn:'Barry Stewart',co:'Southdown',ec1:'Barry Stewart',ep1:'01273 509533',med:'Diabetes',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',gp:'Dr. Slattery',surg:'Preston Park Surgery'},
{id:'su127',name:'SUSAN STREET',flags:['M','Di','V/H','H','T'],dob:'1946-10-12',pc:'BN3 6FA',ph:'01273323814',cn:'DINO COELHO MANAGER',co:'Z & M CARE LTD LYNDHURST GROUP HOME',ec1:'ANETTA SWIERKOWSKA',ep1:'01273323814',med:'LEARNING DISABILITY, DIABETES, HIGH BLOOD PRESSURE, ACID REFLUS',diet:'DIABETIC, PREFERS SMALL PORTIONS',allg:'STATINS',gp:'DR QUINN',surg:'CHARTER MEDICAL'},
{id:'su128',name:'Taylor Elizabeth Taylor',flags:['E','M','WO','WD','T'],dob:'1996-12-18',pc:'BN15 9DD',ph:'07398212626',em:'jet26@btinternet.com',cn:'Jane Elizabeth Taylor',cm:'07944606171',ec1:'Melvyn Taylor',ep1:'07944606151',med:'Epilepsy, Headaches, Partial Agenesis of the corpus callosus, tiredness and sometimes out of breath, high blood pressure',beh:'Younger than her years',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Not known',surg:'Ball Tree Surgery'},
{id:'su129',name:'Teresa Wood',flags:[],dob:'1946-10-15',pc:'BN3 1FP',cn:'Sallyann Smith',cm:'07535 752166',co:'Shared Lives',ec1:'Sallyann Smith',ep1:'01273 410259',med:'Learning disability',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Alderman',surg:'Links Road Surgery'},
{id:'su130',name:'TERRENCE VINE',flags:['DS','V/H'],dob:'1973-03-10',pc:'BN3 4GT',ph:'07770018632',cn:'SUSAN STAFFORD',cm:'07872591066',ec1:'CALIRE BARNARD',ep1:'07703755381',med:'DOWNS SYNDROME',beh:'SOMETIMES OVER FRIENDLY WITH WOMEN',surg:'HOVE MEDICAL CENTRE'},
{id:'su131',name:'Terry Pellett',flags:['E','M','WD','T'],dob:'1965-07-31',pc:'BN42 4QG',ph:'07933813096',cn:'Maire Doyle',cm:'07933 813096',co:'Grace Eyre',ec1:'Maire Doyle',ep1:'07933 813096',med:'Achondroplasia',beh:'Don\'t leave money unattended around Terry.',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Harbour View Healthcare'},
{id:'su132',name:'Thomas (Tommy) Hannam',flags:['M','V/H','WD'],pc:'BN15 8DY',ph:'01903 753059',cm:'07468 578996',co:'Grace Eyre',med:'Learning disability, mobility issues',beh:'Limit alcohol consumption and watch carefully.',ma:'Supervision (Medication administered by yourself, signed and supervised by Spira',gp:'Dr. Ebbage',surg:'Links Road Surgery'},
{id:'su133',name:'Thomas Swan',flags:['M','Di','V/H','WD'],dob:'1944-05-30',pc:'BN3 6HQ',ph:'01273205044',em:'No email',cn:'Susan Burns',cm:'No mobile',co:'Achieve Together',ec1:'Ezdra Harris',ep1:'7473974254.0',med:'Tom has limited mobility due to age. He has low blood pressur, COPD, vascular dementia and diet controlled type 2 daibetes.',diet:'Tom avoids high sugar foods due to his diabetes.',gp:'Dr Baiyat',surg:'Benfield Valley Surgery',pn:'Tom',comm:'Limited BSL, body language'},
{id:'su134',name:'Tina Jenner',flags:['WO'],dob:'1980-08-31',pc:'BN9 9NS',ph:'01273 611108',cn:'Ardiana Neziraj',cm:'07482749437',co:'Mencap',ec1:'Ardiana Neziraj',ep1:'07482749437',med:'Learning Disability, Autism',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Gupta',surg:'Quayside Medical Centre'},
{id:'su135',name:'TINA MARIA GUNN',flags:['M','V/H','WO','WD'],dob:'1965-01-29',pc:'BN2 0AQ',ph:'07423614181',em:'TINAMARIAGUNN1965@ICLOUD.COM',cn:'GRACE EYRE',cm:'07584706015',co:'GRACE EYRE',ec1:'OUT OF HOURS',ep1:'07584706015',med:'AUTISM, ARTHRITIS IN BOTH LEGS, HIGH BLOOR PRESSURE',diet:'SENSITIVE TO CREAM & CHOCOLATE,',allg:'CREAM CHEESE GIVES HER A MIGRAINE/ PRE-DIABETIC',surg:'PAVILLION SURGERY'},
{id:'su136',name:'Toby Assinder',flags:['Di','V/H','Ag'],dob:'1966-12-20',pc:'BN1 8NA',ph:'01273 553783',em:'Paula.Ribeiro@achievetogether.co.uk',cn:'Paula Ribeiro',cm:'07508 004889',co:'Achieve Together',ec1:'Paula Ribeiro',ep1:'07508 004889',med:'Williams Syndrome, Learning disabilities',beh:'Sometimes might be a bit bossy',diet:'Toby is overweight',ma:'Monitored (Medication administered by yourself, signed on MARS sheet by you, but',surg:'Carden Surgery'},
{id:'su137',name:'Todd Evershed',flags:['E','Ag','T'],dob:'1970-11-21',pc:'BN41 1PL',cn:'Laura Golding',cm:'07952 087445',ec1:'Laura Golding',ep1:'07952 087445',med:'Learning disability, epilepsy',gp:'Dr. Hacking',surg:'The Avenue Surgery'},
{id:'su138',name:'TREVOR CHAPMAN',flags:['Di','DS','V/H'],dob:'1967-08-17',pc:'TN1 2QN',ph:'01892513419',cn:'TERESA DIER',cm:'07554995020',ec1:'TERESA DIER',ep1:'07554995020',med:'LEARNING DIFFICULTY, DOWNS SYNDROME, DIABETIC',diet:'LOW FAT FOODS',gp:'DR CREED',surg:'THE WELLS MEDICAL PRACTICE'},
{id:'su139',name:'Tyler Mckenzie',flags:[],dob:'1992-02-14',pc:'BN2 6TD',cn:'John Rawcliffe',cm:'07939 570070',ec1:'John Rawcliffe',ep1:'07939 570070',allg:'Penicillin',ma:'Administration (Medication given, signed and administered by Spiral staff)',surg:'Saltdean Medical Practice'},
{id:'su140',name:'Valerie French',flags:['Di','V/H','T'],dob:'1941-05-29',pc:'BN3 1FP',cn:'Sallyann Smith',cm:'07535 752166',co:'Shared Lives',ec1:'Richard Howse',ep1:'07732 332167',med:'Learning disability',allg:'Allergic to grapefruit',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr. Alderman',surg:'Links Road Surgery'},
{id:'su141',name:'Xander Kellie',flags:[],dob:'2003-12-06',pc:'TN34 2SH',ph:'07425 331060',em:'cparker2@consensussupport.com',cn:'Cheryl',cm:'07425331060',co:'Consensus Support Ltd',ec1:'Vicki Paine - Mother',ep1:'7799590515.0',med:'PKU, LD',beh:'I may become frustrated and withdraw - I just need time to re-engage when I am r',diet:'Must follow a PKU diet',allg:'Aspartame',surg:'The Hill Surgery',pn:'Xander',comm:'verbally'},
{id:'su142',name:'Yamin Hassan',flags:['M','H','A','WD','T'],dob:'1999-04-27',pc:'BN2 4LS',ph:'01273 600687',em:'mbegum274@btinternet.com',cn:'Monira Hassan Begum',cm:'07473 157711',ec1:'Monira Hassan Begum',ep1:'07473 157711',med:'Asthma, Raynaud\'s Syndrome, Proteinuria, Gastric Reflux, Vitamin D Deficiency, Hay Fever',diet:'Does not eat pork or drink alcohol',allg:'Dust, Pollen, Heat, Cold',ma:'Administration (Medication given, signed and administered by Spiral staff)',gp:'Dr WIlliam Lockenby',surg:'The Avenue Surgery'},
{id:'su143',name:'ZOE COLLINS',flags:['T'],dob:'1997-08-24',pc:'BN2 5HP',ph:'01273673933',cn:'HANNAH KENDRICK (MANAGER)',cm:'07519114099',co:'ARUNDEL CARE SERVICES',ec1:'HANNAH KENDRICK',ep1:'07519114099',med:'ADHD, GLASS SYNDROME, GLOBAL DEVELOPMENT DISORDER, SEVERE LEARNING DISABILITY',beh:'TOUCHING MEMBERS OF THE PUBLIC, PICKING UP OBJECTS',surg:'WELLSBOURNE CENTRE'},
{id:'su144',name:'Zoe Pearce',flags:['DS','V/H','WO'],pc:'BN3 6NR',em:'zoepearce79@icloud.com',ec1:'Debbie',ep1:'07970 530935',med:'Downs Syndrome, Hearing impairment, Learning Disability, Gluten Free (undiagnosed)\nSelf administers medication, requires supervision when taking medic',beh:'Zoe has recently been telling lies. If caught out telling lies, it needs to be e',diet:'Gluten free (undiagnosed) reduce wheat intake - as gets too ',ma:'Supervision (Medication administered by yourself, signed and supervised by Spira',gp:'Dr. Godwin',surg:'Mile Oak Medical Centre'}];

const DEF_SCHEDULE=[
{id:'s1',name:'Gardening Club',day:'mon',period:'am',spaces:8,staffList:[{name:'Val',emoji:'🌱'}],community:true,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:''},
{id:'s2',name:'Learning Through Games',day:'mon',period:'am',spaces:10,staffList:[{name:'Val',emoji:'🎲'}],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:''},
{id:'s3',name:'Learn Circus Skills',day:'mon',period:'am',spaces:12,staffList:[],community:true,location:'Leaf Hall Community Arts Centre',locationEmoji:'🎪',assignedSUs:[],note:'With Sweet Circus'},
{id:'s4',name:'Multi Sports',day:'mon',period:'pm',spaces:12,staffList:[],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:'With Defiant Sports'},
{id:'s5',name:'Art for Pleasure',day:'mon',period:'pm',spaces:10,staffList:[],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:''},
{id:'s6',name:'Swimming',day:'mon',period:'pm',spaces:8,staffList:[],community:true,location:'Prince Regent',locationEmoji:'🏊',assignedSUs:[],note:''},
{id:'s7',name:'Community Activities',day:'tue',period:'am',spaces:15,staffList:[],community:true,location:'Various',locationEmoji:'🏘️',assignedSUs:[],note:''},
{id:'s8',name:'Drama and Performing Arts',day:'tue',period:'am',spaces:12,staffList:[],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:''},
{id:'s9',name:'Swoove',day:'tue',period:'pm',spaces:12,staffList:[{name:'Jo',emoji:'💃'}],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:''},
{id:'s10',name:'Drama: Show Planning',day:'tue',period:'pm',spaces:12,staffList:[],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:''},
{id:'s11',name:'Drum and Rhythm',day:'wed',period:'am',spaces:10,staffList:[],community:true,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:''},
{id:'s12',name:'Tenpin Bowling Club',day:'wed',period:'am',spaces:10,staffList:[],community:true,location:'Brighton Bowl',locationEmoji:'🎳',assignedSUs:[],note:''},
{id:'s13',name:'Cake Making Club',day:'wed',period:'am',spaces:8,staffList:[{name:'Val',emoji:'🧑‍🍳'}],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:''},
{id:'s14',name:'Funky Embroidery and Sewing',day:'wed',period:'pm',spaces:8,staffList:[],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:''},
{id:'s15',name:'Tenpin Bowling Club',day:'wed',period:'pm',spaces:10,staffList:[],community:true,location:'Brighton Bowl',locationEmoji:'🎳',assignedSUs:[],note:''},
{id:'s16',name:'Karaoke',day:'wed',period:'pm',spaces:15,staffList:[{name:'Nick',emoji:'🎤'}],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:'The best KARAOKE party in town!'},
{id:'s17',name:'Cycling with Wheels 4 All',day:'thu',period:'am',spaces:8,staffList:[],community:true,location:'Preston Park',locationEmoji:'🌳',assignedSUs:[],note:''},
{id:'s18',name:'Jewellery Making',day:'thu',period:'am',spaces:8,staffList:[],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:''},
{id:'s19',name:'Catering Skills',day:'thu',period:'am',spaces:8,staffList:[],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:''},
{id:'s20',name:'Multi Sports',day:'thu',period:'pm',spaces:12,staffList:[],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:'With Defiant Sports'},
{id:'s21',name:'Fashionable Artwork',day:'thu',period:'pm',spaces:10,staffList:[],community:false,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:'To exhibit in the community'},
{id:'s22',name:'Swoove',day:'thu',period:'pm',spaces:15,staffList:[],community:true,location:'Spiral Centre',locationEmoji:'🏠',assignedSUs:[],note:'6:30–7:30pm · £5.00'}
];

const ROOMS=['Radio','Media','Green Room','Art','Band','Outing','Training','Office'];
const LEAVE_ROWS=['Annual Leave','Sick Leave'];
const ROOM_ICONS={Radio:'🎙️',Media:'📺','Green Room':'🌿',Art:'🎨',Band:'🎵',Outing:'🚐',Training:'📚',Office:'🖥️','Annual Leave':'🌴','Sick Leave':'🤒'};
const ROUTES=['East Sussex','West Sussex','Hove','Brighton'];
const ROUTE_ICONS={'East Sussex':'🚐','West Sussex':'🚐',Hove:'🚐',Brighton:'🚐'};
const DRIVER_SHIFTS=['AM','PM','EVE Pickup','Evening Return'];
const MINIBUSES=['Minibus 1','Minibus 2','Minibus 3','Minibus 4','Minibus 5'];
const DEF_STAFF_PROFILES=[
{id:'sp1',name:'Jamie',role:'Manager',phone:'',email:'',emergency:'',notes:'',color:'#E85D3A'},
{id:'sp2',name:'Sarah',role:'Support Worker',phone:'',email:'',emergency:'',notes:'',color:'#2E8B57'},
{id:'sp3',name:'Mike',role:'Support Worker',phone:'',email:'',emergency:'',notes:'',color:'#3A7BD5'},
{id:'sp4',name:'Priya',role:'Support Worker',phone:'',email:'',emergency:'',notes:'',color:'#8B5CF6'},
{id:'sp5',name:'Alex',role:'Support Worker',phone:'',email:'',emergency:'',notes:'',color:'#D97706'}
];

const DEFS={staff:['Jamie','Sarah','Mike','Priya','Alex'],departments:[
{id:'d1',name:'Radio Station',emoji:'📻',color:'#E85D3A',rag:'green',milestones:[{id:'m1',text:'Spring schedule launch',date:'2026-04-01'}],tasks:[
{id:'t1',text:'Equipment inventory & condition audit',done:true,priority:'high',assignee:'Mike',notes:[{text:'All items logged',time:'2026-02-10T09:00'}]},
{id:'t2',text:'Schedule review for Q2',done:true,priority:'med',assignee:'Jamie',notes:[]},
{id:'t3',text:'Volunteer rota for March',done:false,priority:'high',assignee:'Sarah',notes:[{text:'Waiting on 3 confirmations',time:'2026-02-20T14:30'}]},
{id:'t4',text:'Streaming migration plan',done:false,priority:'med',assignee:'Jamie',notes:[]},
{id:'t5',text:'New jingle recordings',done:false,priority:'low',assignee:'',notes:[]}]},
{id:'d2',name:'Day Services',emoji:'☀️',color:'#2E8B57',rag:'green',milestones:[],tasks:[
{id:'t6',text:'Spring activity calendar finalised',done:true,priority:'high',assignee:'Priya',notes:[]},
{id:'t7',text:'Risk assessments updated',done:true,priority:'high',assignee:'Sarah',notes:[]},
{id:'t8',text:'New referral forms distributed',done:true,priority:'med',assignee:'Alex',notes:[]},
{id:'t9',text:'Staff training sessions booked',done:false,priority:'high',assignee:'Priya',notes:[]},
{id:'t10',text:'Feedback survey to families',done:false,priority:'med',assignee:'Sarah',notes:[]},
{id:'t11',text:'Transport confirmed',done:false,priority:'low',assignee:'',notes:[]}]},
{id:'d3',name:'Respite Holidays',emoji:'🏖️',color:'#3A7BD5',rag:'amber',milestones:[{id:'m2',text:'Brochure print deadline',date:'2026-03-15'}],tasks:[
{id:'t12',text:'Summer brochure drafted',done:true,priority:'med',assignee:'Jamie',notes:[]},
{id:'t13',text:'Booking system tested',done:false,priority:'high',assignee:'Jamie',notes:[]},
{id:'t14',text:'Accommodation partners confirmed',done:false,priority:'high',assignee:'Sarah',notes:[]},
{id:'t15',text:'Staffing for peak agreed',done:false,priority:'med',assignee:'Priya',notes:[]},
{id:'t16',text:'Insurance renewal',done:false,priority:'low',assignee:'Alex',notes:[]}]},
{id:'d4',name:'Fundraising',emoji:'💜',color:'#8B5CF6',rag:'green',milestones:[{id:'m3',text:'Lottery Fund deadline',date:'2026-04-30'}],tasks:[
{id:'t17',text:'Baily Thomas grant submitted',done:true,priority:'high',assignee:'Jamie',notes:[]},
{id:'t18',text:'Lottery fund application drafted',done:true,priority:'high',assignee:'Jamie',notes:[]},
{id:'t19',text:'Corporate sponsor outreach',done:true,priority:'med',assignee:'Sarah',notes:[]},
{id:'t20',text:'Google Ad Grant application',done:false,priority:'high',assignee:'Jamie',notes:[]},
{id:'t21',text:'Summer fundraising event',done:false,priority:'med',assignee:'Alex',notes:[]},
{id:'t22',text:'Monthly donor campaign',done:false,priority:'low',assignee:'',notes:[]},
{id:'t23',text:'Impact report for funders',done:false,priority:'high',assignee:'Sarah',notes:[]}]},
{id:'d5',name:'Media Group',emoji:'🎨',color:'#D97706',rag:'green',milestones:[],tasks:[
{id:'t24',text:'Social media calendar set',done:true,priority:'med',assignee:'Mike',notes:[]},
{id:'t25',text:'Photo consent forms reviewed',done:true,priority:'high',assignee:'Priya',notes:[]},
{id:'t26',text:'Website refresh',done:false,priority:'med',assignee:'Mike',notes:[]},
{id:'t27',text:'Respite promo video',done:false,priority:'low',assignee:'Mike',notes:[]},
{id:'t28',text:'Relocation press release',done:false,priority:'high',assignee:'Jamie',notes:[]}]},
{id:'d6',name:'Relocation Project',emoji:'🏗️',color:'#0F766E',rag:'red',milestones:[{id:'m4',text:'Board site shortlist decision',date:'2026-05-01'}],tasks:[
{id:'t29',text:'Site search brief finalised',done:true,priority:'high',assignee:'Jamie',notes:[]},
{id:'t30',text:'Architect brief drafted',done:false,priority:'high',assignee:'Jamie',notes:[]},
{id:'t31',text:'Planning consultant engaged',done:false,priority:'high',assignee:'Sarah',notes:[]},
{id:'t32',text:'Capital funding strategy',done:false,priority:'high',assignee:'Jamie',notes:[]},
{id:'t33',text:'Stakeholder consultations',done:false,priority:'med',assignee:'Priya',notes:[]},
{id:'t34',text:'Residential respite business case',done:false,priority:'high',assignee:'Jamie',notes:[]}]}
],history:[],schedule:null};

let D=[],staff=[],history=[],schedule=[],serviceUsers=[],openD={},addingTo=null,editingT=null,notesOpen={},activeModal=null,view='depts';
let appMode='spiral'; // 'spiral' or 'foss'
let fossData={departments:[],staffProfiles:[],contacts:[],completedLog:[]};
let fossView='fossTasks',fossOpenD={},fossAddingTo=null,fossEditingT=null,fossNotesOpen={},fossFilterPri='all',fossFilterStaff='all',fossEditingStaff=null,fossNewStaff='',fossEditingContact=null;
let newD={name:'',emoji:'📋',color:'#3A7BD5'},newStaff='',importTxt='',toastMsg='',toastTmr=null;
let newSU={name:'',pn:'',dob:'',pc:'',ph:'',cn:'',cm:'',co:''};
let editingSUFields=null;
let incidents=[],incidentForm=null,viewingIncident=null,incidentFilter='all',currentUser=null;
let mobileMenuOpen=false,accountPwForm=null;
let usersList=[],usersLoading=false,newUserForm=null,editingUserId=null,editingUserPw=null;
const INC_TYPES={behaviour:'🤜 Behaviour',medical:'🏥 Medical',fall:'🤕 Fall / Injury','near-miss':'⚠️ Near Miss',property:'🏠 Property Damage',safeguarding:'🛡️ Safeguarding',transport:'🚐 Transport',other:'📋 Other'};
const INC_SEV={low:{label:'Low',color:'#22C55E',bg:'#F0FDF4'},medium:{label:'Medium',color:'#D97706',bg:'#FEF3C7'},high:{label:'High',color:'#DC2626',bg:'#FEF2F2'}};
let filterPri='all',filterStaff='all',msForm=null;
let syncCfg={url:'',autoSync:false,lastSync:null},syncStatus='disconnected',syncDebounce=null;
let openDays={mon:true,tue:true,wed:true,thu:true,fri:true};
let editingSess=null,expandedSess={},suSearch='',addingStaffTo=null,viewingSU=null;
let schedWeekOffset=0,weekSchedules={};
let registers={},regWeekOffset=0;
let suPageSearch='',suPageFlags=[],suPageSort='name',suAttView=false;
let staffProfiles=[],rota={},driverRota={},editingStaffId=null,rotaEditCell=null,driverEditCell=null;
let rotaWeekOffset=0,rotaSubTab='rooms';
let minibusAllocation={};
let minibusView='day';
let minibusDay='mon';
let minibusRoute=null;
let minibusWeekOffset=0;

function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}
function pct(a,b){return b>0?Math.round(a/b*100):0}
function initials(u){if(!u)return '?';return u.username.slice(0,2).toUpperCase()}
function avatarColor(u){if(!u)return '#6B7280';const cl=['#6366F1','#10B981','#F59E0B','#EF4444','#8B5CF6','#3B82F6'];let h=0;for(const c of u.username)h=(h*31+c.charCodeAt(0))%cl.length;return cl[h]}
async function doLogout(){await fetch('/api/logout',{method:'POST',credentials:'include'});window.location.href='/'}
async function changePassword(){if(!accountPwForm)return;if(accountPwForm.newPw!==accountPwForm.confirm){accountPwForm.error='New passwords do not match';render();return}accountPwForm.saving=true;accountPwForm.error='';render();try{const r=await fetch('/api/change-password',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({current:accountPwForm.current,newPassword:accountPwForm.newPw})});const d=await r.json();if(!r.ok){accountPwForm.error=d.error||'Failed';accountPwForm.saving=false;render()}else{accountPwForm=null;showToast('Password changed');render()}}catch(e){accountPwForm.error='Network error';accountPwForm.saving=false;render()}}
function stClr(n){let h=0;for(let i=0;i<n.length;i++)h=n.charCodeAt(i)+((h<<5)-h);return SC[Math.abs(h)%SC.length]}
function stIni(n){return n.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)}
function priOrd(p){return p==='high'?0:p==='med'?1:2}
function fmtDate(d){return new Date(d+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'})}
function fmtDateTime(d){return new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}
function isOverdue(d){return new Date(d+'T23:59:59')<new Date()}
function today(){return new Date().toISOString().split('T')[0]}
function showToast(m){toastMsg=m;render();clearTimeout(toastTmr);toastTmr=setTimeout(()=>{toastMsg='';render()},2200)}

// SU display name with flags
function suDisplayName(su){
if(!su)return'';
let n=su.name;
if(su.flags&&su.flags.length){n+=' '+su.flags.map(f=>'('+f+')').join('')}
return n;
}
function suNameHtml(su){
if(!su)return'';
let h=esc(su.name);
if(su.flags&&su.flags.length){h+=' <span class="flag-inline">'+su.flags.map(f=>'('+f+')').join('')+'</span>'}
return h;
}
function suFlagBadges(flags){
if(!flags||!flags.length)return'';
return flags.map(f=>{
const cls=FLAG_COLORS[f]||'';
const title=FLAG_INFO[f]||f;
return '<span class="su-flag '+cls+'" title="'+title+'">'+esc(f)+'</span>';
}).join('');
}
function showSUDetail(suId){viewingSU=suId;render()}
function closeSUDetail(){viewingSU=null;editingSUFields=null;render()}
function startEditSU(id){const su=serviceUsers.find(u=>u.id===id);if(!su)return;editingSUFields=Object.assign({},su,{flags:[...(su.flags||[])],days:[...(su.days||[])]});render()}
function cancelEditSU(){editingSUFields=null;render()}
function suEditField(f,v){if(editingSUFields)editingSUFields[f]=v}
function toggleEditSUFlag(f){if(!editingSUFields)return;const idx=editingSUFields.flags.indexOf(f);if(idx>=0)editingSUFields.flags.splice(idx,1);else editingSUFields.flags.push(f);render()}
function saveEditSU(){if(!editingSUFields||!editingSUFields.name.trim())return;const idx=serviceUsers.findIndex(u=>u.id===editingSUFields.id);if(idx<0)return;serviceUsers[idx]=Object.assign({},editingSUFields);editingSUFields=null;save();render();showToast('Saved')}
function toggleSUDay(suId,day){const su=serviceUsers.find(u=>u.id===suId);if(!su)return;if(!su.days)su.days=[];const idx=su.days.indexOf(day);if(idx>=0)su.days.splice(idx,1);else su.days.push(day);save();render()}
function renderSUDetailModal(){
const su=serviceUsers.find(u=>u.id===viewingSU);
if(!su)return'';
const isEditing=editingSUFields&&editingSUFields.id===su.id;
const e=isEditing?editingSUFields:su;
const inp=(f,ph,type)=>`<input style="width:100%;border:1px solid #E5E7EB;border-radius:8px;padding:7px 9px;font-size:12px;outline:none;font-family:inherit" type="${type||'text'}" value="${esc(e[f]||'')}" placeholder="${ph||''}" oninput="suEditField('${f}',this.value)">`;
const ta=(f,ph)=>`<textarea style="width:100%;border:1px solid #E5E7EB;border-radius:8px;padding:7px 9px;font-size:12px;outline:none;font-family:inherit;resize:vertical;min-height:56px" placeholder="${ph||''}" oninput="suEditField('${f}',this.value)">${esc(e[f]||'')}</textarea>`;
const row=(lbl,content)=>`<div style="display:flex;flex-direction:column;gap:3px;margin-bottom:2px"><span style="font-size:10px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.4px">${lbl}</span>${content}</div>`;
const dr=(lbl,val)=>val?`<div class="su-detail-row"><span class="lbl">${lbl}</span><span class="val">${esc(val)}</span></div>`:'';
const pair=(a,b)=>`<div style="display:flex;gap:8px">${a}${b}</div>`;
let h=`<div class="su-detail-overlay" onclick="if(event.target===this){cancelEditSU();closeSUDetail()}"><div class="su-detail-card">`;
h+=`<div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:8px">`;
if(isEditing){h+=`<div style="flex:1;margin-right:8px"><input style="width:100%;border:1px solid #E5E7EB;border-radius:8px;padding:7px 9px;font-size:15px;font-weight:700;outline:none;font-family:inherit" value="${esc(e.name)}" placeholder="Full name" oninput="suEditField('name',this.value)"></div>`;}
else{h+=`<div><h3>${esc(su.name)}</h3>${su.pn?`<div class="su-pref">Prefers: "${esc(su.pn)}"</div>`:''}${(su.flags||[]).length?`<div style="margin:6px 0">${suFlagBadges(su.flags)}</div>`:''}</div>`;}
h+=`<div style="display:flex;gap:4px">`;
if(!isEditing)h+=`<button onclick="startEditSU('${su.id}')" style="border:none;background:#EEF2FF;color:#6366F1;border-radius:8px;padding:6px 10px;font-size:11px;font-weight:600;cursor:pointer">✏️ Edit</button>`;
h+=`<button onclick="cancelEditSU();closeSUDetail()" style="border:none;background:#F3F4F6;border-radius:8px;width:30px;height:30px;cursor:pointer;font-size:16px">✕</button>`;
h+=`</div></div>`;
if(isEditing){
h+=`<div style="display:flex;flex-direction:column;gap:10px">`;
// Personal
h+=`<div class="su-detail-section"><h4>👤 Personal</h4><div style="display:flex;flex-direction:column;gap:6px">`;
h+=pair(row('Preferred Name',inp('pn','e.g. Johnny')),row('Date of Birth',inp('dob','','date')));
h+=row('Address',inp('addr','Street address'));
h+=pair(row('Town',inp('town','Town')),row('Postcode',inp('pc','BN1 1AA')));
h+=pair(row('Phone',inp('ph','Phone')),row('Email',inp('em','Email')));
h+=pair(row('First Language',inp('lang','Language')),row('Other Languages',inp('lang2','Other')));
h+=row('Who lives in my house?',inp('household','Household'));
h+=`</div></div>`;
// About Me
h+=`<div class="su-detail-section"><h4>🌟 About Me</h4><div style="display:flex;flex-direction:column;gap:6px">`;
h+=row('Special people in my life',inp('specialPeople','Family, friends...'));
h+=row('Things that excite me and make me happy',ta('excites','What makes me happy...'));
h+=row('Favourite activities, books, places',ta('favActivities','Hobbies, interests...'));
h+=row('Things I like doing outside',inp('outdoors','Outdoor activities'));
h+=row('My weekly routines',ta('routines','Typical week...'));
h+=pair(row('Celebrations',inp('celebrates','What we celebrate')),row('Experience away from family',inp('awayExp','How I manage...')));
h+=row('Important events in my life',ta('importantEvents','Milestones, memories...'));
h+=`</div></div>`;
// Support & Communication
h+=`<div class="su-detail-section"><h4>💬 Support & Communication</h4><div style="display:flex;flex-direction:column;gap:6px">`;
h+=row('How I communicate',ta('comm','Communication style...'));
h+=row('How I respond to new people or situations',ta('newPeople','Response to new people...'));
h+=row('Things I can get angry or upset about',ta('angryTriggers','Triggers...'));
h+=pair(row('Things that comfort me',inp('comfortThings','Comfort strategies')),row('How I handle disappointment',inp('disappointment','Handles disappointment')));
h+=row("Things I'm good at",ta('goodAt','Strengths...'));
h+=row('Things I need help with',ta('needsHelp','Support needs...'));
h+=`</div></div>`;
// Food & Drink
h+=`<div class="su-detail-section"><h4>🍽️ Food & Drink</h4><div style="display:flex;flex-direction:column;gap:6px">`;
h+=pair(row('I usually eat',inp('usualEat','Typical diet')),row('I do not like',inp('dislikes','Dislikes')));
h+=pair(row('Favourite foods',inp('favFoods','Favourite foods')),row('Favourite drinks',inp('favDrinks','Favourite drinks')));
h+=`</div></div>`;
// Goals
h+=`<div class="su-detail-section"><h4>🎯 Goals</h4>${row('What goals I would like to achieve',ta('goals','Goals...'))}</div>`;
// Flags
h+=`<div class="su-detail-section"><h4>🚩 Flags</h4><div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">`;
Object.keys(FLAG_INFO).forEach(f=>{const on=(editingSUFields.flags||[]).includes(f);h+=`<button onclick="toggleEditSUFlag('${f}')" style="border:1.5px solid ${on?'#6366F1':'#E5E7EB'};background:${on?'#EEF2FF':'white'};border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;cursor:pointer" title="${FLAG_INFO[f]}">${f}</button>`});
h+=`</div>`;
const ef=editingSUFields.flags||[];
if(ef.includes('V/H'))h+=`<div style="margin-top:4px">${row('Visual/Hearing details',ta('vhDetails','Details...'))}</div>`;
if(ef.includes('M'))h+=`<div style="margin-top:4px">${row('Mobility details',ta('mobilityDetails','Details...'))}</div>`;
if(ef.includes('DS'))h+=`<div style="margin-top:4px">${row('Atlanto-axial instability X-Ray result',inp('dsXray','X-Ray result'))}</div>`;
if(ef.includes('E'))h+=`<div style="display:flex;flex-direction:column;gap:4px;margin-top:4px">${row('Epilepsy — how often?',inp('epilepsyFreq','Frequency'))}${row('Requires rectal/buccal medication?',inp('epilepsyMed','Yes/No + details'))}${row('Additional epilepsy details',ta('epilepsyAdd','Details...'))}</div>`;
if(ef.includes('Di'))h+=`<div style="display:flex;flex-direction:column;gap:4px;margin-top:4px">${row('Diabetes — how often hypo?',inp('diabetesFreq','Frequency'))}${row('Requires injected medication?',inp('diabetesMed','Yes/No'))}${row('Additional diabetes details',ta('diabetesAdd','Details...'))}</div>`;
if(ef.includes('A'))h+=`<div style="display:flex;flex-direction:column;gap:4px;margin-top:4px">${row('Asthma — how often severe attacks?',inp('asthmaFreq','Frequency'))}${row('Requires nebulised medication?',inp('asthmaMed','Yes/No'))}${row('Hospitalised with severe attack last year?',inp('asthmaHosp','Yes/No'))}${row('Additional asthma details',ta('asthmaAdd','Details...'))}</div>`;
if(ef.includes('H'))h+=`<div style="display:flex;flex-direction:column;gap:4px;margin-top:4px">${row('Attends cardiology clinic?',inp('heartClinic','Yes/No'))}${row('Special precautions',ta('heartPrecautions','Precautions...'))}</div>`;
h+=`</div>`;
// Carer
h+=`<div class="su-detail-section"><h4>🤝 Carer</h4><div style="display:flex;flex-direction:column;gap:6px">`;
h+=row('Organisation',inp('co','Care organisation'));
h+=pair(row('Carer Name',inp('cn','Carer / next of kin')),row('Mobile',inp('cm','Mobile')));
h+=pair(row('Home Phone',inp('chp','Home phone')),row('Email',inp('cem','Email')));
h+=row('Carer Address',inp('cadr','Address'));
h+=`</div></div>`;
// Emergency Contacts
h+=`<div class="su-detail-section"><h4>🚨 Emergency Contacts</h4><div style="display:flex;flex-direction:column;gap:6px">`;
h+=pair(row('Contact 1',inp('ec1','Name')),row('Phone',inp('ep1','Phone')));
h+=pair(row('Contact 2',inp('ec2','Name')),row('Phone',inp('ep2','Phone')));
h+=`</div></div>`;
// Medical
h+=`<div class="su-detail-section"><h4>🏥 Medical</h4><div style="display:flex;flex-direction:column;gap:6px">`;
h+=row('Medical Conditions & Disabilities',ta('med','Conditions...'));
h+=pair(row('Allergies',inp('allg','Allergies')),row('Food Allergy Details',inp('foodAllergyDet','Details')));
h+=pair(row('Dietary Needs',inp('diet','Dietary')),row('Vegetarian?',inp('vegetarian','Yes/No')));
h+=row('Other dietary requirements / feeding aids',inp('otherDietReq','Details'));
h+=row('Other medical conditions / injuries',ta('otherMed','Details...'));
h+=row('Recent treatment / hospitalised (last 2 years)',ta('hospitalHistory','Details...'));
h+=row('Medication Administration Notes',ta('ma','Admin notes...'));
h+=`<div>${row('Medication Admin Consent',`<select style="width:100%;border:1px solid #E5E7EB;border-radius:8px;padding:7px 9px;font-size:12px;outline:none;background:white" onchange="suEditField('maType',this.value)"><option value="">Select...</option><option value="1. Administration" ${e.maType==='1. Administration'?'selected':''}>1. Administration (staff give)</option><option value="2. Self-administered" ${e.maType==='2. Self-administered'?'selected':''}>2. Self-administered</option><option value="3. Monitored" ${e.maType==='3. Monitored'?'selected':''}>3. Monitored</option></select>`)}</div>`;
h+=pair(row('GP Name',inp('gp','GP name')),row('Surgery',inp('surg','Surgery name')));
h+=row('Clinic Address',inp('clinicAddr','Clinic address'));
h+=pair(row('Emergency Clinic Contact',inp('clinicContact','Contact name')),row('Phone',inp('clinicPhone','Phone')));
h+=`</div></div>`;
// Behaviour
h+=`<div class="su-detail-section"><h4>⚠️ Behaviour</h4><div style="display:flex;flex-direction:column;gap:6px">`;
h+=row('Behavioural Issues (general)',ta('beh','Behaviour notes...'));
h+=row('Aggressive / abusive behaviour details',ta('aggressiveDet','Details...'));
h+=row('Self-harm details',ta('selfHarmDet','Details...'));
h+=row('Socially inappropriate behaviour details',ta('inappropriateDet','Details...'));
h+=`</div></div>`;
// Support Needs
h+=`<div class="su-detail-section"><h4>🤲 Support Needs</h4><div style="display:flex;flex-direction:column;gap:6px">`;
h+=row('Walking off details',ta('walkOffDet','Details...'));
h+=row('Walking difficulties details',ta('walkDiffDet','Details...'));
h+=row('Toileting / Incontinence details',ta('toiletingDet','Details...'));
h+=pair(row('Snoring / Insomnia details',inp('snoreDet','Details')),row('Other support needs',inp('otherSupportDet','Details')));
h+=`</div></div>`;
// Scheduled Days
h+=`<div class="su-detail-section"><h4>📅 Scheduled Days</h4><div class="su-days-row">`;
ROTA_DAYS.forEach(d=>{const isOn=(editingSUFields.days||[]).includes(d);h+=`<button class="su-day-tog ${isOn?'on':''}" onclick="event.stopPropagation();if(editingSUFields){const idx=editingSUFields.days.indexOf('${d}');if(idx>=0)editingSUFields.days.splice(idx,1);else editingSUFields.days.push('${d}');render()}">${DAY_NAMES[d].slice(0,3)}</button>`});
h+=`</div></div>`;
// Default Transport
const dtVal=editingSUFields.defaultTransport||'bus';
h+=`<div class="su-detail-section"><h4>🚐 Default Transport</h4><div style="display:flex;gap:6px">`;
h+=`<button onclick="event.stopPropagation();editingSUFields.defaultTransport='bus';render()" style="flex:1;border:2px solid ${dtVal==='bus'?'#3A7BD5':'#E5E7EB'};background:${dtVal==='bus'?'#EFF6FF':'white'};color:${dtVal==='bus'?'#3A7BD5':'#6B7280'};border-radius:10px;padding:9px;font-size:12px;font-weight:700;cursor:pointer">🚐 Bus</button>`;
h+=`<button onclick="event.stopPropagation();editingSUFields.defaultTransport='personal';render()" style="flex:1;border:2px solid ${dtVal==='personal'?'#D97706':'#E5E7EB'};background:${dtVal==='personal'?'#FFFBEB':'white'};color:${dtVal==='personal'?'#D97706':'#6B7280'};border-radius:10px;padding:9px;font-size:12px;font-weight:700;cursor:pointer">🚗 Personal Transport</button>`;
h+=`</div></div>`;
h+=`<div style="display:flex;gap:8px;margin-top:4px"><button onclick="saveEditSU()" style="flex:1;border:none;background:#1F2937;color:white;border-radius:10px;padding:11px;font-size:13px;font-weight:600;cursor:pointer">Save</button><button onclick="cancelEditSU()" style="border:none;background:#F3F4F6;color:#6B7280;border-radius:10px;padding:11px 16px;font-size:13px;font-weight:600;cursor:pointer">Cancel</button></div>`;
h+=`</div>`;
}else{
// Read-only view
h+=`<div class="su-detail-section"><h4>📋 Contact</h4>`;
h+=dr('DOB',su.dob)+dr('Address',[su.addr,su.town,su.pc].filter(Boolean).join(', '))+dr('Phone',su.ph)+dr('Email',su.em);
h+=`</div>`;
if(su.lang||su.household){h+=`<div class="su-detail-section"><h4>🏡 Home & Language</h4>`;
h+=dr('First language',su.lang)+dr('Other languages',su.lang2)+dr('Household',su.household)+dr('Away experience',su.awayExp);h+=`</div>`}
if([su.specialPeople,su.excites,su.favActivities,su.outdoors,su.routines,su.celebrates,su.importantEvents].some(Boolean)){
h+=`<div class="su-detail-section"><h4>🌟 About Me</h4>`;
h+=dr('Special people',su.specialPeople)+dr('Things that excite me',su.excites)+dr('Favourite activities',su.favActivities)+dr('Outdoor activities',su.outdoors)+dr('Weekly routines',su.routines)+dr('Celebrations',su.celebrates)+dr('Important events',su.importantEvents);h+=`</div>`}
if([su.comm,su.newPeople,su.angryTriggers,su.comfortThings,su.disappointment,su.goodAt,su.needsHelp].some(Boolean)){
h+=`<div class="su-detail-section"><h4>💬 Support & Communication</h4>`;
h+=dr('Communication',su.comm)+dr('New people/situations',su.newPeople)+dr('Anger triggers',su.angryTriggers)+dr('Comfort',su.comfortThings)+dr('Disappointment',su.disappointment)+dr('Good at',su.goodAt)+dr('Needs help with',su.needsHelp);h+=`</div>`}
if(su.favFoods||su.favDrinks||su.usualEat||su.dislikes){h+=`<div class="su-detail-section"><h4>🍽️ Food & Drink</h4>`;
h+=dr('Usually eats',su.usualEat)+dr('Favourite foods',su.favFoods)+dr('Favourite drinks',su.favDrinks)+dr('Dislikes',su.dislikes);h+=`</div>`}
if(su.goals){h+=`<div class="su-detail-section"><h4>🎯 Goals</h4>${dr('Goals',su.goals)}</div>`}
if(su.cn||su.co){h+=`<div class="su-detail-section"><h4>🤝 Carer</h4>`;
h+=dr('Organisation',su.co)+dr('Name',su.cn)+dr('Mobile',su.cm)+dr('Home phone',su.chp)+dr('Email',su.cem)+dr('Address',su.cadr);h+=`</div>`}
if(su.ec1||su.ec2){h+=`<div class="su-detail-section"><h4>🚨 Emergency Contacts</h4>`;
if(su.ec1)h+=dr('Contact 1',su.ec1+(su.ep1?' · '+su.ep1:''));
if(su.ec2)h+=dr('Contact 2',su.ec2+(su.ep2?' · '+su.ep2:''));h+=`</div>`}
h+=`<div class="su-detail-section"><h4>🏥 Medical</h4>`;
h+=dr('Conditions',su.med)+dr('Allergies',su.allg)+dr('Food allergies',su.foodAllergyDet)+dr('Dietary',su.diet)+dr('Vegetarian',su.vegetarian)+dr('Other dietary',su.otherDietReq)+dr('Other medical',su.otherMed)+dr('Recent treatment',su.hospitalHistory)+dr('Medication admin',su.ma)+dr('MA Consent',su.maType);
if(su.gp||su.surg)h+=dr('GP/Surgery',(su.gp||'')+(su.surg?' @ '+su.surg:''));
h+=dr('Clinic',su.clinicAddr)+dr('Emergency clinic',[su.clinicContact,su.clinicPhone].filter(Boolean).join(' · '));
h+=`</div>`;
const flgs=su.flags||[];
const flagDets=[];
if(flgs.includes('V/H')&&su.vhDetails)flagDets.push(['Visual/Hearing',su.vhDetails]);
if(flgs.includes('M')&&su.mobilityDetails)flagDets.push(['Mobility',su.mobilityDetails]);
if(flgs.includes('DS')&&su.dsXray)flagDets.push(['DS X-Ray',su.dsXray]);
if(flgs.includes('E')&&(su.epilepsyFreq||su.epilepsyMed||su.epilepsyAdd))flagDets.push(['Epilepsy',[su.epilepsyFreq,su.epilepsyMed,su.epilepsyAdd].filter(Boolean).join(' · ')]);
if(flgs.includes('Di')&&(su.diabetesFreq||su.diabetesAdd))flagDets.push(['Diabetes',[su.diabetesFreq,su.diabetesMed,su.diabetesAdd].filter(Boolean).join(' · ')]);
if(flgs.includes('A')&&(su.asthmaFreq||su.asthmaAdd))flagDets.push(['Asthma',[su.asthmaFreq,su.asthmaMed,su.asthmaAdd].filter(Boolean).join(' · ')]);
if(flgs.includes('H')&&(su.heartClinic||su.heartPrecautions))flagDets.push(['Heart',[su.heartClinic,su.heartPrecautions].filter(Boolean).join(' · ')]);
if(flagDets.length){h+=`<div class="su-detail-section"><h4>🚩 Flag Details</h4>`;flagDets.forEach(([l,v])=>{h+=dr(l,v)});h+=`</div>`}
if([su.beh,su.aggressiveDet,su.selfHarmDet,su.inappropriateDet].some(Boolean)){
h+=`<div class="su-detail-section"><h4>⚠️ Behaviour</h4>`;
h+=dr('Behaviour',su.beh)+dr('Aggressive behaviour',su.aggressiveDet)+dr('Self-harm',su.selfHarmDet)+dr('Inappropriate behaviour',su.inappropriateDet);h+=`</div>`}
if([su.walkOffDet,su.walkDiffDet,su.toiletingDet,su.snoreDet,su.otherSupportDet].some(Boolean)){
h+=`<div class="su-detail-section"><h4>🤲 Support Needs</h4>`;
h+=dr('Walking off',su.walkOffDet)+dr('Walking difficulties',su.walkDiffDet)+dr('Toileting',su.toiletingDet)+dr('Snoring/Insomnia',su.snoreDet)+dr('Other',su.otherSupportDet);h+=`</div>`}
h+=`<div class="su-detail-section"><h4>📅 Scheduled Days</h4><div class="su-days-row">`;
ROTA_DAYS.forEach(d=>{const isOn=(su.days||[]).includes(d);
if(appMode==='foss'){h+=`<span class="su-day-tog ${isOn?'on':''}" style="cursor:default">${DAY_NAMES[d].slice(0,3)}</span>`;}
else{h+=`<button class="su-day-tog ${isOn?'on':''}" onclick="event.stopPropagation();toggleSUDay('${su.id}','${d}')">${DAY_NAMES[d].slice(0,3)}</button>`;}});
h+=`</div></div>`;
}
h+=`</div></div>`;
return h;
}

// Migrate old schedule format (staffName/staffEmoji -> staffList)
function migrateSession(s){
if(!s.staffList){
s.staffList=[];
if(s.staffName)s.staffList.push({name:s.staffName,emoji:s.staffEmoji||'🎯'});
delete s.staffName;delete s.staffEmoji;
}
if(!s.assignedSUs)s.assignedSUs=[];
if(!s.location)s.location='';
if(!s.locationEmoji)s.locationEmoji='📍';
return s;
}

// Server API
let serverMode=false; // true if running on server
let saveDebounce=null;

function getDataObj(){return {departments:D,staff,history,schedule,serviceUsers,staffProfiles,rota,driverRota,weekSchedules,registers,fossData,incidents,minibusAllocation}}

function load(){
// Detect if we're on the server (not file:// or github.io)
const isServer=location.protocol==='http:'||location.protocol==='https:';
const isLocal=location.hostname==='localhost'||location.hostname==='127.0.0.1';
const isGitHub=location.hostname.includes('github.io');
serverMode=isServer&&(isLocal||!isGitHub);

if(serverMode){
// Try server load
serverLoad().then(ok=>{
if(!ok){loadFromLS();render()}
}).catch(()=>{loadFromLS();render()});
return;
}
loadFromLS();
}

function loadFromLS(){
let d=null;
const tryKeys=['spiral-tracker-data','spiral-v8','spiral-v7','spiral-v6'];
for(const key of tryKeys){try{const raw=localStorage.getItem(key);if(raw){const parsed=JSON.parse(raw);if(parsed&&parsed.departments){d=parsed;if(key!==SK){localStorage.removeItem(key)}break}}}catch{}}
if(d){
D=d.departments||JSON.parse(JSON.stringify(DEFS.departments));
staff=d.staff||[...DEFS.staff];
history=d.history||[];
schedule=(d.schedule||JSON.parse(JSON.stringify(DEF_SCHEDULE))).map(migrateSession);
serviceUsers=d.serviceUsers||JSON.parse(JSON.stringify(DEF_SUS));
staffProfiles=d.staffProfiles||JSON.parse(JSON.stringify(DEF_STAFF_PROFILES));
rota=d.rota||{};
driverRota=d.driverRota||{};
weekSchedules=d.weekSchedules||{};
registers=d.registers||{};
fossData=d.fossData||{departments:[],staffProfiles:[],contacts:[],completedLog:[]};
saveToLS();return;
}
D=JSON.parse(JSON.stringify(DEFS.departments));staff=[...DEFS.staff];history=[];schedule=JSON.parse(JSON.stringify(DEF_SCHEDULE));serviceUsers=JSON.parse(JSON.stringify(DEF_SUS));staffProfiles=JSON.parse(JSON.stringify(DEF_STAFF_PROFILES));rota={};driverRota={};weekSchedules={};registers={};fossData={departments:[],staffProfiles:[],contacts:[],completedLog:[]};
}

function applyData(d){
D=d.departments||JSON.parse(JSON.stringify(DEFS.departments));
staff=d.staff||[...DEFS.staff];
history=d.history||[];
schedule=(d.schedule||JSON.parse(JSON.stringify(DEF_SCHEDULE))).map(migrateSession);
serviceUsers=d.serviceUsers||JSON.parse(JSON.stringify(DEF_SUS));
staffProfiles=d.staffProfiles||JSON.parse(JSON.stringify(DEF_STAFF_PROFILES));
rota=d.rota||{};
driverRota=d.driverRota||{};
weekSchedules=d.weekSchedules||{};
registers=d.registers||{};
fossData=d.fossData||{departments:[],staffProfiles:[],contacts:[],completedLog:[]};
incidents=d.incidents||[];
minibusAllocation=d.minibusAllocation||{};
staff=staffProfiles.map(p=>p.name);
}

async function serverLoad(){
try{
const r=await fetch('/api/data',{credentials:'include'});
if(r.status===401){showToast('Login failed');return false}
if(!r.ok)throw 0;
const json=await r.json();
if(json.data&&json.data.departments){
applyData(json.data);
saveToLS();
render();
return true;
}
// No data on server yet — load from localStorage and push up
loadFromLS();
await saveToServer();
render();
showToast('Migrated local data to server');
return true;
}catch(e){return false}
}

function save(){
staff=staffProfiles.map(p=>p.name);
saveToLS();
if(serverMode){
clearTimeout(saveDebounce);
saveDebounce=setTimeout(()=>saveToServer(),800);
}
if(syncCfg.url&&syncCfg.autoSync){clearTimeout(syncDebounce);syncDebounce=setTimeout(()=>pushToSheet(),1500)}
}

function saveToLS(){
try{localStorage.setItem(SK,JSON.stringify(getDataObj()))}catch{}
}

async function saveToServer(){
try{
const r=await fetch('/api/data',{
method:'POST',
headers:{'Content-Type':'application/json'},
credentials:'include',
body:JSON.stringify({data:getDataObj()})
});
if(!r.ok)throw new Error('Status '+r.status);
const syncDot=document.querySelector('.sync-server-dot');
if(syncDot){syncDot.style.background='#22C55E';setTimeout(()=>{syncDot.style.background='#D1D5DB'},1500)}
}catch(e){console.error('Server save error:',e);showToast('Server save failed — saved locally')}
}
function loadSyncCfg(){try{const c=JSON.parse(localStorage.getItem(SYNC_KEY));if(c)syncCfg=c}catch{}}
function saveSyncCfg(){try{localStorage.setItem(SYNC_KEY,JSON.stringify(syncCfg))}catch{}}

const APPS_SCRIPT_CODE=`function doPost(e){var d=JSON.parse(e.postData.contents);var ss=SpreadsheetApp.getActiveSpreadsheet();var sh=ss.getSheetByName('SpiralData')||ss.insertSheet('SpiralData');sh.clear();sh.getRange(1,1).setValue(JSON.stringify(d));sh.getRange(1,2).setValue(new Date().toISOString());
// SU sheet sync - comprehensive fields
if(d.serviceUsers){var su=ss.getSheetByName('ServiceUsers')||ss.insertSheet('ServiceUsers');su.clear();var hdr=['ID','Name','Flags','DOB','Postcode','Phone','Email','Carer Name','Carer Mobile','Carer Org','Emergency Contact','Emergency Phone','Medical Conditions','Behaviour','Dietary','Allergies','Medication Admin','GP','Surgery','Preferred Name','Communication'];su.getRange(1,1,1,hdr.length).setValues([hdr]);su.getRange(1,1,1,hdr.length).setFontWeight('bold');d.serviceUsers.forEach(function(s,i){su.getRange(i+2,1,1,hdr.length).setValues([[s.id,s.name,(s.flags||[]).join(','),s.dob||'',s.pc||'',s.ph||'',s.em||'',s.cn||'',s.cm||'',s.co||'',s.ec1||'',s.ep1||'',s.med||'',s.beh||'',s.diet||'',s.allg||'',s.ma||'',s.gp||'',s.surg||'',s.pn||'',s.comm||'']]);});}
// Incidents sheet
if(d.incidents||d._action==='incidents'){var inc=ss.getSheetByName('Incidents')||ss.insertSheet('Incidents');inc.clear();var ih=['ID','Date','Time','Type','Severity','Status','SUs Involved','Staff Involved','Location','Description','Action Taken','Reported To','Follow-Up','External Report','External Body','Created By','Created At'];inc.getRange(1,1,1,ih.length).setValues([ih]);inc.getRange(1,1,1,ih.length).setFontWeight('bold');(d.incidents||[]).forEach(function(i,n){inc.getRange(n+2,1,1,ih.length).setValues([[i.id,i.date||'',i.time||'',i.type||'',i.severity||'',i.status||'open',(i.suNames||[]).join(', '),(i.staffInvolved||[]).join(', '),i.location||'',i.description||'',i.actionTaken||'',i.reportedTo||'',i.followUp||'',i.externalReport?'Yes':'No',i.externalBody||'',i.createdBy||'',i.createdAt||'']]);});}
return ContentService.createTextOutput('ok');}
function doGet(e){var ss=SpreadsheetApp.getActiveSpreadsheet();
if(e.parameter.action==='getSUs'){var su=ss.getSheetByName('ServiceUsers');if(!su)return ContentService.createTextOutput('{}').setMimeType(ContentService.MimeType.JSON);var data=su.getDataRange().getValues();var hdr=data[0];var sus=[];for(var i=1;i<data.length;i++){if(data[i][1]){var s={id:data[i][0],name:data[i][1],flags:data[i][2]?data[i][2].split(','):[]};for(var j=3;j<hdr.length;j++){var key=['dob','pc','ph','em','cn','cm','co','ec1','ep1','med','beh','diet','allg','ma','gp','surg','pn','comm'][j-3];if(key&&data[i][j])s[key]=String(data[i][j]);}sus.push(s);}}return ContentService.createTextOutput(JSON.stringify({serviceUsers:sus})).setMimeType(ContentService.MimeType.JSON);}
var sh=ss.getSheetByName('SpiralData');if(!sh)return ContentService.createTextOutput('{}').setMimeType(ContentService.MimeType.JSON);var v=sh.getRange(1,1).getValue();return ContentService.createTextOutput(v||'{}').setMimeType(ContentService.MimeType.JSON);}`;

async function pushToSheet(){if(!syncCfg.url)return;syncStatus='syncing';render();try{await fetch(syncCfg.url,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify({departments:D,staff,history,schedule,serviceUsers,_ts:Date.now()})});syncCfg.lastSync=new Date().toISOString();saveSyncCfg();syncStatus='connected';render();showToast('Synced ✓')}catch{syncStatus='error';render();showToast('Sync failed')}}
async function pullFromSheet(){if(!syncCfg.url)return;syncStatus='syncing';render();try{const r=await fetch(syncCfg.url+'?action=get&t='+Date.now());if(!r.ok)throw 0;const data=await r.json();if(data&&data.departments){D=data.departments;staff=data.staff||staff;history=data.history||history;schedule=(data.schedule||schedule).map(migrateSession);if(data.serviceUsers)serviceUsers=data.serviceUsers;save();syncCfg.lastSync=new Date().toISOString();saveSyncCfg();syncStatus='connected';render();showToast('Pulled ✓')}else{syncStatus='connected';render();showToast('Empty — push first')}}catch{syncStatus='error';render();showToast('Pull failed')}}
async function pullSUsFromSheet(){if(!syncCfg.url)return;try{const r=await fetch(syncCfg.url+'?action=getSUs&t='+Date.now());if(!r.ok)throw 0;const data=await r.json();if(data&&data.serviceUsers&&data.serviceUsers.length){serviceUsers=data.serviceUsers;save();render();showToast('SU data refreshed ✓ ('+data.serviceUsers.length+')')}}catch{showToast('SU pull failed')}}
async function testConnection(){if(!syncCfg.url){showToast('Enter URL first');return}syncStatus='syncing';render();try{const r=await fetch(syncCfg.url+'?action=get&t='+Date.now());if(r.ok){syncStatus='connected';render();showToast('Connected ✓')}else throw 0}catch{syncStatus='error';render();showToast('Connection failed')}}

// Schedule week helpers
function getActiveSchedule(){
const wk=getWeekKey(schedWeekOffset);
if(weekSchedules[wk])return weekSchedules[wk];
return schedule;
}
function ensureWeekSchedule(){
const wk=getWeekKey(schedWeekOffset);
if(!weekSchedules[wk]){
weekSchedules[wk]=JSON.parse(JSON.stringify(schedule)).map(s=>{s.id=uid();s.assignedSUs=[];return s});
save();
}
return weekSchedules[wk];
}
function findSessInActive(id){return getActiveSchedule().find(x=>x.id===id)}
function copyWeekSchedule(fromOffset,toOffset){
const fromWk=getWeekKey(fromOffset),toWk=getWeekKey(toOffset);
const src=weekSchedules[fromWk]||schedule;
weekSchedules[toWk]=JSON.parse(JSON.stringify(src)).map(s=>{s.id=uid();return s});
save();render();showToast('Sessions copied to '+toWk);
}

// Schedule actions
function addSession(day,period){
const wk=getWeekKey(schedWeekOffset);
if(schedWeekOffset!==0&&!weekSchedules[wk])ensureWeekSchedule();
const target=schedWeekOffset===0?schedule:weekSchedules[wk];
const newS={id:uid(),name:'',day,period,spaces:10,staffList:[],community:false,note:'',location:'Spiral Centre',locationEmoji:'\u{1F3E0}',assignedSUs:[]};
target.push(newS);editingSess=newS.id;save();render();
}
function deleteSession(id){
if(!confirm('Remove session?'))return;
const wk=getWeekKey(schedWeekOffset);
if(schedWeekOffset===0){schedule=schedule.filter(s=>s.id!==id)}
else if(weekSchedules[wk]){weekSchedules[wk]=weekSchedules[wk].filter(s=>s.id!==id)}
save();render();showToast('Removed');
}
function updateSess(id,field,val){const s=findSessInActive(id);if(s){if(field==='spaces')s[field]=parseInt(val)||0;else s[field]=val}save()}
function toggleCommunity(id){const s=findSessInActive(id);if(s)s.community=!s.community;save();render()}

// Multi-staff
function addStaffToSession(sessId){const s=findSessInActive(sessId);if(s){s.staffList.push({name:'',emoji:'\u{1F3AF}'});save();render()}}
function removeStaffFromSession(sessId,idx){const s=findSessInActive(sessId);if(s&&s.staffList.length>0){s.staffList.splice(idx,1);save();render()}}
function updateStaffInSession(sessId,idx,field,val){const s=findSessInActive(sessId);if(s&&s.staffList[idx]){s.staffList[idx][field]=val;save()}}

// SU assignment
function toggleSUAssign(sessId,suId){
const s=findSessInActive(sessId);
if(!s)return;
if(!s.assignedSUs)s.assignedSUs=[];
const idx=s.assignedSUs.indexOf(suId);
if(idx>=0)s.assignedSUs.splice(idx,1);else s.assignedSUs.push(suId);
save();render();
}

// ====== FOSS FUNCTIONS ======
function switchMode(m){appMode=m;if(m==='foss'&&!fossView)fossView='fossTasks';render()}
function fD(){return fossData.departments}
function fSP(){return fossData.staffProfiles}
function fC(){return fossData.contacts}
function fStaff(){return fSP().map(p=>p.name)}

// FOSS Tasks
function fossAddDept(){const n=prompt('Department name:');if(!n)return;fossData.departments.push({id:uid(),name:n.trim(),emoji:'📁',color:'#6366F1',tasks:[],rag:'none',milestones:[]});save();render()}
function fossDeleteDept(id){if(!confirm('Delete department?'))return;fossData.departments=fossData.departments.filter(d=>d.id!==id);save();render()}
function fossToggleTask(dId,tId){const d=fD().find(x=>x.id===dId);if(d){const t=d.tasks.find(x=>x.id===tId);if(t){t.done=!t.done;if(t.done){fossData.completedLog.push({text:t.text,dept:d.name,assignee:t.assignee||'Unassigned',completedAt:new Date().toISOString()});if(fossData.completedLog.length>200)fossData.completedLog=fossData.completedLog.slice(-200)}}}save();render()}
function fossDeleteTask(dId,tId){const d=fD().find(x=>x.id===dId);if(d)d.tasks=d.tasks.filter(t=>t.id!==tId);save();render()}
function fossUpdateTF(dId,tId,f,v){const d=fD().find(x=>x.id===dId);if(d){const t=d.tasks.find(x=>x.id===tId);if(t)t[f]=v}save();render()}
function fossAddTask(dId){const d=fD().find(x=>x.id===dId);if(!d)return;const inp=document.getElementById('fatf-t-'+dId);const pri=document.getElementById('fatf-p-'+dId);const stf=document.getElementById('fatf-s-'+dId);const txt=inp?.value?.trim();if(!txt)return;d.tasks.push({id:uid(),text:txt,done:false,priority:pri?.value||'med',assignee:stf?.value||'',notes:[]});fossAddingTo=null;save();render();showToast('Added')}
function fossSetRag(dId,val){const d=fD().find(x=>x.id===dId);if(d){d.rag=d.rag===val?'none':val;save();render()}}
function fossAddNote(dId,tId){const inp=document.getElementById('fn-'+tId);const txt=inp?.value?.trim();if(!txt)return;const d=fD().find(x=>x.id===dId);if(!d)return;const t=d.tasks.find(x=>x.id===tId);if(!t)return;if(!t.notes)t.notes=[];t.notes.push({id:uid(),text:txt,ts:new Date().toISOString()});save();render()}

// FOSS Staff
function fossAddStaff(){const n=prompt('Staff name:');if(!n||fSP().some(p=>p.name===n.trim()))return;const colors=['#6366F1','#EC4899','#F59E0B','#10B981','#3B82F6','#8B5CF6','#EF4444','#14B8A6'];fossData.staffProfiles.push({id:'fp'+uid(),name:n.trim(),role:'Volunteer',phone:'',email:'',notes:'',color:colors[fSP().length%colors.length]});save();render()}
function fossUpdateStaff(id,field,val){const p=fSP().find(s=>s.id===id);if(p){p[field]=val;save();render()}}
function fossRemoveStaff(id){if(!confirm('Remove staff member?'))return;fossData.staffProfiles=fSP().filter(s=>s.id!==id);save();render()}

// FOSS Contacts
function fossAddContact(){fossData.contacts.push({id:'fc'+uid(),name:'',role:'',phone:'',email:'',org:'',notes:''});fossEditingContact=fossData.contacts[fossData.contacts.length-1].id;save();render()}
function fossUpdateContact(id,field,val){const c=fC().find(x=>x.id===id);if(c){c[field]=val;save()}}
function fossDeleteContact(id){if(!confirm('Remove contact?'))return;fossData.contacts=fC().filter(c=>c.id!==id);save();render()}

// ====== FILES FUNCTIONS ======
let filesCache=[],filesLoaded=false,fileUploadCat='General',fileUploadDept='shared';
const FILE_CATS=['Policies','Procedures','Forms','Training','Safeguarding','Health & Safety','HR','Finance','Minutes','Templates','General'];
const FILE_ICONS={'application/pdf':'📄','image/jpeg':'🖼️','image/png':'🖼️','image/gif':'🖼️','application/msword':'📝','application/vnd.openxmlformats-officedocument.wordprocessingml.document':'📝','application/vnd.ms-excel':'📊','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':'📊','text/plain':'📃'};
function fileIcon(mime){return FILE_ICONS[mime]||'📎'}
function fileSize(bytes){if(bytes<1024)return bytes+'B';if(bytes<1048576)return(bytes/1024).toFixed(1)+'KB';return(bytes/1048576).toFixed(1)+'MB'}

async function loadFiles(dept){
if(!serverMode)return;
try{
const r=await fetch('/api/files?department='+(dept||'all'),{credentials:'include'});
if(!r.ok)throw 0;
const json=await r.json();
filesCache=json.files||[];
filesLoaded=true;
render();
}catch{showToast('Failed to load files')}
}

async function uploadFile(){
const input=document.createElement('input');
input.type='file';
input.accept='.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.csv';
input.onchange=async()=>{
const file=input.files[0];if(!file)return;
const form=new FormData();
form.append('file',file);
form.append('category',fileUploadCat);
form.append('department',fileUploadDept);
try{
showToast('Uploading...');
const r=await fetch('/api/files',{method:'POST',credentials:'include',body:form});
if(!r.ok)throw 0;
showToast('Uploaded ✓');
loadFiles();
}catch{showToast('Upload failed')}
};
input.click();
}

async function deleteFile(id){
if(!confirm('Delete this file?'))return;
try{
const r=await fetch('/api/files/'+id,{method:'DELETE',credentials:'include'});
if(!r.ok){const j=await r.json();showToast(j.error||'Delete failed');return}
showToast('Deleted');
loadFiles();
}catch{showToast('Delete failed')}
}

function downloadFile(id){window.open('/api/files/'+id+'/download','_blank')}

// Register functions
function regKey(wk,day,suId){return wk+'|'+day+'|'+suId}
function getRegStatus(wk,day,suId){return registers[regKey(wk,day,suId)]||''}
function setRegStatus(wk,day,suId,status){
const k=regKey(wk,day,suId);
const current=(registers[k]||'').split(':')[0];
const note=(registers[k]||'').split(':').slice(1).join(':');
if(current===status){delete registers[k]}
else{registers[k]=status+(note?':'+note:'');}
save();render();
}
function setRegNote(wk,day,suId,note){
const k=regKey(wk,day,suId);
const base=(registers[k]||'').split(':')[0]||'expected';
registers[k]=note?base+':'+note:base;
save();
}
function getRegNote(wk,day,suId){return (getRegStatus(wk,day,suId).split(':').slice(1).join(':')||'')}
function getRegStat(wk,day,suId){return (getRegStatus(wk,day,suId).split(':')[0]||'')}
function populateRegFromSchedule(wk){
// Get the schedule for this week
const activeSchd=weekSchedules[wk]||schedule;
DAYS.forEach(day=>{
const daySessions=activeSchd.filter(s=>s.day===day);
daySessions.forEach(s=>{
(s.assignedSUs||[]).forEach(suId=>{
const k=regKey(wk,day,suId);
if(!registers[k])registers[k]='expected';
});
});
});
save();
}

// Dept actions
function toggleTask(dId,tId){const d=D.find(x=>x.id===dId);if(d){const t=d.tasks.find(x=>x.id===tId);if(t)t.done=!t.done}save();render()}
function deleteTask(dId,tId){const d=D.find(x=>x.id===dId);if(d)d.tasks=d.tasks.filter(t=>t.id!==tId);save();render()}
function updateTF(dId,tId,f,v){const d=D.find(x=>x.id===dId);if(d){const t=d.tasks.find(x=>x.id===tId);if(t)t[f]=v}save();render()}
function addTask(dId){const d=D.find(x=>x.id===dId);if(!d)return;const inp=document.getElementById('atf-t-'+dId);const pri=document.getElementById('atf-p-'+dId);const stf=document.getElementById('atf-s-'+dId);const txt=inp?.value?.trim();if(!txt)return;d.tasks.push({id:uid(),text:txt,done:false,priority:pri?.value||'med',assignee:stf?.value||'',notes:[]});addingTo=null;save();render();showToast('Added')}
function addNote(dId,tId){const inp=document.getElementById('note-inp-'+tId);const txt=inp?.value?.trim();if(!txt)return;const d=D.find(x=>x.id===dId);if(d){const t=d.tasks.find(x=>x.id===tId);if(t){if(!t.notes)t.notes=[];t.notes.push({text:txt,time:new Date().toISOString()})}}save();render()}
function addDepartment(){if(!newD.name.trim())return;D.push({id:uid(),name:newD.name.trim(),emoji:newD.emoji,color:newD.color,rag:'none',milestones:[],tasks:[]});newD={name:'',emoji:'📋',color:'#3A7BD5'};activeModal=null;save();render();showToast('Added')}
function deleteDept(id){if(!confirm('Delete?'))return;D=D.filter(d=>d.id!==id);save();render()}
function newIncidentObj(){
const now=new Date();
const t=now.toTimeString().slice(0,5);
return {date:today(),time:t,location:'',type:'behaviour',severity:'medium',suIds:[],suNames:[],staffInvolved:[...staff],witnesses:'',description:'',actionTaken:'',reportedTo:'',followUp:'',externalReport:false,externalBody:'',createdBy:currentUser?.username||'',status:'open'};
}
function saveIncident(){
if(!incidentForm||!incidentForm.description.trim())return;
const inc=Object.assign({},incidentForm,{id:uid(),createdAt:new Date().toISOString()});
incidents.unshift(inc);incidentForm=null;save();render();showToast('Incident saved');
if(syncCfg.url)pushIncidentsToSheet();
}
function deleteIncident(id){if(!confirm('Delete this incident report?'))return;incidents=incidents.filter(i=>i.id!==id);viewingIncident=null;save();render();showToast('Deleted')}
function toggleIncidentStatus(id){const inc=incidents.find(i=>i.id===id);if(!inc)return;inc.status=inc.status==='open'?'closed':'open';save();render()}
function toggleIncidentSU(id,name){if(!incidentForm)return;const idx=incidentForm.suIds.indexOf(id);if(idx>=0){incidentForm.suIds.splice(idx,1);incidentForm.suNames=incidentForm.suNames.filter(n=>n!==name);}else{incidentForm.suIds.push(id);incidentForm.suNames.push(name);}render()}
function toggleIncidentStaff(name){if(!incidentForm)return;const idx=incidentForm.staffInvolved.indexOf(name);if(idx>=0)incidentForm.staffInvolved.splice(idx,1);else incidentForm.staffInvolved.push(name);render()}
function incF(f,v){if(incidentForm)incidentForm[f]=v}
async function pushIncidentsToSheet(){
if(!syncCfg.url||!incidents.length)return;
try{
await fetch(syncCfg.url,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify({_action:'incidents',incidents})});
showToast('Incidents pushed ✓');
}catch{showToast('Push failed')}
}
// ====== USER MANAGEMENT ======
const ROLE_LABELS={superadmin:'Superadmin',manager:'Manager',staff:'Staff',driver:'Driver',serviceuser:'Service User',carer:'Carer',foss:'FOSS'};
const ROLE_COLORS={superadmin:'#7C3AED',manager:'#2563EB',staff:'#059669',driver:'#D97706',serviceuser:'#DB2777',carer:'#0891B2',foss:'#10B981'};
function isSuperAdmin(){return currentUser&&(currentUser.role==='superadmin'||currentUser.role==='admin')}
function isManagerOrAbove(){return currentUser&&['superadmin','admin','manager'].includes(currentUser.role)}
function canSeeTab(tab){
  const r=currentUser?.role||'staff';
  if(tab==='usersTab') return isManagerOrAbove();
  if(['rotaTab','dash','hist','incidentsTab'].includes(tab)) return isManagerOrAbove();
  return true;
}
async function loadUsers(){
  usersLoading=true;render();
  try{const r=await fetch('/api/users',{credentials:'include'});const d=await r.json();usersList=d.users||[];syncStaffFromUsers();}catch{}
  usersLoading=false;render();
}
function syncStaffFromUsers(){
  const STAFF_ROLES=['superadmin','admin','manager','staff','driver'];
  const staffUsers=usersList.filter(u=>STAFF_ROLES.includes(u.role));
  const colors=['#E85D3A','#2E8B57','#3A7BD5','#8B5CF6','#D97706','#0F766E','#DC2626','#7C3AED','#0891B2','#BE185D','#6366F1','#EC4899','#F59E0B','#10B981'];
  const newProfiles=[];
  staffUsers.forEach((u,i)=>{
    const existing=staffProfiles.find(p=>p.name===u.username);
    if(existing){
      newProfiles.push(existing);
    }else{
      newProfiles.push({id:'sp'+uid(),name:u.username,role:ROLE_LABELS[u.role]||u.role,phone:'',email:'',emergency:'',notes:'',color:colors[i%colors.length]});
    }
  });
  staffProfiles=newProfiles;
  staff=staffProfiles.map(p=>p.name);
  save();
}
async function createUser(){
  if(!newUserForm||!newUserForm.username||!newUserForm.password)return;
  const r=await fetch('/api/users',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify(newUserForm)});
  const d=await r.json();
  if(d.ok){newUserForm=null;showToast('User created');loadUsers();}
  else showToast('Error: '+d.error);
}
async function deleteUser(id){
  if(!confirm('Delete this user?'))return;
  const r=await fetch('/api/users/'+id,{method:'DELETE',credentials:'include'});
  const d=await r.json();
  if(d.ok){showToast('Deleted');loadUsers();}
  else showToast('Error: '+d.error);
}
async function saveEditUser(){
  if(!editingUserId)return;
  const body={};
  if(editingUserPw&&editingUserPw.pw)body.password=editingUserPw.pw;
  const roleEl=document.getElementById('eu-role-'+editingUserId);
  if(roleEl)body.role=roleEl.value;
  const unEl=document.getElementById('eu-un-'+editingUserId);
  if(unEl)body.username=unEl.value;
  const r=await fetch('/api/users/'+editingUserId,{method:'PATCH',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const d=await r.json();
  if(d.ok){editingUserId=null;editingUserPw=null;showToast('Updated');loadUsers();}
  else showToast('Error: '+d.error);
}
function addSU(){if(!newSU.name.trim())return;const su={id:uid(),name:newSU.name.trim(),flags:[],days:[]};if(newSU.pn.trim())su.pn=newSU.pn.trim();if(newSU.dob)su.dob=newSU.dob;if(newSU.pc.trim())su.pc=newSU.pc.trim();if(newSU.ph.trim())su.ph=newSU.ph.trim();if(newSU.cn.trim())su.cn=newSU.cn.trim();if(newSU.cm.trim())su.cm=newSU.cm.trim();if(newSU.co.trim())su.co=newSU.co.trim();serviceUsers.push(su);newSU={name:'',pn:'',dob:'',pc:'',ph:'',cn:'',cm:'',co:''};activeModal=null;save();render();showToast('Service user added')}
function deleteSU(id){const su=serviceUsers.find(u=>u.id===id);if(!su)return;if(!confirm('Delete '+su.name+'?'))return;serviceUsers=serviceUsers.filter(u=>u.id!==id);save();render();showToast('Deleted')}
function moveUp(id){const i=D.findIndex(d=>d.id===id);if(i>0){[D[i-1],D[i]]=[D[i],D[i-1]];save();render()}}
function moveDown(id){const i=D.findIndex(d=>d.id===id);if(i<D.length-1){[D[i+1],D[i]]=[D[i],D[i+1]];save();render()}}
function setRag(id,r){const d=D.find(x=>x.id===id);if(d){d.rag=d.rag===r?'none':r;save();render()}}
function addMilestone(dId){const d=D.find(x=>x.id===dId);if(!d)return;const txt=document.getElementById('ms-txt-'+dId)?.value?.trim();const dt=document.getElementById('ms-dt-'+dId)?.value;if(!txt||!dt)return;if(!d.milestones)d.milestones=[];d.milestones.push({id:uid(),text:txt,date:dt});msForm=null;save();render()}
function delMilestone(dId,mId){const d=D.find(x=>x.id===dId);if(d)d.milestones=(d.milestones||[]).filter(m=>m.id!==mId);save();render()}
function addStaffMember(){const n=newStaff.trim();if(!n||staffProfiles.some(p=>p.name===n))return;const colors=['#6366F1','#EC4899','#F59E0B','#10B981','#3B82F6','#8B5CF6','#EF4444','#14B8A6','#F97316','#06B6D4'];staffProfiles.push({id:'sp'+uid(),name:n,role:'Support Worker',phone:'',email:'',emergency:'',notes:'',color:colors[staffProfiles.length%colors.length]});newStaff='';save();render();showToast('Added '+n)}
function removeStaffMember(n){if(!confirm('Remove '+n+'?'))return;staffProfiles=staffProfiles.filter(p=>p.name!==n);save();render()}
function takeSnapshot(){const overall=pct(D.reduce((a,d)=>a+d.tasks.filter(t=>t.done).length,0),D.reduce((a,d)=>a+d.tasks.length,0));const depts=D.map(d=>({name:d.name,color:d.color,rag:d.rag||'none',pct:pct(d.tasks.filter(t=>t.done).length,d.tasks.length)}));history.push({date:new Date().toISOString(),overall,depts});save();render();showToast('Snapshot saved')}
function copyAppsScript(){navigator.clipboard.writeText(APPS_SCRIPT_CODE).then(()=>showToast('Copied!'))}
function copyForSheets(){const rows=[['Department','Task','Priority','Assignee','Status','Notes']];D.forEach(d=>d.tasks.forEach(t=>rows.push([d.name,t.text,t.priority,t.assignee||'',t.done?'Done':'To Do',(t.notes||[]).map(n=>n.text).join('; ')])));navigator.clipboard.writeText(rows.map(r=>r.join('\t')).join('\n')).then(()=>showToast('Copied!'))}
function downloadCSV(){const rows=[['Department','Task','Priority','Assignee','Status']];D.forEach(d=>d.tasks.forEach(t=>rows.push([d.name,t.text,t.priority,t.assignee||'',t.done?'Done':'To Do'])));const csv=rows.map(r=>r.map(c=>'"'+c.replace(/"/g,'""')+'"').join(',')).join('\n');const b=new Blob([csv],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='spiral-tasks.csv';a.click();showToast('Downloaded')}
function resetAll(){if(!confirm('Reset everything?'))return;D=JSON.parse(JSON.stringify(DEFS.departments));history=[];schedule=JSON.parse(JSON.stringify(DEF_SCHEDULE));serviceUsers=JSON.parse(JSON.stringify(DEF_SUS));rota={};driverRota={};weekSchedules={};registers={};fossData={departments:[],staffProfiles:[],contacts:[],completedLog:[]};openD={};filterPri='all';filterStaff='all';save();render();showToast('Reset')}

// Staff profile helpers
function getStaffProfile(name){return staffProfiles.find(p=>p.name===name)}
function addStaffProfile(){
const name=prompt('Staff member name:');if(!name||!name.trim())return;
const colors=['#E85D3A','#2E8B57','#3A7BD5','#8B5CF6','#D97706','#0F766E','#DC2626','#7C3AED','#0891B2','#BE185D'];
staffProfiles.push({id:'sp'+uid(),name:name.trim(),role:'Support Worker',phone:'',email:'',emergency:'',notes:'',color:colors[staffProfiles.length%colors.length]});
if(!staff.includes(name.trim()))staff.push(name.trim());
save();render();showToast('Added '+name.trim());
}
function updateStaffProfile(id,field,val){const p=staffProfiles.find(s=>s.id===id);if(p){p[field]=val;save();render()}}
function removeStaffProfile(id){
const p=staffProfiles.find(s=>s.id===id);if(!p)return;
if(!confirm('Remove '+p.name+'?'))return;
staffProfiles=staffProfiles.filter(s=>s.id!==id);save();render();showToast('Removed');
}
// Week helpers
function getWeekKey(offset){
const d=new Date();d.setDate(d.getDate()+offset*7);
const thu=new Date(d);thu.setDate(d.getDate()-(d.getDay()+6)%7+3);
const y=thu.getFullYear();
const w=Math.ceil(((thu-new Date(y,0,4))/86400000+new Date(y,0,4).getDay()+1)/7);
return y+'-W'+String(w).padStart(2,'0');
}
function getWeekDates(offset){
const d=new Date();d.setDate(d.getDate()+offset*7);
const mon=new Date(d);mon.setDate(d.getDate()-(d.getDay()+6)%7);
return ROTA_DAYS.map((_,i)=>{const dt=new Date(mon);dt.setDate(mon.getDate()+i);return dt});
}
function fmtShortDate(d){return d.getDate()+'/'+String(d.getMonth()+1).padStart(2,'0')}
// Staff rota helpers (week-aware)
function rotaKey(wk,room,day,period){return wk+'|'+room+'|'+day+'|'+period}
function getRotaStaff(wk,room,day,period){return rota[rotaKey(wk,room,day,period)]||[]}
function toggleRotaStaff(wk,room,day,period,staffName){
const key=rotaKey(wk,room,day,period);
if(!rota[key])rota[key]=[];
const idx=rota[key].indexOf(staffName);
if(idx>=0)rota[key].splice(idx,1); else rota[key].push(staffName);
save();render();
}
function clearRotaCell(wk,room,day,period){rota[rotaKey(wk,room,day,period)]=[];save();render()}
function copyWeekRota(fromOffset,toOffset){
const fromWk=getWeekKey(fromOffset),toWk=getWeekKey(toOffset);
Object.entries(rota).forEach(([k,v])=>{if(k.startsWith(fromWk+'|')&&v.length){rota[k.replace(fromWk,toWk)]=[...v]}});
Object.entries(driverRota).forEach(([k,v])=>{if(k.startsWith(fromWk+'|')){driverRota[k.replace(fromWk,toWk)]=JSON.parse(JSON.stringify(v))}});
save();render();showToast('Copied to '+toWk);
}
// Driver rota helpers
function driverKey(wk,route,day,shift){return wk+'|'+route+'|'+day+'|'+shift}
function getDriverCell(wk,route,day,shift){return driverRota[driverKey(wk,route,day,shift)]||{driver:'',minibus:''}}
function setDriverField(wk,route,day,shift,field,val){
const key=driverKey(wk,route,day,shift);
if(!driverRota[key])driverRota[key]={driver:'',minibus:''};
driverRota[key][field]=val;
save();render();
}
function clearDriverCell(wk,route,day,shift){delete driverRota[driverKey(wk,route,day,shift)];save();render()}

// Minibus allocation helpers
function getMbAlloc(wk,day,suId){return minibusAllocation[wk]?.[day]?.[suId]||null}
function setMbAlloc(wk,day,suId,field,val){
  if(!minibusAllocation[wk])minibusAllocation[wk]={};
  if(!minibusAllocation[wk][day])minibusAllocation[wk][day]={};
  if(!minibusAllocation[wk][day][suId])minibusAllocation[wk][day][suId]={pickupRoute:null,returnRoute:null,notes:''};
  minibusAllocation[wk][day][suId][field]=val;
  save();render();
}
function clearMbAlloc(wk,day,suId){
  if(minibusAllocation[wk]?.[day]?.[suId]){delete minibusAllocation[wk][day][suId];save();render()}
}
function getSUsForDay(day){return serviceUsers.filter(su=>su.days?.includes(day))}
function prePopulateMbDay(wk,day){
  getSUsForDay(day).forEach(su=>{
    if(!minibusAllocation[wk]?.[day]?.[su.id]){
      if(su.defaultTransport==='personal'){
        if(!minibusAllocation[wk])minibusAllocation[wk]={};
        if(!minibusAllocation[wk][day])minibusAllocation[wk][day]={};
        minibusAllocation[wk][day][su.id]={pickupRoute:'personal',returnRoute:'personal',notes:''};
      }
    }
  });
}

function render(){
let h='';
const isF=filterPri!=='all'||filterStaff!=='all';
function filterTasks(tasks){return tasks.filter(t=>{const pM=filterPri==='all'||t.priority===filterPri;const sM=filterStaff==='all'||(filterStaff==='unassigned'?!t.assignee:t.assignee===filterStaff);return pM&&sM})}
const allDone=D.reduce((a,d)=>a+d.tasks.filter(t=>t.done).length,0);
const allTotal=D.reduce((a,d)=>a+d.tasks.length,0);
const overall=pct(allDone,allTotal);

// HEADER
h+=`<div class="hdr"><div class="hdr-top"><div class="hdr-brand"><button class="hdr-hamburger" onclick="mobileMenuOpen=!mobileMenuOpen;render()" aria-label="Menu">☰</button><div><h1>${appMode==='foss'?'🤝 FOSS':'🌀 Spiral Sussex'}</h1><small>${currentUser?`${esc(currentUser.username)} · <span style="color:${ROLE_COLORS[currentUser.role]||'#9CA3AF'}">${ROLE_LABELS[currentUser.role]||currentUser.role}</span>`:appMode==='foss'?'Friends of Spiral Sussex':'Tracker'}</small></div></div><div class="hdr-actions"><button class="hdr-btn" style="${appMode==='foss'?'background:#10B981;color:white':'background:#6366F1;color:white'};font-size:10px;font-weight:700;width:auto;padding:0 10px;border-radius:8px" onclick="switchMode(appMode==='spiral'?'foss':'spiral')">${appMode==='foss'?'SPIRAL':'FOSS'}</button><button class="hdr-btn hdr-btn-desktop" onclick="activeModal='sync';render()">🔄</button><button class="hdr-btn hdr-btn-desktop" onclick="activeModal='sheets';render()">📤</button><button class="hdr-btn hdr-btn-desktop" onclick="document.getElementById('print-date').textContent=new Date().toLocaleDateString('en-GB',{weekday:'long',year:'numeric',month:'long',day:'numeric'});window.print()">🖨</button><button class="avatar-btn" style="background:${avatarColor(currentUser)}" onclick="activeModal='account';mobileMenuOpen=false;render()" aria-label="Account">${initials(currentUser)}</button></div></div>`;

// Sync bar
const sc=syncStatus;const hasUrl=!!syncCfg.url;
h+=`<div class="sync-bar ${sc}"><div class="sync-dot ${sc==='connected'?'green':sc==='error'?'red':sc==='syncing'?'blue':'grey'}"></div>${sc==='connected'?'Synced'+(syncCfg.lastSync?' · '+fmtDateTime(syncCfg.lastSync):''):sc==='syncing'?'Syncing...':sc==='error'?'Sync error':hasUrl?'Not synced':'Not connected'}${hasUrl?'<button onclick=\"pushToSheet()\">Push</button>':''}</div>`;

// Overview (Spiral only)
if(appMode==='spiral'&&view==='depts'){h+=`<div class="ov-box"><div class="ov-row"><span class="ov-lbl">Overall Progress</span><span class="ov-pct">${overall}%</span></div><div class="ov-bar"><div class="ov-fill" style="width:${overall}%"></div></div></div>`};

// Tabs
if(appMode==='spiral'){
h+=`<div class="tabs" role="tablist" aria-label="Main navigation"><button class="tab ${view==='depts'?'on':''}" role="tab" aria-selected="${view==='depts'}" onclick="view='depts';render()">📋 Tasks</button><button class="tab ${view==='sched'?'on':''}" role="tab" aria-selected="${view==='sched'}" onclick="view='sched';render()">📅 Schedule</button><button class="tab ${view==='regTab'?'on':''}" role="tab" aria-selected="${view==='regTab'}" onclick="view='regTab';render()">📝 Register</button><button class="tab ${view==='sus'?'on':''}" role="tab" aria-selected="${view==='sus'}" onclick="view='sus';render()">👤 SUs</button>${canSeeTab('rotaTab')?`<button class="tab ${view==='rotaTab'?'on':''}" role="tab" aria-selected="${view==='rotaTab'}" onclick="view='rotaTab';render()">📊 Rota</button>`:''}${canSeeTab('dash')?`<button class="tab ${view==='dash'?'on':''}" role="tab" aria-selected="${view==='dash'}" onclick="view='dash';render()">📈 Dashboard</button>`:''}<button class="tab ${view==='calTab'?'on':''}" role="tab" aria-selected="${view==='calTab'}" onclick="view='calTab';render()">📆 Calendar</button><button class="tab ${view==='filesTab'?'on':''}" role="tab" aria-selected="${view==='filesTab'}" onclick="view='filesTab';loadFiles('spiral');render()">📁 Files</button>${canSeeTab('hist')?`<button class="tab ${view==='hist'?'on':''}" role="tab" aria-selected="${view==='hist'}" onclick="view='hist';render()">🕐 History</button>`:''}${canSeeTab('incidentsTab')?`<button class="tab ${view==='incidentsTab'?'on':''}" role="tab" aria-selected="${view==='incidentsTab'}" onclick="view='incidentsTab';render()">🚨 Incidents${incidents.filter(i=>i.status==='open').length?` <span style="background:#EF4444;color:white;border-radius:100px;padding:1px 5px;font-size:9px">${incidents.filter(i=>i.status==='open').length}</span>`:''}</button>`:''}`+`<button class="tab ${view==='minibusTab'?'on':''}" role="tab" aria-selected="${view==='minibusTab'}" onclick="view='minibusTab';render()">🚐 Minibus</button>${canSeeTab('usersTab')?`<button class="tab ${view==='usersTab'?'on':''}" role="tab" aria-selected="${view==='usersTab'}" onclick="view='usersTab';if(!usersList.length)loadUsers();render()">👥 Users</button>`:''}</div></div>`;
} else {
h+=`<div class="tabs" role="tablist" aria-label="Main navigation"><button class="tab ${fossView==='fossTasks'?'on':''}" role="tab" aria-selected="${fossView==='fossTasks'}" onclick="fossView='fossTasks';render()">📋 Tasks</button><button class="tab ${fossView==='fossStaff'?'on':''}" role="tab" aria-selected="${fossView==='fossStaff'}" onclick="fossView='fossStaff';render()">🧑‍💼 Team</button><button class="tab ${fossView==='fossContacts'?'on':''}" role="tab" aria-selected="${fossView==='fossContacts'}" onclick="fossView='fossContacts';render()">📇 Contacts</button><button class="tab ${fossView==='fossSUs'?'on':''}" role="tab" aria-selected="${fossView==='fossSUs'}" onclick="fossView='fossSUs';render()">👤 SUs</button><button class="tab ${fossView==='fossLog'?'on':''}" role="tab" aria-selected="${fossView==='fossLog'}" onclick="fossView='fossLog';render()">✅ Log</button><button class="tab ${fossView==='fossFiles'?'on':''}" role="tab" aria-selected="${fossView==='fossFiles'}" onclick="fossView='fossFiles';loadFiles('foss');render()">📁 Files</button><button class="tab ${fossView==='fossCal'?'on':''}" role="tab" aria-selected="${fossView==='fossCal'}" onclick="fossView='fossCal';render()">📆 Calendar</button></div></div>`;
}

// Mobile nav dropdown
if(mobileMenuOpen){
  if(appMode==='spiral'){
    h+=`<div class="mob-nav" onclick="mobileMenuOpen=false;render()"><div class="mob-nav-box" onclick="event.stopPropagation()">`;
    h+=`<button class="mob-tab ${view==='depts'?'on':''}" onclick="view='depts';mobileMenuOpen=false;render()">📋 Tasks</button>`;
    h+=`<button class="mob-tab ${view==='sched'?'on':''}" onclick="view='sched';mobileMenuOpen=false;render()">📅 Schedule</button>`;
    h+=`<button class="mob-tab ${view==='regTab'?'on':''}" onclick="view='regTab';mobileMenuOpen=false;render()">📝 Register</button>`;
    h+=`<button class="mob-tab ${view==='sus'?'on':''}" onclick="view='sus';mobileMenuOpen=false;render()">👤 SUs</button>`;
    if(canSeeTab('rotaTab'))h+=`<button class="mob-tab ${view==='rotaTab'?'on':''}" onclick="view='rotaTab';mobileMenuOpen=false;render()">📊 Rota</button>`;
    if(canSeeTab('dash'))h+=`<button class="mob-tab ${view==='dash'?'on':''}" onclick="view='dash';mobileMenuOpen=false;render()">📈 Dashboard</button>`;
    h+=`<button class="mob-tab ${view==='calTab'?'on':''}" onclick="view='calTab';mobileMenuOpen=false;render()">📆 Calendar</button>`;
    h+=`<button class="mob-tab ${view==='filesTab'?'on':''}" onclick="view='filesTab';loadFiles('spiral');mobileMenuOpen=false;render()">📁 Files</button>`;
    if(canSeeTab('hist'))h+=`<button class="mob-tab ${view==='hist'?'on':''}" onclick="view='hist';mobileMenuOpen=false;render()">🕐 History</button>`;
    if(canSeeTab('incidentsTab'))h+=`<button class="mob-tab ${view==='incidentsTab'?'on':''}" onclick="view='incidentsTab';mobileMenuOpen=false;render()">🚨 Incidents</button>`;
    h+=`<button class="mob-tab ${view==='minibusTab'?'on':''}" onclick="view='minibusTab';mobileMenuOpen=false;render()">🚐 Minibus</button>`;
    if(canSeeTab('usersTab'))h+=`<button class="mob-tab ${view==='usersTab'?'on':''}" onclick="view='usersTab';if(!usersList.length)loadUsers();mobileMenuOpen=false;render()">👥 Users</button>`;
    h+=`</div></div>`;
  } else {
    h+=`<div class="mob-nav" onclick="mobileMenuOpen=false;render()"><div class="mob-nav-box" onclick="event.stopPropagation()">`;
    h+=`<button class="mob-tab ${fossView==='fossTasks'?'on':''}" onclick="fossView='fossTasks';mobileMenuOpen=false;render()">📋 Tasks</button>`;
    h+=`<button class="mob-tab ${fossView==='fossStaff'?'on':''}" onclick="fossView='fossStaff';mobileMenuOpen=false;render()">🧑‍💼 Team</button>`;
    h+=`<button class="mob-tab ${fossView==='fossContacts'?'on':''}" onclick="fossView='fossContacts';mobileMenuOpen=false;render()">📇 Contacts</button>`;
    h+=`<button class="mob-tab ${fossView==='fossSUs'?'on':''}" onclick="fossView='fossSUs';mobileMenuOpen=false;render()">👤 SUs</button>`;
    h+=`<button class="mob-tab ${fossView==='fossLog'?'on':''}" onclick="fossView='fossLog';mobileMenuOpen=false;render()">✅ Log</button>`;
    h+=`<button class="mob-tab ${fossView==='fossFiles'?'on':''}" onclick="fossView='fossFiles';loadFiles('foss');mobileMenuOpen=false;render()">📁 Files</button>`;
    h+=`<button class="mob-tab ${fossView==='fossCal'?'on':''}" onclick="fossView='fossCal';mobileMenuOpen=false;render()">📆 Calendar</button>`;
    h+=`</div></div>`;
  }
}

if(appMode==='spiral'){

// ===== SCHEDULE VIEW =====
if(view==='sched'){
const activeSchedule=getActiveSchedule();
const swk=getWeekKey(schedWeekOffset);
const sweekDates=getWeekDates(schedWeekOffset);
const isTemplate=schedWeekOffset===0&&!weekSchedules[swk];
const schedReadOnly=schedWeekOffset!==0&&!weekSchedules[swk];
const totalSpaces=activeSchedule.reduce((s,x)=>s+x.spaces,0);
const communityCount=activeSchedule.filter(s=>s.community).length;
const totalAssigned=activeSchedule.reduce((s,x)=>s+(x.assignedSUs||[]).length,0);
h+=`<div class="sched">
<div class="rota-week-nav">
<button class="rota-week-btn" onclick="schedWeekOffset--;editingSess=null;render()">◀ Prev</button>
<div class="rota-week-label">${swk} ${schedWeekOffset===0?'<span style="background:#22C55E;color:white;font-size:9px;padding:2px 6px;border-radius:100px;margin-left:4px;vertical-align:middle">This Week</span>':''}${isTemplate?'<span style="background:#6366F1;color:white;font-size:9px;padding:2px 6px;border-radius:100px;margin-left:4px;vertical-align:middle">Base Template</span>':''}<br><span class="rota-week-dates">${fmtShortDate(sweekDates[0])} – ${fmtShortDate(sweekDates[4])}</span></div>
<button class="rota-week-btn" onclick="schedWeekOffset++;editingSess=null;render()">Next ▶</button>
</div>
<div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">
<button class="rota-week-btn" onclick="schedWeekOffset=0;editingSess=null;render()">Today</button>
<button class="rota-copy-btn" onclick="copyWeekSchedule(schedWeekOffset,schedWeekOffset+1)">📋 Copy to next week</button>
<button class="rota-copy-btn" onclick="copyWeekSchedule(schedWeekOffset-1,schedWeekOffset)">📋 Copy from last week</button>
${schedWeekOffset!==0&&!weekSchedules[swk]?'<button class="rota-copy-btn" onclick="ensureWeekSchedule();render()">✏️ Start editing this week</button>':''}
</div>
`;
if(schedReadOnly){
h+=`<div style="background:#FEF3C7;border:1px solid #F59E0B;border-radius:10px;padding:10px 14px;margin-bottom:10px;display:flex;align-items:center;gap:10px;flex-wrap:wrap"><span style="font-size:13px;font-weight:600;color:#92400E">📋 Showing base template — click below to customise this week</span><button class="rota-copy-btn" onclick="ensureWeekSchedule();render()" style="background:#F59E0B;color:white;border-color:#F59E0B">✏️ Start editing ${swk}</button><button class="rota-copy-btn" onclick="copyWeekSchedule(schedWeekOffset-1,schedWeekOffset)">📋 Copy from previous week</button></div>`;
}
h+=`<div class="sched-legend">
<span><span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:#FFF8F6;border-left:3px solid #E85D3A"></span> Community</span>
<span>👥 ${totalSpaces} places/week</span>
<span>🏘️ ${communityCount} community</span>
<span>🧑‍🦱 ${totalAssigned} SU assignments</span>
${syncCfg.url?'<button onclick="pullSUsFromSheet()" style="border:1px solid #E5E7EB;border-radius:6px;padding:2px 8px;font-size:10px;font-weight:600;cursor:pointer;background:white;color:#6366F1">↻ Refresh SU Data</button>':''}
</div>
<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px;padding:4px 0">
<span style="font-size:10px;font-weight:600;color:#6B7280;padding:3px 0">Flag key:</span>
${Object.entries(FLAG_INFO).map(([k,v])=>'<span class="su-flag '+( FLAG_COLORS[k]||'')+'" title="'+v+'" style="font-size:9px">'+k+'='+v+'</span>').join(' ')}
</div>`;

DAYS.forEach(day=>{
const daySessions=activeSchedule.filter(s=>s.day===day);
const amSess=daySessions.filter(s=>s.period==='am');
const pmSess=daySessions.filter(s=>s.period==='pm');
const daySpaces=daySessions.reduce((s,x)=>s+x.spaces,0);
const daySUCount=daySessions.reduce((s,x)=>s+(x.assignedSUs||[]).length,0);
const isOpen=openDays[day]!==false;

h+=`<div class="day-card">
<div class="day-hdr" onclick="openDays['${day}']=!openDays['${day}'];render()">
<span class="day-name">${DAY_NAMES[day]}</span>
<div class="day-toggle">
<span class="day-count">${daySessions.length} sessions · ${daySpaces} places · ${daySUCount} SUs</span>
<svg class="chv ${isOpen?'open':''}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
</div></div>`;

if(isOpen){
h+=`<div class="day-body">`;
['am','pm'].forEach(period=>{
const sess=period==='am'?amSess:pmSess;
h+=`<div class="period-label">${period==='am'?'A.M':'P.M'}</div>`;
sess.forEach(s=>{
const isEd=editingSess===s.id;
const isExpanded=expandedSess[s.id];
const suCount=(s.assignedSUs||[]).length;
const mainEmoji=s.staffList&&s.staffList.length?s.staffList[0].emoji:'🎯';

h+=`<div class="sess-item ${s.community?'community':''}">
<div class="sess-actions" style="${schedReadOnly?'display:none':''}">
<button onclick="editingSess=editingSess==='${s.id}'?null:'${s.id}';render()">✏️</button>
<button onclick="deleteSession('${s.id}')">×</button>
</div>`;

if(isEd){
// EDIT MODE
h+=`<div style="display:flex;flex-direction:column;gap:6px;padding-right:40px">
<input type="text" value="${esc(s.name)}" placeholder="Session name" oninput="updateSess('${s.id}','name',this.value);render()" style="border:1px solid #E5E7EB;border-radius:8px;padding:7px 9px;font-size:13px;font-weight:600;outline:none">
<div style="display:flex;gap:6px;flex-wrap:wrap">
<div style="display:flex;align-items:center;gap:4px"><span style="font-size:11px;color:#6B7280;font-weight:600">Places:</span><input type="number" value="${s.spaces}" min="1" max="50" onchange="updateSess('${s.id}','spaces',this.value);render()" style="width:50px;border:1px solid #E5E7EB;border-radius:6px;padding:5px 6px;font-size:12px;text-align:center;outline:none"></div>
</div>`;

// Multi-staff section
h+=`<div style="border:1px solid #E5E7EB;border-radius:8px;padding:8px;background:white">
<div style="font-size:11px;font-weight:700;color:#6B7280;margin-bottom:4px">👥 STAFF ASSIGNED</div>`;
(s.staffList||[]).forEach((st,si)=>{
h+=`<div style="display:flex;gap:4px;align-items:center;margin-bottom:4px;flex-wrap:wrap">
<select class="staff-select" onchange="updateStaffInSession('${s.id}',${si},'name',this.value);render()" style="flex:1;min-width:80px">
<option value="">-- Select --</option>
${staff.map(sn=>`<option ${st.name===sn?'selected':''}>${esc(sn)}</option>`).join('')}
<option value="_custom" ${st.name&&!staff.includes(st.name)?'selected':''}>Other...</option>
</select>
${st.name&&!staff.includes(st.name)?`<input type="text" value="${esc(st.name)}" placeholder="Custom name" oninput="updateStaffInSession('${s.id}',${si},'name',this.value)" style="flex:1;min-width:60px;border:1px solid #E5E7EB;border-radius:6px;padding:4px 6px;font-size:12px;outline:none">`:''}
<div style="display:flex;gap:2px;flex-wrap:wrap">${STAFF_EMOJIS.map(e=>`<button onclick="updateStaffInSession('${s.id}',${si},'emoji','${e}');render()" style="border:${st.emoji===e?'2px solid #6366F1':'1px solid #E5E7EB'};border-radius:5px;width:24px;height:24px;background:${st.emoji===e?'#EEF2FF':'white'};cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center">${e}</button>`).join('')}</div>
<button onclick="removeStaffFromSession('${s.id}',${si})" style="border:none;background:#FEE2E2;color:#DC2626;border-radius:5px;width:24px;height:24px;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center">×</button>
</div>`;
});
h+=`<button onclick="addStaffToSession('${s.id}')" style="border:1px dashed #D1D5DB;border-radius:6px;padding:4px 8px;font-size:11px;color:#6B7280;cursor:pointer;background:none;width:100%;margin-top:2px">+ Add staff member</button>
</div>`;

// Note, Community, Location
h+=`<div style="display:flex;gap:6px;align-items:center">
<input type="text" value="${esc(s.note||'')}" placeholder="Note (time, cost...)" oninput="updateSess('${s.id}','note',this.value)" style="flex:1;border:1px solid #E5E7EB;border-radius:6px;padding:5px 6px;font-size:12px;outline:none">
<button onclick="toggleCommunity('${s.id}')" style="border:1px solid ${s.community?'#E85D3A':'#E5E7EB'};border-radius:6px;padding:5px 8px;font-size:10px;font-weight:600;cursor:pointer;background:${s.community?'#FFF1EC':'white'};color:${s.community?'#E85D3A':'#6B7280'};white-space:nowrap">${s.community?'✓ Community':'Community?'}</button>
</div>
<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
<span style="font-size:11px;color:#6B7280;font-weight:600">📍 Location:</span>
<input type="text" value="${esc(s.location||'')}" placeholder="e.g. Spiral Centre" oninput="updateSess('${s.id}','location',this.value)" style="flex:1;min-width:100px;border:1px solid #E5E7EB;border-radius:6px;padding:5px 6px;font-size:12px;outline:none">
</div>
<div style="display:flex;gap:3px;flex-wrap:wrap;align-items:center">
${LOC_EMOJIS.map(e=>`<button onclick="updateSess('${s.id}','locationEmoji','${e}');render()" style="border:${(s.locationEmoji||'📍')===e?'2px solid #D97706':'1px solid #E5E7EB'};border-radius:5px;width:26px;height:26px;background:${(s.locationEmoji||'📍')===e?'#FEF3C7':'white'};cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center">${e}</button>`).join('')}
</div>
<button onclick="editingSess=null;render()" style="border:none;background:#1F2937;color:white;border-radius:8px;padding:7px;font-size:12px;font-weight:600;cursor:pointer;align-self:flex-start">Done</button>
</div>`;

} else {
// DISPLAY MODE
h+=`<div style="padding-right:40px">
<div class="sess-name">${mainEmoji} ${esc(s.name)}</div>
${s.note?`<div style="font-size:11px;color:#9CA3AF;margin-top:2px;line-height:1.3">${esc(s.note)}</div>`:''}
<div class="sess-meta">
<span class="sess-badge sess-spaces">👥 ${s.spaces} places</span>
${(s.staffList||[]).map(st=>st.name?`<span class="staff-chip">${st.emoji} ${esc(st.name)}</span>`:'').join('')}
${s.location?`<span class="sess-badge" style="background:#FEF3C7;color:#92400E">${s.locationEmoji||'📍'} ${esc(s.location)}</span>`:''}
${s.community?`<span class="sess-badge sess-community">★ Community</span>`:''}
${suCount?`<span class="sess-badge" style="background:#EEF2FF;color:#4338CA">🧑‍🦱 ${suCount}/${s.spaces}</span>`:''}
</div>`;

// SU toggle button + assigned list preview
h+=`<button class="su-toggle" onclick="expandedSess['${s.id}']=!expandedSess['${s.id}'];render()">
${isExpanded?'▾':'▸'} Service Users (${suCount}/${s.spaces})
</button>`;

if(isExpanded){
const assigned=(s.assignedSUs||[]).map(id=>serviceUsers.find(u=>u.id===id)).filter(Boolean);
h+=`<div class="su-panel">`;
if(assigned.length){
h+=`<div style="margin-bottom:6px">`;
assigned.forEach(su=>{
h+=`<div style="display:flex;align-items:center;gap:4px;padding:3px 0;font-size:12px">
<button onclick="event.stopPropagation();toggleSUAssign('${s.id}','${su.id}')" style="border:none;background:none;cursor:pointer;font-size:10px;color:#DC2626;padding:0">✕</button>
<span class="su-name-flags" onclick="showSUDetail('${su.id}')" style="cursor:pointer" title="Click for details">${suNameHtml(su)}</span>
</div>`;
});
h+=`</div>`;
}
h+=`<input class="su-search" placeholder="🔍 Search service users..." value="${esc(suSearch)}" oninput="suSearch=this.value;render()" onfocus="this.select()">
<div class="su-day-filter">📅 Showing ${DAY_NAMES[s.day]} attendees first</div>
<div class="su-list">`;
const q=suSearch.toLowerCase();
const daySUs=serviceUsers.filter(su=>{
if(q&&!su.name.toLowerCase().includes(q)&&!(su.flags||[]).join(',').toLowerCase().includes(q))return false;
return true;
}).sort((a,b)=>{
const aDay=(a.days||[]).includes(s.day)?0:1;
const bDay=(b.days||[]).includes(s.day)?0:1;
if(aDay!==bDay)return aDay-bDay;
return a.name.localeCompare(b.name);
}).slice(0,40);
daySUs.forEach(su=>{
const isAssigned=(s.assignedSUs||[]).includes(su.id);
const isForDay=(su.days||[]).includes(s.day);
h+=`<div class="su-row ${isAssigned?'assigned':''}" onclick="toggleSUAssign('${s.id}','${su.id}')" style="${!isForDay&&!isAssigned?'opacity:0.45':''}">
<div class="su-cb ${isAssigned?'on':''}">${isAssigned?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>':''}</div>
<span class="su-name-flags">${suNameHtml(su)}${isForDay?' <span style="font-size:9px;color:#6366F1">📅</span>':''}</span>
</div>`;
});
h+=`</div></div>`;
}
h+=`</div>`;
}
h+=`</div>`;
});
if(!schedReadOnly)h+=`<button class="sess-add" onclick="addSession('${day}','${period}')">+ Add ${period==='am'?'morning':'afternoon'} session</button>`;
});
h+=`</div>`;
}
h+=`</div>`;
});

h+=`<p class="foot" style="margin-top:12px">★ = Community workshop · Tap ✏️ to edit · Tap ▸ Service Users to assign</p></div>`;
}

// ===== TASKS VIEW =====
if(view==='depts'){
h+=`<div class="fbar"><button class="fb ${filterPri==='all'?'on':'off'}" style="${filterPri==='all'?'background:#1F2937':''}" onclick="filterPri='all';render()">All</button><button class="fb ${filterPri==='high'?'on':'off'}" style="${filterPri==='high'?'background:#DC2626':''}" onclick="filterPri='high';render()">🔴 High</button><button class="fb ${filterPri==='med'?'on':'off'}" style="${filterPri==='med'?'background:#D97706':''}" onclick="filterPri='med';render()">🟡 Med</button><button class="fb ${filterPri==='low'?'on':'off'}" style="${filterPri==='low'?'background:#2563EB':''}" onclick="filterPri='low';render()">🔵 Low</button><span style="width:1px;background:#E5E7EB;flex-shrink:0;margin:3px 1px"></span><button class="fb ${filterStaff==='all'?'on':'off'}" style="${filterStaff==='all'?'background:#1F2937':''}" onclick="filterStaff='all';render()">Everyone</button>`;
staff.forEach(s=>{h+=`<button class="fb ${filterStaff===s?'on':'off'}" style="${filterStaff===s?'background:'+stClr(s):''}" onclick="filterStaff='${esc(s)}';render()">${esc(s)}</button>`});
h+=`<button class="fb ${filterStaff==='unassigned'?'on':'off'}" style="${filterStaff==='unassigned'?'background:#6B7280':''}" onclick="filterStaff='unassigned';render()">Unassigned</button></div><div class="cards">`;

D.forEach((dept,idx)=>{
const vis=filterTasks(dept.tasks),dn=dept.tasks.filter(t=>t.done).length,tot=dept.tasks.length,p=pct(dn,tot);
const isO=openD[dept.id],isA=addingTo===dept.id;
const sorted=[...vis].sort((a,b)=>{if(a.done!==b.done)return a.done?1:-1;return priOrd(a.priority)-priOrd(b.priority)});
if(isF&&!vis.length)return;
const rc=dept.rag||'none';
h+=`<div class="card"><div class="card-hdr"><div class="card-tog" onclick="openD['${dept.id}']=!openD['${dept.id}'];render()"><div class="card-top"><div class="card-nm"><span>${dept.emoji}</span><span>${esc(dept.name)}</span></div><div class="card-st"><div class="rag-row"><button class="rag-dot ${rc==='red'?'rag-r':'rag-none'}" style="${rc==='red'?'box-shadow:0 0 0 2px white,0 0 0 3px #EF4444':''}" onclick="event.stopPropagation();setRag('${dept.id}','red')"></button><button class="rag-dot ${rc==='amber'?'rag-a':'rag-none'}" style="${rc==='amber'?'box-shadow:0 0 0 2px white,0 0 0 3px #F59E0B':''}" onclick="event.stopPropagation();setRag('${dept.id}','amber')"></button><button class="rag-dot ${rc==='green'?'rag-g':'rag-none'}" style="${rc==='green'?'box-shadow:0 0 0 2px white,0 0 0 3px #22C55E':''}" onclick="event.stopPropagation();setRag('${dept.id}','green')"></button></div><span class="card-cnt" style="color:${dept.color};background:${dept.color}14">${isF?vis.filter(t=>t.done).length+'/'+vis.length:dn+'/'+tot}</span><svg class="chv ${isO?'open':''}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div></div><div style="width:100%;padding-top:2px"><div class="card-bar"><div class="card-fill" style="width:${p}%;background:${dept.color}"></div></div><div style="display:flex;justify-content:flex-end;margin-top:3px"><span class="card-pct">${p}%</span></div></div></div><div class="reord"><button ${idx===0?'disabled':''} onclick="event.stopPropagation();moveUp('${dept.id}')">▲</button><button ${idx===D.length-1?'disabled':''} onclick="event.stopPropagation();moveDown('${dept.id}')">▼</button></div></div><div class="tpanel ${isO?'open':''}"><div class="tinner">`;
(dept.milestones||[]).sort((a,b)=>a.date.localeCompare(b.date)).forEach(ms=>{const od=isOverdue(ms.date);h+=`<div class="ms-row ${od?'overdue':''}"><span style="font-size:14px;flex-shrink:0">${od?'⚠️':'🏁'}</span><span class="ms-text">${esc(ms.text)}</span><span class="ms-date">${fmtDate(ms.date)}${od?' OVERDUE':''}</span><button class="ms-del" onclick="delMilestone('${dept.id}','${ms.id}')">×</button></div>`});
if(msForm===dept.id){h+=`<div style="display:flex;gap:6px;margin:8px 0 4px;flex-wrap:wrap"><input type="text" id="ms-txt-${dept.id}" placeholder="Milestone..." style="flex:2;min-width:100px;border:1px solid #E5E7EB;border-radius:8px;padding:7px 9px;font-size:12px;outline:none"><input type="date" id="ms-dt-${dept.id}" value="${today()}" style="flex:1;min-width:100px;border:1px solid #E5E7EB;border-radius:8px;padding:7px;font-size:12px;outline:none"><button onclick="addMilestone('${dept.id}')" style="border:none;background:#D97706;color:white;border-radius:8px;padding:7px 12px;font-size:12px;font-weight:600;cursor:pointer">Add</button><button onclick="msForm=null;render()" style="border:none;background:#F3F4F6;color:#6B7280;border-radius:8px;padding:7px 10px;font-size:12px;cursor:pointer">✕</button></div>`}
if(!sorted.length)h+=`<p class="notasks">${isF?'No matching':'No tasks yet'}</p>`;
sorted.forEach(task=>{const isEd=editingT===task.id,isNt=notesOpen[task.id];const pb=task.priority==='high'?'b-hi':task.priority==='low'?'b-lo':'b-md';const pl=task.priority==='high'?'High':task.priority==='low'?'Low':'Med';const nc=(task.notes||[]).length;
h+=`<div class="trow"><div class="trow-main"><div style="padding-top:1px"><button class="cb ${task.done?'':'off'}" style="${task.done?'background:'+dept.color:''}" onclick="toggleTask('${dept.id}','${task.id}')">${task.done?'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':''}</button></div><div style="flex:1;min-width:0"><span class="ttxt ${task.done?'done':'todo'}">${esc(task.text)}</span><div class="tmeta"><span class="badge ${pb}">${pl}</span>${task.assignee?`<span class="badge b-staff">👤 ${esc(task.assignee)}</span>`:`<span class="badge b-unass">Unassigned</span>`}${nc?`<span class="badge" style="background:#EEF2FF;color:#6366F1">💬 ${nc}</span>`:''}</div></div><div class="tbtns"><button class="tbtn" onclick="notesOpen['${task.id}']=!notesOpen['${task.id}'];render()">💬</button><button class="tbtn" onclick="editingT=editingT==='${task.id}'?null:'${task.id}';render()">✏️</button><button class="tbtn" onclick="deleteTask('${dept.id}','${task.id}')">×</button></div></div>`;
if(isEd){h+=`<div class="tedit"><select onchange="updateTF('${dept.id}','${task.id}','priority',this.value)"><option value="high" ${task.priority==='high'?'selected':''}>🔴 High</option><option value="med" ${task.priority==='med'?'selected':''}>🟡 Med</option><option value="low" ${task.priority==='low'?'selected':''}>🔵 Low</option></select><select onchange="updateTF('${dept.id}','${task.id}','assignee',this.value)"><option value="">Unassigned</option>${staff.map(s=>`<option value="${esc(s)}" ${task.assignee===s?'selected':''}>${esc(s)}</option>`).join('')}</select><button class="done-btn" onclick="editingT=null;render()">Done</button></div>`}
if(isNt){h+=`<div class="notes-box">`;if(!(task.notes||[]).length)h+=`<p style="font-size:11px;color:#BCBAB5;font-style:italic">No notes yet</p>`;(task.notes||[]).forEach(n=>{h+=`<div class="note-item"><span>${esc(n.text)}</span><br><span class="note-time">${fmtDateTime(n.time)}</span></div>`});h+=`<div class="note-form"><input id="note-inp-${task.id}" placeholder="Add note..." onkeydown="if(event.key==='Enter')addNote('${dept.id}','${task.id}')"><button style="background:${dept.color}" onclick="addNote('${dept.id}','${task.id}')">Add</button></div></div>`}
h+=`</div>`});
if(isA){h+=`<div class="atf"><div class="atf-r"><input type="text" id="atf-t-${dept.id}" placeholder="New task..." onkeydown="if(event.key==='Enter')addTask('${dept.id}');if(event.key==='Escape'){addingTo=null;render()}"></div><div class="atf-r"><select id="atf-p-${dept.id}"><option value="high">🔴 High</option><option value="med" selected>🟡 Med</option><option value="low">🔵 Low</option></select><select id="atf-s-${dept.id}"><option value="">Unassigned</option>${staff.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('')}</select></div><button class="atf-sub" style="background:${dept.color}" onclick="addTask('${dept.id}')">Add Task</button></div>`}
else{h+=`<div class="arow"><button class="abtn" onclick="addingTo='${dept.id}';render();setTimeout(()=>{const el=document.getElementById('atf-t-${dept.id}');if(el)el.focus()},50)">+ Task</button><button class="msbtn" onclick="msForm='${dept.id}';render()">🏁</button><button class="dbtn" onclick="deleteDept('${dept.id}')">Del</button></div>`}
h+=`</div></div></div>`});
h+=`<button class="add-dept" onclick="activeModal='addDept';render()">+ Add Department</button><button class="rst" onclick="resetAll()">Reset to defaults</button><p class="foot">${serverMode?'<span style="color:#22C55E">●</span> Server mode — data shared':'<span style="color:#F59E0B">●</span> Local mode — browser only'}</p></div>`}

// ===== SERVICE USERS PAGE =====
if(view==='sus'){
const allFlags=Object.keys(FLAG_INFO);
// Filter SUs
let filtered=serviceUsers.filter(su=>{
let match=true;
if(suPageSearch){
const q=suPageSearch.toLowerCase();
match=su.name.toLowerCase().includes(q)||(su.pn&&su.pn.toLowerCase().includes(q))||(su.pc&&su.pc.toLowerCase().includes(q))||(su.co&&su.co.toLowerCase().includes(q))||(su.med&&su.med.toLowerCase().includes(q))||(su.flags||[]).some(f=>(FLAG_INFO[f]||f).toLowerCase().includes(q)||f.toLowerCase().includes(q));
}
if(match&&suPageFlags.length){match=suPageFlags.every(f=>(su.flags||[]).includes(f))}
return match;
});
// Sort
if(suPageSort==='name')filtered.sort((a,b)=>a.name.localeCompare(b.name));
else if(suPageSort==='flags')filtered.sort((a,b)=>(b.flags||[]).length-(a.flags||[]).length);
else if(suPageSort==='postcode')filtered.sort((a,b)=>(a.pc||'').localeCompare(b.pc||''));
else if(suPageSort==='days')filtered.sort((a,b)=>(b.days||[]).length-(a.days||[]).length);

// Stats
const flagCounts={};allFlags.forEach(f=>{flagCounts[f]=serviceUsers.filter(su=>(su.flags||[]).includes(f)).length});
h+=`<div style="margin-bottom:16px">`;
h+=`<div class="su-page-stats">`;
h+=`<div class="su-stat-card"><div class="su-stat-num">${serviceUsers.length}</div><div class="su-stat-lbl">Total SUs</div></div>`;
h+=`<div class="su-stat-card"><div class="su-stat-num">${serviceUsers.filter(s=>(s.flags||[]).length>=3).length}</div><div class="su-stat-lbl">3+ Flags</div></div>`;
h+=`<div class="su-stat-card"><div class="su-stat-num">${serviceUsers.filter(s=>s.med).length}</div><div class="su-stat-lbl">Medical Notes</div></div>`;
h+=`<div class="su-stat-card"><div class="su-stat-num">${serviceUsers.filter(s=>s.ma).length}</div><div class="su-stat-lbl">Medication</div></div>`;
h+=`</div>`;

// Search + sort
h+=`<div class="su-filter-bar">`;
h+=`<input class="su-search" placeholder="🔍 Search name, postcode, carer, condition, flag..." value="${esc(suPageSearch)}" oninput="suPageSearch=this.value;render()">`;
h+=`<select class="su-sort-btn" onchange="suPageSort=this.value;render()"><option value="name" ${suPageSort==='name'?'selected':''}>A→Z Name</option><option value="flags" ${suPageSort==='flags'?'selected':''}>Most Flags</option><option value="postcode" ${suPageSort==='postcode'?'selected':''}>Postcode</option><option value="days" ${suPageSort==='days'?'selected':''}>Most Days</option></select>`;
h+=`<button onclick="suAttView=!suAttView;render()" style="border:1px solid ${suAttView?'#6366F1':'#E5E7EB'};background:${suAttView?'#EEF2FF':'white'};color:${suAttView?'#6366F1':'#6B7280'};border-radius:8px;padding:6px 10px;font-size:11px;font-weight:600;cursor:pointer;white-space:nowrap">${suAttView?'📋 Cards':'📅 Attendance'}</button>`;
h+=`</div>`;

// Flag filter chips
h+=`<div class="su-flag-filters">`;
allFlags.forEach(f=>{
const active=suPageFlags.includes(f);
h+=`<button class="su-flag-btn ${active?'active':''}" onclick="if(suPageFlags.includes('${f}'))suPageFlags=suPageFlags.filter(x=>x!=='${f}');else suPageFlags.push('${f}');render()" title="${FLAG_INFO[f]}: ${flagCounts[f]} SUs"><span class="su-flag ${FLAG_COLORS[f]||''}" style="font-size:10px;pointer-events:none">${f}</span> ${flagCounts[f]}</button>`;
});
if(suPageFlags.length)h+=`<button class="su-flag-btn" onclick="suPageFlags=[];render()" style="color:#EF4444;border-color:#FCA5A5">✕ Clear</button>`;
h+=`</div>`;

// Results count
h+=`<div class="su-page-count">${filtered.length===serviceUsers.length?`All ${filtered.length} service users`:`${filtered.length} of ${serviceUsers.length} service users`}</div>`;

// SU view - attendance grid or cards
if(suAttView){
const dayTotals={};ROTA_DAYS.forEach(d=>{dayTotals[d]=filtered.filter(su=>(su.days||[]).includes(d)).length});
h+=`<div class="att-grid"><table class="att-table"><thead><tr><th>Service User</th>`;
ROTA_DAYS.forEach(d=>{h+=`<th>${DAY_NAMES[d].slice(0,3)}<br><span style="font-size:9px;color:#9CA3AF;font-weight:500">${dayTotals[d]}</span></th>`});
h+=`<th>Total</th></tr></thead><tbody>`;
filtered.forEach(su=>{
const days=su.days||[];
h+=`<tr><td onclick="showSUDetail('${su.id}')" style="cursor:pointer">${esc(su.name)}</td>`;
ROTA_DAYS.forEach(d=>{
const on=days.includes(d);
h+=`<td><button class="att-check ${on?'on':'off'}" onclick="event.stopPropagation();toggleSUDay('${su.id}','${d}')">${on?'\u2713':''}</button></td>`;
});
h+=`<td style="font-weight:700;color:#6366F1">${days.length}</td></tr>`;
});
h+=`</tbody></table></div>`;
h+=`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">`;
ROTA_DAYS.forEach(d=>{h+=`<div style="background:white;border-radius:10px;padding:8px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);text-align:center;min-width:50px"><div style="font-size:18px;font-weight:700;color:#6366F1">${dayTotals[d]}</div><div style="font-size:10px;color:#6B7280;font-weight:600">${DAY_NAMES[d].slice(0,3)}</div></div>`});
h+=`</div></div>`;
} else {
h+=`<div class="su-card-grid">`;
filtered.forEach(su=>{
h+=`<div class="su-card" onclick="showSUDetail('${su.id}')">`;
h+=`<div style="display:flex;justify-content:space-between;align-items:start">`;
h+=`<div><div class="su-card-name">${esc(su.name)}</div>`;
if(su.pn)h+=`<div class="su-card-pref">Prefers: "${esc(su.pn)}"</div>`;
h+=`</div><button onclick="event.stopPropagation();deleteSU('${su.id}')" style="border:none;background:none;font-size:18px;color:#D1D5DB;cursor:pointer;padding:0 2px;line-height:1" title="Delete">×</button></div>`;
if(su.flags&&su.flags.length)h+=`<div class="su-card-flags">${suFlagBadges(su.flags)}</div>`;
if(su.days&&su.days.length)h+=`<div class="su-day-dots">${su.days.map(d=>'<span class="su-day-dot">'+DAY_NAMES[d].slice(0,3)+'</span>').join('')}</div>`;
h+=`<div class="su-card-meta">`;
if(su.dob)h+=`<span>${esc(su.dob)}</span>`;
if(su.pc)h+=`<span>📍 ${esc(su.pc)}</span>`;
if(su.ph)h+=`<span>📞 ${esc(su.ph)}</span>`;
if(su.co)h+=`<span>🏢 ${esc(su.co.length>35?su.co.slice(0,35)+'…':su.co)}</span>`;
if(su.med)h+=`<span>🏥 ${esc(su.med.length>40?su.med.slice(0,40)+'…':su.med)}</span>`;
h+=`</div></div>`;
});
h+=`</div></div>`;
}
h+=`<button class="add-dept" onclick="activeModal='addSU';render()" style="margin-top:8px">+ Add Service User</button>`;
}

// ===== REGISTER TAB =====
if(view==='regTab'){
const rwk=getWeekKey(regWeekOffset);
const weekDates=getWeekDates(regWeekOffset);
const isThisWeek=regWeekOffset===0;
const activeSchd=weekSchedules[rwk]||schedule;

// Auto-populate from schedule
populateRegFromSchedule(rwk);

h+=`<div style="padding:0 12px 100px">`;

// Week nav
h+=`<div class="rota-week-nav">`;
h+=`<button class="rota-week-btn" onclick="regWeekOffset--;render()">◀ Prev</button>`;
h+=`<div class="rota-week-label">${rwk} ${isThisWeek?'<span style="background:#22C55E;color:white;font-size:9px;padding:2px 6px;border-radius:100px;margin-left:4px;vertical-align:middle">This Week</span>':''}<br><span class="rota-week-dates">${fmtShortDate(weekDates[0])} – ${fmtShortDate(weekDates[4])}</span></div>`;
h+=`<button class="rota-week-btn" onclick="regWeekOffset++;render()">Next ▶</button>`;
h+=`</div>`;
h+=`<div style="display:flex;gap:6px;margin-bottom:10px"><button class="rota-week-btn" onclick="regWeekOffset=0;render()">Today</button></div>`;

// Summary counts for the week
let weekPresent=0,weekAbsent=0,weekLate=0,weekExpected=0;
DAYS.forEach(day=>{
const daySUs=serviceUsers.filter(su=>(su.days||[]).includes(day));
daySUs.forEach(su=>{
const st=getRegStat(rwk,day,su.id);
weekExpected++;
if(st==='present')weekPresent++;
else if(st==='absent')weekAbsent++;
else if(st==='late')weekLate++;
});
});
h+=`<div class="reg-summary">`;
h+=`<div class="reg-sum-card"><div class="reg-sum-num" style="color:#6366F1">${weekExpected}</div><div class="reg-sum-lbl">Expected</div></div>`;
h+=`<div class="reg-sum-card"><div class="reg-sum-num" style="color:#22C55E">${weekPresent}</div><div class="reg-sum-lbl">Present</div></div>`;
h+=`<div class="reg-sum-card"><div class="reg-sum-num" style="color:#EF4444">${weekAbsent}</div><div class="reg-sum-lbl">Absent</div></div>`;
h+=`<div class="reg-sum-card"><div class="reg-sum-num" style="color:#F59E0B">${weekLate}</div><div class="reg-sum-lbl">Late</div></div>`;
h+=`</div>`;

// Each day
DAYS.forEach((day,di)=>{
const daySessions=activeSchd.filter(s=>s.day===day);
const expectedSUs=serviceUsers.filter(su=>(su.days||[]).includes(day));
const assignedIds=new Set();
daySessions.forEach(s=>(s.assignedSUs||[]).forEach(id=>assignedIds.add(id)));

const dayP=expectedSUs.filter(su=>getRegStat(rwk,day,su.id)==='present').length;
const dayA=expectedSUs.filter(su=>getRegStat(rwk,day,su.id)==='absent').length;
const dayL=expectedSUs.filter(su=>getRegStat(rwk,day,su.id)==='late').length;

h+=`<div class="reg-day-card">`;
h+=`<div class="reg-day-hdr"><div class="reg-day-title">${DAY_NAMES[day]} <span style="font-weight:400;font-size:12px;color:#6B7280">${fmtShortDate(weekDates[di])}</span></div>`;
h+=`<div class="reg-day-count">${expectedSUs.length} expected · <span style="color:#22C55E">${dayP}✓</span> <span style="color:#EF4444">${dayA}✗</span> <span style="color:#F59E0B">${dayL}⏰</span></div></div>`;

// Group by session
['am','pm'].forEach(period=>{
const periodSessions=daySessions.filter(s=>s.period===period);
if(!periodSessions.length)return;
periodSessions.forEach(sess=>{
const sessAssigned=(sess.assignedSUs||[]).map(id=>serviceUsers.find(u=>u.id===id)).filter(Boolean);
if(!sessAssigned.length)return;
h+=`<div class="reg-sess-title">${period.toUpperCase()} · ${esc(sess.name)} (${sessAssigned.length})</div>`;
sessAssigned.forEach(su=>{
const st=getRegStat(rwk,day,su.id);
const note=getRegNote(rwk,day,su.id);
h+=`<div class="reg-row">`;
h+=`<div class="reg-name" onclick="showSUDetail('${su.id}')" style="cursor:pointer">${esc(su.pn||su.name)}</div>`;
h+=`<div class="reg-status">`;
h+=`<button class="reg-btn ${st==='present'?'active-p':''}" onclick="setRegStatus('${rwk}','${day}','${su.id}','present')" title="Present">✓</button>`;
h+=`<button class="reg-btn ${st==='absent'?'active-a':''}" onclick="setRegStatus('${rwk}','${day}','${su.id}','absent')" title="Absent">✗</button>`;
h+=`<button class="reg-btn ${st==='late'?'active-l':''}" onclick="setRegStatus('${rwk}','${day}','${su.id}','late')" title="Late">⏰</button>`;
h+=`<button class="reg-btn ${st==='holiday'?'active-h':''}" onclick="setRegStatus('${rwk}','${day}','${su.id}','holiday')" title="Holiday">🏖</button>`;
h+=`</div>`;
h+=`<input class="reg-note" placeholder="Note..." value="${esc(note)}" onchange="setRegNote('${rwk}','${day}','${su.id}',this.value)">`;
h+=`</div>`;
});
});
});

// Unassigned SUs who attend this day but aren't in any session
const unassigned=expectedSUs.filter(su=>!assignedIds.has(su.id));
if(unassigned.length){
h+=`<div class="reg-unassigned">⚠️ <strong>${unassigned.length} SU${unassigned.length>1?'s':''} attend ${DAY_NAMES[day]} but not assigned to a session:</strong><br>`;
unassigned.forEach(su=>{
const st=getRegStat(rwk,day,su.id);
const note=getRegNote(rwk,day,su.id);
h+=`<div class="reg-row" style="background:transparent">`;
h+=`<div class="reg-name" onclick="showSUDetail('${su.id}')" style="cursor:pointer">${esc(su.pn||su.name)}</div>`;
h+=`<div class="reg-status">`;
h+=`<button class="reg-btn ${st==='present'?'active-p':''}" onclick="setRegStatus('${rwk}','${day}','${su.id}','present')">✓</button>`;
h+=`<button class="reg-btn ${st==='absent'?'active-a':''}" onclick="setRegStatus('${rwk}','${day}','${su.id}','absent')">✗</button>`;
h+=`<button class="reg-btn ${st==='late'?'active-l':''}" onclick="setRegStatus('${rwk}','${day}','${su.id}','late')">⏰</button>`;
h+=`<button class="reg-btn ${st==='holiday'?'active-h':''}" onclick="setRegStatus('${rwk}','${day}','${su.id}','holiday')">🏖</button>`;
h+=`</div>`;
h+=`<input class="reg-note" placeholder="Note..." value="${esc(note)}" onchange="setRegNote('${rwk}','${day}','${su.id}',this.value)">`;
h+=`</div>`;
});
h+=`</div>`;
}

if(!expectedSUs.length&&!daySessions.length){
h+=`<div style="color:#9CA3AF;font-size:12px;padding:8px 0">No SUs scheduled for ${DAY_NAMES[day]}</div>`;
}
h+=`</div>`;
});
h+=`</div>`;
}


// ===== ROTA TAB =====
if(view==='rotaTab'){
const wk=getWeekKey(rotaWeekOffset);
const weekDates=getWeekDates(rotaWeekOffset);
const isThisWeek=rotaWeekOffset===0;

h+=`<div class="rota-page">`;

// Week navigation
h+=`<div class="rota-week-nav">`;
h+=`<button class="rota-week-btn" onclick="rotaWeekOffset--;rotaEditCell=null;driverEditCell=null;render()">◀ Prev</button>`;
h+=`<div class="rota-week-label">${wk} ${isThisWeek?'<span style="background:#22C55E;color:white;font-size:9px;padding:2px 6px;border-radius:100px;margin-left:4px;vertical-align:middle">This Week</span>':''}<br><span class="rota-week-dates">${fmtShortDate(weekDates[0])} – ${fmtShortDate(weekDates[6])}</span></div>`;
h+=`<button class="rota-week-btn" onclick="rotaWeekOffset++;rotaEditCell=null;driverEditCell=null;render()">Next ▶</button>`;
h+=`</div>`;
h+=`<div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap"><button class="rota-week-btn" onclick="rotaWeekOffset=0;rotaEditCell=null;driverEditCell=null;render()">Today</button><button class="rota-copy-btn" onclick="copyWeekRota(rotaWeekOffset,rotaWeekOffset+1)">📋 Copy to next week</button><button class="rota-copy-btn" onclick="copyWeekRota(rotaWeekOffset-1,rotaWeekOffset)">📋 Copy from last week</button></div>`;

// Sub-tabs
h+=`<div class="rota-sub-tabs"><button class="rota-sub-tab ${rotaSubTab==='rooms'?'on':''}" onclick="rotaSubTab='rooms';rotaEditCell=null;driverEditCell=null;render()">🏠 Room Rota</button><button class="rota-sub-tab ${rotaSubTab==='drivers'?'on':''}" onclick="rotaSubTab='drivers';rotaEditCell=null;driverEditCell=null;render()">🚐 Drivers Rota</button></div>`;

// Legend
h+=`<div class="rota-legend">`;
staffProfiles.forEach(sp=>{
h+=`<div class="rota-legend-item"><div class="rota-legend-dot" style="background:${sp.color}"></div>${esc(sp.name)}</div>`;
});
h+=`</div>`;

if(rotaSubTab==='rooms'){
// ---- ROOM ROTA TABLE ----
h+=`<table class="rota-table"><thead>`;
h+=`<tr><th rowspan="2" style="vertical-align:middle">Room</th>`;
ROTA_DAYS.forEach((d,i)=>{const wke=d==='sat'||d==='sun';h+=`<th colspan="2" class="rota-day-hdr${wke?' rota-wkend-hdr':''}">${DAY_NAMES[d]} <span style="font-weight:400;opacity:0.7">${fmtShortDate(weekDates[i])}</span></th>`});
h+=`</tr><tr>`;
ROTA_DAYS.forEach(d=>{const wke=d==='sat'||d==='sun';h+=`<th class="rota-am${wke?' rota-wkend-hdr':''}" style="font-size:9px">AM</th><th class="rota-pm${wke?' rota-wkend-hdr':''}" style="font-size:9px">PM</th>`});
h+=`</tr></thead><tbody>`;

// Room rows
ROOMS.forEach(room=>{
h+=`<tr><td><span class="rota-room-icon">${ROOM_ICONS[room]||'📍'}</span>${esc(room)}</td>`;
ROTA_DAYS.forEach(day=>{
['am','pm'].forEach(period=>{
const assigned=getRotaStaff(wk,room,day,period);
const cellKey=wk+'|'+room+'|'+day+'|'+period;
const isEditing=rotaEditCell===cellKey;
const _wke=day==='sat'||day==='sun';h+=`<td${_wke?' class="rota-wkend"':''}><div class="rota-cell" onclick="rotaEditCell=rotaEditCell==='${cellKey}'?null:'${cellKey}';driverEditCell=null;render()">`;
if(assigned.length){assigned.forEach(sn=>{const sp=staffProfiles.find(p=>p.name===sn);const clr=sp?sp.color:'#6B7280';h+=`<span class="rota-chip" style="background:${clr}20;color:${clr}">${esc(sn.split(' ')[0])}</span>`})}
else{h+=`<span style="font-size:9px;color:#D1D5DB">+</span>`}
h+=`</div>`;
if(isEditing){
h+=`<div class="rota-edit-popup" onclick="event.stopPropagation()">`;
h+=`<div class="rota-edit-title">${ROOM_ICONS[room]||''} ${esc(room)} · ${DAY_NAMES[day]} ${period.toUpperCase()}</div>`;
staffProfiles.forEach(sp=>{const isOn=assigned.includes(sp.name);h+=`<div class="rota-staff-option" onclick="toggleRotaStaff('${esc(wk)}','${esc(room)}','${day}','${period}','${esc(sp.name)}')"><div class="rota-staff-check ${isOn?'on':''}">${isOn?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>':''}</div><span style="color:${sp.color};font-weight:600">${esc(sp.name)}</span></div>`});
if(assigned.length){h+=`<div style="border-top:1px solid #E5E7EB;margin-top:4px;padding-top:4px"><button onclick="clearRotaCell('${esc(wk)}','${esc(room)}','${day}','${period}')" style="border:none;background:none;color:#EF4444;font-size:11px;font-weight:600;cursor:pointer;padding:4px 8px">Clear all</button></div>`}
h+=`</div>`;
}
h+=`</td>`;
});});
h+=`</tr>`;
});

// Leave rows
LEAVE_ROWS.forEach(lv=>{
const rowCls=lv==='Annual Leave'?'rota-leave-row':'rota-sick-row';
h+=`<tr class="${rowCls}"><td><span class="rota-room-icon">${ROOM_ICONS[lv]||''}</span>${esc(lv)}</td>`;
ROTA_DAYS.forEach(day=>{
['am','pm'].forEach(period=>{
const assigned=getRotaStaff(wk,lv,day,period);
const cellKey=wk+'|'+lv+'|'+day+'|'+period;
const isEditing=rotaEditCell===cellKey;
const _wke=day==='sat'||day==='sun';h+=`<td${_wke?' class="rota-wkend"':''}><div class="rota-cell" onclick="rotaEditCell=rotaEditCell==='${cellKey}'?null:'${cellKey}';driverEditCell=null;render()">`;
if(assigned.length){assigned.forEach(sn=>{const sp=staffProfiles.find(p=>p.name===sn);const clr=lv==='Sick Leave'?'#EF4444':'#D97706';h+=`<span class="rota-chip" style="background:${clr}20;color:${clr}">${esc(sn.split(' ')[0])}</span>`})}
else{h+=`<span style="font-size:9px;color:#D1D5DB">+</span>`}
h+=`</div>`;
if(isEditing){
h+=`<div class="rota-edit-popup" onclick="event.stopPropagation()">`;
h+=`<div class="rota-edit-title">${ROOM_ICONS[lv]||''} ${esc(lv)} · ${DAY_NAMES[day]} ${period.toUpperCase()}</div>`;
staffProfiles.forEach(sp=>{const isOn=assigned.includes(sp.name);h+=`<div class="rota-staff-option" onclick="toggleRotaStaff('${esc(wk)}','${esc(lv)}','${day}','${period}','${esc(sp.name)}')"><div class="rota-staff-check ${isOn?'on':''}">${isOn?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>':''}</div><span style="color:${sp.color};font-weight:600">${esc(sp.name)}</span></div>`});
if(assigned.length){h+=`<div style="border-top:1px solid #E5E7EB;margin-top:4px;padding-top:4px"><button onclick="clearRotaCell('${esc(wk)}','${esc(lv)}','${day}','${period}')" style="border:none;background:none;color:#EF4444;font-size:11px;font-weight:600;cursor:pointer;padding:4px 8px">Clear all</button></div>`}
h+=`</div>`;
}
h+=`</td>`;
});});
h+=`</tr>`;
});

h+=`</tbody></table>`;
} // end rooms sub-tab

if(rotaSubTab==='drivers'){
// ---- DRIVERS ROTA TABLE ----
h+=`<table class="rota-table"><thead>`;
h+=`<tr><th rowspan="2" style="vertical-align:middle">Route</th>`;
ROTA_DAYS.forEach((d,i)=>{const wke=d==='sat'||d==='sun';h+=`<th colspan="4" class="rota-day-hdr${wke?' rota-wkend-hdr':''}">${DAY_NAMES[d]} <span style="font-weight:400;opacity:0.7">${fmtShortDate(weekDates[i])}</span></th>`});
h+=`</tr><tr>`;
ROTA_DAYS.forEach(d=>{const wke=d==='sat'||d==='sun';DRIVER_SHIFTS.forEach(sh=>{const bg=sh==='AM'?'rota-am':sh==='PM'?'rota-pm':'rota-am';h+=`<th class="${bg}${wke?' rota-wkend-hdr':''}" style="font-size:8px;padding:4px 2px">${sh}</th>`})});
h+=`</tr></thead><tbody>`;

ROUTES.forEach(route=>{
h+=`<tr><td><span class="rota-room-icon">${ROUTE_ICONS[route]||'🚐'}</span>${esc(route)}</td>`;
ROTA_DAYS.forEach(day=>{
DRIVER_SHIFTS.forEach(shift=>{
const cell=getDriverCell(wk,route,day,shift);
const cellKey=wk+'|'+route+'|'+day+'|'+shift;
const isEditing=driverEditCell===cellKey;
const _dwke=day==='sat'||day==='sun';h+=`<td${_dwke?' class="rota-wkend"':''}><div class="driver-cell" onclick="driverEditCell=driverEditCell==='${cellKey}'?null:'${cellKey}';rotaEditCell=null;render()">`;
if(cell.driver){
const sp=staffProfiles.find(p=>p.name===cell.driver);
const clr=sp?sp.color:'#6B7280';
h+=`<span class="driver-name" style="background:${clr}20;color:${clr}">${esc(cell.driver.split(' ')[0])}</span>`;
if(cell.minibus)h+=`<span class="driver-bus">${esc(cell.minibus)}</span>`;
}else{h+=`<span style="font-size:9px;color:#D1D5DB">+</span>`}
h+=`</div>`;
if(isEditing){
h+=`<div class="driver-edit-popup" onclick="event.stopPropagation()">`;
h+=`<div class="rota-edit-title">🚐 ${esc(route)} · ${DAY_NAMES[day]} ${esc(shift)}</div>`;
h+=`<div class="driver-field"><label>Driver</label><select onchange="setDriverField('${esc(wk)}','${esc(route)}','${day}','${esc(shift)}','driver',this.value)"><option value="">— None —</option>`;
staffProfiles.forEach(sp=>{h+=`<option value="${esc(sp.name)}" ${cell.driver===sp.name?'selected':''}>${esc(sp.name)}</option>`});
h+=`</select></div>`;
h+=`<div class="driver-field"><label>Minibus</label><select onchange="setDriverField('${esc(wk)}','${esc(route)}','${day}','${esc(shift)}','minibus',this.value)"><option value="">— None —</option>`;
MINIBUSES.forEach(mb=>{h+=`<option value="${esc(mb)}" ${cell.minibus===mb?'selected':''}>${esc(mb)}</option>`});
h+=`</select></div>`;
if(cell.driver){h+=`<button onclick="clearDriverCell('${esc(wk)}','${esc(route)}','${day}','${esc(shift)}')" style="border:none;background:none;color:#EF4444;font-size:11px;font-weight:600;cursor:pointer;padding:4px 0">Clear</button>`}
h+=`</div>`;
}
h+=`</td>`;
});});
h+=`</tr>`;
});

h+=`</tbody></table>`;
} // end drivers sub-tab

// Staff summary
h+=`<div style="margin-top:16px;display:flex;flex-direction:column;gap:6px">`;
h+=`<div style="font-size:13px;font-weight:700;color:#1F2937;margin-bottom:4px">Weekly Summary — ${wk}</div>`;
staffProfiles.forEach(sp=>{
let roomSlots=0,leaveSlots=0,driverSlots=0;
Object.entries(rota).forEach(([key,arr])=>{if(key.startsWith(wk+'|')&&arr.includes(sp.name)){if(LEAVE_ROWS.some(l=>key.includes('|'+l+'|')))leaveSlots++;else roomSlots++}});
Object.entries(driverRota).forEach(([key,val])=>{if(key.startsWith(wk+'|')&&val.driver===sp.name)driverSlots++});
const total=roomSlots+driverSlots;
h+=`<div style="background:white;border-radius:10px;padding:8px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);display:flex;align-items:center;gap:10px">`;
h+=`<div style="width:32px;height:32px;border-radius:8px;background:${sp.color};display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;flex-shrink:0">${sp.name.charAt(0)}</div>`;
h+=`<div style="flex:1"><div style="font-size:13px;font-weight:600;color:#1F2937">${esc(sp.name)}</div>`;
h+=`<div style="font-size:10px;color:#6B7280">${roomSlots} room · ${driverSlots} driving${leaveSlots?` · <span style="color:#D97706">${leaveSlots} leave</span>`:''}</div>`;
h+=`</div></div>`;
});
h+=`</div>`;

h+=`</div>`;
}

// ===== DASHBOARD =====
if(view==='dash'){
h+=`<div class="dash-section">`;const rc={red:0,amber:0,green:0,none:0};D.forEach(d=>rc[d.rag||'none']++);
h+=`<div class="dash-title">RAG Overview</div><div class="rag-summary"><div class="rag-card"><div class="rag-card-dot" style="background:#22C55E"></div><div class="rag-card-num">${rc.green}</div><div class="rag-card-lbl">Green</div></div><div class="rag-card"><div class="rag-card-dot" style="background:#F59E0B"></div><div class="rag-card-num">${rc.amber}</div><div class="rag-card-lbl">Amber</div></div><div class="rag-card"><div class="rag-card-dot" style="background:#EF4444"></div><div class="rag-card-num">${rc.red}</div><div class="rag-card-lbl">Red</div></div></div>`;
const allMs=[];D.forEach(d=>(d.milestones||[]).forEach(m=>allMs.push({...m,dept:d.name})));allMs.sort((a,b)=>a.date.localeCompare(b.date));
if(allMs.length){h+=`<div class="dash-title" style="margin-top:16px">Milestones</div>`;allMs.forEach(ms=>{const od=isOverdue(ms.date);h+=`<div class="ms-row ${od?'overdue':''}" style="margin-bottom:6px"><span style="font-size:14px;flex-shrink:0">${od?'⚠️':'🏁'}</span><span class="ms-text">${esc(ms.text)}<br><span style="font-weight:400;font-size:10px;color:#9CA3AF">${esc(ms.dept)}</span></span><span class="ms-date">${fmtDate(ms.date)}${od?' OVERDUE':''}</span></div>`})}
h+=`<div class="dash-title" style="margin-top:16px">Workload</div>`;
[...staff,'Unassigned'].forEach(person=>{const isUn=person==='Unassigned';const tasks=D.flatMap(d=>d.tasks.filter(t=>isUn?!t.assignee:t.assignee===person));if(!tasks.length)return;const dc=tasks.filter(t=>t.done).length;const hi=tasks.filter(t=>!t.done&&t.priority==='high').length;const inc=tasks.filter(t=>!t.done).sort((a,b)=>priOrd(a.priority)-priOrd(b.priority));
h+=`<div class="dash-card"><div class="dash-person-hdr"><div class="dash-av" style="background:${isUn?'#9CA3AF':stClr(person)}">${isUn?'?':stIni(person)}</div><div style="flex:1"><div class="dash-nm">${esc(person)}</div><div class="dash-stats">${tasks.length} tasks · ${dc} done${hi?` · <span style="color:#DC2626">${hi} high</span>`:''}</div></div><span style="font-size:18px;font-weight:700;color:${pct(dc,tasks.length)>=80?'#22C55E':pct(dc,tasks.length)>=50?'#D97706':'#6B7280'}">${pct(dc,tasks.length)}%</span></div>`;
inc.slice(0,5).forEach(t=>{const dn=D.find(d=>d.tasks.some(x=>x.id===t.id))?.name||'';h+=`<div class="dash-task"><span class="badge ${t.priority==='high'?'b-hi':t.priority==='low'?'b-lo':'b-md'}" style="flex-shrink:0">${t.priority==='high'?'High':t.priority==='low'?'Low':'Med'}</span><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(t.text)}</span><span class="dash-dept-tag">${esc(dn)}</span></div>`});
if(inc.length>5)h+=`<p style="font-size:10px;color:#9CA3AF;text-align:center;padding:3px">+${inc.length-5} more</p>`;h+=`</div>`});h+=`</div>`}

// ===== CALENDAR TAB =====
if(view==='calTab'){
const calIds=[
{id:'c_a2fc97ac7ec6d397d6296427bafbeb18178afef1b4e372e794c4a272f61549b5@group.calendar.google.com',name:'Spiral Holidays',color:'#9a9cff'},
{id:'c_b57d5b89f1300098ff602f6e485d62341b8e5c6cf55aba1b7afffd9dd74095e2@group.calendar.google.com',name:'Events',color:'#9fe1e7'},
{id:'c_fe55ecf4b564b226c7696e42a2c8fbe8426195721562af891fd6906755c57ece@group.calendar.google.com',name:'Staff',color:'#a47ae2'},
{id:'c_2b070807610cf49745f841332cce28fac96df1d2d898e849c259f5ea7045f3e8@group.calendar.google.com',name:'Appointments',color:'#fad165'},
{id:'c_46627930d625451054394567d54d5bd71c703b1451536a7ac0f62d3c16793559@group.calendar.google.com',name:'Clients',color:'#fa573c'},
{id:'c_bb2c0773ad5597013147b9faa929440e47f6b4964a3acb5a82a2a1c6ced8e488@group.calendar.google.com',name:'Minibus',color:'#f691b2'}
];
const srcParams=calIds.map(c=>'src='+encodeURIComponent(c.id)+'&color='+encodeURIComponent(c.color)).join('&');
const embedUrl='https://calendar.google.com/calendar/embed?'+srcParams+'&ctz=Europe/London&showTitle=0&showPrint=0&showCalendars=1&showTz=0&mode=WEEK';
const embedUrlMonth='https://calendar.google.com/calendar/embed?'+srcParams+'&ctz=Europe/London&showTitle=0&showPrint=0&showCalendars=1&showTz=0&mode=MONTH';
const embedUrlAgenda='https://calendar.google.com/calendar/embed?'+srcParams+'&ctz=Europe/London&showTitle=0&showPrint=0&showCalendars=1&showTz=0&mode=AGENDA';

h+=`<div style="padding:0 12px 100px">`;
h+=`<div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;align-items:center">`;
h+=`<div style="font-size:15px;font-weight:700;color:#1F2937;flex:1">📆 Calendar</div>`;
h+=`<button onclick="document.getElementById('cal-frame').src='${embedUrl}'" style="border:1px solid #E5E7EB;background:white;border-radius:8px;padding:6px 10px;font-size:11px;font-weight:600;cursor:pointer;color:#374151">Week</button>`;
h+=`<button onclick="document.getElementById('cal-frame').src='${embedUrlMonth}'" style="border:1px solid #E5E7EB;background:white;border-radius:8px;padding:6px 10px;font-size:11px;font-weight:600;cursor:pointer;color:#374151">Month</button>`;
h+=`<button onclick="document.getElementById('cal-frame').src='${embedUrlAgenda}'" style="border:1px solid #E5E7EB;background:white;border-radius:8px;padding:6px 10px;font-size:11px;font-weight:600;cursor:pointer;color:#374151">Agenda</button>`;
h+=`<a href="https://calendar.google.com" target="_blank" style="border:1px solid #E5E7EB;background:white;border-radius:8px;padding:6px 10px;font-size:11px;font-weight:600;cursor:pointer;color:#6366F1;text-decoration:none">Open in Google ↗</a>`;
h+=`</div>`;

// Legend
h+=`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">`;
calIds.forEach(c=>{
h+=`<div style="display:flex;align-items:center;gap:4px;font-size:11px;color:#374151"><span style="width:10px;height:10px;border-radius:3px;background:${c.color};flex-shrink:0"></span>${c.name}</div>`;
});
h+=`</div>`;

// Embed
h+=`<div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06)">`;
h+=`<iframe id="cal-frame" src="${embedUrl}" style="border:0;width:100%;height:70vh;min-height:500px" frameborder="0" scrolling="no"></iframe>`;
h+=`</div>`;

h+=`<div style="margin-top:8px;font-size:11px;color:#9CA3AF;text-align:center">Read-only view · Edit events in <a href="https://calendar.google.com" target="_blank" style="color:#6366F1">Google Calendar</a></div>`;
h+=`</div>`;
}

// ===== FILES TAB =====
if(view==='filesTab'){
h+=`<div style="padding:0 12px 100px">`;
h+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div style="font-size:15px;font-weight:700;color:#1F2937">📁 Shared Files</div></div>`;
if(!serverMode){
h+=`<div style="text-align:center;padding:32px;color:#9CA3AF"><p>File storage requires server mode</p><p style="font-size:12px">Deploy to the VPS to enable file uploads</p></div>`;
} else {
// Upload area
h+=`<div class="file-upload-area" onclick="uploadFile()">`;
h+=`<div style="font-size:24px;margin-bottom:4px">📤</div>`;
h+=`<div style="font-size:13px;font-weight:600;color:#374151">Click to upload a file</div>`;
h+=`<div style="font-size:11px;color:#9CA3AF">PDF, Word, Excel, Images · Max 20MB</div>`;
h+=`</div>`;
h+=`<div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap">`;
h+=`<select onchange="fileUploadCat=this.value" style="border:1px solid #E5E7EB;border-radius:8px;padding:6px 10px;font-size:11px;color:#374151">`;
FILE_CATS.forEach(c=>{h+=`<option value="${c}" ${fileUploadCat===c?'selected':''}>${c}</option>`});
h+=`</select>`;
h+=`<select onchange="fileUploadDept=this.value" style="border:1px solid #E5E7EB;border-radius:8px;padding:6px 10px;font-size:11px;color:#374151"><option value="shared" ${fileUploadDept==='shared'?'selected':''}>Shared (both)</option><option value="spiral" ${fileUploadDept==='spiral'?'selected':''}>Spiral only</option><option value="foss" ${fileUploadDept==='foss'?'selected':''}>FOSS only</option></select>`;
h+=`</div>`;
// File list grouped by category
const grouped={};filesCache.forEach(f=>{const cat=f.category||'General';if(!grouped[cat])grouped[cat]=[];grouped[cat].push(f)});
const cats=Object.keys(grouped).sort();
if(!cats.length&&filesLoaded)h+=`<div style="text-align:center;padding:24px;color:#9CA3AF"><p>No files uploaded yet</p></div>`;
cats.forEach(cat=>{
h+=`<div class="file-cat-hdr">${esc(cat)} (${grouped[cat].length})</div>`;
grouped[cat].forEach(f=>{
const bg=f.department==='shared'?'#EEF2FF':f.department==='foss'?'#ECFDF5':'#F5F3FF';
h+=`<div class="file-card">`;
h+=`<div class="file-icon" style="background:${bg}">${fileIcon(f.mime_type)}</div>`;
h+=`<div class="file-info"><div class="file-name">${esc(f.original_name)}</div>`;
h+=`<div class="file-meta">${fileSize(f.size)} · ${esc(f.uploaded_by||'')} · ${f.created_at?f.created_at.split('T')[0]:''} · <span style="color:${f.department==='shared'?'#6366F1':f.department==='foss'?'#10B981':'#8B5CF6'}">${f.department}</span></div></div>`;
h+=`<div class="file-actions"><button class="file-btn" style="background:#EEF2FF;color:#6366F1" onclick="downloadFile(${f.id})">⬇️</button><button class="file-btn" style="background:#FEF2F2;color:#DC2626" onclick="deleteFile(${f.id})">🗑</button></div>`;
h+=`</div>`;
});
});
}
h+=`</div>`;
}

// ===== HISTORY =====
if(view==='hist'){
h+=`<div class="hist-section"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div class="dash-title" style="margin:0">History</div><button onclick="takeSnapshot()" style="border:none;background:#1F2937;color:white;border-radius:8px;padding:8px 14px;font-size:12px;font-weight:600;cursor:pointer">📸 Snapshot</button></div>`;
if(!history.length){h+=`<div class="dash-card" style="text-align:center;padding:24px"><p style="font-size:14px;color:#9CA3AF">No snapshots yet</p><p style="font-size:12px;color:#BCBAB5">Take regular snapshots to track progress.</p></div>`}else{
if(history.length>=2){h+=`<div class="dash-card"><div style="font-size:13px;font-weight:600;color:#1F2937;margin-bottom:4px">Trend</div><div class="chart-area" style="margin-left:30px;margin-bottom:20px">`;const pts=history.slice(-12);pts.forEach((s,i)=>{const x=(i/(Math.max(pts.length-1,1)))*100;const y=100-s.overall;h+=`<div class="chart-dot" style="left:${x}%;top:${y}%"></div><div class="chart-label" style="left:${x}%">${new Date(s.date).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</div>`});if(pts.length>1){let path='';pts.forEach((s,i)=>{const x=(i/(pts.length-1))*100;const y=100-s.overall;path+=(i===0?'M':'L')+` ${x} ${y}`});h+=`<svg style="position:absolute;inset:0" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="${path}" fill="none" stroke="#6366F1" stroke-width="0.8" vector-effect="non-scaling-stroke"/></svg>`}h+=`<div class="chart-y" style="bottom:0">0%</div><div class="chart-y" style="top:0">100%</div></div></div>`}
[...history].reverse().forEach((snap,i)=>{h+=`<div class="hist-card"><div class="hist-date">${new Date(snap.date).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'long'})} — ${snap.overall}%</div>`;(snap.depts||[]).forEach(d=>{const rc=d.rag==='red'?'#EF4444':d.rag==='amber'?'#F59E0B':d.rag==='green'?'#22C55E':'#D1D5DB';h+=`<div class="hist-bar"><span class="hist-bar-nm">${esc(d.name)}</span><span style="width:8px;height:8px;border-radius:100px;background:${rc};flex-shrink:0"></span><div class="hist-bar-track"><div class="hist-bar-fill" style="width:${d.pct}%;background:${d.color}"></div></div><span class="hist-bar-pct">${d.pct}%</span></div>`});h+=`</div>`});
h+=`<button onclick="if(confirm('Clear?')){history=[];save();render()}" style="width:100%;border:none;background:none;font-size:11px;color:#BCBAB5;padding:8px;cursor:pointer">Clear history</button>`}h+=`</div>`}

// ===== INCIDENTS TAB =====
if(view==='incidentsTab'){
const sevOrder={high:0,medium:1,low:2};
let filtered=[...incidents].sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
if(incidentFilter==='open')filtered=filtered.filter(i=>i.status==='open');
else if(incidentFilter==='closed')filtered=filtered.filter(i=>i.status==='closed');
else if(incidentFilter==='high')filtered=filtered.filter(i=>i.severity==='high');
h+=`<div style="padding:12px 16px 100px">`;
// Stats strip
const openN=incidents.filter(i=>i.status==='open').length;
const highN=incidents.filter(i=>i.severity==='high').length;
h+=`<div style="display:flex;gap:8px;margin-bottom:12px">`;
h+=`<div style="flex:1;background:white;border-radius:12px;padding:10px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);text-align:center"><div style="font-size:22px;font-weight:800;color:#1F2937">${incidents.length}</div><div style="font-size:10px;color:#6B7280;font-weight:600;text-transform:uppercase">Total</div></div>`;
h+=`<div style="flex:1;background:white;border-radius:12px;padding:10px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);text-align:center"><div style="font-size:22px;font-weight:800;color:#D97706">${openN}</div><div style="font-size:10px;color:#6B7280;font-weight:600;text-transform:uppercase">Open</div></div>`;
h+=`<div style="flex:1;background:white;border-radius:12px;padding:10px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);text-align:center"><div style="font-size:22px;font-weight:800;color:#DC2626">${highN}</div><div style="font-size:10px;color:#6B7280;font-weight:600;text-transform:uppercase">High Sev.</div></div>`;
h+=`</div>`;
// Filter bar
h+=`<div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap">`;
[['all','All'],['open','Open'],['closed','Closed'],['high','🔴 High']].forEach(([val,lbl])=>{
h+=`<button onclick="incidentFilter='${val}';render()" style="border:none;border-radius:100px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;background:${incidentFilter===val?'#1F2937':'#E5E7EB'};color:${incidentFilter===val?'white':'#6B7280'}">${lbl}</button>`;
});
h+=`<button onclick="activeModal='pushIncidents';render()" style="border:none;border-radius:100px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;background:#EEF2FF;color:#6366F1;margin-left:auto">📤 Push to Sheets</button>`;
h+=`</div>`;
// Incident cards
if(!filtered.length){h+=`<div style="text-align:center;padding:40px 16px;color:#9CA3AF"><div style="font-size:32px;margin-bottom:8px">🚨</div><div style="font-size:14px;font-weight:600">No incidents${incidentFilter!=='all'?' matching filter':''}</div></div>`;}
filtered.forEach(inc=>{
const sev=INC_SEV[inc.severity]||INC_SEV.medium;
const typeLabel=INC_TYPES[inc.type]||inc.type;
const suNames=(inc.suNames||[]).join(', ');
h+=`<div onclick="viewingIncident='${inc.id}';render()" style="background:white;border-radius:14px;margin-bottom:8px;box-shadow:0 1px 3px rgba(0,0,0,0.07);overflow:hidden;cursor:pointer;border-left:4px solid ${sev.color}">`;
h+=`<div style="padding:12px 14px">`;
h+=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">`;
h+=`<div style="display:flex;align-items:center;gap:6px">`;
h+=`<span style="font-size:11px;font-weight:700;background:${sev.bg};color:${sev.color};padding:2px 8px;border-radius:100px">${sev.label}</span>`;
h+=`<span style="font-size:11px;font-weight:600;background:#F3F4F6;color:#374151;padding:2px 8px;border-radius:100px">${typeLabel}</span>`;
h+=`</div>`;
h+=`<span style="font-size:10px;color:#9CA3AF;font-weight:600">${inc.date} ${inc.time||''}</span>`;
h+=`</div>`;
if(suNames)h+=`<div style="font-size:12px;font-weight:700;color:#1F2937;margin-bottom:3px">👤 ${esc(suNames)}</div>`;
if(inc.location)h+=`<div style="font-size:11px;color:#6B7280;margin-bottom:3px">📍 ${esc(inc.location)}</div>`;
h+=`<div style="font-size:12px;color:#374151;line-height:1.4">${esc((inc.description||'').slice(0,120))}${(inc.description||'').length>120?'…':''}</div>`;
h+=`<div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">`;
h+=`<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;background:${inc.status==='open'?'#FEF3C7':'#F0FDF4'};color:${inc.status==='open'?'#D97706':'#16A34A'}">${inc.status==='open'?'Open':'Closed'}</span>`;
h+=`<span style="font-size:10px;color:#9CA3AF">by ${esc(inc.createdBy||'?')} · tap to view</span>`;
h+=`</div></div></div>`;
});
h+=`<button onclick="incidentForm=newIncidentObj();render()" style="width:100%;border:2px dashed #D1D5DB;border-radius:14px;padding:14px;font-size:14px;font-weight:700;color:#6B7280;cursor:pointer;background:none;margin-top:4px">🚨 New Incident Report</button>`;
h+=`</div>`;}

// ===== MINIBUS TAB =====
if(view==='minibusTab'){
const mbWk=getWeekKey(minibusWeekOffset);
const mbDates=getWeekDates(minibusWeekOffset);
const DAY_LABELS={mon:'Monday',tue:'Tuesday',wed:'Wednesday',thu:'Thursday',fri:'Friday'};
const ROUTE_OPTS=['East Sussex','West Sussex','Hove','Brighton'];
const MB_SEL_PICKUP=`<option value="">-- Route --</option><option value="personal">🚗 Personal</option>${ROUTE_OPTS.map(r=>`<option value="${r}">${r}</option>`).join('')}`;
const MB_SEL_RETURN=`<option value="">-- Route --</option><option value="personal">🚗 Personal</option><option value="notreturning">✗ Not returning</option>${ROUTE_OPTS.map(r=>`<option value="${r}">${r}</option>`).join('')}`;

// Pre-populate personal-default SUs if day not yet touched
if(minibusView==='day'){
  const dayAlloc=minibusAllocation[mbWk]?.[minibusDay];
  const daySUs=getSUsForDay(minibusDay);
  const needsPop=daySUs.some(su=>su.defaultTransport==='personal'&&!dayAlloc?.[su.id]);
  if(needsPop)prePopulateMbDay(mbWk,minibusDay);
}

h+=`<div style="padding:16px;max-width:800px;margin:0 auto">`;

// Week nav
h+=`<div class="rota-week-nav" style="margin-bottom:12px">
<button class="rota-week-btn" onclick="minibusWeekOffset--;render()">◀ Prev</button>
<div class="rota-week-label">${mbWk}${minibusWeekOffset===0?' <span style="background:#22C55E;color:white;font-size:9px;padding:2px 6px;border-radius:100px;margin-left:4px;vertical-align:middle">This Week</span>':''}<br><span class="rota-week-dates">${fmtShortDate(mbDates[0])} – ${fmtShortDate(mbDates[4])}</span></div>
<button class="rota-week-btn" onclick="minibusWeekOffset++;render()">Next ▶</button>
</div>`;

// Sub-tabs
h+=`<div class="rota-sub-tabs" style="margin-bottom:12px">
<button class="rota-sub-tab ${minibusView==='day'?'on':''}" onclick="minibusView='day';render()">📋 Day Planner</button>
<button class="rota-sub-tab ${minibusView==='runsheet'?'on':''}" onclick="minibusView='runsheet';render()">📄 Runsheet</button>
</div>`;

if(minibusView==='day'){
  // Day selector
  h+=`<div style="display:flex;gap:6px;margin-bottom:16px;flex-wrap:wrap">`;
  ['mon','tue','wed','thu','fri'].forEach((d,i)=>{
    const dt=mbDates[i];
    const label=DAY_LABELS[d];
    const on=minibusDay===d;
    h+=`<button onclick="minibusDay='${d}';render()" style="border:2px solid ${on?'#3A7BD5':'#E5E7EB'};background:${on?'#EFF6FF':'white'};color:${on?'#3A7BD5':'#6B7280'};border-radius:100px;padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer">${label.slice(0,3)} ${fmtShortDate(dt)}</button>`;
  });
  h+=`</div>`;

  const wk=mbWk;const day=minibusDay;
  const dayAlloc=minibusAllocation[wk]?.[day]||{};
  const allSUs=serviceUsers.slice().sort((a,b)=>a.name.localeCompare(b.name));
  const daySUs=getSUsForDay(day);
  const daySUIds=new Set(daySUs.map(s=>s.id));

  // Sort SUs into buckets
  const buckets={};
  ROUTE_OPTS.forEach(r=>{buckets[r]=[]});
  buckets['personal']=[];
  const unallocated=[];

  allSUs.forEach(su=>{
    const alloc=dayAlloc[su.id];
    if(!alloc||(!alloc.pickupRoute&&!alloc.returnRoute)){
      if(daySUIds.has(su.id))unallocated.push(su);
    } else {
      const pr=alloc.pickupRoute;
      if(pr==='personal'||pr==='notreturning'){buckets['personal'].push(su)}
      else if(pr&&ROUTE_OPTS.includes(pr)){buckets[pr].push(su)}
      else if(daySUIds.has(su.id)){unallocated.push(su)}
    }
  });

  // Also show adhoc allocations (SUs not normally on this day but with an alloc)
  Object.keys(dayAlloc).forEach(suId=>{
    const su=serviceUsers.find(s=>s.id===suId);
    if(!su)return;
    if(!daySUIds.has(su.id)){
      // adhoc — put in appropriate bucket
      const pr=dayAlloc[suId].pickupRoute;
      if(pr==='personal'){buckets['personal'].push(su)}
      else if(pr&&ROUTE_OPTS.includes(pr)){buckets[pr].push(su)}
    }
  });

  function regBadge(suId){
    const st=getRegStat(wk,day,suId);
    if(st==='present')return `<span style="background:#F0FDF4;color:#16A34A;font-size:9px;font-weight:700;padding:1px 5px;border-radius:100px">✓</span>`;
    if(st==='absent')return `<span style="background:#FEF2F2;color:#DC2626;font-size:9px;font-weight:700;padding:1px 5px;border-radius:100px">✗</span>`;
    return `<span style="background:#F3F4F6;color:#9CA3AF;font-size:9px;font-weight:700;padding:1px 5px;border-radius:100px">–</span>`;
  }

  function suRow(su,showAdHoc){
    const alloc=dayAlloc[su.id]||{pickupRoute:null,returnRoute:null,notes:''};
    const pr=alloc.pickupRoute||'';
    const rr=alloc.returnRoute||'';
    const nt=alloc.notes||'';
    return `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #F3F4F6;flex-wrap:wrap">
      <div style="display:flex;align-items:center;gap:6px;min-width:120px;flex:1">
        ${regBadge(su.id)}
        <span style="font-size:13px;font-weight:600;color:#1F2937">${esc(su.name)}</span>
        ${showAdHoc?`<span style="font-size:9px;background:#FEF3C7;color:#D97706;border-radius:100px;padding:1px 6px;font-weight:700">ad-hoc</span>`:''}
      </div>
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
        <select style="border:1px solid #E5E7EB;border-radius:8px;padding:5px 8px;font-size:11px;outline:none;background:white" onchange="setMbAlloc('${wk}','${day}','${su.id}','pickupRoute',this.value||null)">
          ${MB_SEL_PICKUP.replace(`value="${pr}"`,`value="${pr}" selected`)}
        </select>
        <span style="font-size:10px;color:#9CA3AF">→</span>
        <select style="border:1px solid #E5E7EB;border-radius:8px;padding:5px 8px;font-size:11px;outline:none;background:white" onchange="setMbAlloc('${wk}','${day}','${su.id}','returnRoute',this.value||null)">
          ${MB_SEL_RETURN.replace(`value="${rr}"`,`value="${rr}" selected`)}
        </select>
        <input type="text" value="${esc(nt)}" placeholder="Notes…" style="border:1px solid #E5E7EB;border-radius:8px;padding:5px 8px;font-size:11px;outline:none;min-width:80px;max-width:120px" oninput="setMbAlloc('${wk}','${day}','${su.id}','notes',this.value)">
        <button onclick="clearMbAlloc('${wk}','${day}','${su.id}')" style="border:none;background:#FEF2F2;color:#DC2626;border-radius:6px;width:26px;height:26px;cursor:pointer;font-size:13px;font-weight:700">×</button>
      </div>
    </div>`;
  }

  // Unallocated section
  if(unallocated.length){
    h+=`<div style="background:white;border-radius:14px;padding:14px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.06)">`;
    h+=`<div style="font-size:12px;font-weight:700;color:#9CA3AF;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px">Unallocated (${unallocated.length})</div>`;
    unallocated.forEach(su=>{h+=suRow(su,false)});
    h+=`</div>`;
  }

  // Route sections
  ROUTE_OPTS.forEach(route=>{
    const sus=buckets[route];
    const dc=getDriverCell(wk,route,day,'AM');
    h+=`<div style="background:white;border-radius:14px;padding:14px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.06)">`;
    h+=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">`;
    h+=`<div style="font-size:13px;font-weight:700;color:#1F2937">🚐 ${esc(route)}</div>`;
    if(dc.driver||dc.minibus)h+=`<div style="font-size:11px;color:#6B7280">${esc(dc.driver)}${dc.minibus?' · '+esc(dc.minibus):''}</div>`;
    h+=`</div>`;
    if(sus.length){sus.forEach(su=>{h+=suRow(su,!daySUIds.has(su.id))})}
    else{h+=`<div style="font-size:12px;color:#D1D5DB;padding:6px 0">No passengers allocated</div>`}
    // Add SU dropdown
    const alreadyOnRoute=new Set(sus.map(s=>s.id));
    const addOpts=allSUs.filter(su=>!alreadyOnRoute.has(su.id));
    h+=`<div style="margin-top:8px;display:flex;gap:6px;align-items:center">`;
    h+=`<select id="mb-add-${route.replace(/ /g,'-')}" style="flex:1;border:1px solid #E5E7EB;border-radius:8px;padding:7px 10px;font-size:12px;outline:none;background:white"><option value="">+ Add passenger…</option>${addOpts.map(su=>`<option value="${su.id}">${esc(su.name)}${!daySUIds.has(su.id)?' (ad-hoc)':''}</option>`).join('')}</select>`;
    h+=`<button onclick="(function(){const sel=document.getElementById('mb-add-${route.replace(/ /g,'-')}');const suId=sel&&sel.value;if(!suId)return;setMbAlloc('${wk}','${day}',suId,'pickupRoute','${route}');sel.value=''})()" style="border:none;background:#6366F1;color:white;border-radius:8px;padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer">Add</button>`;
    h+=`</div>`;
    h+=`</div>`;
  });

  // Personal transport group
  const personalSUs=buckets['personal'];
  if(personalSUs.length){
    h+=`<div style="background:white;border-radius:14px;padding:14px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.06)">`;
    h+=`<div style="font-size:13px;font-weight:700;color:#1F2937;margin-bottom:8px">🚗 Personal Transport</div>`;
    h+=`<div style="display:flex;flex-wrap:wrap;gap:6px">`;
    personalSUs.forEach(su=>{
      h+=`<div style="display:inline-flex;align-items:center;gap:4px;background:#FFFBEB;border:1px solid #FDE68A;border-radius:100px;padding:5px 12px;font-size:12px;font-weight:600;color:#92400E">${regBadge(su.id)} ${esc(su.name)} <button onclick="clearMbAlloc('${wk}','${day}','${su.id}')" style="border:none;background:none;color:#92400E;cursor:pointer;font-size:11px;opacity:0.7;padding:0 2px">×</button></div>`;
    });
    h+=`</div></div>`;
  }

  h+=`</div>`; // end day planner

} else {
  // ===== RUNSHEET VIEW =====
  h+=`<div style="margin-bottom:16px;display:flex;gap:10px;flex-wrap:wrap;align-items:center">`;
  h+=`<div style="display:flex;align-items:center;gap:6px"><label style="font-size:12px;font-weight:700;color:#6B7280">Route</label><select style="border:1px solid #E5E7EB;border-radius:8px;padding:7px 10px;font-size:13px;outline:none;background:white" onchange="minibusRoute=this.value;render()">${ROUTE_OPTS.map(r=>`<option value="${r}" ${minibusRoute===r?'selected':''}>${r}</option>`).join('')}</select></div>`;
  h+=`<div style="display:flex;align-items:center;gap:6px"><label style="font-size:12px;font-weight:700;color:#6B7280">Day</label><select style="border:1px solid #E5E7EB;border-radius:8px;padding:7px 10px;font-size:13px;outline:none;background:white" onchange="minibusDay=this.value;render()">${['mon','tue','wed','thu','fri'].map(d=>`<option value="${d}" ${minibusDay===d?'selected':''}>${{mon:'Monday',tue:'Tuesday',wed:'Wednesday',thu:'Thursday',fri:'Friday'}[d]}</option>`).join('')}</select></div>`;
  h+=`<button onclick="window.print()" style="border:1px solid #E5E7EB;background:white;border-radius:8px;padding:7px 14px;font-size:12px;font-weight:600;cursor:pointer;margin-left:auto">🖨 Print</button>`;
  h+=`</div>`;

  if(!minibusRoute)minibusRoute=ROUTE_OPTS[0];
  const wk=mbWk;const day=minibusDay;
  const route=minibusRoute;
  const dc=getDriverCell(wk,route,day,'AM');
  const dayAlloc=minibusAllocation[wk]?.[day]||{};

  // Gather SUs on this route (pickup or return)
  const routeSUs=serviceUsers.filter(su=>{
    const a=dayAlloc[su.id];
    return a&&(a.pickupRoute===route||a.returnRoute===route);
  }).sort((a,b)=>a.name.localeCompare(b.name));

  let pickupCount=0,returnCount=0,personalCount=0,notRetCount=0;
  serviceUsers.forEach(su=>{
    const a=dayAlloc[su.id];if(!a)return;
    if(a.pickupRoute===route)pickupCount++;
    if(a.returnRoute===route)returnCount++;
    if(a.pickupRoute==='personal')personalCount++;
    if(a.returnRoute==='notreturning')notRetCount++;
  });

  h+=`<div id="mb-runsheet" style="background:white;border-radius:14px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06)">`;
  h+=`<div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:16px;flex-wrap:wrap;gap:8px">`;
  h+=`<div><div style="font-size:18px;font-weight:700;color:#1F2937">🚐 ${esc(route)} — ${{mon:'Monday',tue:'Tuesday',wed:'Wednesday',thu:'Thursday',fri:'Friday'}[day]}</div>`;
  h+=`<div style="font-size:12px;color:#6B7280;margin-top:2px">${mbWk} · ${fmtShortDate(mbDates[['mon','tue','wed','thu','fri'].indexOf(day)])}</div></div>`;
  h+=`<div style="font-size:12px;color:#374151">${dc.driver?`<strong>Driver:</strong> ${esc(dc.driver)}<br>`:''}${dc.minibus?`<strong>Vehicle:</strong> ${esc(dc.minibus)}`:''}${!dc.driver&&!dc.minibus?'<span style="color:#D1D5DB">No driver assigned</span>':''}</div>`;
  h+=`</div>`;

  if(routeSUs.length===0){
    h+=`<div style="text-align:center;padding:32px;color:#9CA3AF;font-size:13px">No passengers allocated to ${esc(route)} on this day</div>`;
  } else {
    h+=`<div style="overflow-x:auto">`;
    h+=`<table style="width:100%;border-collapse:collapse;font-size:12px">`;
    h+=`<thead><tr style="border-bottom:2px solid #E5E7EB;text-align:left">
      <th style="padding:8px 6px;color:#6B7280;font-weight:700;white-space:nowrap">Name</th>
      <th style="padding:8px 6px;color:#6B7280;font-weight:700;text-align:center">Here</th>
      <th style="padding:8px 6px;color:#6B7280;font-weight:700;text-align:center">Pickup</th>
      <th style="padding:8px 6px;color:#6B7280;font-weight:700">Address</th>
      <th style="padding:8px 6px;color:#6B7280;font-weight:700">Carer / Phone</th>
      <th style="padding:8px 6px;color:#6B7280;font-weight:700;text-align:center">Return</th>
      <th style="padding:8px 6px;color:#6B7280;font-weight:700">Notes</th>
    </tr></thead><tbody>`;

    routeSUs.forEach(su=>{
      const a=dayAlloc[su.id]||{};
      const regSt=getRegStat(wk,day,su.id);
      const hereTxt=regSt==='present'?'<span style="color:#16A34A;font-weight:700">✓</span>':regSt==='absent'?'<span style="color:#DC2626;font-weight:700">✗</span>':'<span style="color:#D1D5DB">–</span>';
      const pickupHere=a.pickupRoute===route;
      const returnHere=a.returnRoute===route;
      const addr=[su.addr,su.town,su.pc].filter(Boolean).join(', ');
      const carer=[su.cn,su.cm].filter(Boolean).join(' · ')||'–';
      h+=`<tr style="border-bottom:1px solid #F3F4F6">
        <td style="padding:8px 6px;font-weight:600;color:#1F2937;white-space:nowrap">${esc(su.name)}</td>
        <td style="padding:8px 6px;text-align:center">${hereTxt}</td>
        <td style="padding:8px 6px;text-align:center">${pickupHere?'<span style="color:#16A34A;font-weight:700">✓</span>':'<span style="color:#D1D5DB">–</span>'}</td>
        <td style="padding:8px 6px;color:#374151;max-width:160px">${esc(addr)||'–'}</td>
        <td style="padding:8px 6px;color:#374151;max-width:120px;white-space:pre-wrap">${esc(carer)}</td>
        <td style="padding:8px 6px;text-align:center">${a.returnRoute==='notreturning'?'<span style="color:#DC2626;font-size:10px;font-weight:600">Not returning</span>':returnHere?'<span style="color:#16A34A;font-weight:700">✓</span>':'<span style="color:#D1D5DB">–</span>'}</td>
        <td style="padding:8px 6px;color:#6B7280">${esc(a.notes||'')}</td>
      </tr>`;
    });

    h+=`</tbody></table></div>`;
    h+=`<div style="display:flex;gap:12px;margin-top:12px;font-size:12px;color:#6B7280;flex-wrap:wrap;padding-top:12px;border-top:1px solid #F3F4F6">`;
    h+=`<span>Pickup: <strong>${pickupCount}</strong></span>`;
    h+=`<span>Return: <strong>${returnCount}</strong></span>`;
    h+=`<span>Personal transport: <strong>${personalCount}</strong></span>`;
    h+=`<span>Not returning by bus: <strong>${notRetCount}</strong></span>`;
    h+=`</div>`;
  }
  h+=`</div>`; // runsheet card
  h+=`</div>`; // padding wrapper
}

h+=`</div>`; // outer padding
}

// ===== USERS TAB =====
if(view==='usersTab'&&isManagerOrAbove()){
// Roles a manager can assign; superadmins can assign all
const ROLE_OPTS_ALL=['superadmin','manager','staff','driver','serviceuser','carer','foss'];
const ROLE_OPTS_MGR=['staff','driver','serviceuser','carer','foss'];
const roleOpts=isSuperAdmin()?ROLE_OPTS_ALL:ROLE_OPTS_MGR;
const PROTECTED=['superadmin','admin','manager'];
h+=`<div style="padding:16px;max-width:700px;margin:0 auto">`;
h+=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px"><h2 style="margin:0;font-size:18px;font-weight:700;color:#1F2937">👥 User Management</h2><button onclick="newUserForm={username:'',password:'',role:'staff'};render()" style="background:#6366F1;color:white;border:none;border-radius:10px;padding:8px 16px;font-size:13px;font-weight:700;cursor:pointer">+ New User</button></div>`;
if(usersLoading){h+=`<p style="color:#9CA3AF;text-align:center">Loading...</p>`;}
else{
// Group users by role tier for clarity
const privileged=usersList.filter(u=>PROTECTED.includes(u.role));
const regular=usersList.filter(u=>!PROTECTED.includes(u.role));
function renderUserRow(u){
const isEditing=editingUserId===u.id;
const roleColor=ROLE_COLORS[u.role]||'#6B7280';
const canEdit=isSuperAdmin()||!PROTECTED.includes(u.role);
let row=`<div style="background:white;border-radius:14px;padding:14px 16px;box-shadow:0 1px 4px rgba(0,0,0,0.07)">`;
if(isEditing&&canEdit){
row+=`<div style="display:flex;flex-direction:column;gap:8px">`;
row+=`<div style="display:flex;gap:8px;align-items:center"><label style="font-size:11px;font-weight:700;color:#6B7280;min-width:80px">Username</label><input id="eu-un-${u.id}" value="${esc(u.username)}" style="flex:1;border:1px solid #D1D5DB;border-radius:8px;padding:6px 10px;font-size:13px"></div>`;
row+=`<div style="display:flex;gap:8px;align-items:center"><label style="font-size:11px;font-weight:700;color:#6B7280;min-width:80px">Role</label><select id="eu-role-${u.id}" style="flex:1;border:1px solid #D1D5DB;border-radius:8px;padding:6px 10px;font-size:13px">${roleOpts.map(r=>`<option value="${r}" ${u.role===r?'selected':''}>${ROLE_LABELS[r]||r}</option>`).join('')}</select></div>`;
row+=`<div style="display:flex;gap:8px;align-items:center"><label style="font-size:11px;font-weight:700;color:#6B7280;min-width:80px">New PW</label><input type="password" placeholder="Leave blank to keep" oninput="if(!editingUserPw)editingUserPw={};editingUserPw.pw=this.value" style="flex:1;border:1px solid #D1D5DB;border-radius:8px;padding:6px 10px;font-size:13px"></div>`;
row+=`<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:4px"><button onclick="editingUserId=null;editingUserPw=null;render()" style="border:1px solid #D1D5DB;background:white;border-radius:8px;padding:6px 14px;font-size:12px;cursor:pointer">Cancel</button><button onclick="saveEditUser()" style="background:#6366F1;color:white;border:none;border-radius:8px;padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer">Save</button></div>`;
row+=`</div>`;
}else{
const isSelf=u.id===currentUser?.id;
row+=`<div style="display:flex;align-items:center;gap:10px">`;
row+=`<div style="flex:1"><div style="font-size:14px;font-weight:700;color:#1F2937">${esc(u.username)}</div><div style="font-size:11px;color:#9CA3AF;margin-top:2px">Added ${u.created_at?u.created_at.split('T')[0]:''}</div></div>`;
row+=`<span style="background:${roleColor}22;color:${roleColor};border-radius:100px;padding:3px 10px;font-size:11px;font-weight:700">${ROLE_LABELS[u.role]||u.role}</span>`;
if(canEdit&&!isSelf) row+=`<button onclick="editingUserId=${u.id};editingUserPw=null;render()" style="border:1px solid #D1D5DB;background:white;border-radius:8px;padding:5px 10px;font-size:12px;cursor:pointer">Edit</button>`;
if(canEdit&&!isSelf) row+=`<button onclick="deleteUser(${u.id})" style="background:#FEE2E2;color:#DC2626;border:none;border-radius:8px;padding:5px 10px;font-size:12px;cursor:pointer">Del</button>`;
if(isSelf) row+=`<span style="font-size:11px;color:#9CA3AF;padding:5px 0">(you)</span>`;
if(!canEdit) row+=`<span style="font-size:11px;color:#D1D5DB;padding:5px 0">—</span>`;
row+=`</div>`;
}
row+=`</div>`;
return row;
}
if(isSuperAdmin()&&privileged.length){
h+=`<div style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:.05em;margin:0 2px 6px">Privileged Accounts</div>`;
h+=`<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">`;
privileged.forEach(u=>{h+=renderUserRow(u)});
h+=`</div>`;
}
if(regular.length){
h+=`<div style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:.05em;margin:0 2px 6px">Staff &amp; Users</div>`;
h+=`<div style="display:flex;flex-direction:column;gap:8px">`;
regular.forEach(u=>{h+=renderUserRow(u)});
h+=`</div>`;
}
if(!usersList.length)h+=`<p style="color:#9CA3AF;text-align:center;padding:40px">No users found. <button onclick="loadUsers()" style="background:none;border:none;color:#6366F1;cursor:pointer;font-size:14px">Refresh</button></p>`;
}
// New user form
if(newUserForm){
const nf=newUserForm;
h+=`<div style="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:200;display:flex;align-items:flex-end" onclick="if(event.target===this){newUserForm=null;render()}"><div style="background:white;border-radius:20px 20px 0 0;padding:24px;width:100%;max-width:500px;margin:0 auto">`;
h+=`<h3 style="margin:0 0 16px;font-size:17px;font-weight:700">Create New User</h3>`;
h+=`<div style="display:flex;flex-direction:column;gap:12px">`;
h+=`<div><label style="font-size:11px;font-weight:700;color:#6B7280;display:block;margin-bottom:4px">Username</label><input value="${esc(nf.username)}" oninput="newUserForm.username=this.value" style="width:100%;box-sizing:border-box;border:1px solid #D1D5DB;border-radius:8px;padding:8px 12px;font-size:14px"></div>`;
h+=`<div><label style="font-size:11px;font-weight:700;color:#6B7280;display:block;margin-bottom:4px">Password</label><input type="password" oninput="newUserForm.password=this.value" style="width:100%;box-sizing:border-box;border:1px solid #D1D5DB;border-radius:8px;padding:8px 12px;font-size:14px"></div>`;
h+=`<div><label style="font-size:11px;font-weight:700;color:#6B7280;display:block;margin-bottom:4px">Role</label><select onchange="newUserForm.role=this.value" style="width:100%;box-sizing:border-box;border:1px solid #D1D5DB;border-radius:8px;padding:8px 12px;font-size:14px">${roleOpts.map(r=>`<option value="${r}" ${nf.role===r?'selected':''}>${ROLE_LABELS[r]||r}</option>`).join('')}</select></div>`;
h+=`<div style="display:flex;gap:8px;margin-top:4px"><button onclick="newUserForm=null;render()" style="flex:1;border:1px solid #D1D5DB;background:white;border-radius:10px;padding:10px;font-size:14px;cursor:pointer">Cancel</button><button onclick="createUser()" style="flex:1;background:#6366F1;color:white;border:none;border-radius:10px;padding:10px;font-size:14px;font-weight:700;cursor:pointer">Create</button></div>`;
h+=`</div></div></div>`;
}
h+=`</div>`;
}

} // end if(appMode==='spiral')

// ======== FOSS MODE VIEWS ========
if(appMode==='foss'){

// ===== FOSS TASKS =====
if(fossView==='fossTasks'){
const fDepts=fD();
const fStaffList=fStaff();
const fossIsF=fossFilterPri!=='all'||fossFilterStaff!=='all';
function fossFilterTasks(tasks){return tasks.filter(t=>{const pM=fossFilterPri==='all'||t.priority===fossFilterPri;const sM=fossFilterStaff==='all'||(fossFilterStaff==='unassigned'?!t.assignee:t.assignee===fossFilterStaff);return pM&&sM})}

h+=`<div class="fbar"><button class="fb ${fossFilterPri==='all'?'on':'off'}" style="${fossFilterPri==='all'?'background:#10B981':''}" onclick="fossFilterPri='all';render()">All</button><button class="fb ${fossFilterPri==='high'?'on':'off'}" style="${fossFilterPri==='high'?'background:#DC2626':''}" onclick="fossFilterPri='high';render()">🔴 High</button><button class="fb ${fossFilterPri==='med'?'on':'off'}" style="${fossFilterPri==='med'?'background:#D97706':''}" onclick="fossFilterPri='med';render()">🟡 Med</button><button class="fb ${fossFilterPri==='low'?'on':'off'}" style="${fossFilterPri==='low'?'background:#2563EB':''}" onclick="fossFilterPri='low';render()">🔵 Low</button><span style="width:1px;background:#E5E7EB;flex-shrink:0;margin:3px 1px"></span><button class="fb ${fossFilterStaff==='all'?'on':'off'}" style="${fossFilterStaff==='all'?'background:#10B981':''}" onclick="fossFilterStaff='all';render()">Everyone</button>`;
fStaffList.forEach(s=>{h+=`<button class="fb ${fossFilterStaff===s?'on':'off'}" onclick="fossFilterStaff='${esc(s)}';render()">${esc(s)}</button>`});
h+=`<button class="fb ${fossFilterStaff==='unassigned'?'on':'off'}" style="${fossFilterStaff==='unassigned'?'background:#6B7280':''}" onclick="fossFilterStaff='unassigned';render()">Unassigned</button></div><div class="cards">`;

fDepts.forEach((dept,idx)=>{
const vis=fossFilterTasks(dept.tasks);const tot=dept.tasks.length;const dn=dept.tasks.filter(t=>t.done).length;const p=tot?Math.round(dn/tot*100):0;
const isO=fossOpenD[dept.id];const isA=fossAddingTo===dept.id;const rc=dept.rag||'none';
if(fossIsF&&!vis.length)return;
h+=`<div class="card"><div class="card-hdr"><div class="card-tog" onclick="fossOpenD['${dept.id}']=!fossOpenD['${dept.id}'];render()"><div class="card-top"><div class="card-nm"><span>${dept.emoji}</span><span>${esc(dept.name)}</span></div><div class="card-st"><div class="rag-row"><button class="rag-dot ${rc==='red'?'rag-r':'rag-none'}" style="${rc==='red'?'box-shadow:0 0 0 2px white,0 0 0 3px #EF4444':''}" onclick="event.stopPropagation();fossSetRag('${dept.id}','red')"></button><button class="rag-dot ${rc==='amber'?'rag-a':'rag-none'}" style="${rc==='amber'?'box-shadow:0 0 0 2px white,0 0 0 3px #F59E0B':''}" onclick="event.stopPropagation();fossSetRag('${dept.id}','amber')"></button><button class="rag-dot ${rc==='green'?'rag-g':'rag-none'}" style="${rc==='green'?'box-shadow:0 0 0 2px white,0 0 0 3px #22C55E':''}" onclick="event.stopPropagation();fossSetRag('${dept.id}','green')"></button></div><span class="card-cnt" style="color:${dept.color};background:${dept.color}14">${dn}/${tot}</span><svg class="chv ${isO?'open':''}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div></div><div style="width:100%;padding-top:2px"><div class="card-bar"><div class="card-fill" style="width:${p}%;background:${dept.color}"></div></div></div></div></div>`;
h+=`<div class="tpanel ${isO?'open':''}"><div class="tinner">`;
const sorted=[...vis].sort((a,b)=>{if(a.done!==b.done)return a.done?1:-1;return 0});
sorted.forEach(task=>{
const isEd=fossEditingT===task.id;const pb=task.priority==='high'?'b-hi':task.priority==='low'?'b-lo':'b-md';const nc=(task.notes||[]).length;
h+=`<div class="trow"><div class="trow-main"><div style="padding-top:1px"><button class="cb ${task.done?'':'off'}" style="${task.done?'background:'+dept.color:''}" onclick="fossToggleTask('${dept.id}','${task.id}')">${task.done?'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>':''}</button></div><div style="flex:1;min-width:0"><span class="ttxt ${task.done?'done':'todo'}">${esc(task.text)}</span><div class="tmeta"><span class="badge ${pb}">${task.priority==='high'?'High':task.priority==='low'?'Low':'Med'}</span>${task.assignee?`<span class="badge b-staff">👤 ${esc(task.assignee)}</span>`:`<span class="badge b-unass">Unassigned</span>`}</div></div><div class="tbtns"><button class="tbtn" onclick="fossNotesOpen['${task.id}']=!fossNotesOpen['${task.id}'];render()">💬${nc?' '+nc:''}</button><button class="tbtn" onclick="fossEditingT=fossEditingT==='${task.id}'?null:'${task.id}';render()">✏️</button><button class="tbtn" onclick="fossDeleteTask('${dept.id}','${task.id}')">×</button></div></div>`;
if(isEd){h+=`<div class="tedit"><select onchange="fossUpdateTF('${dept.id}','${task.id}','priority',this.value)"><option value="high" ${task.priority==='high'?'selected':''}>🔴 High</option><option value="med" ${task.priority==='med'?'selected':''}>🟡 Med</option><option value="low" ${task.priority==='low'?'selected':''}>🔵 Low</option></select><select onchange="fossUpdateTF('${dept.id}','${task.id}','assignee',this.value)"><option value="">Unassigned</option>${fStaffList.map(s=>`<option value="${esc(s)}" ${task.assignee===s?'selected':''}>${esc(s)}</option>`).join('')}</select><button class="done-btn" onclick="fossEditingT=null;render()">Done</button></div>`}
if(fossNotesOpen[task.id]){h+=`<div class="note-panel">`;(task.notes||[]).forEach(n=>{h+=`<div class="note-item"><div class="note-text">${esc(n.text)}</div><div class="note-ts">${fmtDateTime(n.ts)}</div></div>`});h+=`<div class="note-form"><input id="fn-${task.id}" placeholder="Add note..." onkeydown="if(event.key==='Enter')fossAddNote('${dept.id}','${task.id}')"><button onclick="fossAddNote('${dept.id}','${task.id}')">+</button></div></div>`}
h+=`</div>`;
});
if(!sorted.length)h+=`<p class="notasks">No tasks yet</p>`;
if(isA){h+=`<div class="atf"><div class="atf-r"><input type="text" id="fatf-t-${dept.id}" placeholder="New task..." onkeydown="if(event.key==='Enter')fossAddTask('${dept.id}')"></div><div class="atf-r"><select id="fatf-p-${dept.id}"><option value="high">🔴 High</option><option value="med" selected>🟡 Med</option><option value="low">🔵 Low</option></select><select id="fatf-s-${dept.id}"><option value="">Unassigned</option>${fStaffList.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('')}</select></div><button class="atf-sub" style="background:${dept.color}" onclick="fossAddTask('${dept.id}')">Add Task</button></div>`}
else{h+=`<button class="add-task" style="color:${dept.color}" onclick="fossAddingTo='${dept.id}';render()">+ Add Task</button>`}
h+=`<button class="ms-del" onclick="fossDeleteDept('${dept.id}')" style="margin-top:4px">Delete Department</button>`;
h+=`</div></div></div>`;
});
h+=`<button class="add-dept" onclick="fossAddDept()" style="background:#10B981">+ Add Department</button></div>`;
}

// ===== FOSS STAFF =====
if(fossView==='fossStaff'){
h+=`<div class="staff-page">`;
h+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div style="font-size:15px;font-weight:700;color:#1F2937">FOSS Team (${fSP().length})</div><button onclick="fossAddStaff()" style="border:none;background:#10B981;color:white;border-radius:8px;padding:8px 14px;font-size:12px;font-weight:600;cursor:pointer">+ Add Member</button></div>`;
fSP().forEach(sp=>{
const isEd=fossEditingStaff===sp.id;
const taskCount=fD().reduce((n,d)=>n+d.tasks.filter(t=>t.assignee===sp.name).length,0);
h+=`<div class="staff-profile">`;
h+=`<div class="staff-profile-hdr" onclick="fossEditingStaff=fossEditingStaff==='${sp.id}'?null:'${sp.id}';render()">`;
h+=`<div class="staff-avatar" style="background:${sp.color}">${sp.name.charAt(0)}</div>`;
h+=`<div class="staff-profile-info"><div class="staff-profile-name">${esc(sp.name)}</div><div class="staff-profile-role">${esc(sp.role)}</div>`;
h+=`<div class="staff-profile-meta">`;
if(sp.phone)h+=`<span>📞 ${esc(sp.phone)}</span>`;
if(sp.email)h+=`<span>✉️ ${esc(sp.email)}</span>`;
h+=`<span>📋 ${taskCount} tasks</span></div></div>`;
h+=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.5" style="flex-shrink:0;transition:transform 0.25s;${isEd?'transform:rotate(180deg)':''}"><polyline points="6 9 12 15 18 9"/></svg></div>`;
if(isEd){
h+=`<div class="staff-profile-body">`;
h+=`<div class="staff-field-row"><div class="staff-field"><label>Name</label><input value="${esc(sp.name)}" onchange="fossUpdateStaff('${sp.id}','name',this.value)"></div><div class="staff-field"><label>Role</label><input value="${esc(sp.role)}" onchange="fossUpdateStaff('${sp.id}','role',this.value)" placeholder="e.g. Volunteer"></div></div>`;
h+=`<div class="staff-field-row"><div class="staff-field"><label>Phone</label><input value="${esc(sp.phone)}" onchange="fossUpdateStaff('${sp.id}','phone',this.value)"></div><div class="staff-field"><label>Email</label><input value="${esc(sp.email)}" onchange="fossUpdateStaff('${sp.id}','email',this.value)" type="email"></div></div>`;
h+=`<div class="staff-field"><label>Notes</label><textarea onchange="fossUpdateStaff('${sp.id}','notes',this.value)" placeholder="Skills, availability, etc.">${esc(sp.notes)}</textarea></div>`;
h+=`<button onclick="fossRemoveStaff('${sp.id}')" style="align-self:flex-start;border:1px solid #FEE2E2;background:#FEF2F2;color:#DC2626;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:600;cursor:pointer">Remove</button>`;
h+=`</div>`}
h+=`</div>`;
});
h+=`</div>`;
}

// ===== FOSS CONTACTS =====
if(fossView==='fossContacts'){
h+=`<div style="padding:0 12px 100px">`;
h+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div style="font-size:15px;font-weight:700;color:#1F2937">📇 Contacts (${fC().length})</div><button onclick="fossAddContact()" style="border:none;background:#10B981;color:white;border-radius:8px;padding:8px 14px;font-size:12px;font-weight:600;cursor:pointer">+ Add Contact</button></div>`;
fC().forEach(c=>{
const isEd=fossEditingContact===c.id;
h+=`<div class="staff-profile">`;
h+=`<div class="staff-profile-hdr" onclick="fossEditingContact=fossEditingContact==='${c.id}'?null:'${c.id}';render()">`;
h+=`<div class="staff-avatar" style="background:#6366F1">${(c.name||'?').charAt(0).toUpperCase()}</div>`;
h+=`<div class="staff-profile-info"><div class="staff-profile-name">${esc(c.name||'New Contact')}</div><div class="staff-profile-role">${esc(c.role||'')}</div>`;
h+=`<div class="staff-profile-meta">`;
if(c.org)h+=`<span>🏢 ${esc(c.org)}</span>`;
if(c.phone)h+=`<span>📞 ${esc(c.phone)}</span>`;
if(c.email)h+=`<span>✉️ ${esc(c.email)}</span>`;
h+=`</div></div>`;
h+=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.5" style="flex-shrink:0;transition:transform 0.25s;${isEd?'transform:rotate(180deg)':''}"><polyline points="6 9 12 15 18 9"/></svg></div>`;
if(isEd){
h+=`<div class="staff-profile-body">`;
h+=`<div class="staff-field-row"><div class="staff-field"><label>Name</label><input value="${esc(c.name)}" onchange="fossUpdateContact('${c.id}','name',this.value)"></div><div class="staff-field"><label>Role</label><input value="${esc(c.role)}" onchange="fossUpdateContact('${c.id}','role',this.value)" placeholder="e.g. Donor, Trustee"></div></div>`;
h+=`<div class="staff-field-row"><div class="staff-field"><label>Organisation</label><input value="${esc(c.org)}" onchange="fossUpdateContact('${c.id}','org',this.value)"></div><div class="staff-field"><label>Phone</label><input value="${esc(c.phone)}" onchange="fossUpdateContact('${c.id}','phone',this.value)"></div></div>`;
h+=`<div class="staff-field"><label>Email</label><input value="${esc(c.email)}" onchange="fossUpdateContact('${c.id}','email',this.value)" type="email"></div>`;
h+=`<div class="staff-field"><label>Notes</label><textarea onchange="fossUpdateContact('${c.id}','notes',this.value)" placeholder="Notes...">${esc(c.notes)}</textarea></div>`;
h+=`<button onclick="fossDeleteContact('${c.id}')" style="align-self:flex-start;border:1px solid #FEE2E2;background:#FEF2F2;color:#DC2626;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:600;cursor:pointer">Remove</button>`;
h+=`</div>`}
h+=`</div>`;
});
if(!fC().length)h+=`<div style="text-align:center;padding:32px;color:#9CA3AF"><p style="font-size:14px">No contacts yet</p><p style="font-size:12px">Add donors, volunteers, trustees and other contacts</p></div>`;
h+=`</div>`;
}

// ===== FOSS SU MIRROR (read-only) =====
if(fossView==='fossSUs'){
h+=`<div style="padding:0 12px 100px">`;
h+=`<div style="font-size:15px;font-weight:700;color:#1F2937;margin-bottom:6px">👤 Service Users <span style="font-size:11px;font-weight:500;color:#6B7280">(read-only)</span></div>`;
h+=`<input class="su-search" placeholder="🔍 Search name, postcode, carer..." value="${esc(suPageSearch)}" oninput="suPageSearch=this.value;render()">`;
let fSUs=serviceUsers.filter(su=>{if(!suPageSearch)return true;const q=suPageSearch.toLowerCase();return su.name.toLowerCase().includes(q)||(su.pc&&su.pc.toLowerCase().includes(q))||(su.co&&su.co.toLowerCase().includes(q))});
fSUs.sort((a,b)=>a.name.localeCompare(b.name));
h+=`<div class="su-page-count">${fSUs.length} of ${serviceUsers.length} service users</div>`;
h+=`<div class="su-card-grid">`;
fSUs.forEach(su=>{
h+=`<div class="su-card" onclick="showSUDetail('${su.id}')">`;
h+=`<div><div class="su-card-name">${esc(su.name)}</div>`;
if(su.pn)h+=`<div class="su-card-pref">Prefers: "${esc(su.pn)}"</div>`;
h+=`</div>`;
if(su.flags&&su.flags.length)h+=`<div class="su-card-flags">${suFlagBadges(su.flags)}</div>`;
h+=`<div class="su-card-meta">`;
if(su.pc)h+=`<span>📍 ${esc(su.pc)}</span>`;
if(su.co)h+=`<span>🏢 ${esc(su.co.length>35?su.co.slice(0,35)+'…':su.co)}</span>`;
h+=`</div></div>`;
});
h+=`</div></div>`;
}

// ===== FOSS COMPLETED LOG =====
if(fossView==='fossLog'){
const log=[...fossData.completedLog].reverse();
h+=`<div style="padding:0 12px 100px">`;
h+=`<div style="font-size:15px;font-weight:700;color:#1F2937;margin-bottom:12px">✅ Completed Tasks (${log.length})</div>`;
if(!log.length)h+=`<div style="text-align:center;padding:32px;color:#9CA3AF"><p>No completed tasks yet</p><p style="font-size:12px">Tasks marked as done will appear here</p></div>`;
else{
log.forEach(l=>{
h+=`<div class="dash-card" style="margin-bottom:6px"><div style="display:flex;justify-content:space-between;align-items:start"><div style="flex:1"><div style="font-size:13px;font-weight:600;color:#1F2937">${esc(l.text)}</div><div style="font-size:11px;color:#6B7280;margin-top:2px">${esc(l.dept)} · ${esc(l.assignee)}</div></div><div style="font-size:10px;color:#9CA3AF;white-space:nowrap">${fmtDateTime(l.completedAt)}</div></div></div>`;
});
if(log.length>10)h+=`<button onclick="if(confirm('Clear completed log?')){fossData.completedLog=[];save();render()}" style="width:100%;border:none;background:none;font-size:11px;color:#BCBAB5;padding:8px;cursor:pointer">Clear log</button>`;
}
h+=`</div>`;
}

// ===== FOSS FILES =====
if(fossView==='fossFiles'){
h+=`<div style="padding:0 12px 100px">`;
h+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div style="font-size:15px;font-weight:700;color:#1F2937">📁 Shared Files</div></div>`;
if(!serverMode){
h+=`<div style="text-align:center;padding:32px;color:#9CA3AF"><p>File storage requires server mode</p></div>`;
} else {
h+=`<div class="file-upload-area" onclick="uploadFile()">`;
h+=`<div style="font-size:24px;margin-bottom:4px">📤</div>`;
h+=`<div style="font-size:13px;font-weight:600;color:#374151">Click to upload a file</div>`;
h+=`<div style="font-size:11px;color:#9CA3AF">PDF, Word, Excel, Images · Max 20MB</div>`;
h+=`</div>`;
h+=`<div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap">`;
h+=`<select onchange="fileUploadCat=this.value" style="border:1px solid #E5E7EB;border-radius:8px;padding:6px 10px;font-size:11px;color:#374151">`;
FILE_CATS.forEach(c=>{h+=`<option value="${c}" ${fileUploadCat===c?'selected':''}>${c}</option>`});
h+=`</select>`;
h+=`<select onchange="fileUploadDept=this.value" style="border:1px solid #E5E7EB;border-radius:8px;padding:6px 10px;font-size:11px;color:#374151"><option value="shared" ${fileUploadDept==='shared'?'selected':''}>Shared (both)</option><option value="foss" ${fileUploadDept==='foss'?'selected':''}>FOSS only</option><option value="spiral" ${fileUploadDept==='spiral'?'selected':''}>Spiral only</option></select>`;
h+=`</div>`;
const grouped={};filesCache.forEach(f=>{const cat=f.category||'General';if(!grouped[cat])grouped[cat]=[];grouped[cat].push(f)});
const cats=Object.keys(grouped).sort();
if(!cats.length&&filesLoaded)h+=`<div style="text-align:center;padding:24px;color:#9CA3AF"><p>No files uploaded yet</p></div>`;
cats.forEach(cat=>{
h+=`<div class="file-cat-hdr">${esc(cat)} (${grouped[cat].length})</div>`;
grouped[cat].forEach(f=>{
const bg=f.department==='shared'?'#EEF2FF':f.department==='foss'?'#ECFDF5':'#F5F3FF';
h+=`<div class="file-card">`;
h+=`<div class="file-icon" style="background:${bg}">${fileIcon(f.mime_type)}</div>`;
h+=`<div class="file-info"><div class="file-name">${esc(f.original_name)}</div>`;
h+=`<div class="file-meta">${fileSize(f.size)} · ${esc(f.uploaded_by||'')} · ${f.created_at?f.created_at.split('T')[0]:''}</div></div>`;
h+=`<div class="file-actions"><button class="file-btn" style="background:#ECFDF5;color:#10B981" onclick="downloadFile(${f.id})">⬇️</button><button class="file-btn" style="background:#FEF2F2;color:#DC2626" onclick="deleteFile(${f.id})">🗑</button></div>`;
h+=`</div>`;
});
});
}
h+=`</div>`;
}

// ===== FOSS CALENDAR (shared) =====
if(fossView==='fossCal'){
const calIds=[
{id:'c_a2fc97ac7ec6d397d6296427bafbeb18178afef1b4e372e794c4a272f61549b5@group.calendar.google.com',name:'Spiral Holidays',color:'#9a9cff'},
{id:'c_b57d5b89f1300098ff602f6e485d62341b8e5c6cf55aba1b7afffd9dd74095e2@group.calendar.google.com',name:'Events',color:'#9fe1e7'},
{id:'c_fe55ecf4b564b226c7696e42a2c8fbe8426195721562af891fd6906755c57ece@group.calendar.google.com',name:'Staff',color:'#a47ae2'},
{id:'c_2b070807610cf49745f841332cce28fac96df1d2d898e849c259f5ea7045f3e8@group.calendar.google.com',name:'Appointments',color:'#fad165'},
{id:'c_46627930d625451054394567d54d5bd71c703b1451536a7ac0f62d3c16793559@group.calendar.google.com',name:'Clients',color:'#fa573c'},
{id:'c_bb2c0773ad5597013147b9faa929440e47f6b4964a3acb5a82a2a1c6ced8e488@group.calendar.google.com',name:'Minibus',color:'#f691b2'}
];
const srcParams=calIds.map(c=>'src='+encodeURIComponent(c.id)+'&color='+encodeURIComponent(c.color)).join('&');
const embedUrl='https://calendar.google.com/calendar/embed?'+srcParams+'&ctz=Europe/London&showTitle=0&showPrint=0&showCalendars=1&showTz=0&mode=WEEK';
h+=`<div style="padding:0 12px 100px">`;
h+=`<div style="display:flex;gap:6px;margin-bottom:10px;align-items:center"><div style="font-size:15px;font-weight:700;color:#1F2937;flex:1">📆 Calendar</div><a href="https://calendar.google.com" target="_blank" style="border:1px solid #E5E7EB;background:white;border-radius:8px;padding:6px 10px;font-size:11px;font-weight:600;color:#10B981;text-decoration:none">Open in Google ↗</a></div>`;
h+=`<div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06)"><iframe src="${embedUrl}" style="border:0;width:100%;height:70vh;min-height:500px" frameborder="0" scrolling="no"></iframe></div></div>`;
}

} // end if(appMode==='foss')

// ===== MODALS =====
if(activeModal==='addDept'){h+=`<div class="mov" onclick="activeModal=null;render()"><div class="msh" onclick="event.stopPropagation()"><div class="mha"></div><div class="mti">Add Department</div><div style="display:flex;flex-direction:column;gap:12px"><div><label class="mlbl">Name</label><input class="minp" id="nd-nm" value="${esc(newD.name)}" placeholder="e.g. Training" oninput="newD.name=this.value" onkeydown="if(event.key==='Enter')addDepartment()"></div><div><label class="mlbl">Icon</label><div class="emgrid">${EM.map(e=>`<button class="embtn ${newD.emoji===e?'sel':''}" onclick="newD.emoji='${e}';render()">${e}</button>`).join('')}</div></div><div><label class="mlbl">Colour</label><div class="clgrid">${CL.map(c=>`<button class="clbtn" style="background:${c};${newD.color===c?`box-shadow:0 0 0 3px white,0 0 0 4px ${c}`:''}" onclick="newD.color='${c}';render()"></button>`).join('')}</div></div><button class="mbtn dark" ${!newD.name.trim()?'disabled':''} onclick="addDepartment()">Add Department</button></div></div></div>`}
if(activeModal==='addSU'){h+=`<div class="mov" onclick="activeModal=null;render()"><div class="msh" onclick="event.stopPropagation()"><div class="mha"></div><div class="mti">Add Service User</div><div style="display:flex;flex-direction:column;gap:10px"><div><label class="mlbl">Full Name *</label><input class="minp" id="nsu-name" value="${esc(newSU.name)}" placeholder="e.g. John Smith" oninput="newSU.name=this.value" onkeydown="if(event.key==='Enter')addSU()"></div><div><label class="mlbl">Preferred Name</label><input class="minp" value="${esc(newSU.pn)}" placeholder="e.g. Johnny" oninput="newSU.pn=this.value"></div><div style="display:flex;gap:8px"><div style="flex:1"><label class="mlbl">Date of Birth</label><input class="minp" type="date" value="${esc(newSU.dob)}" oninput="newSU.dob=this.value"></div><div style="flex:1"><label class="mlbl">Postcode</label><input class="minp" value="${esc(newSU.pc)}" placeholder="e.g. BN1 1AA" oninput="newSU.pc=this.value"></div></div><div><label class="mlbl">Phone</label><input class="minp" value="${esc(newSU.ph)}" placeholder="Phone number" oninput="newSU.ph=this.value"></div><div><label class="mlbl">Carer / Next of Kin</label><input class="minp" value="${esc(newSU.cn)}" placeholder="Carer name" oninput="newSU.cn=this.value"></div><div><label class="mlbl">Carer Mobile</label><input class="minp" value="${esc(newSU.cm)}" placeholder="Carer mobile" oninput="newSU.cm=this.value"></div><div><label class="mlbl">Care Organisation</label><input class="minp" value="${esc(newSU.co)}" placeholder="e.g. Southdown Housing" oninput="newSU.co=this.value"></div><button class="mbtn dark" ${!newSU.name.trim()?'disabled':''} onclick="addSU()">Add Service User</button></div></div></div>`}
if(activeModal==='sheets'){h+=`<div class="mov" onclick="activeModal=null;render()"><div class="msh" onclick="event.stopPropagation()"><div class="mha"></div><div class="mti">Export</div><button class="mbtn green" onclick="copyForSheets()">📋 Copy for Sheets</button><button class="mbtn outline" onclick="downloadCSV()">⬇️ Download CSV</button></div></div>`}
if(activeModal==='sync'){const has=!!syncCfg.url;h+=`<div class="mov" onclick="activeModal=null;render()"><div class="msh" onclick="event.stopPropagation()"><div class="mha"></div><div class="mti">🔄 Sheets Sync</div>`;
if(!has){h+=`<p class="mdesc">Connect to a Google Sheet for live sync. One-time setup:</p><div class="setup-steps"><div class="setup-step"><div class="step-num"></div><div class="step-body"><strong>Create a Sheet</strong> at <a href="https://sheets.new" target="_blank" style="color:#3A7BD5">sheets.new</a></div></div><div class="setup-step"><div class="step-num"></div><div class="step-body"><strong>Extensions → Apps Script</strong> — paste this code: <div style="position:relative"><div class="code-block">${esc(APPS_SCRIPT_CODE).slice(0,200)}...</div><button class="copy-btn" onclick="event.stopPropagation();copyAppsScript()">Copy Full Script</button></div></div></div><div class="setup-step"><div class="step-num"></div><div class="step-body"><strong>Deploy → New deployment → Web app</strong><br>Execute as: Me · Access: Anyone → Deploy → Copy URL</div></div></div>`}
h+=`<div style="margin-top:12px"><label class="mlbl">Web App URL</label><input class="minp" id="sync-url" value="${esc(syncCfg.url)}" placeholder="https://script.google.com/macros/s/..." oninput="syncCfg.url=this.value.trim();saveSyncCfg()"></div><button class="mbtn blue" style="margin-top:8px" onclick="testConnection()">Test Connection</button>`;
if(has){h+=`<div style="display:flex;gap:6px;margin-top:8px"><button class="mbtn green" style="flex:1" onclick="pushToSheet()">⬆️ Push</button><button class="mbtn outline" style="flex:1" onclick="pullFromSheet()">⬇️ Pull</button></div><button class="mbtn outline" style="margin-top:6px" onclick="pullSUsFromSheet()">↻ Refresh SU Data from Sheet</button><div style="display:flex;align-items:center;gap:8px;margin-top:10px;padding:10px;background:#F9FAFB;border-radius:10px"><span style="font-size:13px;flex:1;font-weight:500">Auto-sync</span><button onclick="syncCfg.autoSync=!syncCfg.autoSync;saveSyncCfg();render()" style="width:48px;height:28px;border-radius:100px;border:none;cursor:pointer;padding:2px;background:${syncCfg.autoSync?'#22C55E':'#D1D5DB'}"><div style="width:24px;height:24px;border-radius:100px;background:white;box-shadow:0 1px 3px rgba(0,0,0,0.2);transition:transform 0.2s;transform:translateX(${syncCfg.autoSync?'20px':'0'})"></div></button></div><button class="mbtn dashed" style="margin-top:8px" onclick="syncCfg={url:'',autoSync:false,lastSync:null};saveSyncCfg();syncStatus='disconnected';render()">Disconnect</button>`}
h+=`</div></div>`}

if(activeModal==='account'&&currentUser){
  const pf=accountPwForm;
  h+=`<div class="mov" onclick="activeModal=null;accountPwForm=null;render()"><div class="msh" onclick="event.stopPropagation()"><div class="mha"></div>`;
  h+=`<div style="display:flex;align-items:center;gap:12px;margin-bottom:18px"><div style="width:52px;height:52px;border-radius:50%;background:${avatarColor(currentUser)};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:white;flex-shrink:0">${initials(currentUser)}</div><div><div style="font-size:17px;font-weight:700;color:#1F2937">${esc(currentUser.username)}</div><div style="font-size:12px;color:${ROLE_COLORS[currentUser.role]||'#9CA3AF'};font-weight:600;margin-top:2px">${ROLE_LABELS[currentUser.role]||currentUser.role}</div></div></div>`;
  h+=`<button class="mbtn outline" style="margin-top:0" onclick="activeModal='sync';render()">🔄 Sync to Sheets</button>`;
  h+=`<button class="mbtn outline" onclick="activeModal='sheets';render()">📤 Export</button>`;
  h+=`<button class="mbtn outline" onclick="document.getElementById('print-date').textContent=new Date().toLocaleDateString('en-GB',{weekday:'long',year:'numeric',month:'long',day:'numeric'});window.print()">🖨 Print</button>`;
  if(!pf){
    h+=`<button class="mbtn outline" onclick="accountPwForm={current:'',newPw:'',confirm:'',error:'',saving:false};render()">🔑 Change Password</button>`;
  } else {
    h+=`<div style="background:#F9FAFB;border-radius:12px;padding:14px;margin-top:6px;display:flex;flex-direction:column;gap:10px">`;
    h+=`<div style="font-size:13px;font-weight:700;color:#1F2937;margin-bottom:2px">Change Password</div>`;
    h+=`<div><label class="mlbl">Current Password</label><input class="minp" type="password" value="${esc(pf.current)}" placeholder="Current password" oninput="accountPwForm.current=this.value"></div>`;
    h+=`<div><label class="mlbl">New Password</label><input class="minp" type="password" value="${esc(pf.newPw)}" placeholder="New password (min 6 chars)" oninput="accountPwForm.newPw=this.value"></div>`;
    h+=`<div><label class="mlbl">Confirm New Password</label><input class="minp" type="password" value="${esc(pf.confirm)}" placeholder="Confirm new password" oninput="accountPwForm.confirm=this.value"></div>`;
    if(pf.error)h+=`<div style="color:#EF4444;font-size:12px;font-weight:500">${esc(pf.error)}</div>`;
    h+=`<div style="display:flex;gap:8px"><button class="mbtn dark" style="flex:1" ${pf.saving?'disabled':''} onclick="changePassword()">${pf.saving?'Saving…':'Save Password'}</button><button class="mbtn outline" style="flex:1" onclick="accountPwForm=null;render()">Cancel</button></div>`;
    h+=`</div>`;
  }
  h+=`<button class="mbtn" style="background:#EF4444;color:white;margin-top:10px" onclick="doLogout()">🚪 Log Out</button>`;
  h+=`</div></div>`;
}

// Incident form modal
if(incidentForm){
const f=incidentForm;
const inpI=(fld,ph,type)=>`<input style="width:100%;border:1px solid #E5E7EB;border-radius:10px;padding:10px 12px;font-size:13px;outline:none;font-family:inherit" type="${type||'text'}" value="${esc(f[fld]||'')}" placeholder="${ph||''}" oninput="incF('${fld}',this.value)">`;
const taI=(fld,ph)=>`<textarea style="width:100%;border:1px solid #E5E7EB;border-radius:10px;padding:10px 12px;font-size:13px;outline:none;font-family:inherit;resize:vertical;min-height:72px" placeholder="${ph||''}" oninput="incF('${fld}',this.value)">${esc(f[fld]||'')}</textarea>`;
h+=`<div class="mov" onclick="if(event.target===this){incidentForm=null;render()}"><div class="msh" onclick="event.stopPropagation()">
<div class="mha"></div><div class="mti">🚨 New Incident Report</div>
<div style="display:flex;flex-direction:column;gap:12px">
<div style="display:flex;gap:8px">
<div style="flex:1"><label class="mlbl">Date</label>${inpI('date','','date')}</div>
<div style="flex:1"><label class="mlbl">Time</label>${inpI('time','','time')}</div>
</div>
<div><label class="mlbl">Type</label><select class="minp" style="font-size:13px" onchange="incF('type',this.value)">
${Object.entries(INC_TYPES).map(([v,l])=>`<option value="${v}" ${f.type===v?'selected':''}>${l}</option>`).join('')}
</select></div>
<div><label class="mlbl">Severity</label><div style="display:flex;gap:6px">
${Object.entries(INC_SEV).map(([v,s])=>`<button onclick="incF('severity','${v}');render()" style="flex:1;border:2px solid ${f.severity===v?s.color:'#E5E7EB'};background:${f.severity===v?s.bg:'white'};color:${f.severity===v?s.color:'#6B7280'};border-radius:10px;padding:8px;font-size:12px;font-weight:700;cursor:pointer">${s.label}</button>`).join('')}
</div></div>
<div><label class="mlbl">Location</label>${inpI('location','Where did this happen?')}</div>
<div><label class="mlbl">Service Users Involved</label>
<div style="display:flex;flex-wrap:wrap;gap:4px;max-height:120px;overflow-y:auto;border:1px solid #E5E7EB;border-radius:10px;padding:8px">
${serviceUsers.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(su=>{const on=(f.suIds||[]).includes(su.id);return `<button onclick="toggleIncidentSU('${su.id}','${esc(su.name)}')" style="border:1.5px solid ${on?'#6366F1':'#E5E7EB'};background:${on?'#EEF2FF':'white'};color:${on?'#6366F1':'#6B7280'};border-radius:100px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer">${esc(su.name)}</button>`}).join('')}
</div></div>
<div><label class="mlbl">Staff Involved</label>
<div style="display:flex;flex-wrap:wrap;gap:4px;border:1px solid #E5E7EB;border-radius:10px;padding:8px">
${staff.map(s=>{const on=(f.staffInvolved||[]).includes(s);return `<button onclick="toggleIncidentStaff('${esc(s)}')" style="border:1.5px solid ${on?'#6366F1':'#E5E7EB'};background:${on?'#EEF2FF':'white'};color:${on?'#6366F1':'#6B7280'};border-radius:100px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer">${esc(s)}</button>`}).join('')}
</div></div>
<div><label class="mlbl">Witnesses</label>${inpI('witnesses','Names of witnesses')}</div>
<div><label class="mlbl">Description — what happened *</label>${taI('description','Describe the incident in detail...')}</div>
<div><label class="mlbl">Immediate action taken</label>${taI('actionTaken','What was done immediately...')}</div>
<div style="display:flex;gap:8px">
<div style="flex:1"><label class="mlbl">Reported to</label>${inpI('reportedTo','Manager / person informed')}</div>
<div style="flex:1"><label class="mlbl">Reported by</label>${inpI('createdBy','Your name')}</div>
</div>
<div><label class="mlbl">Follow-up required</label>${taI('followUp','Any follow-up actions needed...')}</div>
<div style="display:flex;align-items:center;gap:10px;padding:10px;background:#F9FAFB;border-radius:10px">
<span style="font-size:13px;font-weight:600;flex:1">External report required?</span>
<button onclick="incF('externalReport',!incidentForm.externalReport);render()" style="width:48px;height:28px;border-radius:100px;border:none;cursor:pointer;padding:2px;background:${f.externalReport?'#EF4444':'#D1D5DB'}">
<div style="width:24px;height:24px;border-radius:100px;background:white;box-shadow:0 1px 3px rgba(0,0,0,0.2);transition:transform 0.2s;transform:translateX(${f.externalReport?'20px':'0'})"></div></button>
</div>
${f.externalReport?`<div><label class="mlbl">External body (CQC, safeguarding, police, etc.)</label>${inpI('externalBody','e.g. East Sussex Safeguarding')}</div>`:''}
<button class="mbtn dark" ${!f.description.trim()?'disabled':''} onclick="saveIncident()">Save Incident Report</button>
<button class="mbtn outline" onclick="incidentForm=null;render()">Cancel</button>
</div></div></div>`;
}

// Incident detail overlay
if(viewingIncident){
const inc=incidents.find(i=>i.id===viewingIncident);
if(inc){
const sev=INC_SEV[inc.severity]||INC_SEV.medium;
const typeLabel=INC_TYPES[inc.type]||inc.type;
h+=`<div class="su-detail-overlay" onclick="if(event.target===this)viewingIncident=null;render()"><div class="su-detail-card">
<div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px">
<div>
<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px">
<span style="font-size:12px;font-weight:700;background:${sev.bg};color:${sev.color};padding:3px 10px;border-radius:100px">${sev.label} Severity</span>
<span style="font-size:12px;font-weight:600;background:#F3F4F6;color:#374151;padding:3px 10px;border-radius:100px">${typeLabel}</span>
<span style="font-size:12px;font-weight:700;padding:3px 10px;border-radius:100px;background:${inc.status==='open'?'#FEF3C7':'#F0FDF4'};color:${inc.status==='open'?'#D97706':'#16A34A'}">${inc.status==='open'?'Open':'Closed'}</span>
</div>
<div style="font-size:13px;font-weight:700;color:#1F2937">${inc.date} ${inc.time||''} ${inc.location?'· '+esc(inc.location):''}</div>
</div>
<button onclick="viewingIncident=null;render()" style="border:none;background:#F3F4F6;border-radius:8px;width:30px;height:30px;cursor:pointer;font-size:16px;flex-shrink:0">✕</button>
</div>`;
if((inc.suNames||[]).length)h+=`<div class="su-detail-section"><h4>👤 Service Users Involved</h4><div style="font-size:13px;color:#1F2937">${esc(inc.suNames.join(', '))}</div></div>`;
if((inc.staffInvolved||[]).length)h+=`<div class="su-detail-section"><h4>🧑‍💼 Staff Involved</h4><div style="font-size:13px;color:#1F2937">${esc(inc.staffInvolved.join(', '))}</div></div>`;
if(inc.witnesses)h+=`<div class="su-detail-section"><h4>👁️ Witnesses</h4><div style="font-size:13px;color:#1F2937">${esc(inc.witnesses)}</div></div>`;
h+=`<div class="su-detail-section"><h4>📋 Description</h4><div style="font-size:13px;color:#1F2937;line-height:1.6;white-space:pre-wrap">${esc(inc.description)}</div></div>`;
if(inc.actionTaken)h+=`<div class="su-detail-section"><h4>✅ Immediate Action Taken</h4><div style="font-size:13px;color:#1F2937;line-height:1.6;white-space:pre-wrap">${esc(inc.actionTaken)}</div></div>`;
if(inc.reportedTo||inc.createdBy)h+=`<div class="su-detail-section"><h4>📣 Reporting</h4>${inc.createdBy?`<div class="su-detail-row"><span class="lbl">Reported by</span><span class="val">${esc(inc.createdBy)}</span></div>`:''}${inc.reportedTo?`<div class="su-detail-row"><span class="lbl">Reported to</span><span class="val">${esc(inc.reportedTo)}</span></div>`:''}</div>`;
if(inc.followUp)h+=`<div class="su-detail-section"><h4>🔄 Follow-up</h4><div style="font-size:13px;color:#1F2937;line-height:1.6;white-space:pre-wrap">${esc(inc.followUp)}</div></div>`;
if(inc.externalReport)h+=`<div class="su-detail-section" style="border-left:3px solid #EF4444"><h4>⚠️ External Report Required</h4><div style="font-size:13px;color:#1F2937">${esc(inc.externalBody||'Body not specified')}</div></div>`;
h+=`<div style="display:flex;gap:8px;margin-top:12px">`;
h+=`<button onclick="toggleIncidentStatus('${inc.id}');viewingIncident=null;render()" style="flex:1;border:none;background:${inc.status==='open'?'#F0FDF4':'#FEF3C7'};color:${inc.status==='open'?'#16A34A':'#D97706'};border-radius:10px;padding:10px;font-size:12px;font-weight:700;cursor:pointer">${inc.status==='open'?'✅ Mark Closed':'🔄 Reopen'}</button>`;
h+=`<button onclick="deleteIncident('${inc.id}')" style="border:none;background:#FEF2F2;color:#DC2626;border-radius:10px;padding:10px 14px;font-size:12px;font-weight:700;cursor:pointer">🗑️ Delete</button>`;
h+=`</div></div></div>`;
}}

// Incident push to sheets info modal
if(activeModal==='pushIncidents'){
h+=`<div class="mov" onclick="activeModal=null;render()"><div class="msh" onclick="event.stopPropagation()"><div class="mha"></div><div class="mti">📤 Push Incidents to Sheets</div>`;
if(!syncCfg.url){h+=`<p style="font-size:13px;color:#6B7280;margin-bottom:12px">You need to connect Google Sheets sync first (tap the sync button in the header). Once connected, incidents will push automatically.</p><button class="mbtn outline" onclick="activeModal=null;render()">OK</button>`;}
else{h+=`<p style="font-size:13px;color:#6B7280;margin-bottom:12px">This will write all ${incidents.length} incident reports to an <strong>Incidents</strong> tab in your connected Google Sheet.</p><p style="font-size:12px;color:#9CA3AF;margin-bottom:12px">⚠️ Make sure your Apps Script is updated to the latest version (copy it from the Sync settings).</p><button class="mbtn dark" onclick="pushIncidentsToSheet();activeModal=null;render()">Push ${incidents.length} Incidents</button><button class="mbtn outline" onclick="activeModal=null;render()">Cancel</button>`;}
h+=`</div></div>`;}

// Rota edit overlay
if(rotaEditCell||driverEditCell)h+=`<div onclick="rotaEditCell=null;driverEditCell=null;render()" style="position:fixed;inset:0;z-index:1001;background:rgba(0,0,0,0.3)"></div>`;

// SU Detail Modal
if(viewingSU)h+=renderSUDetailModal();

h+=`<div class="toast ${toastMsg?'visible':''}">${esc(toastMsg)}</div>`;
document.getElementById('app').innerHTML=h;
if(activeModal==='addDept'){const el=document.getElementById('nd-nm');if(el){el.focus();el.setSelectionRange(el.value.length,el.value.length)}}
if(activeModal==='addSU'){const el=document.getElementById('nsu-name');if(el)el.focus()}
if(view==='sus'){const el=document.querySelector('.su-search');if(el&&suPageSearch){el.focus();el.setSelectionRange(el.value.length,el.value.length)}}
}

load();loadSyncCfg();render();
fetch('/api/me',{credentials:'include'}).then(r=>r.ok?r.json():null).then(d=>{if(d&&d.user){currentUser=d.user;if(currentUser.role==='foss'&&appMode==='spiral'){appMode='foss';render();}loadUsers();}}).catch(()=>{});
if(syncCfg.url&&syncCfg.autoSync)setTimeout(()=>pullFromSheet(),500);
