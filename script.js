// 1. Hiệu ứng gõ chữ (Typing Effect) ở phần giới thiệu
const roles = [
    "Lập trình viên tương lai (Software Developer)",
    "Python & SQL Backend Enthusiast",
    "Người yêu thích CSS & Giao diện Web",
    "Đam mê Khám phá - Âm nhạc - Du lịch"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typingText");

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 1800; // Dừng lại khi gõ xong
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

// 2. Chuyển đổi giao diện Sáng / Tối (Dark / Light Mode)
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
    }
});

// 3. Đóng/Mở Menu trên điện thoại
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

// 4. Hiệu ứng chạy thanh phần trăm Kỹ năng (Python, CSS, SQL)
function animateSkills() {
    const progressFills = document.querySelectorAll(".progress-fill");
    progressFills.forEach(bar => {
        const targetWidth = bar.getAttribute("data-width");
        bar.style.width = targetWidth;
    });
}

// 5. Bộ lọc Dự án theo kỹ năng (All / Python / SQL / CSS)
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        projectCards.forEach(card => {
            const categories = card.getAttribute("data-category");
            if (filterValue === "all" || categories.includes(filterValue)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// 6. Trình phát nhạc Lo-fi mini bằng Web Audio API
let audioCtx = null;
let isPlaying = false;
let musicInterval = null;

const playMusicBtn = document.getElementById("playMusicBtn");
const discIcon = document.getElementById("discIcon");
const musicStatus = document.getElementById("musicStatus");

function playChillNote(freq) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);
}

playMusicBtn.addEventListener("click", () => {
    if (!isPlaying) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23];
        let step = 0;

        musicInterval = setInterval(() => {
            playChillNote(notes[step % notes.length]);
            step++;
        }, 650);

        isPlaying = true;
        discIcon.classList.add("spin");
        musicStatus.textContent = "Đang phát: Lo-fi Chill...";
        playMusicBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Dừng';
    } else {
        clearInterval(musicInterval);
        if (audioCtx) audioCtx.close();
        isPlaying = false;
        discIcon.classList.remove("spin");
        musicStatus.textContent = "Giai điệu Coding Chill";
        playMusicBtn.innerHTML = '<i class="fa-solid fa-play"></i> Phát thử';
    }
});

// 7. Xử lý gửi Form liên hệ
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("senderName").value;
    formFeedback.textContent = `Cảm ơn ${name}! Tin nhắn của bạn đã được gửi tới Lâm Quốc Vinh.`;
    contactForm.reset();
});

// Khởi chạy khi tải trang xong
window.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    animateSkills();
});