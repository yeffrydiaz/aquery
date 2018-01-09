/////////////////////
function aquery(r) {
 return new Promise((resolve,reject) => {
  let asyncr = r.asyn || true,
      method = r.method || r.type || "GET",
       dType = r.dataType || null,
	 url = r.url || r,
    datasend = '';
   if(r.data){
	  if(typeof r.data === 'string'){
	   datasend = r.data;
	   }else{
		  let str = "";
       for (let prop in r.data) {
        if(!r.data.hasOwnProperty(prop)){continue;}
         str += prop + "=" + r.data[prop] + "&";
          }
	   datasend = str.slice(0,-1);
	   }
	   url = method === "GET" ? url+"?"+datasend : url;
          }
          const xhr = new XMLHttpRequest();
	        xhr.onload = function(){
		 const resp = dType==="json" ?
			      JSON.parse(xhr.responseText) :
			      xhr.responseText;					 
			    if(r.success)r.success(resp);		
			resolve(resp);
                     };
	          xhr.onerror = function () {
                console.log("Query Error");
              };
	     xhr.open(method,url,asyncr);
         if(method==="POST" || method==="PUT"){
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      }
   xhr.send(datasend);
  });
}
