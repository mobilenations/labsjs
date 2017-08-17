/*
	utm-append.js
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

    if(!(urlparams.utm_campaign&&urlparams.utm_source&&urlparams.utm_medium))
      return false;

    this.tagClasses();

  }


  /*

    Useful for when we want to keep the utm parameters we received, even wirth outbound links

    Use: <a class="utm-append" href="http://gamestash.com/signup/">Sign Up Today</a>

    Auto-Rewritten to: http://gamestash.com/signup/utm_source=fb&utm_medium=retargeting&utm_campaign=social

    IF: the user visited with parameter already set

  */
  tagClasses(){

    // Update utm-append Classes
    $('.utm-append').each(function(){

      // Start with existing URL
      URL = $(this).attr('href');

      // Should we append with ? or &
      URL += (URL.indexOf('?') > 0 ? '&' : '?');

      // Append UTM info
      URL += 'utm_source=' + urlparams.utm_source + '&utm_medium=' + urlparams.utm_medium + '&utm_campaign=' + urlparams.utm_campaign;

      // Rewrite URL
      $(this).attr('href',URL);

    });

  }


}

$(function(){
  new utmAppend();
});
