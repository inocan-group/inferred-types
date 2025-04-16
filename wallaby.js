module.exports = function () {
    return {
      autoDetect: true,

      workers: {
        initial: 6,
        regular: 2
      },

      restart: false
    };
  };
