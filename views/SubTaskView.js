import React, {useState, useEffect} from 'react';

import {View} from 'react-native';
import styles from '../stylesheet';

import {Overlay} from 'react-native-elements';

import {useTasks} from '../providers/TasksProvider';
import {TaskItem} from '../components/TaskItem';

export function SubTaskView(props) {
  //   const {name} = route.params;

  //   const [overlayVisible, setOverlayVisible] = useState(false);

  //   const {tasks, createTask} = useTasks();
  useEffect(() => {
    // navigation.setOptions({
    //   //   headerRight: function Header() {
    //   //     // return <AddTask createTask={createTask} />;
    //   //   },
    //   title: 'SubTasks',
    // });
  }, []);

  return (
    <View>
      {console.log('taskObj in subTaskView', props.route)}
      {props.route.params.taskObj.subTask.map((subTask, index) =>
        task ? (
          <SubTaskItem taskObj={task} key={index} title={subTask} />
        ) : null,
      )}
    </View>
  );
}
