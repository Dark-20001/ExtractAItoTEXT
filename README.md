Extract Text from Adobe illustrator to text for translate and write back to Adobe illustrator after translate in text file.
Originally script from marceloliao@hotmail.com during his work in SDL.
Updated by me.

Adobe illustrator usually placed in its installation folder, example version 2023:
C:\Program Files\Adobe\Adobe Illustrator 2023\Presets\
and under Presets locate language folder:
zh_CN or en_US or others depends on the language version you installed
And under language folder locate:
Scripts or ‘脚本’ folder

So for Adobe Illustrator 2023 Chinese version it is:
C:\Program Files\Adobe\Adobe Illustrator 2023\Presets\zh_CN\脚本
and English version is:
C:\Program Files\Adobe\Adobe Illustrator 2023\Presets\en_US\Scripts

Marcelo's version supports multiple file but need manually open all files in Illustrator but if the file amount is too large to fill all your screen, that will be a big problem.
So I adjusted the script to open files from a folder and after export or import close the file and save memory.
