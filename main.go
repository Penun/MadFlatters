package main

import (
	_ "github.com/Penun/MadFlatters/routers"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)

func init() {
	orm.RegisterDriver("mysql", orm.DRMySQL)
	orm.RegisterDataBase("default", "mysql", "misterMad:Links11@/madflatters?charset=utf8")
}

func main() {
	orm.Debug = true;
	beego.Run()
}

// misterMad, Links11