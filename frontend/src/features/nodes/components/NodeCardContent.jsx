import { BoxIcon, Icon, SlashLoader } from '../../../components';
import { formateCustomDate } from '../../transactions';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { useEffect, useState } from 'react';
import { handleEditContent } from '../services/nodeService';

export default function NodeCardContent({ node }) {
  const [isEditable, setIsEditable] = useState(false);

  const initialContent = node.content?.data
    ? JSON.parse(node.content.data)
    : undefined;

  const editor = useCreateBlockNote({
    initialContent: initialContent,
  });

  useEffect(() => {
    const handleChange = async () => {
      const updatedContent = editor.document;
      const safeContent = JSON.parse(JSON.stringify(updatedContent));

      await handleEditContent(node._id, {
        content: {
          type: 'blocknote',
          data: JSON.stringify(safeContent),
        },
      });
    };

    const unsubscribe = editor.onChange(handleChange);
    return () => unsubscribe();
  }, [editor]);

  return (
    <>
      <div className="header-row">
        <Icon variant="mind">
          <BoxIcon />
        </Icon>
        <p>{node.title}</p>
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
