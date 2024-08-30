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
class Startup{
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
class bg{
  constructor(x,y){
    this.x = x
    this.y = y
    this.out = false
    this.v = bgv
  }
  draw(){
    image(bgimg, this.x, this.y , ww, wh)
  }
  update(){
    this.y = this.y + this.v
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
  constructor(v1, v3, vy, vx , boost) {
    this.x1 = v1.x
    this.y1 = v1.y
    this.x2 = v1.x
    this.y2 = v3.y
    this.x3 = v3.x
    this.y3 = v3.y
    this.x4 = v3.x
    this.y4 = v1.y
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
    this.vxb = false
    this.touched = false 
  }
  update(){
      this.boostx1 = this.x2 + this.boostpos
      this.boosty1 = this.y2 + 10
      this.boostx2 = this.boostx1 + 20
      this.boosty2 = this.y2
      this.y1 = this.y1 + this.vy
      this.y2 = this.y2 + this.vy
      this.y3 = this.y3 + this.vy
      this.y4 = this.y4 + this.vy
      if (this.x1 <= 0 || this.x3 >= ww){
        this.vx = this.vx * -1}
      this.x1 = this.x1 + this.vx
      this.x2 = this.x2 + this.vx
      this.x3 = this.x3 + this.vx
      this.x4 = this.x4 + this.vx

  }
  draw(){
    //rect(this.x2,this.y2,this.sx,this.sy)
    if (this.boost){
      rect(this.boostx1 , this.boosty1, this.boostsx, this.boostsy)
    }
    image(platimg, this.x2, this.y2, this.sx, this.sy + 25)
  }
  collide(){
    if(pl.y + pl.sy > this.y3 - 5 && pl.y + pl.sy < this.y1 && pl.x < this.x3 && pl.x + pl.sx> this.x1 && pl.vy >= 0){               
        return(true)                                                                                                                                                                      
  }}
  isboosted(){
    if(pl.y + pl.sy > this.boosty2  && pl.y + pl.sy < this.boosty1 && pl.x < this.boostx2 && pl.x + pl.sx> this.boostx1 && pl.vy >= 0 && this.boost){
      return(true)
    }
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
var hsreset = false
var dead = false
var pvx = 0
var platimg
var bgimg
var ch_r_j
var ch_r
var ch_l
var ch_l_j
var bgv = 2
function keyPressed(){
  if (keyCode === 27 || key == "p") {start = "paused"}else{start = true}
  if(dead){
    window.location.reload()
  }
}
function preload() {
 highscore = getItem('hs')
 platimg = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/bc851348d37e0ba3a01c5c8ac2db1132421a6888/platform.png',console.log("platform image loaded"))
 bgimg = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/69670d00238bd21c635640bba1f2444200b3658f/bg%20img.png', console.log("background image loaded"))
 ch_r_j = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/0b435786d8a0f2cd9a73d27b982b856779e7148f/char%20right%20jumping.png',console.log("chrj image loaded"))
 ch_r = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/0b435786d8a0f2cd9a73d27b982b856779e7148f/char%20right%20idle.png',console.log("chr image loaded"))
 ch_l = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/0b435786d8a0f2cd9a73d27b982b856779e7148f/char%20left%20idle.png',console.log("chl image loaded"))
 ch_l_j = loadImage('https://raw.githubusercontent.com/dehphos/game-v2/0b435786d8a0f2cd9a73d27b982b856779e7148f/char%20left%20jumping.png',console.log("chlj image loaded"))
 
}
function setup() {
  createCanvas(ww, wh);
  bg1 = new bg(0,0)
  bg2 = new bg(0,-1500)
  sc = new Score(0,highscore)
  pl = new Player(700, 1220, 50, 80)
  v1 = new Vertex(600,1350)
  v2 = new Vertex(800,1300)
  p1 = new Platform(v1,v2,pv,pvx)
  plat.push(p1)
  v1 = new Vertex(200,1150)
  v2 = new Vertex(400,1100)
  p2 = new Platform(v1,v2,pv,pvx)
  plat.push(p2)
  v1 = new Vertex(650,950)
  v2 = new Vertex(850,900)
  p3 = new Platform(v1,v2,pv,pvx)
  plat.push(p3)
  v1 = new Vertex(150,750)
  v2 = new Vertex(350,700)
  p4 = new Platform(v1,v2,pv,pvx)
  plat.push(p4)
  v1 = new Vertex(600,550)
  v2 = new Vertex(800,500)
  p6 = new Platform(v1,v2,pv,pvx)
  plat.push(p6)
  v1 = new Vertex(450,350)
  v2 = new Vertex(650,300)
  p7 = new Platform(v1,v2,pv,pvx)
  plat.push(p7)
  v1 = new Vertex(600,150)
  v2 = new Vertex(800,100)
  p7 = new Platform(v1,v2,pv,pvx)
  plat.push(p7)
  v1 = new Vertex(200,-50)
  v2 = new Vertex(400,-100)
  p7 = new Platform(v1,v2,pv,pvx)
  plat.push(p7)
  button = createButton('reset highscore');
  button.position(300,1500)
  button.size(400, 50)
  button.style('font-size', '35px');
  button.mousePressed(resetHighScore)
}

function resetHighScore(){
  hsreset = true
}
function draw() {
  if(start == false){
    bg1.draw()
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
  stroke(0) 
  fill(0)
  if(plat.length <= 7){
    pvx = (Math.floor(Math.random()*sc.c*0.1))
    if (Math.random() > 0.5){pvx = -pvx}
    var xcor = Math.floor(Math.random() * 800)
    var ycor = plat[6].y3 - 200
    var v1 = new Vertex(xcor, ycor+50)
    var v2 = new Vertex(xcor+200, ycor)
    var nplat = new Platform(v1, v2, pv,pvx,Math.random())
    plat.push(nplat)
    console.log("yeni platform eklendi")
  }


  for (var key in plat){      
    if(key > 0){
      var mes = plat[key].y1 - plat[key -1].y1
      k2 = key -1}         
    plat[key].draw()
    plat[key].vy = pv
    if (plat[key].collide()){
      pl.y = plat[key].y2 - (pl.sy)                                      
      pl.vy = pv                                                          
      pl.ay = 0                                                          
      pl.onPlatform = true  
      if(plat[key].touched == false){
        plat[key].touched = true
      }
    }                                          
    if(plat[key].y1 > 1550){
      plat.splice(key,1)
        sc.c = sc.c + 1
    }
    if(plat[key].isboosted()){
      inst = true                                              
      pl.onPlatform = false                                                                                      
      pl.vy = -30  
      pv = 22
      for (var key in plat){plat[key].vy = 20}
    }
  }

  if(keyIsPressed){
    if(keyIsDown(65)||keyIsDown(37)){                                        //                                                       
      pl.vx = -15
      pl.last_left = true                                     //                                                          
    }else if(keyIsDown(68)||keyIsDown(39)){                                  //      KEYBOARD CONTROLS                                                                                                     
      pl.vx = 15 
      pl.last_left = false                                    //                                                   
    }else if(!keyIsDown(68) && !keyIsDown(65) && !keyIsDown(39) && !keyIsDown(37)){pl.vx = 0}     //                                                          
    if(keyIsDown(87) ||keyIsDown(38) ){                                       //
      if(pl.onFloor == true || pl.onPlatform == true){        //                                                            
      inst = true                                             //      KEYBOARD CONTROLS  
      pl.onPlatform = false                                   //                                                            
      pl.vy = -22                                             //  
      pl.ay = g                                               //                                  
    }}                                                             
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

  for(var key in plat){
    plat[key].update()
  }   
  bg1.update()
  bg2.update()
  pl.update()
  pl.draw()
  sc.draw()
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
    if(hsreset){storeItem("hs",0)}else{
    storeItem("hs",sc.h)}
    dead = true
    noLoop()
  }}}

