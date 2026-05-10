/**
 * @fileoverview Application entry point — bootstraps PodcastApp on DOMContentLoaded.
 */

import { PodcastApp } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = new PodcastApp(
    document.getElementById('podcast-grid'),
    document.getElementById('modal-overlay'),
    document.getElementById('modal'),
  );
  app.init();
});
