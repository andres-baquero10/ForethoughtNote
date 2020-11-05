import React, { useEffect, useRef } from 'react';
import hidePaneIcon from '../../assets/hide-show-sidebar-icon.svg';
import deleteNoteIcon from '../../assets/delete-bttn.svg';
import { NoteInterface } from '../forethoughtNote/ForethoughtNote';
import { deleteNote, updateNote } from '../../requests';

import './RightPane.scss';

interface RightPaneProps {
	notes: Array<NoteInterface>;
	selectedIndex: number;
	setNotes: Function;
	setSelectedIndex: Function;
	isLeftPaneVisible: boolean;
	isSmallScreen: boolean;
	setIsLeftPaneVisible: Function;
	isLoading: boolean;
	fetchData: Function;
}

const RightPane: React.FC<RightPaneProps> = (props) => {
	const {
		notes,
		setSelectedIndex,
		selectedIndex,
		isLeftPaneVisible,
		isSmallScreen,
		setIsLeftPaneVisible,
		isLoading,
		fetchData,
		setNotes,
	} = props;

	const titleRef = useRef<HTMLTextAreaElement>(null);

	const handleTitleSize = () => {
		if (titleRef.current) {
			titleRef.current.style.height = 'auto';
			titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
		}
	};

	const handleTitleInputOnChange = (title: string) => {
		const updatedNote = { ...notes[selectedIndex], title };
		const tempNotes = [...notes];
		tempNotes[selectedIndex].title = title;
		setNotes(tempNotes);
		updateNote(updatedNote);
		handleTitleSize();
	};

	const handleContentInputOnChange = (content: string) => {
		const updatedNote = { ...notes[selectedIndex], content };
		const tempNotes = [...notes];
		tempNotes[selectedIndex].content = content;
		setNotes(tempNotes);
		updateNote(updatedNote);
	};

	useEffect(() => {
		handleTitleSize();
	});

	useEffect(() => {
		window.addEventListener('resize', handleTitleSize);
		return () => {
			window.removeEventListener('resize', handleTitleSize);
		};
	}, []);
	return (
		<>
			{(!isLeftPaneVisible || !isSmallScreen) && (
				<div className="RightPane-container">
					<div className="RightPane-titleContainer">
						<img
							alt="Hide pane"
							className="RightPane-hidePaneIcon"
							src={hidePaneIcon}
							onClick={() => {
								if (isSmallScreen) {
									setIsLeftPaneVisible(true);
								} else setIsLeftPaneVisible(!isLeftPaneVisible);
							}}
						/>
						<p className="RightPane-title">ForethoughtNote</p>
						{notes.length !== 0 && (
							<img
								alt="Delete note"
								className="RightPane-deleteNoteIcon"
								src={deleteNoteIcon}
								onClick={async () => {
									await deleteNote(notes[selectedIndex].id);
									await fetchData();
									setSelectedIndex(0);
									if (isSmallScreen) setIsLeftPaneVisible(true);
								}}
							/>
						)}
					</div>
					<div className="RightPane-inputContainer">
						{!notes?.length && !isLoading ? (
							<p className="RightPane-notification">
								You have no notes, let's add one
							</p>
						) : (
							<>
								<textarea
									rows={1}
									ref={titleRef}
									value={notes[selectedIndex]?.title}
									className="RightPane-titleInput"
									onChange={(e) => handleTitleInputOnChange(e.target.value)}
								/>
								<textarea
									value={notes[selectedIndex]?.content}
									className="RightPane-contentInput"
									onChange={(e) => handleContentInputOnChange(e.target.value)}
								/>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default RightPane;
