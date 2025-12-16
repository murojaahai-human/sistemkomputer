// THEME TOGGLE
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️ Mode" : "🌙 Mode";
}

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "light" ? "dark" : "light");
});

// SMOOTH SCROLL NAV
document.querySelectorAll('nav a[href^="#"], .cta-button').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// PROGRESS BAR
const progressBar = document.getElementById("progress-bar");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";
});

// REVEAL ON SCROLL
const revealSections = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealSections.forEach((sec) => observer.observe(sec));

// TABS
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

// ACCORDION
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const content = item.querySelector(".accordion-content");
    const isActive = item.classList.contains("active");

    // Tutup semua
    document.querySelectorAll(".accordion-item").forEach((i) => {
      i.classList.remove("active");
      i.querySelector(".accordion-content").style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// MODAL
const modals = document.querySelectorAll(".modal");
const modalTriggers = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close");

modalTriggers.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.modal;
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "block";
  });
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
  });
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

// DIAGRAM INTERAKTIF
const diagramInfo = {
  brainNode: "Brainware: manusia yang mengoperasikan, mengelola, dan mengembangkan sistem komputer.",
  softNode: "Software: program dan instruksi yang mengatur cara kerja hardware.",
  hardNode: "Hardware: perangkat fisik yang menjalankan instruksi dari software.",
  outNode: "Output: informasi yang dihasilkan dari proses pengolahan data.",
};

document.querySelectorAll(".diagram-element").forEach((el) => {
  el.addEventListener("click", () => {
    const text = diagramInfo[el.id];
    if (!text) return;
    alert(text);
  });
});

// QUIZ
const quizData = [
  {
    question:
      "Komponen mana yang DISEBUTKAN sebagai gabungan hardware, software, dan brainware?",
    options: [
      "Sistem operasi",
      "Sistem komputer",
      "Sistem jaringan",
      "Sistem informasi geografis",
    ],
    correct: 1,
  },
  {
    question:
      "Siapa yang dimaksud dengan brainware dalam sistem komputer ",
    options: [
      "Semua perangkat input dan output",
      "Semua program aplikasi",
      "Manusia yang menggunakan dan mengelola komputer",
      "Data yang diproses komputer",
    ],
    correct: 2,
  },
  {
    question:
      "Bagian CPU yang melakukan operasi perhitungan dan logika disebut?",
    options: ["Control Unit (CU)", "Register", "Motherboard", "ALU"],
    correct: 3,
  },
  {
    question:
      "Perangkat seperti keyboard, mouse, dan scanner termasuk kategori apa?",
    options: ["Perangkat output", "Perangkat input", "Perangkat penyimpanan", "Perangkat jaringan"],
    correct: 1,
  },
  {
    question:
      "RAM dan ROM dikelompokkan sebagai jenis penyimpanan apa?",
    options: [
      "Secondary storage",
      "Optical storage",
      "Primary storage",
      "External storage",
    ],
    correct: 2,
  },
  {
    question:
      "Software yang berfungsi mengelola hardware dan menyediakan layanan dasar untuk aplikasi lain adalah?",
    options: [
      "Software aplikasi",
      "Software utilitas",
      "Sistem operasi",
      "Firmware",
    ],
    correct: 2,
  },
];

const quizContainer = document.getElementById("quizContainer");

function renderQuiz() {
  quizContainer.innerHTML = "";

  quizData.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const title = document.createElement("h4");
    title.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(title);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";

    q.options.forEach((opt, i) => {
      const optDiv = document.createElement("div");
      optDiv.className = "option";
      optDiv.textContent = opt;
      optDiv.dataset.questionIndex = index;
      optDiv.dataset.optionIndex = i;

      optDiv.addEventListener("click", () => {
        // Hapus selected pada opsi lain di soal ini
        optionsDiv.querySelectorAll(".option").forEach((o) => {
          o.classList.remove("selected");
        });
        optDiv.classList.add("selected");
      });

      optionsDiv.appendChild(optDiv);
    });

    questionDiv.appendChild(optionsDiv);
    quizContainer.appendChild(questionDiv);
  });

  const submitBtn = document.createElement("button");
  submitBtn.className = "quiz-button";
  submitBtn.textContent = "Periksa Jawaban";
  submitBtn.addEventListener("click", checkQuiz);
  quizContainer.appendChild(submitBtn);

  const resultDiv = document.createElement("div");
  resultDiv.id = "quizResult";
  resultDiv.className = "quiz-result";
  quizContainer.appendChild(resultDiv);
}

function checkQuiz() {
  let score = 0;

  quizData.forEach((q, index) => {
    const options = document.querySelectorAll(
      `.option[data-question-index="${index}"]`
    );
    let selectedIndex = -1;

    options.forEach((opt, i) => {
      if (opt.classList.contains("selected")) selectedIndex = i;
      opt.classList.remove("correct", "wrong");
    });

    if (selectedIndex === q.correct) {
      score++;
      options[selectedIndex].classList.add("correct");
    } else if (selectedIndex !== -1) {
      options[selectedIndex].classList.add("wrong");
      options[q.correct].classList.add("correct");
    }
  });

  const resultDiv = document.getElementById("quizResult");
  resultDiv.classList.add("show");
  resultDiv.textContent = `Skor Anda: ${score} dari ${quizData.length} soal.`;
}

renderQuiz();