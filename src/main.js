/* ===========================================================================
   PORTFOLIO — single page, one `activeProject` state value.

   Portfolio
     LeftInfoColumn        category label + about/description slot
     ProjectList              the full row list, always in the DOM
     ProjectRow               title + number (the click target)
     ProjectExpandedContent   the active project's media

   Opening a project never rebuilds the list. Every row keeps its slot,
   inactive titles are hidden in place, and the media block is offset up
   to sit directly beneath the active title without moving anything else.

   `activeProject` mirrors the URL fragment (`#double-life`), so a project is
   an address: it survives a refresh and answers to the back button.

   DATA is the single source of truth. Every project can carry:
     id, number, title, category, description[], link, media[]

   Media order matters: the first entry is rendered directly under the title
   row, the second under that one.
   =========================================================================== */

/* One filename per cell, left to right then down — reorder here to swap covers. */
const ALBUM_COVERS = [
  "ahuva.png",
  "cohen.png",
  "doda.png",
  "keves.png",
  "matti.png",
  "meir.png",
  "natasha.png",
  "tamus.png",
  "tropit.png",
  "uzi.png",
];

/* Combined illustration stack + GIF — drop files into
   assets/works/illustrations/ and list them here to publish. */
const ILLUSTRATIONS = [{ file: "05.png", width: 7588, height: 20529 }];

