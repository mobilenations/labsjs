/*
	extUUID
	http://mobilenations.com

	Developed by: Gio~Logist
	Powered by: Awesomeness
*/
//utm_source=fb&utm_medium=retargeting&utm_campaign=social


if(typeof urlparams === 'undefined'){
  // URL Params
  var urlparams={};location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){urlparams[k]=v});
}

class utmAppend {

  constructor(){

    // Check to see if utm_source exists or has been cookied
    if(!this.extUUIDCheck())
      return false;

    //this.autoTagAmazon();
    this.autoTagAll();

  }

  extUUIDCheck(){

    // Does a cookie extUUID exist?
    this.extUUID = this.getCookie('extUUID');

    // Overwtrite the cookie extUUID if we have a new source
    if(urlparams.utm_campaign&&urlparams.utm_source&&urlparams.utm_medium){
      this.extUUID = 'U' + urlparams.utm_campaign + 'U' + urlparams.utm_source + 'U' + urlparams.utm_medium;
      this.setCookie('extUUID',this.extUUID,30);
    }

    return this.extUUID;

  }

  autoTagAll() {
    var self = this;

    // Scan  & update entire page
    $('body :not(script)').each(function(){
      $(this).html($(this).html().replace(/UU[a-z]{2}U[a-z]{1,2}U[a-z]{1,2}U[\da-z]+(U[\da-z]+)*/g, function(match) {
          var extended = match + self.extUUID;
          if(urlparams.debugger)
            console.log(`%c [extUUID] ${match} => %o`,'color:gray', extended);
          return extended;
        }));
    });

  }

  autoTagAmazon() {
    var self = this;

    // Update any URL containing
    $('a[href*="ascsubtag"]').each(function(){

      // Start with existing URL
      URL = $(this).attr('href') + self.extUUID;

      // Rewrite URL
      $(this).attr('href',URL);

    });

  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
      return false;
  }

  setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

}

$(function(){
  new utmAppend();
});


