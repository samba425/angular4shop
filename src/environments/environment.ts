// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyDm3A6mG4YUrQ64oLceuSr8xct9jF1MM_Y",
    authDomain: "angular4shop.firebaseapp.com",
    databaseURL: "https://angular4shop.firebaseio.com",
    projectId: "angular4shop",
    storageBucket: "angular4shop.appspot.com",
    messagingSenderId: "418424183660"
  }
};
