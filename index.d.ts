// TypeScript definitions for htmx-class-manager
// Project: https://github.com/ecbalarain/htmx-class-manager
// Definitions by: htmx-class-manager contributors

declare module 'htmx-class-manager' {
  export interface ClassManagerExtension {
    /**
     * API reference provided by HTMX
     */
    api: any;

    /**
     * Enable debug mode for detailed console logging
     */
    debug: boolean;

    /**
     * Initialize the extension
     */
    init(api: any): void;

    /**
     * Handle HTMX events
     */
    onEvent(name: string, evt: any): boolean;

    /**
     * Process directives from response text
     */
    processResponseText(responseText: string): void;

    /**
     * Process class-add and class-remove attributes on elements
     */
    processClassDirectives(element: Element): void;

    /**
     * Process a single element's class directives
     */
    processElement(element: Element): void;

    /**
     * Apply class directive (add or remove)
     */
    applyClassDirective(directive: string, shouldAdd: boolean): void;
  }
}

declare global {
  interface HTMLElement {
    /**
     * Add classes to elements matching the selector
     * Format: "selector:class1,class2" or "sel1:classes|sel2:classes"
     */
    'class-add'?: string;

    /**
     * Remove classes from elements matching the selector
     * Format: "selector:class1,class2" or "sel1:classes|sel2:classes"
     */
    'class-remove'?: string;
  }
}

export {};
