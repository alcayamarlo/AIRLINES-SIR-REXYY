const pages = {
  home: document.getElementById("homePage"),
  book: document.getElementById("bookPage"),
  flight: document.getElementById("flightPage"),
  passenger: document.getElementById("passengerPage"),
  summary: document.getElementById("summaryPage")
};
const navBtns = document.querySelectorAll(".nav-btn");

function showPage(pageId) {
  Object.values(pages).forEach(p => p.classList.add("hidden"));
  pages[pageId].classList.remove("hidden");

  navBtns.forEach(btn => btn.classList.remove("active"));
  document.getElementById(pageId + "Btn").classList.add("active");
}

navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.id.replace("Btn", "");
    showPage(id);
  });
});

document.getElementById("bookFlight").onclick = function () {
  showPage("book");
};

const flightType = document.getElementById("flightType");
const returnField = document.getElementById("returnField");
flightType.onchange = function () {
  if (flightType.value === "oneway") {
    returnField.style.display = "none";
  } else {
    returnField.style.display = "block";
  }
};

const flightData = [
  { no: "5J560", from: "Manila", to: "Cebu", time: "6:00 AM", price: 3500, seat: 50, type: "round" },
  { no: "PR123", from: "Manila", to: "Davao", time: "9:30 AM", price: 4200, seat: 40, type: "round" },
  { no: "Z2851", from: "Manila", to: "Bacolod", time: "3:45 PM", price: 2800, seat: 35, type: "oneway" }
];

let selectedFlight = null;
let passengerInfo = null;

document.getElementById("searchFlight").onclick = function () {
  showPage("flight");
  const list = document.getElementById("flightList");
  list.innerHTML = "";

  flightData.forEach(f => {
    const div = document.createElement("div");
    div.className = "f-item";
    div.innerHTML = `
      <div class="f-left">
        <div>
          <strong>${f.from} → ${f.to}</strong><br>
          <span class="badge">${f.no}</span>
        </div>
      </div>
      <div>
        <span class="f-time">${f.time}</span><br>
        <span>₱${f.price}</span><br>
        <button class="primary selectFlight">Select</button>
      </div>
    `;
    list.appendChild(div);
  });

  document.querySelectorAll(".selectFlight").forEach((btn, index) => {
    btn.onclick = () => {
      selectedFlight = flightData[index];
      alert("Flight selected!");
      showPage("passenger");
    };
  });
};

document.getElementById("savePassenger").onclick = () => {
  const name = document.getElementById("passengerName").value.trim();
  const email = document.getElementById("passengerEmail").value.trim();
  const contact = document.getElementById("passengerContact").value.trim();

  if (!name || !email || !contact) {
    alert("⚠️ Please fill out all passenger info before proceeding!");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("⚠️ Please enter a valid email address!");
    return;
  }

  if (contact.length < 11 || isNaN(contact)) {
    alert("⚠️ Please enter a valid 11-digit contact number!");
    return;
  }

  passengerInfo = { name, email, contact };

  showPage("summary");

  const summary = document.getElementById("summaryDetails");
  summary.innerHTML = `
    <p><strong>Passenger:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Contact:</strong> ${contact}</p>
    <p><strong>Flight:</strong> ${selectedFlight ? selectedFlight.no + " - " + selectedFlight.from + " to " + selectedFlight.to : "No flight selected"}</p>
  `;
};

document.getElementById("bookNow").onclick = () => {
  if (!passengerInfo || !selectedFlight) {
    alert("⚠️ You cannot book a flight without selecting a flight and entering passenger info!");
    return;
  }

  alert("✅ Booking Successful! Thank you for flying with AirLine ✈️");
  passengerInfo = null;
  selectedFlight = null;
  showPage("home");
};
