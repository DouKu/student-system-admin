import * as React from 'react';
import Title from '../../../components/Title';
import './index.css';
import { inject, observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import { Table, Button } from 'antd';
import { IStudentPage } from '../../../interfaces';

@inject('router', 'student')
@autobind
@observer
class Student extends React.Component<IStudentPage, {}> {
  async componentWillMount () {
    await this.props.student.getStudents();
  }
  render () {
    const columns = [{
      id: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '学号',
      dataIndex: 'student_id',
      key: 'student_id',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '身份证',
      dataIndex: 'id_card',
      key: 'id_card',
    }, {
      title: '户口所在地',
      dataIndex: 'account_location',
      key: 'account_location',
    }, {
      title: '电话号码',
      dataIndex: 'tel_num',
      key: 'tel_num',
    }, {
      title: '是否内宿',
      dataIndex: 'is_dorm',
      key: 'is_dorm',
    }, {
      title: '家庭住址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '毕业学校',
      dataIndex: 'graduated_school',
      key: 'graduated_school',
    }, {
      title: '监护人姓名',
      dataIndex: 'guardian_name',
      key: 'guardian_name',
    }, {
      title: '监护人电话号码',
      dataIndex: 'guardian_tel_num',
      key: 'guardian_tel_num',
    }, {
      title: '监护人身份证',
      dataIndex: 'guardian_id_card',
      key: 'guardian_id_card',
    }, {
      title: '科目信息一',
      dataIndex: 'first_subject',
      key: 'first_subject',
    }, {
      title: '科目信息二',
      dataIndex: 'second_subject',
      key: 'second_subject',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="#" className="ant-dropdown-link">编辑</a>
        </span>
      ),
    }];
    return (
      <div>
        <div className="action-panel">
          <Button type="primary" onClick={this.onAddStudent}>添加</Button>
        </div>
        <div>
          <Title title="学生列表"/>
        </div>
        <Table
          columns={columns}
          dataSource={this.props.student.students}
        />
      </div>
    )
  }
  onAddStudent () {
  }
}

export default Student;