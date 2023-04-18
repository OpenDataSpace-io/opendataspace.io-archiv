"use strict";
// Initialize the editor with a JSON schema
//@ts-ignore
var editor = new JSONEditor(document.getElementById('editor_holder'), {
    schema: {
        type: "object",
        title: "Restaurant",
        properties: {
            name: {
                type: "string",
                minLength: 1,
                title: "Name",
            },
            make: {
                type: "string",
                enum: [
                    "Toyota",
                    "BMW",
                    "Honda",
                    "Ford",
                    "Chevy",
                    "VW"
                ]
            },
            model: {
                type: "string"
            },
            year: {
                type: "integer",
                enum: [
                    1995, 1996, 1997, 1998, 1999,
                    2000, 2001, 2002, 2003, 2004,
                    2005, 2006, 2007, 2008, 2009,
                    2010, 2011, 2012, 2013, 2014
                ],
                default: 2008
            },
            safety: {
                type: "integer",
                format: "rating",
                maximum: "5",
                exclusiveMaximum: false,
                readonly: false
            }
        }
    }
});
// Hook up the submit button to log to the console
//@ts-ignore
document.getElementById('submit').addEventListener('click', function () {
    console.log("Submit button clicked");
    let uuid = self.crypto.randomUUID();
    console.log(uuid); 
    // Get the value from the editor
    console.log(editor.getValue());
});
