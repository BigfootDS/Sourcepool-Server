# Controller Base Code

This should be a nice starting point for any controllers in the Sourcepool Server code.

## Code

This code should be used in a file representing the controller of one (1) model.

```js
const router = require('express').Router();

// Get all objects of this model.
router.get("/all", async (request, response) => {

});

// Get one object.
// If no key is provided, or if a key is provided without a value, this returns nothing.
router.get("/one/:key/:value", async (request, response) => {

});

// Create new object.
// Expects object data to be on the request body.
router.post("/one", async (request, response) => {

});

// Edit whole object and return whole object.
// Expects object data to be on the request body.
router.put("/one", async (request, response) => {

});

// Delete an object and return a success/fail result of the delet operation.
router.delete("/one", async (request, response) => {

});

module.exports = router;
```

Things like middleware and specific models must be implemented yourself.

The mounting or using of the router in the server must also be implemented yourself.

## Example Usage

The file name should be `{CollectionName}Controller.js`. For example, the Ability model has a collection name of `Abilities`, so the file name for its controller should be `AbilitiesController.js`.

You can find a model's collection name within its model file.

Models that inherit from `EmbeddedDocument` do not need controllers, as they cannot exist outside of a regular `Document`-based Model.

Here's what a developed `AbilitiesController.js` looks like, based on the above starter code:

```js


```
