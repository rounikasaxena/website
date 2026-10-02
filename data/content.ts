/* =====================================================================
   ✏️  EVERYTHING YOU NEED TO EDIT LIVES IN THIS FILE.

   Media rules (same for every image / video field below):
   • Images  → drop the file in /public/images/... and write the path,
               e.g. image: "/images/projects/qhacks-thumb.jpg"
   • Videos  → either a YouTube EMBED link
               ("https://www.youtube.com/embed/VIDEO_ID")
               or a file in /public/videos/... ("/videos/qhacks.mp4")
   • Leave a field as "" and the site shows a dashed "ADD …" box that
     tells you exactly what to put there.
   • Anything in [square brackets] is placeholder text — replace it.
===================================================================== */

// Order of sections on the wheel is set in app/lib/pages.ts
export type SectionId = "about" | "projects" | "contact" | "art" | "journal";

/* ---------- Site ---------- */
export const SITE = {
  name: "Rounika Saxena",
  tagline: "Designer + Frontend · Queen's University",
  resume: "/resume.pdf", // ← put your resume at /public/resume.pdf
};

/* ---------- Music (mini player, bottom of the screen) ---------- */
export const SONGS = [
  { title: "Princess", artist: "Feng", url: "https://www.youtube.com/watch?v=iW4AarlCb3A" },
  { title: "Starting Over", artist: "LSD and the Search for God", url: "https://www.youtube.com/watch?v=Ikn6Z2fxMs4" },
  { title: "Ditto", artist: "NewJeans", url: "https://www.youtube.com/watch?v=5emU4TSPxc8" },
  { title: "Pictures of Us", artist: "beabadoobee", url: "https://www.youtube.com/watch?v=py71Xqfn0eM" },
  { title: "Jump the Turnstile", artist: "TV Girl and Jordana", url: "https://www.youtube.com/watch?v=T3uVIR9EWk0" },
  { title: "striptease", artist: "carwash", url: "https://www.youtube.com/watch?v=MGt8-poMDD0" },
];

