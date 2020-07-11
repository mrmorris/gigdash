import * as C from './constants';
import Task from './entities/Task';

export default [
  new Task(
    1,
    'Buy me an apple',
    'John',
    C.NEIGHBORHOOD_FOX_POINT,
    [C.ITEM_BANANA],
    'Love it',
    'Hate it'
  ),
  new Task(
    2,
    'I am hungry',
    'Jane',
    C.NEIGHBORHOOD_FOX_POINT,
    [C.ITEM_HAMMER, C.ITEM_ENERGY_DRINK],
    'Thanks!',
    'You suck!'
  ),
  new Task(
    3,
    'So lonely 😃',
    'Smirny',
    C.NEIGHBORHOOD_OLNEYVILLE,
    [C.ITEM_VODKA],
    'So so...',
    'Meh'
  ),
  new Task(
    4,
    'Buy me another apple',
    'Cricket',
    C.NEIGHBORHOOD_FEDERAL_HILL,
    [C.ITEM_BANANA],
    'Marry me!',
    'Can you help me?'
  ),
];
