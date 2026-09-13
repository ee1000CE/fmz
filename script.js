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
const floatEmojis = ['💗', '☕', '🐾', '💎', '🐱'];

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
  floatyInterval = setInterval(spawnFloaty, 1400);
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
If you're reading this, you're probably running on your third coffee and negative hours of sleep, buried in notes about cells doing things only you understand.<br><br>
First: close the laptop for five minutes. Second: you are handling more than you give yourself credit for. I've watched you turn caffeine and pure stubbornness into a future biomedical scientist, and it's one of the most impressive things I've ever seen up close.<br><br>
Rest for a bit. Let Toci do their job and keep you company. The cells will still be there tomorrow — and so will I.`,
  },
  sad: {
    text: `Hey love,<br><br>
Whatever it is, it's allowed to be hard. You don't have to perform "fine" for me, of all people.<br><br>
Hug Toci a little tighter, put the kettle on (coffee, obviously), and just breathe for a second. I can't fix everything from wherever I am, but I can promise this: it gets lighter, and you are not carrying it alone.<br><br>
You're the strongest person I know who also cries at cat videos — and I love both of you equally.`,
  },
  lonely: {
    text: `Fami,<br><br>
Distance is annoying and I hate it too. But I built you a whole ridiculous website, just so you'd have something of me to open when the room feels too quiet.<br><br>
That FaceTime where I was sweating through a workout and you were showing off a vaccine bandage like it was a trophy? That's us. Silly, unfiltered, still choosing each other through a screen.<br><br>
I'm not as far away as it feels right now.`,
    photo: 'images/facetime.jpg',
  },
  doubt: {
    text: `Hey,<br><br>
If you're here, something's making you question "us." So let me say it plainly: I am not going anywhere.<br><br>
I think about the version of you in ten years, sunglasses on, pulling up in the Porsche 911 we joke about — and I plan on being the one still there, still annoying you, still applying your lipstick before dinner, still yours.<br><br>
Doubt is normal. Us isn't up for debate.`,
  },
  angry: {
    text: `Fami,<br><br>
If I'm frustrated right now, it's about a moment — not about you, and never about us.<br><br>
I'm sorry if I said something sharp. Give me a minute and I'll come back calmer, and better. My love for you isn't something a bad mood gets to touch.<br><br>
Toci doesn't hold grudges. Neither do I, not really, not for long — not with you.`,
  },
  laugh: {
    text: `WARNING: do not open this in public.<br><br>
Exhibit A of why I fell for you. This is the face of a woman who studies human biology for a living, and also makes this exact face at a phone camera for absolutely no reason.<br><br>
I love pig-face Fami just as much as biomedical-scientist Fami and future-Porsche-driving Fami. Never, ever stop making this face at me.`,
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
