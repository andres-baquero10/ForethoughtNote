import React from 'react';
import classNames from 'classnames';
import addNoteIcon from '../../assets/add-new-icon.svg';
import User from '../user/User';
import { NoteInterface } from '../forethoughtNote/ForethoughtNote';

import './LeftPane.scss';
import Note from '../note/Note';
import { addNote } from '../../requests';

interface LeftPaneProps {
	notes: Array<NoteInterface>;
	selectedIndex: number;
	setSelectedIndex: Function;
	isLeftPaneVisible: boolean;
	setIsLeftPaneVisible: Function;
	isSmallScreen: boolean;
	fetchData: Function;
}

const LeftPane: React.FC<LeftPaneProps> = (props) => {
	const {
		isLeftPaneVisible,
		isSmallScreen,
		notes,
		selectedIndex,
		setSelectedIndex,
		setIsLeftPaneVisible,
		fetchData,
	} = props;
	const leftPaneClasses = classNames('LeftPane-container', {
		'LeftPane-bigContainer': isLeftPaneVisible && isSmallScreen,
	});

	return (
		<>
			{isLeftPaneVisible && (
				<div className={leftPaneClasses}>
					<div className="LeftPane-addNoteContainer">
						<img
							alt="Add note"
							src={addNoteIcon}
							className="LeftPane-addNoteIcon"
							onClick={async () => {
								const note = await addNote();
								if (note) {
									const notes = await fetchData();
									if (isSmallScreen) setIsLeftPaneVisible(false);
									setSelectedIndex(notes.length - 1);
								}
							}}
						/>
					</div>
					<div className="LeftPane-notesContainer">
						<ul className="LeftPane-notesList">
							{notes.map((note: NoteInterface, index: number) => (
								<Note
									key={index}
									note={note}
									isSelected={index === selectedIndex}
									onClick={() => {
										setSelectedIndex(index);
										if (isSmallScreen) setIsLeftPaneVisible(false);
									}}
								/>
							))}
						</ul>
					</div>
					<User />
				</div>
			)}
		</>
	);
};

export default LeftPane;
