import React, {useState, useEffect} from 'react';

import {View} from 'react-native';
import styles from '../stylesheet';

import {Overlay} from 'react-native-elements';

import {useTasks} from '../providers/TasksProvider';
import {SubTaskItem} from '../components/SubTaskItem';

export function SubTaskView(props) {
  // const subTaskVal = props.route.params.taskObj.subTask;
  useEffect(() => {
    props.navigation.setOptions({
      //   headerRight: function Header() {
      //     // return <AddTask createTask={createTask} />;
      //   },
      title: 'SubTasks',
    });
  }, []);

  return (
    <View>
      {console.log('taskObj in subTaskView', props.route)}
      {console.log('subTaskss', subTaskVal)}
      {subTaskVal.map((subTask, index) => (
        <SubTaskItem
          key={index}
          taskObj={props.route.params.taskObj}
          title={subTask}
        />
      ))}
    </View>
  );
}
