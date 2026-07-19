/* ==========================================================================
   BOOKING.JS — room booking forms (bar + full page), WhatsApp/email hand-off
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form[data-booking-form]").forEach(initBookingForm);
  initModalClose();

  // Set sensible date minimums (today / tomorrow) on every date field
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.min = today;
    input.addEventListener("change", () => {
      const checkout = input.closest("form")?.querySelector('[name="checkout"]');
      if (input.name === "checkin" && checkout) checkout.min = input.value;
    });
  });
});

function initBookingForm(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    const errors = validateBooking(data);

    clearFormErrors(form);
    if (errors.length) {
      showFormErrors(form, errors);
      return;
    }

    const summary = buildBookingSummary(data);

    // Channel-specific hand-off (no backend yet — see TODO below)
    const action = e.submitter?.dataset.action || "confirm";
    if (action === "whatsapp") {
      const msg = encodeURIComponent(summary);
      window.open(`https://wa.me/${HOTEL_CONFIG.whatsapp}?text=${msg}`, "_blank");
    } else if (action === "email") {
      const subject = encodeURIComponent(`Booking Enquiry — ${HOTEL_CONFIG.name}`);
      const body = encodeURIComponent(summary);
      window.location.href = `mailto:${HOTEL_CONFIG.email}?subject=${subject}&body=${body}`;
    } else if (action === "call") {
      window.location.href = `tel:${HOTEL_CONFIG.phone}`;
    }

    /* TODO (backend): once Firebase is connected, write this booking object
       to Firestore collection "bookings" and trigger a Cloud Function that
       emails/WhatsApps the confirmation automatically instead of doing it
       client-side. Data shape is already flat and ready: { ...data } */

    showConfirmationModal(data);
    form.reset();
  });
}

function validateBooking(data) {
  const errors = [];
  if (!data.name || data.name.trim().length < 2) errors.push("name");
  if (!data.phone || data.phone.replace(/\D/g, "").length < 8) errors.push("phone");
  if (data.checkin && data.checkout && data.checkout < data.checkin) errors.push("checkout");
  if (!data.checkin) errors.push("checkin");
  if (!data.guests) errors.push("guests");
  if (!data.roomType) errors.push("roomType");
  return errors;
}

function clearFormErrors(form) {
  form.querySelectorAll(".field").forEach(f => f.classList.remove("has-error"));
}

function showFormErrors(form, errorNames) {
  errorNames.forEach(name => {
    const field = form.querySelector(`[name="${name}"]`)?.closest(".field");
    if (field) field.classList.add("has-error");
  });
  const firstField = form.querySelector(`[name="${errorNames[0]}"]`);
  firstField?.focus();
}

function buildBookingSummary(data) {
  return [
    `Booking enquiry — ${HOTEL_CONFIG.name}`,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    `Check-in: ${data.checkin}`,
    data.checkout ? `Check-out: ${data.checkout}` : null,
    `Guests: ${data.guests}`,
    `Room type: ${data.roomType}`,
    data.notes ? `Notes: ${data.notes}` : null
  ].filter(Boolean).join("\n");
}

function showConfirmationModal(data) {
  const modal = document.querySelector(".modal-overlay");
  if (!modal) return;
  const nameEl = modal.querySelector("[data-modal-name]");
  if (nameEl) nameEl.textContent = data.name;
  modal.classList.add("active");
}

function initModalClose() {
  const modal = document.querySelector(".modal-overlay");
  if (!modal) return;
  modal.querySelectorAll("[data-modal-close]").forEach(btn => {
    btn.addEventListener("click", () => modal.classList.remove("active"));
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
}
