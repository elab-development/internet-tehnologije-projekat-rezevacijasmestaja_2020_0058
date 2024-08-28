module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)",
      "/node_modules/(?!react-leaflet|@react-leaflet|leaflet|other-package).+\\.js$",
      '/node_modules/(?!react-leaflet|other-module-to-transform).+\\.js$',
      '/node_modules/(?!react-leaflet).+\\.js$'
    ],
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy",
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
    },
    testEnvironment: "jsdom",
  };
  