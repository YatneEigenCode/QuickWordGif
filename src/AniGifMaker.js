//This class was designed to work in the CETB environment. Modify it to work as standalone.

//12-20-2017 v0.121 remove CETB calls
AniGifMaker=function(){
  this.dim= {w:320, h:160, d:1, sep:'\n'}  //d in seconds
  this.setDim= function(k,v){ this.dim[k]=v }
  this.start= function(s){
    const D= document;
    const ag = new Animated_GIF(), dim=this.dim;
    ag.setSize(dim.w, dim.h);
    ag.setDelay(dim.d);
    const ian = D.body.appendChild(D.createElement('img'));

    const cnv= D.createElement('canvas');
    cnv.width= dim.w; cnv.height= dim.h;
    const ctx= cnv.getContext('2d');
    ctx.fillStyle= 'yellow';
    ctx.textAlign= 'center';
    s.split(dim.sep).map( function(x){
      ctx.clearRect(0, 0, dim.w, dim.h);
      ctx.fillText(x, dim.w/2, dim.h/2);      
      const img= new Image();
      img.src= cnv.toDataURL('image/jpeg');
      ag.addFrame(img);
    });
    ag.getBase64GIF(function(image){ ian.src = image; });
  }
}
