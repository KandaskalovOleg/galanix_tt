import './Task1.css';
import ukraineSrc from './../../../assets/images/task-1/ukraine.jpg';
import japanSrc from './../../../assets/images/task-1/japan.jpg';
import icelandeSrc from './../../../assets/images/task-1/iceland.jpg';
import czechSrc from './../../../assets/images/task-1/czech.png';

export const Task1 = () => {
  
  return (
    <div className="flag-container">
      <img src={ukraineSrc} alt="Прапор України" width="300" />
      <img src={japanSrc} alt="Прапор Японії" width="300" />
      <img src={icelandeSrc} alt="Прапор Ісландії" width="300" />
      <img src={czechSrc} alt="Прапор Чехії" width="300" />
    </div>
  );
}