package models

import (
	"github.com/astaxie/beego/orm"
)

func TryLogin(manager *Managers) bool{
	o := orm.NewOrm()
	if err := o.QueryTable("managers").Filter("user_name", manager.UserName).Filter("password", manager.Password).One(manager); err == nil {
		return true;
	} else {
		return false;
	} 
}

func UpdatePassword(id int, newPass string) bool {
	o := orm.NewOrm()
	if num, err := o.QueryTable("managers").Filter("manager_id", id).Update(orm.Params{"password": newPass}); err == nil && num > 0 {
		return true
	} else {
		return false
	}
}