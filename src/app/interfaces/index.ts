import { RouteComponentProps } from 'react-router';
import {
  RouterStore,
  AuthStore, 
  StudentStore
} from '../stores';

export interface IBase extends RouteComponentProps<{}> {
  router: RouterStore;
}

export interface IAuth extends IBase {
  auth: AuthStore;
}

export interface ISignIn {
  account: string;
  password: string;
}
export interface ISignUp extends ISignIn {
}

/**
 * 模块页面props接口 -----------------------------------------------------
 */

export interface IStudentPage extends IAuth {
  student: StudentStore
}

/**
 * api接口数据格式 -----------------------------------------------------
 */
// 基本时间查询条件参数接口
export interface IBaseQuery {
  from?: string;
  to?: string;
  step?: string;
  id: string;
}

export interface IStudent {
  id?:               number,
  name:		           string,
	student_id:        string,
	sex:               string,
	id_card:		       string,
	account_location:  string,
	tel_num: 	         string,
	is_dorm: 	         string,
	address: 	         string,
	graduated_school:  string,
	guardian_name: 	   string,
	guardian_tel_num:  string,
	guardian_id_card:  string,
	first_subject:     string,
	second_subject:    any,
}