# Motion system

Motion communicates a change of state, not a fictitious live service. NOW panel and YOURS chapter transitions use Framer Motion opacity and 12–24px displacement over 250–300ms. All other controls respond immediately; navigation uses native anchors. No scroll hijack, autoplay, sound or blocking introduction.

`useReducedMotion()` removes displacement and sets transition duration to zero for the animated state changes. CSS `prefers-reduced-motion` disables smooth scrolling and visual transitions. Interactions must remain legible with JavaScript disabled, although the demos then become static.

The deliberately static elements are the stadium imagery, My Napoli card, social frame and funnel. Their contrast and layout carry the art direction without continuous animation.
