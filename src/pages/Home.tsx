import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";
export interface EditTaskProps {
	id: number;
	title: string;
}
export function Home() {
	const [tasks, setTasks] = useState<Task[]>([]);

	function handleAddTask(newTaskTitle: string) {
		const newTask = {
			id: new Date().getTime(),
			title: newTaskTitle,
			done: false,
		};
		const temWithTheSameName = tasks.map(task => ({ ...task }));

		const foundItemWithTheSameName = temWithTheSameName.find(
			item => item.title === newTaskTitle
		);
		if (foundItemWithTheSameName) {
			Alert.alert("Você está tentando adicionar uma tarefa que já exist");
			return;
		}

		setTasks(oldState => [...oldState, newTask]);
	}

	function handleToggleTaskDone(id: number) {
		//TODO - toggle task done if exists
		const updatedTasks = tasks.map(task => ({ ...task }));

		const foundItem = updatedTasks.find(item => item.id === id);

		if (!foundItem) return;

		foundItem.done = !foundItem.done;
		setTasks(updatedTasks);
	}

	function handleRemoveTask(id: number) {
		const updatedTasks = tasks.filter(skill => skill.id !== id);
		Alert.alert(
			"Remover item",
			"Tem certeza que você deseja remover esse item?",
			[
				{
					text: "Sim",

					onPress: () => setTasks(updatedTasks),
				},
				{
					text: "Não",
				},
			]
		);
	}

	function handleEditTask(id: number, title: string) {
		const updatedTaskTitle = tasks.map(task => ({ ...task }));

		const foundItem = updatedTaskTitle.find(item => item.id === id);

		if (!foundItem) return;

		foundItem.title !== title;
		setTasks(updatedTaskTitle);
	}

	return (
		<View style={styles.container}>
			<Header tasksCounter={tasks.length} />

			<TodoInput addTask={handleAddTask} />

			<TasksList
				tasks={tasks}
				toggleTaskDone={handleToggleTaskDone}
				removeTask={handleRemoveTask}
				editTask={handleEditTask}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EBEBEB",
	},
});
