import fighter from './fighter';
import rank from './rank';
import rival from './rival';
import fight from './fight';
import summary from './summary';

export default {
  ...fighter,
  ...rank,
  ...rival,
  ...fight,
  ...summary
};
