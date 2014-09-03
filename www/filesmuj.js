/**
 * 
 * 
 */
// DOM s daty - nacteno z SD nebo ze serveru 
// var xmlData = loadXMLDoc("katvozlist.xml"); 
var xmlData = null;
// 
var xslJednoSlovo = null;
// tabulka 
var xmlVDT = null;
// nastavovane cesty
// var pathOnSdcard = "extSdCard";
// var pathOnAdr = "KatvozDMD";
var pathOnSdcard = "";
var pathOnAdr = "";
//
var prefixFile = "file:///mnt/";
// kompletni cesta na adresar 
var pathRootAdr = "file:///mnt/extSdCard/DramSprt/";
var seznamlekci = "seznamlekci.xml";
// var pathRootAdr = "file:///mnt/extSdCard/KatvozDMD/";

var isChrome = false;
// nastaveni seznamu zobrazovanych VTD pro jednotlive stranky/zalozky tab1, tab2 tab3
var parambox1 = "";
var parambox2 = "";
var parambox3 = "";
var parambox4 = "";


var paramtext1 = "";
var paramtext2 = "";
var paramtext3 = "";
var paramtext4 = "";
// nazvy parametru v databazi localstore
var nameData1 = "box1";
var nameData2 = "box2";
var nameData3 = "box3";
var nameData4 = "box4";
// cesty na server Hermes DMD
var serverDMD = "localhost:3733";



