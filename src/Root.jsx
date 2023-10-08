import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { App } from './App';
import { Task1 } from './components/shared/Task1/Task1';
import { Task2 } from './components/shared/Task2/Task2';
import { Task3 } from './components/shared/Task3/Task3';
import { Description } from './components/shared/Description/Description';

export const Root = () => (
  <Router>
    <Routes>
      <Route  path="/" element={<App />}>
        <Route index path="/" element={<Description />} />
        <Route path="task1" element={<Task1 />} />
        <Route path="task2" element={<Task2 />} />
        <Route path="task3" element={<Task3 />} />
      </Route>
    </Routes>
  </Router>
)