
export const PubSub = (function() {

  const subscriptionTopics = {};

  function publish(topic, data) {
    if (subscriptionTopics[topic] == undefined) return;
    for (let subscription_callback of subscriptionTopics[topic]) {
      subscription_callback(data);
    }
  }

  function subscribe(topic, callback) {
    if (subscriptionTopics[topic] == undefined) {
      subscriptionTopics[topic] = [];
    }
    let index = subscriptionTopics[topic].push(callback) - 1;
    return {
      remove: function() {
        subscriptionTopics[topic][index] = undefined;
      }
    }
  }

  return {
    publish: publish,
    subscribe: subscribe
  }

})();