function kontrola()
{
	var soubor = null;
	 alert("KONTROLA content");	
	 
	   // 1.  ok:      soubor = loadXMLDoc("file:///android_asset/www/lekcetest1.xml");
	   // 1.  nejde :  soubor = loadXMLDoc("file://data/lekcetest1.xml");
	   // 1.  nejde :  soubor = loadXMLDoc("//data/lekcetest1.xml");
   // 2. nejde: soubor = loadXMLDoc("content://dram.sprt.dramsprt/lekcetest1.xml");
   // 3. nejde soubor = loadXMLDoc("data://data/dram.sprt.dramsprt/lekcetest1.xml");
	 
	 alert("Vysledek = " + soubor);	
}

  function loadXMLDoc(dname) { 
      console.log("loadXMLDoc " + dname); 
      try {
       xhttp = new XMLHttpRequest(); 
       xhttp.open("GET",dname,false); 
       xhttp.setRequestHeader("Content-type","application/xhtml+xml");     
       xhttp.send("");
       if(((xhttp.status !== 200)&&(xhttp.status !== 0)) || (! (xhttp.responseXML) ) )
       {  document.getElementById("errortxt").innerHTML = 
                   "ERR-loadXMLDoc1: " + xhttp.status + "\n načítaný soubor: " + dname  + "\n readyState: " + xhttp.readyState ;
          location.replace("#errorspage");
       }    
  	//    alert("ERR-loadXMLDoc1: " + xhttp.status + "\n načítaný soubor: " + dname  + "\n readyState: " + xhttp.readyState  );
            alert("responseTExt = "+xhttp.responseText);
       return xhttp.responseXML;
      } catch(e) {
          alert("CATCH E = " + e);
          document.getElementById("errortxt").innerHTML = e;
          location.replace("#errorspage");
          return nill;
      }
  } 
  
  function loadXMLbezErr(dname) { 
    console.log("loadXMLbezErr " + dname);  
    if (window.XMLHttpRequest) { 
      xhttp = new XMLHttpRequest(); 
    } else { 
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");   
    } ;
      xhttp.open("GET",dname,false); 
      xhttp.send("");
      if(((xhttp.status != 200)&&(xhttp.status != 0)) || (! (xhttp.responseXML) ) ) 
  	   return null;
      // alert("loadXMLDoc OK " + dname);
      return xhttp.responseXML;
  } 
  
  function konvertDataToTarget(xslfile,filter,target) {
   // konvertuje xmlData pomoci xslfile do elementu target
   if (xmlData==null) return;
   var xsl = loadXMLDoc(xslfile); 
   if (xsl==null) return;
    // code for IE 
    if (window.ActiveXObject) { 
    	    var pp = xsl.selectSingleNode("//xsl:param[@name='param1']");
	if (pp==null)
	 {
	   alert("NenĂ­ naÄŤtena sprĂˇvnĂˇ definice xsl !! " + xsl.xml);
	 }
	 else
	 {
	 	 pp.text = filter;  // parametr str	
	 }
  	    
      var ex = xmlData.transformNode(xsl);   
      document.getElementById(target).innerHTML = ex; 
    } 
    // code for Mozilla, Firefox, Opera,etc. 
    else if (document.implementation &&  
                 document.implementation.createDocument) { 
      var xsltProcessor=new XSLTProcessor(); 
      xsltProcessor.importStylesheet(xsl);   
      xsltProcessor.setParameter(null, "param1", filter);
      resultDocument = xsltProcessor.transformToFragment(xmlData,document); 
      var ele = document.getElementById(target);
      while ( ele.firstChild ) ele.removeChild( ele.firstChild );
      ele.appendChild(resultDocument); 
    } 
  } 

  function konvertXmlToTarget(xml,xsl,filter,target) {
    // konvertuje xmlfile pomoci xslfile do elementu target
    console.log("konvertXmlToTarget " + xml);
    // code for IE 
    if (window.ActiveXObject) { 
    	    var pp = xsl.selectSingleNode("//xsl:param[@name='param1']");
	if (pp==null)
	 {
	 	 alert("konvertXmlToTarget: NenĂ­ naÄŤtena sprĂˇvnĂˇ definice xsl !! " + xsl.xml);
	 }
	 else
	 {
	 	 pp.text = filter;  // parametr str	
	 }

      var ex = xml.transformNode(xsl);   
      document.getElementById(target).innerHTML = ex; 
    } 
 
    // code for Mozilla, Firefox, Opera,etc. 
    else if (document.implementation &&  
             document.implementation.createDocument) { 
      var xsltProcessor=new XSLTProcessor(); 
      xsltProcessor.importStylesheet(xsl);   
      xsltProcessor.setParameter(null, "param1", filter);
      resultDocument = xsltProcessor.transformToFragment(xml,document); 
      var ele = document.getElementById(target);
      while ( ele.firstChild ) ele.removeChild( ele.firstChild );
      ele.appendChild(resultDocument); 
    } 
  } 
  
 function konvertXmlToTarget3(xmlfile,xslfile,filter1,filter2,filter3,target) {
   // konvertuje xmlfile pomoci xslfile do elementu target
   console.log("konvertXML ");
   var xml = loadXMLDoc(xmlfile);
    	if (xml==null) return;
   var xsl = loadXMLDoc(xslfile); 
    	if (xsl==null) return;
  
    // code for IE 
    if (window.ActiveXObject) { 
    	    var pp = xsl.selectSingleNode("//xsl:param[@name='param1']");
	if (pp==null)
	 {
	 	 alert("konvertXmlToTarget: NenĂ­ naÄŤtena sprĂˇvnĂˇ definice xsl !! " + xsl.xml);
	 }
	 else
	 {
	 	 pp.text = filter;  // parametr str	
	 }
	 	     	    
      var ex = xml.transformNode(xsl);   
      document.getElementById(target).innerHTML = ex; 
    } 
 
    // code for Mozilla, Firefox, Opera,etc. 
    else if (document.implementation &&  
             document.implementation.createDocument) { 
      var xsltProcessor=new XSLTProcessor(); 
      xsltProcessor.importStylesheet(xsl);   
      xsltProcessor.setParameter(null, "param1", filter1);
      xsltProcessor.setParameter(null, "param2", filter2);
      xsltProcessor.setParameter(null, "param3", filter3);
      resultDocument = xsltProcessor.transformToFragment(xml,document); 
      var ele = document.getElementById(target);
      while ( ele.firstChild ) ele.removeChild( ele.firstChild );
      ele.appendChild(resultDocument); 
    } 
  } 
  

  
  function zobrjedno(spz)
  {
  	  konvertDataToTarget("jednoauto.xsl",spz,"jednoauto");
  	  gototab(5);
  }	  
    
