class Player {
  constructor(x, y, sx, sy) {
    this.ax = 0
    this.ay = 0
    this.vx = 0
    this.vy = 0
    this.x = x
    this.y = y
    this.sx = sx
    this.sy = sy
    this.onFloor = false
    this.onPlatform = true
    this.v = sqrt((this.vx * this.vx) + (this.vy * this.vy))
    this.last_left
    this.hasjumped = false
  }
  update(){
    
    pl.vx = pl.vx + pl.ax                                           
    pl.vy = pl.vy + pl.ay                                          
    pl.x = pl.x + pl.vx
    pl.y = pl.y + pl.vy
  }
  draw(){
    if(!this.onFloor){
    if(this.onPlatform){
      if(this.last_left){image(ch_l,this.x -50 ,this.y - 45 ,this.sx+100 ,this.sy+80)}else{image(ch_r,this.x -50 ,this.y - 45 ,this.sx+100 ,this.sy+80)}
    }else{
      if(this.last_left){image(ch_l_j,this.x -50 ,this.y - 45 ,this.sx+100 ,this.sy+80)}else{image(ch_r_j,this.x -50 ,this.y - 45 ,this.sx+100 ,this.sy+80)}
    }}
    //rect(pl.x,pl.y,pl.sx,pl.sy)
  }
}
class Startscreen{
  constructor(x,y,vy){
    this.x = x
    this.y = y
    this.v = vy
  }
  draw(){
  }
}
class Vertex {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}
class Bg{
  constructor(x,y){
    this.x = x
    this.y = y
    this.out = false
    this.v = bgv
    this.img = bgimg
  }
  draw(){
    image(this.img, this.x, this.y , ww, wh)
  }
  update(){
    if(pl.hasjumped){
    this.y = this.y + this.v}
    if(bg2.y >= 0){
      bg1.y = bg1.y - wh
      bg2.y = bg2.y - wh
    }
  }
}
class Score{
  constructor(c,h){
    this.h = h
    this.c = c
    if(this.h === NaN){this.h = 0}
  }
  draw(){
    push()
    stroke(0)    
    fill(0)                                      
    textSize(50)   
    if(sc.c > sc.h){sc.h = sc.c}
    text("current score: " + this.c, 20 , 80 )
    text("high score: " + this.h, 650 , 80 )
    pop()
  }
  drawhighscore(){
    push()
    fill(0)
    stroke(0)                                          
    textSize(50)   
    text("high score: " + this.h, 650 , 80 )
    pop()
  }

}
class Platform {
  constructor(v1, v3, vy, vx , boost , ladder) {
    this.x1 = v1.x
    this.y1 = v1.y
    this.x2 = v1.x
    this.y2 = v3.y
    this.x3 = v3.x
    this.y3 = v3.y
    this.x4 = v3.x
    this.y4 = v1.y
    this.ladder = false
    if(ladder < 0.1){this.ladder = true , this.y1 = this.y1 - 185 , this.y2 = this.y2 -185 , this.y3 = this.y3 - 185 , this.y4 = this.y4 - 185}
    this.boostpos = Math.random()*100+50
    this.boostx1 = this.x2 + this.boostpos
    this.boosty1 = this.y2 + 10
    this.boostx2 = this.boostx1 + 20
    this.boosty2 = this.y2
    this.boostsx = this.boostx2 - this.boostx1
    this.boostsy = this.boosty1 - this.boosty2
    if (boost < 0.2)
    {this.boost = true}else{this.boost = false}
    this.sx = abs(this.x1 - this.x3)
    this.sy = abs(this.y1 - this.y3)
    this.vy = pv
    this.vx = vx
    if(this.ladder){
      this.vx = this.vx/4
    }
    this.ladderpos = Math.random()*100+20
    this.ladderx1 = this.x2 + this.ladderpos
    this.laddery1 = this.y2 +30
    this.ladderx2 = this.ladderx1 + 60
    this.laddery2 = this.y2 +210
    this.laddersx = this.ladderx2 - this.ladderx1
    this.laddersy = this.laddery2 - this.laddery1
    this.vxb = false
    this.touched = false 
    this.noimg = false
  }
  update(){
    if(pl.hasjumped){
      this.boostx1 = this.x2 + this.boostpos
      this.boosty1 = this.y2 + 10
      this.boostx2 = this.boostx1 + 20
      this.boosty2 = this.y2
      this.y1 = this.y1 + this.vy
      this.y2 = this.y2 + this.vy
      this.y3 = this.y3 + this.vy
      this.y4 = this.y4 + this.vy
      this.ladderx1 = this.x2 + this.ladderpos
      this.laddery1 = this.y2 +30
      this.ladderx2 = this.ladderx1 + 60
      this.laddery2 = this.y2 +210
      if (this.x1 <= 0 || this.x3 >= ww){
        this.vx = this.vx * -1}
      this.x1 = this.x1 + this.vx
      this.x2 = this.x2 + this.vx
      this.x3 = this.x3 + this.vx
      this.x4 = this.x4 + this.vx}

  }
  draw(){
    //rect(this.x2,this.y2,this.sx,this.sy)

    if (this.boost){
     // rect(this.boostx1 , this.boosty1, this.boostsx, this.boostsy)
      image(spr , this.boostx1 -15 , this.boosty1 -10 , this.boostsx +25 , this.boostsy+25)
    }
    if(this.ladder){
      rect(this.ladderx1 , this.laddery1 , 3 , this.laddersy)
      rect(this.ladderx2 - 3, this.laddery1 , 3 , this.laddersy)
      rect(this.ladderx1 , this.laddery2  , this.laddersx , 5)
      image(rope,this.ladderx1 - 5,this.laddery1,10,this.laddersy)
      image(rope,this.ladderx2 - 8,this.laddery1,10,this.laddersy)
      image(miniplat ,this.ladderx1 -7 , this.laddery2  , this.laddersx +16 , 10)
    }
    if(!this.noimg){
      image(platimg, this.x2, this.y2, this.sx, this.sy + 25)
      }
  }
  collide(){
    if(pl.y + pl.sy > this.y3 - 5 && pl.y + pl.sy < this.y1 && pl.x < this.x3 && pl.x + pl.sx> this.x1 && pl.vy >= 0){               
        return(true)                                                                                                                                                                      
  }}
  isboosted(){
    if(pl.y + pl.sy > this.boosty2 -10  && pl.y + pl.sy < this.boosty1 +10 && pl.x < this.boostx2 && pl.x + pl.sx> this.boostx1 && pl.vy >= 0 && this.boost){
      return(true)
  }} 
  onladder(){
    if(pl.y + pl.sy < this.laddery2 +10   && pl.y + pl.sy > this.laddery2 -15 && pl.x < this.ladderx2 && pl.x + pl.sx> this.ladderx1 && pl.vy >= 0 && this.ladder){                
      return(true)                                                                                                                                                                  
  }}
}
class Color{
  constructor(r,g,b){
    this.r = r
    this.g = g 
    this.b = b
  }
}
class Button {
  constructor(x, y, sx, sy, c, txt, hc, txtconfirm){
    this.x1=x
    this.y1=y
    this.sx=sx
    this.sy=sy
    this.x2 = this.x1 + this.sx
    this.y2 = this.y1 + this.sy
    this.ogcolor = c
    this.hovercolor = hc
    this.hovering = false
    this.c = this.ogcolor
    this.t1 = txt
    this.t2 = txtconfirm
    this.txtsz = 70
    this.txtx = 50
    this.txty = (this.sy/2) - 30
    if(this.t2 === undefined){this.t2 = this.t1}
    if(this.hovercolor === undefined){this.hovercolor = this.ogcolor}
  }
  hover(){
    if(mouseX > this.x1 && mouseX < this.x2 +15 && mouseY > this.y1 && mouseY < this.y2 +15 && dead){
      this.c = this.hovercolor
      return(true)
    }else{this.nohover()}
  }
  nohover(){
    this.c = this.ogcolor
  }
  draw(){
    this.hover()
    push()
    stroke(this.c.r,this.c.g,this.c.b)
    fill(this.c.r,this.c.g,this.c.b)
    rect(this.x1,this.y1,this.sx,15)
    rect(this.x1,this.y2,this.sx,15)
    rect(this.x1,this.y1,15,this.sy)
    rect(this.x2,this.y1,15,this.sy +15)
    textSize(this.txtsz);
    if(sc.h == 0){
      text(this.t2,this.x1 + this.txtx, this.y2 - this.txty)
    }else{
    text(this.t1,this.x1 + this.txtx, this.y2 - this.txty)}
    pop()
    }
  }

