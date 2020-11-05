import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import noteIcon from '../../assets/icon-caret-right.svg';
import { NoteInterface } from '../forethoughtNote/ForethoughtNote';

import './Note.scss';

interface NoteProps {
	note: NoteInterface;
	isSelected: boolean;
	onClick: Function;
}

const Note: React.FC<NoteProps> = (props) => {
	const { note, isSelected, onClick } = props;
	const noteClasses = classNames('Note-container', {
		'Note--selected': isSelected,
	});
	return (
		<li onClick={() => onClick()} className={noteClasses}>
			<p className="Note-title">{note.title}</p>
			<p className="Note-date">
				{moment(note.date_created).format('MMMM, Do YYYYY')}
			</p>
			{isSelected && <img className="Note-icon" src={noteIcon} alt="Note" />}
		</li>
	);
};

export default Note;
