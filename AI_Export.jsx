// ############################################################################
// # 
// #	Recursive Text Exporter for Adobe Illustrator v1.0
// #	(C) Copyright 2009 by Marcelo Liao
// #	marceloliao@hotmail.com
// #	
// ############################################################################

var extractAllHidden;

main();

function main()
{
  extractAllHidden = 1;
  if (app.documents.length === 0)
  {
    alert("Please open at least one file before continue!", "Alert", true);
    return;
  }

  var extAllHidden = confirm("Would you like to extract all hidden layers? If you choose not do, only hidden layers of first level won't be exported.", true, "Extract all hidden layers?");
    if (extAllHidden === true)
    {
      extractAllHidden = 1;
    }
    else 
    {
      extractAllHidden = 0;
    }

  
  if (app.documents.length > 1)
  {
    var runMultiple = confirm("Illustrator has detected multiple Files.\nDo you wish to export content from all opened files?", true, "Export all open files?");

    if (runMultiple === true)
    {
      docs = app.documents;
    }
    else 
    {
      docs = [app.activeDocument];
    }
  }
  else
  {
    runMultiple = false;
    docs = [app.activeDocument];
  }

  for (var i = 0; i < docs.length; i++)
  {
    filePath = docs[i].path + '/AI-TextConvert-' + docs[i].name + '.txt';

    var fileOut = new File(filePath);

    fileOut.encoding = "UTF-8";

    fileOut.open("w", "TEXT", "????");

    app.activeDocument = docs[i];

    goTextExport2(app.activeDocument, fileOut, '_0');

    fileOut.encoding = "UTF-8";
    fileOut.close();
  }
  alert("All content extracted!");
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
