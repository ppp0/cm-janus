function Transactions() {
  this.list = {};
}

/**
 * @param {String} id
 * @param {Function} transaction
 */
Transactions.prototype.add = function(id, transaction) {
  this.list[id] = transaction;

};

/**
 * @param {String} id
 * @returns {Function}
 */
Transactions.prototype.find = function(id) {
  return this.list[id];
};

/**
 * @param {String} id
 * @param {Object} message
 */
Transactions.prototype.execute = function(id, message) {
  if ('ack' !== message['janus']) {
    var transaction = this.find(id);
    if (transaction) {
      transaction.call(null, message);
      this.remove(id);
    }
  }
};

/**
 * @param {Function} id
 */
Transactions.prototype.remove = function(id) {
  delete this.list[id];
};

module.exports = Transactions;
