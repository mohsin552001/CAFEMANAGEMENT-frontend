import { RouteConfigLoadEnd, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManagaCatagoryComponent } from './managa-catagory/managa-catagory.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';



export const MaterialRoutes: Routes = [
    {
        path:'catagory',
        component:ManagaCatagoryComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        },

    },
    {
        path:'product',
        component:ManageProductsComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        },

    }
];
