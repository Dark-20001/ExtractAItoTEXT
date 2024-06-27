// ############################################################################
// # 
// #	Recursive Text Exporter for Adobe Illustrator v1.0
// #	(C) Copyright 2009 by Marcelo Liao
// #	marceloliao@hotmail.com
// # dark_2001@vista.aero
// #	
// ############################################################################

var extractAllHidden;

main();

function main()
{
  extractAllHidden = 1;
  
  var extAllHidden = confirm("Would you like to extract all hidden layers? If you choose not do, only hidden layers of first level won't be exported.", true, "Extract all hidden layers?");
    if (extAllHidden === true)
    {
      extractAllHidden = 1;
    }
    else 
    {
      extractAllHidden = 0;
    }

	 var folderPath = Folder.desktop.fsName + "/test/"; 
	  

	var folder = new Folder(folderPath);  
	  
	if (folder.exists) {  
	    
	    var files = folder.getFiles("*.ai"); //  .ai 文件  
	  
	    
	    for (var i = 0; i < files.length; i++) {  
	       
	        var filePath = files[i].fsName;  
	        try {  
	            
	            app.open(new File(filePath)); 
	            
	             filePath = app.activeDocument.path + '/AI-TextConvert-' + app.activeDocument.name + '.txt';

		    var fileOut = new File(filePath);

		    fileOut.encoding = "UTF-8";

		    fileOut.open("w", "TEXT", "????");

		    goTextExport2(app.activeDocument, fileOut, '_0');

		    fileOut.encoding = "UTF-8";
		    fileOut.close();
	           app.documents[0].close(SaveOptions.DONOTSAVECHANGES);
	        } catch (e) {  
	           
	            alert("打开文件时出错: " + filePath + "\n" + e.message);  
	        }  
	    }
	    alert("All content extracted!"); 
	} else {  
	    alert("文件夹不存在: " + folderPath);  
	}
}

function goTextExport2(el, fileOut, path)
{
  var layers = el.layers;

  for (var i = 0; i < layers.length; i++)
  {
    var currentLayer = layers[i];
    
    if (extractAllHidden == 1)
    {
      var subItems = new Array();
      subItems = currentLayer.pageItems;
      
      for (var j = 0; j < subItems.length; j++)
      {
        if (subItems[j].typename != "GroupItem")
        {
          if ((subItems[j].typename == "TextFrame") && (subItems[j].contents != undefined))
          {
            var extractContent;            
            extractContent = subItems[j].contents.replace("\r", "<br>", "g");
            extractContent = extractContent.replace("\u0003", "<br>", "g");
            fileOut.writeln('');
            fileOut.writeln('[BEGIN ' + path + ' ' + extractContent + ' BEGIN]');
            fileOut.writeln(extractContent);
            fileOut.writeln('[END ' + path + ' ' + extractContent + ' END]');
          }
        }
      }

      for (var j = 0; j < subItems.length; j++)
      {
        subItems = currentLayer.pageItems;
        if (subItems[j].typename == "GroupItem")
        {
          goTextExport3(subItems[j], fileOut, "_0_0");
        }
      }
    }

    else
    {
      if (currentLayer.visible)
	    {
	      var subItems = new Array();
	      subItems = currentLayer.pageItems;
	      
	      for (var j = 0; j < subItems.length; j++)
	      {
	        if (subItems[j].typename != "GroupItem")
	        {
	          if ((subItems[j].typename == "TextFrame") && (subItems[j].contents != undefined))
	          {
	            var extractContent;            
	            extractContent = subItems[j].contents.replace("\r", "<br>", "g");
	            extractContent = extractContent.replace("\u0003", "<br>", "g");
	            fileOut.writeln('');
	            fileOut.writeln('[BEGIN ' + path + ' ' + extractContent + ' BEGIN]');
	            fileOut.writeln(extractContent);
	            fileOut.writeln('[END ' + path + ' ' + extractContent + ' END]');
	          }
	        }
	      }

	      for (var j = 0; j < subItems.length; j++)
	      {
	        subItems = currentLayer.pageItems;
	        if (subItems[j].typename == "GroupItem")
	        {
	          goTextExport3(subItems[j], fileOut, "_0_0");
	        }
	      }
	    }

     }
  }
}

function goTextExport3(sG, fileOut, path)
{
  subGroupItems = sG.pageItems;
  
  for (var k = subGroupItems.length-1; k >=0 ; k--)
  {
    subGroupItems = sG.pageItems;
    if (subGroupItems[k].typename != "GroupItem" )
    {
      if ((subGroupItems[k].typename == "TextFrame")&& (subGroupItems[k].contents != undefined))
      {
        var extractContent;
        extractContent = subGroupItems[k].contents.replace("\r", "<br>", "g");
        extractContent = extractContent.replace("\u0003", "<br>", "g");
        fileOut.writeln('');
        fileOut.writeln('[BEGIN ' + path + ' ' + extractContent + ' BEGIN]');
        fileOut.writeln(extractContent);
        fileOut.writeln('[END ' + path + ' ' + extractContent + ' END]');
      }
    }
  }
  
  for (var k = subGroupItems.length-1; k >=0 ; k--)
  {
    subGroupItems = sG.pageItems;
 
    if (k < subGroupItems.length)
    {
	    if (subGroupItems[k].typename == "GroupItem")
	    {
	      
	      path = path + "_0";
	      goTextExport3(subGroupItems[k], fileOut, path)
	      
	      
	    }
    }
  }
}
