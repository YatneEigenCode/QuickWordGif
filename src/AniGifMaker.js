//This class was designed to work in the CETB environment. Modify it to work as standalone.

//12-23-2017 v0.143 24px
AniGifMaker=function(){
  this.dim= {w:360, h:160, d:1200, sep:'\n'}  //d in seconds
  this.dim.colors= ['blue','black','red','#EEEEDD'];
  this.setDim= function(k,v){ this.dim[k]=v }
  const $t= this;
  this.start= function(s){
    const D= document;
    const ag = new Animated_GIF({repeat:null}), dim=this.dim;
    ag.setSize(dim.w, dim.h);
    ag.setDelay(dim.d);
    const ian = D.body.appendChild(D.createElement('img'));

    const ctx= $t.prepCanvas(D.createElement('canvas'));
    s.split(dim.sep).map( function(x,i){
      ag.addFrame($t.canvasWk(ctx,x,i));
    });
    ag.getBase64GIF(function(image){ ian.src = image; });
  }
  this.prepCanvas= function(cnv){
    cnv.width= $t.dim.w; cnv.height= $t.dim.h;
    const ctx= cnv.getContext('2d');
    ctx.fillStyle= 'yellow';
    ctx.textAlign= 'center';
    ctx.font= "24px Arial";
    return ctx;
  }
  this.canvasWk= function( ctx, x, i){
      const n= $t.dim.colors.length-1;
      ctx.clearRect(0, 0, $t.dim.w, $t.dim.h);
      ctx.fillStyle= $t.dim.colors[n];
      ctx.fillRect(0, 0, $t.dim.w, $t.dim.h);
      ctx.fillStyle= $t.dim.colors[i % n];
      ctx.fillText(x, $t.dim.w/2, $t.dim.h/2); 
      const img= new Image();
      return [img,img.src= ctx.canvas.toDataURL('image/png')][0];
  }
}