const PROJECTS = [
  {
    id: "double-life",
    number: "01",
    title: "DOUBLE LIFE",
    category: "ILLUSTRATION",
    description: [
      "An illustrated concertina of the story - Double Life by Eduard Berti.",
      "Both the illustrations and the text were hand-drawn using Pilot 0.4 pens, with a technique that imitates linocut prints.",
    ],
    media: [
      {
        variant: "scan",
        src: "assets/works/doublelife/doublelife-scan.png",
        width: 2514,
        height: 1722,
        alt: "Spreads of the Double Life concertina, hand-drawn in a linocut-like technique.",
      },
      {
        variant: "gif",
        src: "assets/works/doublelife/doublelife-gif.gif",
        width: 3000,
        height: 2250,
        alt: "Animation of the Double Life book being leafed through.",
      },
    ],
  },
  {
    id: "imerasingyou",
    number: "02",
    title: "IMERASINGYOU",
    category: "WEB DESIGN",
    description: [
      "An interactive website based on Eternal Sunshine of the Spotless Mind, offering an alternative way to experience the film by listening while navigating its screenplay.",
      "Characters can be erased by deleting their text, turning memory, erasure, and escapism into part of the viewing experience",
    ],
    link: {
      href: "https://ofricoh.github.io/imerasingyouandimhappy/",
      label: "Visit the site",
    },
    media: [
      {
        variant: "video",
        src: "assets/works/imerasingyou/imerasingyou.mp4",
        width: 2724,
        height: 1756,
        alt: "Screen recording of the im erasing you and im happy website.",
      },
    ],
  },
  {
    id: "houdou-nisbi",
    number: "03",
    title: "HOUDOU NISBI",
    category: "WEB DESIGN",
    description: [
      "An interactive listening experience for the album Houdou Nisbi by Ziad Rahbani, translating its sound and visual language into a digital space",
    ],
    link: {
      href: "https://ofricoh.github.io/houdou-nisbi/index.html",
      label: "Visit the site",
    },
    media: [
      {
        variant: "video",
        src: "assets/works/houdounisbi/houdounisbi.mp4",
        width: 2992,
        height: 1768,
        alt: "Screen recording of the Houdou Nisbi website.",
      },
    ],
  },
  {
    id: "the-feast",
    number: "04",
    title: "THE FEAST",
    category: ["VISUAL LANGUAGE", "FOR AN EXHIBITION"],
    description: [
      "New visual language and storytelling concept for the exhibition - The Feast.",
      "The project designed and created as part of a Storytelling in Space course at Bezalel in collaboration with Yohai Azulai.",
    ],
    media: [
      {
        variant: "wide",
        src: "assets/works/thefeast/front.jpg",
        width: 1920,
        height: 1358,
        alt: "Front of the exhibition map for The Feast, with the title lettering in red.",
      },
      {
        variant: "wide",
        src: "assets/works/thefeast/back.jpg",
        width: 1920,
        height: 1358,
        alt: "Back of the exhibition map for The Feast.",
      },
      {
        variant: "grid",
        items: [
          {
            src: "assets/works/thefeast/pic-16.png",
            width: 3001,
            height: 4499,
            alt: "The printed banner running down onto the exhibition table.",
          },
          {
            src: "assets/works/thefeast/pic-17.png",
            width: 3001,
            height: 4499,
            alt: "The exhibition table set with vessels.",
          },
          {
            src: "assets/works/thefeast/pic-18.png",
            width: 3001,
            height: 4499,
            alt: "Detail of the lettering on the hanging banner.",
          },
          {
            src: "assets/works/thefeast/pic-19.png",
            width: 3001,
            height: 4499,
            alt: "The exhibition space seen from the far end of the table.",
          },
        ],
      },
    ],
  },
  {
    id: "trisha-brown",
    number: "05",
    title: "TRISHA BROWN",
    category: "WEB DESIGN",
    description: [
      "A website bringing together a selection of works by dancer and choreographer Trisha Brown.",
      "The project was created as part of a Web Design course at Bezalel.",
    ],
    media: [
      {
        variant: "video",
        src: "assets/works/trishabrown/trishabrown.mp4",
        width: 2992,
        height: 1772,
        alt: "Screen recording of the Trisha Brown website.",
      },
    ],
  },
  {
    id: "albums",
    number: "06",
    title: "ALBUMS",
    category: "GRAPHIC DESIGN",
    description: [
      "An ongoing personal project exploring familiar album covers through a minimal visual language.",
      "Each cover is reduced to its essential shapes and colors, breaking down the recognizable graphic elements of the original artwork into a simplified composition.",
    ],
    media: [
      {
        variant: "grid",
        items: ALBUM_COVERS.map((file) => ({
          src: `assets/works/albums/${file}`,
          width: 4500,
          height: 4500,
          alt: `${file.replace(/\.[^.]+$/, "").replace(/^./, (c) => c.toUpperCase())} album cover.`,
        })),
      },
    ],
  },
  {
    id: "sheshet",
    number: "07",
    title: "SHESHET",
    category: "WEB DESIGN",
    description: [
      "An interactive listening experience for the album Sheshet, created as my graduation project at Bezalel.",
      "The website explores the meeting point between analog and digital, translating each track into synchronized sound, motion, and physical pen-plotter drawings.",
    ],
    media: [
      {
        variant: "video",
        src: "assets/works/sheshet/sheshet1.mp4",
        width: 2994,
        height: 1700,
        alt: "Screen recording of the Sheshet website.",
      },
      {
        variant: "video",
        src: "assets/works/sheshet/sheshet2.mp4",
        width: 2994,
        height: 1700,
        alt: "Second screen recording of the Sheshet website.",
      },
    ],
  },
  {
    id: "illustrations",
    number: "08",
    title: "ILLUSTRATIONS",
    category: "ILLUSTRATION",
    description: [
      "A collection of personal illustrations and sketchbook drawings, all created by hand using Pilot 0.4 pens.",
    ],
    media: [
      ...ILLUSTRATIONS.map(({ file, width, height }) => ({
        variant: "scan",
        src: `assets/works/illustrations/${file}`,
        width,
        height,
        alt: `${file.replace(/\.[^.]+$/, "").replace(/^./, (c) => c.toUpperCase())} illustration.`,
      })),
      {
        variant: "gif",
        src: "assets/works/illustrations/sketchbook.gif",
        width: 3000,
        height: 2250,
        alt: "Sketchbook pages leafing through.",
      },
    ],
  },
];

/* Shown whenever no project is open. */
const DEFAULT_CATEGORY = ["GRAPHIC & WEB", "DESIGNER"];
const ABOUT_PARAGRAPHS = [
  "Hi - I'm Ofri, a graphic and web designer based in Jerusalem.",
  "I'm interested in ideas that can grow into a whole visual language. I work across print, digital design and interaction, often mixing different formats along the way.",
];

