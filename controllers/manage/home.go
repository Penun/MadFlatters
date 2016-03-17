package manage

import (
	"github.com/Penun/MadFlatters/models"
	"github.com/astaxie/beego"
)

type ManageHomeController struct {
	beego.Controller
}

func (this *ManageHomeController) Get() {
	user := this.GetSession("user")
	if user != nil {
		coor := models.GetCoordinates(1)
		this.Data["Found"] = coor.C_id != 0 
		this.Data["Coor"] = coor

		orders := models.GetArchivedOrders(false)
		this.Data["Orders"] = &orders

		this.TplName = "manage/index.tpl"
	} else {
		this.Redirect("/login", 302)		
	}
}