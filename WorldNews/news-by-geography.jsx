import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';

// =============================================================================
// ELK Necromancers — News by Geography
// Region-grouped world map, animated word-of-the-day drift, faceted article list.
// =============================================================================
// Natural Earth 1 projection, 110m coastlines, simplified and merged into eight desks.
// Generated offline from world-atlas@2 — the app carries no runtime map dependency.
const WORLD = {"W":1000,"H":480,"regions":[{"name":"East Asia & Pacific","d":"M988,333L988,335L985,336ZM994,330L992,331L994,329L994,329L994,330ZM6,329L6,329L6,329L6,330L6,330L6,329ZM892,285L901,289L905,295L909,297L907,299L912,306L917,310L909,310L904,303L901,302L897,304L895,307L890,306L888,304L881,304L884,301L883,294L875,291L871,288L869,290L867,286L871,284L867,284L863,280L868,278L872,280L873,286L876,288L879,284L884,283ZM924,289L918,286L919,285ZM920,296L915,297L912,295L918,295L923,291ZM929,294L933,298L931,299ZM846,307L842,310L843,307L846,306L852,304L851,305ZM872,299L872,299L872,299ZM820,260L824,255L826,258L831,260L827,264L826,267L827,271L831,274L827,275L826,280L824,282L822,290L819,290L814,287L811,288L806,287L806,282L803,279L803,273L805,271L809,271L809,268L814,267L817,263ZM859,286L861,288L855,288ZM852,289L852,289L852,289ZM855,270L857,272L857,276L856,280L854,274ZM841,274L848,273L846,276L834,276L833,279L836,282L843,279L837,283L840,287L842,294L839,294L834,286L834,295L831,294L832,288L830,286L833,275L836,273ZM833,310L829,308L832,307ZM836,305L840,303L840,305ZM827,304L830,305L823,306ZM801,298L806,299L807,298L812,299L813,301L820,304L817,305L814,304L809,304L800,302L792,299L794,296ZM790,281L791,285L795,287L793,296L790,296L785,291L782,286L778,279L776,276L774,271L765,261L764,259L770,260L780,270L782,270L788,277L787,279ZM959,328L959,328L959,328ZM958,327L958,327L958,327ZM777,256L773,250L773,245L773,240L768,225L766,223L762,227L759,225L758,218L751,211L752,206L753,205L752,200L754,200L755,191L758,189L760,190L760,186L757,185L756,182L752,183L748,187L745,188L741,186L738,189L736,187L729,186L725,184L717,179L716,180L708,175L707,172L709,172L707,166L703,163L699,161L695,157L694,156L693,153L691,153L689,150L693,146L696,147L696,145L699,144L703,141L704,138L700,132L706,130L706,125L711,126L711,121L714,119L714,119L717,118L723,114L731,116L737,117L738,115L737,113L738,110L747,112L748,115L752,116L760,116L765,119L771,119L776,118L778,116L784,117L788,118L790,110L788,108L789,106L794,106L801,108L811,117L816,118L820,120L823,123L827,123L832,121L833,132L828,132L832,139L831,140L832,141L830,143L831,145L827,149L831,153L836,158L837,164L831,166L828,159L829,158L826,155L822,154L822,150L819,148L812,152L812,147L810,145L803,152L810,157L812,155L817,156L818,158L815,159L812,164L815,166L822,175L822,178L825,181L825,186L824,186L820,198L814,204L809,204L807,206L801,208L799,212L799,208L794,208L790,210L789,216L794,223L799,228L801,234L801,240L796,244L791,249L791,245L788,243L786,243L783,238L778,236L776,234L776,237L774,245L776,247L778,253L783,257L787,261L787,268L790,273L788,273L782,268L778,260ZM951,345L954,348L950,347L947,343L948,342ZM948,311L948,311L948,311ZM947,308L947,308L947,308ZM945,309L945,309L945,309ZM942,303L942,303L942,303ZM936,300L936,300L936,300ZM953,406L948,410L945,410L948,408L946,404L950,402L953,395L952,388L955,391L955,397L959,400L962,399L958,403L956,403ZM928,417L933,414L942,408L941,410L944,409L943,412L936,417L936,418L931,420L925,425L920,427L914,426L918,422ZM877,409L879,409L873,416L868,417L870,408L873,410ZM833,381L827,383L825,386L815,387L809,390L805,390L802,387L806,381L806,372L805,368L805,360L807,360L806,356L810,347L811,347L818,344L820,344L830,340L834,336L837,330L838,333L840,329L846,323L850,322L853,325L856,323L860,317L866,316L866,313L873,316L877,315L878,317L872,324L881,333L886,333L889,325L891,317L894,311L896,318L896,324L898,323L900,325L899,331L900,338L905,343L906,349L909,349L908,353L912,358L910,365L911,368L904,379L899,384L890,395L889,398L884,399L876,403L874,401L870,402L863,400L863,394L860,392L862,388L857,391L862,386L863,383L856,390L853,383L854,382L848,379L843,379L836,381ZM799,219L797,218L798,213L802,212L802,217ZM829,198L828,206L825,201L827,196ZM833,236L831,234L835,235ZM839,245L840,242L843,241L843,244L840,248ZM850,250L850,257L849,254L848,259L844,257L844,253L842,252L838,255L839,251L842,249L843,251L849,247ZM828,247L824,250L829,244ZM835,218L836,222L834,226L835,231L841,233L842,237L839,233L832,233L830,229L830,218ZM837,240L840,240L837,244ZM846,238L847,242L845,241L845,244L843,237ZM865,151L864,154L867,161L864,165L859,165L857,169L854,165L844,168L847,170L848,176L845,176L844,173L840,170L846,163L851,162L854,162L854,157L857,158L860,154L860,150L858,144L860,144ZM864,135L865,134L867,138L864,139L864,142L858,139L859,143L856,143L854,137L857,137L854,130L859,134ZM848,169L851,166L854,168L851,172Z","anchor":[812,190]},{"name":"Sub-Saharan Africa","d":"M609,292L608,298L609,299L608,304L611,310L612,324L608,331L602,334L595,341L595,343L597,348L596,353L595,356L588,360L588,363L587,368L580,377L574,383L568,387L559,386L551,389L548,386L548,379L544,369L541,364L539,354L539,348L536,344L532,333L532,331L535,319L538,316L538,312L536,307L537,305L534,297L534,296L533,293L531,290L524,281L526,274L527,270L527,267L524,262L516,263L512,257L507,257L505,257L503,258L495,262L492,261L484,261L479,263L475,262L468,255L464,252L463,248L458,242L454,237L454,235L454,233L452,230L455,225L456,219L456,212L454,209L454,208L465,208L465,202L468,202L468,194L477,194L477,189L487,197L509,214L509,216L512,215L515,214L523,208L532,201L540,203L543,202L565,214L568,213L568,206L600,206L602,217L605,219L608,226L613,230L619,236L619,240L622,243L635,240L641,238L641,243L637,255L635,260L629,268L620,276L616,282L612,285ZM637,317L639,326L635,335L627,357L622,360L619,358L617,348L621,342L620,333L622,329L627,328L631,324Z","anchor":[556,274]},{"name":"Middle East & N. Africa","d":"M530,170L540,173L542,176L551,179L553,177L552,175L555,172L560,172L567,175L570,175L577,178L580,176L590,177L591,176L592,170L594,165L594,162L590,158L589,160L585,161L580,159L577,160L572,159L568,154L569,151L567,150L570,147L574,147L575,144L579,145L585,142L589,142L598,145L603,145L606,143L611,145L612,147L615,149L619,152L620,152L622,150L626,153L627,156L632,158L636,159L640,157L643,155L648,154L659,159L660,162L659,168L661,175L664,178L662,181L668,186L670,191L666,193L666,196L654,194L651,190L647,192L638,187L633,180L629,181L628,180L629,185L631,188L635,191L637,197L639,194L639,198L639,199L646,199L651,193L651,194L652,197L655,200L659,201L662,205L658,216L655,217L651,222L646,224L643,227L636,230L634,232L626,234L624,236L620,236L617,227L617,224L612,214L606,209L606,204L594,187L593,182L593,182L591,188L587,185L592,193L596,200L596,203L600,206L568,206L568,213L565,214L543,202L540,203L532,201L523,208L515,214L512,215L509,216L509,214L487,197L477,189L477,194L468,194L468,202L465,202L465,208L454,208L454,209L454,208L457,201L459,198L461,192L466,187L469,186L475,181L474,177L477,170L482,167L485,162L488,163L494,164L504,159L516,157L522,158L525,157L528,160L528,165L527,166ZM566,142L571,142L573,145L570,145L567,148L567,145Z","anchor":[577,186]},{"name":"North America","d":"M204,59L212,61L218,59L221,59L229,57L229,59L233,57L236,59L240,57L239,60L243,58L258,62L254,64L258,64L266,63L267,65L270,64L269,63L276,61L278,63L283,64L290,64L291,62L298,63L301,60L298,58L301,55L304,53L308,54L309,57L306,59L310,59L308,62L312,60L314,62L312,64L313,66L319,61L321,58L327,59L329,60L326,63L325,66L320,68L315,67L309,72L305,74L302,74L298,78L295,78L287,84L283,89L286,90L286,95L289,94L293,95L296,98L300,100L306,101L305,103L304,110L307,113L312,108L312,104L311,102L316,101L321,96L322,92L320,90L324,87L325,79L327,79L333,80L335,79L339,83L343,83L341,89L344,91L348,90L353,85L357,95L356,97L360,100L364,102L365,105L367,106L366,110L358,113L354,116L350,116L339,116L332,119L324,126L326,126L331,122L337,119L341,119L343,120L340,122L340,128L343,130L347,129L350,126L351,129L347,131L341,133L335,137L334,134L339,131L332,132L332,133L323,136L321,139L322,143L314,144L316,145L311,146L310,149L304,155L303,152L302,162L300,165L294,168L285,176L284,178L285,190L283,196L281,196L278,187L279,185L277,181L273,182L271,179L262,180L262,183L258,183L256,181L248,182L242,186L239,189L239,194L236,199L235,205L235,211L238,216L242,219L250,216L252,215L254,209L263,208L260,218L259,218L256,220L251,220L249,222L252,225L248,225L246,230L244,227L240,225L235,227L224,222L221,219L217,218L213,215L212,211L214,208L213,204L208,196L206,194L206,192L201,184L200,177L197,175L195,180L200,191L201,197L204,202L202,202L197,197L198,193L193,190L195,185L192,182L191,172L189,167L185,166L182,151L182,147L185,139L191,130L194,121L197,123L198,125L199,120L195,115L191,114L193,109L191,108L192,105L192,102L190,100L191,97L190,94L191,92L185,91L181,87L176,86L173,86L168,84L165,84L163,86L153,89L157,84L148,88L148,89L144,92L138,94L129,98L124,99L115,102L110,102L121,98L124,98L135,93L140,89L134,91L133,89L128,90L131,87L127,87L125,85L126,82L135,77L138,77L145,75L145,73L148,72L138,73L135,73L135,70L145,67L145,69L150,69L148,63L146,62L149,61L153,61L162,57L177,54L183,56L188,56L197,58L200,58ZM313,79L318,78L314,80ZM338,50L336,49L338,48L342,48L345,50ZM320,80L320,80L320,80ZM314,45L312,46L307,45L312,43ZM318,39L318,39L318,39ZM315,36L317,36L312,38L312,35ZM323,46L316,45L317,43L316,41L310,40L312,39L317,40L321,40L321,42L324,43L329,44L332,43L340,43L341,45L336,46L334,46ZM286,37L288,37L283,39L281,38ZM288,35L290,36L284,36ZM366,112L362,117L369,119L370,124L368,127L366,126L366,123L354,124L355,121L357,119L361,114L365,111ZM317,71L323,75L321,76L317,74L310,77L310,74L313,70ZM339,52L341,51L347,53L347,54L351,54L352,55L357,57L359,60L354,61L362,64L364,66L367,67L365,68L360,72L356,68L353,68L352,70L356,73L357,76L355,78L348,75L352,81L346,79L340,76L341,75L336,73L336,73L329,74L328,73L330,71L339,70L340,68L344,65L344,63L338,61L339,60L335,57L330,59L322,58L315,57L314,56L315,52L321,49L327,48L324,50L325,51L328,49L334,48L336,51L334,52ZM310,47L318,48L307,53L304,52L305,50L308,48ZM258,42L269,39L275,38L273,40L264,42ZM185,104L188,104L184,107L183,106ZM300,34L308,35L308,38L303,37ZM197,121L192,120L190,117L188,116L189,114L194,115ZM257,46L264,47L266,49L257,51L251,54L245,55L245,54L241,53L250,48L249,47ZM287,43L291,42L288,45L281,45L275,46L273,45L278,44L269,45L266,44L274,41L279,42L281,43L284,44L283,41L288,41ZM284,50L285,51L284,55L289,58L288,59L284,59L283,61L277,60L269,61L260,62L260,61L255,60L255,58L266,57L262,56L255,56L254,55L260,54L254,54L260,51L267,49L266,51L271,50L273,51L277,50L277,53L279,52L280,50ZM295,51L294,49L298,48L304,48L301,50L303,51L301,53L297,54L291,51ZM285,48L289,49L285,51ZM308,40L308,42L305,45L299,45L301,43L297,43L299,41ZM321,31L329,30L330,31L336,32L337,34L329,37L322,37L321,36L324,34L320,34L319,32ZM332,29L342,28L345,27L349,28L351,27L358,26L364,26L369,26L382,26L388,27L388,28L375,29L379,29L371,31L366,33L360,34L354,34L356,36L350,38L345,40L348,40L342,42L337,41L331,42L325,41L325,40L329,39L330,38L335,38L334,37L331,36L338,35L339,34L337,32L344,32L347,32L337,32L334,31ZM339,65L335,66L337,63L340,63ZM298,59L296,61L292,61L290,60L295,58ZM343,117L347,117L348,119ZM342,126L342,127L346,128L343,129L341,128ZM76,212L78,214L74,216ZM75,210L75,210L75,210ZM74,209L74,209L74,209ZM71,207L71,207L71,207ZM68,206L68,206L68,206ZM122,85L122,85L122,85ZM146,92L148,93L141,96L142,94ZM121,75L126,77L123,77L120,76ZM415,27L422,26L428,26L431,25L438,25L452,25L462,27L459,28L442,28L449,28L454,29L458,28L460,29L457,30L462,29L471,28L477,29L477,30L467,32L462,36L462,38L464,40L458,41L461,42L461,44L459,44L461,47L457,47L458,49L452,49L454,52L450,51L454,54L455,56L451,57L447,54L448,56L445,57L453,58L441,62L432,63L426,67L421,69L413,70L411,72L409,76L405,78L405,81L401,86L398,86L395,84L391,84L386,76L386,71L384,69L384,66L388,62L391,61L394,58L387,60L385,59L387,56L393,56L389,54L385,53L388,51L384,43L379,42L365,42L361,40L370,39L363,38L359,37L360,36L376,34L377,33L372,32L375,32L385,30L385,29L396,28L401,28L403,29L409,27L418,29L415,28Z","anchor":[258,120]},{"name":"Russia & Eurasia","d":"M120,61L120,61L125,66L130,66L132,69L124,71L121,73L118,74L115,72L116,71L111,71L113,69L110,69L107,72L107,72L120,61ZM893,72L893,72L889,73L899,77L900,79L896,79L890,81L887,85L888,86L883,84L879,87L872,87L873,91L878,93L881,98L879,98L883,101L880,103L882,107L879,107L881,110L879,113L866,100L863,96L862,93L865,92L867,85L869,83L867,79L864,79L865,81L863,85L857,81L853,82L851,87L855,89L847,90L846,88L842,87L840,89L833,88L826,89L819,102L823,102L828,105L832,103L838,107L840,113L844,121L843,128L840,137L838,139L834,138L832,141L831,140L832,139L828,132L833,132L832,121L827,123L823,123L820,120L816,118L811,117L801,108L794,106L789,106L788,108L790,110L788,118L784,117L778,116L776,118L771,119L765,119L760,116L752,116L748,115L747,112L738,110L737,113L738,115L737,117L731,116L723,114L717,118L714,119L714,119L711,121L711,126L706,125L706,130L700,132L704,138L703,141L699,144L696,145L696,147L693,146L689,150L689,150L691,153L693,153L694,156L690,156L687,159L683,153L682,156L676,157L672,157L670,156L668,160L663,163L660,162L659,159L648,154L643,155L640,157L639,151L635,148L635,145L640,145L636,141L633,142L633,139L630,138L626,133L629,134L628,131L633,131L631,126L627,126L622,128L619,130L617,133L620,136L620,139L623,142L627,146L626,153L622,150L620,152L619,152L615,149L612,147L611,145L606,143L605,140L601,137L592,131L595,128L595,125L589,127L587,130L591,132L585,134L581,131L583,129L576,127L574,131L570,131L570,126L565,122L561,123L556,123L554,121L555,119L558,114L557,112L556,104L561,103L562,99L566,98L563,94L564,88L566,86L564,85L570,79L570,78L566,76L567,74L565,72L566,69L562,66L564,64L560,62L560,60L565,59L567,58L571,60L577,60L586,64L589,67L583,69L573,67L572,67L576,69L577,73L582,75L580,72L581,71L587,73L589,72L587,70L591,68L595,69L596,67L594,65L594,64L592,62L598,63L600,64L597,65L600,67L603,66L603,65L614,61L614,63L622,62L624,61L627,63L629,61L627,58L633,59L646,63L647,62L641,58L638,55L641,53L642,50L648,51L648,54L652,57L653,61L656,62L654,68L657,68L659,67L660,64L658,61L654,59L655,56L651,54L655,52L656,53L659,52L663,52L668,53L664,51L663,48L666,48L675,47L672,46L673,44L684,42L691,42L694,41L698,41L698,39L702,38L706,39L704,39L711,40L717,40L725,43L726,44L720,47L730,49L733,48L740,48L742,50L750,50L749,48L757,48L761,50L764,53L768,55L773,56L772,53L776,54L779,53L784,54L788,54L784,51L786,50L806,52L810,54L817,56L825,55L830,56L835,59L838,59L844,59L852,59L859,61L860,61L856,58L864,58L868,58L876,60L880,61L893,72ZM674,30L677,30L682,31L689,33L690,35L687,36L677,34L674,32L671,32ZM695,34L701,36L702,37L692,38L692,34ZM773,42L778,42L787,43L788,45L780,45L778,46L772,44L771,42ZM794,44L800,45L799,46L790,44ZM783,49L786,48L791,49ZM584,31L593,31L596,31L589,33L588,31ZM554,103L547,103L550,100L554,101ZM608,48L612,46L611,45L620,42L626,41L633,40L634,42L622,44L617,47L613,52L615,54L620,56L611,56L610,55L606,54L607,51L610,48ZM840,105L845,111L854,120L850,119L851,123L856,126L854,129L848,120L844,113L841,110L838,106ZM874,56L871,56L870,55L871,54L874,56ZM129,54L129,54L129,54L133,55L126,56L126,56L129,54Z","anchor":[694,82]},{"name":"Latin America","d":"M336,446L339,450L346,452L346,454L342,453L340,455L333,453L326,450L321,447L331,450L332,447ZM347,386L347,388L351,391L353,396L351,400L347,402L339,402L341,408L337,410L334,409L335,413L339,414L336,417L336,422L334,422L332,426L338,429L338,432L335,434L335,437L332,440L335,445L331,447L331,450L327,449L320,445L315,434L316,428L312,427L314,424L313,419L316,420L316,414L314,413L314,417L312,416L311,406L312,404L309,397L310,397L312,382L310,377L309,370L310,366L309,346L308,336L304,333L299,330L291,324L287,316L279,300L275,297L274,292L277,288L278,286L275,284L278,275L281,273L282,269L286,265L284,254L284,250L281,248L277,251L278,253L270,251L269,248L263,244L263,241L258,236L259,235L258,234L256,235L252,233L246,230L248,225L252,225L249,222L251,220L256,220L259,218L258,224L256,226L258,226L264,226L268,226L271,229L268,241L269,242L272,246L275,249L280,246L286,249L291,247L291,243L297,241L302,237L303,239L301,240L302,248L304,245L303,242L310,240L312,243L317,243L321,245L322,243L329,243L327,245L332,247L335,250L342,258L350,259L349,261L350,265L349,270L352,270L354,269L357,264L358,264L361,274L360,277L365,278L365,281L367,279L375,282L376,286L379,285L385,286L389,286L397,293L402,295L404,301L403,306L398,313L393,321L393,327L392,340L389,344L389,348L386,351L379,352L374,355L370,360L369,370L366,377L362,381L360,386L356,390L349,388ZM304,219L297,217L302,217L300,213L304,214L307,213L313,217ZM288,191L288,191L288,191ZM291,190L291,190L291,190ZM289,196L289,196L289,196ZM353,443L358,441L361,443L357,445ZM319,217L320,219L316,219ZM288,218L291,220L289,220L286,218ZM277,202L282,203L285,205L288,205L292,209L298,212L294,213L288,213L290,211L287,210L286,208L278,206L276,204L272,207L272,204ZM330,242L330,242L330,242Z","anchor":[332,319]},{"name":"Europe","d":"M529,33L532,33L541,35L536,36L534,38L533,40L531,40L527,39L528,38L525,37L521,35L520,33L525,33ZM552,69L548,70L547,73L540,78L539,82L543,86L541,89L539,90L537,98L534,97L533,100L530,100L525,89L524,88L519,91L516,92L513,90L511,80L513,79L519,76L523,73L531,64L540,58L545,57L548,57L551,55L558,55L565,57L563,57L565,59L560,60L560,62L564,64L562,66L566,69L565,72L567,74L566,76L570,78L570,79L564,85L560,85L552,87L548,84L547,79L550,75L555,71ZM551,33L549,34L544,34L538,34L532,32L543,31ZM548,38L544,39L540,38L540,37L544,36ZM357,264L354,269L352,270L349,270L350,265L349,261L350,259L353,260ZM523,101L526,104L530,103L534,105L542,101L547,103L554,103L554,101L550,100L549,98L550,94L552,93L554,95L556,93L553,89L559,87L564,88L563,94L566,98L562,99L561,103L556,104L557,112L558,114L555,119L554,121L556,123L561,123L565,122L570,126L570,131L574,131L572,132L572,136L570,140L571,142L566,142L567,145L558,147L559,151L562,154L559,157L560,160L556,158L552,149L550,147L549,142L547,140L540,137L537,132L534,131L535,130L531,131L532,135L536,139L540,143L547,147L547,149L543,147L544,150L542,155L539,148L535,144L533,144L527,139L526,136L522,134L519,136L516,138L511,137L508,138L508,140L505,144L502,145L499,150L500,152L498,156L494,159L489,159L486,161L483,158L481,157L477,158L477,154L475,152L478,146L477,142L476,138L480,136L489,137L495,137L497,135L497,129L493,124L489,123L489,121L496,121L495,117L498,118L503,116L506,113L508,112L511,107L516,106L521,104L520,101L519,96L520,95L524,93L525,97L523,100ZM522,140L524,138L524,144ZM569,163L565,164L561,163ZM485,104L484,109L479,111L476,111L478,108L477,104L482,101L487,102ZM538,154L540,154L539,159L532,156L532,154ZM522,145L525,146L525,151L522,151L521,145ZM529,98L529,102L526,99ZM493,106L491,102L487,100L486,96L488,90L493,90L491,93L495,93L493,98L495,98L497,102L499,103L501,107L504,108L501,114L498,114L491,116L486,116L490,113L487,110L490,109L489,106ZM469,68L468,69L470,71L467,74L459,76L450,75L452,73L448,72L452,71L447,70L449,68L452,68L455,70L459,68L461,69L465,67ZM586,164L590,162L589,164Z","anchor":[524,114]},{"name":"South Asia","d":"M742,206L736,208L736,212L732,214L725,222L725,224L721,226L720,228L721,235L720,238L721,244L715,251L712,248L709,241L706,236L705,230L702,226L699,215L697,208L692,210L688,206L689,205L684,201L682,200L679,195L666,196L666,193L670,191L668,186L662,181L664,178L661,175L659,168L660,162L663,163L668,160L670,156L672,157L676,157L682,156L683,153L687,159L690,156L694,156L695,157L699,161L703,163L707,166L709,172L707,172L708,175L716,180L717,179L725,184L729,186L736,187L738,189L741,186L745,188L748,187L752,183L756,182L757,185L760,186L760,190L758,189L755,191L754,200L752,200L753,205L752,206L751,211L748,204L745,204L745,207ZM727,253L726,256L723,258L721,251L722,245Z","anchor":[706,195]}],"cities":{"Washington":[302,152],"New York":[311,146],"San Francisco":[183,155],"Ottawa":[311,131],"Mexico City":[229,215],"Brasilia":[369,328],"Buenos Aires":[347,389],"Bogota":[294,262],"Caracas":[315,243],"Santiago":[314,385],"Lima":[287,316],"Havana":[277,203],"London":[500,112],"Brussels":[511,114],"Paris":[506,120],"Berlin":[532,109],"Madrid":[491,147],"Rome":[532,142],"Warsaw":[550,109],"Stockholm":[541,88],"Helsinki":[557,86],"Athens":[561,155],"Kyiv":[574,115],"Moscow":[588,99],"Minsk":[565,104],"Tbilisi":[614,143],"Astana":[673,113],"Jerusalem":[593,175],"Gaza":[591,175],"Beirut":[593,168],"Damascus":[595,169],"Baghdad":[617,170],"Tehran":[634,162],"Riyadh":[626,197],"Dubai":[649,196],"Doha":[639,196],"Ankara":[584,148],"Cairo":[583,180],"Tripoli":[535,171],"Algiers":[508,159],"Rabat":[482,167],"Sanaa":[621,228],"Lagos":[509,256],"Abuja":[521,248],"Nairobi":[602,281],"Addis Ababa":[607,248],"Khartoum":[589,227],"Johannesburg":[575,361],"Cape Town":[548,386],"Kinshasa":[542,291],"Accra":[499,259],"Dakar":[452,230],"New Delhi":[706,185],"Mumbai":[699,216],"Islamabad":[692,168],"Dhaka":[744,200],"Kabul":[681,166],"Colombo":[721,255],"Beijing":[798,148],"Shanghai":[822,176],"Hong Kong":[810,205],"Taipei":[828,196],"Tokyo":[864,162],"Seoul":[829,156],"Pyongyang":[824,151],"Singapore":[788,273],"Jakarta":[796,297],"Bangkok":[777,233],"Hanoi":[788,209],"Manila":[833,230],"Canberra":[890,391],"Sydney":[897,386],"Wellington":[945,410],"Rotterdam":[511,110],"Tunis":[526,158]}};
// ---------------------------------------------------------------------------
// SAMPLE FEED — placeholder content, not live reporting.
// Source names and headlines are invented so nothing here is attributed to a
// real newsroom. Schema mirrors the ELK Necromancers table:
//   date | source | category (News Type) | headline | link | polarity | subjectivity
// Replace this array with your real feed; nothing else in the app changes.
// ---------------------------------------------------------------------------
const ARTICLES = [
  // ---- North America -------------------------------------------------------
  { id: 1, date: '2026-09-05', source: 'Meridian Wire', category: 'Business', polarity: -0.28, subjectivity: 0.22,
    headline: 'Washington regulators open review of regional bank capital rules',
    summary: 'Federal supervisors began a formal review of capital requirements for mid-sized lenders, citing uneven stress-test results. Industry groups asked for a longer comment window. Analysts expect any final rule to phase in over three years, with the largest effect on banks holding between fifty and two hundred billion in assets.' },
  { id: 2, date: '2026-09-05', source: 'Signal Tech', category: 'Technology', polarity: 0.41, subjectivity: 0.35,
    headline: 'San Francisco chip startup reports yield gains on second-generation process',
    summary: 'A San Francisco fabless designer said test wafers from its second-generation process cleared internal yield targets ahead of schedule. The company did not name its foundry partner. Volume production is planned for the first half of next year, pending qualification by two unnamed automotive customers.' },
  { id: 3, date: '2026-09-04', source: 'Northgate Press', category: 'Politics', polarity: -0.12, subjectivity: 0.58,
    headline: 'Ottawa and provincial leaders end talks on health transfers without deal',
    summary: 'Two days of negotiations in Ottawa closed without agreement on the federal health transfer formula. Provincial representatives said the offer fell short of demographic pressures; federal officials called the gap narrow. Talks are expected to resume next month ahead of the budget cycle.' },
  { id: 4, date: '2026-09-04', source: 'Ledger Daily', category: 'Business', polarity: 0.18, subjectivity: 0.19,
    headline: 'New York freight volumes steady as port congestion eases',
    summary: 'Container throughput at New York terminals held flat for a third month while average dwell times fell. Operators credited a new appointment system and additional chassis capacity. Rail connections remain the constraint, with inland transfer times still above pre-pandemic averages.' },
  { id: 5, date: '2026-09-03', source: 'Orbital Science', category: 'Science', polarity: 0.52, subjectivity: 0.31,
    headline: 'Mexico City observatory publishes decade-long air quality dataset',
    summary: 'Researchers released ten years of calibrated particulate readings from monitoring stations across Mexico City. The dataset is open access and includes sensor drift corrections. The team said the archive should help separate traffic contributions from regional dust events in future studies.' },
  { id: 6, date: '2026-09-03', source: 'Terminal Sports', category: 'Sports', polarity: 0.33, subjectivity: 0.62,
    headline: 'Washington franchise names new general manager after four-week search',
    summary: 'The club promoted its director of player personnel to general manager, ending a search that began at the close of last season. The appointment keeps the current coaching staff in place through next year. Ownership said continuity drove the decision.' },
  { id: 7, date: '2026-09-03', source: 'Continental Desk', category: 'Defense', polarity: -0.35, subjectivity: 0.28,
    headline: 'Canada delays frigate programme milestone to late next year',
    summary: 'The defence procurement office pushed a key design milestone for its frigate programme into late next year, citing supplier qualification delays. Officials said the overall delivery schedule is unchanged. An independent cost review is due before the next parliamentary session.' },
  { id: 8, date: '2026-09-02', source: 'Signal Tech', category: 'Technology', polarity: 0.07, subjectivity: 0.44,
    headline: 'Data centre power requests in Ottawa region outpace grid additions',
    summary: 'Utility filings show interconnection requests near Ottawa now exceed planned generation additions through the end of the decade. The regulator has asked operators to submit phased load profiles. Several applicants have proposed on-site generation to bridge the gap.' },
  { id: 9, date: '2026-09-02', source: 'Ledger Daily', category: 'Business', polarity: -0.44, subjectivity: 0.26,
    headline: 'Mexico manufacturing orders slip for second consecutive quarter',
    summary: 'New export orders from Mexico factories fell again, with the sharpest declines in automotive components. Purchasing managers cited softer North American demand and inventory drawdowns. Employment indicators held steady, suggesting firms expect the slowdown to be temporary.' },

  // ---- Europe --------------------------------------------------------------
  { id: 10, date: '2026-09-05', source: 'Continental Desk', category: 'Politics', polarity: -0.09, subjectivity: 0.51,
    headline: 'Brussels sets timetable for review of state aid framework',
    summary: 'The Commission published a timetable for revisiting its state aid framework, with consultation closing in November. Several member states have pressed for faster approvals on energy projects. Competition officials said the review will not reopen the underlying treaty basis.' },
  { id: 11, date: '2026-09-05', source: 'Ledger Daily', category: 'Business', polarity: -0.31, subjectivity: 0.24,
    headline: 'Rotterdam container volumes fall for third straight month',
    summary: 'Throughput at Rotterdam declined again in August, with the port authority pointing to weaker inbound volumes from Asia. Bulk and liquid cargo were broadly flat. The authority left its full-year guidance unchanged but flagged risk to the fourth quarter.' },
  { id: 12, date: '2026-09-04', source: 'Orbital Science', category: 'Science', polarity: 0.61, subjectivity: 0.29,
    headline: 'Madrid team maps groundwater recharge across three river basins',
    summary: 'Hydrologists in Madrid published recharge estimates for three basins using combined satellite gravity and well data. The maps show recovery in two basins after wet winters. The group has released its processing code alongside the results.' },
  { id: 13, date: '2026-09-04', source: 'Harbour Report', category: 'Defense', polarity: -0.22, subjectivity: 0.33,
    headline: 'Berlin approves additional funding for air defence stockpiles',
    summary: 'Lawmakers in Berlin cleared supplementary funding to rebuild interceptor stockpiles over four years. Procurement will run through an existing joint framework. Officials declined to specify quantities, citing operational sensitivity, but said deliveries begin next year.' },
  { id: 14, date: '2026-09-04', source: 'Signal Tech', category: 'Technology', polarity: 0.24, subjectivity: 0.40,
    headline: 'Stockholm operator completes standalone network rollout in northern counties',
    summary: 'A Swedish operator finished standalone network coverage across the northern counties, closing a two-year build. Rural coverage obligations were met ahead of the licence deadline. The operator said industrial customers in mining and forestry drove early demand.' },
  { id: 15, date: '2026-09-03', source: 'Northgate Press', category: 'Politics', polarity: -0.48, subjectivity: 0.66,
    headline: 'Paris coalition talks stall over pension financing clause',
    summary: 'Negotiations in Paris paused after parties failed to agree on how to finance a pension adjustment. Two smaller parties withdrew from the drafting group. Observers expect a further round before the autumn budget debate begins.' },
  { id: 16, date: '2026-09-03', source: 'Terminal Sports', category: 'Sports', polarity: 0.55, subjectivity: 0.71,
    headline: 'Rome club secures qualification with late away result',
    summary: 'A Rome side advanced after a late goal in the second leg, overturning a one-goal deficit. The club had not reached this stage in six seasons. The manager credited squad rotation through a congested fixture list.' },
  { id: 17, date: '2026-09-02', source: 'Ledger Daily', category: 'Business', polarity: 0.12, subjectivity: 0.21,
    headline: 'London insurers report lower catastrophe losses year on year',
    summary: 'London market insurers posted reduced catastrophe losses compared with the same period last year, helped by a quieter storm season. Reserve releases were modest. Underwriters warned that pricing discipline typically weakens after benign years.' },
  { id: 18, date: '2026-09-02', source: 'Orbital Science', category: 'Science', polarity: 0.47, subjectivity: 0.27,
    headline: 'Warsaw laboratory extends coherence times in solid-state qubit array',
    summary: 'A Warsaw group reported longer coherence times in a solid-state qubit array using a revised isolation scheme. Results were reproduced across two devices. The team noted that fabrication yield remains the main barrier to scaling the approach.' },
  { id: 19, date: '2026-09-01', source: 'Continental Desk', category: 'Politics', polarity: -0.17, subjectivity: 0.49,
    headline: 'Athens and Brussels reach interim agreement on migration processing',
    summary: 'Officials in Athens and Brussels agreed interim arrangements for asylum processing capacity, with funding tied to reception standards. The agreement runs eighteen months. Several member states have asked for the terms to be reviewed at the next council meeting.' },

  // ---- Russia & Eurasia ----------------------------------------------------
  { id: 20, date: '2026-09-05', source: 'Harbour Report', category: 'Ukraine', polarity: -0.62, subjectivity: 0.38,
    headline: 'Kyiv reports damage to power substations in eastern regions',
    summary: 'Ukrainian officials said several substations in eastern regions sustained damage overnight, prompting rolling outages. Repair crews restored partial supply within a day. The energy ministry renewed requests for transformer donations ahead of winter demand.' },
  { id: 21, date: '2026-09-05', source: 'Continental Desk', category: 'Ukraine', polarity: -0.21, subjectivity: 0.44,
    headline: 'Grain shipments from Ukraine hold near seasonal average',
    summary: 'Export volumes from Ukrainian Black Sea terminals held close to the seasonal average last month. Insurers kept war-risk premiums unchanged. Traders said routing remains sensitive to weather and to the availability of escort arrangements.' },
  { id: 22, date: '2026-09-04', source: 'Meridian Wire', category: 'Defense', polarity: -0.51, subjectivity: 0.35,
    headline: 'Moscow announces expanded conscription intake for autumn cycle',
    summary: 'Russian authorities set a larger intake for the autumn conscription cycle. Officials described the increase as routine planning. Independent analysts noted the figure is the highest in several years but cautioned that published totals are difficult to verify.' },
  { id: 23, date: '2026-09-03', source: 'Ledger Daily', category: 'Business', polarity: -0.26, subjectivity: 0.23,
    headline: 'Kazakhstan pipeline maintenance trims export volumes for the month',
    summary: 'Scheduled maintenance on a major Kazakhstan export line reduced throughput for roughly two weeks. Operators said volumes would recover in September. Buyers in Europe and Asia had been notified in advance and adjusted nominations accordingly.' },
  { id: 24, date: '2026-09-03', source: 'Northgate Press', category: 'Politics', polarity: 0.08, subjectivity: 0.47,
    headline: 'Tbilisi parliament schedules debate on electoral commission reform',
    summary: 'Legislators in Tbilisi set a date for debating changes to the electoral commission appointment process. Opposition parties have submitted competing drafts. International observers have previously recommended broader consensus on commission composition.' },
  { id: 25, date: '2026-09-02', source: 'Harbour Report', category: 'Ukraine', polarity: -0.39, subjectivity: 0.41,
    headline: 'Kyiv seeks longer-term funding commitments from partners',
    summary: 'Ukrainian finance officials asked partners for multi-year budget commitments rather than annual tranches, citing planning difficulties. Several governments have signalled openness. A decision is not expected before the next donor coordination meeting.' },
  { id: 26, date: '2026-09-01', source: 'Signal Tech', category: 'Technology', polarity: -0.14, subjectivity: 0.36,
    headline: 'Minsk software exports decline as firms relocate staff',
    summary: 'Software export receipts from Minsk fell year on year as firms continued relocating technical staff abroad. Industry associations reported reduced headcount at several large employers. Remaining companies have shifted toward domestic and regional contracts.' },

  // ---- East Asia & Pacific -------------------------------------------------
  { id: 27, date: '2026-09-05', source: 'Signal Tech', category: 'Technology', polarity: 0.36, subjectivity: 0.30,
    headline: 'Taipei foundry lifts advanced packaging capacity target',
    summary: 'A Taipei manufacturer raised its capacity target for advanced packaging, citing sustained orders from accelerator customers. Construction on two additional lines is underway. Management said equipment lead times remain the principal scheduling risk.' },
  { id: 28, date: '2026-09-05', source: 'Ledger Daily', category: 'Business', polarity: -0.19, subjectivity: 0.25,
    headline: 'Tokyo wage growth moderates after spring settlements',
    summary: 'Wage growth in Tokyo eased following this year\'s spring settlements, with smaller firms lagging larger employers. Real income remains slightly positive. Economists said the pace supports a gradual normalisation of policy rather than a rapid one.' },
  { id: 29, date: '2026-09-04', source: 'Harbour Report', category: 'Defense', polarity: -0.42, subjectivity: 0.37,
    headline: 'Manila expands coast guard patrols in western waters',
    summary: 'Philippine authorities announced additional coast guard patrols in western waters following a series of encounters near disputed features. Two new vessels enter service this year. Officials described the deployment as routine maritime domain awareness.' },
  { id: 30, date: '2026-09-04', source: 'Orbital Science', category: 'Science', polarity: 0.58, subjectivity: 0.28,
    headline: 'Beijing observatory releases first data from wide-field survey',
    summary: 'A Beijing-based observatory published its first data release from a wide-field survey covering several thousand square degrees. The catalogue includes photometry for millions of sources. Access is open following a six-month proprietary period.' },
  { id: 31, date: '2026-09-04', source: 'Northgate Press', category: 'Politics', polarity: 0.03, subjectivity: 0.53,
    headline: 'Seoul assembly passes revised budget after extended session',
    summary: 'Legislators in Seoul approved a revised budget following an extended session, with adjustments to housing and childcare lines. The final figure was slightly below the original proposal. Implementation begins in the next fiscal quarter.' },
  { id: 32, date: '2026-09-03', source: 'Ledger Daily', category: 'Business', polarity: 0.29, subjectivity: 0.22,
    headline: 'Singapore port handles record transhipment volume for August',
    summary: 'Singapore recorded its highest August transhipment volume, helped by rerouted services and added berth capacity. The port authority said yard utilisation stayed within operating limits. Analysts expect volumes to soften as rerouting unwinds.' },
  { id: 33, date: '2026-09-03', source: 'Terminal Sports', category: 'Sports', polarity: 0.44, subjectivity: 0.68,
    headline: 'Sydney hosts qualifying rounds ahead of regional championship',
    summary: 'Qualifying rounds opened in Sydney with entries from across the region. Organisers reported higher participation than the previous cycle. The championship proper begins next month at the same venue following a short break.' },
  { id: 34, date: '2026-09-02', source: 'Signal Tech', category: 'Technology', polarity: 0.16, subjectivity: 0.39,
    headline: 'Jakarta regulator publishes draft rules for cloud data residency',
    summary: 'Indonesian regulators circulated draft rules covering data residency for cloud services in regulated sectors. Consultation runs for sixty days. Providers have asked for clarity on backup replication and on the treatment of disaster recovery regions.' },
  { id: 35, date: '2026-09-01', source: 'Continental Desk', category: 'Politics', polarity: -0.24, subjectivity: 0.50,
    headline: 'Canberra reviews foreign investment thresholds for critical minerals',
    summary: 'Australian officials began a review of screening thresholds for foreign investment in critical minerals projects. Industry submissions close in October. The treasurer said the review would not change existing approvals already granted.' },

  // ---- Middle East & N. Africa ---------------------------------------------
  { id: 36, date: '2026-09-05', source: 'Harbour Report', category: 'Defense', polarity: -0.66, subjectivity: 0.42,
    headline: 'Beirut reports renewed exchanges along the southern boundary',
    summary: 'Authorities in Beirut reported renewed exchanges along the southern boundary area overnight. Monitors called for restraint on both sides. Humanitarian agencies said access to several villages remains restricted pending security assessments.' },
  { id: 37, date: '2026-09-05', source: 'Ledger Daily', category: 'Business', polarity: 0.21, subjectivity: 0.24,
    headline: 'Dubai non-oil trade rises on stronger re-export activity',
    summary: 'Non-oil trade through Dubai increased, driven mainly by re-exports of electronics and machinery. Customs data showed higher volumes to South Asian markets. Officials attributed part of the gain to expanded free zone capacity.' },
  { id: 38, date: '2026-09-04', source: 'Northgate Press', category: 'Politics', polarity: -0.33, subjectivity: 0.55,
    headline: 'Cairo delays subsidy adjustment pending review',
    summary: 'Egyptian officials postponed a scheduled subsidy adjustment while a review of targeting mechanisms continues. The delay affects fuel and bread programmes. Lenders have previously linked disbursements to progress on subsidy reform timetables.' },
  { id: 39, date: '2026-09-04', source: 'Orbital Science', category: 'Science', polarity: 0.49, subjectivity: 0.30,
    headline: 'Riyadh institute begins desert soil carbon monitoring programme',
    summary: 'A Riyadh research institute launched a long-term programme measuring soil carbon across desert margins. Sampling covers forty sites over five years. Results will feed into national land restoration targets and be published annually.' },
  { id: 40, date: '2026-09-03', source: 'Meridian Wire', category: 'Politics', polarity: -0.29, subjectivity: 0.52,
    headline: 'Ankara and Baghdad resume talks on water sharing',
    summary: 'Delegations from Ankara and Baghdad restarted technical discussions on seasonal water releases. Both sides described the meeting as constructive. A joint monitoring proposal has been referred to hydrology teams for assessment before the next round.' },
  { id: 41, date: '2026-09-02', source: 'Ledger Daily', category: 'Business', polarity: -0.37, subjectivity: 0.27,
    headline: 'Tunis tourism receipts fall short of pre-season projections',
    summary: 'Tourism receipts in Tunis came in below pre-season projections despite higher arrival numbers, reflecting shorter average stays. Operators pointed to competition from neighbouring markets. The ministry said it would revise full-year estimates next month.' },
  { id: 42, date: '2026-09-01', source: 'Signal Tech', category: 'Technology', polarity: 0.27, subjectivity: 0.34,
    headline: 'Doha completes fibre upgrade across metropolitan network',
    summary: 'Qatar\'s incumbent operator finished a fibre upgrade covering the metropolitan network, retiring the last copper segments. Average provisioned speeds roughly doubled. The operator said enterprise migration will continue through the first half of next year.' },

  // ---- South Asia ----------------------------------------------------------
  { id: 43, date: '2026-09-05', source: 'Ledger Daily', category: 'Business', polarity: 0.38, subjectivity: 0.23,
    headline: 'New Delhi services activity holds at multi-month high',
    summary: 'Services activity around New Delhi stayed near a multi-month high, supported by domestic orders. Input cost pressures eased slightly. Firms reported modest hiring, though export-facing segments remained weaker than domestic ones.' },
  { id: 44, date: '2026-09-04', source: 'Orbital Science', category: 'Science', polarity: 0.44, subjectivity: 0.32,
    headline: 'Colombo survey documents coral recovery at three reef sites',
    summary: 'A survey off Colombo documented partial coral recovery at three monitored reef sites following two cooler seasons. Coverage remains below the long-term baseline. Researchers cautioned that a single warm season could reverse the gains.' },
  { id: 45, date: '2026-09-03', source: 'Northgate Press', category: 'Politics', polarity: -0.41, subjectivity: 0.57,
    headline: 'Islamabad postpones local elections in two provinces',
    summary: 'Election authorities in Islamabad postponed local polls in two provinces, citing delimitation disputes. Parties have challenged the decision. A revised schedule is expected once boundary objections are resolved by the commission.' },
  { id: 46, date: '2026-09-02', source: 'Meridian Wire', category: 'Business', polarity: -0.23, subjectivity: 0.26,
    headline: 'Dhaka garment orders soften ahead of winter shipping season',
    summary: 'Garment order books in Dhaka softened ahead of the winter shipping season as buyers extended lead times. Factory utilisation dipped modestly. Exporters said energy costs remain the largest margin pressure rather than labour.' },
  { id: 47, date: '2026-09-01', source: 'Harbour Report', category: 'Defense', polarity: -0.30, subjectivity: 0.36,
    headline: 'Kabul aid corridors reopen after week-long suspension',
    summary: 'Humanitarian corridors around Kabul reopened following a week-long suspension. Agencies resumed convoy movements under revised security arrangements. Officials said distribution schedules would take several weeks to return to normal.' },

  // ---- Latin America -------------------------------------------------------
  { id: 48, date: '2026-09-05', source: 'Ledger Daily', category: 'Business', polarity: -0.34, subjectivity: 0.25,
    headline: 'Buenos Aires inflation prints above consensus forecast',
    summary: 'Monthly inflation in Buenos Aires came in above consensus, driven by regulated tariffs and transport. Core measures were steadier. Economists expect the annual rate to keep declining but at a slower pace than earlier projections implied.' },
  { id: 49, date: '2026-09-04', source: 'Orbital Science', category: 'Science', polarity: 0.56, subjectivity: 0.29,
    headline: 'Brasilia agency reports lower deforestation alerts for the quarter',
    summary: 'Satellite alerts compiled by a Brasilia agency showed fewer deforestation warnings this quarter compared with the same period last year. Cloud cover limited coverage in two states. The agency said the trend requires another quarter to confirm.' },
  { id: 50, date: '2026-09-03', source: 'Northgate Press', category: 'Politics', polarity: -0.18, subjectivity: 0.54,
    headline: 'Bogota council delays vote on transport financing plan',
    summary: 'The Bogota council postponed a vote on a transport financing plan after amendments were tabled late. Officials said the delay would not affect construction already underway. A revised text is expected within two weeks.' },
  { id: 51, date: '2026-09-02', source: 'Terminal Sports', category: 'Sports', polarity: 0.51, subjectivity: 0.70,
    headline: 'Santiago venue completes renovation ahead of continental fixtures',
    summary: 'A Santiago venue finished renovation work ahead of continental fixtures, adding seating and upgrading the playing surface. The first match is scheduled for later this month. Organisers said capacity will be phased in over three events.' },
  { id: 52, date: '2026-09-01', source: 'Meridian Wire', category: 'Business', polarity: -0.47, subjectivity: 0.28,
    headline: 'Lima copper output dips on scheduled mill maintenance',
    summary: 'Copper output reported from Lima-listed operations fell for the month on scheduled mill maintenance at two sites. Guidance for the year was left unchanged. Producers said grades are expected to improve in the fourth quarter.' },

  // ---- Sub-Saharan Africa --------------------------------------------------
  { id: 53, date: '2026-09-05', source: 'Ledger Daily', category: 'Business', polarity: 0.31, subjectivity: 0.24,
    headline: 'Nairobi exchange sees higher turnover as listings resume',
    summary: 'Turnover on the Nairobi exchange rose as two listings came to market after a long drought. Foreign participation remained below historical averages. Brokers said the pipeline for the fourth quarter looks stronger than the first half.' },
  { id: 54, date: '2026-09-04', source: 'Signal Tech', category: 'Technology', polarity: 0.42, subjectivity: 0.33,
    headline: 'Lagos landing station adds capacity on new subsea route',
    summary: 'A Lagos landing station brought additional capacity into service on a new subsea route. Wholesale transit prices have declined over the past year. Operators said inland backhaul remains the main constraint on retail speeds.' },
  { id: 55, date: '2026-09-03', source: 'Harbour Report', category: 'Defense', polarity: -0.55, subjectivity: 0.40,
    headline: 'Khartoum aid access remains limited despite corridor agreement',
    summary: 'Relief agencies said access around Khartoum remains limited despite an agreement on humanitarian corridors. Convoy clearances are being issued slowly. Agencies warned that prepositioning ahead of the next season is falling behind schedule.' },
  { id: 56, date: '2026-09-02', source: 'Northgate Press', category: 'Politics', polarity: 0.14, subjectivity: 0.48,
    headline: 'Addis Ababa announces timetable for regional consultations',
    summary: 'Officials in Addis Ababa published a timetable for regional consultations ahead of a national dialogue process. Several groups have not yet confirmed participation. Facilitators said the schedule allows for extension if attendance is incomplete.' },
  { id: 57, date: '2026-09-01', source: 'Orbital Science', category: 'Science', polarity: 0.46, subjectivity: 0.30,
    headline: 'Cape Town group publishes long-term kelp forest survey',
    summary: 'Marine biologists in Cape Town released results from a long-term kelp forest survey covering twelve sites. Two sites showed decline linked to warming events. The dataset and imagery archive have been made publicly available.' },
];

