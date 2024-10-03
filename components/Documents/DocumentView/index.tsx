import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {Button} from 'antd';

import {useAppSelector} from 'core/hooks';
import {DocumentsServices} from "core/services/documents";

import styles from './documentView.module.scss';

interface IProps {
  id?: string;
}
const DocumentView: React.FC<IProps> = ({ id }) => {
  const router = useRouter();
  const project = useAppSelector(state => state.projects.current);
  const [docContent, setDocContent] =  useState("");
  const [docName, setDocName] =  useState("");

  useEffect(() => {
    DocumentsServices.get({id})
      .then(rs => {
        setDocName(rs.name);
        setDocContent(rs.content);
      })
      .catch(error => console.log(error));
  }, [id])

  return (
    <div>
      <div className={styles.header}>
        <h1>
          {docName}
        </h1>
        <div>
          <Button  size="small" type="link" shape="circle" onClick={() => router.push(`/projects/${project?.ticket}/documents/${id}/edit`)}>
            Edit
          </Button>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{__html: docContent}} />
    </div>
  );
};

export default DocumentView;
