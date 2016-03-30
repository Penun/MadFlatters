package manage

import (
	"github.com/Penun/MadFlatters/models"
	"github.com/astaxie/beego"
	"encoding/json"
)

type OrdersController struct {
	beego.Controller
}

func (this *OrdersController) Post() {
	user := this.GetSession("user")
	if user != nil {
		var orders []models.Orders
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &orders)

		var upSuc bool

		if len(orders) > 0 {
			upSuc = models.ArchiveOrders(orders)
		} else {
			upSuc = false
		}

		if err != nil || !upSuc {
			response := UpdateResponse{Success: false, Error: ""}
			if err != nil {
				response.Error = err.Error()
			}
			this.Data["json"] = &response
		} else {
			response := UpdateResponse{Success: true, Error: ""}
			this.Data["json"] = &response
		}
		this.ServeJSON()
	} else {
		this.TplName = "error.html"	
	}
}