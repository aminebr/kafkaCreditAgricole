import { Node } from 'reactflow';
import FunctionIcon from './FunctionIcon';

export default [{
  id: 'topic',
  position: { x: 0, y: 0 },
  data: { icon: <FunctionIcon />, title: 'Topic', subline: 'Topic_name' },
  type: 'turbo',
}
] as Node[];
