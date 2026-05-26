---
layout: layouts/page.njk
title: Contact Us
description: "Contact Serenity Massage LLC in North Olmsted, OH. Call 440-471-9029 or visit us at 28970 Lorain Rd, Suite 100."
---

<div class="contact-grid">
  <div class="contact-info-card">
    <h3>Get in Touch</h3>
    <p><strong>Phone:</strong> <a href="{{ site.phoneHref }}">{{ site.phone }}</a></p>
    <p><strong>Address:</strong> {{ site.address }}</p>
    <p><a href="{{ site.bookingUrl }}" class="btn btn-primary" target="_blank" rel="noopener" style="margin-top: 1rem;">Book Online</a></p>
    <p style="margin-top: 1rem; color: var(--color-text-muted); font-size: 0.9rem;">Located within a hot stone's throw of Westlake! We welcome inquiries about sports massage for events, corporate chair massage services, or general appointments.</p>
  </div>

  <div class="contact-info-card">
    <h3>Hours of Operation</h3>
    <ul class="hours-list">
      {%- for h in site.hours %}
        <li>
          <span>{{ h.day }}</span>
          <span{% if h.time == "Closed" %} class="closed"{% endif %}>{{ h.time }}</span>
        </li>
      {%- endfor %}
    </ul>
  </div>
</div>

<div class="contact-form">
  <h2>Send Us a Message</h2>
  <form>
    <div class="form-row">
      <div class="form-group">
        <label for="first-name">First Name</label>
        <input type="text" id="first-name" name="first-name" required>
      </div>
      <div class="form-group">
        <label for="last-name">Last Name</label>
        <input type="text" id="last-name" name="last-name" required>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
    </div>
    <div class="form-group">
      <label for="comments">Comments</label>
      <textarea id="comments" name="comments" rows="5"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Send Message</button>
  </form>
</div>

<div class="map-container">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.5!2d-81.923!3d41.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjg5NzAgTG9yYWluIFJkIE5vcnRoIE9sbXN0ZWQgT0g!5e0!3m2!1sen!2sus"
    title="Serenity Massage location map"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade">
  </iframe>
</div>
