import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';


function CreatePost() {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [post, setPost] = useState<any>({
    title: '',
    content: '',
    tags: ''
  })

  const contentFieldChanaged = (data) => {
    setPost({ ...post, 'content': data })
  }
  console.log('post', JSON.stringify(post.content))
  return (
    <div>
      <JoditEditor
        ref={editor}
        value={post.content}

        onChange={(newContent) => contentFieldChanaged(newContent)}
      />
      <p>
        {JSON.stringify(post.content)}
      </p>
    </div>
  )
}

export default CreatePost
