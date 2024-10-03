import { useEffect, useState } from 'react';
import { message } from 'antd';

import { CommentsServices } from 'core/services';
import { TComment } from 'core/types';

import CommentCreateForm from 'components/Comments/CommentCreateForm';
import CommentsItem from 'components/Comments/CommentsItem';

interface IProps {
  issueId: number;
}

const IssueComments = ({ issueId }: IProps) => {
  const [comments, setComments] = useState<TComment[]>([]);

  const loadComments = () => {
    CommentsServices.search({ issueId })
      .then(rs => setComments(rs.list.reverse()))
      .catch(error => console.log(error));
  };

  useEffect(loadComments, [issueId]);

  const handleRemove = (commentId: number) => {
    CommentsServices.remove({ id: commentId })
      .then(() => loadComments())
      .catch(() => message.error('Server error'));
  };

  return (
    <>
      <h4>Comments:</h4>
      <CommentCreateForm issueId={issueId} onCreate={loadComments} />
      {comments.map(comment => (
        <CommentsItem key={comment.id} comment={comment} onClickDelete={handleRemove} />
      ))}
    </>
  );
};

export default IssueComments;
