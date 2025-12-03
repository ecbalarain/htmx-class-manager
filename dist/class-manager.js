/**
 * HTMX Class Manager Extension v1.0.0
 * https://github.com/ecbalarain/htmx-class-manager
 * 
 * Copyright (c) 2025
 * Licensed under MIT
 * 
 * Dynamically add or remove CSS classes from elements based on HTMX responses
 */

(function() {
    'use strict';

    htmx.defineExtension('class-manager', {
        /**
         * Initialize the extension
         */
        init: function(api) {
            this.api = api;
            this.debug = false; // Set to true for detailed console logging
        },

        /**
         * Handle HTMX events
         */
        onEvent: function(name, evt) {
            // Capture and process server response
            if (name === 'htmx:beforeSwap') {
                const xhr = evt.detail.xhr;
                if (xhr && xhr.responseText) {
                    if (this.debug) {
                        console.log('%c📦 HTMX Class Manager - Received:', 'color: #667eea; font-weight: bold;');
                        console.log(xhr.responseText.trim());
                    }
                    this.processResponseText(xhr.responseText);
                }
            }
            
            // Process after content is swapped in
            if (name === 'htmx:afterSwap') {
                this.processClassDirectives(evt.detail.target);
            }
            
            // Also process on initial load
            if (name === 'htmx:load') {
                this.processClassDirectives(evt.detail.elt);
            }
            
            return true;
        },

        /**
         * Process directives from response text
         */
        processResponseText: function(responseText) {
            if (!responseText) return;
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = responseText;
            
            const elementsToProcess = tempDiv.querySelectorAll('[class-add], [class-remove]');
            
            if (tempDiv.hasAttribute('class-add') || tempDiv.hasAttribute('class-remove')) {
                this.processElement(tempDiv);
            }
            
            elementsToProcess.forEach(el => this.processElement(el));
        },

        /**
         * Process class-add and class-remove attributes
         */
        processClassDirectives: function(element) {
            if (!element) return;

            const elementsToProcess = element.querySelectorAll('[class-add], [class-remove]');
            
            if (element.hasAttribute && (element.hasAttribute('class-add') || element.hasAttribute('class-remove'))) {
                this.processElement(element);
            }

            elementsToProcess.forEach(el => this.processElement(el));
        },

        /**
         * Process a single element's class directives
         */
        processElement: function(element) {
            // Process class-remove FIRST, then class-add
            const classRemove = element.getAttribute('class-remove');
            if (classRemove) {
                this.applyClassDirective(classRemove, false);
                element.removeAttribute('class-remove');
            }

            const classAdd = element.getAttribute('class-add');
            if (classAdd) {
                this.applyClassDirective(classAdd, true);
                element.removeAttribute('class-add');
            }
        },

        /**
         * Apply class directive (add or remove)
         */
        applyClassDirective: function(directive, shouldAdd) {
            if (!directive || typeof directive !== 'string') return;

            const targets = directive.split('|').map(t => t.trim()).filter(t => t);

            targets.forEach(target => {
                const lastColonIndex = target.lastIndexOf(':');
                if (lastColonIndex === -1) {
                    if (this.debug) {
                        console.warn('Invalid class directive format:', target);
                    }
                    return;
                }

                const selector = target.substring(0, lastColonIndex).trim();
                const classesStr = target.substring(lastColonIndex + 1).trim();
                
                if (!selector || !classesStr) {
                    if (this.debug) {
                        console.warn('Empty selector or classes in directive:', target);
                    }
                    return;
                }

                const classes = classesStr.split(',').map(c => c.trim()).filter(c => c);

                try {
                    const elements = document.querySelectorAll(selector);
                    
                    if (elements.length === 0) {
                        if (this.debug) {
                            console.warn('No elements found for selector:', selector);
                        }
                        return;
                    }

                    elements.forEach(el => {
                        classes.forEach(className => {
                            if (shouldAdd) {
                                el.classList.add(className);
                            } else {
                                el.classList.remove(className);
                            }
                        });
                    });

                    if (this.debug) {
                        console.log(
                            `${shouldAdd ? 'Added' : 'Removed'} classes [${classes.join(', ')}] ` +
                            `${shouldAdd ? 'to' : 'from'} ${elements.length} element(s) matching "${selector}"`
                        );
                    }
                } catch (e) {
                    if (this.debug) {
                        console.error('Invalid CSS selector:', selector, e);
                    }
                }
            });
        }
    });
})();