var start = false
var ww = 1000
var wh = 1500
var g = 1
var inst
var plat = []
var pv = 4
var pvd = 4
var highscore
var dead = false
var pvx = 0
var platimg
var bgimg
var ch_r_j
var ch_r
var ch_l
var ch_l_j
var bg0
var bg0_1
var bgv = 2
var spr
var miniplat
var rope
var time1
var time2
var timeelapsed
var phone = false
var posxmobile = 700


function keyPressed(){
  phone = false
  if (keyCode === 27 || key == "p") {start = "paused"}else{start = true}
  if(dead){
    plat = []
    pl = {}
    setup()
    pl.onPlatform = true                                                                                                          
    pl.vy = 0                                                           
    pl.ay = g  
    dead = false
    start = false
    loop()
  }
}

function mousePressed(){
  if(start == false){start = true}
  phone = true
  if(hsreset.hover()){
    resetHighScore()
  }else if(dead && !hsreset.hover()){
    plat = []
    pl = {}
    setup()
    pl.onPlatform = true                                                                                                          
    pl.vy = 0                                                           
    pl.ay = g  
    dead = false
    start = false
    loop()
  }
}

function preload() {
 highscore = getItem('hs')
 spr = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/748ed8f6a87921bda2f514ddbf0e1271d99147ba/spring.png', console.log("spr image loaded"))
 platimg = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/bc851348d37e0ba3a01c5c8ac2db1132421a6888/platform.png',console.log("platform image loaded"))
 bgimg = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/69670d00238bd21c635640bba1f2444200b3658f/bg%20img.png', console.log("background image loaded"))
 ch_r_j = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/0b435786d8a0f2cd9a73d27b982b856779e7148f/char%20right%20jumping.png',console.log("chrj image loaded"))
 ch_r = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/0b435786d8a0f2cd9a73d27b982b856779e7148f/char%20right%20idle.png',console.log("chr image loaded"))
 ch_l = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/0b435786d8a0f2cd9a73d27b982b856779e7148f/char%20left%20idle.png',console.log("chl image loaded"))
 ch_l_j = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/0b435786d8a0f2cd9a73d27b982b856779e7148f/char%20left%20jumping.png',console.log("chlj image loaded"))
 bg0 = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/22e1449de2a68543ac4f7a9046e68118fbe9c4d9/bg0%20img.png', console.log("bg0 loaded"))
 bg0_1 = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/cecfc21f151403b73e071060b5393088aa7cded5/bg0_1%20img.png', console.log("bg0_1 loaded"))
 miniplat = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/320e22682227a5a60e35da4245cbda5e40e065c6/mini%20platform.png', console.log('miniplat loaded'))
 rope = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/320e22682227a5a60e35da4245cbda5e40e065c6/rope.png',console.log('rope image loaded'))
}
function setup() {
  frameRate(60)
  createCanvas(ww, wh);
  highscore = getItem('hs')
  c1 = new Color(255, 0, 170)
  c2 = new Color(247, 106, 200)
  hsreset = new Button(200,1000,600,200,c1,"Reset Highscore",c2,"Highscore Reset!")
  bg1 = new Bg(0,0)
  bg2 = new Bg(0,-1500)
  bg3 = new Bg(0,0)
  bg3.img = bg0
  bg3.v = 4
  bg4 = new Bg(0,0)
  bg4.img = bg0_1
  sc = new Score(0,highscore)
  pl = new Player(700, 1280, 50, 80)
  v1 = new Vertex(-200,1400)
  v2 = new Vertex(1200,1350)
  p1 = new Platform(v1,v2,pv,pvx)
  p1.noimg = true
  plat.push(p1)
  v1 = new Vertex(0,1200)
  v2 = new Vertex(335,1120)
  p2 = new Platform(v1,v2,pv,pvx)
  p2.noimg = true
  plat.push(p2)
  v1 = new Vertex(780,1080)
  v2 = new Vertex(1000,1030)
  p3 = new Platform(v1,v2,pv,pvx)
  p3.noimg = true
  plat.push(p3)
  v1 = new Vertex(450,950)
  v2 = new Vertex(650,900)
  p4 = new Platform(v1,v2,pv,pvx)
  plat.push(p4)
  v1 = new Vertex(150,750)
  v2 = new Vertex(350,700)
  p4 = new Platform(v1,v2,pv,pvx)
  plat.push(p4)
  v1 = new Vertex(600,550)
  v2 = new Vertex(800,500)
  p6 = new Platform(v1,v2,pv,pvx,0.1,0.001)
  plat.push(p6)
  v1 = new Vertex(450,350)
  v2 = new Vertex(650,300)
  p7 = new Platform(v1,v2,pv,pvx)
 // plat.push(p7)
  v1 = new Vertex(600,150)
  v2 = new Vertex(800,100)
  p7 = new Platform(v1,v2,pv,pvx)
  plat.push(p7)
  v1 = new Vertex(200,-50)
  v2 = new Vertex(400,-100)
  p7 = new Platform(v1,v2,pv,pvx)
  plat.push(p7)
}

