# findstock.today

Help me find local stock.

### Run locally

```bash
npm install
npm start
```

+ NB. You will need .env locally to connect to mongoDB and other services.
+ Netlify lambdas are run locally on port 9000.


### Working with components in isolation during development

+ We use storybook to manually develop / test components in isolation. 

```
npm install
npm run storybook
```

+ N.B. See stories/*.stories.js for examples.