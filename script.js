const entries = [];
const chartCtx = document.getElementById("chart").getContext("2d");
let chart;
function addEntry() {
 const topic = document.getElementById("topic").value.trim();
 const mood = document.getElementById("mood").value;
 const score = parseInt(document.getElementById("score").value);
 if (!topic || isNaN(score)) {
 alert("Please fill all fields!");
 return;
 }
 entries.push({ topic, mood, score });
 updateChart();
 generateInsight();
 document.getElementById("topic").value = "";
 document.getElementById("score").value = "";
}
function updateChart() {
 const labels = entries.map(e => e.topic);
 const data = entries.map(e => e.score);
 if (chart) chart.destroy();
 chart = new Chart(chartCtx, {
 type: "bar",
 data: {
 labels,
 datasets: [{
 label: "Memory Score",
 data,
 backgroundColor: "#6a80ff"
 }]
 },
 options: { scales: { y: { beginAtZero: true, max: 10 } } }
 });
}
function generateInsight() {
 if (entries.length < 2) return;
 const avg = entries.reduce((a, b) => a + b.score, 0) / entries.length;
 const last = entries[entries.length - 1];
 const mood = last.mood.toLowerCase();
 let msg = `Average memory score ${avg.toFixed(1)}.`;
 if (mood === "calm" && last.score >= avg) msg += " You remember best when calm ■";
 if (mood === "stressed" && last.score < avg) msg += " Stress seems to hurt recall ■";
 document.getElementById("insight").textContent = msg;
}