/* ---------- Projects (the wheel on the Projects tab) ---------- */
export type Project = {
  id: string;
  name: string;
  subtitle: string;
  date: string;
  kind: string; // short line under the title on the wheel
  colors: [string, string]; // card gradient shown until you add a thumbnail
  thumbnail: string; // card image on the wheel
  video: string; // big video in the case study + preview
  cover?: string; // big image shown instead when there is no video
  hook: string; // one sentence shown in the preview card
  tags: string[];
  role: string;
  team: string;
  timeline: string;
  status: string;
  tools: string;
  process: { label: string; image: string; full?: string }[]; // right-hand strip in the case study (full = uncropped version shown when clicked)
  tabs: { overview: string[]; discovery: string[]; design: string[]; final: string[] };
  lessons: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "wetribe",
    name: "WeTribe",
    subtitle: "Giving an event app an identity",
    date: "09.26",
    kind: "Mobile app · Internship",
    colors: ["#2A2A2E", "#5A5A63"],
    thumbnail: "/images/projects/wetribe/thumb.jpg",
    cover: "/images/projects/wetribe/hero.jpg",
    video: "",
    hook: "An event creation and event finding app where people actually look like people, not anonymous profiles.",
    tags: ["figma", "auto layout", "figma motion", "mobile"],
    role: "Design Engineer Intern",
    team: "Me + the dev team",
    timeline: "Jun – Sep 2026",
    status: "In development",
    tools: "Figma, Figma Motion",
    process: [
      { label: "Event page", image: "/images/projects/wetribe/event.jpg", full: "/images/projects/wetribe/event-full.jpg" },
      { label: "More events at once", image: "/images/projects/wetribe/home.jpg", full: "/images/projects/wetribe/home-full.jpg" },
      { label: "Host profiles", image: "/images/projects/wetribe/host.jpg", full: "/images/projects/wetribe/host-full.jpg" },
    ],
    tabs: {
      overview: [
        "I was so happy to get this opportunity with WeTribe. It was my chance to finally take the skills I'd learned at hackathons and on my own time and put them into a real product.",
        "WeTribe is an app for creating events and finding events near you.",
        "The biggest problem with the original app was that it had no identity, and neither did its users.",
      ],
      discovery: [
        "When someone made a profile, there was nothing that made it theirs. For an app that's meant to connect people to each other, everyone looked anonymous.",
        "The main event page only showed one event per scroll, so finding something to go to took way longer than it should.",
        "I looked at social media apps like Twitter for inspiration on how people show who they are online.",
        "I'd designed an app before with Unlink, so I brought what I learned there into this role.",
      ],
      design: [
        "I gave the account section a lot more life and customization options, so every profile feels like a real person.",
        "I revamped the main event page so you can see a lot more events at the same time instead of one per scroll. It makes the most of people's time.",
        "The dev team told me they wanted it to look just like Apple, so that's what I delivered.",
        "I also pushed to bring the mascot into more of the app. Most event apps don't have one, so it's what makes WeTribe feel different.",
      ],
      final: [
        "I created all of the prototypes, and I honestly didn't realize just how many pages a real app needs until I was designing every one of them.",
        "I worked closely with the dev team to talk through features and their brand vision.",
        "The app hasn't launched yet. I just finished my internship, so there's no live demo to show for now.",
      ],
    },
    lessons: [
      "My Figma skills grew so much on this project. I used auto layout everywhere, and I even learned Figma Motion to animate the app opening.",
      "Designing for a real team and real users is very different from a hackathon. Every screen has to connect to everything else.",
    ],
  },
  {
    id: "qhacks",
    name: "QHacks",
    subtitle: "Digital Premiere",
    date: "02.26",
    kind: "Website · Shipped",
    colors: ["#E2572B", "#FFC66B"],
    thumbnail: "/images/about/qhacks-2026.jpg",
    video: "https://www.youtube.com/embed/aDrGFSlnChI",
    hook: "Queen's University's largest hackathon site, reimagined as a cinematic \"night at the movies.\"",
    tags: ["web", "branding", "motion", "shipped"],
    role: "UI/UX website designer",
    team: "QHacks tech team (React)",
    timeline: "6 months of design · February 2026",
    status: "Shipped",
    tools: "Figma, Photoshop → React",
    process: [
      { label: "Clapperboard badges · merch", image: "/images/projects/qhacks.jpg" },
      { label: "Marquee on the big screen · opening", image: "/images/projects/qhacks-marquee.jpg" },
    ],
    tabs: {
      overview: [
        "I was the UI/UX designer for the QHacks website, Queen's University's largest hackathon.",
        "Telling stories through my designs is really important to me, so from the start I wanted the site to feel like a story, not just a page full of information.",
        "The \"Digital Premiere\" theme turns every visitor into the protagonist of their own \"night at the movies.\"",
        "By moving away from standard landing pages, we turned a technical event registration into an emotional, nostalgic memory.",
        "Every pixel was designed to evoke the feeling of a Golden Era cinema, guiding participants through a curated narrative flow.",
      ],
      discovery: [
        "I believe every digital interface should tell a story that resonates, so I chose a theater aesthetic to build real excitement.",
        "Instead of a traditional scroll, we imagined a journey starting in a lobby with movie posters and ending in a screening room.",
        "We reimagined photos from previous years into high-fidelity posters using Photoshop to blend history with our new theme.",
        "This discovery phase focused on how to make a high-energy tech event feel tactile, vintage, and deeply personal.",
      ],
      design: [
        "I used an \"Old Theatre\" motif with custom noise and static overlays to give the site a real film-grain texture.",
        "A custom parallax \"scene-change\" system was designed to mimic a projector switching reels as the user scrolls down.",
        "We swapped boring Q&A sections for \"VHS-tape\" designs and replaced the footer with a cinematic \"Credit Scene.\"",
        "The visual language uses vintage typography and sponsor \"film tapes\" to maintain the immersive movie-house atmosphere.",
      ],
      final: [
        "I worked in a tight feedback loop with the tech team to translate complex Figma prototypes into a fast, responsive React site.",
        "We integrated scroll-triggered animations that \"project\" new movie scenes in real time as you move through the page.",
        "The project finished with a multimedia finale, including a QHacks movie sequence that completed the cinematic rhythm.",
        "I carried the same movie theme through all of the merch too, like the clapperboard hacker badges and lanyards, so the whole event felt like one brand. It showed me I know how to build a brand identity, not just a website.",
      ],
    },
    lessons: [
      "Competing with other hackathon sites was hard because they all had really impressive designers. But none of them were giving me a story. Sure, they were pretty to look at, but I wanted hackers to feel like they had to come to ours, that ours was something different.",
      "I learned that stock photos are very hard to work into a design. After this, I started designing my own assets in Figma, since they're also easier for developers to add.",
      "I definitely had to adjust to designing things my team could actually code and launch. I had trouble letting go of my grand ideas, but we found a middle ground and delivered a beautiful website.",
    ],
  },
  {
    id: "unlink",
    name: "Unlink",
    subtitle: "A guided reset for digital safety",
    date: "03.26",
    kind: "Mobile app · Hackathon",
    colors: ["#F2B8C6", "#7FA7E8"],
    thumbnail: "/images/projects/unlink/thumb.jpg",
    video: "https://www.youtube.com/embed/WxcupgXdzRU",
    hook: "A diary-style app that guides women leaving unsafe relationships through reclaiming their digital safety.",
    tags: ["mobile", "safety", "figma", "react native", "typescript", "google cloud", "openstreetmap"],
    role: "UI/UX + brand designer",
    team: "Team of 4",
    timeline: "72 hours · March 2026",
    status: "Re-developing",
    tools: "", // shown as tags instead
    process: [
      { label: "Diary identity", image: "/images/projects/unlink/identity.jpg" },
      { label: "Completion bar", image: "/images/projects/unlink/completion.jpg" },
    ],
    tabs: {
      overview: [
        "1 in 4 women experience intimate partner violence in their lifetime. In the digital age, leaving an unsafe relationship isn't just emotional. It's logistical, it's digital, and it's overwhelming.",
        "There are shared passwords, devices, bank access, social media accounts, location tracking and cloud backups to untangle. Even after someone leaves your sight, they can still access your world through your device.",
        "UnLink is inspired by childhood journals, because nothing feels more grounding during chaos than something familiar. It feels like a diary, but it works like a recovery system.",
        "Built in 72 hours for the hackathon theme Safety in the Digital Age.",
      ],
      discovery: [
        "Shared Apple IDs, location tracking, streaming accounts, banking apps and smart home devices all create invisible vulnerabilities.",
        "For women leaving unsafe relationships, that digital layer can become a source of surveillance, a channel for harassment, a barrier to financial independence and a risk to physical safety.",
        "Most resources focus on emotional healing or legal steps, and other safety apps focus on emergency alerts or physical tracking. Almost nothing helps with the digital untangling.",
        "So we asked: what if reclaiming your digital life felt like turning a page of a book, not fighting a battle?",
      ],
      design: [
        "We moved away from the sterile \"security dashboard\" look. UnLink is built to feel warm, familiar, private and grounding.",
        "Handwritten type feels soft and personal instead of clinical, and a light pastel palette lowers anxiety and visual intensity.",
        "The diary isn't just decoration. During trauma, familiarity creates stability, so making the app feel nostalgic and safe makes the hard steps feel manageable.",
        "Everything is split into chapters: Devices, Socials, Finances and Resources. With each step you're not just checking a box, you're reclaiming a piece of yourself.",
        "I built all the prototypes in Figma, working toward clarity and easy navigation with arrows and sticky notes.",
      ],
      final: [
        "Built with React Native and TypeScript, with Google OAuth for secure sign-in.",
        "It scans Google Drive, Calendar and Gmail for files shared with a partner, files open through links, upcoming events with them, and shared subscriptions.",
        "An interactive questionnaire with a progress bar helps find your risk areas.",
        "If you share your location, OpenStreetMap finds nearby shelters and helplines. If you don't, the app still shows national 24/7 crisis lines, because safety should never depend on one permission.",
        "Every woman deserves to feel safe, not just physically, but digitally.",
      ],
    },
    lessons: [
      "I'm really proud that I designed Unlink with the user in mind first. Leaving someone who was toxic towards you is already so hard, and the last thing you need is an app that feels cold and technical.",
      "I wanted it to feel warm, like a safe space, so every little detail, from the stickers to the completion bar, was there to make each step feel a bit less scary.",
    ],
  },
  {
    id: "reverie",
    name: "Reverie",
    subtitle: "Music makes memories",
    date: "11.25",
    kind: "Web app · Designathon",
    colors: ["#E8574C", "#E8E3D8"],
    thumbnail: "/images/projects/reverie/thumb.jpg",
    video: "https://www.youtube.com/embed/uD6161Idv-E",
    hook: "A musical time capsule where your listening history becomes a scrapbook of your year.",
    tags: ["figma", "web", "music", "scrapbook", "designathon"],
    role: "UI/UX designer",
    team: "Team of 4",
    timeline: "1 week · November 2025",
    status: "Concept",
    tools: "", // shown as tags instead
    process: [
      { label: "AI baby was trending..", image: "/images/projects/reverie/ai-baby.jpg" },
      { label: "Moodboard · record stores", image: "/images/projects/reverie/moodboard.jpg" },
      { label: "Iteration 1 · first layout", image: "/images/projects/reverie/iteration-1.jpg" },
      { label: "Final · record shelf", image: "/images/projects/reverie/shelf.jpg" },
    ],
    tabs: {
      overview: [
        "Reverie is a personal, interactive musical time capsule, a place where your listening history becomes a scrapbook of your year.",
        "Songs are tied to specific moments, relationships and phases of our lives. Streaming apps give us endless access, but they overlook the personal storytelling side of listening.",
        "Reverie organizes your listening history into monthly playlists, then pairs each month with a scrapbook page and a mood-based colour theme.",
        "It connects to Spotify, Apple Music and YouTube Music, and adds each monthly playlist straight to your account.",
      ],
      discovery: [
        "Our emotional timelines get lost in endless playlists, algorithm picks and messy listening histories. The stats apps give you are surface-level and miss the story behind them.",
        "We picked a vintage record store as our motif and pulled colour schemes, patterns and textures from Pinterest.",
        "We looked at Notability for the scrapbook toolbar and Notion for the keyword tagging.",
        "We designed for music lovers, journalers and creatives, especially people aged 15–30 who are nostalgic and active on social media.",
      ],
      design: [
        "We took in feedback from a bunch of mentors. One told us tagging by mood and genre really mattered, along with sorting like oldest to newest.",
        "Another pointed out that brown is a hard neutral to work with, so we moved to a lighter palette and kept the UI simple and familiar, like the music sites people already use.",
        "A few mentors said they'd use it just for the scrapbooking, so we kept it. Someone also said the grid of vinyls was the most intuitive because it reads like a calendar.",
        "We went from a brown first draft, to a first colour palette, to a cream and coral record shelf with mood-tinted covers.",
      ],
      final: [
        "A landing page that sets the tone: music makes memories.",
        "A record shelf with one vinyl per month, each tinted by its mood tags.",
        "A scrapbook for every month where you can add photos, drawings, text and stickers.",
        "Custom mood tags that change each playlist's colour theme.",
      ],
    },
    lessons: [
      "This was my first hackathon where we didn't need to code, which was really good for me since I'm always the designer anyway, and it's what I truly love to do.",
      "Working in a group with so many creative minds was so fun. Bouncing ideas off each other really helped the process.",
      "I'm grateful I'm running the designathon this year so new students can have as much fun as I did last year.",
    ],
  },
  {
    id: "pawmodoro",
    name: "Pawmodoro",
    subtitle: "Study with a virtual pet",
    date: "03.25",
    kind: "Web app · Hackathon",
    colors: ["#FF9A9A", "#FFE38A"],
    thumbnail: "/images/projects/pawmodoro/thumb.jpg",
    video: "https://www.youtube.com/embed/gjcvb5QWlRU",
    hook: "Take care of a pet by completing study sessions with a built-in Pomodoro timer.",
    tags: ["figma", "animation", "clip studio paint", "krita", "javascript", "html", "css"],
    role: "Designer + animator",
    team: "Team of 3",
    timeline: "72 hours · March 2025",
    status: "Hackathon build",
    tools: "", // shown as tags instead
    process: [
      { label: "Friend status", image: "/images/projects/pawmodoro/friends.jpg" },
      { label: "Main screen", image: "/images/projects/pawmodoro/main.jpg" },
      { label: "App icon", image: "/images/projects/pawmodoro/icon.jpg" },
    ],
    tabs: {
      overview: [
        "Pawmodoro helps students stay on track with something fun and rewarding. You choose a pet to take care of by completing study sessions with a built-in Pomodoro timer, and build healthy habits along the way.",
        "Finish the tasks on your to-do list and you feed your pet and keep it happy.",
        "Built at HackHer 2025.",
      ],
      discovery: [
        "As students, we know how hard time management is and how tough it can be to find the motivation to study.",
        "Tools like Notion and the Pomodoro technique work, but sometimes they're not enough. A lot of students struggle to even start.",
        "So we wanted to add something fun that would actually get people to sit down and study.",
        "We took inspiration from games like Pou and paired a Pomodoro timer with a virtual pet.",
      ],
      design: [
        "I was the designer and animator, so I helped design all the pets and animated every one of them.",
        "The website's design was made in Figma.",
        "The pet graphics were drawn in Clip Studio Paint and animated in Krita.",
      ],
      final: [
        "Built with JavaScript, HTML and CSS in VS Code.",
        "A Pomodoro timer and to-do list, where finishing tasks keeps your pet fed and happy.",
        "Everyone on the team worked on different parts and we came together to talk through new ideas when we needed to.",
      ],
    },
    lessons: [
      "My biggest challenge was my own ambition. As a first year with not much web dev experience, getting the animations and timers to work together on the site was really hard.",
      "Figuring out how all the different pieces depended on each other was tricky, but working through it with my team taught me that you don't have to know everything going in. You learn by building it together.",
    ],
  },
  {
    id: "sammy",
    name: "Sammy at School",
    subtitle: "Eco choices, real consequences",
    date: "01.25",
    kind: "Game · QHacks 2025",
    colors: ["#3FA34D", "#B6F26B"],
    thumbnail: "/images/projects/sammy.jpg",
    video: "https://www.youtube.com/embed/yCdn0h0Pfsk",
    hook: "A first-person game where kids' everyday choices quietly shape their world, with a camera that sorts real trash.",
    tags: ["mediapipe", "opencv", "pygame", "roboflow"],
    role: "Game designer",
    team: "Team of 4",
    timeline: "72 hours · QHacks 2025",
    status: "Hackathon build",
    tools: "PyGame, OpenCV, Roboflow, MediaPipe",
    process: [
      { label: "Home screen", image: "/images/projects/sammy-home.jpg" },
      { label: "Trash scanner · decay time", image: "/images/projects/sammy-detect.jpg" },
    ],
    tabs: {
      overview: [
        "The idea came from noticing how even the smallest everyday actions add up to the bigger state of the environment. Things like wasting water or throwing garbage in the wrong bin.",
        "We felt that teaching the next generation was the key to a more sustainable future, so we wanted an engaging way to teach eco-consciousness: something kids would actually want to play.",
        "In Sammy at School, players make everyday choices that affect the environment without ever being told what's right or wrong.",
        "The twist: every decision quietly changes the world around them. By the end, they've either helped build a thriving, happy planet or they're looking at a dystopian one.",
      ],
      discovery: [
        "Our biggest question was how to keep a game fun while still teaching something. Finding that balance between play and learning took a lot of back and forth.",
        "We read up on behavioural psychology, especially how choices and consequences shape habits over time. That's why the game never lectures; it just shows you what happens.",
        "We focused on three daily habits kids actually run into: saving water, choosing eco-friendly materials, and sorting garbage.",
        "To make waste sorting feel real instead of abstract, we decided to bring in a camera so kids could hold up real objects.",
      ],
      design: [
        "We started with the story and game mechanics first, mapping out each daily choice and where it could lead.",
        "The game is built as an interactive, narrative-driven world with multiple endings that depend on the player's choices.",
        "The world itself is the feedback: it gets greener or more polluted as you play, so kids can see the impact instead of reading about it.",
        "The object detection camera identifies real items and sorts them into recyclable, compostable or non-recyclable, so kids learn waste sorting visually and hands-on.",
      ],
      final: [
        "We built the game in Python with PyGame, and used OpenCV, Roboflow and MediaPipe for the object detection camera.",
        "Training the model to recognise a wide range of objects accurately was the trickiest part. It took a lot of time and fine-tuning.",
        "We're proud that we worked through every bug together as a team, and that the detection camera actually works. It was a big milestone for us.",
        "What's next: more scenarios and daily choices, a detection model that recognises more items, working with educators to bring it into classrooms, and a multiplayer mode where players build a sustainable community together.",
      ],
    },
    lessons: [
      "This was my first ever hackathon, and I was terrified going in because I thought I was too inexperienced to be there. Who knew it would set me off to do 6 more, and then end up running QHacks two years later.",
      "Looking back, I'm disappointed in the AI-generated visuals we used, because they go against my artistic morals. At the start of 2025 AI was getting really good and I wanted to experiment with it. I'm glad I learned how to use it, but if I came back to this project I'd want to make all the visuals myself.",
      "More than anything, this hackathon taught me to never doubt myself. Anything is possible with time.",
    ],
  },
];

