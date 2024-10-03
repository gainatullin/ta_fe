import { Avatar, Button } from 'antd';
import moment from 'moment';

import { getAvatarSrc } from 'core/helpers';
import { TComment } from 'core/types';

import styles from './commentsItem.module.scss';

interface IProps {
  comment: TComment;
  onClickDelete: (commentId: number) => void;
}

const CommentsItem = ({ comment, onClickDelete }: IProps) => {
  const handleClickEdit = () => {
    console.log('click edit');
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar src={getAvatarSrc('users', comment.creator.id)} />
      </div>
      <div>
        <div className={styles.header}>
          <span className={styles.creator}>{comment.creator.name}</span>
          <span className={styles.date}>{moment(comment.createdDate).fromNow()}</span>
        </div>
        <div className={styles.content}>{comment.description}</div>
        <div className={styles.actions}>
          <Button type="link" onClick={() => onClickDelete(comment.id)}>
            Remove
          </Button>
          <Button type="link" onClick={handleClickEdit}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentsItem;
