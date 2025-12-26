export const POKEMON_FACTS = [
  { id: 'rhydon-first', text: 'Rhydon was the first Pokémon ever created.' },
  { id: 'pikachu-gorochu', text: 'Pikachu was originally planned to have a second evolution called Gorochu.' },
  { id: 'ditto-transform', text: 'Ditto can transform into almost any Pokémon.' },
  { id: 'slowpoke-tail', text: 'Slowpoke uses its tail to fish.' },
  { id: 'arcanine-legendary', text: 'Arcanine was originally classified as a Legendary Pokémon.' },
  { id: 'poliwag-swirl', text: 'Poliwag’s swirl is based on visible intestines of tadpoles.' },
  { id: 'alakazam-iq', text: 'Alakazam is said to have an IQ of 5000.' },
  { id: 'cubone-skull', text: 'Cubone wears the skull of its deceased mother.' },
  { id: 'gengar-shadow', text: 'Gengar is said to be the shadow of Clefable.' },
  { id: 'eevee-evolutions', text: 'Eevee has the most evolutions of any Pokémon.' },
  { id: 'magikarp-weak', text: 'Magikarp is known as one of the weakest Pokémon.' },
  { id: 'gyarados-dragon', text: 'Gyarados was originally intended to be a Dragon-type Pokémon.' },
  { id: 'snorlax-block', text: 'Snorlax is famous for blocking roads while sleeping.' },
  { id: 'meowth-talk', text: 'Meowth learned to talk to impress another Pokémon.' },
  { id: 'psyduck-headache', text: 'Psyduck’s headaches trigger its psychic powers.' },
  { id: 'onix-rock', text: 'Onix can burrow underground at high speeds.' },
  { id: 'charizard-flying', text: 'Charizard is not a Dragon-type despite its appearance.' },
  { id: 'jigglypuff-song', text: 'Jigglypuff sings to put others to sleep.' },
  { id: 'vulpix-tails', text: 'Vulpix is born with one tail that splits as it grows older.' },
  { id: 'machamp-arms', text: 'Machamp can throw hundreds of punches in seconds.' },
  { id: 'lapras-kind', text: 'Lapras is known for its gentle and kind nature.' },
  { id: 'mew-dna', text: 'Mew is said to contain the DNA of all Pokémon.' },
  { id: 'mewtwo-clone', text: 'Mewtwo was created through genetic manipulation.' },
  { id: 'butterfree-eyes', text: 'Butterfree has compound eyes that detect tiny movements.' },
  { id: 'pidgeot-speed', text: 'Pidgeot can fly at speeds over Mach 2.' },
  { id: 'raichu-electric', text: 'Raichu can knock out an elephant with electricity.' },
  { id: 'gastly-gas', text: 'Gastly’s body is made mostly of poisonous gas.' },
  { id: 'dragonite-mail', text: 'Dragonite is known for delivering mail and rescuing people.' },
  { id: 'hitmonlee-stretch', text: 'Hitmonlee can stretch its legs to incredible lengths.' },
  { id: 'hitmonchan-punch', text: 'Hitmonchan punches faster than the eye can see.' },
  { id: 'kangaskhan-baby', text: 'Kangaskhan is never seen without its baby.' },
  { id: 'electrode-explode', text: 'Electrode is known to explode without warning.' },
  { id: 'farfetchd-leek', text: 'Farfetchd always carries a leek as a weapon.' },
  { id: 'clefairy-moon', text: 'Clefairy is said to come from the moon.' },
  { id: 'zapdos-thunder', text: 'Zapdos gains power from thunderstorms.' },
];

export function getRandomPokemonFact(seenIds = []) {
  const unseenFacts = POKEMON_FACTS.filter((fact) => !seenIds.includes(fact.id));

  // if every fact is seen, then redo
  const pool = unseenFacts.length > 0 ? unseenFacts : POKEMON_FACTS;

  return pool[Math.floor(Math.random() * pool.length)];
}
