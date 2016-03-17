package models

import (
	"github.com/astaxie/beego/orm"
	"fmt"
)

func TryLogin(manager Managers) bool{
	o := orm.NewOrm()
	if err := o.QueryTable("managers").Filter("user_name", manager.UserName).Filter("password", manager.Password).One(&manager); err == nil {
		fmt.Printf("%+v", manager)
		return true;
	} else {
		return false;
	} 
}