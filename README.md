# SVGSmartUI-Timer 0.x

The project is based on the binary countdowntimer project, its UI is the table (matrix) itself and each unit (hour, minute, second) is defined by binary digits. The SVG display allows to scale viewing size, when the browser window is resized.
Every unit has a sum from 1 to 63, for example:
0+0+0+0+2+0 = 2 hour<br />
0+16+8+4+2+0 = 30 min<br />
32+0+8+4+0+1 = 45 sec<br />

+ 02.03: integer visualization mode added
+ UI controls with circle dots (on is 1, off is 0)
+ increment or decrement when push or repush again
+ elastic, flexible view, when window is resized (viewbox)
+ like previous project: 1x reset restore previous timer, 2x reset set timer to 0