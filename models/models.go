package models

import (
	"time"
	"github.com/astaxie/beego/orm"
)

type Coordinates struct {
	C_id int `orm:"pk"`
	Longitude float64
	Latitude float64
	Occurence time.Time
}

type Managers struct {
	Manager_id int `orm:"pk" json:"manager_id"`
	UserName string `json:"userName"`
	Password string `json:"password"`
}

type Orders struct {
	Or_id int `orm:"pk" json:"or_id"`
	FullName string `json:"fullName"`
	Phone string `json:"phone"`
	Email string `json:"email"`
	Details string `json:"details"`
	Archived int `json:"archived"`
	OrdCom int `json:"ord_com"`
}

func init() {
	orm.RegisterModel(new(Coordinates), new(Managers), new(Orders))
}