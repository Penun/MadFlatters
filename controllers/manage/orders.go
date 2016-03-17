package manage

import (
	"github.com/Penun/MadFlatters/models"
	"github.com/astaxie/beego"
	"encoding/json"
)

type OrdersController struct {
	beego.Controller
}

type ArchiveResponse struct {
	Success bool `json:"success"`
	Error string `json:"error"`
}

func (this *OrdersController) Post() {
	user := this.GetSession("user")
	if user != nil {
		var orders []models.Orders
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &orders)

		upSuc := models.ArchiveOrders(orders)
		
		if err != nil || !upSuc {
			response := ArchiveResponse{Success: false, Error: err.Error()}
			this.Data["json"] = &response
		} else {
			response := ArchiveResponse{Success: true, Error: ""}
			this.Data["json"] = &response
		}
		this.ServeJSON()
	} else {
		this.TplName = "error.html"	
	}
}