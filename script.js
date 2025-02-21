let currency = 0;
let snusPerClick = 1;
let autoClickRate = 0;
let clickcount = 0; // Track number of clicks per second
let upgradesPurchased = 0; // Track the number of upgrades the player has bought

let upgradeinfo = [
	{
		type: "auto",
		baseCosts: 10,
		growthFactor: 1.05,
		baseBenefit: 1,
		benefit: 1,
		benefitType: "sec",
		displayname: "DIY Snus Maker",
		buttonIds: "auto-btn",
		amount: 0
	},
	{
		type: "click",
		baseCosts: 50,
		growthFactor: 1.05,
		baseBenefit: 5,
		benefit: 5,
		benefitType: "click",
		displayname: "Fellow Snuser",
		buttonIds: "click-btn",
		amount: 0
	},
	{
		type: "machine",
		baseCosts: 500,
		growthFactor: 1.08,
		baseBenefit: 25,
		benefit: 25,
		benefitType: "sec",
		displayname: "Snus Machine",
		buttonIds: "machine-btn",
		amount: 0
	},
	{
		type: "factory",
		baseCosts: 5000,
		growthFactor: 1.1,
		baseBenefit: 100,
		benefit: 100,
		benefitType: "sec",
		displayname: "Snus Factory",
		buttonIds: "factory-btn",
		amount: 0
	},
	{
		type: "mountain",
		baseCosts: 30000,
		growthFactor: 1.1,
		baseBenefit: 300,
		benefit: 300,
		benefitType: "sec",
		displayname: "Snus Mountain",
		buttonIds: "mountain-btn",
		amount: 0
	},
	{
		type: "snusegang",
		baseCosts: 200000,
		growthFactor: 1.06,
		baseBenefit: 5000,
		benefit: 5000,
		benefitType: "click",
		displayname: "Snuse Gang",
		buttonIds: "snusegang-btn",
		amount: 0
	},
	{
		type: "ocean",
		baseCosts: 1000000,
		growthFactor: 1.1,
		baseBenefit: 15000,
		benefit: 15000,
		benefitType: "sec",
		displayname: "Snus Ocean",
		buttonIds: "ocean-btn",
		amount: 0
	},
	{
		type: "planet",
		baseCosts: 5000000,
		growthFactor: 1.1,
		baseBenefit: 150000,
		benefit: 150000,
		benefitType: "sec",
		displayname: "Snus Planet",
		buttonIds: "planet-btn",
		amount: 0
	},
	{
		type: "army",
		baseCosts: 25000000,
		growthFactor: 1.1,
		baseBenefit: 500000,
		benefit: 500000,
		benefitType: "click",
		displayname: "Snus Army",
		buttonIds: "army-btn",
		amount: 0
	},
	{
		type: "star",
		baseCosts: 150000000,
		growthFactor: 1.1,
		baseBenefit: 2000000,
		benefit: 2000000,
		benefitType: "sec",
		displayname: "Snus Star",
		buttonIds: "star-btn",
		amount: 0
	},
	{
		type: "galaxy",
		baseCosts: 1000000000,
		growthFactor: 1.1,
		baseBenefit: 20000000,
		benefit: 20000000,
		benefitType: "sec",
		displayname: "Snus Galaxy",
		buttonIds: "galaxy-btn",
		amount: 0
	},
	{
		type: "fleet",
		baseCosts: 5000000000,
		growthFactor: 1.1,
		baseBenefit: 10000000,
		benefit: 10000000,
		benefitType: "click",
		displayname: "Snus Fleet",
		buttonIds: "fleet-btn",
		amount: 0
	},
	{
		type: "universe",
		baseCosts: 25000000000,
		growthFactor: 1.2,
		baseBenefit: 300000000,
		benefit: 300000000,
		benefitType: "sec",
		displayname: "Snus Universe",
		buttonIds: "universe-btn",
		amount: 0
	},
	{
		type: "multiverse",
		baseCosts: 299792458000,
		growthFactor: 1.2,
		baseBenefit: 299792458000,
		benefit: 299792458000,
		benefitType: "sec",
		displayname: "Snus Multiverse",
		buttonIds: "multiverse-btn",
		amount: 0
	},
	{
		type: "singularity",
		baseCosts: 0,
		growthFactor: 1,
		baseBenefit: 1,
		benefit: 1,
		benefitType: "click",
		displayname: "Snus Singularity",
		buttonIds: "singularity-btn",
		amount: 0
	}
];

