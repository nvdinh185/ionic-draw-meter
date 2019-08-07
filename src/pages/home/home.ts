import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  graphColor = {
    statusColor: "#309030",
    backgroundColor: "#E0E0E0",
    progressColor: "#EEEEEE"
  };

  constructor() { }

  ngOnInit() {
    this.drawMeter(this.I("dlMeter"), 0.4, 0.3)
  }
  
  I(id) { return document.getElementById(id); }

  drawMeter(c, amount, progress, colors?: {
    statusColor: string,
    backgroundColor: string,
    progressColor: string
  }) {
    
    var myColors = (colors) ? colors : this.graphColor;
    
    var ctx = c.getContext("2d");
    var dp = window.devicePixelRatio || 1;
    var cw = c.clientWidth * dp, ch = c.clientHeight * dp;
    console.log(window.devicePixelRatio || 1)
    console.log(c.clientWidth, c.clientHeight)
    console.log(c.width, c.height)
    var sizScale = ch * 0.0055;
    if (c.width == cw && c.height == ch) {
      ctx.clearRect(0, 0, cw, ch);
    } else {
      c.width = cw;
      c.height = ch;
    }
    console.log(c.width, c.height)
    //bắt đầu đường vẽ
    ctx.beginPath();
    //đặt màu cho đường vẽ
    ctx.strokeStyle = myColors.backgroundColor;
    //chiều rộng đường vẽ
    ctx.lineWidth = 16 * sizScale;
    //vẽ cung tròn
    ctx.arc(c.width / 2, c.height - 58 * sizScale, c.height / 1.8 - ctx.lineWidth, -Math.PI * 1.1, Math.PI * 0.1);
    //thực hiện vẽ
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = myColors.statusColor;
    ctx.lineWidth = 16 * sizScale;
    ctx.arc(c.width / 2, c.height - 58 * sizScale, c.height / 1.8 - ctx.lineWidth, -Math.PI * 1.1, amount * Math.PI * 1.2 - Math.PI * 1.1);
    ctx.stroke();
    //vẽ thanh quá trình
    if (typeof progress !== "undefined") {
      ctx.fillStyle = myColors.progressColor;
      ctx.fillRect(c.width * 0.3, c.height - 16 * sizScale, c.width * 0.4 * progress, 4 * sizScale);
    }
  }
}
