# SVGSmartUI-Timer 0.x


The project is based on the binary countdowntimer project, its UI is the table (matrix) itself and each unit (hour, minute, second) is defined by binary digits. Every binary digit (or decimal) is equipped with a click event listener and every click leads to an increment or decrement of an unit.   
The SVG display allows to scale viewing size, when the browser window is resized.
Every unit can be de- and incremented from 1 to 63, for example:<br />
 0---0--32--0<br />
 0--16---0--0<br />
 0---8---8--0<br />
 0---4---4--0<br />
 2---2---0--0<br />
 0---0---1--0<br />=<br /> 
 2--30--45--0

+ 23.09: instead of require.js, using native import {} from '../abc.js' command for modular classes, in Firefox experimental => enter in address bar about:config, switch dom.moduleScripts.enabled: true
+ 07.06: improve listener implementation via jquery
+ 12.05: replace Factory with Strategy pattern, seperate files for SVG shapes, more refactorings
+ 11.05: some refactoring
+ 23.04: random RGB preload, rotate R, G, B stepwise (shift all color - components at same time or specified), 
jquery for UI, instead of DOM, 
rewritten JSON for seperate timeunits 
+ 14.04: instead of RGB => RGB Sliders for 255^3 possible colors
+ 31.03: randomize R,G,B
+ 28.03: R,G,B colors added 
+ 12.03: Raster with vertical alignment (90° rotation) => every digit is assigned to a vertical column.
+ 04.03: obsolete files removed, various small fixes (ledMatrix caused additionally O(n2))
+ 02.03: integer visualization mode added
+ UI controls with circle dots (on is 1, off is 0)
+ increment or decrement when push or repush again
+ elastic, flexible view, when window is resized (viewbox)
+ like previous project: 1x reset restore previous timer, 2x reset set timer to 0
