export const UserRole = {
  Admin: 0,
  Editor: 1,
};

/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden" role: UserRole.Editor
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English', direction: 'ltr' },
  { id: 'zh', name: '中文', direction: 'ltr' } 
 ,
];

export const firebaseConfig = {
  apiKey: 'AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg',
  authDomain: 'gogo-react-login.firebaseapp.com',
  databaseURL: 'https://gogo-react-login.firebaseio.com',
  projectId: 'gogo-react-login',
  storageBucket: 'gogo-react-login.appspot.com',
  messagingSenderId: '216495999563',
};


export const currentUser = {
  master:766,
  id: 1,
  title: 'Tester',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  
};


export const adminRoot = '/app';
export const buyUrl = ' ';
export const searchPath = `${adminRoot}/pages/miscellaneous/search`;

export const servicePath3 = 'https://namecard.e-profile.digital';
export const servicePath2 = `${servicePath3}/api`;
export const servicePath4 = 'https://namecard.e-profile.digital';

export const servicePath = 'https://api.coloredstrategies.com';
export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.purplemonster';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
