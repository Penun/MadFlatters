package controllers

import (
	"github.com/Penun/MadFlatters/models"
	"github.com/astaxie/beego"
	"crypto/sha1"
	"encoding/base64"
	"io"
	"time"
	"strconv"
)

type HomeController struct {
	beego.Controller
}

type UpdateResponse struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Response string `json:"response"`
}

func (this *HomeController) Get() {
	setSess := this.GetSession("madSess")
	if setSess != nil {
		this.DelSession("madSess")
	}
	coor := models.GetCoordinates(1)
	this.Data["coor"] = coor
	curTime := time.Now()
	curTimeUnix := curTime.Unix()
	hasher := sha1.New()
	io.WriteString(hasher, beego.AppConfig.String("SessionHashKey"))
	io.WriteString(hasher, strconv.FormatInt(curTimeUnix, 16))
	sess := base64.URLEncoding.EncodeToString(hasher.Sum(nil))
	this.SetSession("madSess", sess)
	this.Data["OCKey"] = sess
	this.TplName = "index.tpl"
}