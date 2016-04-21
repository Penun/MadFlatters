package controllers

import (
	"github.com/Penun/MadFlatters/models"
	"github.com/astaxie/beego"
	"encoding/json"
)

type OrderController struct {
	beego.Controller
}

type OrdersSubmition struct {
	Or_id int `json:"or_id"`
	FullName string `json:"fullName"`
	Phone string `json:"phone"`
	Email string `json:"email"`
	Details string `json:"details"`
	Archived int `json:"archived"`
	Human string `json:"human1901"`
	OrdCom int `json:"ord_com"`
	OCK string `json:"oCK"`
}

func (this *OrderController) Post() {	
	var ordSub OrdersSubmition
	var response UpdateResponse
	err := json.Unmarshal(this.Ctx.Input.RequestBody, &ordSub)
	if err == nil {
		sess := this.GetSession("madSess")
		if ordSub.Human == "veryHuman" && ordSub.OCK == sess {	
			var ord models.Orders
			ord.Or_id = 0
			ord.FullName = ordSub.FullName
			ord.Phone = ordSub.Phone
			ord.Email = ordSub.Email
			ord.Details = ordSub.Details
			ord.OrdCom = ordSub.OrdCom
			ord.Archived = 0		
			ord_id := models.AddOrder(ord)

			if ord_id != 0 {
				response.Success = true
				response.Error = ""
				if ord.OrdCom == 1 {
					response.Response = "<div class=\"sixtySix\">Thank You!! We will read your order and call you to confirm shortly!</div>"
				} else {
					response.Response = "<div class=\"sixtySix\">Thank You!! We will read your comment and get back to you!</div>"
				}
			} else {
				response.Success = false
				response.Error = "Failed to upload."
				if ord.OrdCom == 1 {
					response.Response = "<div class=\"sixtySix\">Sorry! Something has gone wrong. Please try calling us at (555) 555-5555.</div>"
				} else {
					response.Response = "<div class=\"sixtySix\">Sorry! Something has gone wrong. Please refresh and try again. :/</div>"
				}
			}
		} else {
			response.Success = false;
			response.Error = "Missing Key"
			response.Response = "<div class=\"sixtySix\">Sorry! Something has gone wrong. Please refresh and try again. :/</div>"
		}
	} else {
		response.Success = false
		response.Error = err.Error()
		response.Response = "<div class=\"sixtySix\">Sorry! Something has gone wrong. Please refresh and try again. :/</div>"
	}
	this.Data["json"] = &response
	this.ServeJSON()
}