function resetHighScore(){
  sc.c = 0
  sc.h = 0
  storeItem('hs' , 0)
  sc.draw()
}
function draw() {
  posxmouse = mouseX
  if(start == false){
    bg4.draw()
    bg3.draw()
    fill(0)
    stroke(0) 
    for (var key in plat){             
      plat[key].draw()}
    pl.draw()
    fill(20)
    stroke(0)                                          
    textSize(85) 
    sc.drawhighscore()  
    text("Press any key to start", 75 , 750)
  }else if (start == "paused"){
    textSize(85) 
    text("Game Paused" ,250 ,750)
    textSize(50)
    text("Press any button to resume",200,800)
  }else{
  if(pv > pvd ){pv = pv - 0.5}else if(pv < pvd){pv = pv + 0.5}
  bg1.draw()
  bg2.draw()
  bg4.draw()
  bg3.draw()
  stroke(0) 
  fill(0)
  if(plat.length <= 7){
    pvx = (Math.floor(Math.random()*sc.c*0.1))
    if (Math.random() > 0.5){pvx = -pvx}
    var xcor = Math.floor(Math.random() * 750 + 25)
    var ycor = plat[plat.length-1].y3 - 200
    var v1 = new Vertex(xcor, ycor+50)
    var v2 = new Vertex(xcor+200, ycor)
    var nplat = new Platform(v1, v2, pv,pvx,Math.random(),Math.random())
    plat.push(nplat)
  }


  for (var key in plat){      
    if(key > 0){
      k2 = key -1}         
    plat[key].draw()
    plat[key].vy = pv
    if (plat[key].collide()){
      pl.y = plat[key].y2 - (pl.sy)                                      
      pl.vy = pv                                                          
      pl.ay = 0                                                          
      pl.onPlatform = true  
    }else if(plat[key].onladder()){     
      pl.y = plat[key].laddery2 - (pl.sy) - 15                       
      pl.vy = pv                                                          
      pl.ay = 0                                                          
      pl.onPlatform = true  
    }                                
    if(plat[key].y1 > 1550){
      if(plat[key].ladder){
        sc.c = sc.c + 2
      }else{
        sc.c = sc.c + 1
      }
      plat.splice(key,1)
    }
    if(plat[key].isboosted()){
      inst = true                                              
      pl.onPlatform = false                                                                                      
      pl.vy = -30  
      pv = 22
      for (var key in plat){plat[key].vy = 20}
    }
  }

  if(keyIsPressed && !phone && !dead){
    if(keyIsDown(65)||keyIsDown(37)){                                        //                                                       
      pl.vx = -15
      pl.last_left = true                                                    //                                                          
    }else if(keyIsDown(68)||keyIsDown(39)){                                  //      KEYBOARD CONTROLS                                                                                                     
      pl.vx = 15 
      pl.last_left = false                                                   //                                                   
    }else if(!keyIsDown(68) && !keyIsDown(65) && !keyIsDown(39) && !keyIsDown(37)){pl.vx = 0}     //                                                          
    if(keyIsDown(87) ||keyIsDown(38) ){                                      //
      if(pl.onFloor == true || pl.onPlatform == true){                       //                                                            
      inst = true    
      pl.hasjumped = true                                                    //      KEYBOARD CONTROLS  
      pl.onPlatform = false                                                  //                                                            
      pl.vy = -22                                                            //  
      pl.ay = g                                                              //                                  
    }}                                                             
  }else if(phone && !dead){
    if(pl.onFloor == true || pl.onPlatform == true){                         //                                                            
      inst = true    
      pl.hasjumped = true                                                    //      MOBILE CONTROLS 
      pl.onPlatform = false                                                  //                                                            
      pl.vy = -22                                                            //  
      pl.ay = g 
    }
    pl.x = mouseX
  }else{
    pl.vx = 0
  }                                                         
  
  if(pl.y >= wh-pl.sy && inst == false){                      // FLOOR CHECK
    pl.y = wh-pl.sy
    pl.vy = 0       
    pl.ay = 0
    pl.onFloor = true
  }else{
    pl.ay = g
    pl.onFloor = false
  }
  if(pl.x < -20){
    pl.x = 1000
  }else if (pl.x >1000){
    pl.x = -20
  }


  if(!dead){
  for(var key in plat){plat[key].update()}
  bg1.update()
  bg2.update()
  bg3.update()
  bg4.update()
  pl.update()}
  pl.draw()
  sc.draw()
  var frm = Math.floor(frameRate())
  push()  
  fill(0)
  stroke(0)                                          
  textSize(50)   
  text("fps: " + frm, 450 , 80 )
  pop()
  inst = false





  if(pl.onFloor){
    fill(0)
    stroke(0)                                          // CHECK IF THE GAME IS FINISHED
    textSize(200)   
    text("You Died", 70 , 750 )
    textSize(75)  
    text("Press any key to restart", 100 , 880 )
    push()
    translate(pl.x, pl.y);
    imageMode(CENTER);
    rotate(-PI/2)
    image(ch_r_j, -50, 0 ,pl.sx+100 ,pl.sy+80)
    pop()
    if(highscore < sc.h){
      storeItem('hs', sc.h)}
    hsreset.draw()
    dead = true
  }}}
