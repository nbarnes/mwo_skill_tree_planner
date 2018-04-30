
export const PubSub = (function() {

  const subscriptionTopics = {};

  function publish(topic, data) {
    console.log(`publish topic ${topic}`);
    if (subscriptionTopics[topic] == undefined) return;
    for (let subscription_callback of subscriptionTopics[topic]) {
      subscription_callback(data);
    }
  }

  function subscribe(topic, callback) {
    console.log(`subscribe topic ${topic}`);
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
