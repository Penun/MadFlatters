package manage

import (
	"github.com/Penun/MadFlatters/models"
	"github.com/astaxie/beego"
	"encoding/json"
	"time"
)

type CoordinatesController struct {
	beego.Controller
}

func (this *CoordinatesController) Post() {
	user := this.GetSession("user");
	response := UpdateResponse{Success: false, Error: ""}

	if user != nil {
		coor := models.Coordinates{C_id: 1, Occurence: time.Now()}
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &coor)
		if err == nil {	
			upSuc := models.UpdateCoordinates(coor)
			if upSuc {
				response.Success = true	
			} else {
				response.Error = "Failed To Save"				
			}
		} else {
			response.Error = err.Error()
		}
	} else {
		response.Error = "Who are YOU!?"
	}

	this.Data["json"] = &response
	this.ServeJSON()
}