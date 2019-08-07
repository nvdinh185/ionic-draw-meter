import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  graphColor = {
    statusColor: "#309030",
    backgroundColor: "#E0E0E0",
    progressColor: "#e3d6b3"
  };

  constructor() { }

  ngOnInit() {
    //this.drawMeter(this.I("dlMeter"), 0.6, 0.4);
    //this.I("dlText").textContent = 0.6 * 100 + "%";
    //this.updateUI({ state: 1, contermet: '80', progress: 0.5 });
    this.updateUI({ state: 1, contermet: '0', progress: 0.5 });
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
    //console.log(window.devicePixelRatio || 1)
    //console.log(c.clientWidth, c.clientHeight)
    //console.log(c.width, c.height)
    var sizScale = ch * 0.0055;
    if (c.width == cw && c.height == ch) {
      ctx.clearRect(0, 0, cw, ch);
    } else {
      c.width = cw;
      c.height = ch;
    }
    //console.log(c.width, c.height)
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
    //vẽ nền bên trong
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

  updateUI(data: { state: 0 | 1, contermet: string, progress: number }) {
    this.I("dlText").textContent = ((data.state == 1 && data.contermet == '0') ? "..." : data.contermet) + "%";
    this.drawMeter(this.I("dlMeter"), this.mbpsToAmount(Number(Number(data.contermet) * (data.state == 1 ? this.oscillate() : 1))), Number(data.progress));
    //console.log(this.mbpsToAmount(Number(Number(data.contermet) * (data.state == 1 ? this.oscillate() : 1))))
  }

  mbpsToAmount(s) {
    return 1 - (1 / (Math.pow(1.3, Math.sqrt(s))));
  }

  oscillate() {
    return 1 + 0.02 * Math.sin(Date.now() / 100);
  }
}
