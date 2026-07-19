import { PlanetKey, Sign } from "./ephemeris";

// "Your Pattern" — the fixed, always-true layer of the blueprint.
// Sun = the core drive underneath your choices.
export const SUN_PATTERN: Record<Sign, string> = {
  Aries: "You're built around initiation. You feel most like yourself the moment you're the one starting something, not maintaining it — and you can lose interest fast once a thing stops requiring your instinct.",
  Taurus: "Your core drive is toward the tangible and the earned. You don't trust progress you can't feel or see, and you build your sense of self slowly, through accumulation, not announcement.",
  Gemini: "You're wired for range over depth-in-one-direction. Your identity is less a fixed point and more a set of live wires — you know yourself best mid-conversation, mid-idea, not in stillness.",
  Cancer: "Underneath everything, you're organizing your life around emotional safety — who's inside the circle, what's protected, what's remembered. You lead with care even when it isn't named that way.",
  Leo: "Your core drive is to be genuinely seen for something real you made or did — not fame for its own sake, but recognition that lands on something you actually built.",
  Virgo: "You're oriented around usefulness and precision. Your sense of self is tied to whether things are actually working — and you notice the gap between 'fine' and 'right' before anyone else does.",
  Libra: "You calibrate yourself in relation to others — not out of weakness, but because you genuinely think best in dialogue. Decisions made in isolation often feel unfinished to you.",
  Scorpio: "You're drawn to what's underneath the surface — real motives, real stakes. Small talk and half-truths cost you energy; you do your best thinking in rooms where something is actually at risk.",
  Sagittarius: "Your core drive is toward expansion — of territory, belief, or understanding. You'd rather be in motion toward a bigger question than settled inside a small, finished answer.",
  Capricorn: "You're oriented around long-horizon competence. You measure yourself less by how you feel today and more by whether you're still standing, still building, five years from now.",
  Aquarius: "Your identity forms around being slightly outside the system you're in — useful to the group, but rarely fully absorbed by it. You trust your own read on things over consensus.",
  Pisces: "You're organized around permeability — you absorb what's around you, emotionally and creatively, sometimes before you've consciously registered it. Boundaries are a skill you build, not a default.",
};

// Moon = the private, felt layer underneath the public pattern.
export const MOON_PATTERN: Record<Sign, string> = {
  Aries: "Emotionally, you process fast and want resolution now — sitting with an unresolved feeling overnight is genuinely uncomfortable for you, more than most people.",
  Taurus: "You need physical steadiness to feel emotionally okay — a familiar bed, a known routine. Sudden change registers in your body before you've named it as stress.",
  Gemini: "You process feelings by talking or writing them into shape. An emotion that hasn't been put into words yet still feels half-real to you.",
  Cancer: "Your emotional memory is long and specific — you remember exactly how something felt, years later. Feeling safe enough to be soft is a real, active need, not a nice-to-have.",
  Leo: "You feel most emotionally solid when what you're doing is warmly witnessed by someone whose opinion matters to you — being overlooked lands harder on you than you usually let on.",
  Virgo: "You self-soothe through fixing something — a task, a system, a plan. Anxiety often shows up in you as a sudden urge to reorganize or optimize.",
  Libra: "You feel unsettled by unresolved tension with someone close to you — even minor friction can occupy real emotional bandwidth until it's smoothed over.",
  Scorpio: "You feel things at a depth you don't always show. Trust, once broken, is genuinely hard to fully rebuild — not out of stubbornness, but because you notice patterns, not just apologies.",
  Sagittarius: "You process difficult emotions best in motion — walking, traveling, changing scenery. Staying physically and mentally still with a hard feeling is where you're most likely to spiral.",
  Capricorn: "You tend to privatize your emotional load, handling it alone before anyone sees the strain. Needing help can feel, to you, dangerously close to being unreliable.",
  Aquarius: "You process feelings by first stepping slightly outside them — analyzing before you fully feel. Real intimacy asks you to skip that step, which takes deliberate effort.",
  Pisces: "Your emotional weather shifts with your environment more than most people's — being around someone anxious or someone calm genuinely changes your internal state, not just your mood.",
};

