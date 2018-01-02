//1-1-2018 v0.213 closePath
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
    ian.itick=1;
    const showSpinner=function(){
      if ( ian.itick <1) return;
      ian.src= $t.mkSpinnerImg(
        ctx, ian.itick++).src;
      requestAnimationFrame(showSpinner);
    }
    showSpinner();

    s.split(dim.sep).map( function(x,i){
      if (!$t.dotCommand(ctx,x,i))
        ag.addFrame($t.canvasWk(
          ctx,x,i));
      ag.setDelay($t.dim.d);
    });
    ag.getBase64GIF(function(image){
      ian.itick=-1;
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
  this.mkSpinnerImg=function(ctx,i){
      this.canvasWk(ctx,'Working~~~'+i,0);
      const w2= $t.dim.w/2, h2= $t.dim.h/2;
      const ith= i*Math.PI/300, img=new Image();
      ctx.fillStyle= 'white';
      [0, Math.PI].map( function(x) {
        ctx.beginPath();
        ctx.moveTo( w2, h2 );
        ctx.arc( w2, h2, 0, x+ith, x + ith+Math.PI/2);
        ctx.closePath()
        ctx.fill();
      });
      return [img,img.src= ctx.canvas.toDataURL( 'image/png' )][0];
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
