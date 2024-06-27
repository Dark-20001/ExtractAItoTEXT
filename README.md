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

The basic theroy is from and Illustrator file: **example.ai** export the text layers to text file named **example.ai.txt**.
After translate the text file, script tried to find file **example.ai.txt** and import back to **example.ai**

The structre of the text file is like:
~~~
[BEGIN _0 1111111111111111111111111111111111111 BEGIN]
1111111111111111111111111111111111111
[END _0 1111111111111111111111111111111111111 END]

[BEGIN _0 是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。<br>滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。<br>是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。<br>滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。<br>是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多 BEGIN]
是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。<br>滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。<br>是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。<br>滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。<br>是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多
[END _0 是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。<br>滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。<br>是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。<br>滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。<br>是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多 END]

[BEGIN _0 例：5环电阻 依次为：红黄红黑金 读为242Ω 误差为±0.5%<br>例：5环电阻 依次为：橙白黄红银 读为39400Ω=39.4K 误差为±10%<br>例：5环电阻 依次为：橙橙红金红 其中橙橙红为332Ω在乘上0.1=33.2Ω 误差为±2% <br>从以上得知,读第四色环为金或银色一定要注意，因为它是乘的负数。<br>关于误差率：本软件误差率的得数须乘上100，如算出误差得数显示0.02在乘上100=2% BEGIN]
例：5环电阻 依次为：红黄红黑金 读为242Ω 误差为±0.5%<br>例：5环电阻 依次为：橙白黄红银 读为39400Ω=39.4K 误差为±10%<br>例：5环电阻 依次为：橙橙红金红 其中橙橙红为332Ω在乘上0.1=33.2Ω 误差为±2% <br>从以上得知,读第四色环为金或银色一定要注意，因为它是乘的负数。<br>关于误差率：本软件误差率的得数须乘上100，如算出误差得数显示0.02在乘上100=2%
[END _0 例：5环电阻 依次为：红黄红黑金 读为242Ω 误差为±0.5%<br>例：5环电阻 依次为：橙白黄红银 读为39400Ω=39.4K 误差为±10%<br>例：5环电阻 依次为：橙橙红金红 其中橙橙红为332Ω在乘上0.1=33.2Ω 误差为±2% <br>从以上得知,读第四色环为金或银色一定要注意，因为它是乘的负数。<br>关于误差率：本软件误差率的得数须乘上100，如算出误差得数显示0.02在乘上100=2% END]
~~~

The text repeated three times
  
The beginning

~~~
[BEGIN _0 **xxx** BEGIN]
~~~

~~~
*The main content*
~~~
---------------------------------------------------------(only translate in this part)

The ending

~~~
[END _0 **xxx** END]
~~~