let currentCosts = {};

const snusBrands = [
	{
		id: 1,
		name: "Epok Freeze",
		price: 5000,
		image: "images/snus-boks/epok-freeze.png",
		owned: false
	},
	{
		id: 2,
		name: "Loop Jalapeno Lime",
		price: 10000,
		image: "images/snus-boks/loop-norsk.png",
		owned: false
	},
	{
		id: 3,
		name: "Epok Red Glacier",
		price: 20000,
		image: "images/snus-boks/epok-red.png",
		owned: false
	},
	{
		id: 4,
		name: "Skruf Fresh",
		price: 25000,
		image: "images/snus-boks/skruf-fresh.png",
		owned: false
	},
	{
		id: 5,
		name: "G3 Extra Strong",
		price: 50000,
		image: "images/snus-boks/g3.png",
		owned: false
	},
	{
		id: 6,
		name: "ZYN Cool Mint",
		price: 100000,
		image: "images/snus-boks/zyn.png",
		owned: false
	},
	{
		id: 7,
		name: "Loop Blue",
		price: 250000,
		image: "images/snus-boks/loop-blue.png",
		owned: false
	},
	{
		id: 8,
		name: "Loop Jalapeno Lime Deluxe",
		price: 500000,
		image: "images/snus-boks/loop-jalapeno.png",
		owned: false
	},
	{
		id: 9,
		name: "General Classic",
		price: 1000000,
		image: "images/snus-boks/general.png",
		owned: false
	},
	{
		id: 10,
		name: "G3 Load",
		price: 10000000,
		image: "images/snus-boks/g3-load.png",
		owned: false
	},
	{
		id: 11,
		name: "Epok Deluxe",
		price: 50000000,
		image: "images/snus-boks/epok-deluxe.png",
		owned: false
	},

	{
		id: 12,
		name: "Siberia",
		price: 100000000,
		image: "images/snus-boks/siberia.png",
		owned: false
	},
	{
		id: 13,
		name: "Skruf Super White",
		price: 100000000,
		image: "images/snus-boks/skruf-super-white.png",
		owned: false
	},
	{
		id: 14,
		name: "Siberia Black",
		price: 500000000,
		image: "images/snus-boks/siberia-black.png",
		owned: false
	},
	{
		id: 15,
		name: "Ettan",
		price: 800000000,
		image: "images/snus-boks/ettan.png",
		owned: false
	},
	{
		id: 16,
		name: "Real 1800s Snus",
		price: 2500000000,
		image: "images/snus-boks/1800.png",
		owned: false
	}
];

let activeBrand = null; // Stores the active snus brand

// Initialize `currentCosts` dynamically
upgradeinfo.forEach((upgrade) => {
	currentCosts[upgrade.type] = upgrade.baseCosts;
});

// Function to format numbers with periods as thousand separators
function formatNumber(number) {
	return number.toLocaleString("no-NO"); // Norwegian format, where "." is the thousand separator
}

