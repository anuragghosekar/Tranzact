import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService
import { AppComponent } from '../app.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  searchTerm: string = ''; // To bind the search input
  @Input() isSidebarOpen = true; // Ensure it's received as input


  // routesMap: { [key: string]: string } = {
  //   '1401': '/cash deposit',
  //   'BL34': '/funds tran req',
  //   '7002': '/balance inquiry',
  //   'CIM09': '/cust-info-mast-main',
  //   'CHM39': '/sweep-out-mains',
  //   '1000': '/customersearch',
  //   'SF1': '/spec-freq-statement',
  //   'AM1': '/acct-master-main'
  // };

  //   routesMap: { [key: string]: string } = {
  //   '1401': '/cash deposit',
  //   'cash deposit': '/cash deposit',

  //   '1006': '/funds transfer request',
  //   'funds transfer request': '/funds transfer request',

  //   // '7002': '/balance inquiry',
  //   'balance inquiry': '/balance inquiry',

  //   'CIM09': '/cust-info-mast-main',
  //   'cust-info-mast-main': '/cust-info-mast-main',

  //   'CHM39': '/sweep-out-mains',
  //   'sweep-out-mains': '/sweep-out-mains',

  //   // '1000': '/customersearch',
  //   'customersearch': '/customersearch',

  //   'SF1': '/spec-freq-statement',
  //   'spec-freq-statement': '/spec-freq-statement',

  //   'AM1': '/acct-master-main',
  //   'acct-master-main': '/acct-master-main',

  //   'cust info mast main':'/cust info mast main',

  //   'casa bank parameter':'/casa bank parameter',
  //   'chm04':'/casa bank parameter',

  //   'cbr pick list':'/cbr pick list',
  //   'ba080':'/cbr pick list',

  //   'user defined fields maintenance':'/user defined fields maintenance',
  //   'ba078':'/user defined fields maintenance',

  //   'ach branch cross reference':'/ach branch cross reference',
  //   'stm60':'/ach branch cross reference',

  //   'calendar for end point':'/calendar for end point',
  //    'bam27':'/calendar for end point',

  //   'clearing branch':'/clearing branch',
  //   'stm50':'/clearing branch',

  //   'clearing minimum maintenance':'/clearing minimum maintenance',
  //   'stm55':'/clearing minimum maintenance',

  //   'Clearing Type Maintenance':'/clearing type maintenance',
  //    'stm64':'/clearing type maintenance',

  //   'correspondence bank master maintenance':'/correspondence bank master maintenance',
  //   'stm97':'/correspondence bank master maintenance',

  //   'end point master':'/end point master',
  //   'bam29':'/end point master',

  //   'instrument types':'/instrument types',
  //   'stm58':'/instrument types',

  //   'routing branch master':'routing branch master',
  //   'stm54':'routing branch master',

  //   'sector codes':'/sector codes',
  //   'bam41':'/sector codes',

  //   'settlement bank parameters':'/settlement bank parameters',
  //    'stm59':'/settlement bank parameters',


  //    'site reject codes cross reference table':'/site reject codes cross reference table',
  //    'stm56':'/site reject codes cross reference table',

  //    'income slab':'/income slab',
  //    'cim06':'/income slab',

  //    'professional codes':'/professional codes',
  //     'cim04':'/professional codes',

  //     'account memo':'/account memo',
  //     'ba437':'/account memo',

  //     'casa cbr codes':'/casa cbr codes',
  //     'chm08':'/casa cbr codes',

  //     'future dated cash deposit':'/future dated cash deposit',
  //      '1411':'/future dated cash deposit',

  //     'miscellaneous customer credit':'/miscellaneous customer credit',
  //     '1408':'/miscellaneous customer credit',

  //     'cash withdrawal':'/cash withdrawal',
  //     '1001':'/cash withdrawal',

  //     'balance enquiry(savings)':'/balance-enquiry-savings',
  //     '7002':'/balance-enquiry-savings',

  //     'inward cheque status inquiry':'/inward cheque status inquiry',
  //      'chm41':'/inward cheque status inquiry',

  //     'statment inquiery':'/statment inquiery',
  //     'ch031':'/statment inquiery',

  //     'standing instruction':'/standing instruction',
  //     'chm31':'/standing instruction',

  //     'sweep in maintenance':'/sweep in maintenance',
  //     'chm39':'/sweep in maintenance',

  //     'account schedule inquiry':'/account schedule inquiry',
  //      'ln522':'/account schedule inquiry',

  //      'account status audit trail inquiry':'/account status audit trail inquiry',
  //      'bam24':'/account status audit trail inquiry',

  //      'revolving loan installment payment':'/revolving loan installment payment',
  //      '1072':'/revolving loan installment payment',

  //      'loan direct account openig':'/loan direct account openig',
  //      'ln057':'/loan direct account openig',

  //      'customer addition':'/customer addition',
  //       '8053':'/customer addition',

  //      'customer detail':'customer detail',
  //      'cim11':'customer detail',

  //      'customer master':'customer master',
  //      'cim09':'customer master',

  //      'display customer':'display customer',
  //      '7105':'display customer',

  //      'link captured image':'/link captured image',
  //      '7102':'/link captured image',

  //      'modify customer image':'/modify customer image',
  //      '7111':'/modify customer image',

  //      'accounts balances enquiry':'/accounts balances enquiry',
  //      '7100':'/accounts balances enquiry',

  //      'customer memo':'/customer memo',
  //      'cim13':'/customer memo',

  //      'customer name and address':'/customer name and address',
  //      '7004':'/customer name and address',

  //      'customer search':'/customer search',
  //      '1000':'/customer search',

  //      'cti customer search':'/cti customer search',
  //       '2000':'/cti customer search',

  //       'customer zoom inquiry':'/customer zoom inquiry',
  //       'ci999':'/customer zoom inquiry'



  // };

  routesMap: { [key: string]: string } = {
    'dashboard': '/dashboard',
    'transaction screening': '/transaction screening',
    'transaction screening report': '/transaction screening report',
    'transaction screening analytics': '/transaction screening analytics',
    'work flow master ': '/work flow master',
    'collector group setup': '/collector group setup',
    'collector setup': '/collector setup',
    'supervisor allocation': '/supervisor allocation',
    'queue definition': '/queue definition',
    'queue allocation': '/queue allocation',
    'action result setup': '/action result setup',
    'next action setup': '/next action setup',
    'action allocation setup': '/action allocation setup',
    'filter defination': '/filter defination',
    'promise setup': '/promise setup',
    'result workflow master': '/result workflow master'

  };


  constructor(public router: Router, public authService: AuthService, public appcomponent: AppComponent) { }

  // Function to handle search box input and navigate
  // handleSearch() {
  //   const value = this.searchTerm.trim().toLowerCase(); // Normalize input
  //   const matchedRoute = this.routesMap[value];
  //   if (matchedRoute) {
  //     this.router.navigate([matchedRoute]).then(() => {
  //       this.searchTerm = '';
  //     });
  //   }
  // }



  // Function to handle sidebar item click and navigate
  navigateTo(route: string) {
    if (this.routesMap[route]) {
      this.router.navigate([this.routesMap[route]]);
    }
  }
  handleLogout() {
    this.authService.logout(); // Logout using service
    this.router.navigate(['/']);
  }

  // selectItem(item: string) {
  //   this.router.navigate(['/' + item.toLowerCase()]);
  //   // this.isSidebarOpen = false; // Hide sidebar after selection
  // }

  // menuItems = [
  //   {
  //     label: 'Global Definitions',
  //     expanded: false,
  //     children: [
  //       {
  //         label: 'CASA',
  //         expanded: false,
  //         children: [
  //         { label: 'CASA Bank Parameter', expanded: false, children: [] }

  //         ]
  //       },
  //       {
  //         label: 'Master',
  //         expanded: false,
  //         children: [
  //         { label: 'CBR Pick List', expanded: false, children: [] },
  //         { label: 'User Defined Fields Maintenance', expanded: false, children: [] },
  //         { label: 'Calendar For End Point', expanded: false, children: [] },
  //          { label: 'Clearing Minimum Maintenance', expanded: false, children: [] },
  //          { label: 'Clearing Type Maintenance', expanded: false, children: [] },
  //         ]
  //       },
  //       {
  //         label: 'Clearing',
  //         expanded: false,
  //         children: [
  //           { label: 'ACH Branch Cross Reference', expanded: false, children: [] },
  //           { label: 'Clearing Branch', expanded: false, children: [] },
  //           { label: 'Correspondence Bank Master Maintenance', expanded: false, children: [] },
  //           { label: 'End Point Master', expanded: false, children: [] },
  //           { label: 'Instrument Types', expanded: false, children: [] },
  //           { label: 'Routing Branch Master', expanded: false, children: [] },
  //           { label: 'Sector Codes', expanded: false, children: [] },
  //           { label: 'Settlement Bank Parameters', expanded: false, children: [] },
  //           { label: 'Site Reject Codes Cross Reference Table', expanded: false, children: [] },
  //         ]
  //       },
  //       {
  //         label: 'Customer',
  //         expanded: false,
  //         children: [
  //         { label: 'Income Slab', expanded: false, children: [] },
  //          { label: 'Professional Codes', expanded: false, children: [] },
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Transaction Processing',
  //     expanded: false,
  //     children: [
  //       {
  //         label: 'Customer Transactions', expanded: false, children: [
  //           { label: 'Cash Deposit', expanded: false, children: [] },
  //           // { label: 'Balance Inquiry', expanded: false, children: [] },
  //           { label: 'funds transfer request', expanded: false, children: [] },
  //           { label: 'Customer Addition', expanded: false, children: [] },
  //           { label: 'Customer Detail', expanded: false, children: [] },
  //           { label: 'Customer Master', expanded: false, children: [] },
  //           { label: 'Display customer', expanded: false, children: [] },
  //           { label: 'Link Captured Image', expanded: false, children: [] },
  //           { label: 'Modify Customer Image', expanded: false, children: [] },
  //            { label: 'Customer Memo', expanded: false, children: [] }, 
  //            { label: 'Customer Name and Address', expanded: false, children: [] },
  //             { label: 'Customer Search', expanded: false, children: [] },
  //              { label: 'CTI Customer Search', expanded: false, children: [] },
  //              { label: 'Customer Zoom Inquiry', expanded: false, children: [] },
  //         ]
  //       },
  //       { label: 'Internal Transactions', expanded: false, children: [
  //           { label: 'Others', expanded: false, children: [
  //           { label: 'Account Memo', expanded: false, children: [] },
  //           { label: 'Funds Transfer Request', expanded: false, children: [] },
  //           ] }

  //       ] },
  //        { label: 'Account Transactions', expanded: false, children: [
  //           { label: 'Others Transaction', expanded: false, children: [
  //           { label: 'CASA CBR Codes', expanded: false, children: [] },

  //           ] },
  //           { label: 'CASA Transaction', expanded: false, children: [
  //           { label: 'Cash', expanded: false, children: [
  //              { label: 'Cash Deposit', expanded: false, children: [] },
  //              { label: 'Future Dated Cash Deposit', expanded: false, children: [] },
  //              { label: 'Cash Withdrawal', expanded: false, children: [] },
  //           ] },
  //           { label: 'Transfer', expanded: false, children: [
  //              { label: 'Funds Transfer Request', expanded: false, children: [] },
  //              { label: 'Miscellaneous Customer Credit', expanded: false, children: [] },
  //           ] },
  //            { label: 'Other Transaction', expanded: false, children: [
  //              { label: 'Standing Instructoin', expanded: false, children: [] },
  //              { label: 'Sweep In Maintenance', expanded: false, children: [] },

  //           ] },
  //          ] },
  //           { label: 'CASA Account Transactions', expanded: false, children: [
  //           { label: 'Inquiries', expanded: false, children: [
  //               { label: 'Balance Enquiry(Savings)', expanded: false, children: [] },
  //               { label: 'Statment Inquiery', expanded: false, children: [] },
  //               { label: 'Account Status Audit Trail Inquiry', expanded: false, children: [] },
  //               { label: 'Accounts Balances Enquiry', expanded: false, children: [] }
  //           ] },
  //            { label: 'Clearing', expanded: false, children: [
  //               { label: 'Inward Cheque Status Inquiry', expanded: false, children: [] },
  //           ] },

  //           ] },
  //           { label: 'Loan Transactions', expanded: false, children: [
  //           { label: 'Other Transactions', expanded: false, children: [
  //             { label: 'Account Schedule Inquiry', expanded: false, children: [] },
  //           ] },

  //           ] },
  //            { label: 'Loan Account Transactions', expanded: false, children: [
  //           { label: 'Other Transactions', expanded: false, children: [
  //             { label: 'Revolving Loan Installment Payment', expanded: false, children: [] },
  //           ] },
  //           { label: 'Inquiries', expanded: false, children: [
  //             { label: 'Loan Direct Account Openig', expanded: false, children: [] },
  //           ] },
  //           ] },
  //       ] },

  //     ]
  //   }

  // ];

  menuItems = [
    {
      label: 'Dashboard', expanded: false, children: []
    },
    {
      label: 'Transaction Monitoring',
      expanded: false,
      children: [
        { label: 'Transaction', expanded: false, children: [        
          { label: 'Transaction Screening', expanded: false, children: [] },
          { label: 'Transaction Screening Report', expanded: false, children: [] },
          { label: 'Transaction Screening Analytics', expanded: false, children: [] },
          { label: 'Alert Queue', expanded: false, children: [] },
          { label: 'Escalations', expanded: false, children: [] },
          { label: 'Rules Managament', expanded: false, children: [] },
          { label: 'AI Monitoring', expanded: false, children: [] },

      ] }
      ]
    },
    {
      label: 'Case Management',
      expanded: false,
      children: [
        { label: 'Case Queue', expanded: false, children: [] },

      ]
    },
    {
      label: 'Customer Risk Rating',
      expanded: false,
      children: [
        { label: 'Risk Dashboard', expanded: false, children: [] },

      ]
    },
    {
      label: 'Reports & STR Filing',
      expanded: false,
      children: [
        { label: 'STR Reports', expanded: false, children: [] },
        { label: 'Compliance Reports', expanded: false, children: [] },
        { label: 'File STR', expanded: false, children: [] },


      ]
    },
    {
      label: 'Admin & Configuration',
      expanded: false,
      children: [
        { label: 'Admin Dashboard', expanded: false, children: [] },
        { label: 'User Management', expanded: false, children: [] },
        { label: 'Role Management', expanded: false, children: [] },
        { label: 'Rules Configuration', expanded: false, children: [] },
        { label: 'Report Configuration', expanded: false, children: [] },
        { label: 'Audit Trail', expanded: false, children: [] },
        { label: 'Integrations', expanded: false, children: [] },
      ]
    },


  ];

  toggleItem(item: any) {
    item.expanded = !item.expanded;
  }

  selectItem(label: string) {
    this.router.navigate(['/' + label.toLowerCase()]);
    console.log('Selected:', label);
  }

  Seacrchpage() {

  }



}
