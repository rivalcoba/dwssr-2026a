export function getHomeViewModel() {
  const iconSet = ["⭐", "🤖", "🍉", "📲", "🪸", "🌠", "🦾"];
  const icon = iconSet[Math.floor(Math.random() * iconSet.length)];
  return {
    title: "✍️ ProjNotes",
    icon,
  };
}
