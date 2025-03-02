import { Component } from '@angular/core';
import { StatsWidget } from "../../components/stats-widget";
import { RecentSalesWidget } from "../../components/recent-sales";

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RecentSalesWidget],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
