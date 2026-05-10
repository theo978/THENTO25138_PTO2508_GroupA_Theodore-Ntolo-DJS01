/**
 * @fileoverview Main PodcastApp controller — orchestrates rendering, filtering, and sorting.
 */

import { podcasts, genres } from './data.js';
import { Modal }            from './modal.js';
import { getGenreNames, formatDate, calendarIcon } from './utils.js';

/**
 * Main application class following OOP and SOLID design principles.
 * - Single Responsibility: delegates modal logic to Modal class.
 * - Open/Closed: new sort strategies can be added to SORTERS without changing render().
 * - Dependency Inversion: receives DOM references via constructor.
 */
export class PodcastApp {
  /**
   * @param {HTMLElement} grid    - The podcast grid container
   * @param {HTMLElement} overlay - The modal overlay element
   * @param {HTMLElement} modal   - The modal dialog element
   */
  constructor(grid, overlay, modal) {
    this.grid       = grid;
    this.modal      = new Modal(overlay, modal);
    this.activeGenre = 'all';
    this.activeSort  = 'recently_updated';
  }

  /** Sort strategy map — easily extensible without modifying render logic. */
  static SORTERS = {
    recently_updated: (a, b) => new Date(b.updated) - new Date(a.updated),
    most_popular:     (a, b) => b.seasons - a.seasons,
    newest:           (a, b) => new Date(b.updated) - new Date(a.updated),
  };

  /** Bootstrap the application. */
  init() {
    this._populateGenreSelect();
    this._bindEvents();
    this.render();
  }

  /** Populate the genre <select> from the genres data array. */
  _populateGenreSelect() {
    const select = document.getElementById('genre-select');
    genres.forEach(g => {
      const opt = document.createElement('option');
      opt.value       = g.id;
      opt.textContent = g.title;
      select.appendChild(opt);
    });
  }

  /** Bind filter, sort, and card-click event listeners. */
  _bindEvents() {
    document.getElementById('genre-select').addEventListener('change', e => {
      this.activeGenre = e.target.value;
      this.render();
    });
    document.getElementById('sort-select').addEventListener('change', e => {
      this.activeSort = e.target.value;
      this.render();
    });
    // Event delegation: one listener handles all card clicks
    this.grid.addEventListener('click', e => {
      const card = e.target.closest('[data-id]');
      if (card) this._openPodcast(card.dataset.id);
    });
  }

  /**
   * Filter podcasts by the active genre selection.
   * @returns {Object[]}
   */
  _filterPodcasts() {
    if (this.activeGenre === 'all') return [...podcasts];
    return podcasts.filter(p => p.genres.includes(Number(this.activeGenre)));
  }

  /**
   * Sort a podcast list using the active sort strategy.
   * @param {Object[]} list
   * @returns {Object[]}
   */
  _sortPodcasts(list) {
    const sorter = PodcastApp.SORTERS[this.activeSort] ?? PodcastApp.SORTERS.recently_updated;
    return list.slice().sort(sorter);
  }

  /**
   * Build and return a card DOM element for a podcast.
   * @param {Object} podcast
   * @returns {HTMLElement}
   */
  _createCard(podcast) {
    const names   = getGenreNames(podcast.genres);
    const article = document.createElement('article');
    article.className = 'card';
    article.dataset.id = podcast.id;
    article.setAttribute('role', 'listitem');
    article.setAttribute('tabindex', '0');
    article.setAttribute('aria-label', `${podcast.title}, ${podcast.seasons} seasons`);
    article.innerHTML = `
      <img class="card-image" src="${podcast.image}" alt="${podcast.title} cover" loading="lazy">
      <div class="card-body">
        <h2 class="card-title">${podcast.title}</h2>
        <div class="card-seasons">
          ${calendarIcon()}
          ${podcast.seasons} season${podcast.seasons !== 1 ? 's' : ''}
        </div>
        <div class="tags">${names.map(n => `<span class="tag">${n}</span>`).join('')}</div>
        <p class="card-updated">${formatDate(podcast.updated)}</p>
      </div>`;
    // Keyboard accessibility
    article.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._openPodcast(podcast.id); }
    });
    return article;
  }

  /**
   * Find a podcast by ID and open its modal.
   * @param {string} id
   */
  _openPodcast(id) {
    const podcast = podcasts.find(p => p.id === id);
    if (podcast) this.modal.open(podcast);
  }

  /** Re-render the grid based on current filter and sort state. */
  render() {
    const list = this._sortPodcasts(this._filterPodcasts());
    this.grid.innerHTML = '';

    if (list.length === 0) {
      this.grid.innerHTML = `
        <div class="empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h3>No podcasts found</h3>
          <p>Try adjusting your filters</p>
        </div>`;
      return;
    }

    const frag = document.createDocumentFragment();
    list.forEach(p => frag.appendChild(this._createCard(p)));
    this.grid.appendChild(frag);
  }
}
