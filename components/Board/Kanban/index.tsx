import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { updateIssue } from 'core/actions';
import { useAppDispatch, useAppSelector } from 'core/hooks';
import { issuesSelector, openModal } from 'core/store';

import IssueBoardCard from 'components/Issues/IssueBoardCard';

import styles from './kanban.module.scss';

const columns = [
  {
    id: 'todo',
    title: 'To Do',
  },
  {
    id: 'inProgress',
    title: 'In progress',
  },
  {
    id: 'review',
    title: 'Review',
  },
  {
    id: 'qa',
    title: 'QA',
  },
  {
    id: 'done',
    title: 'Done',
  },
];

const Kanban = () => {
  const dispatch = useAppDispatch();
  const issues = useAppSelector(state => issuesSelector(state, { isBacklog: false }));

  const handleClickIssue = (issueId: number) => {
    dispatch(openModal({ type: 'editIssue', values: { issueId } }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.destination.droppableId === result.source.droppableId) return;
    dispatch(updateIssue(Number(result.draggableId), 'status', result.destination.droppableId));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.boardGrid}>
        {columns.map(column => (
          <Droppable key={column.id} droppableId={column.id}>
            {provided => (
              <div className={styles.boardColumn}>
                <div className={styles.boardColumnHeader}>{column.title}</div>
                <div className={styles.boardColumnBody} ref={provided.innerRef} {...provided.droppableProps}>
                  {issues
                    .filter(item => item.status === column.id)
                    .map((issue, index) => (
                      <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? '0.5' : '1' }}
                          >
                            <IssueBoardCard issue={issue} onClick={handleClickIssue} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Kanban;
