package manage

import (
	"github.com/Penun/MadFlatters/models"
	"github.com/astaxie/beego"
	"encoding/json"
	"crypto/sha1"
	"encoding/base64"
	"io"
)

type PasswordController struct {
	beego.Controller
}

/*type UpdateResponse struct {
	Success bool `json:"success"`
	Error string `json:"error"`
}*/

type UpdateRequest struct {
	CurPass string `json:"curPass"`
	NewPass string `json:"newPass"`
	ConPass string `json:"conPass"`
}

func (this *PasswordController) Post() {
	user := this.GetSession("user")
	manager := user.(models.Managers)
	if user != nil {
		var upReq UpdateRequest
		var response UpdateResponse
		if err := json.Unmarshal(this.Ctx.Input.RequestBody, &upReq); err == nil {
			hasher := sha1.New()
			io.WriteString(hasher, upReq.CurPass)
			io.WriteString(hasher, beego.AppConfig.String("salt"))
			entPass := base64.URLEncoding.EncodeToString(hasher.Sum(nil))
			if entPass == manager.Password {
				if upReq.NewPass == upReq.ConPass {
					hasher = sha1.New()
					io.WriteString(hasher, upReq.ConPass)
					io.WriteString(hasher, beego.AppConfig.String("salt"))
					newPass := base64.URLEncoding.EncodeToString(hasher.Sum(nil))
					upSuc := models.UpdatePassword(manager.Manager_id, newPass)
					if upSuc {
						response.Success = true
						response.Error = ""
					} else {
						response.Success = false
						response.Error = "Database Error"
					}
				} else {
					response.Success = false
					response.Error = "New Passwords Did Not Match"
				}
			} else {
				response.Success = false
				response.Error = "Incorrect Password"
			} 
		} else {
			response.Success = false
			response.Error = err.Error()
		}
		this.Data["json"] =  &response
		this.ServeJSON()
	} else {
		this.TplName = "error.html"
	}
}