//This class was designed to work in the CETB environment. Modify it to work as standalone.

//12-23-2017 v0.134 $t
AniGifMaker=function(){
  this.dim= {w:320, h:160, d:150, sep:'\n'}  //d in seconds
  this.setDim= function(k,v){ this.dim[k]=v }
  const $t= this;
  this.start= function(s){
    const D= document;
    const ag = new Animated_GIF({repeat:null}), dim=this.dim;
    ag.setSize(dim.w, dim.h);
    ag.setDelay(dim.d);
    const ian = D.body.appendChild(D.createElement('img'));

    const cnv= D.createElement('canvas');
    cnv.width= dim.w; cnv.height= dim.h;
    const ctx= cnv.getContext('2d');
    ctx.fillStyle= 'yellow';
    ctx.textAlign= 'center';
    ctx.font= "24px Arial";
    s.split(dim.sep).map( function(x){
      ag.addFrame($t.canvasWk(ctx,x));
      ag.setDelay(dim.d);
    });
    ag.getBase64GIF(function(image){ ian.src = image; });
  }
  this.canvasWk= function( ctx, x ){
      ctx.clearRect(0, 0, dim.w, dim.h);
      ctx.fillText(x, dim.w/2, dim.h/2);      
      const img= new Image();
      img.src= cnv.toDataURL('image/jpeg');
      return img;
  }
}
