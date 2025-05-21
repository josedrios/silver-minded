import { BoxIcon, Icon, Button, VerticalEllipsisIcon } from '../../../components';
import { formateCustomDate } from '../../transactions';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { useEffect, useState } from 'react';
import { handleEditContent } from '../services/nodeService';
import { en } from "@blocknote/core/locales";

export default function NodeCardContent({ node }) {
  const [isEditable, setIsEditable] = useState(false);
  const locale = en;

  const initialContent = node.content?.data
    ? JSON.parse(node.content.data)
    : undefined;

  const editor = useCreateBlockNote({
    initialContent: initialContent,
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        emptyDocument: 'Tap to edit node...',
        default: 'Type here...'
      }
    }
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

      await handleEditContent(node._id, {
        content: {
          type: 'blocknote',
          data: JSON.stringify(safeContent),
        },
      });
    }, 1000); // waits 1 second after last change

    const unsubscribe = editor.onChange(handleChange);
    return () => {
      unsubscribe();
      handleChange.cancel(); // cleanup
    };
  }, [editor]);

  return (
    <>
      <div className="header-row">
        <Icon variant="mind">
          <BoxIcon />
        </Icon>
        <p>{node.title}</p>
        <Button variant='gray' squared={true} className='borderless'>
          <VerticalEllipsisIcon />
        </Button>
      </div>

      <BlockNoteView
        editor={editor}
        spellCheck={false}
        editable={isEditable}
        onMouseEnter={() => setIsEditable(true)}
        onMouseLeave={() => setIsEditable(false)}
      />

      <p className="timestamp-section">
        CREATED: {formateCustomDate(node.createdAt)}
      </p>
    </>
  );
}
