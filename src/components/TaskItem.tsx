import React, { useEffect, useRef, useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/pen.png";

import { Task } from "./TasksList";

interface TasksListProps {
	tasks: Task;
	toggleTaskDone: (id: number) => void;
	removeTask: (id: number) => void;
	editTask: (id: number, title: string) => void;
}

export const TaskItem = ({
	toggleTaskDone,
	removeTask,
	editTask,
	tasks,
}: TasksListProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [taskName, setTaskName] = useState(tasks.title);
	const textInputRef = useRef<TextInput>(null);

	function handleStartEditing() {
		setIsEditing(true);
	}

	function handleCancelEditing() {
		setTaskName(tasks.title);
		setIsEditing(false);
	}

	function handleSubmitEditing() {
		editTask(tasks.id, taskName);
		setIsEditing(false);
	}

	useEffect(() => {
		if (textInputRef.current) {
			if (isEditing) {
				textInputRef.current.focus();
			} else {
				textInputRef.current.blur();
			}
		}
	}, [isEditing]);

	return (
		<>
			<View>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.taskButton}
					onPress={() => toggleTaskDone(tasks.id)}
					//TODO - use onPress (toggle task) prop
				>
					<View
						style={tasks.done ? styles.taskMarkerDone : styles.taskMarker}

						//TODO - use style prop
					>
						{tasks.done && <Icon name="check" size={12} color="#FFF" />}
					</View>
					<TextInput
						style={tasks.done ? styles.taskTextDone : styles.taskText}
						value={taskName}
						onChangeText={setTaskName}
						editable={isEditing}
						onSubmitEditing={handleSubmitEditing}
						ref={textInputRef}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.iconsContainer}>
				{isEditing ? (
					<TouchableOpacity onPress={handleCancelEditing}>
						<Icon name="x" size={24} color="#b2b2b2" />
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={handleStartEditing}>
						<Image source={editIcon} />
					</TouchableOpacity>
				)}

				<View style={styles.iconsDivider} />

				<TouchableOpacity
					disabled={isEditing}
					onPress={() => removeTask(tasks.id)}>
					<Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	iconsContainer: {
		flexDirection: `row`,
		paddingHorizontal: 24,
	},
	iconsDivider: {
		width: 1,
		height: 24,
		backgroundColor: "rgba(196, 196, 196, 0.24)",
		marginHorizontal: 10,
	},
	taskButton: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 15,
		marginBottom: 4,
		borderRadius: 4,
		flexDirection: "row",
		alignItems: "center",
	},
	taskMarker: {
		height: 16,
		width: 16,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "#B2B2B2",
		marginRight: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	taskText: {
		color: "#666",
		fontFamily: "Inter-Medium",
	},
	taskMarkerDone: {
		height: 16,
		width: 16,
		borderRadius: 4,
		backgroundColor: "#1DB863",
		marginRight: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	taskTextDone: {
		color: "#1DB863",
		textDecorationLine: "line-through",
		fontFamily: "Inter-Medium",
	},
});
