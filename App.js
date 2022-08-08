import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthProvider} from './providers/AuthProvider';
import {TasksProvider} from './providers/TasksProvider';

import {WelcomeView} from './views/WelcomeView';
import {ProjectsView} from './views/ProjectsView';
import {TasksView} from './views/TasksView';

import {Logout} from './components/Logout';
import {SubTaskView} from './views/SubTaskView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome View"
            component={WelcomeView}
            options={{title: 'Task Tracker'}}
          />
          <Stack.Screen
            name="Projects"
            component={ProjectsView}
            title="ProjectsView"
            headerBackTitle="log out"
            options={{
              headerLeft: function Header() {
                return <Logout />;
              },
            }}
          />
          <Stack.Screen name="Task List">
            {props => {
              const {navigation, route} = props;
              const {user} = route.params;
              return (
                <TasksProvider
                  navigation={navigation}
                  route={route}
                  user={user}>
                  <TasksView navigation={navigation} route={route} />
                </TasksProvider>
              );
            }}
          </Stack.Screen>

          <Stack.Screen name="SubTask List">
            {props => {
              const {navigation, route} = props;
              const {user} = route.params;
              return (
                <TasksProvider
                  navigation={navigation}
                  route={route}
                  user={user}>
                  <SubTaskView navigation={navigation} route={route} />
                </TasksProvider>
              );
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
