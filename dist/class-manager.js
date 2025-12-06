/**
 * HTMX Class Manager Extension v1.1.0
 * https://github.com/ecbalarain/htmx-class-manager
 * 
 * Copyright (c) 2025
 * Licensed under MIT
 * 
 * Dynamically add, remove, or toggle CSS classes from elements based on HTMX responses
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
            this.selectorCache = new Map(); // Performance optimization
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
            
            const elementsToProcess = tempDiv.querySelectorAll('[class-add], [class-remove], [class-toggle]');
            
            if (tempDiv.hasAttribute('class-add') || tempDiv.hasAttribute('class-remove') || tempDiv.hasAttribute('class-toggle')) {
                this.processElement(tempDiv);
            }
            
            elementsToProcess.forEach(el => this.processElement(el));
        },

        /**
         * Process class-add, class-remove, and class-toggle attributes
         */
        processClassDirectives: function(element) {
            if (!element) return;

            const elementsToProcess = element.querySelectorAll('[class-add], [class-remove], [class-toggle]');
            
            if (element.hasAttribute && (element.hasAttribute('class-add') || element.hasAttribute('class-remove') || element.hasAttribute('class-toggle'))) {
                this.processElement(element);
            }

            elementsToProcess.forEach(el => this.processElement(el));
        },

        /**
         * Process a single element's class directives
         */
        processElement: function(element) {
            // Process class-remove FIRST, then class-add, then class-toggle
            const classRemove = element.getAttribute('class-remove');
            if (classRemove) {
                this.applyClassDirective(classRemove, 'remove');
                element.removeAttribute('class-remove');
            }

            const classAdd = element.getAttribute('class-add');
            if (classAdd) {
                this.applyClassDirective(classAdd, 'add');
                element.removeAttribute('class-add');
            }

            const classToggle = element.getAttribute('class-toggle');
            if (classToggle) {
                this.applyClassDirective(classToggle, 'toggle');
                element.removeAttribute('class-toggle');
            }
        },

        /**
         * Apply class directive (add, remove, or toggle)
         */
        applyClassDirective: function(directive, operation) {
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

                // Validate selector before attempting to use it
                if (!this.isValidSelector(selector)) {
                    if (this.debug) {
                        console.error('Invalid CSS selector syntax:', selector);
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
                            this.applyClassOperation(el, className, operation);
                        });
                    });

                    if (this.debug) {
                        const opName = operation === 'add' ? 'Added' : operation === 'remove' ? 'Removed' : 'Toggled';
                        console.log(
                            `${opName} classes [${classes.join(', ')}] ` +
                            `${operation === 'add' ? 'to' : operation === 'remove' ? 'from' : 'on'} ${elements.length} element(s) matching "${selector}"`
                        );
                    }
                } catch (e) {
                    if (this.debug) {
                        console.error('Error applying class directive:', e.message);
                    }
                }
            });
        },

        /**
         * Apply class operation (add, remove, toggle) with wildcard support
         */
        applyClassOperation: function(element, className, operation) {
            // Check for wildcard patterns
            if (className.includes('*')) {
                if (operation === 'remove') {
                    this.removeClassWithWildcard(element, className);
                } else if (this.debug) {
                    console.warn('Wildcard patterns are only supported for class-remove:', className);
                }
                return;
            }

            // Standard operations for exact class names
            switch (operation) {
                case 'add':
                    element.classList.add(className);
                    break;
                case 'remove':
                    element.classList.remove(className);
                    break;
                case 'toggle':
                    element.classList.toggle(className);
                    break;
            }
        },

        /**
         * Remove classes matching wildcard pattern
         */
        removeClassWithWildcard: function(element, pattern) {
            if (pattern.startsWith('*') && pattern.endsWith('*')) {
                // Contains pattern: *-text-*
                const substring = pattern.slice(1, -1);
                Array.from(element.classList).forEach(cls => {
                    if (cls.includes(substring)) {
                        element.classList.remove(cls);
                    }
                });
            } else if (pattern.startsWith('*')) {
                // Ends with pattern: *-disabled
                const suffix = pattern.substring(1);
                Array.from(element.classList).forEach(cls => {
                    if (cls.endsWith(suffix)) {
                        element.classList.remove(cls);
                    }
                });
            } else if (pattern.endsWith('*')) {
                // Starts with pattern: bg-*
                const prefix = pattern.substring(0, pattern.length - 1);
                Array.from(element.classList).forEach(cls => {
                    if (cls.startsWith(prefix)) {
                        element.classList.remove(cls);
                    }
                });
            }
        },

        /**
         * Validate CSS selector syntax
         */
        isValidSelector: function(selector) {
            // Check cache first
            if (this.selectorCache.has(selector)) {
                return this.selectorCache.get(selector);
            }

            try {
                document.createDocumentFragment().querySelector(selector);
                this.selectorCache.set(selector, true);
                return true;
            } catch (e) {
                this.selectorCache.set(selector, false);
                return false;
            }
        }
    });
})();
