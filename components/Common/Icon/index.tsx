import IconAntd from '@ant-design/icons';
import bug from 'public/icons/bug.svg';
import high from 'public/icons/high.svg';
import highest from 'public/icons/highest.svg';
import low from 'public/icons/low.svg';
import lowest from 'public/icons/lowest.svg';
import medium from 'public/icons/medium.svg';
import task from 'public/icons/task.svg';

const icons: any = { high, highest, low, lowest, medium, task, bug };

interface IProps {
  custom: string;
}

const Icon = (props: IProps) => {
  return <IconAntd style={{ paddingRight: '5px' }} component={icons[props.custom]} {...props} />;
};

export default Icon;
