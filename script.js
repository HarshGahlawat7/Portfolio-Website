document.addEventListener("DOMContentLoaded", () => {
    console.log('Script loaded successfully at', new Date().toISOString());

    // ---------------- THEME TOGGLE ----------------
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    let isDarkTheme = true;

    if (document.body && themeIcon) {
        document.body.className = 'bg-gray-900 text-white font-sans dark';
        themeIcon.className = 'sun-icon w-6 h-6';
        console.log('Initial theme set to dark with sun icon');
    } else {
        console.error('Body or theme icon not found');
    } 

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDarkTheme = !isDarkTheme;
            if (isDarkTheme) {
                document.body.className = 'bg-gray-900 text-white font-sans dark';
                themeIcon.className = 'sun-icon w-6 h-6';
            } else {
                document.body.className = 'bg-gray-100 text-gray-900 font-sans light';
                themeIcon.className = 'moon-icon w-6 h-6';
            }
        });
    }

    // ---------------- SKILLS EXPAND ----------------
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsSection.addEventListener('click', (event) => {
            const heading = event.target.closest('.skill-category h3');
            if (heading) {
                const subSkills = heading.nextElementSibling;
                if (subSkills && subSkills.classList.contains('sub-skills')) {
                    const isHidden = subSkills.style.display === 'none' || getComputedStyle(subSkills).display === 'none';
                    subSkills.style.display = isHidden ? 'block' : 'none';
                }
            }
        });
    }

    // ---------------- CONTACT FORM ----------------
    const sendMessageButton = document.getElementById('send-message');
    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', () => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (name && email && subject && message) {
                alert('Message sent! (This is a demo)');
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('subject').value = '';
                document.getElementById('message').value = '';
            } else {
                alert('Please fill out all fields.');
            }
        });
    }

    // ---------------- CHATBOT ----------------
    lucide.createIcons();

    const toggleBtn = document.getElementById("chatbotToggle");
    const overlay = document.getElementById("chatbotOverlay");
    const closeBtn = document.getElementById("closeChatbot");
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");
    const messages = document.getElementById("chatMessages");

    if (toggleBtn && overlay && closeBtn && form && input && messages) {
        toggleBtn.addEventListener("click", () => {
            overlay.classList.toggle("hidden");
        });

        closeBtn.addEventListener("click", () => {
            overlay.classList.add("hidden");
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;

            addMessage("user", text);
            input.value = "";

            setTimeout(() => {
                addMessage("bot", "🤖 Thanks for your message! I'll get back to you soon.");
            }, 600);
        });

        function addMessage(type, text) {
            const msg = document.createElement("div");
            msg.className = `msg ${type}`;
            const avatar = document.createElement("img");
            avatar.src =
                type === "user"
                    ? "https://i.pravatar.cc/40?img=11"
                    : "https://i.pravatar.cc/40?img=65";
            const content = document.createElement("div");
            content.className = "msg-content";
            content.innerText = text;

            msg.appendChild(avatar);
            msg.appendChild(content);
            messages.appendChild(msg);
            messages.scrollTop = messages.scrollHeight;
        }
    } else {
        console.warn("Chatbot elements not found in DOM");
    }

    // ---------------- SMOOTH SCROLLING ----------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                const yOffset = -64; // Adjust based on your navbar height (in px)
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({
                    top: y,
                    behavior: "smooth"
                });
            }
        });
    });

    // ---------------- TIMELINE SCROLL ANIMATIONS ----------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });

}); // <- This closing bracket for DOMContentLoaded was missing the timeline code

// ---------------- GROK-LIKE ANIMATED BACKGROUND ----------------
const canvas = document.getElementById("animated-bg");
if (canvas) {
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 60;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.radius = 1 + Math.random() * 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = "#38bdf8"; // Sky-blue
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animate();
}

// --- Auto-expand Skills section on scroll with animations ---
document.addEventListener('DOMContentLoaded', () => {
  const skillSection = document.getElementById('skills');
  const categories = document.querySelectorAll('.skill-category');

  if (skillSection && categories.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillSection.classList.add('expanded');
          categories.forEach((cat, idx) => {
            setTimeout(() => {
              cat.classList.add('show-category');
              const subskills = cat.querySelector('.sub-skills');
              if (subskills) subskills.classList.add('show-subskills');
            }, idx * 250); // Stagger categories
          });
        }
      });
    }, { threshold: 0.4 });

    sectionObserver.observe(skillSection);
  }
});


