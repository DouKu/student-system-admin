import { observable, action, runInAction } from 'mobx';
import { IStudent } from '../interfaces';
import api from '../api/student';

class StudentStore {
  @observable students: (IStudent)[];
  constructor () {
    this.students = [];
  }
  @action async getStudents () {
    const { data: res } = await api.getStuedents();
    runInAction(() => {
      this.students = res.data;
    })
    return res;
  }
}

export default StudentStore;
