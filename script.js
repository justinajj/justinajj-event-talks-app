
// script.js
document.addEventListener("DOMContentLoaded", () => {
    const scheduleContainer = document.getElementById("schedule-container");
    const categoryFilter = document.getElementById("category-filter");
    let currentSchedule = []; // To store the schedule after initial rendering

    // Function to render the schedule
    function renderSchedule(scheduleToRender) {
        scheduleContainer.innerHTML = ""; // Clear previous schedule

        scheduleToRender.forEach(item => {
            const talkElement = document.createElement("div");
            talkElement.classList.add("talk-card");
            if (item.isBreak) {
                talkElement.classList.add("break-card");
            }

            talkElement.innerHTML = `
                <div class="talk-time">${item.startTime} - ${item.endTime}</div>
                <h3 class="talk-title">${item.title}</h3>
                ${item.speakers.length > 0 ? `<div class="talk-speakers">Speakers: ${item.speakers.join(", ")}</div>` : ""}
                ${item.category.length > 0 && !item.isBreak ? `<div class="talk-categories">Categories: ${item.category.join(", ")}</div>` : ""}
                <p class="talk-description">${item.description}</p>
            `;
            scheduleContainer.appendChild(talkElement);
        });
    }

    // Function to filter the schedule
    function filterSchedule() {
        const filterText = categoryFilter.value.toLowerCase().trim();

        const filtered = fullSchedule.filter(item => {
            if (item.isBreak) return true; // Always show breaks

            return item.category.some(cat => cat.toLowerCase().includes(filterText));
        });
        renderSchedule(filtered);
    }

    // Initial render of the full schedule
    currentSchedule = fullSchedule; // Store the full schedule
    renderSchedule(currentSchedule);

    // Event listener for filter input
    categoryFilter.addEventListener("input", filterSchedule);
});