/*
 *   ovladani okenka s nastavenim
 */

 
  /*
  * ulozeni nastavenych checkboxu
  */
  function ulozSettings(checkname)
  {
      var x=document.getElementsByName(checkname);;
      var data = "";
      for (var i=0;i<x.length;i++)
      {   
       if(x.item(i).checked)	      
          data = data + '-' + x.item(i).value + '-'; 
      }
      // alert("data  =  " + data);   
      // ulozime do pameti pod jmenem checkboxu
      localStorage.setItem(checkname, data);
      return data;
  }
  /*
   * ulozeni nastavenych textu
   */
   function ulozSettingsTxt(name)
   {
       var x=document.getElementsByName(name);
       var data = x.item(0).value;
       // alert("data  =  " + data);   
       // ulozime do pameti pod jmenem checkboxu
       localStorage.setItem(name, data);
       return data;
   }

  function nactiSettings(checkname)
  /* naÄŤte nastavenĂ­ box1,box2,box3 a aktualiuje zaĹˇkrtĂˇvĂˇtka podle stringu
     -OS--OSMON--NAKL-
  */
  {
      var data = localStorage.getItem(checkname);
       //alert("NactiSettings = " + checkname + ' = ' + data);
      if(data == null) data = "--";
      // nastaveni checku  podle stringu 
      var x=document.getElementsByName(checkname);
      var naz = "--";
      for (var i=0;i<x.length;i++)
      {   
       naz = '-' + x.item(i).value + '-';  // musi tam byt cely retezec 	      
       if(data.indexOf(naz) >= 0)	      
          x.item(i).checked = true; 
      }
      return data;
  };
  function nactiSettingsTxt(name)
  {
      var data = localStorage.getItem(name);
      return data;
  };

  function konvertAll()
  {	
	  console.log("konvertALL()");
  	  //  alert("wait a minute");
  	  konvertDataToTarget("listspz.xsl", parambox1, "listB1");
  	  konvertDataToTarget("listspz.xsl", parambox2, "listB2");
  	  konvertDataToTarget("listspz.xsl", parambox3, "listB3");
  	  konvertDataToTarget("listspz.xsl", parambox4, "listB4");

  };
  
  
  function nactiSettingsAll()
  {	
  	  parambox1 = nactiSettings('box1');
  	   //alert("parambox1 = " + parambox1);
  	  parambox2 = nactiSettings('box2');
  	  parambox3 = nactiSettings('box3');
  	  parambox4 = nactiSettings('box4');	
          konvertAll();
  };

   function ulozSettingsAll()
   
  {
  	  parambox1 = ulozSettings('box1');
  	  parambox2 = ulozSettings('box2');
  	  parambox3 = ulozSettings('box3');
  	  parambox4 = ulozSettings('box4');
  	  
  	  paramtext1 = ulozSettingsTxt('text1');
  	  paramtext2 = ulozSettingsTxt('text2');
  	  paramtext3 = ulozSettingsTxt('text3');
  	  paramtext4 = ulozSettingsTxt('text4');
  	  
  	  document.getElementById('B1').innerHTML = paramtext1;
  	  document.getElementById('B2').innerHTML = paramtext2;
  	  document.getElementById('B3').innerHTML = paramtext3;
  	  document.getElementById('B4').innerHTML = paramtext4;
  	
  	  konvertAll();
  };
 
  function clearSettingsAll()
  {	
    localStorage.clear();	
  };
  
  function ulozAzobraz()
  // animuje cekani a zaroven uklada nastaveni
  // nakonec se vrati na prvni obrazovku 
  {
    document.getElementById("waitblock").style.display = 'block';
    var aid = document.getElementById("waitblock");	
        aid.style.display = 'block';
        // alert("startBadAns " + aid);
        addClass(aid, 'waitblock2');
         var uvodTimer = setInterval(function()
    	      {
    	      	   clearInterval(uvodTimer);
    	      	   uvodTimer = null;
    	           ulozSettingsAll();
    	           gototab(seznam1Str);
    	           removeClass(aid,'waitblock2');
           }
    	      ,5000);

    
  };
  
  
  
  