/* ---------- About ---------- */
export const ABOUT = {
  heading: "Hi, I'm Rounika!",
  // Each string is one paragraph.
  intro: [
    "I love telling stories through the things I design and build. I'm a Computer Science and Film student at Queen's University, and I like mixing the technical side (AI and frontend) with the creative side (layout, color, and the little details that make something feel right). My favorite part is taking an idea from a messy wireframe to something real that people can use.",
    "I'm really passionate about community, which is why I'm a part of so many clubs at school. I want to put my love for design to good use by spreading it throughout the Queen's community. I'm so grateful to partner with Figma, because I get to share my knowledge and love for Figma just like an upper year did for me in my first year.",
    "When I am not staring at code or Figma, you will probably find me playing in a band with my friends, heading to a concert, making art, or getting lost in video games.",
    "Enjoy messing with the music player in the bottom right, and feel free to share any music recommendations with me :)",
  ],
  bandVideo: "https://www.youtube.com/embed/qr3jgTQgG5M",
  // Photo slideshow (in this order). focus = which part of the photo stays in frame ("x% y%").
  gallery: [
    { src: "/images/about/about-1.jpg", alt: "Rounika at the beach at sunset", focus: "32% 50%" },
    { src: "/images/about/about-2.jpg", alt: "Rounika by the lake in Kingston", focus: "50% 62%" },
    { src: "/images/about/about-3.jpg", alt: "Mirror selfie", focus: "45% 35%" },
  ],
  // "Off the clock" photos under Experience (in this order).
  photos: [
    { label: "Orchestra · Violin and Viola", image: "/images/about/orchestra.jpg", colors: ["#7B4FD0", "#F49AC2"] as [string, string], focus: "50% 40%" },
    { label: "Band · SCISR", image: "/images/about/band.jpg", colors: ["#2A2F3A", "#6B4FD0"] as [string, string], focus: "50% 45%" },
    { label: "Cosplaying Nana ❤️", image: "/images/about/nana.jpg", colors: ["#F49AC2", "#2A2F3A"] as [string, string], focus: "60% 35%" },
    { label: "Soccer · Hala Madrid!", image: "/images/about/soccer.jpg", colors: ["#2A7A3B", "#B6F26B"] as [string, string], focus: "50% 62%" },
  ],
  // Newest / most important first. Points come from your resume.
  experience: [
    { role: "Campus Ambassador", org: "Figma", dates: "Aug 2026 – Present", points: ["Spreading Figma throughout the Queen's University community by hosting events and workshops."] },
    { role: "Design Engineer Intern", org: "WeTribe", dates: "Jun 2026 – Sep 2026", points: ["Owned the event detail and host profile experience end-to-end, from user research and flows to wireframes and interactive prototypes.", "Built the company's brand identity by consulting on their preferences and combining clean graphics with music-flyer aesthetics."] },
    { role: "Designathon Director", org: "QUX Designathon", dates: "Apr 2026 – Present", points: ["Organizing Queen's University's student UX designathon."] },
    { role: "Co-Chair", org: "QHacks", dates: "Mar 2026 – Present", points: ["Leading organization and execution of QHacks 2027, Queen's University's largest hackathon."] },
    { role: "Marketing Director", org: "QHacks", dates: "Sep 2025 – Mar 2026", points: ["Grew the event to 500+ applications through targeted outreach and promotion.", "Managed and mentored a team whose social campaigns generated 160K+ views across reels.", "Designed the QHacks website in Figma and worked with the tech team to build it.", "Created event merch, including t-shirts and bags."] },
    { role: "Merchandise Director", org: "COMPSA", dates: "Sep 2025 – Apr 2026", points: ["Designed computing-themed merch for the student community in Procreate, Illustrator and Photoshop."] },
    { role: "Graphic Designer", org: "COMPSA", dates: "Sep 2024 – Apr 2025", points: ["Designed social media graphics for COMPSA's Instagram in Figma — where I first got proficient in Figma."] },
    { role: "Events Organizer", org: "Queen's Game Development Club", dates: "Sep 2024 – Dec 2025", points: ["Led the QGDC 2025 Game Jam.", "Ran weekly meetings to showcase projects and mentor members in game design."] },
    { role: "Art Instructor", org: "Evelia Espinosa's Art Studio", dates: "Sep 2021 – Jun 2024", points: ["Taught drawing and oil painting to students aged 5–18 in classes of up to 20.", "Designed end-of-year practical painting exams and written tests on art history and color theory."] },
  ],
};

