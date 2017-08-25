var path = {};
path.api_objects = {};

//path.api_objects.METHOD where method is the HTTP method used by clients to access this server
path.api_objects.get = [];
path.api_objects.post =[];

path.api_objects.get.push({
    //param: = path parameters; ex. https://example.com/path/node/564
    //query: = query parameters; ex. ?test=5&me=6
    outbound_url:"https://me:too@www.nationstates.net/nation=param:id",//The url to scrap from
    outbound_method:"GET",//The method to use when scrapping
    outbound_headers:{},
    outbound_body:{},
    inbound_url:"/nation/:id",//The path that should be used to start scrapping on this server
});
body = "param=query:me";
path.api_objects.get.push({
    //param: = path parameters; ex. https://example.com/path/node/564
    //query: = query parameters; ex. ?test=5&me=6
    outbound_url:"https://requestb.in/1h5vtsa1",//The url to scrap from
    outbound_method:"POST",//The method to use when scrapping
    outbound_body: body,
    outbound_headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    inbound_url:"/posttest",//The path that should be used to start scrapping on this server
});
module.exports = path;
/*
outbound_body: body,
outbound_headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(body)
},
*/