/* The hand-drawn mark that reads as "hovered" and as "open". */
const LINE = {
  src: "assets/works/line.png",
  width: 2172,
  height: 724,
};

const MOBILE_MQ = window.matchMedia("(max-width: 768px)");

const state = {
  activeProject: null, // project id, or null for the default homepage state
  hoveredProject: null, // the row under the pointer, which the label previews
};

function isMobileViewport() {
  return MOBILE_MQ.matches;
}

const slots = {
  category: document.querySelector('[data-slot="category"]'),
  about: document.querySelector('[data-slot="about"]'),
  index: document.querySelector('[data-slot="index"]'),
};

const frame = {
  page: document.querySelector(".page"),
  asideInner: document.querySelector(".aside__inner"),
  contact: document.querySelector(".contact"),
};

function findProject(id) {
  return PROJECTS.find((project) => project.id === id) || null;
}

function visibleProjects() {
  return PROJECTS.filter((project) => !project.hidden);
}

/* --- LeftInfoColumn ------------------------------------------------------
   The label answers to the pointer first and to the open project second: it
   previews whatever is being pointed at, and falls back to whatever is open
   once the pointer leaves. A project that names no category borrows the
   homepage's, so the slot is never empty.
   ------------------------------------------------------------------------ */

function renderCategory() {
  const project = findProject(state.hoveredProject) || findProject(state.activeProject);
  const category = project && project.category;
  const lines = category ? [].concat(category) : DEFAULT_CATEGORY;
  slots.category.replaceChildren();
  lines.forEach((line, i) => {
    if (i > 0) slots.category.append(document.createElement("br"));
    slots.category.append(document.createTextNode(line));
  });
}

/* The slot's whole content for one state: the About text when nothing is
   open, otherwise the project's link and description. Built rather than
   written into the slot, so the same markup can also be measured off-screen
   when the reserved height is worked out. */
function AboutBody(project) {
  const description = project && project.description.length ? project.description : null;

  const body = document.createElement("div");
  body.className = "about__body";

  (description || ABOUT_PARAGRAPHS).forEach((text, i, list) => {
    const p = document.createElement("p");
    p.className = "hand";
    const last = Boolean(description && project.link && i === list.length - 1);
    p.append(document.createTextNode(last ? `${text} - ` : text));
    if (last) {
      const anchor = document.createElement("a");
      anchor.className = "about__link";
      anchor.href = project.link.href;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.append(document.createTextNode(project.link.label || project.link.href));
      anchor.append(ProjectLine());
      p.append(anchor);
    }
    body.append(p);
  });

  return body;
}

function renderAbout(project) {
  slots.about.replaceChildren(AboutBody(project));
}

function LeftInfoColumn(project) {
  renderCategory();
  renderAbout(project);
}

/* The description stays with the open project; only the label follows the
   pointer, so a preview is the one slot being redrawn. */
function syncTitleHover(id) {
  if (!indexParts.list) return;
  visibleProjects().forEach((project, index) => {
    indexParts.list.children[index].classList.toggle("is-title-hovered", project.id === id);
  });
}

function hoverProject(id) {
  if (state.hoveredProject === id) return;
  state.hoveredProject = id;
  syncTitleHover(id);
  renderCategory();
}

/* --- ProjectExpandedContent ---------------------------------------------
   Plain <img> and <video> elements: animated media keeps playing and every
   file keeps its own aspect ratio, since only the width is ever set in CSS.
   The intrinsic dimensions are declared so the browser reserves the right
   box before the files have loaded and nothing jumps.

   A media entry is either one image or video, placed by its `variant`, or a
   `grid` group, whose `items` are laid out in even columns across the same
   width a single image would have taken.
   ------------------------------------------------------------------------ */

function MediaVideo(item) {
  const video = document.createElement("video");
  video.className = "media media--video";
  video.src = item.src;
  video.width = item.width;
  video.height = item.height;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.setAttribute("aria-label", item.alt);
  return video;
}

