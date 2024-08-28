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
    this.onPlatform = false
    this.v = sqrt((this.vx * this.vx) + (this.vy * this.vy))
  }
}
class Vertex {
  constructor(x, y) {
    this.x = x
    this.y = y
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
    stroke(173, 0, 179)    
    fill(173, 0, 179)                                      
    textSize(50)   
    if(sc.c > sc.h){sc.h = sc.c}
    text("current score: " + this.c, 20 , 80 )
    text("high score: " + this.h, 650 , 80 )
    pop()
  }
  drawhighscore(){
    push()
    fill(173, 0, 179)
    stroke(173, 0, 179)                                          
    textSize(50)   
    text("high score: " + this.h, 650 , 80 )
    pop()
  }

}
class Platform {
  constructor(v1, v3, vy, vx) {
    this.x1 = v1.x
    this.y1 = v1.y
    this.x2 = v1.x
    this.y2 = v3.y
    this.x3 = v3.x
    this.y3 = v3.y
    this.x4 = v3.x
    this.y4 = v1.y
    this.sx = abs(this.x1 - this.x3)
    this.sy = abs(this.y1 - this.y3)
    this.vy = vy
    this.vx = vx
    this.vxb = false
    this.touched = false
  }
  update(){
      this.y1 = this.y1 + this.vy
      this.y2 = this.y2 + this.vy
      this.y3 = this.y3 + this.vy
      this.y4 = this.y4 + this.vy
      if (this.x1 <= 0 || this.x3 >= ww){
        console.log("a")
        this.vx = this.vx * -1}
      this.x1 = this.x1 + this.vx
      this.x2 = this.x2 + this.vx
      this.x3 = this.x3 + this.vx
      this.x4 = this.x4 + this.vx

  }
  draw(){
    rect(this.x2,this.y2,this.sx,this.sy)
  }
  collide(){
    if(pl.y + pl.sy > this.y3 - 5 && pl.y + pl.sy < this.y1 && pl.x < this.x3 && pl.x + pl.sx> this.x1 && pl.vy >= 0){               
        return(true)                                                                                                                                                                      
  }}
}


var start = false
var ww = 1000
var wh = 1500
var g = 1
var inst
var plat = []
var pv = 4
var highscore
var hsreset = false
var dead = false
var pvx = 0
var platimg
function keyPressed(){
  start = true
  if(dead){
    window.location.reload()
  }
}
function preload() {
 highscore = getItem('hs')
 platimg = loadImage('platform.png',console.log("platform image loaded"))
}
function setup() {
  createCanvas(ww, wh);
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
    background(220);
    fill(0)
    stroke(0) 
    for (var key in plat){             
      plat[key].draw()}
    rect(pl.x,pl.y,pl.sx,pl.sy)
    fill(207, 23, 164)
    stroke(207, 23, 164)                                          
    textSize(85) 
    sc.drawhighscore()  
    text("press any key to start", 70 , 450 ,)
  }else{
  stroke(0) 
  background(220);
  fill(0)
  if(plat.length <= 7){
    pvx = (Math.floor(Math.random()*sc.c*0.1))
    if (Math.random() > 0.5){pvx = -pvx}
    var xcor = Math.floor(Math.random() * 800)
    var ycor = -100
    var v1 = new Vertex(xcor, ycor)
    var v2 = new Vertex(xcor+200, ycor-50)
    var nplat = new Platform(v1, v2, pv,pvx)
    plat.push(nplat)
  }


  for (var key in plat){                
    plat[key].draw()
    if (plat[key].collide()){
      pl.y = plat[key].y2 - (pl.sy)                                      
      pl.vy = pv                                                          
      pl.ay = 0                                                          
      pl.onPlatform = true  
      if(plat[key].touched == false){
        sc.c = sc.c + 1
        plat[key].touched = true
      }
    }                                          
    if(plat[key].y1 > 1550){
      plat.splice(key,1)
    }
    
  }

  if(keyIsPressed){
    if(keyIsDown(65)){                                        //                                                       
      pl.vx = -20                                             //                                                          
    }else if(keyIsDown(68)){                                  //      KEYBOARD CONTROLS                                                                                                     
      pl.vx = 20                                              //                                                   
    }else if(!keyIsDown(68) && !keyIsDown(65)){pl.vx = 0}     //                                                          
    if(keyIsDown(87) ){                                       //
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
  pl.vx = pl.vx + pl.ax                                           // ACCELERATION SPEED CALCULATIONS
  pl.vy = pl.vy + pl.ay                                           //     MUST BE LAST !!!!!!
  pl.x = pl.x + pl.vx
  pl.y = pl.y + pl.vy
  rect(pl.x,pl.y,pl.sx,pl.sy)
  sc.draw()
  inst = false

  if(pl.onFloor){
    fill(207, 23, 164)
    stroke(207, 23, 164)                                          // CHECK IF THE GAME IS FINISHED
    textSize(250)   
    text("you ded", 70 , 450 ,)
    textSize(75)  
    text("Press any key to restart", 100 , 580 ,)
    if(hsreset){storeItem("hs",0)}else{
    storeItem("hs",sc.h)}
    dead = true
    noLoop()
  }}}