package controllers

import (
	"github.com/Penun/MadFlatters/models"
	"github.com/astaxie/beego"
	"encoding/json"
)

type OrderController struct {
	beego.Controller
}

func (this *OrderController) Post() {	
	var ord models.Orders
	err := json.Unmarshal(this.Ctx.Input.RequestBody, &ord)
	ord_id := models.AddOrder(ord)
	if err != nil || ord_id == 0 {
		response := UpdateResponse{Success: false, Error: err.Error()}
		this.Data["json"] = &response
	} else {
		response := UpdateResponse{Success: true, Error: ""}
		this.Data["json"] = &response
	}
	this.ServeJSON()
}