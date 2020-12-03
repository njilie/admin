import { Component, OnInit } from '@angular/core';
import { ConstraintIN } from '../shared/interfaces/constraint';
import { ConstraintService } from '../shared/services/constraint.service';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private constraintService: ConstraintService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  jetLag(): Date {
    // 1000 ms = 1sec
    // * 60 = 1min
    // * 60 = 1h
    // * 9 = 9h
    // Décalage horaire de 9h comme ca la cantinière a jusqu'à 9h pour que
    // orderTimeLimit se réinitialise
    // ex: si le temps réel est 03/12/2020 17h30
    // cette méthode va retourner 03/12/2020 8h30
    // C'est le même jour donc la réinitialisation n'opère pas
    // Mais si le temps réel est 04/12/2020 8h30
    // cette méthode va retourner 03/12/2020 23h30
    // C'est pas le même jour donc on est dans un jour nouveau
    // donc la réinitialisation peut s'opérer
    return new Date( Date.now() - 1000 * 60 * 60 * 9 );
  }

  resetOrderTimeLimitWhenNewDay(firstDate: any): void {
    if (this.auth.userLoggedRoles()) {

      this.auth.userLoggedRoles().forEach(role => {
        if (role === 'ROLE_LUNCHLADY') {
          const secondDate = new Date();

          // Si la seconde date (qui est le temps réel) est dans le futur
          // ex: 04/12/2020 - 03/12/2020 = 1 donc > 0
          // (même principe que 2min - 1min = 1 donc > 0)
          if (secondDate.setHours(0, 0, 0, 0) - firstDate.setHours(0, 0, 0, 0) > 0) {
            this.constraintService.constraint(1).subscribe(
              (constraint) => {
                const updatedConstraint: ConstraintIN = {
                  orderTimeLimit: constraint.orderTimeLimit as string,
                  maximumOrderPerDay: 500,
                  rateVAT: constraint.rateVAT
                };
                this.constraintService.update(constraint.id, updatedConstraint).subscribe();
              });
          }
        }
      });

    }
  }

}
