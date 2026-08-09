import { useDarkMode } from '@slidev/client'
import { defineMermaidRendererSetup } from '@slidev/types'
import mermaid from 'mermaid/dist/mermaid.esm.mjs'

/**
 * Mermaid im SHI-Design – Light und Dark.
 *
 * Warum ein eigener Renderer statt `defineMermaidSetup`: Slidev sammelt die
 * Setup-Rückgaben mit `Object.assign` ein und cacht das Ergebnis in einem
 * `createSingletonPromise`. Beides wertet Getter genau einmal aus, die Palette
 * fröre also beim ersten gerenderten Diagramm ein – wer danach umschaltet,
 * bekäme ein dunkles Diagramm auf heller Folie. Dieser Hook läuft dagegen bei
 * jedem Rendern, und Slidev cacht das Ergebnis pro Farbschema (der Cache-Key
 * enthält `options.theme`).
 *
 * `look: 'neo'` ist der Hebel gegen den "sieht nach Wiki aus"-Eindruck: weichere
 * Kanten, ruhigere Linien, größere Innenabstände. Dazu mehr Luft zwischen den
 * Knoten – auf einer Folie ist Weißraum wichtiger als Kompaktheit.
 *
 * ponytail: bewusst KEIN ELK-Layout (@mermaid-js/layout-elk). Es zieht elkjs
 * unter EPL-2.0/GPL-3.0 nach und bringt erst bei großen Graphen etwas – die
 * gehören ohnehin nicht auf eine Folie. Kleine Abläufe sehen mit <Flow> oder
 * <Layers> besser aus; Mermaid ist für Sequenzen, Zustände und Gantt da.
 */

/** Helle Palette – die Werte aus styles/_tokens.css. */
const light = {
  primaryColor: '#f3f8fb',
  primaryTextColor: '#3a3a3a',
  primaryBorderColor: '#0d81c4',
  secondaryColor: '#d6ebf8',
  secondaryBorderColor: '#075aae',
  tertiaryColor: '#f5f5f5',
  tertiaryBorderColor: '#e5e5e5',
  textColor: '#3a3a3a',
  lineColor: '#4b4f58',
  noteBkgColor: '#003c5f',
  noteTextColor: '#ffffff',
  noteBorderColor: '#003c5f',
  actorBkg: '#d6ebf8',
  actorBorder: '#075aae',
  actorTextColor: '#3a3a3a',
  actorLineColor: '#9aa7b4',
  signalColor: '#4b4f58',
  signalTextColor: '#3a3a3a',
  labelBoxBkgColor: '#f3f8fb',
  labelBoxBorderColor: '#0d81c4',
  labelTextColor: '#3a3a3a',
  loopTextColor: '#4b4f58',
  activationBkgColor: '#a9d5ef',
  activationBorderColor: '#075aae',
  // Ziffer in den autonumber-Kreisen. Ohne das leitet Mermaid sie aus
  // `invert(lineColor)` ab – ein Beige, das auf dem schwarzen Kreis kaum
  // lesbar ist. Der Kreis selbst hat keine Klasse, den holt das themeCSS.
  sequenceNumberColor: '#ffffff',
}

/** Dunkle Palette – die Rollen aus dem `html.dark`-Block in styles/_tokens.css. */
const dark: typeof light = {
  primaryColor: '#10202c',
  primaryTextColor: '#e8edf2',
  primaryBorderColor: '#3ba3e0',
  secondaryColor: '#16324a',
  secondaryBorderColor: '#3ba3e0',
  tertiaryColor: '#161b22',
  tertiaryBorderColor: '#262e38',
  textColor: '#e8edf2',
  lineColor: '#9aa7b4',
  noteBkgColor: '#16324a',
  noteTextColor: '#e8edf2',
  noteBorderColor: '#3ba3e0',
  actorBkg: '#16324a',
  actorBorder: '#3ba3e0',
  actorTextColor: '#e8edf2',
  actorLineColor: '#7c8794',
  signalColor: '#9aa7b4',
  signalTextColor: '#e8edf2',
  labelBoxBkgColor: '#161b22',
  labelBoxBorderColor: '#3ba3e0',
  labelTextColor: '#e8edf2',
  loopTextColor: '#e8edf2',
  activationBkgColor: '#16324a',
  activationBorderColor: '#3ba3e0',
  sequenceNumberColor: '#0e1116',
}

export default defineMermaidRendererSetup(() => {
  const { isDark } = useDarkMode()
  let counter = 0

  return async (code, options) => {
    // `theme` aus den Options verwerfen: Slidev setzt darin nur 'dark' bzw.
    // undefined, das würde unsere Palette überschreiben. Alles andere
    // (z. B. `scale` am Codeblock) bleibt.
    const { theme: _slidevTheme, ...rest } = options
    const brand = isDark.value ? '#3ba3e0' : '#075aae'

    mermaid.initialize({
      startOnLoad: false,
      ...rest,
      theme: 'base',
      look: 'neo',
      themeVariables: {
        fontFamily: '"Open Sans", sans-serif',
        fontSize: '15px',
        ...(isDark.value ? dark : light),
      },
      // Zwei Stellen, an die keine Theme-Variable heranreicht: der Kreis hinter
      // der autonumber-Ziffer (ein <marker><circle> ohne Klasse, deshalb per
      // Default schwarz) und die dort fest verdrahtete sans-serif.
      themeCSS: `
        marker[id$='-sequencenumber'] circle { fill: ${brand}; }
        text.sequenceNumber { font-family: "Open Sans", sans-serif; font-weight: 600; }
      `,
      flowchart: {
        curve: 'basis',
        nodeSpacing: 45,
        rankSpacing: 55,
        padding: 12,
      },
      sequence: {
        actorMargin: 60,
        boxMargin: 12,
        mirrorActors: false,
      },
    })

    const container = document.getElementById('mermaid-rendering-container') ?? undefined
    const { svg } = await mermaid.render(`shi-mermaid-${counter++}`, code, container)
    return svg
  }
})
