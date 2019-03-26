# MERCEDES-BENZ.IO SINFO CHALLENGE

This is the 3rd place solution in the Mercedes-Benz.io Challenge launched at SINFO 2019.

## Assumptions

1. Asssumed an article can have either a CTA button or an Image, and never both at the same time (as no design was specified fot this case);
2. Assumed "Section Title" is a mandatory field for creating an article (to be able display it on the navigation menus)
3. Assumed that if the image/cta checkbox are selected, imageURL/CTAText are mandatory
4. Assumed that an error message is shown on the form if mandatory fields are not filled

## Some technical details

1. To avoid using Document.createElement, a basic template system is at use. This means that I have templated in an hidden element all the elements that can be generated (articles and navigation entries). These elements are then cloned using Document.cloneNode(), which a quick and dirty search suggests to be faster (https://github.com/sophiebits/innerhtml-vs-createelement-vs-clonenode)
2. All the animations are powered by CSS, using transition.
3. FormData is not used to get the form information to allow the proposal to be compatible with IE.
4. Tested on Chrome 72 and Edge.
5. Used Normalize.css to make rendering more consistent (https://github.com/necolas/normalize.css)

Thank you for your time!
