import React, {
  useState
} from 'react';
import {
  Alert,
  StyleSheet,
  View
} from 'react-native';

import {
  Header
} from '../components/Header';
import {
  Task,
  TasksList
} from '../components/TasksList';
import {
  TodoInput
} from '../components/TodoInput';

export function Home() {
  const [
    tasks,
    setTasks
  ] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const updatedTasks = tasks.map(
      task => (
        { ...task }
      )
    )

    const foundTask = updatedTasks.find(
      item => 
        item.title === newTaskTitle
      )

    if (foundTask)
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
        [
          {
            text: 'Sim',
            style: 'destructive'
          }
        ]
      )

      let newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }

      setTasks(
        [
          ...tasks,
          newTask
        ]
      )
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundTask = updatedTasks.find(item => item.id === id)

    if (!foundTask)
      return

    foundTask.done = !foundTask.done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    const removeTasks = tasks.filter(item => item.id !== id)

    setTasks(removeTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  },
  alert: {
    backgroundColor: '#FFFFFF',
    color: '#000000'
  }
})