// --- Design tokens -----------------------------------------------------------
// Hue carries one meaning in this interface: region. Nothing else is coloured.
const T = {
  paper: '#EDF0F4', panel: '#FFFFFF', ink: '#10141B',
  muted: '#5C6675', faint: '#8B94A3', rule: '#D6DBE4', sea: '#E2E7EE',
};

const REGION_COLOR = {
  'North America': '#2F5FB0',
  'Latin America': '#0E8A6B',
  'Europe': '#6B4CC4',
  'Russia & Eurasia': '#B06A12',
  'Middle East & N. Africa': '#C0433F',
  'Sub-Saharan Africa': '#6E8A16',
  'South Asia': '#AE3585',
  'East Asia & Pacific': '#1785A8',
};
const REGION_ORDER = Object.keys(REGION_COLOR);

// --- Gazetteer ---------------------------------------------------------------
// term -> [region, dateline city]. Countries and demonyms carry a capital so a
// story still lands somewhere on the map when no city is named. To widen
// coverage, add rows here; the components need no changes.
const PLACES = {
  Washington: ['North America', 'Washington'], 'New York': ['North America', 'New York'],
  'San Francisco': ['North America', 'San Francisco'], Ottawa: ['North America', 'Ottawa'],
  Canada: ['North America', 'Ottawa'], Canadian: ['North America', 'Ottawa'],
  'Mexico City': ['North America', 'Mexico City'], Mexico: ['North America', 'Mexico City'],
  'United States': ['North America', 'Washington'], American: ['North America', 'Washington'],

  Brasilia: ['Latin America', 'Brasilia'], Brazil: ['Latin America', 'Brasilia'],
  'Buenos Aires': ['Latin America', 'Buenos Aires'], Argentina: ['Latin America', 'Buenos Aires'],
  Bogota: ['Latin America', 'Bogota'], Colombia: ['Latin America', 'Bogota'],
  Caracas: ['Latin America', 'Caracas'], Santiago: ['Latin America', 'Santiago'],
  Chile: ['Latin America', 'Santiago'], Lima: ['Latin America', 'Lima'],
  Peru: ['Latin America', 'Lima'], Havana: ['Latin America', 'Havana'],

  London: ['Europe', 'London'], Brussels: ['Europe', 'Brussels'], Paris: ['Europe', 'Paris'],
  Berlin: ['Europe', 'Berlin'], Madrid: ['Europe', 'Madrid'], Rome: ['Europe', 'Rome'],
  Warsaw: ['Europe', 'Warsaw'], Stockholm: ['Europe', 'Stockholm'], Swedish: ['Europe', 'Stockholm'],
  Helsinki: ['Europe', 'Helsinki'], Athens: ['Europe', 'Athens'], Rotterdam: ['Europe', 'Rotterdam'],
  German: ['Europe', 'Berlin'], French: ['Europe', 'Paris'],

  Kyiv: ['Russia & Eurasia', 'Kyiv'], Ukraine: ['Russia & Eurasia', 'Kyiv'],
  Ukrainian: ['Russia & Eurasia', 'Kyiv'], Moscow: ['Russia & Eurasia', 'Moscow'],
  Russia: ['Russia & Eurasia', 'Moscow'], Russian: ['Russia & Eurasia', 'Moscow'],
  Minsk: ['Russia & Eurasia', 'Minsk'], Tbilisi: ['Russia & Eurasia', 'Tbilisi'],
  Astana: ['Russia & Eurasia', 'Astana'], Kazakhstan: ['Russia & Eurasia', 'Astana'],

  Jerusalem: ['Middle East & N. Africa', 'Jerusalem'], Gaza: ['Middle East & N. Africa', 'Gaza'],
  Beirut: ['Middle East & N. Africa', 'Beirut'], Damascus: ['Middle East & N. Africa', 'Damascus'],
  Baghdad: ['Middle East & N. Africa', 'Baghdad'], Tehran: ['Middle East & N. Africa', 'Tehran'],
  Riyadh: ['Middle East & N. Africa', 'Riyadh'], Dubai: ['Middle East & N. Africa', 'Dubai'],
  Doha: ['Middle East & N. Africa', 'Doha'], Qatar: ['Middle East & N. Africa', 'Doha'],
  Ankara: ['Middle East & N. Africa', 'Ankara'], Cairo: ['Middle East & N. Africa', 'Cairo'],
  Egyptian: ['Middle East & N. Africa', 'Cairo'], Tripoli: ['Middle East & N. Africa', 'Tripoli'],
  Algiers: ['Middle East & N. Africa', 'Algiers'], Rabat: ['Middle East & N. Africa', 'Rabat'],
  Sanaa: ['Middle East & N. Africa', 'Sanaa'], Tunis: ['Middle East & N. Africa', 'Tunis'],

  Lagos: ['Sub-Saharan Africa', 'Lagos'], Abuja: ['Sub-Saharan Africa', 'Abuja'],
  Nairobi: ['Sub-Saharan Africa', 'Nairobi'], 'Addis Ababa': ['Sub-Saharan Africa', 'Addis Ababa'],
  Khartoum: ['Sub-Saharan Africa', 'Khartoum'], Johannesburg: ['Sub-Saharan Africa', 'Johannesburg'],
  'Cape Town': ['Sub-Saharan Africa', 'Cape Town'], Kinshasa: ['Sub-Saharan Africa', 'Kinshasa'],
  Accra: ['Sub-Saharan Africa', 'Accra'], Dakar: ['Sub-Saharan Africa', 'Dakar'],

  'New Delhi': ['South Asia', 'New Delhi'], Mumbai: ['South Asia', 'Mumbai'],
  Islamabad: ['South Asia', 'Islamabad'], Dhaka: ['South Asia', 'Dhaka'],
  Kabul: ['South Asia', 'Kabul'], Colombo: ['South Asia', 'Colombo'],

  Beijing: ['East Asia & Pacific', 'Beijing'], Shanghai: ['East Asia & Pacific', 'Shanghai'],
  'Hong Kong': ['East Asia & Pacific', 'Hong Kong'], Taipei: ['East Asia & Pacific', 'Taipei'],
  Tokyo: ['East Asia & Pacific', 'Tokyo'], Seoul: ['East Asia & Pacific', 'Seoul'],
  Pyongyang: ['East Asia & Pacific', 'Pyongyang'], Singapore: ['East Asia & Pacific', 'Singapore'],
  Jakarta: ['East Asia & Pacific', 'Jakarta'], Indonesian: ['East Asia & Pacific', 'Jakarta'],
  Bangkok: ['East Asia & Pacific', 'Bangkok'], Hanoi: ['East Asia & Pacific', 'Hanoi'],
  Manila: ['East Asia & Pacific', 'Manila'], Philippine: ['East Asia & Pacific', 'Manila'],
  Canberra: ['East Asia & Pacific', 'Canberra'], Australian: ['East Asia & Pacific', 'Canberra'],
  Sydney: ['East Asia & Pacific', 'Sydney'], Wellington: ['East Asia & Pacific', 'Wellington'],
};
// Longest first, so "New Delhi" beats a stray "New" and "Hong Kong" stays intact.
const PLACE_TERMS = Object.keys(PLACES).sort((a, b) => b.length - a.length);
const hitTerm = text => PLACE_TERMS.find(t => new RegExp(`\\b${t}\\b`, 'i').test(text));

