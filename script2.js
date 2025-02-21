// 🌍 World update messages categorized by game phase
const worldUpdates = {
	startGame: [
		"You have started your Snus empire.",
		"A guy is really liking Snus.",
		"Is snus the new thing?",
		"Is snus really that good?",
		"Snus is the new thing."
	],
	earlyGame: [
		"Snus production is slowly gaining traction.",
		"Local stores are reporting a mysterious rise in Snus sales.",
		"A group of dedicated Snus enthusiasts starts a fan club in your honor.",
		"The media starts covering the sudden surge in Snus consumption.",
		"Competitors are starting to take notice of your Snus operations.",
		"Some say you're running the Snus business of the future.",
		"Discussions about Snus regulations start heating up in local politics.",
		"The first unofficial 'Snus festival' is organized in your honor.",
		"Rumors spread of a hidden underground Snus market.",
		"Your brand is trending on social media for unknown reasons."
	],
	midGame: [
		"Economists begin studying your Snus empire as an anomaly.",
		"Stock markets are adjusting to the growing Snus industry.",
		"Historians call this era 'The Great Snus Expansion'.",
		"Black market traders have started using your brand as currency.",
		"A small country has made Snus an essential import for their economy.",
		"Academics are debating whether Snus production should be an Olympic sport.",
		"A new industry emerges: luxury Snus tourism.",
		"International demand for your Snus is increasing rapidly.",
		"Supply chains are struggling to keep up with Snus exports.",
		"Your face appears on Snus-related street art worldwide."
	],
	lateGame: [
		"World governments are forced to acknowledge the Snus-driven economy.",
		"Major tech companies are investing in Snus automation.",
		"Snus trade routes are being mapped from space.",
		"A new banking system is built entirely around Snus transactions.",
		"Snus-related incidents now account for 70% of financial news.",
		"Researchers are trying to determine if Snus can replace oil.",
		"A secret organization has formed to either stop or protect your empire.",
		"Major corporations are trying (and failing) to compete with your Snus monopoly.",
		"Environmentalists are demanding sustainable Snus farming.",
		"A new reality show documents the rise of the Snus industry."
	],
	endGame: [
		"An intergovernmental committee is formed to manage Snus diplomacy.",
		"Snus has officially become a globally recognized reserve currency.",
		"Historians are calling this 'The Snus Age'.",
		"Scientists confirm Snus exports are disrupting global gravity.",
		"Economists propose a global Snus standard to replace gold.",
		"A mysterious billionaire offers to buy your entire empire, but you refuse.",
		"Your Snus industry is now bigger than most world economies combined.",
		"Alien civilizations have started making Snus requests.",
		"A new form of Snus has been developed that never runs out.",
		"Secret labs are researching a Snus-based propulsion system."
	],
	singularity: [
		"Snus is now considered a fundamental element of reality.",
		"Time travelers are appearing, all seemingly obsessed with Snus.",
		"Snus production has surpassed all known physical limits.",
		"Mathematicians are rewriting formulas to accommodate the impact of Snus.",
		"Snus has replaced light as the fastest thing in the universe.",
		"The concept of ‘money’ is obsolete—Snus is the only true wealth.",
		"Entire galaxies are now competing in Snus supremacy.",
		"A cosmic council has declared you 'The Grand Snus Architect'.",
		"Physicists confirm Snus has reached quantum stability.",
		"Reality itself bends under the sheer weight of Snus production."
	]
};

// 💰 Define thresholds for each phase based on upgrade prices
const phaseThresholds = {
	startGame: { min: 0, max: 1000 }, // Start → Mid-Factory
	earlyGame: { min: 1001, max: 250000 }, //  MidFactory → Factory
	midGame: { min: 250001, max: 1000000 }, // Mountain → Planet
	lateGame: { min: 1000001, max: 1000000000 }, // Star → Galaxy
	endGame: { min: 1000000001, max: 25000000000 }, // Universe → Multiverse
	singularity: { min: 25000000001, max: Infinity } // Beyond time & space
};

// 📢 Get the correct phase based on currency
function getCurrentPhase(snusAmount) {
	for (let phase in phaseThresholds) {
		let range = phaseThresholds[phase];
		if (snusAmount >= range.min && snusAmount <= range.max) {
			return phase;
		}
	}
	return null;
}

// 🎤 Display world update message
function showWorldUpdate() {
	// 🌎 Get a world update based on the player's Snus currency
	const currentPhase = getCurrentPhase(currency);
	if (!currentPhase) return;

	const phaseQuotes = worldUpdates[currentPhase];
	if (!phaseQuotes || phaseQuotes.length === 0) return;

	// Pick a random update
	const randomIndex = Math.floor(Math.random() * phaseQuotes.length);
	const updateText = phaseQuotes[randomIndex];

	const timeString = new Date().toLocaleTimeString();
	const message = `[${timeString}] ${updateText}`;

	// 🏆 Display message in social bar
	const socialText = document.getElementById("social-text");
	socialText.textContent = message;
	socialText.style.opacity = "1"; // Make text visible

	// 🌟 Reset animation to restart it
	socialText.style.animation = "none";
	void socialText.offsetWidth; // Forces reflow (restarts animation)
	socialText.style.animation = "scrollText 10s linear forwards";

	// ⏳ Hide text after scrolling
	setTimeout(() => {
		socialText.style.opacity = "0"; // Fade out
	}, 10000);
}

// 🔄 Run update every 30 seconds
setInterval(() => {
	if (currency > 0) {
		showWorldUpdate();
	}
}, 20000);
