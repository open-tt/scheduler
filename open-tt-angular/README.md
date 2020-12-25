### TODO
* ~~Add functionality for "Create Groups" and "Create Playoffs" buttons~~
* ~~Dedupe players added to registration~~
* ~~Remove players from registration~~
* ~~Calculate handicap for newly created players~~
* ~~Reverse dropdown order~~
* ~~Highlight New Tournament in dropdown~~
* ~~Allow Edit Scores in Groups~~
* ~~Reverse Player - Alias in group tables~~
* ~~Disable Playoffs properly~~
* ~~Add player to tournament inprogress~~
* ~~Mark players in the waiting list~~
* ~~Score should update both cells~~
* ~~Highlight Groups that have finished~~
* ~~Add Delete for tournament that hasn't started~~ 
* ~~Fix Player Registration error on Cancel~~

### TODO P2
* Disallow creating multiple tournaments same day

### How to add a nav link to left nav bar
- Create new page level component `ng generate component single-use-components/YOUR-NEW-COMPONENT`
- Add new route to component at `app.routes.ts`
- Add a new `<app-tt-navigation-button>` to `global-theme.component.html` with title and href 

### Installed packages
1. `npm i -s @angular/flex-layout @angular/cdk`
2. `npm install bootstrap`
3. `ng add @angular/material` : Self setup. No manual work.

### Usefull Docs
1. [FlexLayout API docs][1]
2. [FlexLyout Demos][2]
3. [How to use Angular Material theme colors manually][3]
    - Files need to be scss
    - Create theme file
    - Swap style in angular.json from styles.scss (or styles.scss) to theme.scss

[1]: https://github.com/angular/flex-layout/wiki/Declarative-API-Overview
[2]: https://tburleson-layouts-demos.firebaseapp.com/#/docs
[3]: https://stackoverflow.com/a/46760925/4379762
