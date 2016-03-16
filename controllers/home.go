package controllers

import (
	"github.com/Penun/MadFlatters/models"
	"github.com/astaxie/beego"
)

type HomeController struct {
	beego.Controller
}

func (this *HomeController) Get() {
	coor := models.GetCoordinates(1)
	this.Data["coor"] = coor
	this.TplName = "index.tpl"
}
