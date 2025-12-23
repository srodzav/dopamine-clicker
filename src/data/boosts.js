export const BOOSTS = [
  {
    id: 'x2',
    type: 'multiplier',
    cost: 10, // test. change in production
    factor: 2,
  },
  {
    id: 'x3',
    type: 'multiplier',
    cost: 35, // test. change in production
    factor: 3,
    requires: 'x2',
  },
  {
    id: 'hint',
    type: 'message',
    cost: 50,
    requires: 'x3',
  },
  {
    id: 'x5',
    type: 'multiplier',
    cost: 75, // test. change in production
    factor: 5,
    requires: 'x3',
  },
  {
    id: 'DVD',
    type: 'visual',
    cost: 50, // test. change in production
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
    cost: 350,
    requires: 'progress bar',
    visual: 'subwaysurfers',
    videoFile: 'subway-surfers.mp4',
    position: 'bottom-right',
  },
  {
    id: 'minecraft parkour',
    type: 'video',
    cost: 400,
    requires: 'subway surfers',
    visual: 'minecraft',
    videoFile: 'minecraft-parkour.mp4',
    position: 'bottom-left',
  },
  {
    id: 'asmr',
    type: 'video',
    cost: 500,
    requires: 'minecraft parkour',
    visual: 'asmr',
    videoFile: 'asmr.mp4',
    position: 'top-right',
  },
];

/* 
IDEAS

subway surfers gameplay wip
minecraft parkour gameplay
corte de jabon
[asmr] visual
notificaciones
barra de progreso reiniciandose check
timer pomodoro (solo visual, no afecta en nada)

*/
