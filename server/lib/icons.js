const iconSet = ["⭐", "🤖", "🍉", "📲", "🪸", "🌠", "🦾"];

/**
 * Devuelve un icono aleatorio del conjunto disponible
 */
export function randomIcon() {
  return iconSet[Math.floor(Math.random() * iconSet.length)];
}

/**
 * Registra el helper "randomIcon" en Handlebars
 */
export function registerIconHelper(hbs) {
  hbs.registerHelper("randomIcon", randomIcon);
}
