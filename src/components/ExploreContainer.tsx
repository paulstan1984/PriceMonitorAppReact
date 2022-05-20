import { useContext } from 'react';
import PrifileContext from '../profilecontext';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {

  const { profile, updateProfile } = useContext(PrifileContext);

  return (
    <div className="container">
      <strong>{name}</strong>
      <strong>{profile.token}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
