/**
 * @fileoverview Modal controller — handles opening, populating, and closing the detail modal.
 */

import { getGenreNames, getSeasonsFor, formatDate, calendarIcon } from './utils.js';

/**
 * Controls the podcast detail modal.
 * Follows the Single Responsibility Principle: only manages modal UI state.
 */
export class Modal {
  /**
   * @param {HTMLElement} overlay - The full-screen backdrop element
   * @param {HTMLElement} modal   - The modal dialog element
   */
  constructor(overlay, modal) {
    this.overlay = overlay;
    this.modal = modal;
    this._bindClose();
  }

  /** Bind close triggers: button, backdrop click, Escape key. */
  _bindClose() {
    document.getElementById('modal-close').addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', e => { if (e.target === this.overlay) this.close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') this.close(); });
  }

  /**
   * Populate and open the modal for the given podcast.
   * @param {Object} podcast - Podcast data object
   */
  open(podcast) {
    const names      = getGenreNames(podcast.genres);
    const seasonList = getSeasonsFor(podcast.id);

    document.getElementById('modal-title').textContent       = podcast.title;
    const img = document.getElementById('modal-image');
    img.src = podcast.image;
    img.alt = `${podcast.title} cover`;
    document.getElementById('modal-description').textContent = podcast.description;
    document.getElementById('modal-genres').innerHTML        = names.map(n => `<span class="tag">${n}</span>`).join('');
    document.getElementById('modal-updated').innerHTML       = `${calendarIcon()} ${formatDate(podcast.updated)}`;
    document.getElementById('modal-seasons-list').innerHTML  = seasonList.map(s => `
      <div class="season-item">
        <span class="season-name">${s.title}</span>
        <span class="season-episodes">${s.episodes} episode${s.episodes !== 1 ? 's' : ''}</span>
      </div>`).join('');

    this.overlay.classList.add('active');
    this.modal.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    document.getElementById('modal-close').focus();
  }

  /** Close the modal and restore page scroll. */
  close() {
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}