function buyItem(type) {
	type = type.toLowerCase(); // Normalize case

	// Find the correct upgrade in upgradeinfo
	const upgrade = upgradeinfo.find((upg) => upg.type === type);

	if (!upgrade) return console.error("Invalid upgrade type:", type);

	const cost = currentCosts[type];

	if (currency >= cost) {
		currency -= cost; // Deduct cost

		// Apply benefit dynamically based on benefitType
		if (upgrade.benefitType === "sec") {
			autoClickRate += upgrade.benefit;
		} else if (upgrade.benefitType === "click") {
			snusPerClick += upgrade.benefit;
		}

		// Track which upgrade is purchased (assuming the order in upgradeinfo matters)
		upgradesPurchased = upgradeinfo.indexOf(upgrade) + 1;

		// Increase the cost exponentially based on the growth factor
		currentCosts[type] = Math.ceil(cost * upgrade.growthFactor);

		// Increase upgrade count
		upgrade.amount++;

		// Show amount of upgrades purchased
		const amountUpgrades = document.getElementById(`${type}-amount-text`);
		if (amountUpgrades) {
			amountUpgrades.textContent = formatNumber(upgrade.amount);
		}

		console.log(upgradesPurchased);

		// Show the next upgrade button if it exists
		const nextUpgrade = upgradeinfo[upgradesPurchased]; // Get the next upgrade object
		if (nextUpgrade && nextUpgrade.buttonIds) {
			document.getElementById(nextUpgrade.buttonIds).style.display =
				"flex";
		}

		// Update the button text with the new cost
		const buttonElement = document.getElementById(`${type}-price-btn`);
		if (buttonElement) {
			buttonElement.textContent = `${formatNumber(
				currentCosts[type]
			)},- Snus`;
		}

		// Handle special case for singularity (endgame)
		if (type === "singularity") {
			showEndScreen();
		}

		// Save game state and update display
		saveGameState();
		updateDisplay();
	} else {
		console.log("Not enough currency!");
	}
}

function getBenefitText(type) {
	const upgrade = upgradeinfo.find((upg) => upg.type === type);
	if (!upgrade) return "Unknown Benefit";

	// ✅ Use `benefit` stored in memory, NOT just from localStorage
	return `${formatNumber(upgrade.benefit)} Snus/${
		upgrade.benefitType === "sec" ? "Sec" : "Click"
	}`;
}

function updateDisplay() {
	const sps = autoClickRate + clickcount * snusPerClick; // Calculate total Snus Per Second (SPS)

	document.getElementById("currency").textContent = formatNumber(currency);
	document.getElementById("snus-per-click").textContent = `${formatNumber(
		snusPerClick
	)} `;
	document.getElementById("sps-display").textContent = `${formatNumber(sps)}`; // Update the SPS display

	// Loop through all upgrades and update their display text dynamically
	upgradeinfo.forEach((upgrade) => {
		const buttonElement = document.getElementById(
			`${upgrade.type}-price-btn`
		);
		if (buttonElement) {
			buttonElement.textContent = `${formatNumber(
				currentCosts[upgrade.type]
			)},- Snus`;
		}
	});
}

function updateCurrency() {
	currency += snusPerClick;
	clickcount++; // Track clicks
	updateDisplay();

	// Dynamically adjust amount of snus spawned (capped at 5 for visual reasons)
	let amount = Math.min(snusPerClick, 5);
	spawnSnus(amount);

	saveGameState(); // Save the game after update
}

// Enlarges the SNUS image
function animateImage(image) {
	const snusImage = document.getElementById(image);

	if (snusImage) {
		snusImage.classList.remove("enlarge"); // Reset the animation
		void snusImage.offsetWidth; // Force reflow to restart the animation
		snusImage.classList.add("enlarge"); // Re-add class to trigger animation
	}
}

function spawnSnus(amount) {
	const snusImages = [
		"images/pose.png",
		"images/pose2.png",
		"images/pose3.png"
	];
	for (let i = 0; i < amount; i++) {
		const snus = document.createElement("img");
		const randomImage =
			snusImages[Math.floor(Math.random() * snusImages.length)];
		snus.src = randomImage;
		snus.classList.add("falling-snus");

		// Set random horizontal position
		snus.style.left = `${Math.random() * 100}%`;

		// Set random starting vertical position between -50px and 50px
		const randomTop = Math.floor(Math.random() * 200) - 50;
		snus.style.top = `${randomTop}px`;

		// Randomize size
		snus.style.width = `${Math.random() * 30 + 30}px`;
		snus.style.height = `${Math.random() * 30 + 30}px`;
		snus.style.position = "absolute";

		document.body.appendChild(snus);
		setTimeout(() => snus.remove(), 1000);
	}
}

