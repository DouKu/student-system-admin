import * as React from 'react';
import Title from '../../../components/Title';
import './index.css';
import { inject, observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import { Table, Button, Modal, Form, Input, Switch, Select, Upload, message, Icon } from 'antd';
import { IStudentPage, IStudent } from '../../../interfaces';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

interface StudentState {
  visible: boolean,
  student: IStudent
  page: number
}

const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    md: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 18 },
    md: { span: 18 },
    sm: { span: 18 },
  },
};

@inject('router', 'student')
@autobind
@observer
class Student extends React.Component<IStudentPage, StudentState> {
  constructor (props: IStudentPage, state: StudentState) {
    super(props, state);
    this.state = {
      visible: false,
      page: 0,
      student: {
        id:                0,
        name:		           '',
        student_id:        '',
        sex:               '',
        id_card:		       '',
        account_location:  '',
        tel_num: 	         '',
        is_dorm: 	         '',
        address: 	         '',
        graduated_school:  '',
        guardian_name: 	   '',
        guardian_tel_num:  '',
        guardian_id_card:  '',
        first_subject:     '',
        second_subject:    [],
      }
    }
  }
  async componentWillMount () {
    await this.props.student.getStudents({});
  }
  render () {
    const props = {
      showUploadList: false,
      name: 'file',
      action: '/api/admin/auth/user/import',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      beforeUpload: () => {
        message.loading('上传中');
      },
      onChange: info => {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.destroy();
          message.success(`导入成功`);
          this.props.student.getStudents({});
        } else if (info.file.status === 'error') {
          message.destroy();
          message.error(`导入失败`);
        }
      },
    };
    const columns: any = [{
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      key: 'id',
    }, {
      title: '姓名',
      dataIndex: 'name',
      width: 100,
      key: 'name',
    }, {
      title: '学号',
      dataIndex: 'student_id',
      width: 120,
      key: 'student_id',
    }, {
      title: '性别',
      width: 100,
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '身份证',
      dataIndex: 'id_card',
      width: 200,
      key: 'id_card',
    }, {
      title: '户口所在地',
      dataIndex: 'account_location',
      width: 300,
      key: 'account_location',
    }, {
      title: '电话号码',
      dataIndex: 'tel_num',
      width: 150,
      key: 'tel_num',
    }, {
      title: '是否内宿',
      dataIndex: 'is_dorm',
      width: 100,
      key: 'is_dorm',
    }, {
      title: '家庭住址',
      dataIndex: 'address',
      width: 300,
      key: 'address',
    }, {
      title: '毕业学校',
      dataIndex: 'graduated_school',
      width: 150,
      key: 'graduated_school',
    }, {
      title: '监护人姓名',
      dataIndex: 'guardian_name',
      width: 150,
      key: 'guardian_name',
    }, {
      title: '监护人电话号码',
      dataIndex: 'guardian_tel_num',
      width: 150,
      key: 'guardian_tel_num',
    }, {
      title: '监护人身份证',
      dataIndex: 'guardian_id_card',
      width: 200,
      key: 'guardian_id_card',
    }, {
      title: '科目信息一',
      dataIndex: 'first_subject',
      width: 150,
      key: 'first_subject',
    }, {
      title: '科目信息二',
      dataIndex: 'second_subject',
      width: 150,
      key: 'second_subject',
    }, {
      title: '操作',
      key: 'action',
      fixed: 'right', 
      render: (text, student) => (
        <span>
          <a href="javascript:;" className="ant-dropdown-link" onClick={this.handleEdit.bind(this, student)}>编辑</a>
          <a style={{marginLeft: 10}} href="javascript:;" className="ant-dropdown-link" onClick={this.handleDelete.bind(this, student)}>删除</a>
        </span>
      ),
    }];
    return (
      <div>
        <div className="action-panel">
          <Button type="primary" onClick={this.handleAddStudent}>添加</Button>
          <Upload {...props} style={{marginLeft: 10}}>
            <Button>
              <Icon type="upload" />导入学生信息
            </Button>
          </Upload>
          <Button style={{marginLeft: 10}} onClick={this.handleExport}>
            <Icon type="export" />导出学生信息
          </Button>
          <div style={{marginTop: 15, fontSize: 15}}>
            开启选课:
            <Switch checked={this.props.student.choose} style={{marginLeft: 5}} onChange={this.handleSwitchChange}></Switch>
          </div>
        </div>
        <div>
          <Title title="学生列表"/>
        </div>
        <Table
          onChange={this.handleTableChange}
          scroll={{ x: 2200 }}
          columns={columns}
          pagination={{
            total: this.props.student.total,
          }}
          dataSource={this.props.student.students.map((item, index) => ({...item, key: index}))}
        />
        <Modal
          width={1200}
          visible={this.state.visible}
          title="添加学生"
          okText="确定"
          cancelText="取消"
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}>
          <div className="form-layout">
            <div>
              <Form {...formItemLayout}>
                <FormItem label="姓名:">
                  <Input placeholder="请输入" value={this.state.student.name} onChange={this.handleInput.bind(this, 'name')}/>
                </FormItem>
                <FormItem label="学号:">
                  <Input placeholder="请输入" value={this.state.student.student_id} onChange={this.handleInput.bind(this, 'student_id')}/>
                </FormItem>
                <FormItem label="性别:">
                  <Select placeholder="请选择" value={this.state.student.sex} onChange={this.handleSelect.bind(this, 'sex')}>
                    <Option value="男">男</Option>
                    <Option value="女">女</Option>
                  </Select>
                </FormItem>
                <FormItem label="是否住宿:">
                  <Select placeholder="请选择" value={this.state.student.is_dorm} onChange={this.handleSelect.bind(this, 'is_dorm')}>
                    <Option value="是">是</Option>
                    <Option value="否">否</Option>
                  </Select>
                </FormItem>
                <FormItem label="身份证:">
                  <Input placeholder="请输入" value={this.state.student.id_card} onChange={this.handleInput.bind(this, 'id_card')}/>
                </FormItem>
                <FormItem label="户口地址:">
                  <TextArea placeholder="请输入" value={this.state.student.account_location} rows={3} onChange={this.handleInput.bind(this, 'account_location')}/>
                </FormItem>
                <FormItem label="电话号码:">
                  <Input placeholder="请输入" value={this.state.student.tel_num} onChange={this.handleInput.bind(this, 'tel_num')}/>
                </FormItem>
                <FormItem label="是否内宿:">
                  <Select placeholder="请选择" value={this.state.student.is_dorm} onChange={this.handleSelect.bind(this, 'is_dorm')}>
                    <Option value="是">是</Option>
                    <Option value="否">否</Option>
                  </Select>
                </FormItem>
                <FormItem label="家庭住址:">
                  <TextArea placeholder="请输入" value={this.state.student.address} rows={3} onChange={this.handleInput.bind(this, 'address')}/>
                </FormItem>
                <FormItem label="毕业学校:">
                  <Input placeholder="请输入" value={this.state.student.graduated_school} onChange={this.handleInput.bind(this, 'graduated_school')}/>
                </FormItem>
              </Form>
            </div>
            <div>
              <Form {...formItemLayout}>
                <FormItem label="监护人姓名:">
                  <Input placeholder="请输入" value={this.state.student.guardian_name} onChange={this.handleInput.bind(this, 'guardian_name')}/>
                </FormItem>
                <FormItem label="监护人电话号码:">
                  <Input placeholder="请输入" value={this.state.student.guardian_tel_num} onChange={this.handleInput.bind(this, 'guardian_tel_num')}/>
                </FormItem>
                <FormItem label="监护人身份证:">
                  <Input placeholder="请输入" value={this.state.student.guardian_id_card} onChange={this.handleInput.bind(this, 'guardian_id_card')}/>
                </FormItem>
                <FormItem label="科目一信息:">
                  <Select placeholder="请选择" value={this.state.student.first_subject} onChange={this.handleSelect.bind(this, 'first_subject')}>
                    <Option value="物理">物理</Option>
                    <Option value="历史">历史</Option>
                  </Select>
                </FormItem>
                <FormItem label="科目二信息:">
                  <Select mode="tags" value={this.state.student.second_subject} placeholder="请选择" onChange={this.handleMultiSelect}>
                    <Option value="化学">化学</Option>
                    <Option value="生物">生物</Option>
                    <Option value="地理">地理</Option>
                    <Option value="政治">政治</Option>
                  </Select>
                </FormItem>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
  handleSwitchChange (checked) {
    this.props.student.switchChoose({});
  }
  handleTableChange (pagination) {
    this.setState({
      page: pagination.current
    }, () => {
      this.props.student.getStudents({
        query: {
          offset: 10 * (this.state.page - 1)
        }
      });
    })
  }
  handleInput (field, event: any) {
    let student = {};
    student[field] = event.target.value;
    this.setState({
      student: {
        ...this.state.student,
        ...student
      }
    });
  }
  handleSelect (field, value) {
    let student = {};
    student[field] = value;
    this.setState({
      student: {
        ...this.state.student,
        ...student
      }
    });
  }
  handleMultiSelect (value) {
    let arrTmp = [...value];
    if (arrTmp.length > 2) {
      arrTmp.shift();
    }
    this.setState({
      student: {
        ...this.state.student,
        second_subject: arrTmp
      }
    });
  }
  handleSubmit () {
    if (this.state.student.id === 0) {
      this.props.student.postStudent({
        data: this.state.student
      }).then(() => {
        this.setState({
          visible: false,
        });
        this.props.student.getStudents({});
      });
    } else {
      this.props.student.putStudent({
        data: this.state.student
      }).then(() => {
        this.setState({
          visible: false,
        });
        this.props.student.getStudents({});
      });
    }
  }
  handleCancel () {
    this.setState({
      visible: false
    });
  }
  handleAddStudent () {
    this.setState({
      student: {
        id:                0,
        name:		           '',
        student_id:        '',
        sex:               '',
        id_card:		       '',
        account_location:  '',
        tel_num: 	         '',
        is_dorm: 	         '',
        address: 	         '',
        graduated_school:  '',
        guardian_name: 	   '',
        guardian_tel_num:  '',
        guardian_id_card:  '',
        first_subject:     '',
        second_subject:    [],
      },
      visible: true
    });
  }
  handleEdit (data) {
    let student = { ...data };
    student.second_subject = student.second_subject.split(',');
    this.setState({
      visible: true,
      student
    });
  }
  handleDelete (data) {
    Modal.confirm({
      title: '删除提醒',
      content: '是否删除该学生信息?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.props.student.delStudent({
          data: {
            id: data.id
          }
        }).then(() => {
          this.props.student.getStudents({});
        })
      }
    });
  }
  handleExport () {
    window.open(`/api/admin/auth/user/export/?token=${localStorage.getItem('token')}`)
  }
}

export default Student;