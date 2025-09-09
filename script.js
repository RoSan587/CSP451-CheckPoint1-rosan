// Random facts about Everest
const facts = [
  "Mount Everest grows about 4 mm higher every year due to geological uplift.",
  "The Tibetan name for Everest is Chomolungma, meaning 'Goddess Mother of the World'.",
  "Temperatures on Everest can drop to -60°C (-76°F).",
  "About 300 people have died attempting to climb Everest.",
  "The 'death zone' on Everest is above 8,000 m, where oxygen is extremely limited."
];

document.getElementById("factBtn").addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  document.getElementById("randomFact").textContent = facts[randomIndex];
});
