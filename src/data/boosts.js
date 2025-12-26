export const BOOSTS = [
  {
    id: 'x2',
    type: 'multiplier',
    cost: 10,
    factor: 2,
  },
  {
    id: 'hint',
    type: 'message',
    cost: 15,
    requires: 'x2',
    message: 'You can also click the counter button to gain extra points!',
  },
  {
    id: 'x3',
    type: 'multiplier',
    cost: 35,
    factor: 3,
    requires: 'x2',
  },
  {
    id: 'x5',
    type: 'multiplier',
    cost: 75,
    factor: 5,
    requires: 'x3',
  },
  {
    id: 'DVD',
    type: 'visual',
    cost: 50,
    requires: 'x5',
    visual: 'dvd',
  },
  {
    id: 'progress bar',
    type: 'visual',
    cost: 200,
    requires: 'x5',
    visual: 'progressbar',
  },
  {
    id: 'subway surfers',
    type: 'video',
    cost: 400,
    requires: 'progress bar',
    visual: 'subwaysurfers',
    videoFile: 'subway-surfers.mp4',
    position: 'bottom-right',
  },
  {
    id: 'x10',
    type: 'multiplier',
    cost: 450,
    factor: 10,
    requires: 'subway surfers',
  },
  {
    id: 'minecraft parkour',
    type: 'video',
    cost: 700,
    requires: 'subway surfers',
    visual: 'minecraft',
    videoFile: 'minecraft-parkour.mp4',
    position: 'bottom-left',
  },
  {
    id: 'asmr',
    type: 'video',
    cost: 850,
    requires: 'minecraft parkour',
    visual: 'asmr',
    videoFile: 'asmr.mp4',
    position: 'bottom-right',
  },
  {
    id: 'random pokemon fact',
    type: 'message',
    cost: 300,
    requires: 'minecraft parkour',
    getMessage: (context) => {
      const fact = context.getPokemonFact();
      return {
        text: `${fact.text}`,
        factId: fact.id,
      };
    },
  },
];

/* 
IDEAS

corte de jabon
notificaciones
timer pomodoro (solo visual, no afecta en nada)

*/
