package controllers

import (
	"github.com/Penun/MadFlatters/models"
	"github.com/astaxie/beego"
	"encoding/json"
	"crypto/sha1"
	"encoding/base64"
	"io"
)

type LoginController struct {
	beego.Controller
}

type LoginResponse struct {
	Success bool `json:"success"`
	Error string `json:"error"`
}

func (this *LoginController) Get() {
	user := this.GetSession("user")
	if user != nil {
		this.Redirect("/manage", 302)
	}
	this.TplName = "login.tpl"
}

func (this *LoginController) Post() {
	user := this.GetSession("user")
	if user != nil {
		this.Redirect("/manage", 302)
	} else {
		var manager models.Managers
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &manager)

		if err != nil {
			response := LoginResponse{Success: false, Error: err.Error()}
			this.Data["json"] = &response
		} else {
			hasher := sha1.New()
			io.WriteString(hasher, manager.Password)
			io.WriteString(hasher, beego.AppConfig.String("salt"))
			manager.Password = base64.URLEncoding.EncodeToString(hasher.Sum(nil))
			success := models.TryLogin(&manager)
			response := LoginResponse{Success: success, Error: ""}
			if success {
				this.SetSession("user", manager)
			} else {
				response.Error = "Invalid Login"
			}
			this.Data["json"] = &response
		}
		this.ServeJSON()
	}
}