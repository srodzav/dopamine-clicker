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
    id: 'dvd',
    type: 'visual',
    cost: 50, // test. change in production
    requires: 'x3',
    visual: 'dvd',
  },
];

/* 
IDEAS

subway surfers gameplay
minecraft parkour gameplay
corte de jabon
asrm visual
notificaciones
barra de progreso reiniciandose
timer pomodoro (solo visual, no afecta en nada)

*/
