var app=require("express")();
var request=require("request");

var opt={
    key:"AIzaSyBlVIOEdggB5HA6dgkxU2khMoCbHjFsnmw",
    cx:"015155236235863256901:tibzscr-s0c",
    num:3,
    q:"flower",
    searchType:"image",
    fileType:"jpg",
    imgSize:"xlarge",
    alt:"json"
}
var recent=[];
var out=[];


app.get("/", function(req,res){
    console.log(recent);
    res.end(recent.toString());
    
});


app.get("/:id", function(req,res){
    
    if(req.params.id=="favicon.ico")
    {
        
        res.end();
        return;
    }
      console.log(req.query.offset);
    var query=(req.query);
    if(!isEmpty(query)){
        opt.start=+query.offset;
    //console.log(query);
    }
    else
    delete opt.start;
    
    opt.q=req.params.id;
    
    console.log(opt);
    request(
    {
    url: 'https://www.googleapis.com/customsearch/v1', //URL to hit
    qs: opt, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Content-Type': 'MyContentType',
        'Custom-Header': 'Custom Value'
    }
},function(err,ress,body){
  if(err) console.log(err);
  body=JSON.parse(body);
 //console.log(body);
  if(ress.statusCode !== 200 ); //etc
 // console.log(ress)
 
 out=[];
  body.items.forEach(function(val){
      var obj={
          title:val.title,
          link:val.link,
          snippet:val.snippet,
          thumbnail:val.image.thumbnailLink,
          context:val.image.contextLink
      }
      out.push(JSON.stringify(obj))
  })
    recent.unshift(opt.q);
    if(recent.length>10)
    {
        recent.slice(0,11);
    }
      res.end(out.toString());
});
    

    
});

app.listen(8080);


function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}