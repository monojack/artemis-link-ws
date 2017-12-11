import { ApolloLink, } from 'apollo-link'
import { SubscriptionClient, } from 'subscriptions-transport-ws'

function isSubscription ({ definitions = [ { operation: 'query', }, ], } = {}) {
  return definitions[0].operation === 'subscription'
}

export function WebSocketLink ({ uri, }) {
  const subscriptionClient = new SubscriptionClient(uri)

  function handler (operation, forward) {
    if (!isSubscription(operation.query)) return forward(operation)

    return subscriptionClient.request(operation)
  }

  return new ApolloLink(handler)
}
