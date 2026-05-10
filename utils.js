/**
 * @fileoverview Pure utility functions for formatting and data lookup.
 */

import { genres, seasons } from './data.js';

/**
 * Formats an ISO date string into a human-readable relative or absolute label.
 * @param {string} isoString - ISO 8601 date string
 * @returns {string} Human-readable date description
 */
export function formatDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Updated today';
  if (diffDays === 1) return 'Updated yesterday';
  if (diffDays < 7)  return `Updated ${diffDays} days ago`;
  if (diffDays < 14) return 'Updated 1 week ago';
  if (diffDays < 30) return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
  return `Last updated: ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

/**
 * Returns the genre title strings for an array of genre IDs.
 * @param {number[]} genreIds - Array of genre ID numbers
 * @returns {string[]} Corresponding genre title strings
 */
export function getGenreNames(genreIds) {
  return genreIds
    .map(id => genres.find(g => g.id === id)?.title)
    .filter(Boolean);
}

/**
 * Returns the season details array for a given podcast ID.
 * @param {string} podcastId - The podcast's unique ID
 * @returns {Array<{title:string, episodes:number}>}
 */
export function getSeasonsFor(podcastId) {
  return seasons.find(s => s.id === podcastId)?.seasonDetails ?? [];
}

/**
 * Builds an SVG calendar icon string (inline, for HTML injection).
 * @param {number} [size=13]
 * @returns {string} SVG markup string
 */
export function calendarIcon(size = 13) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>`;
}
