# cypress-e2e-testing

Clone repo using: `git clone https://github.com/adysurfer/shortlinks.git`

## Pre-requisites

1. Node JS

## Install the project

Install project dependencies with: `npm install`

## Run Tests:

1. Standard Execution(headless): npm run cypress:test:execution
2. Open Browser execution(headed): npm run cypress:runner
3. Standard tags based execution(headed): npm run cypress:test:smoke
4. Skip Tagged tests(unTagged)(headed): npm run cypress:test:unTagged
5. Report(mochawesome):

   - Run cypress with `npm run cypress:test:smoke`
   - Access the generated mochawesome report `index.html` from report folder
  
