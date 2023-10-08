import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="task1">Task1</Link>
          </li>
          <li>
            <Link to="task2">Task2</Link>
          </li>
          <li>
            <Link to="task3">Task3</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}