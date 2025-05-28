import { useEffect, useState } from 'react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { en } from '@blocknote/core/locales';
import { handleEditContent } from '../services/treeService';

export function TreeBody({ tree }) {
  const locale = en;

  console.log(tree.content);

  const initialContent = tree.content === null ? undefined : JSON.parse(tree.content);
    
  const editor = useCreateBlockNote({
    initialContent: initialContent,
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        emptyDocument: 'Tap to edit node...',
        default: 'Type here...',
      },
    },
  });

  function debounce(func, delay) {
    let timeout;
    const debounced = (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
    debounced.cancel = () => clearTimeout(timeout);
    return debounced;
  }

  useEffect(() => {
    const handleChange = debounce(async () => {
      const updatedContent = editor.document;
      const safeContent = JSON.parse(JSON.stringify(updatedContent));
      await handleEditContent(tree._id, JSON.stringify(safeContent));
    }, 1000); // waits 1 second after last change

    const unsubscribe = editor.onChange(handleChange);
    return () => {
      unsubscribe();
      handleChange.cancel();
    };
  }, [editor]);

  return (
    <div className="tree-body">
      <BlockNoteView editor={editor} spellCheck={false} />
    </div>
  );
}
