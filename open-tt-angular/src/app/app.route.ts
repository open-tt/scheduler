import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TtAdmissionsComponent } from './tt-admissions/tt-admissions.component';
import { TtOrgComponent } from './tt-org/tt-org.component';
import { TtUserMembershipComponent } from './tt-user-membership/tt-user-membership.component';
import { TtActiveMembershipsComponent } from './tt-active-memberships/tt-active-memberships.component';
import { TtUserRegistrationComponent } from './single-use-components/tt-user-registration/tt-user-registration.component';
import { TtHomeComponent } from './tt-home/tt-home.component';
import { TtHandicapComponent } from './tt-handicap/tt-handicap.component';
import { TTRoute } from './routing.constants';
import { TtReservationsComponent } from './tt-reservations/tt-reservations.component';

const routes: Routes = [
  { path: TTRoute.ROOT, redirectTo: TTRoute.HOME, pathMatch: 'full' },
  { path: TTRoute.HOME, component: TtHomeComponent },
  { path: TTRoute.TOURNAMENT_HANDICAP, component: TtHandicapComponent },
  { path: TTRoute.RESERVATIONS, component: TtReservationsComponent },
  { path: TTRoute.ORG, component: TtOrgComponent },
  { path: TTRoute.REGISTRATIONS, component: TtUserRegistrationComponent },
  { path: TTRoute.ADMISSIONS, component: TtAdmissionsComponent },
  { path: TTRoute.MEMBERSHIP, component: TtUserMembershipComponent },
  { path: TTRoute.MEMBERSHIPS_ACTIVE, component: TtActiveMembershipsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouters {}
