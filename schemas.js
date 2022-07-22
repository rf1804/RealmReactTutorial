import {ObjectId} from 'bson';

class Task {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    status = Task.STATUS_OPEN,
    id = new ObjectId(),
    subTask,
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.status = status;
    this.subTask = subTask;
  }

  static STATUS_OPEN = 'Open';
  static STATUS_IN_PROGRESS = 'InProgress';
  static STATUS_COMPLETE = 'Complete';

  // // TODO: implement schema
  // static schema2 = {
  //   name: 'SubTask',
  //   embedded: true, // default: false
  //   properties: {
  //     name: 'string',
  //     status: 'string',
  //   },
  // };

  static schema = {
    name: 'Task',
    properties: {
      _id: 'objectId',
      name: 'string',
      status: 'string',
      subTask: 'string<>',
    },
    primaryKey: '_id',
  };
}

export {Task};
