import React, {useState} from 'react';
import {ListItem, Text} from 'react-native-elements';
import {useTasks} from '../providers/TasksProvider';
import {ActionSheet} from './ActionSheet';
import {Task} from '../schemas';

import styles from '../stylesheet';

export function SubTaskItem({taskObj, title}) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const {deleteTask, editTaskView, viewSubTask, setTaskStatus} = useTasks();
  const actions = [
    {
      title: 'View Subtask',
      action: () => {
        viewSubTask(taskObj);
      },
    },
    {
      title: 'Edit Title',
      action: () => {
        editTaskView(taskObj);
      },
    },
    {
      title: 'Delete',
      action: () => {
        deleteTask(taskObj);
      },
    },
  ];

  // For each possible status other than the current status, make an action to
  // move the task into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
  // TODO
  console.log('title', title);
  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (taskObj.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
      />

      <ListItem
        key={taskObj.id}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </>
  );
}
