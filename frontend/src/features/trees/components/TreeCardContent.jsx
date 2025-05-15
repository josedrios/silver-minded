import { BoxesIcon, Icon } from '../../../components';
import { formateCustomDate } from '../../transactions';

export default function TreeCardContent({ tree }) {
  return (
    <>
      <div className="header-row">
        <Icon variant="mind">
          <BoxesIcon />
        </Icon>
        <p>{tree.title}</p>{' '}
      </div>
      <p className="note-section">{tree.note}</p>
      <p className="timestamp-section">
        CREATED: {formateCustomDate(tree.createdAt)}
      </p>
    </>
  );
}