// Ascendant = the interface — how your energy first registers to others,
// and the instinctive approach you bring into new situations.
export const RISING_PATTERN: Record<Sign, string> = {
  Aries: "You come across as decisive and quick-moving before people know anything else about you — first impressions of you tend to include the word 'direct.'",
  Taurus: "You register as calm, grounded, unhurried — people tend to relax slightly around you without knowing exactly why.",
  Gemini: "You show up quick, curious, and conversational — people expect you to ask good questions before they've told you much of anything.",
  Cancer: "You come across as attentive and quietly protective — people often feel looked-after around you faster than they can explain why.",
  Leo: "You register with warmth and presence — people notice you enter a room, even when you weren't trying to be noticed.",
  Virgo: "You come across as precise and observant — people sense, correctly, that you're quietly tracking details they haven't mentioned.",
  Libra: "You show up personable and easy to talk to — people tend to over-assume how well they know you after one good conversation.",
  Scorpio: "You register as composed and slightly unreadable — people often sense there's more going on with you than what's on the surface.",
  Sagittarius: "You come across as open and unguarded, with an easy, exploratory energy — people expect you to say the honest thing rather than the polished one.",
  Capricorn: "You register as capable and a little reserved — people tend to trust your judgment early, sometimes before you've said very much.",
  Aquarius: "You come across as friendly but slightly hard to pin down — people sense you have an internal read on things that isn't fully shared.",
  Pisces: "You register as gentle and easy to talk to — people often open up to you faster than they intended to.",
};

// Deeper second layer — the "at your best / under pressure" dynamic for
// each Big Three placement, for a more detailed Pattern read.
export const SUN_PATTERN_DEEP: Record<Sign, string> = {
  Aries: "At your best, this makes you the person who actually moves a stalled room forward. Under pressure, it can tip into starting more than you finish — worth noticing which projects you've quietly abandoned mid-momentum.",
  Taurus: "At your best, you're the stabilizing force people build plans around. Under pressure, that same steadiness can calcify into stubbornness — holding a position past the point it's still serving you.",
  Gemini: "At your best, you connect ideas and people no one else would have linked. Under pressure, the range can scatter into unfinished threads — worth tracking how many things are 'in progress' at once.",
  Cancer: "At your best, you build the kind of safety people don't realize is rare until they've had it. Under pressure, protectiveness can tip into control — worth checking whether you're protecting someone or just your own anxiety.",
  Leo: "At your best, your presence genuinely lifts a room without costing anyone else their share of it. Under pressure, the need for recognition can crowd out others' moments — worth noticing whose story you're centering.",
  Virgo: "At your best, your precision quietly makes everything around you work better. Under pressure, that same instinct turns inward and sharp — worth noticing when 'improving things' becomes a way to avoid sitting with 'good enough.'",
  Libra: "At your best, you make genuinely better decisions by including other perspectives. Under pressure, that same instinct can become an inability to decide anything without checking — worth noticing when you already know your answer.",
  Scorpio: "At your best, your depth lets people trust you with things they show almost no one. Under pressure, that intensity can turn into testing people's loyalty rather than trusting it — worth noticing when you're pushing to see if someone will stay.",
  Sagittarius: "At your best, your appetite for more keeps you genuinely growing long after most people plateau. Under pressure, that same appetite can look like an inability to commit to any one thing — worth noticing what you keep almost-finishing.",
  Capricorn: "At your best, your patience compounds into things that actually last. Under pressure, that same discipline can flatten into joylessness — worth checking how long it's been since something felt like play rather than progress.",
  Aquarius: "At your best, your outside view genuinely improves the group you're part of. Under pressure, that same distance can read as detachment — worth checking whether you're observing a relationship or actually in it.",
  Pisces: "At your best, your permeability lets you understand things logic alone can't reach. Under pressure, the same openness can leave you absorbing other people's emotional weather as if it were your own — worth checking whose feeling you're actually having.",
};