/* ---------- Art ---------- */
export const PAINTINGS = [
  { title: "[painting title]", medium: "[medium]", size: "[size]", year: "[year]", note: "[one line about what you were trying out]", image: "", colors: ["#F6B26B", "#7A4FD0"] as [string, string] },
  { title: "[painting title]", medium: "[medium]", size: "[size]", year: "[year]", note: "[note]", image: "", colors: ["#7FD3F7", "#2A7A3B"] as [string, string] },
  { title: "[painting title]", medium: "[medium]", size: "[size]", year: "[year]", note: "[note]", image: "", colors: ["#FFD36B", "#E2572B"] as [string, string] },
  { title: "[painting title]", medium: "[medium]", size: "[size]", year: "[year]", note: "[note]", image: "", colors: ["#B6F26B", "#1660C9"] as [string, string] },
  { title: "[painting title]", medium: "[medium]", size: "[size]", year: "[year]", note: "[note]", image: "", colors: ["#F49AC2", "#2B3F6B"] as [string, string] },
  { title: "[painting title]", medium: "[medium]", size: "[size]", year: "[year]", note: "[note]", image: "", colors: ["#C9F7E8", "#0E9C9A"] as [string, string] },
];
export const ART_INSTAGRAM = { handle: "@rounikasaxena", url: "https://instagram.com/rounikasaxena" };

