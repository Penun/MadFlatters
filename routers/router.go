package routers

import (
	"github.com/Penun/MadFlatters/controllers"
	"github.com/Penun/MadFlatters/controllers/manage"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.HomeController{})
    beego.Router("/contact", &controllers.OrderController{})
    beego.Router("/manage", &manage.ManageHomeController{})
    beego.Router("/manage/coordinates", &manage.CoordinatesController{})
    beego.Router("/manage/orders", &manage.OrdersController{})
}