export const MOON_PATTERN_DEEP: Record<Sign, string> = {
  Aries: "This makes you quick to recover from conflict, but also quick to escalate it in the moment — the fast processing cuts both ways.",
  Taurus: "This gives you real emotional endurance, but it also means change that isn't your idea can feel like a threat rather than a shift.",
  Gemini: "This makes you unusually good at articulating what you feel, but it can also mean you intellectualize a feeling before you've actually let yourself have it.",
  Cancer: "This makes your care feel unusually specific and remembered, but it can also mean old hurts stay closer to the surface than you'd like, long after they should have faded.",
  Leo: "This makes your warmth genuine rather than performed, but it also means feeling unseen lands harder and longer on you than it would on most people.",
  Virgo: "This makes you quietly reliable in a crisis, since you regulate by doing, but it can also mean you rarely let yourself just be upset without immediately trying to solve it.",
  Libra: "This makes you unusually attuned to relational temperature, but it can also mean you absorb tension that isn't fully yours to carry.",
  Scorpio: "This gives you real emotional loyalty once it's earned, but it also means a breach of trust rarely fully resets — you remember, even after you've forgiven.",
  Sagittarius: "This makes you resilient and quick to reframe hard things, but it can also mean you leave situations physically or mentally before actually processing them.",
  Capricorn: "This makes you someone people can lean on without you buckling, but it also means you can go a long time without letting anyone reciprocate that.",
  Aquarius: "This gives you real clarity under emotional pressure, but it can also create real distance between you and the feeling itself, right when closeness is what's actually needed.",
  Pisces: "This makes you unusually empathetic without having to try, but it also means your own emotional baseline is more exposed to your surroundings than most people's.",
};

export const RISING_PATTERN_DEEP: Record<Sign, string> = {
  Aries: "This works in your favor when a room needs someone to just start; it works against you when people read your directness as having already decided, when you were still thinking out loud.",
  Taurus: "This works in your favor in tense rooms, since your calm is genuinely stabilizing; it works against you when people assume you're unbothered by something that's actually costing you.",
  Gemini: "This works in your favor in almost any social setting; it works against you when people underestimate how seriously you're actually taking something, because it doesn't look effortful.",
  Cancer: "This works in your favor with anyone who needs to feel safe before opening up; it works against you when people mistake your attentiveness for availability without limits.",
  Leo: "This works in your favor whenever a room needs energy; it works against you when people assume confidence means you don't need anything back from them.",
  Virgo: "This works in your favor whenever precision matters; it works against you when people read your noticing as criticism rather than care.",
  Libra: "This works in your favor in almost any first meeting; it works against you when people assume the ease means you agree with them, when you're actually still deciding.",
  Scorpio: "This works in your favor when discretion matters; it works against you when people project intensity onto you that isn't actually there yet.",
  Sagittarius: "This works in your favor with people tired of politeness-as-performance; it works against you when your honesty lands before you've read whether the room wanted it.",
  Capricorn: "This works in your favor professionally, almost immediately; it works against you when people assume reserve means judgment, rather than just caution.",
  Aquarius: "This works in your favor with people who value independence; it works against you when people can't tell whether they're actually close to you or just adjacent to you.",
  Pisces: "This works in your favor with anyone guarded, since you disarm quickly; it works against you when people over-share with you faster than the relationship has actually earned.",
};