/* ---------- Contact ---------- */
export const CONTACT = {
  heading: "Let's connect",
  email: "rounikasaxena5@gmail.com",
  nowLooping: "Break Free",
  // Link tiles on the Contact page
  links: [
    { label: "Email", value: "rounikasaxena5@gmail.com", url: "mailto:rounikasaxena5@gmail.com", colors: ["#2BA3E8", "#9BE7FF"] as [string, string] },
    { label: "LinkedIn", value: "Rounika Saxena", url: "https://www.linkedin.com/in/rounikasaxena5", colors: ["#2B6FD6", "#7FA7E8"] as [string, string] },
    { label: "Resume", value: "Download PDF", url: "/resume.pdf", colors: ["#E8E0D8", "#8A97B0"] as [string, string] },
    { label: "QHacks", value: "@qhacksx", url: "https://instagram.com/qhacksx", colors: ["#F49AC2", "#FFC66B"] as [string, string] },
    { label: "Figma at Queen's", value: "@figmaatqueens", url: "https://instagram.com/figmaatqueens", colors: ["#A259FF", "#1ABCFE"] as [string, string] },
    { label: "K-pop TikTok", value: "@skzmixxbit", url: "https://www.tiktok.com/@skzmixxbit", colors: ["#2A2F3A", "#F49AC2"] as [string, string] },
    { label: "Design IG", value: "@callthatfashion_", url: "https://instagram.com/callthatfashion_", colors: ["#7B4FD0", "#F49AC2"] as [string, string] },
  ],
  // Form: paste a Formspree (or similar) endpoint to make "Send" work. Empty = opens an email draft instead.
  formEndpoint: "",
};

