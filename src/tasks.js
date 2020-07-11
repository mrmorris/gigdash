import * as C from 'constants.js'
import Task from 'entities/Task.js'


export default [
  new Task(1, 'Buy me an apple', 'John', C.NEIGHBORHOOD_FOX_POINT, [C.ITEM_BANANA]),
  new Task(2, 'I am hungry', 'Jane', C.NEIGHBORHOOD_FOX_POINT, [C.ITEM_HAMMER, C.ITEM_ENERGY_DRINK]),
  new Task(3, 'So lonely 😃', 'Smirny', C.NEIGHBORHOOD_OLNEYVILLE, [C.ITEM_VODKA]);
  new Task(4, 'Buy me another apple', 'Cricket', C.NEIGHBORHOOD_FEDERAL_HALL, [C.ITEM_BANANA])
]