// Real (not filler) interpretations for the five other visible planets —
// each a genuine, differentiated read per sign, not just a placement label.
export const MERCURY_PATTERN: Record<Sign, string> = {
  Aries: "You think and speak fast, in a straight line to the point — patience for a slow-building argument isn't your strong suit.",
  Taurus: "You think slowly and concretely, and you're hard to talk out of a conclusion you've actually tested yourself.",
  Gemini: "You think in parallel threads at once, which makes you quick, but means you sometimes finish other people's sentences with the wrong ending.",
  Cancer: "You think in terms of what something means for the people involved, before the abstract logic of it — memory and emotion shape your reasoning more than you let on.",
  Leo: "You think in terms of narrative — you don't just want to be right, you want the point to actually land, which makes you a natural explainer.",
  Virgo: "You think in exact detail, and you genuinely notice the inconsistency everyone else glossed over.",
  Libra: "You think by weighing both sides simultaneously, which makes you a fair judge of an argument but sometimes slow to just pick one.",
  Scorpio: "You think in terms of what's really being said underneath the words — small talk registers to you as a kind of noise.",
  Sagittarius: "You think in big, connected patterns, and you'd rather gesture at the whole shape of an idea than nail down every footnote.",
  Capricorn: "You think in terms of what actually works, and you have real patience for slow, structural arguments other people find tedious.",
  Aquarius: "You think in systems and unusual angles, and you're genuinely comfortable holding a view most people around you don't share yet.",
  Pisces: "You think in images and impressions as much as words, and your best ideas often arrive sideways, not in a straight logical line.",
};

export const VENUS_PATTERN: Record<Sign, string> = {
  Aries: "You're drawn to directness in people and things — chemistry, for you, usually has to be immediate to be real.",
  Taurus: "You love through steadiness and physical comfort — a consistent, reliable presence means more to you than grand gestures.",
  Gemini: "You're drawn to wit and conversation — a relationship without good talk eventually feels incomplete to you, regardless of anything else it has going for it.",
  Cancer: "You love by taking care of people practically, and you feel most connected to someone once they've let you look after them in some small way.",
  Leo: "You love generously and openly, and you want the people you love to actually know it, not just assume it.",
  Virgo: "You show love through usefulness — fixing something, noticing a need before it's spoken — more than through words.",
  Libra: "You're genuinely oriented around partnership, and a good relationship or aesthetic environment does real work for your sense of wellbeing.",
  Scorpio: "You love intensely and privately, and you'd rather have one real bond than several comfortable ones.",
  Sagittarius: "You're drawn to people who expand your world — shared discovery matters to you more than shared routine.",
  Capricorn: "You love in the long term, through commitment and follow-through, more than through declarations.",
  Aquarius: "You're drawn to people who respect your independence, and friendship-first relationships tend to suit you better than intensity-first ones.",
  Pisces: "You love with real imagination and tenderness, sometimes idealizing someone before you've fully seen them clearly.",
};

export const MARS_PATTERN: Record<Sign, string> = {
  Aries: "You act on impulse and instinct, and you're at your best when a decision needs to be made quickly, not slowly deliberated.",
  Taurus: "You act deliberately and rarely rush — once you're actually moving, you're very hard to stop.",
  Gemini: "You act through words and negotiation more than force — your instinct in conflict is to talk it through, not push through it.",
  Cancer: "You act indirectly when protecting something you care about — your assertiveness shows up as fierce protectiveness rather than open confrontation.",
  Leo: "You act boldly and visibly — you're comfortable being the one who's seen taking the risk.",
  Virgo: "You act precisely, often after quietly identifying exactly what's wrong before anyone else names it.",
  Libra: "You act diplomatically, sometimes at the cost of speed — conflict-avoidance can cost you time you didn't need to lose.",
  Scorpio: "You act with real intensity once committed, and you don't put effort into things you don't actually care about.",
  Sagittarius: "You act on conviction and momentum, and you're better at starting a bold move than managing its slow follow-through.",
  Capricorn: "You act strategically, willing to delay gratification for a longer-term outcome most people wouldn't have the patience for.",
  Aquarius: "You act on principle, sometimes surprising people by holding a position that costs you socially.",
  Pisces: "You act on intuition more than plan, and your drive tends to follow inspiration rather than schedule.",
};

