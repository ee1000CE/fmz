// ---------- Lock screen ----------
const lockScreen = document.getElementById('lock-screen');
const lockForm = document.getElementById('lock-form');
const lockInput = document.getElementById('lock-input');
const lockError = document.getElementById('lock-error');
const lockCard = document.querySelector('.lock-card');
const site = document.getElementById('site');

const PASSCODE = 'toci';

lockForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = lockInput.value.trim().toLowerCase();
  if (val === PASSCODE) {
    lockScreen.style.transition = 'opacity 0.6s ease';
    lockScreen.style.opacity = '0';
    setTimeout(() => {
      lockScreen.remove();
      site.hidden = false;
      startFloaties();
      initTimelineObserver();
    }, 600);
  } else {
    lockError.classList.add('show');
    lockCard.classList.remove('shake');
    void lockCard.offsetWidth;
    lockCard.classList.add('shake');
  }
});

// ---------- Floating background hearts/emoji ----------
const floatiesContainer = document.getElementById('floaties');
const floatEmojis = ['☕', '🐾', '💎', '🐱'];

function spawnFloaty() {
  const el = document.createElement('div');
  el.className = 'floaty';
  el.textContent = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  const duration = 10 + Math.random() * 8;
  el.style.animationDuration = duration + 's';
  el.style.fontSize = (16 + Math.random() * 16) + 'px';
  floatiesContainer.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000);
}

let floatyInterval;
function startFloaties() {
  spawnFloaty();
  floatyInterval = setInterval(spawnFloaty, 3200);
}

// ---------- Timeline reveal on scroll ----------
function initTimelineObserver() {
  const items = document.querySelectorAll('.tl-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  items.forEach((item) => observer.observe(item));
}

// ---------- Flip cards ----------
document.querySelectorAll('.flip-card').forEach((card) => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// ---------- Gallery lightbox ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.gallery figure img').forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.hidden = false;
  });
});

lightbox.addEventListener('click', () => { lightbox.hidden = true; });

// ---------- Open When letters ----------
const letters = {
  tired: {
    text: `Hey Fami,<br><br>
Third coffee, zero sleep, notes about cells doing things only you understand — sounds about right.<br><br>
Close the laptop for five minutes. You're handling more than you give yourself credit for. Let Toci take over for a bit. The cells will still be there tomorrow.`,
  },
  sad: {
    text: `Hey,<br><br>
Whatever it is, you don't have to be "fine" about it right now.<br><br>
Hug Toci, make coffee, breathe. I can't fix it from wherever I am, but it won't feel like this forever, and you're not dealing with it alone.`,
  },
  lonely: {
    text: `Fami,<br><br>
Distance is annoying, I know. That's most of why this site exists — something to open when it's quiet.<br><br>
Remember that FaceTime where I was mid-workout and you were showing off a vaccine bandage like a trophy? Still one of my favorite calls. We're ridiculous even through a screen, and I'm not as far as it feels.`,
    photo: 'images/facetime.jpg',
  },
  doubt: {
    text: `Hey,<br><br>
Whatever's spinning in your head right now is probably bigger in there than it actually is.<br><br>
If something's bothering you, just say it — I'd rather sort it out than have you overthink it alone for three days.`,
  },
  angry: {
    text: `Fami,<br><br>
If I'm annoyed right now, it's about whatever just happened, not about you, and definitely not about us.<br><br>
Give me a minute to cool off and I'll come back less of a pain. Doesn't change anything.`,
  },
  laugh: {
    text: `Exhibit A of why I fell for you.<br><br>
This is the face of a future biomedical scientist making this exact face at her phone camera for no reason at all. Never stop.`,
    photo: 'images/laugh.jpg',
  },
};

const modal = document.getElementById('letter-modal');
const modalText = document.getElementById('modal-text');
const modalPhotoWrap = document.getElementById('modal-photo-wrap');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.env-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.letter;
    const letter = letters[key];
    modalText.innerHTML = letter.text;
    modalPhotoWrap.innerHTML = letter.photo
      ? `<img src="${letter.photo}" alt="photo" />`
      : '';
    modal.hidden = false;
  });
});

modalClose.addEventListener('click', () => { modal.hidden = true; });
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.hidden = true;
});