function MediaImage(item, { variant = null, lazy = false } = {}) {
  const image = document.createElement("img");
  const name = variant || item.variant;
  image.className = name ? `media media--${name}` : "media";
  image.src = item.src;
  image.width = item.width;
  image.height = item.height;
  image.alt = item.alt;
  image.decoding = "async";
  if (lazy) image.loading = "lazy";
  return image;
}

function MediaGrid(group) {
  const grid = document.createElement("div");
  grid.className = "media-grid";
  // The grid always sits below at least one full-width image, so none of it
  // is on screen at first — worth waiting for.
  group.items.forEach((item) => grid.append(MediaImage(item, { variant: "cell", lazy: true })));
  return grid;
}

function ProjectExpandedContent(project) {
  const expanded = document.createElement("div");
  expanded.className = "project__expanded";
  expanded.id = `project-media-${project.id}`;

  project.media.forEach((item) => {
    if (item.variant === "grid") expanded.append(MediaGrid(item));
    else if (item.variant === "video") expanded.append(MediaVideo(item));
    else expanded.append(MediaImage(item));
  });

  return expanded;
}

/* --- ProjectRow ----------------------------------------------------------
   Every row carries its own copy of the drawn line, hidden until the row is
   hovered or open. It rides inside the title so it is measured against the
   letters rather than against the column, and it is decorative, so it stays
   out of the accessibility tree.
   ------------------------------------------------------------------------ */

function ProjectLine() {
  const line = document.createElement("img");
  line.className = "project__line";
  line.src = LINE.src;
  line.width = LINE.width;
  line.height = LINE.height;
  line.alt = "";
  line.setAttribute("aria-hidden", "true");
  line.decoding = "async";
  return line;
}

function ProjectRow(project, { active = false } = {}) {
  const row = document.createElement("li");
  row.className = active ? "project is-active" : "project";

  const control = document.createElement("button");
  control.type = "button";
  control.className = "project__link";
  control.dataset.projectId = project.id;
  control.setAttribute("aria-expanded", String(active));
  if (project.media.length) {
    control.setAttribute("aria-controls", `project-media-${project.id}`);
  }

  const title = document.createElement("span");
  title.className = "project__title";
  title.textContent = project.title;
  title.append(ProjectLine());

  const number = document.createElement("span");
  number.className = "project__number";
  number.textContent = project.number;

  control.append(title, number);
  row.append(control);

  return row;
}

/* --- ProjectList -------------------------------------------------------- */

function ProjectList(projects, { activeId = null } = {}) {
  const list = document.createElement("ul");
  list.className = "index__list";
  projects.forEach((project) => {
    list.append(ProjectRow(project, { active: project.id === activeId }));
  });
  return list;
}

/* Sticky duplicate of the number column — only visible when a project is open.
   In-flow numbers stay for layout; this layer paints and receives clicks above
   scrolling media without moving the column. */
function ProjectNumbersLayer(projects) {
  const layer = document.createElement("div");
  layer.className = "index__numbers";
  layer.setAttribute("aria-hidden", "true");
  projects.forEach((project) => {
    const row = document.createElement("div");
    row.className = "index__numbers-row";
    const number = document.createElement("button");
    number.type = "button";
    number.className = "index__number";
    number.textContent = project.number;
    number.dataset.projectId = project.id;
    number.tabIndex = -1;
    row.append(number);
    layer.append(row);
  });
  return layer;
}

/* Sticky transparent title hit targets — only when a project is open. In-flow
   titles paint below media; this layer carries pointer interaction above it. */
function ProjectTitleHitsLayer(projects) {
  const layer = document.createElement("div");
  layer.className = "index__titles";
  layer.setAttribute("aria-hidden", "true");
  projects.forEach((project) => {
    const row = document.createElement("div");
    row.className = "index__titles-row";
    const hit = document.createElement("button");
    hit.type = "button";
    hit.className = "index__title-hit";
    hit.dataset.projectId = project.id;
    hit.tabIndex = -1;
    row.append(hit);
    layer.append(row);
  });
  return layer;
}

const indexParts = {
  nav: null,
  list: null,
  numbersLayer: null,
  titlesLayer: null,
  mediaSlot: null,
};

