package models

import (
	"github.com/astaxie/beego/orm"
)

func AddOrder(ord Orders) int64{
	o := orm.NewOrm()
	id, err := o.Insert(&ord)
	if err == nil {
		return id;
	} else {
		return 0;
	}
}

func GetOrders() []Orders{
	o := orm.NewOrm()
	var orders []Orders
	o.QueryTable("orders").All(&orders)
	if len(orders) > 0 {
		return orders
	} else {
		return []Orders{} 
	}
}

func GetArchivedOrders(archived bool) []Orders{
	o := orm.NewOrm()
	var orders []Orders
	if archived {
		o.QueryTable("orders").Filter("archived", 1).OrderBy("-ord_com", "occurence").All(&orders)
	} else {
		o.QueryTable("orders").Filter("archived", 0).OrderBy("-ord_com", "occurence").All(&orders)
	}
	if len(orders) > 0 {
		return orders
	} else {
		return []Orders{} 
	}
}

func ArchiveOrders(orders []Orders) bool{
	o := orm.NewOrm()
	failed := false

	for _, el := range orders {
		if num, err := o.QueryTable("orders").Filter("or_id", el.Or_id).Update(orm.Params{"archived": 1}); err == nil && num > 0 {
			failed = true
		}
	}

	return failed
}