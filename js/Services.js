function updateStats() {
    document.getElementById("currentVisitors").textContent = Math.floor(Math.random() * 50);
    document.getElementById("dailyVisitors").textContent = Math.floor(Math.random() * 1000);
    document.getElementById("monthlyVisitors").textContent = Math.floor(Math.random() * 30000);
    document.getElementById("growthRate").textContent = (Math.random() * 10).toFixed(2) + "%";
    document.getElementById("sessionDuration").textContent = Math.floor(Math.random() * 10 + 1) + " دقيقة";
    document.getElementById("totalVisitors").textContent = Math.floor(Math.random() * 100000);
}
setInterval(updateStats, 3000);
updateStats();

const text = "✨ جرب حظك اليوم! قد يكون يومك مليئًا بالمفاجآت السعيدة! 🎲";
let i = 0;
function typeWriter() {
    if (i < text.length) {
        document.getElementById("dynamicText").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}
window.onload = typeWriter;