/* ---------- Journal (vacations) ---------- */
export type JournalPage = {
  title: string; // handwritten title
  text: string; // a few lines in your voice
  photos: string[]; // up to 4 image paths per page
};
export type Trip = {
  name: string;
  place: string;
  date: string;
  colors: [string, string];
  cover: string; // image for the stacked pages on the sides
  spreads: { left: JournalPage; right: JournalPage }[];
};

const blankPage = (title: string): JournalPage => ({
  title,
  text: "[3–4 lines about this day: what you ate, saw, laughed about. Keep it in your own voice.]",
  photos: ["", "", ""],
});

export const TRIPS: Trip[] = [
  { name: "[trip name]", place: "[city, country]", date: "[month year]", colors: ["#E8B36A", "#8A5A2B"], cover: "", spreads: [{ left: blankPage("[trip name]"), right: blankPage("day 1") }, { left: blankPage("day 2"), right: blankPage("day 3") }, { left: blankPage("day 4"), right: blankPage("the end :)") }] },
  { name: "[trip name]", place: "[city, country]", date: "[month year]", colors: ["#7FD3F7", "#2E7C88"], cover: "", spreads: [{ left: blankPage("[trip name]"), right: blankPage("day 1") }, { left: blankPage("day 2"), right: blankPage("day 3") }] },
  { name: "[trip name]", place: "[city, country]", date: "[month year]", colors: ["#F49AC2", "#7B4FD0"], cover: "", spreads: [{ left: blankPage("[trip name]"), right: blankPage("day 1") }, { left: blankPage("day 2"), right: blankPage("day 3") }] },
  { name: "[trip name]", place: "[city, country]", date: "[month year]", colors: ["#B6F26B", "#3FA34D"], cover: "", spreads: [{ left: blankPage("[trip name]"), right: blankPage("day 1") }] },
  { name: "[trip name]", place: "[city, country]", date: "[month year]", colors: ["#FFC66B", "#E2572B"], cover: "", spreads: [{ left: blankPage("[trip name]"), right: blankPage("day 1") }] },
  { name: "[trip name]", place: "[city, country]", date: "[month year]", colors: ["#9BE7FF", "#2B8FD6"], cover: "", spreads: [{ left: blankPage("[trip name]"), right: blankPage("day 1") }] },
];
