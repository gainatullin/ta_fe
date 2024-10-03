import { FC } from 'react';
import { Button, Divider } from 'antd';

import { useAppSelector } from 'core/hooks';

interface IProps {
  onNavigate: (path: string) => void;
  onCreate: () => void;
}

const ProjectsListHeader: FC<IProps> = ({ onNavigate, onCreate }) => {
  const { list } = useAppSelector(state => state.projects);

  return (
    <>
      {list.length > 0 && (
        <>
          <ul>
            {list.map(project => (
              <li key={project.id}>
                <Button type="link" onClick={() => onNavigate(`/projects/${project.ticket}`)}>
                  {`${project.name} (${project.ticket})`}
                </Button>
              </li>
            ))}
          </ul>
          <Divider />
        </>
      )}
      <Button type="link" onClick={() => onNavigate(`/projects`)}>
        All projects
      </Button>
      <br />
      <Button type="link" onClick={onCreate}>
        Create projects
      </Button>
    </>
  );
};

export default ProjectsListHeader;