// Datelines live in the headline, so it is searched first and the summary is only
// a fallback. Without that order a demonym in the body outranks the named city.
function geotag(a) {
  const term = hitTerm(a.headline) || hitTerm(a.summary);
  if (!term) return { ...a, region: 'Unplaced', place: null };
  const [region, city] = PLACES[term];
  return { ...a, region, place: WORLD.cities[city] ? city : null };
}

// --- Reading the sentiment scores as something a person can filter on ---------
const toneOf = p => (p <= -0.15 ? 'Critical' : p >= 0.15 ? 'Favourable' : 'Neutral');
const styleOf = s => (s < 0.35 ? 'Reported' : s > 0.55 ? 'Opinion' : 'Mixed');
const TONES = ['Critical', 'Neutral', 'Favourable'];
const STYLES = ['Reported', 'Mixed', 'Opinion'];

// Ordinary English plus the reporting boilerplate that otherwise wins every day:
// "several", "citing" and "expected" say nothing about what actually happened.
const STOP = new Set(`the a an and or but of to in on for with by from at as is are was were be been
being it its this that these those has have had will would could should may might can not no more
than then so such over under after before during between into out up down off about again once new
their his her they them we you your our some any all each both either neither what which who whom
whose when where why how if because through against without within across around near next previous
while still yet already just only very much many most other others two three four five first second
third last year years month months week weeks day days time times today
said say says according also report reports reported reporting announce announced announcement
cite citing cited expect expects expected expecting publish published publishes begin began begins
continue continued continues complete completed completes include includes including follow follows
following followed remain remains remained hold holds held rise rose rises fall falls fell slip
slips add adds added set sets setting take takes taken give gives given make makes made making
several additional further overall largest main recent current unchanged steady modest
ask asks asked seek seeks sought call calls called note noted notes show shows showed
quarter official officials government governments company companies group groups
country countries city cities state states national international regional
plan plans planned planning decision decisions process processes review reviews reviewed
meeting meetings session sessions round rounds term terms part parts work works place places
number numbers figure figures level levels total average result results outcome
percent cent point points pending ahead compared previously respectively
analysts economists observers operators authorities`.split(/\s+/));

