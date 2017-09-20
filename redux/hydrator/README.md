# Hydrator Documentation
The purpose of the Hydrator is to fill state based on a hash. i.e. When given a hash, the Hydrator will populate redux store to an appropriate value. This is done by gathering a list of actions and dispatching them.

## Accessing Hydrator from a Lightning Component Bundle
Hydrator is loaded in as a static resource. Example usage:
`askAstro.astroHydrator.getWildCards(hash)`
This should only really be used in the askAstro_Store component in the `afterStoreScriptLoaded` controller method.

## Available Methods

* `getWildCards(hash)` - Returns a list of wildCards in the URL string. ex: `['term']`. Useful for things like grabbing query terms off of the hash.
  * `hash` - Required argument, type `string`

* `getRunList(hash)` - Returns a list of action references that need to be dispatched to hydrate to a particular state. Useful for telling whether or not there are actions to be dispatched.
  * `hash` - Required argument, type `string`

* `dispatchRunList(hash)` - Dispatches the actions needed to hydrate a store to a particular state that is appropriate for the given hash.
  * `hash` - Required argument, type `string`