const mobileMediaGesture = {
  active: false,
  moved: false,
  startX: 0,
  startY: 0,
};

function isVideoControlTap(video, event) {
  const rect = video.getBoundingClientRect();
  const y = event.clientY - rect.top;
  const controlBand = Math.max(44, rect.height * 0.14);
  return y > rect.height - controlBand;
}

/* The media layer has to be hit-testable for iOS Safari to scroll it, which
   means it also swallows taps aimed at the interface showing through its
   transparent areas. Those taps are handed back to whatever sits underneath. */
function forwardTapBeneathMedia(event) {
  const { mediaSlot } = indexParts;
  if (!mediaSlot) return;

  mediaSlot.classList.add("is-tap-through");
  const beneath = document.elementFromPoint(event.clientX, event.clientY);
  mediaSlot.classList.remove("is-tap-through");
  if (!beneath) return;

  const control = beneath.closest("[data-project-id]");
  if (control) {
    toggleProject(control.dataset.projectId);
    return;
  }
  if (beneath.closest(".identity__home")) goHome();
}

function bindMobileMediaClose() {
  const { mediaSlot } = indexParts;
  if (!mediaSlot || mediaSlot.dataset.mobileCloseBound) return;
  mediaSlot.dataset.mobileCloseBound = "true";

  mediaSlot.addEventListener(
    "pointerdown",
    (event) => {
      mobileMediaGesture.active = true;
      mobileMediaGesture.moved = false;
      mobileMediaGesture.startX = event.clientX;
      mobileMediaGesture.startY = event.clientY;
    },
    { passive: true }
  );

  mediaSlot.addEventListener(
    "pointermove",
    (event) => {
      if (!mobileMediaGesture.active) return;
      if (
        Math.abs(event.clientX - mobileMediaGesture.startX) > 10 ||
        Math.abs(event.clientY - mobileMediaGesture.startY) > 10
      ) {
        mobileMediaGesture.moved = true;
      }
    },
    { passive: true }
  );

  mediaSlot.addEventListener("pointerup", (event) => {
    if (!mobileMediaGesture.active) return;
    mobileMediaGesture.active = false;
    if (!isMobileViewport() || !state.activeProject || mobileMediaGesture.moved) return;

    if (event.target.matches("img.media")) {
      goHome();
      return;
    }

    if (event.target.matches("video.media--video")) {
      if (!isVideoControlTap(event.target, event)) goHome();
      return;
    }

    forwardTapBeneathMedia(event);
  });

  mediaSlot.addEventListener("pointercancel", () => {
    mobileMediaGesture.active = false;
  });
}

function ensureIndexDom() {
  if (indexParts.list) return;
  indexParts.nav = document.createElement("div");
  indexParts.nav.className = "index__nav";
  indexParts.list = ProjectList(visibleProjects());
  indexParts.numbersLayer = ProjectNumbersLayer(visibleProjects());
  indexParts.titlesLayer = ProjectTitleHitsLayer(visibleProjects());
  indexParts.mediaSlot = document.createElement("div");
  indexParts.mediaSlot.className = "index__media";
  indexParts.nav.append(indexParts.list);
  slots.index.append(
    indexParts.numbersLayer,
    indexParts.titlesLayer,
    indexParts.nav,
    indexParts.mediaSlot
  );
  bindMobileMediaClose();
}

function syncProjectRows(activeId) {
  visibleProjects().forEach((project, index) => {
    const row = indexParts.list.children[index];
    const active = project.id === activeId;
    row.classList.toggle("is-active", active);

    const control = row.querySelector(".project__link");
    control.setAttribute("aria-expanded", String(active));
    if (project.media.length) {
      control.setAttribute("aria-controls", `project-media-${project.id}`);
    } else {
      control.removeAttribute("aria-controls");
    }
  });
}

function syncProjectMedia(activeId) {
  const active = activeId ? findProject(activeId) : null;
  indexParts.mediaSlot.replaceChildren(
    active && active.media.length ? ProjectExpandedContent(active) : []
  );
  if (isMobileViewport() && activeId) {
    indexParts.mediaSlot.scrollTop = 0;
  }
}

