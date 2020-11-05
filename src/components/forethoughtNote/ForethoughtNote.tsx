import React, { useEffect, useState } from 'react';
import { getNotes } from '../../requests';
import LeftPane from '../leftPane/LeftPane';
import RightPane from '../RightPane/RightPane';

import './ForethoughtNote.scss';

export interface NoteInterface {
	id: string;
	title: string;
	content: string;
	date_created: Date;
}

const ForethoughtNote: React.FC = () => {
	const [notes, setNotes] = useState<Array<NoteInterface>>([]);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [isLeftPaneVisible, setIsLeftPaneVisible] = useState<boolean>(true);
	const [isSmallScreen, setIsSmallScreen] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const responsiveCondition = window.matchMedia('(max-width:690px)');

	const handleResponsiveCondition = () => {
		setIsSmallScreen(responsiveCondition.matches);
		setIsLeftPaneVisible(!responsiveCondition.matches);
	};

	const fetchData = async () => {
		setIsLoading(true);
		const notes = await getNotes();
		setNotes(notes);
		setIsLoading(false);
		return notes;
	};

	useEffect(() => {
		responsiveCondition.addEventListener('change', handleResponsiveCondition);
		return () => {
			responsiveCondition.removeEventListener(
				'change',
				handleResponsiveCondition,
			);
		};
	}, []);

	useEffect(() => {
		handleResponsiveCondition();
	}, []);

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className="ForethoughtNote-container">
			<LeftPane
				fetchData={fetchData}
				notes={notes}
				selectedIndex={selectedIndex}
				setSelectedIndex={setSelectedIndex}
				isLeftPaneVisible={isLeftPaneVisible}
				isSmallScreen={isSmallScreen}
				setIsLeftPaneVisible={setIsLeftPaneVisible}
			/>
			<RightPane
				setNotes={setNotes}
				fetchData={fetchData}
				notes={notes}
				isLoading={isLoading}
				selectedIndex={selectedIndex}
				setSelectedIndex={setSelectedIndex}
				isLeftPaneVisible={isLeftPaneVisible}
				isSmallScreen={isSmallScreen}
				setIsLeftPaneVisible={setIsLeftPaneVisible}
			/>
		</div>
	);
};

export default ForethoughtNote;