export const JUPITER_PATTERN: Record<Sign, string> = {
  Aries: "You grow through taking initiative — your biggest expansions in life tend to follow a decision you made quickly, not one you deliberated for months.",
  Taurus: "You grow through patience and accumulation — your best opportunities tend to compound slowly rather than arrive suddenly.",
  Gemini: "You grow through learning and exchange — new information, new people, new conversations are where your luck tends to concentrate.",
  Cancer: "You grow through home and close relationships — your biggest sense of abundance tends to come from belonging, not achievement.",
  Leo: "You grow through visibility and creative risk — being willing to be seen tends to open doors that playing it safe wouldn't.",
  Virgo: "You grow through mastery of a craft — your expansion tends to come from getting genuinely excellent at one specific thing.",
  Libra: "You grow through partnership — your best opportunities often arrive through, or because of, another person.",
  Scorpio: "You grow through transformation — your biggest growth periods tend to follow a real ending, not avoiding one.",
  Sagittarius: "You grow through direct experience — travel, study, and exposure to different ways of living genuinely expand you, not just abstractly interest you.",
  Capricorn: "You grow through responsibility — being given more to carry tends to be where your actual expansion happens, not where it stalls.",
  Aquarius: "You grow through community and unconventional paths — your luck concentrates around groups and ideas mainstream paths would have missed.",
  Pisces: "You grow through creativity and compassion — your biggest expansions tend to follow moments you let yourself be genuinely generous or imaginative.",
};

// "Deeper Layers" — progressed Sun: the multi-decade chapter of identity
// someone is currently living inside, not their fixed natal core.
export const PROGRESSED_SUN_PATTERN: Record<Sign, string> = {
  Aries: "You're in a chapter built around starting things on your own terms — initiating, leading, refusing to wait for permission. Identity right now is earned by acting first.",
  Taurus: "You're in a chapter built around consolidation — slowing down, making things tangible, building something that can actually last rather than chasing the next new thing.",
  Gemini: "You're in a chapter built around range — collecting skills, conversations, and connections rather than committing to one single lane. Curiosity is doing real identity-work right now.",
  Cancer: "You're in a chapter built around roots — home, family, emotional foundation. Whatever you're building right now, its worth is measured by how safe it makes you feel, not how impressive it looks.",
  Leo: "You're in a chapter built around visibility — being seen for something you actually made, not fame for its own sake. Playing small would genuinely cost you something right now.",
  Virgo: "You're in a chapter built around usefulness and refinement — getting the details right, being genuinely good at something specific, rather than broadly promising.",
  Libra: "You're in a chapter built around partnership and calibration — your sense of self is being shaped in relation to other people right now, more than in solitary decision-making.",
  Scorpio: "You're in a chapter built around depth and transformation — surface-level engagement won't satisfy you right now; you're being pulled toward whatever's actually real underneath.",
  Sagittarius: "You're in a chapter built around expansion — belief, travel, study, or teaching. A bigger horizon than the one you've been operating inside is calling for a reason.",
  Capricorn: "You're in a chapter built around long-horizon competence — credibility, structure, being taken seriously as someone who can carry real responsibility.",
  Aquarius: "You're in a chapter built around belonging to something bigger than personal achievement — a field, a cause, a community of practice that outlives any one win.",
  Pisces: "You're in a chapter built around dissolving old certainty — a looser, more intuitive relationship to who you are is replacing one that used to feel more fixed.",
};

// "Deeper Layers" — progressed Moon: the roughly 2-3 year emotional
// season someone is moving through, distinct from their fixed natal Moon.
export const PROGRESSED_MOON_PATTERN: Record<Sign, string> = {
  Aries: "Emotionally, this is a season that wants quick resolution and direct action — sitting with unresolved feelings is more uncomfortable than usual right now, and that's pushing you to actually address things instead of letting them simmer.",
  Taurus: "Emotionally, this is a season that wants steadiness — familiar routines, physical comfort, and slower decisions are genuinely regulating for you right now, more than usual.",
  Gemini: "Emotionally, this is a season that wants to talk things through — naming a feeling out loud is doing more work for you right now than sitting with it silently would.",
  Cancer: "Emotionally, this is a season centered on home and close bonds — whatever's happening with family or your sense of belonging is landing with more weight than it might in an ordinary stretch.",
  Leo: "Emotionally, this is a season that wants to be witnessed — being seen and appreciated for what you're doing matters more right now than it usually does, and that's worth naming rather than dismissing.",
  Virgo: "Emotionally, this is a season that self-soothes through doing — organizing, fixing, improving. Notice if you're using tasks to avoid just feeling something for a moment.",
  Libra: "Emotionally, this is a season tuned to relational balance — unresolved tension with someone close is occupying more real estate than it normally would, until it's actually addressed.",
  Scorpio: "Emotionally, this is a season of real depth and some intensity — surface reassurance won't land right now; you need the real thing, even if it's harder to hear.",
  Sagittarius: "Emotionally, this is a season that processes best in motion — travel, exercise, a change of scenery is doing real emotional work for you right now, more than sitting still would.",
  Capricorn: "Emotionally, this is a season that privatizes the load — you're more likely than usual to handle things alone before anyone sees the strain. Worth deliberately letting someone in anyway.",
  Aquarius: "Emotionally, this is a season that wants distance before closeness — analyzing a feeling before fully having it. Real intimacy right now takes a bit more deliberate effort than usual.",
  Pisces: "Emotionally, this is a season of high permeability — your environment and the people around you are shaping your internal state more than usual, for better and worse.",
};

