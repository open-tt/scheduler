import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouters } from './app.route';
import { GlobalThemeComponent } from './tt-wrapper-theme/global-theme.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TtNavigationButtonComponent } from './component-library/tt-navigation-button/tt-navigation-button.component';
import { TtAdmissionsComponent } from './tt-admissions/tt-admissions.component';
import { TtOrgComponent } from './tt-org/tt-org.component';
import { TtLabeledInfoComponent } from './component-library/tt-labeled-info/tt-labeled-info.component';
import { TtLabeledInfoGroupComponent } from './component-library/tt-labeled-info-group/tt-labeled-info-group.component';
import { TtTabulatedInfoComponent } from './component-library/tt-tabulated-info/tt-tabulated-info.component';
import { TtSimpleButtonComponent } from './component-library/tt-simple-button/tt-simple-button.component';
import { TtLabeledInputTextComponent } from './component-library/tt-labeled-input-text/tt-labeled-input-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TtConfigureNewMembershipComponent } from './single-use-components/tt-configure-new-membership/tt-configure-new-membership.component';
import { TtConfigureNewReservationComponent } from './single-use-components/tt-configure-new-reservation/tt-configure-new-reservation.component';
import { TtActionsTableComponent } from './component-library/tt-actions-table/tt-actions-table.component';
import { TtDisclaimerAndActionComponent } from './component-library/tt-disclaimer-and-action/tt-disclaimer-and-action.component';
import { TtUserMembershipComponent } from './tt-user-membership/tt-user-membership.component';
import { TtInfoCardComponent } from './component-library/tt-info-card/tt-info-card.component';
import { TtActiveMembershipsComponent } from './tt-active-memberships/tt-active-memberships.component';
import { TtActiveMembershipsTableComponent } from './single-use-components/tt-active-memberships-table/tt-active-memberships-table.component';
import { TtLabeledEditComponent } from './component-library/tt-labeled-edit/tt-labeled-edit.component';
import { TtLabeledEditGroupComponent } from './component-library/tt-labeled-edit-group/tt-labeled-edit-group.component';
import { TtUserRegistrationComponent } from './single-use-components/tt-user-registration/tt-user-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TtHomeComponent } from './tt-home/tt-home.component';
import { TtHandicapComponent } from './tt-handicap/tt-handicap.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TtAutocompleteSearchComponent } from './component-library/tt-autocomplete-search/tt-autocomplete-search.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TtPlayerHandicapTableComponent } from './component-library/tt-player-handicap-table/tt-player-handicap-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TtTournamentGroupComponent } from './component-library/tt-tournament-group/tt-tournament-group.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { TtTournamentMatchComponent } from './component-library/tt-tournament-match/tt-tournament-match.component';
import { NgTournamentTreeModule } from 'ng-tournament-tree';
import { CreatePlayerDialogComponent } from './component-library/create-player-dialog/create-player-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TtMatchResultCellComponent } from './component-library/tt-match-result-cell/tt-match-result-cell.component';
import { TtMatchResultDialogComponent } from './component-library/tt-match-result-dialog/tt-match-result-dialog.component';
import { ResponseMappingInterceptor } from './interceptors/response-mapping.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    GlobalThemeComponent,
    TtNavigationButtonComponent,
    TtAdmissionsComponent,
    TtOrgComponent,
    TtLabeledInfoComponent,
    TtLabeledInfoGroupComponent,
    TtTabulatedInfoComponent,
    TtSimpleButtonComponent,
    TtLabeledInputTextComponent,
    TtConfigureNewMembershipComponent,
    TtConfigureNewReservationComponent,
    TtActionsTableComponent,
    TtDisclaimerAndActionComponent,
    TtUserMembershipComponent,
    TtInfoCardComponent,
    TtActiveMembershipsComponent,
    TtActiveMembershipsTableComponent,
    TtLabeledEditComponent,
    TtLabeledEditGroupComponent,
    TtUserRegistrationComponent,
    TtHomeComponent,
    TtHandicapComponent,
    TtAutocompleteSearchComponent,
    TtPlayerHandicapTableComponent,
    TtTournamentGroupComponent,
    TtTournamentMatchComponent,
    CreatePlayerDialogComponent,
    TtMatchResultCellComponent,
    TtMatchResultDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRouters,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    NgTournamentTreeModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseMappingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
