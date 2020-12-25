### TODO
* Convert all long Service calls to Observables

### TODO P2
* Disallow creating multiple tournaments same day

### DONE
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

# API Documentation
 #### Create New Handicap Tournament

    Request
       
        POST /tournaments 

    Response

        {
            id: number,
            date: Date,
            players: [],
            groups: [],
            waitingList: [],
            stage: "REGISTRATION",
            playoff: null,
        }
        
 #### Create Player
    
    Request
    
        POST /users -d {
            name: string,
            rating: number,
            userID?: string,
            USATTID?: string,
        }
        
    Response
    
         {
            id: number,
            name: string,
            rating: number,
            userID?: string,
            USATTID?: string,
         }
         
 #### Add Player to Tournament
    
    Request
        
        POST /tournaments/{id}/players -d {
            playerId: number
        }
        
    Response
    
         tournament = {
             id: number,
             date: Date,
             players: [
                {
                    id: number,
                    name: string,
                    rating: number,
                    userID?: string,
                    USATTID?: string,
                }
             ],
             groups: [],
             waitingList: [],
             stage: "REGISTRATION",
             playoff: null,
         }
 
 #### Remove Player from Tournament
     
     Request
         
         DELETE /tournaments/{id}/players -d {
             playerId: number
         }
         
     Response
     
          tournament = {
              id: number,
              date: Date,
              players: [
                 {
                     id: number,
                     name: string,
                     rating: number,
                     userID?: string,
                     USATTID?: string,
                 }
              ],
              groups: [],
              waitingList: [],
              stage: "REGISTRATION",
              playoff: null,
          }

 #### Create Groups for Tournament
    
    Request
    
        POST /tournaments/{id}/groups
        
    Response
    
         {
              id: number,
              date: Date,
              players: [
                 ...
              ],
              groups: [
                {
                  players: [
                    {
                        id: number,
                        name: string,
                        rating: number,
                        userID?: string,
                        USATTID?: string,
                    }
                  ]
                }
              ],
              waitingList: [],
              stage: "REGISTRATION",
              playoff: null,
          }
          
 #### Create Playoffs for Tournament
  
    Request
  
       POST /tournaments/{id}/playoffs
      
    Response
  
       {
            id: number,
            date: Date,
            players: [
              ...
            ],
            groups: [
              ...
            ],
            waitingList: [],
            stage: "REGISTRATION",
            playoff: NgttTournament = {
                rounds: NgttRound[] = [
                    type: 'Winnerbracket',
                    matches: NgttMatch = [
                        {
                            player1: 'Lester Hartmann',
                            player2: 'Sarah Botsford',
                        }
                    ]
                ]
            },
       }
 
 #### Delete Tournament
   
     Request
   
        DELETE /tournaments/{id}
    
     Response
        
        204
        
 #### Update Group
    
    Request
        
        PUT /tournaments/{id}/groups -d {
            groups = {
              players: [
                {
                    id: number,
                    name: string,
                    rating: number,
                    userID?: string,
                    USATTID?: string,
                }
              ]
            }              
        }
        
    Response
    
        FULL TOURNAMENT
    

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