// "Deeper Layers" — this year's annual-profection timelord, keyed by
// the ruling planet (not sign), since the ruler is what actually colors
// the year's themes.
export const PROFECTION_RULER_PATTERN: Record<PlanetKey, string> = {
  sun: "This is a Sun year — visibility, confidence, and creative risk are the year's real theme. Whatever you're building, being willing to be seen doing it tends to open more doors than staying careful and quiet.",
  moon: "This is a Moon year — home, emotional foundation, and close relationships carry unusual weight. Decisions about where and with whom you feel safe deserve more attention than usual this year.",
  mercury: "This is a Mercury year — communication, learning, and negotiation are where the real movement happens. Conversations you have this year tend to matter more than they would in an ordinary one.",
  venus: "This is a Venus year — relationships, money, and what you actually value are up for genuine reconsideration. Partnerships formed or clarified this year tend to have real staying power.",
  mars: "This is a Mars year — effort, assertiveness, and direct action are what the year is asking of you. This tends to reward a clear plan over raw intensity, especially where competition or physical stakes are involved.",
  jupiter: "This is a Jupiter year — growth, opportunity, and expansion are genuinely more available than usual. The instinct to go bigger rather than stay cautious tends to pay off this year specifically.",
  saturn: "This is a Saturn year — structure, responsibility, and being taken seriously as an authority are the theme. This tends to reward patience and follow-through over speed; consolidation, not new beginnings, is where the real progress happens.",
};

export const SATURN_PATTERN: Record<Sign, string> = {
  Aries: "Your discipline is built around learning patience — your biggest lessons tend to arrive when you're forced to slow down before acting.",
  Taurus: "Your discipline is built around security — you likely take financial and material stability more seriously than most people your age do.",
  Gemini: "Your discipline is built around focus — learning to finish one thread before starting the next tends to be a recurring, worthwhile lesson.",
  Cancer: "Your discipline is built around emotional boundaries — learning what's yours to carry, and what isn't, is a recurring theme.",
  Leo: "Your discipline is built around earned confidence — you likely had to build self-assurance deliberately rather than assume it as a given.",
  Virgo: "Your discipline is built around self-compassion — learning that 'good enough' is actually enough tends to be a genuine, ongoing lesson.",
  Libra: "Your discipline is built around decisiveness — learning to commit to a choice without endless recalibration is a recurring theme.",
  Scorpio: "Your discipline is built around trust — learning to let people in before they've fully proven themselves is a real, ongoing lesson.",
  Sagittarius: "Your discipline is built around follow-through — turning a big vision into a completed, unglamorous plan is a recurring lesson.",
  Capricorn: "Your discipline is genuinely one of your natural strengths — the risk is over-identifying with responsibility until rest feels unearned.",
  Aquarius: "Your discipline is built around belonging — learning that being known doesn't require sacrificing your independence is a recurring theme.",
  Pisces: "Your discipline is built around structure — giving your ideas and empathy an actual container so they don't just dissipate is a recurring lesson.",
};