// Weighted toward the headline, where the subject of a story actually lives.
// n stays the count of distinct stories, so the tooltip number means something.
function topWords(articles, limit = 34) {
  const bag = new Map();
  for (const a of articles) {
    const head = new Set(a.headline.toLowerCase().match(/[a-z][a-z'-]{2,}/g) || []);
    const seen = new Set();
    for (const raw of `${a.headline} ${a.summary}`.toLowerCase().match(/[a-z][a-z'-]{2,}/g) || []) {
      const w = raw.replace(/['-]+$/, '');
      if (w.length < 4 || STOP.has(w) || seen.has(w)) continue;
      seen.add(w);
      const e = bag.get(w) || { word: w, n: 0, score: 0, pol: 0, regions: {} };
      e.n += 1;
      e.score += head.has(w) ? 3 : 1;
      e.pol += a.polarity;
      e.regions[a.region] = (e.regions[a.region] || 0) + 1;
      bag.set(w, e);
    }
  }
  return [...bag.values()]
    .filter(e => e.n > 1)
    .map(e => ({
      word: e.word, n: e.n, score: e.score, pol: e.pol / e.n,
      region: Object.entries(e.regions).sort((x, y) => y[1] - x[1])[0][0],
    }))
    .sort((a, b) => b.score - a.score || b.n - a.n || a.word.localeCompare(b.word))
    .slice(0, limit);
}

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setR(m.matches);
    on(); m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return r;
}

// -----------------------------------------------------------------------------
// Word drift.
// The band is a sentiment axis: a word settles high when the stories carrying it
// read favourably and sinks when they read critically. Size is how often it
// appears, and that also sets its depth — frequent words sit nearer, drift
// faster and print sharper. Colour is the region the word is most at home in.
// -----------------------------------------------------------------------------
function WordDrift({ words, active, onPick }) {
  const box = useRef(null);
  const nodes = useRef({});
  const sim = useRef([]);
  const pointer = useRef({ x: -1e4, y: -1e4 });
  const [hover, setHover] = useState(null);
  const reduced = useReducedMotion();
  const H = 232;

  const sized = useMemo(() => {
    if (!words.length) return [];
    const hi = words[0].n, lo = words[words.length - 1].n;
    const span = Math.max(1, hi - lo);
    return words.map((w, i) => {
      const z = (w.n - lo) / span;                    // 0 far … 1 near
      return {
        ...w, z,
        size: 13 + z * 27,
        band: 0.86 - (Math.max(-0.7, Math.min(0.7, w.pol)) + 0.7) / 1.4 * 0.72,
        seed: i,
      };
    });
  }, [words]);

  // Seed positions once per word set, preserving x for words that survive a filter.
  useEffect(() => {
    const W = box.current ? box.current.clientWidth : 900;
    const prev = new Map(sim.current.map(s => [s.word, s]));
    sim.current = sized.map((w, i) => {
      const old = prev.get(w.word);
      return {
        word: w.word,
        x: old ? old.x : (i / Math.max(1, sized.length)) * W + Math.random() * 60,
        baseY: w.band * H,
        speed: 4 + w.z * 15,                          // px per second
        bobAmp: 5 + (1 - w.z) * 12,
        bobFreq: 0.18 + Math.random() * 0.22,
        phase: Math.random() * Math.PI * 2,
        ox: 0, oy: 0, w: 80, paused: false,
      };
    });
  }, [sized]);

  useEffect(() => {
    let raf, last = performance.now();
    const tick = now => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const t = now / 1000;
      const W = box.current ? box.current.clientWidth : 900;
      sim.current.forEach(s => {
        const el = nodes.current[s.word];
        if (!el) return;
        if (!s.w) s.w = el.offsetWidth || 80;
        if (!reduced && !s.paused) s.x -= s.speed * dt;
        if (s.x < -s.w - 20) s.x = W + Math.random() * 120;
        if (s.x > W + 140) s.x = -s.w;

        const bob = reduced ? 0 : Math.sin(t * s.bobFreq * Math.PI + s.phase) * s.bobAmp;
        const cx = s.x + s.w / 2, cy = s.baseY + bob;
        const dx = cx - pointer.current.x, dy = cy - pointer.current.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16900 && d2 > 1) {                   // nudge away from the cursor
          const d = Math.sqrt(d2), f = (130 - d) / 130 * 22;
          s.ox += (dx / d) * f * dt * 6;
          s.oy += (dy / d) * f * dt * 6;
        }
        s.ox *= 0.90; s.oy *= 0.90;
        el.style.transform = `translate3d(${(s.x + s.ox).toFixed(1)}px,${(cy + s.oy).toFixed(1)}px,0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [sized, reduced]);

  const lead = sized[0];

  return (
    <section className="drift-wrap">
      <div className="drift-side">
        <p className="drift-kicker">Word of the day</p>
        <p className="drift-lead" style={{ color: lead ? REGION_COLOR[lead.region] || T.ink : T.ink }}>
          {lead ? lead.word : '—'}
        </p>
        <p className="drift-note">
          {lead ? `In ${lead.n} stories today, most of them ${lead.region.toLowerCase()}.` : 'No stories match these filters.'}
        </p>
        <p className="drift-hint">Words rise as coverage turns favourable and sink as it turns critical. Pick one to filter the feed.</p>
      </div>

      <div
        ref={box}
        className="drift-field"
        style={{ height: H }}
        onPointerMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top };
        }}
        onPointerLeave={() => { pointer.current = { x: -1e4, y: -1e4 }; }}
      >
        <span className="drift-axis drift-axis-hi">favourable</span>
        <span className="drift-axis drift-axis-lo">critical</span>
        <div className="drift-mid" />
        {sized.map(w => {
          const on = active === w.word;
          const pause = p => { const s = sim.current.find(x => x.word === w.word); if (s) s.paused = p; };
          return (
            <button
              key={w.word}
              ref={el => { if (el) nodes.current[w.word] = el; else delete nodes.current[w.word]; }}
              className={`drift-word${on ? ' is-on' : ''}`}
              style={{
                fontSize: w.size,
                color: REGION_COLOR[w.region] || T.muted,
                opacity: on ? 1 : 0.42 + w.z * 0.5,
                filter: w.z > 0.45 || on ? 'none' : `blur(${((0.45 - w.z) * 2).toFixed(2)}px)`,
                fontWeight: 400 + Math.round(w.z * 3) * 100,
              }}
              onMouseEnter={() => { setHover(w.word); pause(true); }}
              onMouseLeave={() => { setHover(null); pause(false); }}
              onFocus={() => pause(true)}
              onBlur={() => pause(false)}
              onClick={() => onPick(on ? null : w.word)}
              title={`${w.word} — ${w.n} stories`}
            >
              {w.word}
              {(hover === w.word || on) && <em className="drift-count">{w.n}</em>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// World map. Regions are the click target; each carries a volume bubble and a
// dot for every story with a dateline we could place.
// -----------------------------------------------------------------------------
function WorldMap({ articles, selected, onToggle, mode }) {
  const [hover, setHover] = useState(null);

  const stats = useMemo(() => {
    const m = {};
    REGION_ORDER.forEach(r => (m[r] = { n: 0, pol: 0, cats: {} }));
    articles.forEach(a => {
      const s = m[a.region]; if (!s) return;
      s.n += 1; s.pol += a.polarity;
      s.cats[a.category] = (s.cats[a.category] || 0) + 1;
    });
    Object.values(m).forEach(s => {
      s.mean = s.n ? s.pol / s.n : 0;
      s.top = Object.entries(s.cats).sort((a, b) => b[1] - a[1])[0];
    });
    return m;
  }, [articles]);

  const max = Math.max(1, ...Object.values(stats).map(s => s.n));

  // Spread overlapping datelines around their city so nothing hides.
  const dots = useMemo(() => {
    const used = {};
    return articles.filter(a => a.place && WORLD.cities[a.place]).map(a => {
      const [x, y] = WORLD.cities[a.place];
      const k = used[a.place] = (used[a.place] || 0) + 1;
      const ang = k * 2.4, rad = k === 1 ? 0 : 3.2 + k * 0.9;
      return { id: a.id, region: a.region, headline: a.headline, place: a.place,
        x: x + Math.cos(ang) * rad, y: y + Math.sin(ang) * rad };
    });
  }, [articles]);

  const toneFill = m => {
    const t = Math.max(-0.5, Math.min(0.5, m)) / 0.5;
    return t < 0
      ? `rgba(192,67,63,${(0.10 + Math.abs(t) * 0.55).toFixed(2)})`
      : `rgba(14,138,107,${(0.10 + t * 0.55).toFixed(2)})`;
  };

  return (
    <div className="map-wrap">
      <svg viewBox={`0 0 ${WORLD.W} ${WORLD.H}`} className="map-svg" role="img"
        aria-label="World map of article volume by region">
        <rect x="0" y="0" width={WORLD.W} height={WORLD.H} fill={T.sea} />
        {WORLD.regions.map(r => {
          const on = selected.includes(r.name);
          const dim = selected.length > 0 && !on;
          const c = REGION_COLOR[r.name];
          const s = stats[r.name] || { n: 0, mean: 0 };
          const fill = mode === 'tone' ? toneFill(s.mean)
            : on ? c : hover === r.name ? `${c}AA` : `${c}66`;
          return (
            <path
              key={r.name} d={r.d} fill={fill}
              stroke={mode === 'tone' ? '#9AA5B5' : on ? '#0B0F16' : '#FFFFFF'}
              strokeWidth={on ? 1.4 : 0.7}
              opacity={dim ? 0.34 : 1}
              className="map-region" tabIndex={0} role="button"
              aria-pressed={on} aria-label={`${r.name}, ${s.n} stories`}
              onMouseEnter={() => setHover(r.name)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(r.name)}
              onBlur={() => setHover(null)}
              onClick={() => onToggle(r.name)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(r.name); } }}
            />
          );
        })}

        {dots.map(d => (
          <circle key={d.id} cx={d.x} cy={d.y} r="2.6" fill="#0B0F16" fillOpacity="0.62"
            stroke="#FFFFFF" strokeWidth="0.8" className="map-dot">
            <title>{`${d.place} — ${d.headline}`}</title>
          </circle>
        ))}

        {mode === 'volume' && WORLD.regions.map(r => {
          const s = stats[r.name] || { n: 0 };
          if (!s.n) return null;
          const rad = 9 + Math.sqrt(s.n / max) * 21;
          const on = selected.includes(r.name);
          return (
            <g key={`b${r.name}`} className="map-bubble" onClick={() => onToggle(r.name)}
              onMouseEnter={() => setHover(r.name)} onMouseLeave={() => setHover(null)}>
              <circle cx={r.anchor[0]} cy={r.anchor[1]} r={rad}
                fill={REGION_COLOR[r.name]} fillOpacity={on ? 0.95 : 0.82}
                stroke="#FFFFFF" strokeWidth="1.6" />
              <text x={r.anchor[0]} y={r.anchor[1]} className="map-bubble-n"
                textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: Math.max(12, rad * 0.82) }}>{s.n}</text>
            </g>
          );
        })}
      </svg>

      {hover && stats[hover] && (
        <div className="map-tip">
          <span className="map-tip-dot" style={{ background: REGION_COLOR[hover] }} />
          <strong>{hover}</strong>
          <span>{stats[hover].n} {stats[hover].n === 1 ? 'story' : 'stories'}</span>
          {stats[hover].top && <span>mostly {stats[hover].top[0].toLowerCase()}</span>}
          <span>{toneOf(stats[hover].mean).toLowerCase()} on balance</span>
        </div>
      )}

      {mode === 'tone' && (
        <div className="map-legend">
          <span>critical</span>
          <i style={{ background: 'linear-gradient(90deg,rgba(192,67,63,.65),rgba(220,224,230,.5),rgba(14,138,107,.65))' }} />
          <span>favourable</span>
        </div>
      )}
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Public+Sans:ital,wght@0,300..800;1,400&display=swap');

.app {
  --paper:#EDF0F4; --panel:#fff; --ink:#10141B; --muted:#5C6675; --faint:#8B94A3;
  --rule:#D6DBE4;
  --display:'Bricolage Grotesque','Public Sans',system-ui,sans-serif;
  --body:'Public Sans',system-ui,-apple-system,'Segoe UI',sans-serif;
  background:var(--paper); color:var(--ink); font-family:var(--body);
  font-size:15px; line-height:1.5; min-height:100%;
  padding:28px clamp(14px,4vw,44px) 64px;
  -webkit-font-smoothing:antialiased;
}
.app *{box-sizing:border-box;}
.app h1,.app h2,.app h3{margin:0; font-weight:600;}
.app p{margin:0;}
.app button{font:inherit; cursor:pointer;}
.app :focus-visible{outline:2px solid var(--ink); outline-offset:2px; border-radius:2px;}

/* masthead */
.mast{display:grid; grid-template-columns:1fr auto; gap:12px 32px; align-items:end;
  padding-bottom:16px; border-bottom:2px solid var(--ink);}
.mast-id h1{font-family:var(--display); font-size:clamp(30px,5.2vw,52px);
  font-weight:800; letter-spacing:-0.028em; line-height:0.95;}
.mast-sub{color:var(--muted); font-size:15px; margin-top:6px;}
.mast-stats{display:flex; gap:26px; margin:0;}
.mast-stats div{text-align:right;}
.mast-stats dt{font-size:11.5px; color:var(--faint); letter-spacing:0.02em;}
.mast-stats dd{margin:1px 0 0; font-family:var(--display); font-size:23px;
  font-weight:700; font-variant-numeric:tabular-nums; letter-spacing:-0.02em;}
.mast-badge{grid-column:1/-1; font-size:12px; color:var(--muted);
  background:#fff; border:1px solid var(--rule); border-left:3px solid #B06A12;
  padding:5px 10px; border-radius:3px; justify-self:start;}

/* word drift */
.drift-wrap{display:grid; grid-template-columns:250px 1fr; gap:26px;
  margin:24px 0 0; padding:20px 0 22px; border-bottom:1px solid var(--rule);}
.drift-kicker{font-size:12px; color:var(--faint);}
.drift-lead{font-family:var(--display); font-size:clamp(32px,4.6vw,50px);
  font-weight:800; letter-spacing:-0.03em; line-height:1; margin-top:2px;}
.drift-note{font-size:13.5px; color:var(--muted); margin-top:8px;}
.drift-hint{font-size:12.5px; color:var(--faint); margin-top:12px; max-width:30ch;}
.drift-field{position:relative; overflow:hidden; border-radius:4px;
  background:linear-gradient(180deg,#F6F8FA,#E6EAF0); border:1px solid var(--rule);}
.drift-mid{position:absolute; left:0; right:0; top:50%; border-top:1px dashed #C6CDD8;}
.drift-axis{position:absolute; left:9px; font-size:10.5px; color:var(--faint);
  letter-spacing:0.03em; pointer-events:none;}
.drift-axis-hi{top:7px;} .drift-axis-lo{bottom:7px;}
.drift-word{position:absolute; top:0; left:0; will-change:transform;
  background:none; border:0; padding:0 3px; white-space:nowrap;
  font-family:var(--display); letter-spacing:-0.02em; line-height:1;
  transition:opacity .18s, filter .18s;}
.drift-word:hover,.drift-word.is-on{opacity:1 !important; filter:none !important;}
.drift-word.is-on{text-decoration:underline; text-underline-offset:4px; text-decoration-thickness:2px;}
.drift-count{font-family:var(--body); font-style:normal; font-size:10.5px;
  font-weight:600; vertical-align:super; margin-left:3px; opacity:.75;}

/* map + rail */
.stage{display:grid; grid-template-columns:minmax(0,1fr) 290px; gap:26px; margin:22px 0 0;}
.stage-head{display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;}
.stage-head h2,.rail-h{font-family:var(--display); font-size:19px;
  font-weight:700; letter-spacing:-0.015em;}
.seg{display:inline-flex; border:1px solid var(--rule); border-radius:3px; overflow:hidden; background:#fff;}
.seg button{border:0; background:none; padding:5px 13px; font-size:12.5px; color:var(--muted);}
.seg button.is-on{background:var(--ink); color:#fff;}
.map-wrap{position:relative; background:#fff; border:1px solid var(--rule); border-radius:4px;}
.map-svg{display:block; width:100%; height:auto; border-radius:3px;}
.map-region{cursor:pointer; transition:fill .16s, opacity .16s;}
.map-bubble{cursor:pointer;}
.map-bubble-n{fill:#fff; font-family:var(--display); font-weight:700;
  font-variant-numeric:tabular-nums; pointer-events:none;}
.map-dot{pointer-events:auto;}
.stage-foot{font-size:12px; color:var(--faint); margin-top:8px;}
.map-tip{position:absolute; left:10px; bottom:10px; display:flex; gap:9px; align-items:center;
  flex-wrap:wrap; background:var(--ink); color:#fff; font-size:12.5px;
  padding:7px 12px; border-radius:3px; pointer-events:none; max-width:calc(100% - 20px);}
.map-tip span:not(.map-tip-dot){color:#B9C2D0;}
.map-tip strong{font-weight:600;}
.map-tip-dot{width:9px; height:9px; border-radius:50%; flex:none;}
.map-legend{position:absolute; right:10px; bottom:10px; display:flex; gap:7px;
  align-items:center; font-size:11px; color:var(--muted); background:#fff;
  padding:4px 9px; border:1px solid var(--rule); border-radius:3px;}
.map-legend i{width:80px; height:8px; border-radius:2px; display:block;}

.rail-h{margin-bottom:10px;}
.bars{list-style:none; margin:0; padding:0;}
.bars li + li{margin-top:2px;}
.bar{display:grid; grid-template-columns:1fr 74px 26px; gap:9px; align-items:center;
  width:100%; text-align:left; background:none; border:0; padding:6px 7px;
  border-radius:3px; font-size:12.5px; color:var(--muted);}
.bar:hover{background:#fff;}
.bar.is-on{background:#fff; color:var(--ink); box-shadow:inset 0 0 0 1px var(--rule);}
.bar-name{overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
.bar-track{height:7px; background:#DFE4EB; border-radius:1px; overflow:hidden;}
.bar-fill{display:block; height:100%; border-radius:1px; transition:width .3s;}
.bar-n{text-align:right; font-variant-numeric:tabular-nums; font-weight:600;}

/* facets */
.facets{display:grid; grid-template-columns:repeat(auto-fit,minmax(215px,1fr)); gap:16px 26px;
  margin:26px 0 0; padding:18px 0; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule);}
.facet-h{font-size:11.5px; color:var(--faint); font-weight:500; margin-bottom:8px;}
.facet-row{display:flex; flex-wrap:wrap; gap:5px;}
.chip{display:inline-flex; align-items:center; gap:5px; background:#fff;
  border:1px solid var(--rule); border-radius:14px; padding:3.5px 10px;
  font-size:12.5px; color:var(--muted); transition:.14s;}
.chip:hover:not(:disabled){border-color:var(--ink); color:var(--ink);}
.chip.is-on{background:var(--ink); border-color:var(--ink); color:#fff;}
.chip.is-empty{opacity:.38; cursor:not-allowed;}
.chip em{font-style:normal; font-size:11px; opacity:.62; font-variant-numeric:tabular-nums;}
.chip-dot{width:7px; height:7px; border-radius:50%;}
.chip-word{border-radius:14px;}

/* results */
.results-head{display:flex; justify-content:space-between; align-items:center;
  gap:14px; flex-wrap:wrap; margin:20px 0 14px;}
.results-n{font-size:14px; color:var(--muted);}
.results-n strong{font-family:var(--display); font-size:20px; color:var(--ink);
  font-variant-numeric:tabular-nums;}
.results-tools{display:flex; gap:12px; align-items:center; flex-wrap:wrap;}
.sort{font-size:12.5px; color:var(--faint); display:inline-flex; gap:6px; align-items:center;}
.sort select{font:inherit; font-size:12.5px; color:var(--ink); background:#fff;
  border:1px solid var(--rule); border-radius:3px; padding:3px 6px;}
.link-btn{background:none; border:0; padding:0; font-size:12.5px; color:var(--muted);
  text-decoration:underline; text-underline-offset:3px;}
.link-btn:hover{color:var(--ink);}

.feed{display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:14px;}
.card{display:flex; background:#fff; border:1px solid var(--rule); border-radius:4px;
  overflow:hidden;}
.card-edge{width:4px; flex:none;}
.card-body{padding:14px 16px 15px; display:flex; flex-direction:column; gap:7px;}
.card-meta{display:flex; flex-wrap:wrap; gap:9px; align-items:baseline;
  font-size:11.5px; color:var(--faint);}
.card-region{font-weight:600;}
.card-cat{background:var(--paper); border-radius:2px; padding:1px 6px; color:var(--muted);}
.card-h{font-size:16.5px; font-weight:600; line-height:1.28; letter-spacing:-0.008em;}
.card-sum{font-size:13.5px; color:var(--muted); line-height:1.52; max-width:66ch;}
.tone{display:flex; align-items:center; gap:9px; margin-top:auto; padding-top:4px;}
.tone-track{position:relative; width:78px; height:5px; background:#E4E8EE;
  border-radius:1px; flex:none;}
.tone-fill{position:absolute; top:0; height:100%; border-radius:1px;}
.tone-zero{position:absolute; left:50%; top:-2px; bottom:-2px; width:1px; background:#B9C2D0;}
.tone-label{font-size:11px; color:var(--faint);}

.empty{background:#fff; border:1px solid var(--rule); border-radius:4px;
  padding:34px; text-align:center; color:var(--muted); display:grid; gap:12px; justify-items:center;}
.foot{margin-top:34px; padding-top:16px; border-top:1px solid var(--rule);
  font-size:12px; color:var(--faint); display:grid; gap:7px; max-width:78ch;}
.foot code{background:#fff; border:1px solid var(--rule); border-radius:2px;
  padding:0 4px; font-size:11.5px;}

@media (max-width:980px){
  .stage{grid-template-columns:1fr;}
  .mast{grid-template-columns:1fr;}
  .mast-stats{justify-content:flex-start; gap:22px;}
  .mast-stats div{text-align:left;}
}
@media (max-width:700px){
  .drift-wrap{grid-template-columns:1fr; gap:16px;}
  .drift-hint{max-width:none;}
  .feed{grid-template-columns:1fr;}
}
@media (prefers-reduced-motion:reduce){
  .app *{transition-duration:.01ms !important;}
}
`;

// -----------------------------------------------------------------------------
function Facet({ label, values, selected, counts, onToggle, colorize }) {
  return (
    <div className="facet">
      <h3 className="facet-h">{label}</h3>
      <div className="facet-row">
        {values.map(v => {
          const on = selected.includes(v);
          const n = counts[v] || 0;
          return (
            <button key={v} className={`chip${on ? ' is-on' : ''}${n ? '' : ' is-empty'}`}
              disabled={!n && !on} onClick={() => onToggle(v)} aria-pressed={on}
              style={on && colorize ? { background: REGION_COLOR[v], borderColor: REGION_COLOR[v], color: '#fff' } : undefined}>
              {colorize && !on && <i className="chip-dot" style={{ background: REGION_COLOR[v] }} />}
              {v}<em>{n}</em>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ToneBar({ polarity, subjectivity }) {
  const p = Math.max(-1, Math.min(1, polarity));
  const w = Math.abs(p) * 50;
  return (
    <span className="tone" title={`polarity ${p.toFixed(2)} · subjectivity ${subjectivity.toFixed(2)}`}>
      <span className="tone-track">
        <span className="tone-fill" style={{
          left: p < 0 ? `${50 - w}%` : '50%', width: `${w}%`,
          background: p < 0 ? '#C0433F' : '#0E8A6B',
        }} />
        <span className="tone-zero" />
      </span>
      <span className="tone-label">{toneOf(p).toLowerCase()} · {styleOf(subjectivity).toLowerCase()}</span>
    </span>
  );
}

function ArticleCard({ a }) {
  const c = REGION_COLOR[a.region] || T.faint;
  return (
    <article className="card">
      <span className="card-edge" style={{ background: c }} />
      <div className="card-body">
        <div className="card-meta">
          <span className="card-region" style={{ color: c }}>
            {a.place ? `${a.place} — ${a.region}` : a.region}
          </span>
          <span className="card-cat">{a.category}</span>
          <time dateTime={a.date}>{new Date(a.date + 'T00:00:00').toLocaleDateString(undefined,
            { month: 'short', day: 'numeric' })}</time>
          <span className="card-src">{a.source}</span>
        </div>
        <h3 className="card-h">{a.headline}</h3>
        <p className="card-sum">{a.summary}</p>
        <ToneBar polarity={a.polarity} subjectivity={a.subjectivity} />
      </div>
    </article>
  );
}

// -----------------------------------------------------------------------------
export default function App() {
  const all = useMemo(() => ARTICLES.map(geotag), []);
  const [f, setF] = useState({ region: [], category: [], tone: [], style: [], source: [] });
  const [word, setWord] = useState(null);
  const [mapMode, setMapMode] = useState('volume');
  const [sort, setSort] = useState('newest');

  const CATEGORIES = useMemo(() => [...new Set(all.map(a => a.category))].sort(), [all]);
  const SOURCES = useMemo(() => [...new Set(all.map(a => a.source))].sort(), [all]);

  const matches = useCallback((a, skip, ignoreWord) => {
    const k = { region: a.region, category: a.category, tone: toneOf(a.polarity), style: styleOf(a.subjectivity), source: a.source };
    for (const key of Object.keys(f)) {
      if (key === skip) continue;
      if (f[key].length && !f[key].includes(k[key])) return false;
    }
    if (!ignoreWord && word) {
      if (!new RegExp(`\\b${word}`, 'i').test(`${a.headline} ${a.summary}`)) return false;
    }
    return true;
  }, [f, word]);

  const listed = useMemo(() => {
    const out = all.filter(a => matches(a, null, false));
    return out.sort((x, y) => sort === 'newest' ? y.date.localeCompare(x.date) || x.id - y.id
      : sort === 'critical' ? x.polarity - y.polarity
        : y.polarity - x.polarity);
  }, [all, matches, sort]);

  // The map keeps every region visible so you can see where else the story is.
  const mapped = useMemo(() => all.filter(a => matches(a, 'region', false)), [all, matches]);
  // The drift ignores its own word filter, otherwise picking a word empties it.
  const drift = useMemo(() => topWords(all.filter(a => matches(a, null, true))), [all, matches]);

  const countsFor = key => {
    const c = {};
    all.forEach(a => {
      if (!matches(a, key, false)) return;
      const v = key === 'region' ? a.region : key === 'category' ? a.category
        : key === 'tone' ? toneOf(a.polarity) : key === 'style' ? styleOf(a.subjectivity) : a.source;
      c[v] = (c[v] || 0) + 1;
    });
    return c;
  };

  const toggle = (key, v) => setF(s => ({
    ...s, [key]: s[key].includes(v) ? s[key].filter(x => x !== v) : [...s[key], v],
  }));

  const activeCount = Object.values(f).flat().length + (word ? 1 : 0);
  const clearAll = () => { setF({ region: [], category: [], tone: [], style: [], source: [] }); setWord(null); };

  const updated = useMemo(() => all.reduce((m, a) => (a.date > m ? a.date : m), ''), [all]);

  return (
    <div className="app">
      <style>{CSS}</style>

      <header className="mast">
        <div className="mast-id">
          <h1>ELK Necromancers</h1>
          <p className="mast-sub">The news in fifty words, placed on a map.</p>
        </div>
        <dl className="mast-stats">
          <div><dt>Stories</dt><dd>{all.length}</dd></div>
          <div><dt>Regions</dt><dd>{new Set(all.map(a => a.region)).size}</dd></div>
          <div><dt>Sources</dt><dd>{SOURCES.length}</dd></div>
          <div><dt>Updated</dt><dd>{updated.slice(5)}</dd></div>
        </dl>
        <p className="mast-badge">Sample feed — placeholder stories, not live reporting</p>
      </header>

      <WordDrift words={drift} active={word} onPick={setWord} />

      <section className="stage">
        <div className="stage-map">
          <div className="stage-head">
            <h2>Where the news is</h2>
            <div className="seg" role="group" aria-label="Map encoding">
              <button className={mapMode === 'volume' ? 'is-on' : ''} onClick={() => setMapMode('volume')}>Volume</button>
              <button className={mapMode === 'tone' ? 'is-on' : ''} onClick={() => setMapMode('tone')}>Tone</button>
            </div>
          </div>
          <WorldMap articles={mapped} selected={f.region} mode={mapMode}
            onToggle={r => toggle('region', r)} />
          <p className="stage-foot">Click a region to filter. Each dot is one story, placed at its dateline.</p>
        </div>

        <aside className="rail">
          <h2 className="rail-h">Volume by region</h2>
          <ol className="bars">
            {REGION_ORDER.map(r => {
              const n = mapped.filter(a => a.region === r).length;
              const max = Math.max(1, ...REGION_ORDER.map(x => mapped.filter(a => a.region === x).length));
              const on = f.region.includes(r);
              return (
                <li key={r}>
                  <button className={`bar${on ? ' is-on' : ''}`} onClick={() => toggle('region', r)} aria-pressed={on}>
                    <span className="bar-name">{r}</span>
                    <span className="bar-track">
                      <span className="bar-fill" style={{ width: `${(n / max) * 100}%`, background: REGION_COLOR[r] }} />
                    </span>
                    <span className="bar-n">{n}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>
      </section>

      <section className="facets">
        <Facet label="Region" values={REGION_ORDER} selected={f.region} counts={countsFor('region')}
          onToggle={v => toggle('region', v)} colorize />
        <Facet label="Category" values={CATEGORIES} selected={f.category} counts={countsFor('category')}
          onToggle={v => toggle('category', v)} />
        <Facet label="Tone" values={TONES} selected={f.tone} counts={countsFor('tone')}
          onToggle={v => toggle('tone', v)} />
        <Facet label="Treatment" values={STYLES} selected={f.style} counts={countsFor('style')}
          onToggle={v => toggle('style', v)} />
        <Facet label="Source" values={SOURCES} selected={f.source} counts={countsFor('source')}
          onToggle={v => toggle('source', v)} />
      </section>

      <div className="results-head">
        <p className="results-n">
          <strong>{listed.length}</strong> {listed.length === 1 ? 'story' : 'stories'}
          {activeCount > 0 && <> matching {activeCount} {activeCount === 1 ? 'filter' : 'filters'}</>}
        </p>
        <div className="results-tools">
          {word && <button className="chip is-on chip-word" onClick={() => setWord(null)}>“{word}” ×</button>}
          <label className="sort">
            Sort
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="critical">Most critical</option>
              <option value="favourable">Most favourable</option>
            </select>
          </label>
          {activeCount > 0 && <button className="link-btn" onClick={clearAll}>Clear filters</button>}
        </div>
      </div>

      {listed.length === 0 ? (
        <div className="empty">
          <p>No stories match this combination.</p>
          <button className="chip" onClick={clearAll}>Clear filters</button>
        </div>
      ) : (
        <div className="feed">{listed.map(a => <ArticleCard key={a.id} a={a} />)}</div>
      )}

      <footer className="foot">
        <p>Region is derived from place names in the headline and summary, then grouped into eight
          desks. Tone and treatment are read from the polarity and subjectivity scores that come with
          each story.</p>
        <p>Headlines and source names on this page are placeholders. Swap the <code>ARTICLES</code> array
          for your feed and the rest of the page follows.</p>
      </footer>
    </div>
  );
}