let alreadyFinished = false;

function showEndScreen() {
	const endScreen = document.getElementById("end-screen");
	if (!alreadyFinished) {
		endScreen.style.display = "flex"; // Show the end screen
		alreadyFinished = true; // Prevent re-showing the end screen
	}
}
function hideEndScreen() {
	const endScreen = document.getElementById("end-screen");
	endScreen.style.display = "none"; // Hide the end screen
}

function showBoosterScreen() {
	const endScreen = document.getElementById("booster-screen");
	endScreen.style.display = "flex"; // Show the end screen
}
function hideBoosterScreen() {
	const endScreen = document.getElementById("booster-screen");
	endScreen.style.display = "none"; // Hide the end screen
}
function showBrandScreen() {
	const endScreen = document.getElementById("brand-screen");
	endScreen.style.display = "flex"; // Show the end screen
}
function hideBrandScreen() {
	const endScreen = document.getElementById("brand-screen");
	endScreen.style.display = "none"; // Hide the end screen
}

function showResetScreen() {
	const endScreen = document.getElementById("reset-screen");
	endScreen.style.display = "flex"; // Show the end screen
}
function hideResetScreen() {
	const endScreen = document.getElementById("reset-screen");
	endScreen.style.display = "none"; // Hide the end screen
}

// Save game state to localStorage
function saveGameState() {
	localStorage.setItem("currency", currency);
	localStorage.setItem("snusPerClick", snusPerClick);
	localStorage.setItem("autoClickRate", autoClickRate);
	localStorage.setItem("clickcount", clickcount);
	localStorage.setItem("upgradesPurchased", upgradesPurchased); // Save upgrades purchased
	localStorage.setItem("snusBrands", JSON.stringify(snusBrands));
	localStorage.setItem("activeBrand", activeBrand);

	// Save upgrades purchased
	upgradeinfo.forEach((upgrade) => {
		localStorage.setItem(upgrade.type + "Cost", currentCosts[upgrade.type]);
		localStorage.setItem(upgrade.type + "Benefit", upgrade.benefit); // Save amount
		localStorage.setItem(upgrade.type + "Amount", upgrade.amount); // Save amount
	});
}

// Reset game state
function resetGameState() {
	console.log("🔄 Resetting Game State...");

	// Reset basic stats
	localStorage.setItem("currency", 0);
	localStorage.setItem("snusPerClick", 1);
	localStorage.setItem("autoClickRate", 0);
	localStorage.setItem("clickcount", 0);
	localStorage.setItem("upgradesPurchased", 0);

	// Reset all upgrades dynamically
	upgradeinfo.forEach((upgrade) => {
		upgrade.benefit = upgrade.baseBenefit; // ✅ Reset to base value
		upgrade.amount = 0;

		localStorage.setItem(upgrade.type + "Cost", upgrade.baseCosts);
		localStorage.setItem(upgrade.type + "Amount", 0);
		localStorage.setItem(upgrade.type + "Benefit", upgrade.baseBenefit);
	});

	// 🔥 Reset Booster Purchases
	upgradeinfo.forEach((upgrade) => {
		localStorage.removeItem(`boosterPurchased_${upgrade.type}`);
		const button = document.querySelector(`#booster-${upgrade.type}`);
		if (button) {
			button.style.opacity = "1"; // Restore full opacity
			button.style.pointerEvents = "auto"; // Allow clicking again
			button.style.filter = "none"; // Remove grayscale
			button.style.background = ""; // Reset to original style
			button.style.color = ""; // Reset text color
		}
	});

	localStorage.removeItem("snusBrands");
	localStorage.removeItem("activeBrand");

	// Reload game state
	loadGameState();
	location.reload();
}

