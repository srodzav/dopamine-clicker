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
    requires: 'x3',
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
    type: 'visual',
    cost: 350,
    requires: 'x5',
    visual: 'subwaysurfers',
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
