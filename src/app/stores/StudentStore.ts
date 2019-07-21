import { observable, action, runInAction } from 'mobx';
import { IStudent } from '../interfaces';
import api from '../api/student';

class StudentStore {
  @observable students: (IStudent)[];
  @observable total: number;
  @observable choose: boolean;
  constructor () {
    this.students = [];
    this.total = 0;
    this.choose = false;
  }
  @action async getStudents (payload) {
    const { data: res } = await api.getStuedents(payload);
    runInAction(() => {
      this.students = res.data.users;
      this.total = res.data.total;
      this.choose = res.data.choose == 1 ? true : false;
    })
    return res;
  }
  @action async postStudent (payload) {
    const { data: res } = await api.postStudent(payload);
    return res;
  }
  @action async putStudent (payload) {
    const { data: res } = await api.putStudent(payload);
    return res;
  }
  @action async delStudent (payload) {
    const { data: res } = await api.delStudent(payload);
    return res;
  }
  @action async switchChoose (payload) {
    const { data: res } = await api.switchChoose(payload);
    runInAction (() => {
      this.choose = !this.choose;
    })
    return res;
  }
}

export default StudentStore;