// Initialize saved game state
function loadGameState() {
	const savedBrands = JSON.parse(localStorage.getItem("snusBrands"));
	const savedActiveBrand = localStorage.getItem("activeBrand");

	if (localStorage.getItem("currency")) {
		currency = parseInt(localStorage.getItem("currency"));
	}
	if (localStorage.getItem("snusPerClick")) {
		snusPerClick = parseInt(localStorage.getItem("snusPerClick"));
	}
	if (localStorage.getItem("autoClickRate")) {
		autoClickRate = parseInt(localStorage.getItem("autoClickRate"));
	}
	if (localStorage.getItem("clickcount")) {
		clickcount = parseInt(localStorage.getItem("clickcount"));
	}
	if (localStorage.getItem("upgradesPurchased")) {
		upgradesPurchased = parseInt(localStorage.getItem("upgradesPurchased"));
	}

	if (savedBrands) {
		snusBrands.forEach((brand, index) => {
			snusBrands[index].owned = savedBrands[index].owned;
		});
	}

	if (savedActiveBrand) {
		activeBrand = parseInt(savedActiveBrand);
		updateActiveBrand();
	}

	// 🔥 Load all upgrade benefits correctly
	upgradeinfo.forEach((upgrade) => {
		const savedBenefit = localStorage.getItem(`${upgrade.type}Benefit`);
		upgrade.benefit = savedBenefit
			? parseFloat(savedBenefit)
			: upgrade.baseBenefit;
	});

	// ✅ Disable boosters that were already purchased
	upgradeinfo.forEach((upgrade) => {
		const boosterPurchased = localStorage.getItem(
			`boosterPurchased_${upgrade.type}`
		);
		if (boosterPurchased) {
			const button = document.querySelector(`#booster-${upgrade.type}`);
			if (button) {
				button.disabled = true;
				button.style.opacity = "0.5"; // Makes it look faded
				button.style.pointerEvents = "none"; // Prevents clicking
				button.style.filter = "grayscale(100%)"; // Makes it look visually disabled
				button.style.background = "rgba(0, 0, 0, 0.7)"; // Darkened background
				button.style.color = "#999"; // Slightly darker text color
			}
		}
	});

	updateBrandUI();

	// Load costs & amounts dynamically
	upgradeinfo.forEach((upgrade) => {
		const savedCost = localStorage.getItem(upgrade.type + "Cost");
		currentCosts[upgrade.type] = savedCost
			? parseInt(savedCost)
			: upgrade.baseCosts;

		const savedAmount = localStorage.getItem(upgrade.type + "Amount");
		upgrade.amount = savedAmount ? parseInt(savedAmount) : 0; // Ensure it defaults to 0 if missing
	});

	// Show all buttons that have been purchased + the next one
	upgradeinfo.forEach((upgrade, index) => {
		if (upgrade.amount > 0 && upgrade.buttonIds) {
			document.getElementById(upgrade.buttonIds).style.display = "flex";
			document.getElementById(`${upgrade.type}-amount-text`).textContent =
				formatNumber(upgrade.amount);

			// Show the next upgrade button if it exists
			const nextUpgrade = upgradeinfo[index + 1];
			if (nextUpgrade && nextUpgrade.buttonIds) {
				document.getElementById(nextUpgrade.buttonIds).style.display =
					"flex";
			}
		}
	});

	updateButtonTexts();
	updateDisplay();
}

function updateButtonTexts() {
	upgradeinfo.forEach((upgrade) => {
		const buttonElement = document.getElementById(
			`${upgrade.type}-price-btn`
		);
		const benefitTextElement = document.getElementById(
			`${upgrade.type}-benefit-text`
		);

		if (buttonElement) {
			buttonElement.textContent = `${upgrade.displayname} (${formatNumber(
				currentCosts[upgrade.type]
			)} Snus)`;
		}

		if (benefitTextElement) {
			benefitTextElement.textContent = getBenefitText(upgrade.type); // ✅ Now correctly updates benefit text
		}
	});
}

// Call loadGameState on page load
window.onload = loadGameState;

