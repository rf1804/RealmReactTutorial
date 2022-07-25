import React, {useState, useEffect} from 'react';
import {View, Button, TextInput, Alert} from 'react-native';
import styles from '../stylesheet';
import {Text} from 'react-native-elements';
import {useAuth} from '../providers/AuthProvider';
import {useTasks} from '../providers/TasksProvider';

export function EditSubTask(props) {
  const {user} = useAuth();
  const [newName, setNewName] = useState('');
  const {editSubTask, addSubTask} = useTasks();
  //   Edit Task once user press on submit btn
  const updatedTaskName = async () => {
    console.log('newName', newName);
    if (newName) {
      props.subTaskVal
        ? editSubTask(props.taskObj, props.index, newName)
        : addSubTask(props.taskObj, newName);
    } else {
      Alert.alert('Please enter subTask', null);
    }
  };

  // Load the team when the component is first mounted or when the user changes.
  useEffect(() => {
    setNewName(props.subTaskVal);
  }, []);

  return (
    <View style={styles.manageTeamWrapper}>
      {console.log('props inside edit task', props)}
      {console.log('props inside name', props?.taskObj.name)}
      <Text h4> {props.subTaskVal ? 'Edit Sub Task' : 'Add Sub Task'}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => setNewName(text)}
          value={newName}
          placeholder="Enter Sub Task"
          style={styles.addTeamMemberInput}
          autoCapitalize="none"
        />
      </View>
      <Button onPress={updatedTaskName} title="Proceed" />
    </View>
  );
}
