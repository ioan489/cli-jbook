import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
import CellList from './components/cell-list';

const AppComponent = () => {
  return (
    <div>
      <CellList />
    </div>
  );
};

export default AppComponent;