function buyBooster(type, multiplier, cost) {
	const upgrade = upgradeinfo.find((upg) => upg.type === type);
	if (!upgrade) return console.error("Invalid upgrade type:", type);

	if (currency >= cost) {
		currency -= cost; // Deduct cost

		// Apply multiplier **without changing amount**
		upgrade.benefit *= multiplier;

		// Update autoClickRate & snusPerClick based on new values
		if (upgrade.benefitType === "sec") {
			autoClickRate += upgrade.amount * upgrade.benefit;
		} else if (upgrade.benefitType === "click") {
			snusPerClick += upgrade.amount * upgrade.benefit;
		}

		// 🔥 **Save that this booster was purchased**
		localStorage.setItem(`boosterPurchased_${type}`, true);

		// Disable the button while keeping the original text visible
		const button = document.querySelector(`#booster-${type}`);
		if (button) {
			button.disabled = true;
			button.style.opacity = "0.5"; // Makes it look faded
			button.style.pointerEvents = "none"; // Prevents clicking
			button.style.filter = "grayscale(100%)"; // Makes it look visually disabled
			button.style.background = "rgba(0, 0, 0, 0.7)"; // Darkened background
			button.style.color = "#999"; // Slightly darker text color
		}

		// Update UI
		document.getElementById(`${type}-benefit-text`).textContent =
			getBenefitText(type);

		saveGameState();
		updateDisplay();

		console.log(
			`✅ Booster applied! ${upgrade.displayname} benefit multiplied by ${multiplier}`
		);
	} else {
		console.log("❌ Not enough Snus to buy this booster!");
		// 🌟 No money Text Animation
		const noMoneyText = document.getElementById("no-money-text");
		noMoneyText.style.animation = "none";
		void noMoneyText.offsetWidth; // Forces reflow (restarts animation)
		noMoneyText.style.animation = "noMoneyText 1s linear forwards";
	}
}

// 💰 Buy or Activate a Snus Brand
function buyOrActivateBrand(id) {
	const brand = snusBrands.find((b) => b.id === id);

	if (!brand.owned) {
		// Buy the brand
		if (currency >= brand.price) {
			currency -= brand.price;
			brand.owned = true;
			saveGameState();
			updateBrandUI();
		} else {
			console.log("❌ Not enough Snus to buy this brand!");
			// 🌟 No money Text Animation
			const noMoneyText = document.getElementById("no-money-text-brand");
			noMoneyText.style.animation = "none";
			noMoneyText.style.animation = "noMoneyText 1s linear forwards";
		}
	} else {
		// Activate the brand
		activeBrand = id;
		saveGameState();
		updateBrandUI();
		updateActiveBrand();
	}
}

// 🔄 Update Brand UI (One Button for Buy/Activate)
function updateBrandUI() {
	snusBrands.forEach((brand) => {
		const brandItem = document.getElementById(`brand-${brand.id}`);
		const button = brandItem.querySelector("button");

		if (brand.owned) {
			if (activeBrand === brand.id) {
				button.textContent = "Active";
				button.disabled = true;
				button.style.background = "#555"; // Grey out when active
				button.style.color = "#ccc"; // Change text color for clarity
			} else {
				button.textContent = "Activate";
				button.disabled = false;
				button.style.background = "#fff"; // Normal button color
				button.style.color = "#000";
			}
		} else {
			button.textContent = `Buy (${formatNumber(brand.price)} Snus)`;
		}
	});
}

// 🎯 Update Snus Image on Activation
function updateActiveBrand() {
	const active = snusBrands.find((b) => b.id === activeBrand);
	if (active) {
		document.getElementById("snus-image").src = active.image;
	}
}

setInterval(() => {
	const sps = autoClickRate + clickcount * snusPerClick;
	document.getElementById("sps-display").textContent = `${formatNumber(sps)}`;

	clickcount = 0;

	if (autoClickRate > 0) {
		currency += autoClickRate;
		updateDisplay();

		let amount =
			autoClickRate > 5000
				? 50
				: autoClickRate > 500
				? 20
				: autoClickRate > 10
				? 10
				: autoClickRate;
		spawnSnus(amount);
		saveGameState(); // Save game state after update
	}
}, 1000);
