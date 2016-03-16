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
	Manager_id int `orm:"pk"`
	User_name string
	Password string
}

type Orders struct {
	Or_id int `orm:"pk" json:"or_id"`
	FullName string `json:"fullName"`
	Phone string `json:"phone"`
	Details string `json:"details"`
	Archived int `json:"archived"`
}

func init() {
	orm.RegisterModel(new(Coordinates), new(Managers), new(Orders))
}