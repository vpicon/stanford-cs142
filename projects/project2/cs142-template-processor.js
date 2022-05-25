"use strict";


// Constructor function of the Cs142templateProcessor class.
function Cs142TemplateProcessor(template) {
        this._template = template;
}

Cs142TemplateProcessor.prototype = {
    // Fills in the template of this CS142TemplateProcessor object,
    // with the given dictionary object.
    fillIn: function(dictionary) {
        let filledStr = '';
        
        // Parse string to find properties
        for (let i = 0; i < this._template.length; i++) {
            let c = this._template[i];
            if (c !== '{') {
                filledStr += c;
            } else {
                i += 2; // Skip {{
                let property = ''; 
                // Parse property between brackets: {{property}}
                while (i < this._template.length && this._template[i] !== '}') {
                    property += this._template[i++];
                }

                // Reached }}, position at last }
                i++;

                // Get property value from dictionary
                if (dictionary[property]) {
                    filledStr += dictionary[property];
                }
            }
        }

        // Return _templeate string filled with properties
        return filledStr;
    }
};

