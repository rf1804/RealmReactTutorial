import React, {useState} from 'react';
import {ListItem, Text} from 'react-native-elements';
import {useTasks} from '../providers/TasksProvider';
import {ActionSheet} from './ActionSheet';
import {Task} from '../schemas';

import styles from '../stylesheet';

export function TaskItem({task}) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [showSubTask, setShowSubTask] = useState(true);
  const subTaskVal = task.subTask;
  const {deleteTask, editTaskView, editSubTaskView} = useTasks();
  const actions = [
    // {
    //   title: 'View Subtask',
    //   action: () => {
    //     setShowSubTask(true);
    //  },
    // },
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

  // For each possible status other than the current status, make an action to
  // move the task into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
  // TODO
  console.log('SubTaskVal demonstration', subTaskVal);

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
      <ListItem
        key={task.id}
        onPress={() => {
          console.log('Task Object', task);
          setActionSheetVisible(true);
        }}
        bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{color: 'red'}}>{task.name}</ListItem.Title>
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
                  editSubTaskView(task, index, subTask);
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
