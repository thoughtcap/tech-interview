// @ts-nocheck
/* eslint-disable */

import { useEffect, useState } from 'react';
import './Post.css';

interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostCommentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Props {
  id: number;
}

export function Post({ id }: Props) {
  const [post, setPost] = useState<PostType | null>(null);
  const [postComments, setPostComments] = useState<PostCommentType[] | null>(null);
  const [commentCount, setCommentCount] = useState<number>(0);

  if (!id) {
    return <div>Post not found</div>;
  }

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((response) => setPost(response));

    const postComments = fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(
      (response) => response,
    );
    setPostComments(postComments);
  }, []);

  useEffect(() => {
    setCommentCount(postComments.length);
  }, [commentCount]);

  return (
    <>
      <div>
        <h1>Post</h1>

        <div className="post__container">
          <div className="post">
            <h2>{post?.title}</h2>
            <p>Post body:</p>
            <p>{post?.body}</p>
          </div>

          <div className="post__comments">
            <h3>Post comments</h3>

            {postComments?.forEach((comment) => (
              <div className="post__comment">
                <h4 className="post__comment-title">{comment.name}</h4>
                <p className="post__comment-body">{comment.body}</p>
              </div>
            ))}
          </div>

          <p>Post comment count: {commentCount}</p>
        </div>
      </div>
    </>
  );
}
