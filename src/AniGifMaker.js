//12-31-2017 v0.157 mkSpinnerImg(ctx)
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
    const ian = D.body.appendChild(
      D.createElement('img'));

    const ctx= $t.prepCanvas(
      D.createElement('canvas'));
    s.split(dim.sep).map( function(x,i){
      if (!$t.dotCommand(ctx,x,i))
        ag.addFrame($t.canvasWk(
          ctx,x,i));
      ag.setDelay($t.dim.d);
    });
    ian.src= this.mkSpinnerImg(ctx).src;
    ag.getBase64GIF(function(image){
      ian.src = image;
      ag.destroy();
    });
  }
  this.prepCanvas= function(cnv){
    cnv.width= $t.dim.w; cnv.height= $t.dim.h;
    const ctx= cnv.getContext('2d');
    ctx.fillStyle= 'yellow';
    ctx.textAlign= 'center';
    ctx.font= "24px Arial";
    return ctx;
  }
  this.dotCommand= function( ctx, x, i){
    var num;
    if (x.indexOf('.') != 0) return false;
    var at= x.split(' ');
    if (at[0]=='.font') ctx.font= at.slice(1).join(' ');
    if (at[0]=='.colors') this.dim.colors= at.slice(1);
    if (at[0]=='.delay')
      if (!isNaN(num=parseInt(at[1])))
        $t.dim.d=num;
    return true;
  }
  this.mkSpinnerImg=function(ctx){
    return this.canvasWk(ctx,
      'Working...',0);
  }
  this.canvasWk= function( ctx, x, i){
      const n= $t.dim.colors.length-1;
      ctx.fillStyle= $t.dim.colors[n];
      ctx.fillRect(0, 0, $t.dim.w, $t.dim.h);
      ctx.fillStyle= $t.dim.colors[i % n];
      ctx.fillText(x, $t.dim.w/2, $t.dim.h/2); 
      const img= new Image();
      return [img,img.src= ctx.canvas.toDataURL( 'image/png' )][0];
  }
}
