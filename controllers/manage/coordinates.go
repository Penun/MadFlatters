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
	if user != nil {
		coor := models.Coordinates{C_id: 1, Occurence: time.Now()}
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &coor)
		upSuc := models.UpdateCoordinates(coor)
		if err != nil || !upSuc {
			response := UpdateResponse{Success: false, Error: err.Error()}
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