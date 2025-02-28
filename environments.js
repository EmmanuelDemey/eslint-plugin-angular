'use strict';

module.exports = {
    angular: {
        languageOptions: {
            globals: {
                angular: true
            }
        }
    },
    // https://docs.angularjs.org/api/ngMock
    mocks: {
        languageOptions: {
            globals: {
                angular: true,
                inject: true,
                module: true
            }
        }
    },
    // http://www.protractortest.org/#/api
    protractor: {
        languageOptions: {
            globals: {
                element: true,
                $: true,
                $$: true,
                browser: true,
                by: true,
                protractor: true
            }
        }
    }
};
