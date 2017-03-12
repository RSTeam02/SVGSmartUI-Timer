# SVGSmartUI-Timer 0.x

The project is based on the binary countdowntimer project, its UI is the table (matrix) itself and each unit (hour, minute, second) is defined by binary digits. The SVG display allows to scale viewing size, when the browser window is resized.
Every unit has a sum from 1 to 63, for example:<br />
 0--0--32--0<br />
 0--16-0--0<br />
 0--8--8--0<br />
 0--4--4--0<br />
 2--2--0--0<br />
 0--0--1--0<br />=<br /> 
 2--30-45-0

+ 12.03: Raster with vertical alignment => every digit assigned to vertical column. 
+ 04.03: obsolete files removed, various small fixes (ledMatrix caused additionally O(n2))
+ 02.03: integer visualization mode added
+ UI controls with circle dots (on is 1, off is 0)
+ increment or decrement when push or repush again
+ elastic, flexible view, when window is resized (viewbox)
+ like previous project: 1x reset restore previous timer, 2x reset set timer to 0
