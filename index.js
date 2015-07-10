"use strict";

const _ = require('lodash');

module.exports = exports = function(config) {
  return new ACL(config);
};

class ACL {
  constructor(config) {
    this.NAMES = {};
    this.LEVELS = {};
    this.reverseLevels = {};
    this.config = {};

    this.loadConfig(config)
  }

  /**
   * Load the Library
   *
   * @param {string|object} config
   */
  loadConfig(config) {
    this.config = getConfig(config);

    // Map the Config
    _.each(this.config, function(details, key) {
      this.NAMES[key] = details.name;
      this.LEVELS[key] = details.value;
    }, this);

    // Reverse Map the Levels
    _.each(this.LEVELS, function(val, key) {
      this.reverseLevels[val] = key;
    }, this);

    // Create Convenience Functions
    _.each(this.LEVELS, function(val, key) {
      let _key = key.charAt(0).toUpperCase() + key.slice(1);

      this['eq'+_key] = function(level) {
        this.assertValidLevel(level);
        return level == val;
      };

      this['is'+_key] = function(level) {
        this.assertValidLevel(level);
        return level >= val;
      };
    }, this);
  }

  /**
   * Get Levels available to user level
   *
   * @param levelYouHave
   * @returns {Array}
   */
  getLevelsAvailable(levelYouHave) {
    let levels = [];
    _.each(this.config, function(details) {
      if (details.value <= levelYouHave) {
        levels.push({
          name: details.name,
          value: details.value
        });
      }
    });

    return levels;
  }

  /**
   * Get Level details from ID
   *
   * @param level
   * @returns {*}
   */
  getLevelDetailsById(level) {
    return this.LEVELS[reverseLevels[level]];
  }


  /**
   * Check if the user level is at least a certain level
   *
   * @param {int} levelYouHave
   * @param {int} levelYouWant
   *
   * @returns {boolean}
   */
  isAtLeast(levelYouHave, levelYouWant) {
    return levelYouHave >= levelYouWant;
  }


  /**
   * Assert that the Level is valid
   *
   * @param {int} level
   */
  assertValidLevel(level) {
    if (!this.reverseLevels[level]) {
      throw new Error(`ACL Level id=${level} is not valid`);
    }
  }
}

////////////////////////////////////
//////// Private Methods ///////////
///////////////////////////////////

function getConfig(config) {
  if (typeof config === 'object') {
    return config;
  }

  if (typeof config === 'string') {
    return require(config);
  }
}