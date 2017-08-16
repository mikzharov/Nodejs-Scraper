var path = {};
path.api_objects = {};

//path.api_objects.METHOD where method is the HTTP method used by clients to access this server
path.api_objects.get = [];
path.api_objects.post =[];

path.api_objects.get.push({
    outbound_url:"https://www.nationstates.net/nation=:id",//The url to scrap from
    outbound_protocol:"GET",//The method to use when scrapping
    inbound_url:"/nation/:id",//The path that should be used to start scrapping on this server
});
module.exports = path;