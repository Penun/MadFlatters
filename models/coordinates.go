package models

import (
	"github.com/astaxie/beego/orm"
)

func AddCoordinate(coor Coordinates) int64{
	o := orm.NewOrm()
	id, err := o.Insert(&coor)
	if err == nil {
		return id;
	} else {
		return 0;
	}
}

func GetCoordinates(coor_id int) Coordinates{
	o := orm.NewOrm()
	coor := Coordinates{C_id: coor_id}

	err := o.Read(&coor)

	if err == orm.ErrNoRows {
		coor.C_id = 0
	} else if err == orm.ErrMissPK {
		coor.C_id = 0
	} 

	return coor
}

func UpdateCoordinates(coor Coordinates) bool{
	o := orm.NewOrm()
	if num, err := o.Update(&coor); err == nil && num > 0 {
		return true
	} else {
		return false
	}
}