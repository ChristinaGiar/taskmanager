import Panel from './components/Panel';
import { useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDrop from './components/DragDrop';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='App'>
          <DragDrop/>
      </div>
      {/* {isLoggedIn && <Panel />} */}
    </DndProvider>
  );
}

export default App;