function clearMobileScrollLock() {
  const { documentElement, body } = document;
  documentElement.classList.remove("page--mobile-project-open");
  documentElement.style.overflow = "";
  documentElement.style.height = "";
  body.style.top = "";
  body.style.position = "";
  body.style.width = "";
  body.style.inset = "";
  body.style.overflow = "";
  body.style.height = "";
}

function syncMobileProjectScroll() {
  const shouldLock = isMobileViewport() && state.activeProject !== null;
  if (shouldLock) {
    document.documentElement.classList.add("page--mobile-project-open");
    document.body.style.top = "0px";
    return;
  }
  clearMobileScrollLock();
}

function measureMobileMediaOffset() {
  if (!slots.index || !isMobileViewport() || !state.activeProject) {
    slots.index?.style.removeProperty("--mobile-media-offset");
    return;
  }
  const activeRow = indexParts.list?.querySelector(".project.is-active");
  if (!activeRow) return;
  const gap =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--media-gap-title")) ||
    0;
  const offset = activeRow.getBoundingClientRect().bottom + gap;
  slots.index.style.setProperty("--mobile-media-offset", `${Math.max(0, offset)}px`);
}

function syncMobileMediaOffset() {
  requestAnimationFrame(measureMobileMediaOffset);
}

/* --- Mobile: contact block placement -------------------------------------
   On desktop the contact block is the bottom row of the pinned left column,
   so it has to live inside it. Stacked, it belongs after the project list
   instead — and `display: contents` on the left column is what previously
   stopped the list from extending the document in iOS Safari, so the block
   is moved between the two parents rather than reordered in place.
   ------------------------------------------------------------------------ */

function syncContactPlacement() {
  const { page, asideInner, contact } = frame;
  if (!page || !asideInner || !contact) return;
  const parent = isMobileViewport() ? page : asideInner;
  // Last child of either parent: the bottom of the pinned column on desktop,
  // below the index on mobile.
  if (contact.parentElement !== parent) parent.append(contact);
}

/* --- Mobile: reserved description height ---------------------------------
   Stacked, the project list sits directly under the one slot that carries
   both the About text and the open project's description, so every change of
   text there used to move the list. The slot is held at the Home About
   height — currently the longest text that appears there — measured at the
   live width so it stays true at any viewport size and once the webfont has
   loaded. Shorter project copy leaves the rest of the slot empty.
   ------------------------------------------------------------------------ */

let aboutProbe = null;

function aboutProbeElement() {
  if (aboutProbe) return aboutProbe;
  aboutProbe = document.createElement("div");
  aboutProbe.setAttribute("aria-hidden", "true");
  // Absolute inside the slot: it inherits the real measure and typography
  // without contributing any height of its own while it is being read.
  aboutProbe.style.cssText =
    "position:absolute;top:0;left:0;width:100%;visibility:hidden;pointer-events:none;";
  return aboutProbe;
}

function measureAboutReserve() {
  if (!slots.about) return;
  if (!isMobileViewport()) {
    slots.about.style.removeProperty("--about-reserved-height");
    return;
  }

  const probe = aboutProbeElement();
  slots.about.append(probe);
  probe.replaceChildren(AboutBody(null));
  const height = probe.getBoundingClientRect().height;
  probe.replaceChildren();
  probe.remove();

  slots.about.style.setProperty("--about-reserved-height", `${Math.ceil(height)}px`);
}

function syncAboutReserve() {
  requestAnimationFrame(measureAboutReserve);
}

/* --- Portfolio ---------------------------------------------------------- */

function render() {
  const project = findProject(state.activeProject);
  LeftInfoColumn(project);
  ensureIndexDom();

  const projects = visibleProjects();
  const activeIndex = projects.findIndex((entry) => entry.id === state.activeProject);
  const isOpen = activeIndex !== -1;

  slots.index.classList.toggle("index--open", isOpen);
  if (isOpen) {
    slots.index.style.setProperty("--active-row-index", String(activeIndex));
    slots.index.style.setProperty("--index-row-count", String(projects.length));
  } else {
    slots.index.style.removeProperty("--active-row-index");
    slots.index.style.removeProperty("--index-row-count");
  }

  syncProjectRows(state.activeProject);
  syncProjectMedia(state.activeProject);
  syncMobileProjectScroll();
  syncMobileMediaOffset();
}

