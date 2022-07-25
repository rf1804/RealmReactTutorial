import React, {useState} from 'react';
import {ListItem, Text, Button} from 'react-native-elements';
import {useTasks} from '../providers/TasksProvider';
import {ActionSheet} from './ActionSheet';
import {Task} from '../schemas';

import styles from '../stylesheet';

export function TaskItem({task}) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [actionSheetVisibleForSubTask, setActionSheetVisibleForSubTask] =
    useState(false);
  const [showSubTask, setShowSubTask] = useState(true);

  const subTaskVal = task.subTask;
  const {
    deleteTask,
    editTaskView,
    editSubTaskView,
    deleteSubTaskView,
    addSubTaskView,
  } = useTasks();

  //State for edit/delete subtask operations
  const [subTaskIndex, setSubTaskIndex] = useState();
  const [subTaskValue, setSubTaskValue] = useState('');

  const actions = [
    {
      title: 'View Subtask',
      action: () => {
        setShowSubTask(true);
      },
    },
    {
      title: 'Edit Title',
      action: () => {
        editTaskView(task);
      },
    },
    {
      title: 'Delete',
      action: () => {
        deleteTask(task);
      },
    },
  ];

  const subTaskActions = [
    {
      title: 'Edit',
      action: () => {
        editSubTaskView(task, subTaskIndex, subTaskValue);
      },
    },
    {
      title: 'Delete',
      action: () => {
        deleteSubTaskView(task, subTaskIndex);
      },
    },
  ];

  // For each possible status other than the current status, make an action to
  // move the task into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
  // TODO
  // console.log('SubTaskVal demonstration', subTaskVal);

  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (task.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
      />

      <ActionSheet
        visible={actionSheetVisibleForSubTask}
        closeOverlay={() => {
          if (task.status) {
            setActionSheetVisibleForSubTask(false);
          }
        }}
        actions={subTaskActions}
      />

      <ListItem
        key={task.id}
        onPress={() => {
          console.log('Task Object', task);
          setActionSheetVisible(true);
        }}
        bottomDivider>
        <ListItem.Content
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ListItem.Title style={{color: 'red'}}>{task.name}</ListItem.Title>
          <Button
            type="clear"
            titleStyle={styles.plusButton}
            title="&#x2b;"
            onPress={() => {
              addSubTaskView(task);
            }}
          />
        </ListItem.Content>
      </ListItem>
      {showSubTask
        ? //JSON.parse(JSON.stringify(subTaskVal)).map((subTask, index) => {
          subTaskVal.map((subTask, index) => {
            console.log('rrrr', subTask);
            return (
              <ListItem
                key={index}
                onPress={() => {
                  console.log('SubTask pressed');
                  setSubTaskIndex(index);
                  setSubTaskValue(subTask);
                  setActionSheetVisibleForSubTask(true);

                  // openSubTaskActionSheet(task, index, subTask);

                  // editSubTaskView(task, index, subTask);
                }}
                bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{subTask}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            );
          })
        : null}
    </>
  );
}
