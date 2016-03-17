package controllers

import (
	"github.com/astaxie/beego"
)

type LogoutController struct {
	beego.Controller
}

type LogoutResponse struct {
	Success bool `json:"success"`
	Error string `json:"error"`
}

func (this *LogoutController) Post() {
	user := this.GetSession("user")
	if user != nil {
		this.DelSession("user")
		response := LogoutResponse{Success: true, Error: ""}
		this.Data["json"] = &response
	} else {
		response := LogoutResponse{Success: false, Error: "No User"}
		this.Data["json"] = &response
	}
	this.ServeJSON()
}