/* --- Routing -------------------------------------------------------------
   The open project lives in the URL, so the state the reader sees is always
   the state the address describes — on a refresh, on a shared link, and on
   the back button. Unknown fragments simply fall back to the closed index.
   ------------------------------------------------------------------------ */

function projectIdFromLocation() {
  const id = decodeURIComponent(window.location.hash.replace(/^#\/?/, ""));
  const project = findProject(id);
  return project && !project.hidden ? id : null;
}

function resetProjectScroll() {
  window.scrollTo(0, 0);
  if (isMobileViewport() && state.activeProject && indexParts.mediaSlot) {
    indexParts.mediaSlot.scrollTop = 0;
  }
}

function openProject(id, { resetScroll = false } = {}) {
  if (state.activeProject === id) return;
  state.activeProject = id;
  render();
  if (resetScroll) resetProjectScroll();
}

function goHome() {
  if (state.activeProject === null) return;
  const url = window.location.pathname + window.location.search;
  window.history.pushState({ project: null }, "", url);
  openProject(null);
  resetProjectScroll();
}

function projectIdFromEvent(event) {
  const control = event.target.closest("[data-project-id]");
  return control ? control.dataset.projectId : null;
}

function toggleProject(id) {
  const next = state.activeProject === id ? null : id;

  // The address is written first so it always describes what is on screen,
  // then the view follows it. `pushState` rather than assigning the hash:
  // it leaves a history entry without asking the browser to go looking for
  // an element to scroll to.
  const url = next ? `#${next}` : window.location.pathname + window.location.search;
  window.history.pushState({ project: next }, "", url);
  openProject(next, { resetScroll: true });

  // Hand focus back to the row that was just used without dragging the page.
  const control = slots.index.querySelector(`.project__link[data-project-id="${id}"]`);
  if (control) control.focus({ preventScroll: true });
}

const identityHome = document.querySelector(".identity__home");
if (identityHome) {
  identityHome.append(ProjectLine());
  identityHome.addEventListener("click", goHome);
}

if (slots.index) {
  slots.index.addEventListener("click", (event) => {
    const id = projectIdFromEvent(event);
    if (id) toggleProject(id);
  });

  // `pointerover` bubbles, so one listener covers every row and survives the
  // index being re-rendered. Moving between two rows fires it again, and
  // moving onto the gaps between them reports no row at all.
  slots.index.addEventListener("pointerover", (event) => hoverProject(projectIdFromEvent(event)));
  slots.index.addEventListener("pointerleave", () => hoverProject(null));

  // The same preview for the keyboard, so it matches the line on the title.
  slots.index.addEventListener("focusin", (event) => hoverProject(projectIdFromEvent(event)));
  slots.index.addEventListener("focusout", () => hoverProject(null));

  // Both events can fire for one navigation; `openProject` ignores the second.
  const syncFromLocation = () => openProject(projectIdFromLocation());
  window.addEventListener("popstate", syncFromLocation);
  window.addEventListener("hashchange", syncFromLocation);
  MOBILE_MQ.addEventListener("change", () => {
    if (isMobileViewport() && state.activeProject) {
      window.scrollTo(0, 0);
    }
    syncContactPlacement();
    syncAboutReserve();
    syncMobileProjectScroll();
    syncMobileMediaOffset();
    if (!isMobileViewport() && indexParts.mediaSlot) {
      indexParts.mediaSlot.scrollTop = 0;
    }
  });
  window.addEventListener("resize", () => {
    syncAboutReserve();
    syncMobileMediaOffset();
  });
  // iOS bfcache can restore a locked body after returning from an open project.
  window.addEventListener("pageshow", syncMobileProjectScroll);
  state.activeProject = projectIdFromLocation();
  syncContactPlacement();
  render();
  syncAboutReserve();
  // Cactus Jack decides the measure, so the reserve is only final once it lands.
  if (document.fonts) document.fonts.ready.then(syncAboutReserve);
}
