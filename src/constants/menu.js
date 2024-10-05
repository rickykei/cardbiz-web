import { UserRole,adminRoot } from './defaultValues';

const data = [
 
  {
    id: 'clients',
    icon: 'iconsminds-office',
    label: 'menu.clients',
    to: `${adminRoot}/clients/clients-list`,
     roles: [UserRole.Admin]
  },  
  {
    id: 'users',
    icon: 'iconsminds-administrator',
    label: 'menu.hr.users',
    to: `${adminRoot}/users/users-list`,
     roles: [UserRole.Admin]
  }, 
  {
    id: 'smartcardadmin',
    icon: 'iconsminds-id-card',
    label: 'menu.smartcard.list.admin',
    to: `${adminRoot}/cardsadmin/cards-list`,
     roles: [UserRole.Admin]
  },
  {
    id: 'smartcard',
    icon: 'iconsminds-id-card',
    label: 'menu.smartcard.list',
    to: `${adminRoot}/cards/cards-list`,
     roles: [UserRole.Editor,UserRole.Admin]
  },
  {
    id: 'staffs',
    icon: 'iconsminds-business-mens',
    label: 'menu.staffs.profile',
    to: `${adminRoot}/staffs`,
    roles: [UserRole.Admin,UserRole.Editor] 
  },
  {
    id: 'staffsdeactive',
    icon: 'simple-icon-user-unfollow',
    label: 'menu.staffsdactive.profile',
    to: `${adminRoot}/staffsdeactive`,
    roles: [UserRole.Admin,UserRole.Editor] 
  },
  {
    id: 'batchupload',
    icon: 'iconsminds-upload-1',
    label: 'menu.batchupload',
    to: `${adminRoot}/batchupload`,
    roles: [UserRole.Admin,UserRole.Editor] 
  },
  {
    id: 'admins',
    icon: 'iconsminds-administrator',
    label: 'menu.hr.admin',
    to: `${adminRoot}/admins`,
     roles: [UserRole.Admin, UserRole.Editor] 
  },
  {
    id: 'wallet',
    icon: 'iconsminds-administrator',
    label: 'menu.hr.wallet',
    to: `${adminRoot}/wallets`,
    roles: [UserRole.Admin, UserRole.Editor] 
  },
];
export default data;
